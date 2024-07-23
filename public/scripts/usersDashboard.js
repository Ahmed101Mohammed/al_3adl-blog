// Global Constants
const limit = 20;
const page = 1;
let usersInDom = [];


// functions
const setUsersInDom = async(users) =>
{
    // get the user how open the dashboard id.
    let id;
    const myData = await advancedWithRefresh(async() => await getMyData());
    if(myData.status !== SUCCESS)
    {
        console.error(myData);
        window.location.href = "personal-profile.html";
    }
    else
    {
        id = myData.data.user._id;
    }

    let container = document.querySelector("tbody");
    for(let user of users)
    {
        const userUI = `
                            <tr id="user-id-${user._id}">
                                <td class="user-name">${user.name}</td>
                                <td class="user-email">${user.email}</td>
                                <td class="user-articles-number">${user.publishedArticlesSize}</td>
                                <td class="user-role">
                                    <select name="role" id="">
                                        <option value="admin">admin</option>
                                        <option value="manager">maneger</option>
                                        <option value="user" selected>user</option>
                                    </select>
                                </td>
                            </tr>
                        `;
        container.insertAdjacentHTML("beforeend", userUI);
        const tr = document.querySelector(`#user-id-${user._id}`);
        const select = tr.querySelector("select");
        select.value = user.role;
        if(user._id === id)
        {
            select.disabled = true;
        }
    }
}

const init = async()=>
{
    const respond = await advancedWithRefresh(async()=> await getAllusers(page, limit));
    let users;
    if(respond.status !== SUCCESS)
    {
        console.error(respond);
        return;
        // window.location.href = "index.html";
    }
    else
    {
        users = respond.data.users;
    }
    usersInDom.push(...users);
    setUsersInDom(users);
    
    // load more button
    const loadMoreButton = document.querySelector(".load-more");
    if(users.length === limit)
    {
        loadMoreButton.style.display = "block";
    }
    else
    {
        loadMoreButton.style.removeProperty("display");
    }
}


// running code
userAvatarOrSignInWillAppear()
.then(() => init());