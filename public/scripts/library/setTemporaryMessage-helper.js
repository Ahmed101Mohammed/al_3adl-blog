const setTemporaryMessage = (message) =>
{
    const temporaryMessage = document.querySelector('.temporary-error-message');
    temporaryMessage.textContent = message;
    temporaryMessage.style.display = "block";

    setTimeout(() =>
    {
        temporaryMessage.style.removeProperty("display");
        temporaryMessage.textContent = "";

    }, 3000);
}