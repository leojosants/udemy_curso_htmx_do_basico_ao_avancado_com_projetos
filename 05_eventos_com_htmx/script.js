// aula 01
document.body.addEventListener('htmx:load', function (event) {
    // console.log(event);
    console.log('Carregou a página!');
});

// aula 02
// doc;

// aula 03
document.body.addEventListener('htmx:beforeRequest', function (event) {
    console.log('Antes do Request!');
});

document.body.addEventListener('htmx:afterRequest', function (event) {
    console.log('Depois do Request!');
});

// aula 04
document.body.addEventListener('htmx:responseError', function (event) {
    alert('Ocorreu um erro interno, tente mais tarde!');
});

// aula 05
document.body.addEventListener('htmx:configRequest', function (event) {
    event.detail.headers['new_token'] = 'dkgorivn975h38';
    event.detail.parameters['param1'] = 'valor do param 1';
    event.detail.parameters['param2'] = 'valor do param 2';
});

// aula 06
htmx.logger = function (event, element, data) {
    console.log(event);
    console.log(element);
    console.log(data);
}

// aula 08
const customEventButton = document.querySelector('#custom-event-button');

customEventButton.addEventListener('click', function () {
    htmx.trigger(customEventButton, 'customEvent');
});

document.body.addEventListener('customEvent', function (event) {
    console.log('Evento acionado!');
    htmx.ajax(
        'GET',
        'http://localhost:3000/customEvent',
        '#custom-event-response'
    );
});