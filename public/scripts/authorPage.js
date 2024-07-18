// global variables
let limit = 9;
let page = 1;
let articlesInDom = [];

const userId = window.URL.parse(window.location.href).searchParams.get("id");

if(!userId)
{
    window.location.href = "index.html";
}

// Intial page intro
const intialPageIntro = (article)=>
{

    const userData = {avatar: article.authorAvatar, name: article.author};
    const userImageElement = document.querySelector(".author img");
    const userNameElement = document.querySelector(".author p.name");

    userImageElement.src = `/uploads/${userData.avatar}`;
    userNameElement.textContent = userData.name;
}

// generate leatest articles by user id
const setleatestArticles = async ()=>
{
    const respond = await advancedWithRefresh(async()=> await getArticlesOfUser(userId, page, limit));

    if(respond.status !== SUCCESS)
    {
        console.error(respond);
        return;
        // window.location.href = "index.html";
    }

    const articles = respond.data.articles;
    if(articles.length > 0)
    {
        articlesInDom.push(...articles);
        intialPageIntro(articles[0]);
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

// runing code;
userAvatarOrSignInWillAppear();
setleatestArticles();