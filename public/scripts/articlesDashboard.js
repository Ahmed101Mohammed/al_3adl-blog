// global variables
let limit = 20;
let page = 1;
let articlesInDom = [];

// Intial setub of the page.
const init = async() => 
{
    const articles = await advancedWithRefresh(async() => await getAllArticlesSorted(page, limit, {sortType: "date", sortDirection: -1}));
    console.log(articles.data.articles);
    articlesInDom.push(...articles.data.articles);
    // articles container
    const articlesContainer = document.querySelector("tbody");
    // adding articles to dom
    for(let article of articlesInDom)
    {
        const articleUI = Article(article);
        articlesContainer.insertAdjacentHTML("beforeend", articleUI.createTableRawPresentation());
    }

    // see more button
    const seeMoreButton = document.querySelector(".load-more");
    if(articles.data.articles.length === limit)
    {
        seeMoreButton.style.display = "block";
    }
}

// delete article event
const table = document.querySelector("tbody");
table.addEventListener("click", async(event) =>
{
    if(event.target.classList.contains("delete"))
    {
        const tr = event.target.closest("tr");
        const id = tr.id;
        const data = await deleteArticle(id);
        if(data.status !== SUCCESS)
        {
            console.error(data);
            return;
        }
        articlesInDom = articlesInDom.filter((article) => article.id !== id);
        tr.remove();
        setTemporaryMessage("Article deleted successfully");
    }
})

// runing code:
userAvatarOrSignInWillAppear()
.then(() => init());