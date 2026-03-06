import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req:Request){

const body = await req.json();

const hash = await bcrypt.hash(body.password,10);

await prisma.user.create({

 data:{
  email:body.email,
  username:body.username,
  password:hash
 }

});

return Response.json({ok:true});

}