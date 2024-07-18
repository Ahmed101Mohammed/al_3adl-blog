// global variables
let limit = 20;
let page = 1;
let articlesInDom = [];

// Intial setub of the page.
const init = async() => 
{
    const articles = await advancedWithRefresh(async() => await getMyArticles(page, limit));
    articlesInDom.push(...articles.data.articles);
    // articles container
    const articlesContainer = document.querySelector("tbody");
    // adding articles to dom
    for(let article of articlesInDom)
    {
        const articleUI = Article(article);
        articlesContainer.insertAdjacentHTML("beforeend", articleUI.createTableRawPresentation());
    }
}

// Adding new Article.
const addNewArticle = document.querySelector(".add-new-article");
addNewArticle.addEventListener("click", () => {
    window.location.href = "article-lap.html";
})

// runing code:
userAvatarOrSignInWillAppear()
.then(() => init());