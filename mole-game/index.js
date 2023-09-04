const gameTimer = document.querySelector("#game-timer");
const gameScore = document.querySelector("#game-score");
const moleList = document.querySelectorAll(".hidden-mole");
const moles = [];
let score = 0;
let randomSecond = 0;
let prevIndex = -1;
let isRunningGame = false;
let isReset = false;

for (let i = 0; i < 9; i++) {
    moles.push(moleList[i]);
}

//게임을 시작하는 함수-게임타이머함수
const gameStart = () => {
    if (isRunningGame) {
        //진행중일때
        return;
    }

    handleReset();
    isRunningGame = true;
    ssReset = false;
    gameStartTimer();
};

const gameStartTimer = () => {
    let timer = 60;
    movesMole();
    const interval = setInterval(function () {
        //고정된 시간동안 함수 반복 실행

        timer--;
        gameTimer.textContent = `남은시간: ${timer}초`;
        if (isReset === true) {
            clearInterval(interval);
            gameTimer.textContent = `남은시간: 60초`;
            isReset = false;
        }
        if (timer === 0) {
            clearInterval(interval); //함수 실행 중지
            gameTimer.textContent = `남은시간: 0초`;
            isRunningGame = false;
        }
    }, 1000);
};

//랜덤으로 올라오는 두더지의 index
const randomIndex = () => {
    let index = Math.floor(Math.random() * 9);
    if (prevIndex === index) {
        return randomIndex();
    }
    prevIndex = index;
    return index;
};

const showMole = (index) => {
    moles[index].classList.remove("hidden-mole");
};

const hiddenMole = (index) => {
    moles[index].classList.add("hidden-mole");
};

//두더지를 움직이는 함수(0.5-1.5초 동안 랜덤으로 두더지가 나타나고 사라짐)
const movesMole = () => {
    randomSecond = Math.floor(Math.random() * 1500 + 500);
    let moleIndex = randomIndex();
    if (!isRunningGame) {
        return;
    }
    showMole(moleIndex);

    setTimeout(() => {
        hiddenMole(moleIndex);
        return movesMole();
    }, randomSecond);
};

const catchMole = (index) => {
    if (moles[index].classList.contains("death-mole")) {
        //잡은 두더지가 존재하는지 확인
        return;
    }
    scoreHandler();
    moles[index].classList.add("death-mole");
    hiddenMole(index);

    setTimeout(() => {
        moles[index].classList.remove("death-mole");
    }, 500);
};

const scoreHandler = () => {
    if (randomSecond <= 800) {
        score += 15;
    } else if (randomSecond <= 1400) {
        score += 10;
    } else {
        score += 5;
    }
    gameScore.textContent = `점수: ${score}점`;
};

const gameReset = () => {
    isReset = true;
    isRunningGame = false;
    handleReset();
};

const handleReset = () => {
    score = 0;
    randomSecond = 0;
    prevIndex = -1;
    gameScore.textContent = "점수: 0점";
    gameTimer.textContent = "남은시간: 60초";
};

for (let i = 0; i < 9; i++) {
    moles[i].addEventListener("click", function () {
        catchMole(i);
    });
}
