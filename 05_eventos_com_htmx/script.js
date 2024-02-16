document.body.addEventListener('htmx:load', function (event) {
    // console.log(event);
    console.log('Carregou a página!');
});

document.body.addEventListener('htmx:beforeSwap', function (event) {
    console.log('Antes do Swap!');
});

document.body.addEventListener('htmx:afterSwap', function (event) {
    console.log('Depois do Swap!');
});