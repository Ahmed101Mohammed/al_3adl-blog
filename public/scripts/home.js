userAvatarOrSignInWillAppear();
// constants
const limit = 9;
const page = 1;
const articles = [];
// get articles from database
const getArticles = async()=>
{
    try
    {
        const response = await fetch(`${baseUrl}/api/articles?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();

        console.log({data});
        return data;
    }
    catch(e)
    {
        console.error(`Failed in get articles fetching proccess, because of ${e.message}`);
        return false;
    }
}

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