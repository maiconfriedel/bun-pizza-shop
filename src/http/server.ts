import { Elysia } from "elysia";

const app = new Elysia().get("/", () => {
  return { message: "Hello World" };
});

app.listen(3333, () => {
  console.log("HTTP Server running");
});
