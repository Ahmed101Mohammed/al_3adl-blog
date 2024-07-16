// constants
const limit = 9;
const page = 1;
let articlesInDom = [];
// function to move to single article page
const moveToArticle = (id) =>
{
    window.location.href = `article.html?id=${id}`;
}

// appear articles
const appearArticles = async()=>
{
    const data = await getArticles(page, limit);
    if(data.status === SUCCESS && data.data.articles.length > 0)
    {
        const articles = data.data.articles;
        articlesInDom.push(...articles);
        noPostsAppearance(false);
        postsSectionAppearance(true);
        let articlesContainer = document.querySelector('.posts-container');
        if(articles.length === limit)
        {
            seeMoreButtonAppearance(true);
        }
        else
        {
            seeMoreButtonAppearance(false);
        }

        for(let article of articles)
        {
            const articleUI = Article(article);
            articleUI.addSimpleArticlePresentationToDomContainer(articlesContainer);
        }
    }
    else
    {
        noPostsAppearance(true);
        postsSectionAppearance(false);
        seeMoreButtonAppearance(false);
    }
}


// event for each article
let articlesContainer = document.querySelector('.posts-container');
articlesContainer.addEventListener('click', (event) =>
{
    if(event.target.classList.contains('post-card'))
    {
        const articleId = event.target.getAttribute('id');
        moveToArticle(articleId);
    }
});

// set the home intro section
const setTheBlogIntroSection = async()=>
{
    const lastArticle = await getArticles(1, 1);
    if(lastArticle.status === SUCCESS)
    {
        const article = lastArticle.data.articles[0];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const articleTitleElement = document.querySelector(".article-summary-card h2.title");
        const articleCategoryElement = document.querySelector(".article-summary-card p.category-primary");
        const articleCoverElement = document.querySelector(".intro-img img");
        const authorAvatarElement = document.querySelector(".article-summary-card .author img");
        const authorName = document.querySelector(".article-summary-card .author .name");
        const date = document.querySelector(".article-summary-card .date");

        articleTitleElement.textContent = article.title;
        articleCategoryElement.textContent = article.category;
        articleCoverElement.src = "/uploads/" + article.cover;
        authorAvatarElement.src = "/uploads/" + article.authorAvatar;
        authorName.textContent = article.author.name;
        let realDate = new Date(article.date);
        date.textContent = months[realDate.getMonth()] + " " + realDate.getDate() + ", " + realDate.getFullYear();

        const summaryCard = document.querySelector(".article-summary-card");
        summaryCard.addEventListener("click", () => moveToArticle(article._id));
    }
    else
    {
        console.error(lastArticle);
    }
}
// functions run
userAvatarOrSignInWillAppear();
appearArticles();
//setTheBlogIntroSection();