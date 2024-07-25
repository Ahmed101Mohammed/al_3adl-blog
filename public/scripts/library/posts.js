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
const Article = ({_id ,title, body, author, cover, category, date, disLikesNumber, likesNumber})=>
{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return {
        id: _id,
        title,
        body,
        author: author.name,
        authorId: author.authorId,
        cover,
        category,
        date : new Date(date),
        liked: likesNumber,
        disliked: disLikesNumber,
        authorAvatar: author.avatar,
        createSimpleHTMLPresentation: function() {
            return `
                <div class="post-card" id="${this.id}">
                    <div class="post-cover">
                        <img src="${baseUrl}/uploads/${this.cover}" alt="post cover" class="cover">
                    </div>
                    <div class="info">
                        <div class="main-info">
                            <p class="catigory">${this.category}</p>
                            <h3 class="title">
                                <a href="article.html?id=${this.id}">${this.title}</a>
                            </h3>
                        </div>
                        <div class="production-details">
                            <div class="author">
                                <img src="uploads/${this.authorAvatar}" alt="author personal avatar" class="avatar">
                                <p class="name">
                                    <a href="author-page.html?id=${this.authorId}">${this.author}</a>
                                </p>
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
                                <p class="category-primary">${this.category}</p>
                                <h2 class="title">${this.title}</h2>
                            </div>
                            <div class="production-details">
                                    <div class="author">
                                        <img src="/uploads/${this.authorAvatar}" alt="author image"/>
                                        <p class="name">
                                            <a href="author-page.html?id=${this.authorId}">${this.author}</a>
                                        </p>
                                    </div>
                                    <p class="date">${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}</p>
                            </div>
                        </div>
                        <div class="article-cover">
                            <img src="${baseUrl}/uploads/${this.cover}" alt="article cover">
                        </div>
                        <div class="article-body">
                        
                        </div>
            `
        },
        createTableRawPresentation: function() 
        {
            return `
                        <tr id="${this.id}">
                            <td class="article-title">${this.title}</td>
                            <td class="article-author">${this.author}</td>
                            <td>${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}</td>
                            <td>${category}</td>
                            <td>
                                <a href="article-lap.html?id=${this.id}" class="">
                                    <span class="material-symbols-outlined edit">
                                        edit
                                    </span>
                                </a>
                            </td>
                            <td>
                                <span class="material-symbols-outlined delete">
                                delete
                                </span>
                            </td>
                            <td class="view-article">
                                <a href="article.html?id=${this.id}" class="">
                                    <span class="material-symbols-outlined view">
                                    visibility
                                    </span>
                                </a>
                            </td>
                        </tr>
                    `;
        }

    }
}