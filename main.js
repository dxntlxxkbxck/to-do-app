import './src/style.css';

const tasks = [
    { id: 1, text: 'Купить хлеб', completed: false },
    { id: 2, text: 'Позвонить другу', completed: true },
    { id: 3, text: 'Сделать домашку', completed: false }
];

let nextId = 4;

// Глобальные ссылки на элементы (исправление проблемы!)
let inputEl;
let addBtnEl;

// Функция рендера счетчика
function renderCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    return `
        <div class="counter">
            <span>Всего задач: ${total}</span>
            <span>Выполнено: ${completed}</span>
        </div>
    `;
}

// Функция рендера одной задачи
function renderTask(task) {
    return `
        <div class="task ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <span class="task-text">${task.text}</span>
            <button class="btn-toggle">${task.completed ? '❌ Отменить' : '✅ Выполнено'}</button>
            <button class="btn-delete">🗑️ Удалить</button>
        </div>
    `;
}

// Главная функция рендера
function render() {
    const app = document.getElementById('app');
    const html = `
        <div class="app">
            <div class="header">
                <h1>📝 Todo List</h1>
            </div>
            
            <div class="add-form">
                <input type="text" class="task-input" placeholder="Что нужно сделать?" />
                <button class="btn-add">Добавить</button>
            </div>
            
            <div class="tasks-container">
                ${renderCounter()}
                
                ${tasks.length === 0 
                    ? '<div class="empty">Пока нет задач 😊</div>'
                    : tasks.map(renderTask).join('')
                }
            </div>
        </div>
    `;
    
    app.innerHTML = html;
    
    // ✅ ФИКС: получаем элементы ПОСЛЕ рендера
    inputEl = document.querySelector('.task-input');
    addBtnEl = document.querySelector('.btn-add');
    
    // Подключаем обработчики
    if (addBtnEl) {
        addBtnEl.addEventListener('click', addTask);
    }
    if (inputEl) {
        inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }
    
    // Обработчики для задач
    document.querySelectorAll('.task').forEach(taskEl => {
        const id = parseInt(taskEl.dataset.id);
        taskEl.querySelector('.btn-toggle').addEventListener('click', () => toggleTask(id));
        taskEl.querySelector('.btn-delete').addEventListener('click', () => deleteTask(id));
    });
}

// Добавление новой задачи
function addTask() {
    if (!inputEl) return;
    
    const text = inputEl.value.trim();
    if (text) {
        tasks.push({ id: nextId++, text, completed: false });
        inputEl.value = '';
        render();
    }
}

// Переключение статуса задачи
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        render();
    }
}

// Удаление задачи
function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        render();
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', render);
