import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const file = path.join(process.cwd(), `data`) + "/messages.json";
    if (req.method === "GET") {
      const fileContents = await fs.readFile(file, "utf8");
      res.status(200).json(fileContents);
    } else if (req.method === "POST") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);
      data.push({
        ...req.body,
        messageId: uuidv4(),
        date: new Date().toLocaleDateString("en-GB"),
      });
      await fs.writeFile(file, JSON.stringify(data));

      res.status(200).json(JSON.stringify(data));
    } else if (req.method === "PUT") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);

      const matchIndex = data.findIndex(
        (msg) => msg.messageId == req.body.messageId
      );
      data[matchIndex].title = req.body.title;
      data[matchIndex].message = req.body.message;
      await fs.writeFile(file, JSON.stringify(data));

      res.status(200).json(JSON.stringify(data));
    } else if (req.method === "DELETE") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);

      const matchIndex = data.findIndex((msg) => msg.messageId == req.body.id);
      data.splice(matchIndex, 1);
      await fs.writeFile(file, JSON.stringify(data));

      res.status(200).json(JSON.stringify(data));
    } else {
      // Handle any other HTTP method
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "An error occured, check logs" });
  }
}
