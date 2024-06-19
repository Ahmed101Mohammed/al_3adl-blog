// Specifi behaviour for submit button on sign in page
const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener('click', async(event) => {

    event.preventDefault();
    const name = document.querySelector(`input[name="full-name"]`).value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    try
    {
        const data = await registerUser(name ,email, password);
        if(data.status === SUCCESS)
        {
            window.location.href = 'sign-in.html';
        }
        else
        {
            document.querySelector('.error-message').textContent = data.message;
        }
    }
    catch(e)
    {
        console.error(`Failed in sign up fetching proccess, because of ${e.message}`);
    }
});