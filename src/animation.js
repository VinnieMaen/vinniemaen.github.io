let cmdText = document.getElementById("cmdText");
let cmdContainer = document.getElementsByClassName("cmdContainer")[0];
let dot = document.getElementsByClassName("dot")[0];
let curLine = 0;
let prevCurline = -1;
let curLineLength = 0;
let curLoading = 0;

let typeInterval;
let lineInterval;

let fixed = "Vincent@Portfolio ~ %";

let lines = [
    "python3 welcomeScript.py",
    "Hello! My Name is Vincent. I am a 19 years old fullstack developer studying Industrial Engineering Computer Science at the KU Leuven.",
    "node skills.js",
    "I have experience in the following programming languages/frameworks: Java, ReactJS, React-Native, C++, Python, HTML + CSS and Vanilla JS.",
    "passedProjects.exe",
    "I have worked on a lot of projects in the passed which were Vinity Sneaker App, WavesAIO ReactJS Sneaker Bot, Discord Bots, Scraper Tools and my own Private Bot ILA.",
    "clear",
    "contact.jar",
    "Discord: VinnieMaen#1111 | Twitter: @VinnieMaenDev | GitHub: VinnieMaen",
    "exit"
]

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
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

function startWrite() {
    lineInterval = setInterval(() => {
        if (prevCurline !== curLine) {
            let tag = document.createElement("div");
            let dynamicText = document.createElement("a");
            let fixedText = document.createElement("a");
            let cursor = document.createElement("div");

            tag.className = "line";
            tag.id = curLine.toString();

            dynamicText.className = "dynamicText";
            dynamicText.textContent = "";

            fixedText.className = "fixedText";
            fixedText.textContent = fixed;

            cursor.className = "cursor";
            cursor.id = "cursor";

            if (curLine % 2 == 0) tag.appendChild(fixedText);

            tag.appendChild(dynamicText);
            tag.appendChild(cursor);

            cmdText.appendChild(tag);

            prevCurline = curLine;
            document.getElementsByClassName("cursor")[0].remove()

            setTimeout(() => {
                typeInterval = setInterval(() => {
                    try {
                        let lineElement = document.getElementById(curLine);

                        if (lineElement.getElementsByClassName("dynamicText")[0].innerText.length < lines[curLine].length) {
                            curLineLength++;
                            lineElement.getElementsByClassName("dynamicText")[0].innerText = lines[curLine].substring(0, curLineLength)

                        } else {

                            if (curLine % 2 != 0) {
                                let tag = document.createElement("div");

                                tag.className = "line";
                                tag.innerText = "\n"
                                cmdText.appendChild(tag);
                            }

                            if (lines[curLine] == "clear") {
                                cmdText.innerHTML = `<div id="cursor" class="cursor"></div>`;
                                lines.splice(curLine, 1)
                                curLine--;
                                prevCurline = curLine - 2

                            } else if (lines[curLine] == "exit") {
                                return close();
                            }

                            curLine++;
                            curLineLength = 0;
                            clearInterval(typeInterval)

                        }
                    } catch (error) {
                        clearInterval(typeInterval)
                        clearInterval(lineInterval)
                    }
                }, curLine % 2 == 0 ? 100 : 10)
            }, curLine % 2 == 0 && curLine != 0 ? 2000 : 0)
        }
    }, 100)
}

let loadingInterval = setInterval(() => {
    if (curLoading > 200) {
        clearInterval(loadingInterval);
        document.getElementsByClassName("loading")[0].style.visibility = "hidden"
        document.getElementsByClassName("loading")[0].style.opacity = 0

        setTimeout(() => {
            startWrite();
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
            setTimeout(() => {
                startWrite()
            }, 500)
        }
    }, 500);
})

document.getElementById("close").addEventListener("click", () => {
    close()
})