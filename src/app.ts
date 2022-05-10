import express, { Application, Request, Response } from "express";

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello, node controller!\n`);
});

app.listen(port, () => {
  process.stdout.write(`App listening on port ${port}\n`);
});
