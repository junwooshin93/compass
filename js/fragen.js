const formElement = document.querySelector(".js-fragen__form");
const answerElement = document.querySelector(".js-fragen__answer");
const titleElement = document.querySelector(".js-fragen__title");
const buttonElement = document.querySelector(".js-buttons");
const confirmBtnElement = document.querySelector(".js-confirm");
const cancelBtnElement = document.querySelector(".js-loeschen");

const LS_FRAGEN = "fragen-compass";

const CN_SHOW = "show";
const CN_HIDE = "hide";

let fragenNummer = 0;
let fragenBogen = [];

function showFragenList() {}

function createFragenObj(answers) {
    let fragenObj;
    switch (fragenNummer) {
        case 0:
            fragenObj = {
                type: "Problem",
                answer: answers,
            };
            break;
        case 1:
            fragenObj = {
                type: "Ursache",
                answer: answers,
            };
            break;
        case 2:
            fragenObj = {
                type: "Lösungen",
                answer: answers,
            };
            break;
        case 3:
            fragenObj = {
                type: "besteAnswer",
                answer: answers,
            };
            break;
    }

    return fragenObj;
}

function hideElement(targetElement) {
    targetElement.classList.add(CN_HIDE);
}

function showElement(targetElement) {
    targetElement.classList.remove(CN_HIDE);
}

function setFragenTitle() {
    switch (fragenNummer) {
        case 0:
            titleElement.innerText = "Was ist das Problem?";
            break;
        case 1:
            titleElement.innerText = "Was ist die Ursache davon?";
            break;
        case 2:
            titleElement.innerText = "Was sind die Lösungen?";
            break;
        case 3:
            titleElement.innerText = "Welche Lösung davon wirst du auswählen?";
            break;
    }

    if (fragenNummer === 4) {
        hideElement(formElement);
        showElement(buttonElement);
    } else {
        hideElement(buttonElement);
        showElement(formElement);
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const answerText = answerElement.value;

    if (fragenNummer < 4 && answerText !== "" && answerText !== null) {
        answerElement.value = "";
        const fragenObj = createFragenObj(answerText);
        fragenBogen.push(fragenObj);

        fragenNummer += 1;
        setFragenTitle();
    }
}

function handleCancelBtn() {
    fragenNummer = 0;
    fragenBogen = [];
    setFragenTitle();
}

function handleConfirmBtn() {
    if (fragenNummer === 4) {
        fragenBogen.push(fragenNummer);
        localStorage.setItem(LS_FRAGEN, JSON.stringify(fragenBogen));
    } else {
        handleCancelBtn();
    }
}

function init() {
    const loadedFragenBogen = localStorage.getItem(LS_FRAGEN);
    if (loadedFragenBogen === null) {
        handleCancelBtn();
    } else {
        const parsedFragenBogen = JSON.parse(loadedFragenBogen);
        if (parsedFragenBogen[4] === 4) {
            fragenBogen = parsedFragenBogen;
            fragenNummer = 4;
            showFragenList();
        }
    }

    formElement.addEventListener("submit", handleSubmit);
    confirmBtnElement.addEventListener("click", handleConfirmBtn);
    cancelBtnElement.addEventListener("click", handleCancelBtn);
}

init();
