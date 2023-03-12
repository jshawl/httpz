import mongodb from "@/lib/db.js";

export default async function handler(req, res) {
  const client = await mongodb;
  const db = client.db("httpz");

  const apt = await db.collection("appointments").insertOne({
    createdAt: new Date().toISOString(),
    requests: []
  });
  
  return res.status(200).json(apt);
}
