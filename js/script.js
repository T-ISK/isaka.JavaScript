// 要件は１００行以上

'use strict';
// スコアを取得
const youScore = document.getElementById('youScore');
const cpuScore = document.getElementById('cpuScore');

// 写真を取得
const youImg = document.getElementById('youImg');
const cpuImg = document.getElementById('cpuImg');

const youChoice = document.getElementById('youChoice');
let cpuChoice = document.getElementById('cpuChoice');
const choice = [
    './images/janken_gu.png',
    './images/janken_choki.png',
    './images/janken_pa.png',
    ];
let randomNo = parseInt(Math.floor(Math.random() * choice.length));
let randomNoYou = parseInt(Math.floor(Math.random() * choice.length));
let randomNoCpu = parseInt(Math.floor(Math.random() * choice.length));
let timeOutYou;
let timeOutCpu;
let cpuRandomChoice;
let userChoice;
let youScoreNo = 1;
let cpuScoreNo = 1;
let youJudge = document.getElementById('youJudge');
let cpuJudge = document.getElementById('cpuJudge');
let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('reset');
let showTime = 12000;

// 開始ボタン リセットボタン
startBtn.onclick = function() {
    randomImgShowYou(randomNoYou);
    randomImgShowCpu(randomNoCpu);
    youJudge.textContent = '';
    cpuJudge.textContent = '';
    startBtn.disabled = true;
    marxOff();
}
resetBtn.onclick = function() {
    youScoreNo = 1;
    cpuScoreNo = 1;
    youScore.textContent = 0;
    cpuScore.textContent = 0;
}
// グーチョキパーボタン。選ぶとそれを中央に表示
document.getElementById('rock').onclick = function(event) {
    event.preventDefault();
    youJudge.textContent = '';
    cpuJudge.textContent = '';
    startBtn.disabled = false;
    clearTimeout(timeOutYou);
    clearTimeout(timeOutCpu);
    userChoice = 'rock';
    marxOff();
    cpu();
    youChoiceShow(userChoice);
    compare(userChoice, cpuRandomChoice);
    };
document.getElementById('scissors').onclick = function(event) {
    youJudge.textContent = '';
    cpuJudge.textContent = '';
    startBtn.disabled = false;
    userChoice = 'scissors';
    event.preventDefault();
    clearTimeout(timeOutYou);
    clearTimeout(timeOutCpu);
    marxOff();
    cpu();
    youChoiceShow(userChoice);
    compare(userChoice, cpuRandomChoice);
    };
document.getElementById('paper').onclick = function(event) {
    youJudge.textContent = '';
    cpuJudge.textContent = '';
    startBtn.disabled = false;
    userChoice = 'paper';
    event.preventDefault();
    clearTimeout(timeOutYou);
    clearTimeout(timeOutCpu);
    youChoiceShow(userChoice);
    marxOff();
    cpu();
    compare(userChoice, cpuRandomChoice);
    };

// functions
// （初期表示）STARTボタンをオスとグーチョキパーがランダム表示
function randomImgShowYou (randomNoYou) {
    randomNoYou = parseInt(Math.floor(Math.random() * choice.length));
    youChoice.src = choice[randomNoYou];
    timeOutYou = setTimeout(function() {randomImgShowYou(randomNoYou)}, 100);
}
function randomImgShowCpu (randomNoCpu) {
    randomNoCpu = parseInt(Math.floor(Math.random() * choice.length));
    cpuChoice.src = choice[randomNoCpu];
    timeOutCpu = setTimeout(function() {randomImgShowCpu(randomNoCpu)}, 100);
}

// Youグーチョキパー選択時の動き
function youChoiceShow(userChoice) {
    if (userChoice === 'rock') {
        youChoice.src = './images/janken_gu.png';
        }
        if (userChoice === 'scissors') {
        youChoice.src = './images/janken_choki.png';
        }
        if (userChoice === 'paper') {
        youChoice.src = './images/janken_pa.png';
        }
}

// CPUランダムでグーチョキパーが選択される動き
function cpu() {
    let cpuRandomNo = Math.random();
    if(cpuRandomNo < 1/3) {
        cpuRandomChoice = 'rock'
    } else if(1/3 < cpuRandomNo && cpuRandomNo < 2/3) {
        cpuRandomChoice = 'scissors';
    } else if (Math.round(cpuRandomNo*10) === 9) {
        cpuRandomChoice = 'marx';
    } else {
        cpuRandomChoice = 'paper';
    }
    cpuChoiceShow(cpuRandomChoice);
}
function cpuChoiceShow(cpuRandomChoice) {
    if (cpuRandomChoice === 'rock') {
    cpuChoice.src = './images/janken_gu.png';
    } else if (cpuRandomChoice === 'scissors') {
    cpuChoice.src = './images/janken_choki.png';
    } else if (cpuRandomChoice === 'paper') {
    cpuChoice.src = './images/janken_pa.png';
    } else if (cpuRandomChoice === 'marx') {
    cpuChoice.src = './images/Marx2.png';
    setTimeout(function() {marxOn()}, 3000);
    }
}

// マルクスが選択された時の動き
function marxOn () {
    youChoice.style.transitionDuration = '7s';
    cpuChoice.style.transitionDuration = '5s';
    youChoice.style.opacity = '0';
    youChoice.style.width = '50px';
    cpuChoice.style.width = '200px';
    cpuChoice.style.marginLeft = '-85px';
}
function marxOff () {
    youChoice.style.width = '100px';
    youChoice.style.opacity = '1';
    cpuChoice.style.width = '100px';
    cpuChoice.style.marginLeft = '20px';
}

// 勝ち負けの判定
function compare(choice1, choice2) {
    if(choice1 === 'rock') {
        if(choice2 === "scissors") {
            youScore.textContent = youScoreNo++;
            youWin();
        } else if(choice2 === "paper") {
            cpuScore.textContent = cpuScoreNo++;
            youLose();
        } else if(choice2 === "marx") {
            setTimeout(function() {cpuScore.textContent = cpuScoreNo++}, showTime);
            setTimeout(function() {youLose()}, showTime);
        }
    } else if(choice1 === 'scissors') {
        if(choice2 === "paper") {
            youScore.textContent = youScoreNo++;
            youWin();
        } else if(choice2 === "rock") {
            cpuScore.textContent = cpuScoreNo++;
            youLose();
        } else if(choice2 === "marx") {
            setTimeout(function() {cpuScore.textContent = cpuScoreNo++}, showTime);
            setTimeout(function() {youLose()}, showTime);
        }
    } else if (choice1 === 'paper') {
        if(choice2 === "rock") {
            youScore.textContent = youScoreNo++;
            youWin();
        } else if(choice2 === "scissors") {
            cpuScore.textContent = cpuScoreNo++;
            youLose();
        } else if(choice2 === "marx") {
            cpuScore.textContent = cpuScoreNo++;
            setTimeout(function() {cpuScore.textContent = cpuScoreNo++}, showTime);
            setTimeout(function() {youLose()}, showTime);
        }
    }
}
function youWin() {
    youJudge.textContent = 'WIN!!';
    youJudge.style.color = 'rgb(255, 160, 122)';
    cpuJudge.textContent = 'LOSE!!';
    cpuJudge.style.color = 'rgb(31, 27, 25)';
}
function youLose() {
    youJudge.textContent = 'LOSE!!';
    youJudge.style.color = 'rgb(31, 27, 25)';
    cpuJudge.textContent = 'WIN!!';
    cpuJudge.style.color = 'rgb(255, 160, 122)';
}
