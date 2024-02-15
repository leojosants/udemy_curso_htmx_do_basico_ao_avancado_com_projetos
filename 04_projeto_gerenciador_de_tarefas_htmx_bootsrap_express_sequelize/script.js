document.body.addEventListener('htmx:afterRequest',
    function (event) {
        if (event.target.getAttribute('id') === 'todo-form') {
            resetForm();
            updateTaskList();
        }
    }
);

// resetar formulario
function resetForm() {
    document.querySelector('#todo-form').reset();
}

// atualizar a lista
function updateTaskList() {
    htmx.ajax('GET', 'http://localhost:3000/todos', '#todo-list');
}

// deletar tarefa
function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir a tarefa?')) {
        htmx.ajax('DELETE', 'http://localhost:3000/todos/' + id, '#msg');
        updateTaskList();
    }
}