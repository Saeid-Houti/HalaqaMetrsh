import { promises as fs } from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const file = path.join(process.cwd(), `data`) + "/parents.json";
    if (req.method === "GET") {
      const fileContents = await fs.readFile(file, "utf8");
      res.status(200).json(fileContents);
    } else if (req.method === "POST") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);
      if (req.body.status) {
        let parentIndex;
        data.map((parent) => {
          if (parent.qatariId == req.body.parentId) {
            parentIndex = data.indexOf(parent);
          }
        });
        data[parentIndex].students.push({
          studentId: req.body.studentId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dob: req.body.dob,
          gender: req.body.gender,
          schoolGrade: parseInt(req.body.schoolGrade),
          teacherId: req.body.teacherId,
        });
        await fs.writeFile(file, JSON.stringify(data));
        res.status(200).json(JSON.stringify(data));
      } else {
        data.push({
          ...req.body,
        });
        await fs.writeFile(file, JSON.stringify(data));

        res.status(200).json(JSON.stringify(data));
      }
    } else if (req.method === "PUT") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);
      let studentIndex;
      let parentIndex;
      data.map((parent) => {
        parent.students.map((student) => {
          if (student.studentId == req.body.studentId) {
            parentIndex = data.indexOf(parent);
            studentIndex = parent.students.indexOf(student);
          }
        });
      });
      data[parentIndex].students[studentIndex].firstName = req.body.firstName;
      data[parentIndex].students[studentIndex].lastName = req.body.lastName;
      data[parentIndex].students[studentIndex].dob = req.body.dob;
      data[parentIndex].students[studentIndex].gender = req.body.gender;
      data[parentIndex].students[studentIndex].schoolGrade =
        req.body.schoolGrade;
      data[parentIndex].students[studentIndex].teacherId = req.body.teacherId;
      await fs.writeFile(file, JSON.stringify(data));

      res.status(200).json(JSON.stringify(data));
    } else if (req.method === "DELETE") {
      const fileContents = await fs.readFile(file, "utf8");
      const data = JSON.parse(fileContents);

      const matchIndex = data.findIndex(
        (parent) => parent.qatariId === req.query.qatariId
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
