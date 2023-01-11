import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const jsonDirectory = path.join(process.cwd(), `data`);
    const { data } = req.query;
    try {
        const fileContents = await fs.readFile(jsonDirectory + `/${data}.json`, 'utf8');
        res.status(200).json(fileContents)
    } catch (error) {
        console.log(error)
        res.status(500).json(JSON.stringify({
            error: "Something went wrong. Check server logs"
        }))
    }
}