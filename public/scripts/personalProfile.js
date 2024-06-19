// UI Controlers:
// 1. Main content appearanc
const mainPageAppearance = (status) =>
{
    const pageContent = document.querySelector('main');
    if(status)
    {
        pageContent.style.display = "grid";
    }
    else
    {
        pageContent.style.removeProperty("display");
    }
}
// 2. profile page appearance
const profilePageAppearance = (status) =>
{
    const profilePage = document.querySelector('.profile');
    if(status)
    {
        profilePage.style.display = "flex";
        errorPageAppearance(false);
        dashboardPageAppearance(false);
    }
    else
    {
        profilePage.style.removeProperty("display");
    }
}


// 3. error page appearance
const errorPageAppearance = (status) =>
{
    const errorPage = document.querySelector('.loading-page-error');
    if(status)
    {
        errorPage.style.display = "flex";
        profilePageAppearance(false);
        dashboardPageAppearance(false);
    }
    else
    {
        errorPage.style.removeProperty("display");
    }
}

// 4. set message for error page
const setErrorMessage = (message) =>
{
    const errorPage = document.querySelector('.loading-page-error-text');
    errorPage.innerText = message;
}

// 5. set user profile data
const setProfile = (data) =>
{
    const profile = document.querySelector('.profile');
    profile.innerHTML = `
        <div class="personal-photo">
                                <div class="photo">
                                    <img src="uploads/${data.avatar100}" alt="profile image">
                                </div>
                                <button class="upload-btn">Upload Photo</button>
                            </div>

                            <div class="personal-info">
                                <div class="info name">
                                    <h3 class="info-title">your name</h3>
                                    <div class="info-data">
                                        <input type="text" disabled value="${data.name}">
                                        <button class="edit-btn">Edit</button>
                                    </div>
                                </div>
                                <div class="info email">
                                    <h3 class="info-title">email</h3>
                                    <div class="info-data">
                                        <input type="text" disabled value="${data.email}">
                                        <button class="edit-btn">Edit</button>
                                    </div>
                                </div>

                            </div>
    `;
}

// 6. dashboard linkItem appearanc
const dashboardLinkItemAppearance = (status) =>
{
    const dashboardLinkItem = document.querySelector('.dashboard-item');
    if(status)
    {
        dashboardLinkItem.style.display = "flex";
    }
    else
    {
        dashboardLinkItem.style.removeProperty("display");
    }
}

// 7. dashboard page apparance
const dashboardPageAppearance = (status) =>
{
    const dashboardPage = document.querySelector('.dashboard');
    if(status)
    {
        dashboardPage.style.display = "flex";
        errorPageAppearance(false);
        profilePageAppearance(false);
    }
    else
    {
        dashboardPage.style.removeProperty("display");
    }
}

// 8. set page title
const setPageTitle = (title) =>
{
    const pageTitle = document.querySelector('.page-title');
    pageTitle.innerText = title;
}

// functionlaity running
const personalProfileIntialize = async() =>
{
    try
    {
        await userAvatarOrSignInWillAppear();
        if(!accessToken)
        {
            window.location.href = "sign-in.html";
            return;
        }

        // 1: appear the main content
        mainPageAppearance(true);

        // 2: get user personal data
        if(!userData && accessToken)
        {
            await setUserDataConstant();            
        }

        setProfile(userData);

        // 3: appear profile page
        profilePageAppearance(true);

        // 4: set page title
        setPageTitle("My Profile");

        // 5: appear dashboard  link item
        if(userData.role === "admin")
        {
            dashboardLinkItemAppearance(true);
        }
        
    }
    catch(e)
    {
        console.error(e);
    }

}

personalProfileIntialize();

// set some evenets
const profileItem = document.querySelector('.profile-item');
profileItem.addEventListener('click', personalProfileIntialize);

const dashboardItem = document.querySelector('.dashboard-item');
dashboardItem.addEventListener('click', () => {
    dashboardPageAppearance(true);
    profilePageAppearance(false);
    errorPageAppearance(false);

    setPageTitle("Dashboard");
});

const logOutItem = document.querySelector('.logout-item');
logOutItem.addEventListener('click', async() =>
{
    try
    {
        const data = await logoutAdvanced();
        if(data.status === SUCCESS)
        {
            window.location.href = "sign-in.html";
        }
    }
    catch(e)
    {
        console.error(e);
    }
})