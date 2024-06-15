
const getNewAccessToken = async() =>
{
    try
    {
        const response = await fetch(`${baseUrl}/api/users/refreshToken`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();
        if(data.status == SUCCESS)
        {
            const accessToken = data.data.accessToken;
            console.log({accessToken});
            return accessToken;
        }
        else
        {
            console.error(data);
            return false;
        }
    }
    catch(e)
    {
        console.error(`Failed in get new access token fetching proccess, because of ${e.message}`);
        return false;
    }
}