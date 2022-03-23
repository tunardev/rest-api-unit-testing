import express, { Request, Response } from "express";
const app = express();

export interface User {
  name: string;
  id: number;
  age: number;
}

let users: Array<User> = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", (req: Request, res: Response) => {
  return res.status(200).json({ status: 200, data: users });
});

app.get("/users/:id", (req: Request, res: Response) => {
  const user = users.find((user: User) => user.id === parseInt(req.params.id));
  if (!user)
    return res.status(400).json({ status: 400, message: "User not found." });

  return res.status(200).json({ status: 200, data: user });
});

app.post("/users", (req: Request, res: Response) => {
  const { name, age } = req.body;

  const user: User = {
    id: users.length + 1,
    name,
    age,
  };
  users.push(user);
  return res.status(200).json({ status: 200, data: user });
});

app.put("/users/:id", (req: Request, res: Response) => {
  const { name, age } = req.body;
  const user = users.find((user: User) => user.id === parseInt(req.params.id));
  if (!user)
    return res.status(400).json({ status: 400, message: "User not found." });

  user.name = name;
  user.age = age;
  return res.status(200).json({ status: 200, data: user });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const user = users.find((user: User) => user.id === parseInt(req.params.id));
  if (!user)
    return res.status(400).json({ status: 400, message: "User not found." });

  users = users.filter((user: User) => user.id !== parseInt(req.params.id));
  return res.status(200).json({ status: 200, data: user });
});

app.get("*", (_: Request, res: Response) => {
  return res.status(404).json({ status: 404, message: "Not found." });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
