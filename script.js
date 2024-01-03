// This is the script file for this project where all the actions are injected into this web-app...

// This is all constants holding all the relevant HTML elements for further DOM manipulations....
const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

// This is the constant which holds the value or the container property of the canvas as 2d
const ctx = canvas.getContext("2d");

// These are some default variables for the color and the size of the paint brush...
let color = "black";
let size = 10;

// These are some utility variables using further in this project...
let isPressed = false;
let x;
let y;

// This is for handling the mousedown event and getting the x-offset and y-offset values and putting it into X and Y global variables
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

// This is for handling the mousedup event and sets isPressed to false and clears the stored position.
canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

// This is for handling the mousemove event and if the mouse is pressed, draws a circle at the current position and a line connecting it to the previous position, then updates the stored position.
canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

// This method is for drawing a filled circle with the specified center, radius, and color.
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// This is method is for drawing a stroked line between two points with the specified color and width.
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// This method is for updating displayed brush size in the HTML element with the ID "size".
function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

// drawCircle(100, 200);
// drawLine(300, 300, 200, 500);


// This is listening the changing event of the color on the screen...
colorEl.addEventListener("change", (e) => (color = e.target.value));


// This is for handling the click button, Increases the brush size, keeping it within the range of 5 to 50.
increaseBtn.addEventListener("click", () => {
  size += 5;

  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

// This is for handling the click button, Decreases the brush size, keeping it within the range
decreaseBtn.addEventListener("click", () => {
  size -= 5;

  if (size < 5) {
    size = 5;
  }

  updateSizeOnScreen();
});


// This is for handling the click event for a "clear canvas" button. When the user clicks on the element with the ID "clearEl", the entire canvas is cleared, erasing any existing drawings.
clearEl.addEventListener("click", () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
);
