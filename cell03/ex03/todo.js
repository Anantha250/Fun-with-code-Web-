document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('ft_list');
    const newButton = document.getElementById('newButton');

    function loadTasks() {
        const cookies = document.cookie.split('; ');
        const taskCookie = cookies.find(cookie => cookie.startsWith('tasks='));
        if (taskCookie) {
            const tasks = JSON.parse(decodeURIComponent(taskCookie.split('=')[1]));
            listContainer.innerHTML = '';
            tasks.reverse().forEach(task => addTaskToList(task));
        }
    }

    function saveTasks() {
        const tasks = Array.from(document.querySelectorAll('.todo-item')).map(item => item.textContent);
        document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; path=/;`;
    }

    function addTaskToList(task) {
        if (task.trim()) {
            const newItem = document.createElement('div');
            newItem.textContent = task;
            newItem.className = 'todo-item';
            newItem.onclick = function() {
                if (confirm('Do you want to remove this TO DO?')) {
                    newItem.remove();
                    saveTasks();
                }
            };
            listContainer.insertBefore(newItem, listContainer.firstChild);
            saveTasks();
        }
    }

    newButton.onclick = () => {
        const task = prompt('Enter a new TO DO');
        if (task !== null) {
            addTaskToList(task);
        }
    };

    loadTasks();
});
