const lineOne = document.getElementById("line-one");
const lineTwo = document.getElementById("line-two");
const lineThree = document.getElementById("line-three");
const resetButton = document.getElementById("reset-button");
const resultMessage = document.getElementById("result-message");
const currentTurn = document.getElementById("current-turn");

const board = [lineOne, lineTwo, lineThree];
const tdBoxes = [[], [], []];

let isCurrentTurn = "X";
let isGameOver = false; //결과여부

//tdBoxes-html 연결
for (let i = 0; i < 3; i++) {
    tdBoxes[0].push(lineOne.querySelectorAll("td").item(i));
    tdBoxes[1].push(lineTwo.querySelectorAll("td").item(i));
    tdBoxes[2].push(lineThree.querySelectorAll("td").item(i));
}

//현재 td를 선택한 함수
const currPick = (e) => {
    let isDraw = true; //무승부여부

    const line = board.indexOf(e.target.parentNode);
    const idx = tdBoxes[line].indexOf(e.target);

    //게임이 끝났거나, 선택했던 노드라면 게임진행x
    if (isGameOver || tdBoxes[line][idx].textContent) return;

    tdBoxes[line][idx].textContent = isCurrentTurn; //선택한 노드에 o,x표시

    //게임끝남_이겼을 경우
    //가로
    if (
        isCurrentTurn === tdBoxes[line][0].textContent &&
        isCurrentTurn === tdBoxes[line][1].textContent &&
        isCurrentTurn === tdBoxes[line][2].textContent
    ) {
        isGameOver = true;
    }
    //세로
    if (
        isCurrentTurn === tdBoxes[0][idx].textContent &&
        isCurrentTurn === tdBoxes[1][idx].textContent &&
        isCurrentTurn === tdBoxes[2][idx].textContent
    ) {
        isGameOver = true;
    }
    //대각선2개
    if (
        isCurrentTurn === tdBoxes[0][0].textContent &&
        isCurrentTurn === tdBoxes[1][1].textContent &&
        isCurrentTurn === tdBoxes[2][2].textContent
    ) {
        isGameOver = true;
    }
    if (
        isCurrentTurn === tdBoxes[0][2].textContent &&
        isCurrentTurn === tdBoxes[1][1].textContent &&
        isCurrentTurn === tdBoxes[2][0].textContent
    ) {
        isGameOver = true;
    }

    //결과_이김
    if (isGameOver) {
        resultMessage.textContent = isCurrentTurn + " win!!";
        return;
    }

    //게임끝남_무승부일 경우
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tdBoxes[i][j].textContent === "") {
                isDraw = false;
                break;
            }
        }
    }

    //결과_무승부
    if (isDraw) {
        resultMessage.textContent = "draw!!";
        return;
    }

    //턴바꿔줌
    if (isCurrentTurn === "X") {
        isCurrentTurn = "O";
        currentTurn.textContent = "O";
    } else {
        isCurrentTurn = "X";
        currentTurn.textContent = "X";
    }
};

//리셋함수
const reset = () => {
    for (let i = 0; i < 3; i++) {
        tdBoxes[0][i].textContent = "";
        tdBoxes[1][i].textContent = "";
        tdBoxes[2][i].textContent = "";
    }
    isGameOver = false;
    isCurrentTurn = "X";
    currentTurn.textContent = "X";
    resultMessage.textContent = "";
};

//이벤트 추가
for (let i = 0; i < 3; i++) {
    tdBoxes[0][i].addEventListener("click", currPick);
    tdBoxes[1][i].addEventListener("click", currPick);
    tdBoxes[2][i].addEventListener("click", currPick);
}
resetButton.addEventListener("click", reset);
