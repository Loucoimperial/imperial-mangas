import { prisma } from "@/app/lib/prisma"
import bcrypt from "bcryptjs"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {

 const body = await req.json()

 const { email, username, password } = body

 const existing = await prisma.user.findUnique({
  where: { email }
 })

 if (existing) {
  return new Response(
   JSON.stringify({ error: "Usuário já existe" }),
   { status: 400 }
  )
 }

 const hash = await bcrypt.hash(password, 10)

 const user = await prisma.user.create({
  data: {
   email,
   username,
   password: hash
  }
 })

 return Response.json({
  id: user.id,
  email: user.email
 })

}