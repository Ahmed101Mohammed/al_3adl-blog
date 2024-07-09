import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const mdContent = document.querySelector(".md-content");
const articleContent = document.querySelector(".preview");

mdContent.addEventListener("input", (event) => {
    let content = event.target.value;
    articleContent.innerHTML = marked.parse(content);
    articleContent.scrollTop = articleContent.scrollHeight;
}) 