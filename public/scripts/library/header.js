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

const userAvatarOrSignInWillAppear = async()=>
{
    try
    {
        const accessToken = await getNewAccessToken();
        if(accessToken !== false)
        {
            signInButtonAppearance(false);
            userAvatarApearance(true);
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