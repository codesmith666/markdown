import express from "express";
import { css_prism } from "./css.prism";
import { css_nence } from "./css.nence";
import { MarkdownFS } from "../src/index.js";

const selfPath = import.meta.url;
const app = express();

app.get("/", async (req, res) => {
  // Create root path.Put markdown file here.
  let root = "";
  if (selfPath.startsWith("file://")) root = selfPath.slice(7);
  if (selfPath.endsWith("/index.ts")) root = root.slice(0, -9);
  root += "/markdown";

  // 0.Since you are using express, run `npm install express`.
  // 1.Specify the document root to the MarkdownFS class.
  // 2.Get the name of the markdown file to be displayed from the query string.
  //   The extension may be omitted.
  // 3.Rendering yields HTML (to be processed by await or then).
  // 4.Returns a response by specifying an html tag or a head tag.
  const md = new MarkdownFS(root);
  const fn = (req.query["md"] as string | undefined) || "main";
  const body = await md.render(fn);
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style type="text/css">
        ${css_prism}
        ${css_nence}
    </style>
    </head>
  <body>
    ${body}<br/>
    EOF
  </body>
</html>
`;

  res.end(html);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
