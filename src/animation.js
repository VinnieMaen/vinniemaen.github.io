let cmdText = document.getElementById("cmdText");
let cmdContainer = document.getElementsByClassName("cmdContainer")[0];
let previewContainer = document.getElementsByClassName("previewContainer")[0];
let dot = document.getElementsByClassName("dot")[0];
let dot2 = document.getElementsByClassName("dot")[1];

let curLine = 0;
let prevCurline = -1;
let curLineLength = 0;
let curLoading = 0;
let inputString = "";
let canType = false;
let isTyping = false;

let typeInterval;
let lineInterval;
let selectedImage;

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

function close2() {
    dot2.style.display = "none";

    previewContainer.className = "previewContainerCollapsed1"
    setTimeout(() => {
        previewContainer.className = "previewContainerClosed"

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
        if (inputString.toLowerCase() == "exit") return close();
        if (inputString.toLowerCase() == "clear") {
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
    previewContainer.className = "previewContainerClosed"
    dot2.style.display = "none";

    curLine = 0;
    prevCurline = -1;
    curLineLength = 0;

    cmdContainer.className = "cmdContainerClosed"
    dot.style.display = "none";

    if (curLoading > 200) {
        clearInterval(loadingInterval);
        document.getElementsByClassName("loading")[0].style.visibility = "hidden"
        document.getElementsByClassName("loading")[0].style.opacity = 0
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
    document.getElementById("hiddenInput").focus()
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
            setTimeout(() => {
                startWrite(true, "")
            }, 1000);
        }
    }, 500);
})

/*
document.getElementById("image").addEventListener("click", () => {
    dot2.style.display = "block";

    if (previewContainer.className == "previewContainer") return;

    previewContainer.className = "previewContainerCollapsed1"
    setTimeout(() => {
        previewContainer.className = "previewContainer"
            
    }, 500);
})*/

document.getElementById("close").addEventListener("click", () => {
    close();
})

document.getElementById("close2").addEventListener("click", () => {
    close2();
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

let iconElement1 = document.getElementById("vinity1");
let iconElement2 = document.getElementById("vinity2");
let ignoringElements = [document.getElementById("vinity1")]
let ignoringElements2 = [document.getElementById("vinity2")]

ignoringElements.push(document.getElementsByClassName("icon")[0])
ignoringElements.push(document.getElementsByClassName("iconText")[0])
ignoringElements.push(document.getElementsByClassName("iconContainer")[0])

ignoringElements2.push(document.getElementsByClassName("icon")[1])
ignoringElements2.push(document.getElementsByClassName("iconText")[1])
ignoringElements2.push(document.getElementsByClassName("iconContainer")[1])

iconElement1.addEventListener("click", () => {
    iconElement1.getElementsByTagName("a")[0].className = "iconTextSelected";
    iconElement1.getElementsByTagName("div")[0].className = "iconContainerSelected"
})

iconElement2.addEventListener("click", () => {
    iconElement2.getElementsByTagName("a")[0].className = "iconTextSelected";
    iconElement2.getElementsByTagName("div")[0].className = "iconContainerSelected"
})

iconElement1.addEventListener("dblclick", () => {
    dot2.style.display = "block";

    if (previewContainer.className == "previewContainer") return;
    let img = previewContainer.getElementsByTagName("img")[0];
    img.src = "./img/Vinity1.png"

    previewContainer.className = "previewContainerCollapsed1"
    setTimeout(() => {
        previewContainer.className = "previewContainer"

    }, 500);
})

iconElement2.addEventListener("dblclick", () => {
    dot2.style.display = "block";

    if (previewContainer.className == "previewContainer") return;
    let img2 = previewContainer.getElementsByTagName("img")[0];
    img2.src = "./img/Vinity2.png"

    previewContainer.className = "previewContainerCollapsed1"
    setTimeout(() => {
        previewContainer.className = "previewContainer"

    }, 500);
})

document.addEventListener("click", (event) => {
    var isClickInsideElement = ignoringElements.includes(event.target);
    var isClickInsideElement2 = ignoringElements2.includes(event.target);

    if (!isClickInsideElement) {
        iconElement1.getElementsByTagName("a")[0].className = "iconText";
        iconElement1.getElementsByTagName("div")[0].className = "iconContainer"

    }

    if (!isClickInsideElement2) {
        iconElement2.getElementsByTagName("a")[0].className = "iconText";
        iconElement2.getElementsByTagName("div")[0].className = "iconContainer"
    }
})