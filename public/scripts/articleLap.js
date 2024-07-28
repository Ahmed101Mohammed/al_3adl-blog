// article id
const articleId = window.URL.parse(window.location.href).searchParams.get("id");
// importing
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
// set header
const main = document.querySelector("main");
main.classList.add("d-none");
userAvatarOrSignInWillAppear()
.then(()=>
{
    main.classList.remove("d-none");
});
// global variables
let currentStep = 1;
let validArticleImage = false;
let validArticleTitle = false;
let editedArticle;
let status = "adding";

// set status
const setStatus = async (articleId) =>
{
    if(articleId)
    {
        status = "editing";
        let data = await advancedWithRefresh(async() => await getArticle(articleId));  
        if(data.status === SUCCESS)
        {
            editedArticle = data.data.article;
        }
        else
        {
            setTemporaryMessage(data.message);
            return;
        }
    } 
}

// set article content with markdown or html
const mdContent = document.querySelector(".md-content");
const articleContent = document.querySelector(".preview");

mdContent.addEventListener("input", (event) => {
    let content = event.target.value;
    articleContent.innerHTML = marked.parse(content);
    articleContent.scrollTop = articleContent.scrollHeight;
})

// appearance apis
const articleContentPageApearance = (status) => 
{
    const articleContentPage = document.querySelector(".article-content");
    if(status)
    {
        articleContentPage.style.removeProperty("display");
    }
    else
    {
        articleContentPage.style.display = "none";
    }
}

const articleHeaderPageAppearance = (status) => 
{
    const articleHeader = document.querySelector(".article-header");
    if(status)
    {
        articleHeader.classList.remove("d-none");
    }
    else
    {
        articleHeader.classList.add("d-none");
    }
}

// Intial page for edditing
const initialEditingPage = () =>
{
    if(!editedArticle) return;
    document.querySelector("#article-title").value = editedArticle.title;
    document.querySelector("#article-category").value = editedArticle.category;
    document.querySelector("textarea").value = editedArticle.body;
    document.querySelector("div.article-cover").style.backgroundImage = `url(/uploads/${editedArticle.cover})`;
    document.querySelector("div.article-cover span.badge").textContent = categoryValuePresentation(editedArticle.category);
    document.querySelector("div.article-cover p").classList.add("d-none");

    let step1Circle = document.querySelector("button.step-1");
    step1Circle.classList.remove("btn-secondary");
    step1Circle.classList.add("btn-primary");

    let progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = "50%";

    let previouseButton = document.querySelector(".previouse");
    previouseButton.classList.remove("d-none");

    nextOrDoneButton.textContent = "Done";

    articleHeaderPageAppearance(true);
    articleContentPageApearance(false);
    currentStep = 2;
    articleContent.scrollTop = 0;
    validArticleImage = true;
    validArticleTitle = true;
}
setStatus(articleId)
.then(() => initialEditingPage());
// functionality of next/done button
const nextOrDoneButton = document.querySelector(".next");
nextOrDoneButton.addEventListener("click", async() => 
{
    if(currentStep === 1)
    {
        const textAreaContent = document.querySelector("textarea");
        if(textAreaContent.value.length < 200)
        {
            const articleContent = document.querySelector(".preview");
            const reminder = 200 - textAreaContent.value.length;
            articleContent.innerHTML = marked.parse("<p class='text-danger'>Minimum 200 characters required, you have " + reminder + " characters left.</p>");
            document.querySelector("html").scrollTop = 0;
            return;
        }

        let step1Circle = document.querySelector("button.step-1");
        step1Circle.classList.remove("btn-secondary");
        step1Circle.classList.add("btn-primary");

        let progressBar = document.querySelector(".progress-bar");
        progressBar.style.width = "50%";

        let previouseButton = document.querySelector(".previouse");
        previouseButton.classList.remove("d-none");

        nextOrDoneButton.textContent = "Done";

        articleContentPageApearance(false);
        articleHeaderPageAppearance(true);
        currentStep = 2;
        document.querySelector("html").scrollTop = 0;
    }
    else if(currentStep === 2)
    {
        if(!validArticleImage || !validArticleTitle)
        {
            return;
        }

        const articleBody = document.querySelector("textarea").value;
        const articleCover = document.querySelector("#article-cover").files[0];
        const articleTitle = document.querySelector("#article-title").value;
        const articleCategory = document.querySelector("#article-category").value;
        const date = editedArticle ? new Date(editedArticle.date) : new Date();
        const articleData = {
            body: articleBody,
            title: articleTitle,
            category: articleCategory,
            date: date,
            cover: articleCover
        }

        const formData = new FormData();
        formData.append("title", articleData.title);
        formData.append("body", articleData.body);
        formData.append("category", articleData.category);
        formData.append("date", articleData.date);
        formData.append("cover", articleData.cover);

        if(status === "adding")
        {
            const data = await advancedWithRefresh(async() => await postArticle(formData));
            if(data.status === SUCCESS)
            {
                setTemporaryMessage("Article created successfully");
                window.location.href = "article.html?id=" + data.data.article._id;
            }
            else
            {
                setTemporaryMessage(data.message);
            }
        }
        else if(status == "editing")
        {
            const data = await advancedWithRefresh(async() => await updateArticle(articleId, formData));
            if(data.status === SUCCESS)
            {
                setTemporaryMessage("Article updated successfully");
                window.location.href = "article.html?id=" + articleId;
            }
            else
            {
                setTemporaryMessage(data.message);
            }
        }
    }
})


const previouseButton = document.querySelector(".previouse");
previouseButton.addEventListener("click", () => 
{
    let step1Circle = document.querySelector("button.step-1");
    step1Circle.classList.remove("btn-primary");
    step1Circle.classList.add("btn-secondary");

    let progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = "0%";

    previouseButton.classList.add("d-none");
    nextOrDoneButton.textContent = "Next";
    articleContentPageApearance(true);
    articleHeaderPageAppearance(false);
    currentStep = 1;
    document.querySelector("html").scrollTop = 0;
})

// Image handler
const imageInput = document.querySelector("#article-cover");
const errorContainer = document.querySelector(".error-container");
const errorMessage = document.querySelector(".error-container .error-message");
imageInput.addEventListener("change", (event) =>
{
    imageInput.style.borderColor = "red";
    const articleCoverParagraph = document.querySelector(".article-cover p");
    const articleCover = document.querySelector(".article-cover");
    if(!errorContainer.classList.contains("d-none"))
    {
        errorContainer.classList.add("d-none");
        errorMessage.textContent = "";
    }

    if(articleCoverParagraph.classList.contains("d-none"))
    {
        articleCoverParagraph.classList.remove("d-none");
        articleCover.style.backgroundImage = "none";
    }

    const file = event.target.files[0];
    if(!file)
    {
        errorContainer.classList.remove("d-none");
        errorMessage.textContent = "Please select an image";
        validArticleImage = false;
        return;
    }

    if(file.size > (1 * 1024 * 1024))
    {
        errorContainer.classList.remove("d-none");
        errorMessage.textContent = "File size should be less than 1 MB";
        validArticleImage = false;
        return;
    }

    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => 
    {
        const width = image.naturalWidth;
        const height = image.naturalHeight;
        if(width !== 1216 || height !== 600)
        {
            errorContainer.classList.remove("d-none");
            errorMessage.textContent = "Please select an image of 1216 x 600";
            validArticleImage = false;
            return;
        }

        articleCoverParagraph.classList.add("d-none");

        articleCover.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
        articleCover.style.backgroundSize = "cover";
        articleCover.style.backgroundPosition = "center";
        articleCover.style.backgroundRepeat = "no-repeat";
        validArticleImage = true;

        imageInput.style.borderColor = "green";
    }
    image.onerror = () => 
    {
        errorContainer.classList.remove("d-none");
        errorMessage.textContent = "Please select an image";
        validArticleImage = false;
        return;
    }
})


// title handler
const titleInput = document.querySelector("#article-title");
titleInput.addEventListener("input", (event) => 
{
    titleInput.style.borderColor = "red";
    const title = event.target.value;
    if(title.length < 7 || title.length > 60)
    {
        errorContainer.classList.remove("d-none");
        errorMessage.textContent = "Title should be between 7 to 60 characters";
        validArticleTitle = false;
        return;
    }
    errorContainer.classList.add("d-none");
    errorMessage.textContent = "";
    validArticleTitle = true;
    titleInput.style.borderColor = "green";

    const articleTitle = document.querySelector("h2.article-title");
    articleTitle.textContent = title;
})

// category handler
const categoryValuePresentation = (category) =>
{
    switch(category)
    {
        case "general":
            return "General";
        case "technology":
            return "Technology";
        case "os":
            return "OS";
        case "networking":
            return "Networking";
        case "architecture":
            return "Architecture";
        case "tech-industry":
            return "Tech-industry";
        default:
            return "General";
    }
}

const categoryInput = document.querySelector("#article-category");
categoryInput.addEventListener("change", (event) => 
{
    categoryInput.style.borderColor = "green";
    const categoryBadge = document.querySelector(".badge");
    categoryBadge.textContent = categoryValuePresentation(categoryInput.value);
})