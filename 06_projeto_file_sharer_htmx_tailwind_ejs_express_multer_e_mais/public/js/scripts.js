
document.body.addEventListener('htmx:afterRequest', function (event) {
    // evento para flash message
    const msgElement = document.querySelector('#msg');

    if (msgElement.textContent.trim() !== '') {
        msgElement.classList.remove('hidden');
    }

    // evento para redirecionar login e logout
    const xhr = event.detail.xhr;
    const redirect = xhr.getResponseHeader('HX-Redirect');

    if (redirect) {
        window.location.href = redirect;
    }

    // limpar form
    if (event.target.getAttribute('id') === 'file-form') {
        event.target.reset();
    }
});