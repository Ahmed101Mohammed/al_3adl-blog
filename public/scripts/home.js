// constants
const limit = 9;
const page = 1;
const articles = [];
// function to move to single article page
const moveToArticle = (id) =>
{
    window.location.href = `article.html?id=${id}`;
}

// appear articles
const appearArticles = async()=>
{
    const data = await getArticles();
    if(data.status === SUCCESS && data.data.articles.length > 0)
    {
        const articles = data.data.articles;
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
            seeMoreButtonAppearance(false);
        }

        for(let article of articles)
        {
            const articleUI = new Article(article);
            console.log({article, articleUI});
            articleUI.addEventListener('click', ()=> moveToArticle(article._id));
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

appearArticles();
// functions run
userAvatarOrSignInWillAppear();