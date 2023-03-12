import mongodb, { ObjectId } from "@/lib/db.js";

export default async function handler(req, res) {
  const client = await mongodb;
  const db = client.db("httpz");
  const { appointment: id } = req.query;
  const request = {
    headers: req.headers,
    method: req.method,
    payload: req.body || req.query,
    createdAt: new Date().toISOString(),
    id: id,
  };
  if (req.method === "GET") {
    const apt = await db
      .collection("appointments")
      .findOne({ _id: new ObjectId(id) });
    return res.status(200).json(apt);
  }
  await db
    .collection("appointments")
    .updateOne({ _id: new ObjectId(id) }, { $push: { requests: request } });
  return res.status(200).json(request);
}
