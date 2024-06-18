// get accessToken using refresh request
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
        return data;
    }
    catch(e)
    {
        console.error(`Failed in get new access token fetching proccess, because of ${e.message}`);
        return false;
    }
}

// get user request / using userId
const getUserPersonalData = async (userId)=>
    {
        try
        {
            const response = await fetch(`${baseUrl}/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                },
                credentials: 'include'
            });
            const data = await response.json();
            return data;
        }
        catch(e)
        {
            console.error(`Failed in get user personal data fetching proccess, because of ${e.message}`);
            return false;
        }
    }
const getUserPersonalDataAdvanced = async(userId)=>
{
    const data = await getUserPersonalData(userId);
    if(data.status === FAIL && data.errorType === UNAUTHORIZED)
    {
        let data = await getNewAccessToken();
        if(data.status === SUCCESS)
        {
            accessToken = data.data.accessToken;
        }
        return await getUserPersonalData(userId);
    }
    else
    {
        return data;
    }

}

// sign in
const signUser = async (userEmail, userPassword) => {
    try
    {
        const response = await fetch(`${baseUrl}/api/users/sign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            }),
            credentials: 'include'
        })
    
        const data = await response.json();

        return data;
    }
    catch(e)
    {
        console.error(`Failed in sign in fetching proccess, because of ${e.message}`);
        return false;
    }
}

// logout
const logout = async()=> 
{
    console.log("LOGGING OUT");
    try
    {
        const response = await fetch(`${baseUrl}/api/users/logout`, 
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${accessToken}`
                },
                credentials: 'include'
            }
        );
        
        let data = await response.json();
        return data;
    }
    catch(e)
    {
        console.error(e);
        return e;
    }
}

const logoutAdvanced = async()=>
{
    const data = await logout();
    if(data.status === FAIL && data.errorType === UNAUTHORIZED)
    {
        let data = await getNewAccessToken();
        if(data.status === SUCCESS)
        {
            accessToken = data.data.accessToken;
        }

        return await logout();
    }
    else
    {
        return data;
    }
}

// get articles from database
const getArticles = async()=>
{
    try
    {
        const response = await fetch(`${baseUrl}/api/articles?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    }
    catch(e)
    {
        console.error(`Failed in get articles fetching proccess, because of ${e.message}`);
        return false;
    }
}