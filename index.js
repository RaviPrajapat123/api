// ESM
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { promises as fs } from "fs";
import { totalmem, userInfo } from 'os';


const fastify = Fastify({
  logger: true
})


await fastify.register(cors,{
  origin : "*",
  methods:['GET',"POST","PUT","DELETE"]
});

let test="";
// fastify.get('/', async (request, reply) => {

//   return {get: 'method is get type'}


// const userData =await import("./user.json",{assert:{type:'json'}})
// const data=await fs.readFile('./user.json','utf8')
// const userData=JSON.parse(data);
// return data
// return userData.default;
//   return [{firstName:'ravi',email:'ravi@gmail.com',number:"1234567890",Age:"2003-3-4"}]
// })
fastify.get('/', async (request, reply) => {
  test="get method called"
  const params = request.query;
  const header = request.headers;
  const body = request.body;
  return {
    test,
    header,
    params,
    body,
 }
})
fastify.post('/', async (request, reply) => {
  let status=false;
  
  const params = request.query;
  const header = request.headers;
  const body = request.body;

  if(body.username==="admin" &&  body.password==="pass")
  {
    status=true;
  }
  return {
    test,
   status,
    header,
    params,
    body,
 }

})
fastify.put('/', async (request, reply) => {
  let status=false;
  const header = request.headers;
  const params = request.query;
  const body = request.body;
  if(body.username==="admin" &&  body.password==="pass")
    {
      status=true;
    }
  return {
    status,
    header,
    params,
    body,
 }

})
fastify.patch('/', async (request, reply) => {
  const header = request.headers;
  const params = request.query;
  const body = request.body;
  return {
    header,
    params,
    body,
 }

})
fastify.delete('/', async (request, reply) => {
  const header = request.headers;
  const params = request.query;
  const body = request.body;
  return {
     header,
     params,
     body,
  }

})
fastify.options('/', async (request, reply) => {
  const header = request.headers;
  const params = request.query;
  const body = request.body;
  return {
    header,
    params,
    body,
 }
})





let data=[1,2,3,4,5]

fastify.get('/tasks', async (request, reply) => {
  
  return {
      status:true,data,page:1,total:10,
 }
})

fastify.post('/task', async (request, reply) => {
  data=[...data,request?.body?.name]
  return {
    status:true,data,page:1,total:10
 }

})
fastify.delete(`/task/:index`, async (request, reply) => {
  let idx=request.params.index
  const {index}=request.body
  data.splice(index,1)
  return { 
    status:true,data,page:1,total:10,idx
 } 

})
fastify.patch('/task/:index/:value', async (request, reply) => {
  let {index, name}=request.body;
  data[index]=name
  return { 
    status:true,data,page:1,total:10
 } 

})




fastify.post('/login', async (request, reply) => {
  let status = false;
    let errors = {}; // Store validation errors

    let user = request.body.username;
    let pass = request.body.password;

    // ✅ Validate username
    if (!user) {
        errors.username = "Username is required";
    } else if (!/^[A-Za-z]+$/.test(user)) { 
        errors.username = "Username should contain only letters (A-Z, a-z)";
    }

    // ✅ Validate password
    if (!pass) {
        errors.password = "Password is required";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(pass)) {
        errors.password = "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // 🚨 If errors exist, return them
    if (Object.keys(errors).length > 0) {
        return {errors };
    }

    if(user==="admin" &&  pass==="Ravi@200")
      {
        status=true;
      }

   return{
       user,pass,
       status
   }
   
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

