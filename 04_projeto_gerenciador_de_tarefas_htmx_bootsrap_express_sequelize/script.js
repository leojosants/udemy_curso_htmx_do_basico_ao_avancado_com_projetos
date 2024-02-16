document.body.addEventListener('htmx:afterRequest',
    function (event) {
        if (event.target.getAttribute('id') === 'edit-form') {
            cancelEdit();
            updateTaskList();
        }

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

// atualizar status da tarefa
function toggleTask(id) {
    htmx.ajax('PATCH', 'http://localhost:3000/todos/' + id, '#msg');
    updateTaskList();
}

// iniciar edicao de tarefa
function editTask(id, text, difficulty) {
    document.querySelector('#edit-id').value = id;
    document.querySelector('#edit-text').value = text;
    document.querySelector('#edit-difficulty').value = difficulty;
    document.querySelector('#edit-form').classList.remove('d-none');
    document.querySelector('#todo-form').classList.add('d-none');
}

// cancelar edicao
function cancelEdit() {
    document.querySelector('#edit-form').classList.add('d-none');
    document.querySelector('#todo-form').classList.remove('d-none');
}