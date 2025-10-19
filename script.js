document.addEventListener('DOMContentLoaded', function() {
    const addTaskForm = document.getElementById('addTaskForm');
    const tasksContainer = document.getElementById('tasksContainer');
    const taskTemplate = document.getElementById('taskTemplate');
    const emptyStateTemplate = document.getElementById('emptyStateTemplate');
    
    // Функция для добавления новой задачи
    function addTask(title, description) {
        // Удаляем сообщение о пустом списке, если оно есть
        const emptyState = tasksContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }
        
        // Клонируем template
        const taskClone = taskTemplate.content.cloneNode(true);
        const taskCard = taskClone.querySelector('.task-card');
        const taskTitle = taskClone.querySelector('.task-title');
        const taskDescription = taskClone.querySelector('.task-description');
        const deleteBtn = taskClone.querySelector('.delete-btn');
        
        // Заполняем данными
        taskTitle.textContent = title;
        if (description && description.trim() !== '') {
            taskDescription.textContent = '✧ ' + description;
        } else {
            taskDescription.textContent = 'Описание отсутствует.';
        }
        
        // Добавляем обработчик удаления
        deleteBtn.addEventListener('click', function() {
            // Анимация удаления
            taskCard.style.transform = 'scale(0.8)';
            taskCard.style.opacity = '0';
            
            setTimeout(() => {
                taskCard.remove();
                
                // Если задач не осталось, показываем сообщение о пустом списке
                if (tasksContainer.children.length === 0) {
                    showEmptyState();
                }
            }, 150);
        });
        
        // Добавляем карточку в контейнер
        tasksContainer.appendChild(taskClone);
    }
    
    // Функция для показа сообщения о пустом списке
    function showEmptyState() {
        const emptyStateClone = emptyStateTemplate.content.cloneNode(true);
        tasksContainer.appendChild(emptyStateClone);
    }
    
    // Обработчик отправки формы
    addTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const titleInput = document.getElementById('taskTitle');
        const descriptionInput = document.getElementById('taskDescription');

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        
        if (title) {
            addTask(title, description);
                      
            // Очищаем форму
            titleInput.value = '';
            descriptionInput.value = '';
            
            // Возвращаем фокус на поле ввода названия
            titleInput.focus();
        }
    });
    

});