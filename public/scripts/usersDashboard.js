// Global Constants
const limit = 20;
const page = 1;
let usersInDom = [];


// functions
const setUsersInDom = async(users) =>
{
    console.log({users});
    const container = document.querySelector(".tbody");
    users.each((user) =>
    {
        const userUI = `
                            <tr id="${user._id}">
                                <td class="user-name">${user.name}</td>
                                <td class="user-email">${user.email}</td>
                                <td class="user-articles-number">100</td>
                                <td class="user-role">
                                    <select name="role" id="">
                                        <option value="admin">admin</option>
                                        <option value="manager">maneger</option>
                                        <option value="user" selected>user</option>
                                    </select>
                                </td>
                            </tr>
                        `
    })
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
    console.log(users)
    // setUsersInDom(users);
}


// running code
userAvatarOrSignInWillAppear()
.then(() => init());