// set Access token from refresh request:
const setAccessToken = async() =>
{
    let data = await getNewAccessToken();
    if(data.status == SUCCESS)
    {
        accessToken = data.data.accessToken;
    }
    else
    {
        console.error(data);
        if(data.status === FAIL && data.errorType === UNAUTHORIZED)
        {
            localStorage.clear();
        }
    }
}

// set user data contant / using get user request
const setUserDataConstant = async()=>
{
    const userId = localStorage.getItem("userId");
    let data = await getUserPersonalDataAdvanced(userId);
    if(data.status == SUCCESS)
    {
        userData = data.data.user;
    }
    else
    {
        console.error(data);
        if(data.status === FAIL && data.errorType === UNAUTHORIZED)
        {
            console.log("UNAUTHORIZED");
            localStorage.clear();
        }
    }
}