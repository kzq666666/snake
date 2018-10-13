//创建全局变量
var map = document.getElementById('map');
var score = document.getElementById('score');
var scoreDiv = document.getElementsByClassName('scoreDiv')[0];
var ctrl_box = document.getElementById('ctrl_box');
var start_button = document.getElementsByClassName('start_button')[0];
var up_button = document.getElementsByClassName('up_button')[0];
var left_button = document.getElementsByClassName('left_button')[0];
var right_button = document.getElementsByClassName('right_button')[0];
var down_button = document.getElementsByClassName('down_button')[0];
var pause = document.getElementsByClassName('pause')[0];
var restart = document.getElementsByClassName('restart')[0];
var key = false;    //控制暂停和继续
var interval;
init();
bindEvent();
function init() {
    //map
    this.mapW = parseInt(getComputedStyle(map).width);
    this.mapH = parseInt(getComputedStyle(map).height) - parseInt(getComputedStyle(scoreDiv).height);
    //food
    this.foodW = 20;
    this.foodH = 20;
    //snake
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakePart = 3;
    this.snakeMapL = this.mapW / (5 * this.snakeW);
    this.snakeMapT = this.mapH / (5 * this.snakeH);
    this.snakeHead = [random(this.snakeMapL * 2, this.snakeMapL * 3), random(this.snakeMapT * 2, this.snakeMapT * 3), 'snake_head'];
    this.snake = [this.snakeHead];
    for (var i = 1; i < this.snakePart; i++) {
        snake.push([snakeHead[0] - i, snakeHead[1], 'snake_body'])
    }
    randomSnake();
    //speed
    this.speed = 200
}
//随机初始化蛇的运动方向
function randomSnake() {
    switch (random(2, 4)) {
        case 2:
            this.direction = 'up'
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
            break;
        case 3:
            this.direction = 'right';
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
            break;
        case 4:
            this.direction = 'down';
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
            break;
        default:
            break;
    }
}

//随机生成蛇
function Snake() {
    for (var i = 0; i < snake.length; i++) {
        var snakeDot = document.createElement('div');
        snakeDot.style.width = snakeW + 'px';
        snakeDot.style.height = snakeH + 'px';
        snakeDot.style.position = 'absolute';
        snakeDot.style.left = snake[i][0] * snakeW + 'px';
        snakeDot.style.top = snake[i][1] * snakeH + 'px';
        if (snake[i][3]) {
            snakeDot.style.backgroundColor = snake[i][3];
        } else {
            snakeDot.style.backgroundColor = 'grey';
        }
        snakeDot.className = snake[i][2] + ' snake';
        map.appendChild(snakeDot);
    }
}

//随机生成食物
function Food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    food.style.left = random(0, Math.floor((this.mapW - this.foodW) / this.foodW)) * this.foodW + 'px';
    food.style.top = random(0, Math.floor((this.mapH - this.foodH) / this.foodH)) * this.foodH + 'px';
    food.style.background = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')'
    food.classList.add('food');
    this.map.appendChild(food);
    var snake = document.getElementsByClassName('snake');
    for (var i = 0; i < snake.length; i++) {
        judgeOver(food, snake[i]);
        if (this.isOn) {
            removeElement('food');
            Food();
            break;
        }
    }
}

// 判断食物和蛇是否有重叠部分
function judgeOver(food, snake) {
    for (var i = 0; i < 4; i++) {
        let X = getXY(food)[i][0];
        let Y = getXY(food)[i][1];
        let snakeX = getXY(snake)[0][0];
        let snkaeY = getXY(snake)[0][1];
        if (((X > snakeX) && (X - snakeX < this.snakeW)) && ((Y > snkaeY) && (Y - snkaeY < this.snakeH))) {
            this.isOn = true;
            break;
        } else {
            this.isOn = false;
        }
    }
}

function removeElement(className) {
    var item = document.getElementsByClassName(className);
    while (item.length) {
        item[0].parentNode.removeChild(item[0]);
    }
}
//蛇的移动
function move() {
    for (let i = this.snake.length - 1; i > 0; i--) {
        this.snake[i][0] = this.snake[i - 1][0];
        this.snake[i][1] = this.snake[i - 1][1];
    };
    switch (this.direction) {
        case 'left':
            this.snake[0][0] -= 1;
            break;
        case 'right':
            this.snake[0][0] += 1;
            break;
        case 'up':
            this.snake[0][1] -= 1;
            break;
        case 'down':
            this.snake[0][1] += 1;
            break;
        default:
            break;
    }
    removeElement('snake');
    Snake();
    if (this.snake[0][0] < 0 || this.snake[0][0] > this.mapW / this.snakeW) {
        GameOver()
    };
    if (this.snake[0][1] < 0 || this.snake[0][1] > Math.ceil(this.mapH / this.snakeH)) {
        GameOver()
    };
    var snakeList = document.getElementsByClassName('snake');
    for (var i = 1; i < snakeList.length; i++) {
        if (getXY(snakeList[0])[0][0] == getXY(snakeList[i])[0][0] && getXY(snakeList[0])[0][1] == getXY(snakeList[i])[0][1]) {
            GameOver();
        }
    }
}

// 判断按键的可操作性
function switchDirection(direction) {
    switch (direction) {
        case 'left':
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
            break;
        case 'right':
            this.left = false;
            this.right = false;
            this.up = true;
            this.down = true;
            break;
        case 'up':
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
            break;
        case 'down':
            this.left = true;
            this.right = true;
            this.up = false;
            this.down = false;
            break;
        default:
            break;
    };
}

// random函数,返回一个范围
function random(left, right) {
    return Math.floor(Math.random() * (right + 1 - left) + left)
}

function Eat() {
    var snake_head = document.getElementsByClassName('snake_head')[0];
    var food = document.getElementsByClassName('food')[0];
    if (getXY(snake_head)[0][0] == getXY(food)[0][0] && getXY(snake_head)[0][1] == getXY(food)[0][1]) {
        this.score.textContent -= -1;
        removeElement('food');
        Food();
        this.snake.push([this.snake[0][0], this.snake[0][1], 'snake_body', food.style.background]);
    }
}
function bindEvent() {
    //开始游戏绑定事件
    this.start_button.onclick = function () {
        this.style.display = 'none';
        map.style.filter = 'none';
        ctrl_box.style.filter = 'none';
        startGame();
        pause.addEventListener('click', function () {
            key = !key;
            if (key) {
                pause.src = './image/pause.png';
                pauseGame();
            } else {
                pause.src = './image/play.png';
                resumeGame();
            };
        })
    }
    //上按钮
    this.up_button.onclick = function () {
        if (up) {
            direction = 'up';
            switchDirection(direction);
        }
    }
    //下按钮
    this.down_button.onclick = function () {
        if (down) {
            direction = 'down';
            switchDirection(direction);
        }
    }
    //左按钮
    this.left_button.onclick = function () {
        if (left) {
            direction = 'left';
            switchDirection(direction);
        }
    }
    //右按钮
    this.right_button.onclick = function () {
        if (right) {
            direction = 'right';
            switchDirection(direction);
        }
    }
    this.restart.onclick = function () {
        removeElement('snake');
        removeElement('food');
        clearInterval(this.interval);
        init();
        startGame();
        resumeGame();
    }
}
//开始游戏
function startGame() {
    Snake();
    Food();
    if (interval) {
        clearInterval(interval);
    } else {
        interval = setInterval(function () {
            move();
        }, this.speed);
    }
}

//暂停游戏
function pauseGame() {
    clearInterval(this.interval);
}

//恢复游戏
function resumeGame() {
    this.interval = interval = setInterval(function () {
        move();
        Eat();
    }, this.speed);
}



//获取一个dom元素四个点的相对坐标
function getXY(dom) {
    return {
        //左上
        0: [parseInt(dom.style.left), parseInt(dom.style.top)],
        //右上
        1: [parseInt(dom.style.left) + parseInt(dom.style.width), parseInt(dom.style.top)],
        //左下
        2: [parseInt(dom.style.left), parseInt(dom.style.top) + parseInt(dom.style.height)],
        //右下
        3: [parseInt(dom.style.left) + parseInt(dom.style.width), parseInt(dom.style.top) + parseInt(dom.style.height)]
    }
}

function GameOver() {
    alert('游戏结束,你的分数是:' + this.score.textContent);
    removeElement('snake');
    removeElement('food');
    clearInterval(this.interval);
    if (confirm('是否重新开始')) {
        init();
        startGame();
        resumeGame();
    }
}













// var map = document.getElementById('map');
// var button = document.getElementsByTagName('button')[0];
// var interval;
// var score = 0;
// //初始化函数
// init();
// function init() {
//     //map
//     this.mapW = parseInt(getComputedStyle(map).width);
//     this.mapH = parseInt(getComputedStyle(map).height);
//     this.mapDiv = map;
//     //food
//     this.foodW = 40;
//     this.foodH = 40;
//     this.foodX = 0;
//     this.foodY = 0;

//     //snake
//     this.snake = [[3, 1, 'head','head.jpg'], [2, 1, 'body','body1.jpg'], [1, 1, 'body','body2.jpg']];
//     this.snakeW = 40;
//     this.snakeH = 40;

//     //move
//     this.direction = 'right';
//     this.left = false;
//     this.right = false;
//     this.up = true;
//     this.down = true;
// }

// startGame();
// function startGame() {
//     Food();
//     Snake();
//     this.interval = setInterval(function () {
//         move();
//         eat();
//     }, 100);
//     bindEvent();
// }

// function Food() {
//     var food = document.createElement('div');
//     food.style.width = this.foodW + 'px';
//     food.style.height = this.foodH + 'px';
//     food.style.position = 'absolute';
//     this.foodX = Math.floor(Math.random() * (this.mapW / this.foodW)) * 40;
//     this.foodY = Math.floor(Math.random() * (this.mapH / this.foodH)) * 40;
//     food.style.left = this.foodX + 'px';
//     food.style.top = this.foodY + 'px';
//     food.classList.add('food');
//     this.map.appendChild(food);
// }

// function Snake() {
//     for (let i = 0; i < this.snake.length; i++) {
//         var snakeP = document.createElement('div');
//         snakeP.style.position = 'absolute';
//         snakeP.style.width = this.snakeW + 'px';
//         snakeP.style.height = this.snakeH + 'px';
//         snakeP.style.left = this.snake[i][0] * this.snakeW + 'px';
//         snakeP.style.top = this.snake[i][1] * this.snakeH + 'px';
//         snakeP.style.background= 'url(./image/'+this.snake[i][3]+')';
//         snakeP.style.backgroundSize = '100%';
//         snakeP.classList.add(this.snake[i][2]);
//         snakeP.classList.add('snake');
//         this.map.appendChild(snakeP);
//     }
// }

// function move() {
//     for (let i = this.snake.length - 1; i > 0; i--) {
//         this.snake[i][0] = this.snake[i - 1][0];
//         this.snake[i][1] = this.snake[i - 1][1];
//     }
//     switch (this.direction) {
//         case 'right':
//             this.snake[0][0] += 1;
//             break;
//         case 'left':
//             this.snake[0][0] -= 1;
//             break;
//         case 'up':
//             this.snake[0][1] -= 1;
//             break;
//         case 'down':
//             this.snake[0][1] += 1;
//     }
//     removeSnake();
//     Snake();
// }
// function removeSnake() {
//     var snakeElement = document.getElementsByClassName('snake');
//     while (snakeElement.length > 0) {
//         snakeElement[0].parentNode.removeChild(snakeElement[0]);
//     }
// }

// function bindEvent() {
//     button.onclick = function(){

//         clearInterval(interval);
//     }
//     document.onkeydown = function (e) {
//         switch (e.keyCode) {
//             case 37:
//                 if (left) {
//                     direction = 'left';
//                     right = false;
//                     left = false;
//                     up = true;
//                     down = true;
//                 }
//                 break;
//             case 38:
//                 if (up) {
//                     direction = 'up';
//                     right = true;
//                     left = true;
//                     up = false;
//                     down = false;
//                 }
//                 break;

//             case 39:
//                 if (right) {
//                     direction = 'right';
//                     right = false;
//                     left = false;
//                     up = true;
//                     down = true;
//                 }
//                 break;

//             case 40:
//                 if (down) {
//                     direction = 'down';
//                     right = true;
//                     left = true;
//                     up = false;
//                     down = false;
//                 }
//                 break;
//         }
//     }
// }
// function eat() {
//     var head = document.getElementsByClassName('head')[0];
//     var food = document.getElementsByClassName('food')[0];
//     if ((parseInt(head.style.left) == parseInt(food.style.left)) && (parseInt(head.style.top) == parseInt(food.style.top))) {
//         this.score += 1;
//         food.parentNode.removeChild(food);
//         switch (this.direction) {
//             case 'right':
//                 var newX = snake[snake.length - 1][0] - 1;
//                 var newY = snake[0][1];
//                 snake.push([newX, newY, 'body','food.jpg']);
//                 break;
//             case 'left':
//                 var newX = snake[snake.length - 1][0] + 1;
//                 var newY = snake[0][1];
//                 snake.push([newX, newY, 'body','food.jpg']);
//                 break;

//             case 'up':
//                 var newY = snake[snake.length - 1][1] + 1;
//                 var newX = snake[0][0];
//                 snake.push([newX, newY, 'body','food.jpg']);
//                 break;
//             case 'down':
//                 var newY = snake[snake.length - 1] - 1;
//                 var newX = snake[0][0];
//                 snake.push([newX, newY, 'body','food.jpg']);
//                 break;
//         }
//         Food();
//         Snake();
//     }
//     if (parseInt(head.style.left) <= -this.snakeW || parseInt(head.style.left) >= this.mapW || parseInt(head.style.top) <= -this.snakeH || parseInt(head.style.top) >= this.mapH) {

//         clearInterval(this.interval);
//     }
// }