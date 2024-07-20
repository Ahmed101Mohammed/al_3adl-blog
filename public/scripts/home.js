// constants
const limit = 9;
const page = 1;
let articlesInDom = [];

// appear articles
const appearArticles = async()=>
{
    const data = await getAllArticlesSorted(page, limit, {sortType: "date", sortDirection: -1});
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

// set the home intro section
const setTheHomeIntroSection = async()=>
{
    const lastArticle = await getAllArticlesSorted(1, 1, {sortType: "date", sortDirection: -1});
    if(lastArticle.status === SUCCESS)
    {
        const article = lastArticle.data.articles[0];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const articleTitleElement = document.querySelector(".article-summary-card h2.title a");
        const articleCategoryElement = document.querySelector(".article-summary-card p.category-primary");
        const articleCoverElement = document.querySelector(".intro-img img");
        const authorAvatarElement = document.querySelector(".article-summary-card .author img");
        const authorName = document.querySelector(".article-summary-card .author .name a");
        const date = document.querySelector(".article-summary-card .date");

        articleTitleElement.textContent = article.title;
        articleTitleElement.href = "/article.html?id=" + article._id;
        articleCategoryElement.textContent = article.category;
        articleCoverElement.src = "/uploads/" + article.cover;
        authorAvatarElement.src = "/uploads/" + article.authorAvatar;
        authorName.textContent = article.author;
        authorName.href = "/author-page.html?id=" + article.authorId;
        let realDate = new Date(article.date);
        date.textContent = months[realDate.getMonth()] + " " + realDate.getDate() + ", " + realDate.getFullYear();
    }
    else
    {
        console.error(lastArticle);
    }
}
// functions run
userAvatarOrSignInWillAppear();
appearArticles();
setTheHomeIntroSection();