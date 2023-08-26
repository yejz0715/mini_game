const numButtons = document.querySelector("#num-buttons");
const inputNumbers = document.querySelector("#input-numbers");
const numScores = document.querySelector("#num-scores");
const successMessage = document.querySelector("#success-message");

const inputArr = [];
let checkInputNum = [];
const randomArr = Array(3);
let index = 0;
let sumCount = 1;
let counts = [0, 0];

for (let i = 0; i < 3; i++) {
    inputArr.push(inputNumbers.children[i]);
}

//입력배열과 랜덤배열을 비교하는 함수
const handleCompare = () => {
    counts = [0, 0];
    for (let i = 0; i < checkInputNum.length; i++) {
        if (randomArr.includes(+checkInputNum[i])) {
            if (+checkInputNum[i] === randomArr[i]) {
                counts[0]++; //존재o, index o
            } else {
                counts[1]++; //존재o
            }
        }
    }
    return counts;
};

const handleKeyup = (e) => {
    const pattern = /[0-9]/;

    if (counts[0] === 3) {
        return;
    }

    if (pattern.test(e.key)) {
        handleNumCheck(e.key);
    }
};

const handleClickNum = (e) => {
    const { textContent } = e.target;

    if (counts[0] === 3) {
        return;
    }

    handleNumCheck(textContent);
};

//수를 확인하는 함수
const handleNumCheck = (target) => {
    //중복x
    if (checkInputNum.includes(target)) {
        return;
    }
    inputArr[index].value = target;
    index += 1;
    checkInputNum.push(target);

    if (checkInputNum.length === 3) {
        //비교함수
        const [sCnt, bCnt] = handleCompare();
        const numScore = document.createElement("label");
        numScores.appendChild(numScore);
        if (sCnt === 3) {
            successMessage.textContent = `${sumCount}번만에 성공했습니다.!`;
            return;
        }
        numScore.innerHTML = `${checkInputNum[0]}${checkInputNum[1]}${checkInputNum[2]} S:${sCnt} B:${bCnt}`;
        handleReset();
        sumCount++;
        return;
    }
};

//새 게임 실행하는 함수
const handleGameStart = () => {
    let idx = 0;

    counts = [0, 0];
    sumCount = 1;
    successMessage.textContent = "";
    numScores.innerHTML = "";
    handleReset();

    //랜덤수 3개 뽑기
    while (idx !== 3) {
        let num = Math.floor(Math.random() * 10);

        //중복x
        if (!randomArr.includes(num)) {
            randomArr[idx] = num;
            idx++;
        }
    }

    console.log(randomArr);
};

//지우기함수
const handleDelete = () => {
    if (index === 0 || counts[0] === 3) return;

    checkInputNum.pop();
    index -= 1;
    inputArr[index].value = "";
};

const handleReset = () => {
    index = 0;
    checkInputNum = [];
    for (let i = 0; i < 3; i++) {
        inputArr[i].value = "";
    }
};

//이벤트 추가
for (let i = 0; i <= 9; i++) {
    numButtons.children[i].addEventListener("click", handleClickNum);
}
document.addEventListener("keyup", handleKeyup);
window.addEventListener("load", handleGameStart);
