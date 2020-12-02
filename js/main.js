'use strict'
var gBoard;
var gNums = [];
var gNextNum = 1;
var gGameInterval;
var gStartTime;
var size;

function init() {
    size = 4;
    play(size);
}

function play(size) {
    resetTimer();
    gNextNum = 1;
    shuffleNums(size * size);
    gBoard = createBoard(size)
    renderBoard(gBoard);
}

function restart() {
    play(size);
}

function startTimer() {
    gStartTime = Date.now();
    gGameInterval = setInterval(timer, 30);
}

function timer() {
    var currTime = Date.now();
    var elTimer = document.querySelector('.timer');
    var time = currTime - gStartTime;
    var secondsPassed = (time / 1000).toFixed(3);
    elTimer.innerText = `Time: ${secondsPassed}`;
}

function easy() {
    size = 4;
    play(size);
}

function medium() {
    size = 5;
    play(size);
}

function hard() {
    size = 6;
    play(size);
}

function createBoard(rowColNum) {
    var board = [];
    for (var i = 0; i < rowColNum; i++) {
        board[i] = []
        for (var j = 0; j < rowColNum; j++) {
            board[i][j] = '';
        }
    }
    return board;
}

function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var randomNum = gNums.pop();
            strHtml += `<td class="clicked" data-random="${randomNum}"  onClick="clickOnCell(this)"> ${randomNum}</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml
}


function createNums(nums) {
    for (var i = 1; i <= nums; i++) {
        gNums.push(i);
    }
    return gNums
}


function shuffleNums(numLength) {
    var nums = createNums(numLength);
    nums.sort(() => Math.random() - 0.5);
}

function resetTimer() {
    if (gGameInterval) {
        clearTimeout(gGameInterval);
    }
    var timer = document.querySelector('.timer');
    timer.innerText = 'Time : 00:00:00';
}

function clickOnCell(elCell) {
    var currNum = +elCell.dataset.random
    if (currNum === gNextNum) {
        elCell.style.backgroundColor = 'rgb(94, 16, 87)';
        gNextNum++;
        if (currNum === 1) {
            startTimer();
        }
        if (gNextNum === size ** 2 + 1) {
            alert('You WON');
           resetTimer();
            
        }
    }
}


