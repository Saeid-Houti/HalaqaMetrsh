// import { v4 as uuidv4 } from "uuid";
import { uid } from 'uid';
import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const file = path.join(process.cwd(), `data`) + "/tasks.json";
    const taskId = req.body.taskId;

    if (req.method === "GET") {
      const fileContents = await fs.readFile(file, "utf8");
      res.status(200).json(fileContents);
    } else if (req.method === "POST") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);
      data.push({
        taskId: uid(10),
        ...req.body,
      });
      await fs.writeFile(file, JSON.stringify(data));

      res.status(200).json(JSON.stringify(data));
    } else if (req.method === "PUT") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);
      const matchIndex = data.findIndex(
        (task) => task.taskId == taskId.toString()
      );
      data[matchIndex].surahName = req.body.surahName;
      data[matchIndex].surhaId = req.body.surhaId;
      data[matchIndex].fromAya = req.body.fromAya;
      data[matchIndex].toAya = req.body.toAya;
      data[matchIndex].dueDate = req.body.dueDate;
      data[matchIndex].completedDate = req.body.completedDate;
      data[matchIndex].masteryLevel = req.body.masteryLevel;
      data[matchIndex].comment = req.body.comment;
      data[matchIndex].studentId = req.body.studentId;
      data[matchIndex].type = req.body.type;
      await fs.writeFile(file, JSON.stringify(data));

      res.status(200).json(JSON.stringify(data));
    } else if (req.method === "DELETE") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);

      const matchIndex = data.findIndex(
        (task) => task.taskId == req.query.taskId
      );
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
