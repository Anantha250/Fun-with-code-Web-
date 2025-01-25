$(document).ready(function() {
    const $listContainer = $('#ft_list');
    const $newButton = $('#newButton');

    function loadTasks() {
        const cookies = document.cookie.split('; ');
        const taskCookie = cookies.find(cookie => cookie.startsWith('tasks='));
        if (taskCookie) {
            const tasks = JSON.parse(decodeURIComponent(taskCookie.split('=')[1]));
            $listContainer.empty();
            tasks.reverse().forEach(task => addTaskToList(task));
        }
    }

    function saveTasks() {
        const tasks = $.map($('.todo-item'), function(item) {
            return $(item).text();
        });
        document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/;`;
    }

    function addTaskToList(task) {
        if (task.trim()) {
            const $newItem = $('<div></div>')
                .text(task)
                .addClass('todo-item')
                .click(function() {
                    if (confirm('Do you want to remove this TO DO?')) {
                        $newItem.remove();
                        saveTasks();
                    }
                });
            $listContainer.prepend($newItem);
            saveTasks();
        }
    }

    $newButton.click(function() {
        const task = prompt('Enter a new TO DO');
        if (task !== null) {
            addTaskToList(task);
        }
    });

    loadTasks();
});
