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

// sign up
const registerUser = async (userFullName, userEmail, userPassword) => {
    try
    {
        const response = await fetch(`${baseUrl}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userFullName,
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
        console.error(`Failed in sign up fetching proccess, because of ${e.message}`);
        return false;
    }
}

// logout
const logout = async()=> 
{
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

// advanced api request
const advancedWithRefresh = async(request)=>
{
    const data = await request();
    // console.log({data});
    if(data.status === FAIL && data.errorType === UNAUTHORIZED)
    {
        let data = await getNewAccessToken();
        if(data.status === SUCCESS)
        {
            accessToken = data.data.accessToken;
        }

        return await request();
    }
    else
    {
        return data;
    }
}
// get articles from database
const getArticles = async(page, limit)=>
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

// get articles sorted
const getSortedArticles = async(sortType, page, limit)=>
{
    try
    {
        const response = await fetch(`${baseUrl}/api/articles/sorted?sort=${sortType}&page=${page}&limit=${limit}`, {
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
        console.error(`Failed in get sorted articles fetching proccess, because of ${e.message}`);
        return false;
    }
}

// get articles for user by id
const getArticlesOfUser = async(userId, page, limit)=>
    {
        try
        {
            const response = await fetch(`${baseUrl}/api/articles/user/${userId}?page=${page}&limit=${limit}`, {
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
            console.error(`Failed in get articles of user with ${userId} id in fetching proccess, because of ${e.message}`);
            return false;
        }
    }
// get article by id
const getArticle = async(articleId)=>
{
    try
    {
        const response = await fetch(`${baseUrl}/api/articles/${articleId}`, {
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
        console.error(`Failed in get article fetching proccess, because of ${e.message}`);
        return false;
    }
}

// edit user data
const updateUserData = async (userData, userId) => 
{
    try
    {
        const response = await fetch(`${baseUrl}/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(userData),
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    }
    catch(e)
    {
        console.error(`Failed in update user data fetching proccess, because of ${e.message}`);
        return false;
    }
}

const updateUserDataForm = async (userData, userId) =>
{
    try
    {
        const response = await fetch(`${baseUrl}/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'authorization': `Bearer ${accessToken}`
            },
            body: userData,
            credentials: 'include'
        });

        const data = await response.json();
        return data;
    }
    catch(e)
    {
        console.error(`Failed in update user data fetching proccess, because of ${e.message}`);
        return false;
    }
}

// post an article with form data
const postArticle = async (articleData) => 
{
    try
    {
        const response = await fetch(`${baseUrl}/api/articles`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${accessToken}`
            },
            body: articleData,
            credentials: 'include'
        });
        const data = await response.json();
        return data;
    }
    catch(e)
    {
        console.error(`Failed in post article fetching proccess, because of ${e.message}`);
        return false;
    }
}