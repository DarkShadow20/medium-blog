import { createBlogPost, updateBlogPost } from '@demonslayer2/medium-common';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    },
    Variables:{
        userId:string;
    }
}>()

blogRouter.use('/*',async(c,next)=>{
    try{
    const header = c.req.header("authorization") || ""
    const user = await verify(header,c.env.JWT_SECRET)
    if(user){
        c.set("userId",user.id)
        await next()
    }else{
      c.status(403)
      return c.json({error:"unauthorized"})
    }
    }catch(e){
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
  })


blogRouter.post('/', async(c) => {
    const body = await c.req.json()
    const {success} = createBlogPost.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"Inputs are incorrect"
        })
    }
    const authorId = await c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const post = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:authorId
        }
    })

    return c.json({
        id: post.id
    })
  })
  
  
blogRouter.put('/', async(c) => {
    const body = await c.req.json()
    const {success} = updateBlogPost.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"Inputs are incorrect"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const post = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.json({
        id:post.id
    })
  })
  
blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }

        }
    });
    return c.json({
        posts
    })
})
 
blogRouter.get('/:id', async(c) => {
    const id = await c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
    const post = await prisma.post.findFirst({
        where:{
            id:id
        },
        select:{
            id:true,
            title:true,
            content:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    })
    return c.json({
        post
    })
    }catch(e){
        c.status(411)
        return c.json({
            message:"Error while fetching blog post"
        })
    }
  })



  