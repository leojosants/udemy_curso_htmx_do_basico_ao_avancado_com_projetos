document.body.addEventListener('htmx:afterRequest', function (event) {
    if (event.target.id === 'load-user-data') {
        const response = JSON.parse(event.detail.xhr.responseText);
        const userDataDiv = document.querySelector('#user-data-2');

        userDataDiv.innerHTML = `
            <p>Nome: ${response.name}</p>
            <p>Idade: ${response.age} ano(s)</p>
            <p>País: ${response.location}</p>
        `;
    }
});