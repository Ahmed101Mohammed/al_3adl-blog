// no-posts message appearance
const noPostsAppearance = (status)=>
{
    const noPosts = document.querySelector('.no-posts');

    if(status)
    {   
        noPosts.style.display = "flex";
    }
    else    
    {   
        noPosts.style.removeProperty("display");
    }
}

// posts section appearance
const postsSectionAppearance = (status)=>
{
    const postsSection = document.querySelector('.posts .posts-container');
    if(status)
    {
        postsSection.style.display = "grid";
    }    
    else
    {
        postsSection.style.removeProperty("display");
    }
}

// see more button appearance
const seeMoreButtonAppearance = (status)=>
{
    const seeMoreButton = document.querySelector('.all-posts');
    if(status)
    {
        seeMoreButton.style.display = "flex";
    }
    else
    {
        seeMoreButton.style.removeProperty("display");
    }
}

// article factory
const Article = ({_id ,title, body, author, authorId, cover, category, date, liked, disliked, authorAvatar})=>
{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return {
        id: _id,
        title,
        body,
        author,
        authorId,
        cover,
        category,
        date : new Date(date),
        liked,
        disliked,
        authorAvatar,
        createSimpleHTMLPresentation: function() {
            return `
                <div class="post-card" id="${this.id}">
                    <div class="post-cover">
                        <img src="${baseUrl}/uploads/${cover}" alt="post cover" class="cover">
                    </div>
                    <div class="info">
                        <div class="main-info">
                            <p class="catigory">${category}</p>
                            <h3 class="title">
                                <a href="article.html?id=${this.id}">${title}</a>
                            </h3>
                        </div>
                        <div class="production-details">
                            <div class="author">
                                <img src="uploads/${authorAvatar}" alt="author personal avatar" class="avatar">
                                <p class="name">${author}</p>
                            </div>
                            <p class="date">${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}</p>
                        </div>
                    </div>
                </div>
                `
        },
        addSimpleArticlePresentationToDomContainer: function(container) {
            container.insertAdjacentHTML('beforeend', this.createSimpleHTMLPresentation());
        },
        createFullArticlePresentation: function() {
            return `
                        <div class="article-header">
                            <div class="main-info">
                                <p class="category-primary">${category}</p>
                                <h2 class="title">${title}</h2>
                            </div>
                            <div class="production-details">
                                    <div class="author">
                                        <img src="/uploads/${authorAvatar}" alt="author image"/>
                                        <p class="name">${author}</p>
                                    </div>
                                    <p class="date">${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}</p>
                            </div>
                        </div>
                        <div class="article-cover">
                            <img src="${baseUrl}/uploads/${cover}" alt="article cover">
                        </div>
                        <div class="article-body">
                        
                        </div>
            `
        }

    }
}