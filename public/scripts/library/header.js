const signInButtonAppearance = (status)=>
{
    let signInButton = document.querySelector("header nav a.sign-link");
    if(status)
    {
        signInButton.style.display = "inline";
    }
    else
    {
        signInButton.style.removeProperty("display");
    }
}

const userAvatarApearance = (status)=>
{
    let userAvatar = document.querySelector("header nav a.user-home-page-link");
    if(status)
    {
        userAvatar.style.display = "inline";
    }
    else
    {
        userAvatar.style.removeProperty("display");
    }
}

const setUserAvatarPhoto = (url)=>
{
    let userAvatar = document.querySelector("header nav a.user-home-page-link");
    userAvatar.innerHTML = `<img src="/uploads/${url}" alt="user avatar">`;
}

const userAvatarOrSignInWillAppear = async()=>
{
    try
    {
        await setAccessToken();
        if(accessToken)
        {
            signInButtonAppearance(false);
            await setUserDataConstant(localStorage.getItem("userId"));
            userAvatarApearance(true);
            if(userData)
            {
                setUserAvatarPhoto(userData.avatar36);
            }
        }
        else
        {
            signInButtonAppearance(true);
            userAvatarApearance(false);
        }
        
    }
    catch(e)
    {
        console.error(e);
        signInButtonAppearance(true);
        userAvatarApearance(false);
    }
}