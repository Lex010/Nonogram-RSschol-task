document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    // block1 Сначала,завершить-показать решение
    const block1 = document.createElement('div');
    block1.classList.add('block1');
    body.appendChild(block1);
    // block2 выбор сложности, случайная игра
    const block2 = document.createElement('div');
    block2.classList.add('block2');
    body.appendChild(block2);
    // block3 название поля, выбор поля
    const block3 = document.createElement('div');
    block3.classList.add('block3');
    body.appendChild(block3);
    // block4 время игры(таймер)
    const block4 = document.createElement('div');
    block4.classList.add('block4');
    body.appendChild(block4);
    // block5 поле игры
    const block5 = document.createElement('div');
    block5.classList.add('block5');
    body.appendChild(block5);

    //МЕНЮ УПРАВЛЕНИЯ
    const saveLoad = document.createElement('div');
    saveLoad.classList.add('save-load');
    block1.appendChild(saveLoad);
    const save = document.createElement('button');
    const load = document.createElement('button');
    save.classList.add('save');
    load.classList.add('load');
    saveLoad.appendChild(save);
    saveLoad.appendChild(load);
    save.textContent = "Сохранить";
    load.textContent = "Загрузить"; //завершил создавать кнопки загр и сохр
    const reset = document.createElement('button');
    reset.classList.add('reset');
    block1.appendChild(reset);
    reset.textContent = "Сброс";  //завершил создавать кнопку Сброс
    const randomGame = document.createElement('button');
    randomGame.classList.add('random');
    block1.appendChild(randomGame);
    randomGame.textContent = "Случайно";  //завершил создавать кнопку Случайно
    const showSolution = document.createElement('button');
    showSolution.classList.add('show-solution');
    block1.appendChild(showSolution);
    showSolution.textContent = "Решение\n(Зажми)";  //завершил создавать кнопку Решение
    const resultAndThemes = document.createElement('div');
    resultAndThemes.classList.add('result-and-themes');
    block1.appendChild(resultAndThemes);
    const resultList = document.createElement('button');
    const themes = document.createElement('button');
    resultList.classList.add('result-list');
    themes.classList.add('themes');
    resultList.textContent = "Топ 5";
    themes.textContent = "День\\Ночь";
    resultAndThemes.appendChild(resultList);
    resultAndThemes.appendChild(themes);   //завершил создавать кнопки Лучшие и Тема
    //ДОБАВЛЯЮ ЗВУКИ
    const soundAddBlackCell = new Audio('sounds/add-black-cell.mp3');
    const soundChangeToWhiteCell = new Audio('sounds/change-to-white-cell.mp3');
    const soundAddCrossCell = new Audio('sounds/add-cross-cell.mp3')
    const soundVictory = new Audio('sounds/win-sound.mp3')
    function playSoundAddBlackCell(sound) {
        sound.currentTime = 0;
        sound.play();
    }
    //СОЗДАЮ ТАЙМЕР
    let seconds = 0;
    const timer = document.createElement('div');
    timer.classList.add('timer');
    block4.appendChild(timer);
    timer.textContent = "XX:XX";
    let timerStarted = false;  // Флаг, показывающий, был ли таймер уже запущен
    let timerInterval;  // Переменная для хранения идентификатора интервала
    function startTimer() {    //Функция таймера
        const timerElement = document.querySelector('.timer');
        function updateTimer() {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
            const secondsString = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
            timerElement.textContent = `${minutesString}:${secondsString}`;
        }
        if(seconds == 0) {
        timerElement.textContent = "00:00";
    }
        timerInterval = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
        timerStarted = true;
    };
    function stopTimer() {  // Функция остановки таймера
    clearInterval(timerInterval);
    timerStarted = false;  // Сбросить флаг, чтобы можно было запустить таймер снова
    };
    function timerChek() {     //Функция проверки запущен ли таймер
        if (!timerStarted) {  // Запустить таймер только при первом клике
            startTimer();
            timerStarted = true;  // Установить флаг в true, чтобы не запустить таймер снова
        }; 
    };
    //СОЗДАЕМ ПОЛЕ------------------
    let gridSize = 6;
    function initializeGame(gridSize) {
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');
        // Генерация сетки
        for (let i = 0; i < gridSize; i++) {
             // Применение стилей к .game-container при изменении размера сетки
        if (gridSize < 11) {
            gameContainer.style.gridTemplateColumns = `80px ${'50px '.repeat(gridSize - 1)}`;
            gameContainer.style.gridTemplateRows = `80px ${'50px '.repeat(gridSize - 1)}`;
        }
        if (gridSize >= 11 && gridSize < 16) {
            gameContainer.style.gridTemplateColumns = `60px ${'30px '.repeat(gridSize - 1)}`;
            gameContainer.style.gridTemplateRows = `60px ${'30px '.repeat(gridSize - 1)}`;
        }
        if (gridSize >= 16) {
            gameContainer.style.gridTemplateColumns = `40px ${'20px '.repeat(gridSize - 1)}`;
            gameContainer.style.gridTemplateRows = `40px ${'20px '.repeat(gridSize - 1)}`;
        }
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i;
                cell.dataset.col = j;
                   // Добавление класса для первого столбца и первой строки
                   if (j === 0) {
                    cell.classList.add('first-column');
                    cell.classList.remove('cell');
                }
                if (i === 0) {
                    cell.classList.add('first-row');
                    cell.classList.remove('cell');
                }
                // Добавление стиля border-right к каждой пятой ячейке в столбце
                if (parseInt(cell.dataset.col) % 5 === 0 && j !== gridSize - 1) {
                    cell.classList.add('cell-border-right');
                }
                // Добавление стиля border-bottom к каждой пятой ячейке в строке
                if (parseInt(cell.dataset.row) % 5 === 0 && i !== gridSize - 1) {
                    cell.classList.add('cell-border-bottom');
                }
                gameContainer.appendChild(cell);
            }
        }
        block5.appendChild(gameContainer);
         // Добавление обработчика событий "click" для изменения цвета при клике
        const cells = document.getElementsByClassName('cell');
        Array.from(cells).forEach(cell => {
            cell.addEventListener("click", function() {
                if (this.classList.contains('crossed')) {
                    this.classList.remove('crossed');
                    playSoundAddBlackCell(soundChangeToWhiteCell);
                } else if (this.classList.contains('clicked')){
                    this.classList.toggle('clicked');
                    playSoundAddBlackCell(soundChangeToWhiteCell);
                } else{
                this.classList.toggle('clicked');
                playSoundAddBlackCell(soundAddBlackCell);
               
            }
                
            updateGameData()
            timerChek()
            });
            // Добавить обработчик событий для контекстного меню (правая кнопка мыши)
            cell.addEventListener("contextmenu", function(event) {
                event.preventDefault(); // Предотвращает появление контекстного меню
                if (this.classList.contains('clicked')) {
                    this.classList.remove('clicked');
                    playSoundAddBlackCell(soundChangeToWhiteCell);
                } else if(this.classList.contains('crossed')) {
                    this.classList.toggle('crossed');
                    playSoundAddBlackCell(soundChangeToWhiteCell);
                }
                else{
                this.classList.toggle('crossed'); // Добавляет/удаляет класс 'crossed' для перечеркивания
                playSoundAddBlackCell(soundAddCrossCell);
                }
                updateGameData()
                timerChek()
            });
        });
    }
    initializeGame();
//СОЗДАЮ КНОПКИ ВЫБОРА РАЗМЕРА ПОЛЯ
    const leftButSizeField = document.createElement("button");
    leftButSizeField.classList.add('left-button-size-field');
    const sizeField = document.createElement('div');
    sizeField.classList.add('size-field');
    const rightButSizeField = document.createElement("button");
    rightButSizeField.classList.add('right-button-size-field');
    block2.appendChild(leftButSizeField);
    block2.appendChild(sizeField);
    block2.appendChild(rightButSizeField);
    sizeField.textContent = "5 х 5";
    const varFieldSizes = {
        6: "5 х 5",
        11: "10 х 10",
        16: "15 х 15"
    };
    const betterForUseFieldSizes = ["5 х 5", "10 х 10", "15 х 15"];

    let currentSizeIndex = 0;
      function updateFieldSet() {   // Функция для обновления набора полей в зависимости от текущего gridSize
        if (gridSize === '6') {
            currentFieldSet = smallFields;
        } else if (gridSize === '11') {
            currentFieldSet = midleFields;
        } else if (gridSize === '16') {
            currentFieldSet = bigFields;
        }
    }
    function updateSizeField() {   //ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ РАЗМЕРОВ ПОЛЕЙ
        gridSize = Object.keys(varFieldSizes)[currentSizeIndex];
        sizeField.textContent = varFieldSizes[gridSize];
        const existingGameContainer = block5.querySelector('.game-container');
        if (existingGameContainer) {
            block5.removeChild(existingGameContainer);
        }
        initializeGame(gridSize);
        updateFieldSet(gridSize); // Обновление текущего набора полей в зависимости от gridSize
        updateNameField();
        stopTimer(); //остановка таймера
    }
    leftButSizeField.addEventListener("click", function() {
        const existingGameContainer = block5.querySelector('.game-container');// Удаление текущего игрового поля
        if (existingGameContainer) {
            block5.removeChild(existingGameContainer);
        }
        currentSizeIndex = (currentSizeIndex - 1 + Object.keys(varFieldSizes).length) % Object.keys(varFieldSizes).length;
        nameField.textContent = "Выбери игру";
        updateSizeField();
        seconds = 0;
        timer.textContent = "XX:XX";
    });
    rightButSizeField.addEventListener("click", function() {
        const existingGameContainer = block5.querySelector('.game-container');// Удаление текущего игрового поля
        if (existingGameContainer) {
            block5.removeChild(existingGameContainer);
        }
        currentSizeIndex = (currentSizeIndex + 1) % Object.keys(varFieldSizes).length;
        nameField.textContent = "Выбери игру";
        updateSizeField();
        seconds = 0;
        timer.textContent = "XX:XX";
    });
    //КНОПКА ВЫБОРА ПОЛЯ(ИМЕНИ)
    const leftButnNameField = document.createElement("button");
    leftButnNameField.classList.add('left-button-name-field');
    const nameField = document.createElement('div');
    nameField.classList.add('name-field');
    const rightButNameField = document.createElement("button");
    rightButNameField.classList.add('right-button-name-field');
    block3.appendChild(leftButnNameField);
    block3.appendChild(nameField);
    block3.appendChild(rightButNameField);
    //ИГРОВЫЕ ПОЛЯ
    const smallFields = [
        {name: "М1 Стрелка",
        field: [
            [1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1],
            [0, 1, 1, 1, 1],
            [1, 1, 1, 0, 1],
            [1, 1, 0, 0, 1]
        ]},
        {name: "М2 Цифра",
        field: [
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0]
        ]},
        {name: "М3 Верблюд",
        field: [
            [0, 1, 0, 0, 0],
            [1, 1, 1, 0, 1],
            [1, 1, 1, 1, 0],
            [1, 0, 1, 0, 0],
            [1, 0, 1, 0, 0]
        ]},
        {name: "М4 Сердце",
        field: [
            [0, 1, 0, 1, 0],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0]
        ]},
        {name: "М5 Башня",
        field: [
            [1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [1, 1, 1, 1, 1]
        ]},
        {name: "М6 Часы",
        field: [
            [0, 1, 1, 1, 0],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1],
            [1, 0, 0, 0, 1],
            [0, 1, 1, 1, 0]
        ]},
        {name: "М7 Коляска",
        field: [
            [0, 1, 1, 0, 0],
            [1, 1, 0, 0, 1],
            [1, 1, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [1, 0, 0, 1, 0]
        ]}
    ];
    const midleFields = [
        {name: "С1 Утка",
        field: [
            [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0, 0, 0]
        ]},
        {name: "С2 Снеговик",
        field: [
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [0, 1, 0, 0, 1, 0, 1, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 0, 0, 1, 1]
        ]},
        {name: "С3 Кот",
        field: [
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
            [0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 1, 1, 1, 1, 0, 1, 1]
        ]},
        {name: "С4 Чайник",
        field: [
            [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0]
        ]},
        {name: "С5 Человек",
        field: [
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 1, 1],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
            [0, 0, 1, 1, 0, 0, 1, 1, 0, 1],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 1, 1, 1]
        ]},
        {name: "С6 Вишня",
        field: [
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
            [1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
            [1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
            [1, 0, 0, 1, 1, 1, 1, 0, 1, 1],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 0]
        ]},
        {name: "С7 Собака",
        field: [
            [1, 1, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 1, 0, 0, 1, 1, 1, 0, 0],
            [0, 1, 1, 0, 1, 1, 1, 0, 0, 0]
        ]}
    ];
    const bigFields = [
        {name: "Б1 Кофе",
        field: [
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
        ]    
    },
    {name: "Б2 Лягушка",
    field: [
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
        [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1]
    ]    
},
{name: "Б3 Подарок",
field: [
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]    
},
{name: "Б4 Меч",
field: [
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]    
},
{name: "Б5 Солнце",
field: [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
    [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]
]    
},
{name: "Б6 Жук",
field: [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0]
]    
},
{name: "Б7 Мышь",
field: [
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
    [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1]
]    
}
    ];
    let currentFieldSet = smallFields;  // Переменная для хранения текущего набора полей
    let currentFieldIndex = 0;  // Текущий индекс поля
    nameField.textContent = currentFieldSet[currentFieldIndex].name;
    updateSizeField();// Инициализация начальных значений
    leftButnNameField.addEventListener("click", function() { // Переключение на предыдущий элемент в массиве currentFieldSet  
        currentFieldIndex = (currentFieldIndex - 1 + currentFieldSet.length) % currentFieldSet.length;
        updateNameField();
        seconds = 0;
        timer.textContent = "XX:XX";
    });

    rightButNameField.addEventListener("click", function() { // Переключение на следующий элемент в массиве currentFieldSet    
        currentFieldIndex = (currentFieldIndex + 1) % currentFieldSet.length;
        updateNameField();
        seconds = 0;
        timer.textContent = "XX:XX";
    });
    function updateNameField() {    // ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ НАЗВАНИЙ ПОЛЕЙ
        nameField.textContent = currentFieldSet[currentFieldIndex].name;
        removeAllClickedClass();
        stopTimer();
        console.log(currentFieldSet[currentFieldIndex].field);
        console.log(findConsecutiveOnes(currentFieldSet[currentFieldIndex].field));
    }
//////////////ФУНКЦИЯ ДЛЯ НАПИСАНИЯ ПОДСКАЗКИ
function findConsecutiveOnes(matrix = smallFields[0].field) {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;
    let rowSequences = new Array(rowCount).fill([]);
    let colSequences = new Array(colCount).fill([]);   
    for (let i = 0; i < rowCount; i++) {  // Поиск последовательностей по строкам
        let currentSequence = [];
        for (let j = 0; j < colCount; j++) {
            if (matrix[i][j] === 1) {
                currentSequence.push(1);
            } else if (currentSequence.length > 0) {
                rowSequences[i] = rowSequences[i].concat([currentSequence.length]);
                currentSequence = [];
            }
        }
        if (currentSequence.length > 0) {
            rowSequences[i] = rowSequences[i].concat([currentSequence.length]);
        }
    }
    for (let j = 0; j < colCount; j++) {  // Поиск последовательностей по столбцам
        let currentSequence = [];
        for (let i = 0; i < rowCount; i++) {
            if (matrix[i][j] === 1) {
                currentSequence.push(1);
            } else if (currentSequence.length > 0) {
                colSequences[j] = colSequences[j].concat([currentSequence.length]);
                currentSequence = [];
            }
        }
        if (currentSequence.length > 0) {
            colSequences[j] = colSequences[j].concat([currentSequence.length]);
        }
    }
    const firstColumnBlocks = document.querySelectorAll('.first-column');  //добавление подсказок слева
    rowSequences.forEach((sequence, index) => {
        const currentBlock = firstColumnBlocks[index + 1];
        if (currentBlock) {
            currentBlock.textContent = sequence.join(', ');
        }
    });
    const firstRowBlocks = document.querySelectorAll('.first-row');    //добавление подсказок вверху
    colSequences.forEach((sequence, index) => {
        const currentBlock = firstRowBlocks[index + 1];
        if (currentBlock) {
            currentBlock.textContent = sequence.join(',\n');
        }
    });
    return { rowSequences, colSequences };
};
findConsecutiveOnes();
//ФУНКЦИЯ ЗАПИСЫВАЮЩЯЯ СОСТОЯНИЕ ПОЛЯ
function updateGameData() {
    gameData = []; // Очищаем массив данных перед обновлением
    gameDataWithX = []; // Очищаем массив данных перед обновлением
    const cells = document.getElementsByClassName('cell');
    const gridSize = Math.sqrt(cells.length); // Предполагаем, что сетка квадратная
    for (let i = 1; i < gridSize + 1; i++) {
        const row = [];
        const rowX = [];
        for (let j = 1; j < gridSize + 1; j++) {
            const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
            if (!(cell && (cell.classList.contains('first-row') || cell.classList.contains('first-column')))) {  // Игнорируем"first-row","first-column"
                if (cell && cell.classList.contains('clicked')) {
                    row.push(1);
                    rowX.push(1);
                } 
                else if (cell && cell.classList.contains('crossed')) {
                    row.push(0);
                    rowX.push(2);
                } else {
                    row.push(0);
                    rowX.push(0);
                }
            }
        }
        gameData.push(row);
        gameDataWithX.push(rowX);
    }
    console.log(gameDataWithX);
  if (arraysEqual(gameData, currentFieldSet[currentFieldIndex].field)) { // Сравните gameData с currentFieldSet[currentFieldIndex].field
    setTimeout(function () {
        stopTimer();
        modalVictory.style.display = "flex";
        modalVictoryButton.textContent = "Отлично! Отгадал за " + document.querySelector('.timer').textContent;
        // alert("Отгадал! За " + document.querySelector('.timer').textContent);
        playSoundAddBlackCell(soundVictory);
        let fieldSize = betterForUseFieldSizes[currentSizeIndex]; // Замените на реальное название поля
        let timerValue = document.querySelector('.timer').textContent;
        saveSolutionToLocalStorage(fieldSize, timerValue);
      }, 0);
  };
};
function arraysEqual(arr1, arr2) {   // Функция для сравнения текущего состояния поля с победным(целевым)
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (!arr1[i].every((val, index) => val === arr2[i][index])) {
        return false;
      }
    }
    return true;
  };
  function removeAllClickedClass() { //ФУНКЦИЯ ОЧИЩАЮЩАЯ ВСЕ КЛЕТКИ
    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => {
        cell.classList.remove('clicked');
        cell.classList.remove('crossed');
    });
}
//ФУНКЦИЯ СОЗРАНЕНИЯ/ЗАГРУЗКИ
save.addEventListener('click', function() {
    saveGameData();
    console.log("Данные игры сохранены!");
    console.log(gameData);
});
load.addEventListener('click', function() {
    loadGameData();
    console.log("Данные игры загружены!");
    console.log(gameData);
});
function saveGameData() {
    if(!(timer.textContent === "XX:XX") || seconds > 0) {    //ФИКС сохраненеий, чтоб не сохранялось пока игра не началась
    const dataToSave = {
        gridSize: gridSize,
        timerStarted: timerStarted,
        seconds: seconds,  // Сохраняем значение таймера (seconds)
        timerValue: document.querySelector('.timer').textContent,
        gameData: gameData,
        gameDataWithX: gameDataWithX,
        currentFieldSetIndex: currentFieldIndex,
        nameFieldValue: nameField.textContent,
        sizeField: sizeField.textContent,
    };
    localStorage.setItem('gameData', JSON.stringify(dataToSave));
    console.log('currentFieldIndex ' + currentFieldIndex,'gridSize ' + gridSize , sizeField.textContent)//...................
}
}
function loadGameData() {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        gridSize = parsedData.gridSize;
        timerStarted = parsedData.timerStarted;
        seconds = parsedData.seconds;  // Устанавливаем значение таймера из сохраненных данных
        document.querySelector('.timer').textContent =  parsedData.timerValue;
        gameData = parsedData.gameData;
        gameDataWithX = parsedData.gameDataWithX;
        currentFieldIndex = parsedData.currentFieldSetIndex;
        sizeField.textContent = parsedData.sizeField;
        // updateSizeField();
          // Удаление старого поля перед созданием нового
          const existingGameContainer = block5.querySelector('.game-container');
          if (existingGameContainer) {
              block5.removeChild(existingGameContainer);
          }
        
        updateFieldSet(gridSize);
        initializeGame(gridSize); 
        updateNameField();
        nameField.textContent = parsedData.nameFieldValue;
        const cells = document.getElementsByClassName('cell');
        Array.from(cells).forEach((cell, index) => {
            const rowIndex = Math.floor(index / (gridSize - 1));
            const colIndex = index % (gridSize - 1);
            cell.classList.remove('clicked', 'crossed');// Удаляем все классы 'clicked' и 'crossed' из ячейки
            if (gameDataWithX[rowIndex][colIndex] === 1) {// Если в gameDataWithX на соответствующей позиции есть 1, добавляем класс 'clicked'
                cell.classList.add('clicked');
            }
            if (gameDataWithX[rowIndex][colIndex] === 2) {// Если в gameDataWithX на соответствующей позиции есть 2, добавляем класс 'crossed'
                cell.classList.add('crossed');
            }
        });
        console.log('currentFieldIndex ' + currentFieldIndex,'gridSize ' + gridSize )//...................
        startTimer();
    } else {
        console.log("Сохраненные данные игры не найдены!");
    }
};
//ПОДСВЕТКА РЕШЕНИЯ 
function highlightSolutionCells() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < currentFieldSet[currentFieldIndex].field.length; i++) {
        for (let j = 0; j < currentFieldSet[currentFieldIndex].field[i].length; j++) {
            const cell = document.querySelector(`.cell[data-row="${i + 1}"][data-col="${j + 1}"]`);  
            if (currentFieldSet[currentFieldIndex].field[i][j] === 1) {
                cell.classList.add('solution');
            } else {
                cell.classList.remove('solution');
            }
        }
    }
};
function clearSolutionClasses() {
    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => {
        cell.classList.remove('solution');
    });
}
showSolution.addEventListener('mousedown', function() {  //Для мыши
    highlightSolutionCells();
});
showSolution.addEventListener('mouseup', clearSolutionClasses);  
showSolution.addEventListener('mouseleave', clearSolutionClasses);
showSolution.addEventListener('touchstart', function(event) {  // Для тач скрина 
    event.preventDefault();
    showSolution.classList.add('active');
    highlightSolutionCells();
});
showSolution.addEventListener('touchend', function() {
    showSolution.classList.remove('active');
    clearSolutionClasses();
});
showSolution.addEventListener('touchcancel', function() {
    showSolution.classList.remove('active');
    clearSolutionClasses();
});
//СОХРАНЯЮ 5 ПОСЛЕДНИХ РЕЗЛЬТАТОВ РЕШЕНИЙ
function saveSolutionToLocalStorage(fieldSize, timerValue) {
    let queryFildSizeText = document.querySelector('.size-field').textContent;
    let currentFildSizeForTopF = queryFildSizeText;
    const solutionData = { // Создаем объект с данными о решении
      fieldName: currentFieldSet[currentFieldIndex].name, // Добавляем имя поля
      fieldSize: currentFildSizeForTopF,
      timerValue: timerValue,
    };
    let savedSolutions = JSON.parse(localStorage.getItem('savedSolutions')) || []; // Получаем массив ранее сохраненных решений из localStorage
  const numericTimerValue = Number(timerValue.replace(/:/g, ''));    // Преобразуем timerValue в числовое значение без двоеточий
  savedSolutions.push({ ...solutionData, numericTimerValue });  // Добавляем новое решение в массив
  savedSolutions.sort((a, b) => b.numericTimerValue - a.numericTimerValue);  // Сортируем массив по числовому значению timerValue в убывающем порядке
  savedSolutions = savedSolutions.slice(-5); // Ограничиваем массив до последних 5 решений
    localStorage.setItem('savedSolutions', JSON.stringify(savedSolutions)); // Сохраняем обновленный массив в localStorage
  };
//Модальное окно для топ 5
const modalTopFive = document.createElement('div');  //
modalTopFive.classList.add('modal-top-five');
body.appendChild(modalTopFive);
const modalTopFiveClose = document.createElement('button'); //
modalTopFive.appendChild(modalTopFiveClose);
modalTopFiveClose.textContent = "ЗАКРЫТЬ";
const modalTopFiveOrderedList = document.createElement('ol'); //
modalTopFive.appendChild(modalTopFiveOrderedList);
modalTopFiveOrderedList.textContent = 'Топ 5 результатов по времени';
const modalResetLocalStorage = document.createElement('button');//
modalTopFive.appendChild(modalResetLocalStorage);
modalResetLocalStorage.textContent = "Очистить таблицу";
let listItems = []; // Массив для хранения созданных элементов списка
for (let i = 0; i < 5; i++) {
  listItem = document.createElement('li');
  listItem.textContent = '---';
  modalTopFiveOrderedList.appendChild(listItem);
  listItems.push(listItem); // Добавляем каждый элемент списка в массив
  listItem.classList.add('modal-li');
}
resultList.addEventListener('click', function (event) {
    let savedSolutions = JSON.parse(localStorage.getItem('savedSolutions')) || []; // Объявляем savedSolutions внутри обработчика
    savedSolutions.reverse(); // Изменяем порядок сохраненных решений
    savedSolutions.forEach((solution, index) => {
      listItems[index].textContent = `Сложность: ${solution.fieldSize},\nИмя поля: ${solution.fieldName},\nВремя: ${solution.timerValue}`;
    });
    modalTopFive.style.display = 'flex';
  });  
  modalTopFiveClose.addEventListener('click',function(){
    modalTopFive.style.display = 'none';
  });
//МОДАЛЬНОЕ ОКНО ПОБЕДЫ
const modalVictory = document.createElement('div');  //
modalVictory.classList.add('modal-victory');
body.appendChild(modalVictory);
const modalVictoryButton = document.createElement('button');  //
modalVictoryButton.classList.add('modal-victory__button');
modalVictory.appendChild(modalVictoryButton);
modalVictoryButton.addEventListener("click", function() {
    modalVictory.style.display = "none";
    resetGame();
});
//ФУНКЦИЯ СБРОСА ИГРЫ
function resetGame() {
 const existingGameContainer = block5.querySelector('.game-container');// Удаление текущего игрового поля
    if (existingGameContainer) {
        block5.removeChild(existingGameContainer);
    }
    seconds = 0;// Сброс значений таймера и флага
    timer.textContent = "XX:XX";
    timerStarted = false;
    initializeGame(gridSize);// Инициализация новой игры 
    updateNameField();
};
reset.addEventListener("click", function() {
    resetGame();
});
//ФУНКЦИЯ СЛУЧАЙНОЙ ИГРЫ
function randomGameF() {
    const existingGameContainer = block5.querySelector('.game-container');// Удаление текущего игрового поля
    if (existingGameContainer) {
        block5.removeChild(existingGameContainer);
    }
    seconds = 0;// Сброс значений таймера и флага
    timer.textContent = "XX:XX";
    timerStarted = false;
    const allFieldSizes = ['6', '11', '16'];//размеры полей
    const randomIndex = Math.floor(Math.random() * allFieldSizes.length);
    gridSize = allFieldSizes[randomIndex];
    sizeField.textContent = betterForUseFieldSizes[randomIndex];
    updateFieldSet(gridSize);
    initializeGame(gridSize);// Инициализация новой игры 
    const randomFieldIndex = Math.floor(Math.random() * currentFieldSet.length);// Добавляем код для случайного переключения currentFieldSet
    currentFieldIndex = randomFieldIndex;
    updateNameField();
}
randomGame.addEventListener("click", function() {
    randomGameF();
});
//ФУНКЦИЯ СМЕНЫ ТЕМЫ (ДЕНЬ\НОЧЬ)
function toggleTheme() {
    body.classList.toggle('dark-theme');
  };
themes.addEventListener("click", function() {
    toggleTheme();
});
//ОЧИСТКА ТАБЛИЦЫ РЕЗУЛЬТАТОВ в localStorage
modalResetLocalStorage.addEventListener("click", function() {
    // localStorage.clear(); //для очистки всего localStorage
    localStorage.removeItem('savedSolutions');
    const modalLi = document.querySelectorAll('.modal-li');
    for (let i = 0; i < modalLi.length; i++) {
        modalLi[i].textContent = '---';
      }
});

  console.log(currentFieldSet[currentFieldIndex].field)
  });
   