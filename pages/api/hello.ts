// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "@/functions";

export default async function handler(req, res) {
  const result = await prisma.dimipay_users.findMany()
  res.json(result)
}
