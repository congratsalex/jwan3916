// The Block class defines the properties and methods for each block on the canvas.
class Block {
  constructor(x, y, w, h, c, speedX, speedY, scale = 1, targetScale = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.speedX = speedX;
    this.speedY = speedY;
    this.scale = scale;
    this.targetScale = targetScale;
  }

// Displays the block on the canvas with its current properties.
  display() {
    fill(this.c);
    rect(this.x, this.y, this.w * this.scale, this.h * this.scale);
  }

 // Updates the block's position and handles the bouncing logic.
  update() {
    this.x += this.speedX;
    this.y += this.speedY;


    if (this.x < 0 || this.x + this.w > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y + this.h > height) {
      this.speedY *= -1;
    }

// Gradually changes the block's scale to reach its target scale.
    this.updateScale();
  }
 
  updateScale() {
    if (this.scale < this.targetScale) {
      this.scale +=1;
    } else if (this.scale > this.targetScale) {
      this.scale -= 0.02;
    }
  }
}

// Array to hold blocks that do not move.
let staticBlocks = [];
// Array to hold blocks that can move (dynamic blocks).
let dynamicBlocks = [];

function updateDynamicBlocksColor() {
  for (let block of dynamicBlocks) {
    let num = floor(random(101));
    block.c = colourMap(num); 
  }
}


// The setup function initializes the canvas and static blocks.
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(229, 228, 240);


  staticBlocks.push(new Block(windowWidth * 0.1, windowHeight * 0.16, windowWidth * 0.06, windowHeight * 0.06, color(0, 0, 255), 2, 3, 1, 2));
  staticBlocks.push(new Block(windowWidth * 0.1, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(0, 0, 255), 2, 3, 1, 0.5));
  staticBlocks.push(new Block(windowWidth * 0.32, windowHeight * 0.52, windowWidth * 0.06, windowHeight * 0.1, color(0, 0, 255), 2, 3, 1, 1.5));
  staticBlocks.push(new Block(windowWidth * 0.76, windowHeight * 0.32, windowWidth * 0.1, windowHeight * 0.2, color(0, 0, 255), 2, 3, 1, 0.8));
  staticBlocks.push(new Block(windowWidth * 0.82, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(0, 0, 255), 2, 3, 1, 1.2));
  staticBlocks.push(new Block(windowWidth * 0.16, windowHeight * 0.04, windowWidth * 0.04, windowHeight * 0.18, color(255, 0, 0), 3, 2, 1, 2));
  staticBlocks.push(new Block(windowWidth * 0.26, windowHeight * 0.04, windowWidth * 0.08, windowHeight * 0.12, color(255, 0, 0), 3, 2, 1, 0.5));
  staticBlocks.push(new Block(windowWidth * 0.16, windowHeight * 0.54, windowWidth * 0.12, windowHeight * 0.08, color(255, 0, 0), 3, 2, 1, 1.5));
  staticBlocks.push(new Block(windowWidth * 0.58, windowHeight * 0.4, windowWidth * 0.12, windowHeight * 0.1, color(255, 0, 0), 3, 2, 1, 0.8));
  staticBlocks.push(new Block(windowWidth * 0.68, windowHeight * 0.6, windowWidth * 0.1, windowHeight * 0.14, color(255, 0, 0), 3, 2, 1, 1.2));
  staticBlocks.push(new Block(windowWidth * 0.28, windowHeight * 0.08, windowWidth * 0.06, windowHeight * 0.06, color(169), 2, 1, 1, 2));
  staticBlocks.push(new Block(windowWidth * 0.46, windowHeight * 0.22, windowWidth * 0.1, windowHeight * 0.14, color(169), 2, 1, 1, 0.5));
  staticBlocks.push(new Block(windowWidth * 0.46, windowHeight * 0.74, windowWidth * 0.06, windowHeight * 0.1, color(169), 2, 1, 1, 1.5));
  staticBlocks.push(new Block(windowWidth * 0.74, windowHeight * 0.62, windowWidth * 0.08, windowHeight * 0.04, color(169), 2, 1, 1, 0.8));
  staticBlocks.push(new Block(windowWidth * 0.8, windowHeight * 0.04, windowWidth * 0.1, windowHeight * 0.06, color(169), 2, 1, 1, 1.2));


  calculateDynamicBlocks();
  setInterval(() => {
    for (let block of staticBlocks) {
      block.updateScale();
    }
  }, 5000);

 // Add timer for dynamic block color update
  setInterval(updateDynamicBlocksColor, 1000);
}


function calculateDynamicBlocks() {
  dynamicBlocks = [];


  let yPosArray = calculatePositions([10, 50, 120, 150, 220, 250, 280, 340, 440], windowHeight);
  let xPosArray = calculatePositions([10, 30, 70, 140, 300, 330, 420, 440, 480, 500], windowWidth);
 
  horizontalStreets(yPosArray);
  verticalStreets(xPosArray);
}

// Takes an array of positions and a canvas size to adjust the positions to fit the canvas.
function calculatePositions(positionArray, canvasSize) {
  let adjustedPositions = [];
  for (let pos of positionArray) {
    adjustedPositions.push((pos / 500) * canvasSize);
  }
  return adjustedPositions;
}

// Creates a row of dynamic blocks for a "street" on the Y axis.
function horizontalStreets(yPosArray) {
  for (let yPos of yPosArray) {
    for (let i = 0; i < width; i += 10) {
      let num = floor(random(101));
      let c = colourMap(num);
      dynamicBlocks.push(new Block(i, yPos, 10, 10, c, 0, 0));
    }
  }
}

// Creates a column of dynamic blocks for a "street" on the X axis.
function verticalStreets(xPosArray) {
  for (let xPos of xPosArray) {
    for (let i = 0; i < height; i += 10) {
      let num = floor(random(101));
      let c = colourMap(num);
      dynamicBlocks.push(new Block(xPos, i, 10, 10, c, 0, 0));
    }
  }
}

// Maps a number to a specific color according to predefined ranges.
function colourMap(num) {
  if (num >= 0 && num <= 65) {
    return color(255, 255, 0);
  } else if (num >= 66 && num <= 80) {
    return color(0);
  } else if (num >= 81 && num <= 85) {
    return color(255, 0, 0);
  } else if (num >= 86 && num <= 100) {
    return color(169);
  }
}

// The draw function constantly updates the canvas, displaying and updating blocks.
function draw() {
  background(229, 228, 240);
 
  for (let block of staticBlocks) {
    block.display();
    block.update();
  }
 
  for (let block of dynamicBlocks) {
    block.display();
  }
}

// Adjusts the canvas size and recalculates dynamic block positions when the window is resized.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateDynamicBlocks();
}

// Interval function to trigger scale updates for static blocks every 5 seconds.
setInterval(() => {
  for (let block of staticBlocks) {
    block.updateScale();
  }
}, 5000);
