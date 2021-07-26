import express from "express";
import  "reflect-metadata";
import "./database";

const app = express();

app.get('/test', (request, response) => {
    return response.send("Olá mundo");
})

app.post("/test-post", (request, response) => {
    return response.send("olá nlw método post");
})

app.listen(3000, () => console.log("Server is running"))