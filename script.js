const heading = document.createElement("h1");
heading.textContent = "etch-a-sketch";
document.body.appendChild(heading);

const mainDiv = document.createElement("div");
document.body.appendChild(mainDiv);
mainDiv.id = "mainDiv";

const optionDiv = document.createElement("div");
optionDiv.id = "optionDiv";

const sketchDiv = document.createElement("div");
sketchDiv.id = "sketchDiv";

const selectButton = document.createElement("select");
selectButton.id = "select";

const colorButton = document.createElement("button");
colorButton.id = "color";
colorButton.textContent = "color mode";

const rainbowButton = document.createElement("button");
rainbowButton.id = "rainbow";
rainbowButton.textContent = "rainbow mode";

const shadeButton = document.createElement("button");
shadeButton.id = "shade";
shadeButton.textContent = "shade mode";

const resetButton = document.createElement("button");
resetButton.id = "reset";
resetButton.textContent = "reset";

const colorPalette = document.createElement("input");
colorPalette.id = "colorButton";
colorPalette.setAttribute("type", "color");
colorPalette.setAttribute("selected", "black");

const gridText = document.createElement("div");
gridText.className = "inputStyles";
gridText.textContent = `grid: `;
gridText.appendChild(selectButton);

const colorPaletteText = document.createElement("div");
colorPaletteText.className = "inputStyles";
colorPaletteText.textContent = `color: `;
colorPaletteText.appendChild(colorPalette);

optionDiv.appendChild(gridText);
optionDiv.appendChild(colorPaletteText);
optionDiv.appendChild(colorButton);
optionDiv.appendChild(rainbowButton);
optionDiv.appendChild(shadeButton);
optionDiv.appendChild(resetButton);
mainDiv.appendChild(optionDiv);
mainDiv.appendChild(sketchDiv);

// select grid
const select = document.getElementById("select");
for (let i = 1; i <= 100; i++) {
  const option = document.createElement("option");
  option.textContent = `${i} x ${i}`;
  option.value = i;
  if (i === 10) option.selected = true;
  select.appendChild(option);
}

select.addEventListener("change", (e) => {
  selectedNumber = e.target.value;
  sketchDiv.textContent = "";
  for (let x = 0; x < selectedNumber * selectedNumber; x++) {
    const squares = document.createElement("div");
    squares.className = "square";
    squares.style.background = "rgba(255, 255, 255, 0)";
    const squareHeight = (squareWidth = `${500 / selectedNumber}px`);
    squares.style.height = squares.style.width = squareHeight;
    sketchDiv.appendChild(squares);
  }
});

// switch
let toggle = 'color';
const buttons = document.querySelectorAll("button");
for (const button of buttons) {
  buttons[0].classList.add('clickedButton');
  buttons[0].focus();
  button.addEventListener("click", (btnEvent) => {
    if (btnEvent.target.id === "color") {
      toggle = "color";
      buttons[0].classList.add('clickedButton');
      buttons[1].classList.remove('clickedButton');
      buttons[2].classList.remove('clickedButton');
    }
    if (btnEvent.target.id === "rainbow") {
      toggle = "rainbow";
      buttons[1].classList.add('clickedButton');
      buttons[0].classList.remove('clickedButton');
      buttons[2].classList.remove('clickedButton');
    }
    if (btnEvent.target.id === "shade") {
      toggle = "shade";
      buttons[2].classList.add('clickedButton');
      buttons[0].classList.remove('clickedButton');
      buttons[1].classList.remove('clickedButton');
    }
  });
}

function mode(e) {
  const getColor = document.getElementById("colorButton");

  if (toggle === "color") {
    e.target.style.background = getColor.value;
  } else if (toggle === "rainbow") {
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    e.target.style.background = randomColor;
  } else {
    const rgbToArray = e.target.style.background
      .replace(/^(rgb|rgba)\(/, "")
      .replace(/\)$/, "")
      .replace(/\s/g, "")
      .split(",");

    const hexToRgb = getColor.value
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));

    rgbToArray[3] = Number(rgbToArray[3]);
    rgbToArray[3] += 0.1;
    e.target.style.background = `rgba(${hexToRgb[0]}, ${hexToRgb[1]}, ${hexToRgb[2]}, ${rgbToArray[3]})`;
  }
}

sketchDiv.addEventListener("mousedown", () => {
  const allSquares = document.querySelectorAll(".square");
  for (const square of allSquares) {
    square.addEventListener("mousedown", mode);
    square.addEventListener("mouseover", mode);
  }
}, true);

document.body.addEventListener("mouseup", () => {
  const allSquares = document.querySelectorAll(".square");
  for (const square of allSquares) {
    square.removeEventListener("mouseover", mode);
  }
});

// reset
document.getElementById("reset").addEventListener("click", () => {
  const allSquares = document.querySelectorAll(".square");
  [...allSquares].map((e) => {
    e.style.background = "rgba(255, 255, 255, 0)";
  });
});

// https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
const defaultEvent = new Event("change");
document.getElementById("select").dispatchEvent(defaultEvent);
