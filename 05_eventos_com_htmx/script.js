// aula 01
// document.body.addEventListener('htmx:load', function (event) {
//     // console.log(event);
//     console.log('Carregou a página!');
// });

// aula 02
// document.body.addEventListener('htmx:beforeSwap', function (event) {
//     console.log('Antes do Swap!');
// });

// document.body.addEventListener('htmx:afterSwap', function (event) {
//     console.log('Depois do Swap!');
// });

// aula 03
// document.body.addEventListener('htmx:beforeRequest', function (event) {
//     console.log('Antes do Request!');
// });

// document.body.addEventListener('htmx:afterRequest', function (event) {
//     console.log('Depois do Request!');
// });

// aula 04
// document.body.addEventListener('htmx:responseError', function (event) {
//     alert('Ocorreu um erro interno, tente mais tarde!');
// });

// aula 05
document.body.addEventListener('htmx:configRequest', function (event) {
    event.detail.headers['new_token'] = 'dkgorivn975h38';
    event.detail.parameters['param1'] = 'valor do param 1';
    event.detail.parameters['param2'] = 'valor do param 2';
});