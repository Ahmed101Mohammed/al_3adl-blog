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
                                   <img src="uploads/${data.avatar}" alt="profile image">
                                </div>
                                <button class="upload-btn">Upload Photo</button>
                            </div>

                            <div class="personal-info">
                                <div class="info name">
                                    <h3 class="info-title">your name</h3>
                                    <div class="info-data name">
                                        <input type="text" disabled value="${data.name}">
                                        <button class="edit-btn">Edit</button>
                                    </div>
                                </div>
                                <div class="info email">
                                    <h3 class="info-title">email</h3>
                                    <div class="info-data email">
                                        <input type="email" disabled value="${data.email}">
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

// 9. edit name behaviour
const editNameFullBehaviour = () =>
{
    let previousName = "";
    const editName = document.querySelector('.name .edit-btn');
        editName.addEventListener('click', async() =>
        {
            const name = document.querySelector('.name input');
            const userData = {};
            if(name.disabled)
            {
                previousName = name.value;
                name.disabled = false;
                name.focus();
                editName.textContent = "Save";
            }
            else
            {
                name.disabled = true;
                editName.textContent = "Edit";
                const newName = name.value;
                userData.name = newName;
                const userId = localStorage.getItem("userId");
                const data = await advancedWithRefresh(async() => await updateUserData(userData, userId));
                if(data.status === SUCCESS)
                {
                    setTemporaryMessage("Name updated successfully");
                }
                else
                {
                    setTemporaryMessage(data.message);
                    name.value = previousName;
                }
            }                
        });
}

// 10. edit email behaviour
const editEmailFullBehaviour = () =>
{
    let previousEmail = "";
    const editEmail = document.querySelector('.email .edit-btn');
        editEmail.addEventListener('click', async() =>
        {
            const email = document.querySelector('.email input');
            const userData = {};
            if(email.disabled)
            {
                previousEmail = email.value;
                email.disabled = false;
                email.focus();
                editEmail.textContent = "Save";
            }
            else
            {
                editEmail.textContent = "Edit";
                const newEmail = email.value;
                userData.email = newEmail;
                const userId = localStorage.getItem("userId");
                const data = await advancedWithRefresh(async() => await updateUserData(userData, userId));
                if(data.status === SUCCESS)
                {
                    setTemporaryMessage("Email updated successfully");
                }
                else
                {
                    setTemporaryMessage(data.message);
                    email.value = previousEmail;
                }
                email.disabled = true;
            }   
        });
}

// 11. edit user photo behaviour
const editUserPhoto = () =>
{
    const editUserPhotoElement = document.querySelector('.personal-photo .upload-btn');
    editUserPhotoElement.addEventListener('click', () =>
    {
        const formContainer = document.querySelector('.filter');
        formContainer.style.display = "flex";
    });
}

// 12. temporary message
const setTemporaryMessage = (message) =>
{
    const temporaryMessage = document.querySelector('.temporary-error-message');
    temporaryMessage.textContent = message;
    temporaryMessage.style.display = "block";

    setTimeout(() =>
    {
        temporaryMessage.style.removeProperty("display");
        temporaryMessage.textContent = "";

    }, 3000);
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

        // 6: add event for edit btns
        editNameFullBehaviour();
        editEmailFullBehaviour();
        editUserPhoto();
        
        
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

const editPhotoContainer = document.querySelector(".filter");
editPhotoContainer.addEventListener('click', (event) =>
{
    if(event.target.classList.contains("filter"))
    {
        editPhotoContainer.style.removeProperty("display");
    }
})

let acceptedFile = false;
const uploadPhotoButton = document.querySelector(".filter form button");
uploadPhotoButton.addEventListener('click', async(event) =>
{
    // 1MB in Bytes is 1,048,576
    event.preventDefault();
    const uploadPhotoInput = document.querySelector(".filter form input");
    const file = uploadPhotoInput.files[0];

    const formData = new FormData();
    formData.append('avatar', file);

    const userId = localStorage.getItem("userId");
    const data = await advancedWithRefresh(async() => await updateUserDataForm(formData, userId));
    if(data.status === SUCCESS)
    {
        editPhotoContainer.style.removeProperty("display");
        setTemporaryMessage("Profile photo updated successfully");
        const getUserDataRes = await advancedWithRefresh(async()=> await getUserPersonalData(userId));
        const userNewData = getUserDataRes.data.user;
        const profileImage = document.querySelector(".personal-photo .photo img");
        const headerImage = document.querySelector(".user-home-page-link img");
        profileImage.src =  `uploads/${userNewData.avatar}`;
        headerImage.src =  `uploads/${userNewData.avatar}`;
    }
    else
    {
        console.error({data});
    }
})

const uploadPhotoInput = document.querySelector(".filter form input");
uploadPhotoInput.addEventListener('change', (event) =>
{
    acceptedFile = true;
    const errorContainer = document.querySelector(".filter .error-message-container");
    const errorTxt = document.querySelector(".filter .error-message-container .error-message");
    errorContainer.style.removeProperty("display");
    errorTxt.textContent = "";
    const file = event.target.files[0];
    if(file && file.size > (1 * 1024 * 1024))
    {
        errorContainer.style.display = "flex";
        errorTxt.textContent = "File size should be less than 1 MB";
        acceptedFile = false;
    }
    else if(file)
    {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () =>
        {
            const imgWidth = img.width;
            const imgHeight = img.height;
            if(imgWidth !== 100 || imgHeight !== 100)
            {
                errorContainer.style.display = "flex";
                errorTxt.textContent = "Your avatar dimention should be equal 100x100.";
                acceptedFile = false;
            }
        }
    }
    else if(!file)
    {
        errorContainer.style.display = "flex";
        errorTxt.textContent = "Please select a file";
        acceptedFile = false;
    }

})