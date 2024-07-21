// global variables
let limit = 20;
let page = 1;
let articlesInDom = [];
let currentSellected = document.querySelector("select").value;

// seturp articles in dom
const setupArticlesInDom = (articlesList)=>
{
    // articles container
    const articlesContainer = document.querySelector("tbody");
    // adding articles to dom
    for(let article of articlesList)
    {
        const articleUI = Article(article);
        articlesContainer.insertAdjacentHTML("beforeend", articleUI.createTableRawPresentation());
    }

    // see more button
    const seeMoreButton = document.querySelector(".load-more");
    if(articlesList.length === limit)
    {
        seeMoreButton.style.display = "block";
    }
    else
    {
        seeMoreButton.style.removeProperty("display");
    }
}
// functionality for my articles
const setupMyArticles = async()=>
{
    const articles = await advancedWithRefresh(async() => await getMyArticles(page, limit));
    const pureArticles = articles.data.articles;
    articlesInDom.push(...pureArticles);

    setupArticlesInDom(pureArticles);
}

const setupAllArticles = async()=>
{
    const articles = await advancedWithRefresh(async() => await getAllArticlesSorted(page, limit, {sortType: "date", sortDirection: -1}));
    const pureArticles = articles.data.articles;
    articlesInDom.push(...pureArticles);

    setupArticlesInDom(pureArticles);
}
// Intial setub of the page.
const init = async() => 
{
    if(currentSellected === "my-articles")
    {
        setupMyArticles();
    }
    else if(currentSellected === "all-articles")
    {
        setupAllArticles();
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

// events
const select = document.querySelector("select");
select.addEventListener("change", async() =>
{
    currentSellected = select.value;
    articlesInDom = [];
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    page = 1;
    if(currentSellected === "my-articles")
    {
        setupMyArticles();
    }
    else if(currentSellected === "all-articles")
    {
        setupAllArticles();
    }
})
// runing code:
userAvatarOrSignInWillAppear()
.then(() => init());