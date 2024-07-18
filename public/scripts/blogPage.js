// constants
let limit = 9;
let page = 1;
let articlesInDom = [];
// function to move to single article page
const moveToArticle = (id) =>
{
    window.location.href = `article.html?id=${id}`;
}

// appear articles
const appearArticles = async()=>
{
    const data = await getSortedArticles(-1 ,page, limit);
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

// set the blog intro section
const setTheBlogIntroSection = async()=>
{
    const article = articlesInDom[0];

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const mostLikedPostSection = document.querySelector("section.most-liked-article");
    const articleTitleElement = document.querySelector(".intro-article-card .article-info h3.title a");
    const articleCategoryElement = document.querySelector(".intro-article-card p.category-primary");
    const articleCoverElement = document.querySelector(".intro-article-card img");
    const authorAvatarElement = document.querySelector(".intro-article-card .author img");
    const authorName = document.querySelector(".intro-article-card .author .name");
    const date = document.querySelector(".intro-article-card .date");

    articleTitleElement.textContent = article.title;
    articleTitleElement.href = "/article.html?id=" + article._id;
    articleCategoryElement.textContent = article.category;
    articleCoverElement.src = "/uploads/" + article.cover;
    authorAvatarElement.src = "/uploads/" + article.authorAvatar;
    authorName.textContent = article.author.name;
    let realDate = new Date(article.date);
    date.textContent = months[realDate.getMonth()] + " " + realDate.getDate() + ", " + realDate.getFullYear();
    
    const introArticleCared = document.querySelector(".most-liked-article .intro-article-card");
    const introImage = introArticleCared.querySelector("img");
    introImage.remove();
    resizeImageWithHeightAndFixedWidth(`${baseUrl}/uploads/${article.cover}`, 450, introArticleCared);   
     
    mostLikedPostSection.style.display = "block";
}
// functions run
userAvatarOrSignInWillAppear();
appearArticles().then(() => setTheBlogIntroSection());