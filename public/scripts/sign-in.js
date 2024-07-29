// Specifi behaviour for submit button on sign in page
const submitButton = document.querySelector('button[type="submit"]');

submitButton.addEventListener('click', (event) => {

    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    signUser(email, password).then((data) => {
        if(data.status === SUCCESS)
        {
            window.location.href = 'index.html';
        }
        else
        {
            document.querySelector('.error-message').textContent = data.message;
        }
    })
    .catch((e) => {
        console.error(`Failed in sign in fetching proccess, because of ${e.message}`);
    });
    
});
