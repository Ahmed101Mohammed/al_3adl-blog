import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

userAvatarOrSignInWillAppear();
const articleId = window.URL.parse(window.location.href).searchParams.get("id");

if(!articleId)
{
    window.location.href = "index.html";
}

// set the article page
const setArticlePage = async() =>
{
    const data = await getArticle(articleId);
    
    if(data.status == SUCCESS)
    {
        const article = data.data.article;
        const articleObject = Article(article);
        const articleElement = document.querySelector("article");
        articleElement.insertAdjacentHTML("afterbegin", articleObject.createFullArticlePresentation());
        const articleBody = document.querySelector("article .article-body");
        articleBody.innerHTML = marked(article.body);
    }
    else
    {
        window.location.href = "index.html";
    }
}

setArticlePage();