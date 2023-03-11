import mongodb from "@/lib/db.js";

export default async function handler(req, res) {
  const client = await mongodb;
  const db = client.db("posts");
  if (req.method === "GET") {
    const posts = await db.collection("posts").find().toArray();
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const post = await db.collection("posts").insertOne({
      title: req.body.title || "New Title",
      content: new Date().toISOString(),
    });

    return res.status(200).json(post);
  }
}
