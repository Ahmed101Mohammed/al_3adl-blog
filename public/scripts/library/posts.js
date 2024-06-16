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
        postsSection.style.display = "flex";
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
const Article = (title, body, author, authorId, cover, category, date, liked, disliked)=>
{
    return {
        title,
        body,
        author,
        authorId,
        cover,
        category,
        date,
        liked,
        disliked,
        createSimpleHTMLPresentation: function() {
            return `
                <div class="post-card">
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
                                <img src="public/assets/avatar0.png" alt="author personal avatar" class="avatar">
                                <p class="name">${author}</p>
                            </div>
                            <p class="date">${date}</p>
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