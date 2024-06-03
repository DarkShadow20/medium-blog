import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
}>()

blogRouter.use('/api/vi/blog/*',async(c,next)=>{
    const header = c.req.header("authorization") || ""
  
    const response = await verify(header,c.env.JWT_SECRET)
    if(response.id){
      next()
    }else{
      c.status(403)
      return c.json({error:"unauthorized"})
    }
  })


blogRouter.post('/', (c) => {
    return c.text('Hello Hono!')
  })
  
  
blogRouter.put('/', (c) => {
    return c.text('Hello Hono!')
  })
  
  
blogRouter.get('/:id', (c) => {
    return c.text('Hello Hono!')
  })

blogRouter.get('/bulk',(c)=>{
    return c.text('Hello Hono')
})

  