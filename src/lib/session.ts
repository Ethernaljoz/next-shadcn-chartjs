import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

const getCurrentUser = async ()=>{
  const session = await getServerSession(authOptions);
  return session?.user
  
};

export default getCurrentUser

