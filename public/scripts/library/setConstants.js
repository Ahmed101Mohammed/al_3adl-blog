// set Access token from refresh request:
const setAccessToken = async() =>
{
    let data = await getNewAccessToken();
    if(data.status == SUCCESS)
    {
        accessToken = data.data.accessToken; // Global variable
    }
}

// set user data contant / using get user request
const setUserDataConstant = async()=>
{
    let data = await advancedWithRefresh(async() => await getMyData());
    if(data.status == SUCCESS)
    {
        userData = data.data.user; // Global variable
    }
}