import prisma from "./prisma"
import bcrypt from "bcrypt"



async function main() {
  const jojo = await prisma.user.create({
    // where: { email: 'jojo@gmail.com' },
    // update: {},
    data: {
      email: 'jojo@gmail.com',
      name: 'Jojo',
      password: await bcrypt.hash('12345678',10),
      todos: {
        create: [
          {
          task: 'learn nextjs',
          },
          {
          task: 'learn typescript',
          },
          {
          task: 'learn redis database',
          }
          
        ],
      },
      posts: {
        create: [
          {
          title: 'Check out Prisma with Next.js',
          content: 'It dawned on her that others could make her happier, but only she could make herself happy.',
          },
          {
          title: 'Check out Prisma with Next.js',
          content: 'It dawned on her that others could make her happier, but only she could make herself happy.',
          }
          
        ],
      },
      blogs: {
        create: [
          {
            title: 'Check out Prisma with Next.js',
            content: "The thick foliage and intertwined vines made the hike nearly impossible.I caught my squirrel rustling through my gym bag.It took me too long to realize that the ceiling hadn't been painted to look like the sky."
          },
          {
            title: 'Check out Prisma with Next.js',
            content: "The blinking lights of the antenna tower came into focus just as I heard a loud snap.She had a habit of taking showers in lemonade.We have a lot of rain in June.",
          },
        ],
      },
    },
  })
  const bob = await prisma.user.create({
    
    data: {
      email: 'bob@gmail.com',
      name: 'Bob',
      password: await bcrypt.hash('12345678',10),
      todos: {
        create: [
          {
          task: 'Check out Prisma with Next.js',
          },
          {
          task: 'learn english',
          },
          
        ],
      },
      posts: {
        create: [
          {
          title: 'Check out Prisma with Next.js',
          content: "Although it wasn't a pot of gold, Nancy was still enthralled at what she found at the end of the rainbow.",
          },
          {
          title: 'Check out Prisma with Next.js',
          content: "Although it wasn't a pot of gold, Nancy was still enthralled at what she found at the end of the rainbow.",
          }
          
        ],
      },
      blogs: {
        create: [
          {
            title: 'Check out Prisma with Next.js',
            content: "The blinking lights of the antenna tower came into focus just as I heard a loud snap.She had a habit of taking showers in lemonade.We have a lot of rain in June.",
          },
          {
            title: 'Check out Prisma with Next.js',
            content: "The thick foliage and intertwined vines made the hike nearly impossible.I caught my squirrel rustling through my gym bag.It took me too long to realize that the ceiling hadn't been painted to look like the sky."
          },
        ],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


