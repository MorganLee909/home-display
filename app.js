import express from "express";
import createHtml from "./createHtml.js";

const app = express();
const html = await createHtml();
app.get("/", (req, res)=>{res.send(html)});
app.listen(9001);
