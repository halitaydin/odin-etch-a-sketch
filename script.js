const colorClickEvent = new Event("click");

const heading = document.createElement("h1");
heading.textContent = "Etch-a-sketch";
document.body.appendChild(heading);

const mainDiv = document.createElement("div");
document.body.appendChild(mainDiv);
mainDiv.id = "mainDiv";

const optionDiv = document.createElement("div");
optionDiv.id = "optionDiv";

const sketch = document.createElement("div");
sketch.id = "sketch";

const selectButton = document.createElement("select");
selectButton.id = "select";

const colorButton = document.createElement("button");
colorButton.id = "color";
colorButton.textContent = "Color Mode";

const rainbowButton = document.createElement("button");
rainbowButton.id = "rainbow";
rainbowButton.textContent = "Rainbow Mode";

const shadeButton = document.createElement("button");
shadeButton.id = "shade";
shadeButton.textContent = "Shade Mode";

const resetButton = document.createElement("button");
resetButton.id = "reset";
resetButton.textContent = "Reset";

const colorPalette = document.createElement("input");
colorPalette.id = "colorButton";
colorPalette.setAttribute("type", "color");
colorPalette.setAttribute("selected", "black");

optionDiv.appendChild(selectButton);
optionDiv.appendChild(colorPalette);
optionDiv.appendChild(colorButton);
optionDiv.appendChild(rainbowButton);
optionDiv.appendChild(shadeButton);
optionDiv.appendChild(resetButton);
mainDiv.appendChild(optionDiv);
mainDiv.appendChild(sketch);

// select grid
const select = document.getElementById("select");
for (let i = 1; i <= 64; i++) {
  const option = document.createElement("option");
  option.textContent = `${i} x ${i}`;
  option.value = i;
  if (i === 10) option.selected = true;
  select.appendChild(option);
}

select.addEventListener("change", (e) => {
  selectedNumber = e.target.value;
  sketch.textContent = "";

  for (let x = 0; x < selectedNumber * selectedNumber; x++) {
    const squares = document.createElement("div");
    squares.className = "square";
    squares.style.background = "rgba(255, 255, 255, 0)";
    const squareHeight = (squareWidth = `${500 / selectedNumber}px`);
    squares.style.height = squares.style.width = squareHeight;
    sketch.appendChild(squares);
  }
  document.getElementById("color").dispatchEvent(colorClickEvent);
});

// switch
let toggle;
const buttons = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener("click", (btnEvent) => {
    if (btnEvent.target.id === "color") toggle = "color";
    if (btnEvent.target.id === "rainbow") toggle = "rainbow";
    if (btnEvent.target.id === "shade") toggle = "shade";

    const getColor = document.getElementById("colorButton");

    function mode(e) {
      if (toggle === "color") {
        e.target.style.background = getColor.value;
      } else if (toggle === "rainbow") {
        let randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        e.target.style.background = randomColor;
      } else if (toggle === "shade") {
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
        rgbToArray[3] += 0.05;
        e.target.style.background = `rgba(${hexToRgb[0]}, ${hexToRgb[1]}, ${hexToRgb[2]}, ${rgbToArray[3]})`;
      }
    }

    const allSquares = document.querySelectorAll(".square");

    sketch.addEventListener("mousedown", (e) => {
      mode(e);
      [...allSquares].map((square) => {
        square.addEventListener("mouseover", mode);
      });
    });

    document.body.addEventListener("mouseup", () => {
      [...allSquares].map((square) => {
        square.removeEventListener("mouseover", mode);
      });
    });
  });
}

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
