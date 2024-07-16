// Library prerequirments:
// - globalConstants library: const baseUrl = "http://localhost:3000";

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
                                ${title}
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
        }

    }
}