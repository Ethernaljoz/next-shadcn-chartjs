import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma"
import { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { Account,Profile, Session, User } from "next-auth";

export const authOptions : NextAuthOptions = {

  adapter: <Adapter>PrismaAdapter(prisma) ,
  
  providers: [
    CredentialsProvider({
    
    name: "Credentials",
    
    credentials: {
      email: { label: "Email", type: "email", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials,req){
      const {email, password} = credentials as {
        email:string | undefined,
        password:string | undefined
      }

      if(!email || !password){
        throw new Error("email et password obligatoire")
      }

      const existingUser = await prisma.user.findUnique({where:{email,}})
      if(!existingUser){
        throw new Error("email ou mot de passe invalide")
      }

      const passwordMatch = await bcrypt.compare(password,existingUser.password)
      if(!passwordMatch){
         throw new Error("email ou mot de passe invalide")
      }

      const userData = {
        id:existingUser.id,
        email:existingUser.email,
        name : existingUser.name,
        imageUrl: existingUser.imageUrl
      }

      return userData
    }
  })
  ],
  secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        async encode({secret, token}) {
            if(!token) {
                throw new Error('No token to encode');
            }
            return jwt.sign(token, secret);
        },
        async decode({secret, token}) {
            if(!token) {
                throw new Error('No token to decode');
            }
            const decodedToken = jwt.verify(token, secret);
            if(typeof decodedToken === 'string') {
                return JSON.parse(decodedToken);
            } else {
                return decodedToken;
            }
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async session(params: {session: Session; token: JWT; user: User}) {
            if(params.session.user) {
                params.session.user.email = params.token.email;
            }

            return params.session;
        },
        async jwt(params: {
            token: JWT;
            user?: User | undefined;
            account?: Account | null | undefined;
            profile?: Profile | undefined;
            isNewUser?: boolean | undefined;
        }) {
            if(params.user) {
                params.token.email = params.user.email;
            }

            return params.token;
        }
    },
    debug: process.env.NODE_ENV === "development",

}