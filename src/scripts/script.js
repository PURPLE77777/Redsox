import dataset from "./dataset.js";

class Circle {
    constructor(item) {
        let container = document.createElement("div");
        container.classList.add("circle-container");

        let circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.backgroundImage = `url(../img/${item.img})`;

        let text = document.createElement("span");
        text.classList.add("circle-text");
        text.innerHTML = `${item.text}`;

        let circles = document.getElementsByClassName("circles")[0];
        circle.append(text);
        container.append(circle);
        circles.prepend(container);

        this.circle = item;
        this.circleDiv = circle;
        this.container = container;
    }

    addAnimationAll(duration, delay) {
        this.container.style.animation = `move-circle-cont ${duration}s ${delay}s linear infinite`;
        this.circleDiv.style.animation = `move-circle ${duration}s ${delay}s linear infinite`;
        this.circleDiv.children[0].style.animation = `show-comp 1s ${delay}s linear forwards`;
    }
}

let circles = [];
if (document.documentElement.clientWidth > 640) {
    for (let i = 0; i < dataset.length; i++) {
        let circle = new Circle(dataset[i]);
        circles.push(circle);
    }
} else if (document.documentElement.clientWidth > 460) {
    for (let i = 0; i < dataset.length - 2; i++) {
        let circle = new Circle(dataset[i]);
        circles.push(circle);
    }
} else {
    for (let i = 0; i < dataset.length - 3; i++) {
        let circle = new Circle(dataset[i]);
        circles.push(circle);
    }
}

function showCircles() {
    let task = document.getElementsByClassName("task")[0];
    task.classList.add("task-to-top");

    let hearth = document.getElementsByClassName("hearth")[0];
    hearth.classList.add("show-hearth");

    let circlesWrap = document.getElementsByClassName("circles-wrap")[0];
    circlesWrap.classList.add("show-circles");

    let hearthBlock = document.getElementsByClassName("hearth-block")[0];
    hearthBlock.style.animation = "hearth-beat 0.4s ease 1s infinite alternate";

    let durationAnimation = 15;
    circles.forEach((circle, index, arr) => {
        circle.addAnimationAll(
            durationAnimation,
            (durationAnimation / arr.length) * index + 1
        );
    });
}

function changeFont() {
    let closerBlock = document.getElementsByClassName("close-text-block")[0];
    closerBlock.style.height = "0px";
    setTimeout(() => {
        // let task = document.getElementsByClassName("task")[0];
        // task.classList.add("task-to-top");

        // let parts = document.getElementsByClassName("part-text");
        // for (let i = 0; i < parts.length; i++) {
        //     parts[i].classList.add("part-text_hidden");
        // }

        let niceFont = document.getElementsByClassName("nice-font")[0];
        niceFont.classList.add("nice-font_show");
    }, 1000);
}

function checkAnswer() {
    let input = document.getElementsByClassName("answer-input")[0];
    let answers = ["redsox"];
    let errorMes = ["Неа", "Nope", "Давай ещё раз :)", "Не то"];

    if (answers.includes(input.value.toLowerCase())) {
        let errorDiv = document.getElementsByClassName("error")[0];
        errorDiv.classList.remove("error-show");

        let taskText = document.getElementsByClassName("task-text")[0];
        taskText.classList.add("close-task-text");

        let inputBlock = document.getElementsByClassName("input-block")[0];
        inputBlock.classList.add("close-input-block");

        let text = document.getElementsByClassName("text")[0];
        text.classList.add("to-center-text", "show-answer-text");

        // let closerBlock =
        //     document.getElementsByClassName("close-text-block")[0];
        // closerBlock.classList.add("close-text-block_go");

        // setTimeout(changeFont, 2000);
        changeFont();

        setTimeout(showCircles, 2500);
    } else {
        let errorDiv = document.getElementsByClassName("error")[0];
        let rand = Math.round(Math.random() * 3);
        errorDiv.innerHTML = errorMes[rand];
        errorDiv.classList.add("error-show");
    }
}

let btn = document.getElementsByClassName("btn-check")[0];
btn.addEventListener("click", checkAnswer);

btn.click();
