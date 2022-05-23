let cmdText = document.getElementById("cmdText");
let cmdContainer = document.getElementsByClassName("cmdContainer")[0];
let dot = document.getElementsByClassName("dot")[0];
let curLine = 0;
let prevCurline = -1;
let curLineLength = 0;
let curLoading = 0;
let inputString = "";
let canType = false;
let isTyping = false;

let typeInterval;
let lineInterval;

let fixed = "Vincent@Portfolio ~ %";

let functions = {
    help: "The following commands are available: welcome | skills | projects | contact | clear | exit",
    welcome: "Hello! My Name is Vincent. I am a 19 years old fullstack developer studying Industrial Engineering Computer Science at the KU Leuven.",
    skills: "I have experience in the following programming languages/frameworks: Java, ReactJS, React-Native, C++, Python, HTML + CSS and Vanilla JS.",
    projects: "I have worked on a lot of projects in the passed which were Vinity Sneaker App, WavesAIO ReactJS Sneaker Bot, Discord Bots, Scraper Tools and my own Private Bot ILA.",
    contact: "Discord: VinnieMaen#1111 | Twitter: @VinnieMaenDev | GitHub: VinnieMaen",
    clear: "clear",
    exit: "exit"
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function close() {
    clearInterval(typeInterval)
    clearInterval(lineInterval)

    curLine = 0;
    prevCurline = -1;
    curLineLength = 0;

    dot.style.display = "none";

    cmdContainer.className = "cmdContainerCollapsed1"
    setTimeout(() => {
        cmdContainer.className = "cmdContainerClosed"

    }, 500);
}

function startWrite(forCommand, text) {
    isTyping = true;

    let tag = document.createElement("div");
    let dynamicText = document.createElement("a");
    let fixedText = document.createElement("a");
    let cursor = document.createElement("div");

    tag.className = "line";

    dynamicText.className = "dynamicText";
    dynamicText.textContent = "";

    fixedText.className = "fixedText";
    fixedText.textContent = fixed;

    cursor.className = "cursor";
    cursor.id = "cursor";

    if (forCommand) tag.appendChild(fixedText);

    tag.appendChild(dynamicText);
    tag.appendChild(cursor);

    cmdText.appendChild(tag);

    document.getElementsByClassName("cursor")[0].remove()

    typeInterval = setInterval(() => {
        try {
            if (document.getElementsByClassName("dynamicText")[document.getElementsByClassName("dynamicText").length - 1].innerText.length < text.length) {
                curLineLength++;
                document.getElementsByClassName("dynamicText")[document.getElementsByClassName("dynamicText").length - 1].innerText = text.substring(0, curLineLength)

            } else {

                if (!forCommand) {
                    let tag = document.createElement("div");

                    tag.className = "line";
                    tag.innerText = "\n"
                    cmdText.appendChild(tag);
                }

                curLineLength = 0;
                if (forCommand) canType = true;
                isTyping = false;
                clearInterval(typeInterval)
            }

        } catch (error) {
            clearInterval(typeInterval)
        }
    }, 10)
}

function execute(inputString) {
    let printText = functions[inputString.toLowerCase()];
    if (!printText) {
        startWrite(false, "Command " + inputString + " not found");
        let int = setInterval(() => {
            if (!isTyping) {
                clearInterval(int);
                startWrite(true, "");
            }
        })

    } else {
        if (inputString == "exit") return close();
        if (inputString == "clear") {
            cmdText.innerHTML = `<div id="cursor" class="cursor"></div>`;
            return startWrite(true, "");
        }

        startWrite(false, printText);
        let int = setInterval(() => {
            if (!isTyping) {
                clearInterval(int);
                startWrite(true, "");
            }
        })
    }
}

let loadingInterval = setInterval(() => {
    if (curLoading > 200) {
        clearInterval(loadingInterval);
        document.getElementsByClassName("loading")[0].style.visibility = "hidden"
        document.getElementsByClassName("loading")[0].style.opacity = 0
        startWrite(false, "Type help to get started!");

        setTimeout(() => {
            startWrite(true, "")
        }, 1000);
        curLoading = 0;
    } else {
        curLoading += randomIntFromInterval(0, 5);
        document.getElementsByClassName("loadingBarFill")[0].style.width = `${curLoading}px`
    }
})


//Click handelers

document.getElementById("minimize").addEventListener("click", () => {
    cmdContainer.className = "cmdContainerCollapsed1"
    setTimeout(() => {
        cmdContainer.className = "cmdContainerCollapsed2"

    }, 500);
})

document.getElementsByClassName("cmdContainer")[0].addEventListener("click", () => {
    prompt()
})

document.getElementById("terminal").addEventListener("click", () => {
    let cl = cmdContainer.className.toString();
    dot.style.display = "block";

    if (cl == "cmdContainerClosed") {
        cmdText.innerHTML = `<div id="cursor" class="cursor"></div>`;
    }

    if (cmdContainer.className == "cmdContainer") return;

    cmdContainer.className = "cmdContainerCollapsed1"
    setTimeout(() => {
        cmdContainer.className = "cmdContainer"
        if (cl == "cmdContainerClosed") {
            startWrite(false, "Type help to get started!");
            prompt()
            setTimeout(() => {
                startWrite(true, "")
            }, 1000);
        }
    }, 500);
})

document.getElementById("close").addEventListener("click", () => {
    close();
})

document.addEventListener("keydown", (key) => {
    if (!canType) return;

    if (key.key == "Enter") {
        if (inputString == "") return;

        canType = false;
        execute(inputString);
        return inputString = "";

    } else if (key.key == "Backspace") {
        inputString = inputString.slice(0, -1);
        document.getElementsByClassName("dynamicText")[document.getElementsByClassName("dynamicText").length - 1].innerText = inputString;

    } else if (!isLetter(key.key)) {
        return;

    } else {
        inputString += key.key;
        document.getElementsByClassName("dynamicText")[document.getElementsByClassName("dynamicText").length - 1].innerText = inputString;
    }

});
