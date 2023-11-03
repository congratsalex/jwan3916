// Represents a single block, either moving or static
class Block {
  constructor(x, y, w, h, c, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.speedX = speedX;
    this.speedY = speedY;
  }

 // Draws the block on the canvas with its current properties
  display() {
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
  }

// Updates the position of the block and reverses its direction if it hits an edge
  update() {
    this.x += this.speedX;
    this.y += this.speedY;


    // Bounce off the edges
    if (this.x < 0 || this.x + this.w > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y + this.h > height) {
      this.speedY *= -1;
    }
  }
}

// Arrays to store the static and dynamic blocks separately
let staticBlocks = [];
let dynamicBlocks = [];
let interval;

// Sets up the initial environment when the program starts
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(229, 228, 240);
 
// Creating static blue blocks at specific positions with predefined colors and sizes
  staticBlocks.push(new Block(windowWidth * 0.1, windowHeight * 0.16, windowWidth * 0.06, windowHeight * 0.06, color(0, 0, 255), 2, 3));
  staticBlocks.push(new Block(windowWidth * 0.1, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(0, 0, 255), 2, 3));
  staticBlocks.push(new Block(windowWidth * 0.32, windowHeight * 0.52, windowWidth * 0.06, windowHeight * 0.1, color(0, 0, 255), 2, 3));
  staticBlocks.push(new Block(windowWidth * 0.76, windowHeight * 0.32, windowWidth * 0.1, windowHeight * 0.2, color(0, 0, 255), 2, 3));
  staticBlocks.push(new Block(windowWidth * 0.82, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(0, 0, 255), 2, 3));
 
  // Creating static red blocks at specific positions with predefined colors and sizes
  staticBlocks.push(new Block(windowWidth * 0.16, windowHeight * 0.04, windowWidth * 0.04, windowHeight * 0.18, color(255, 0, 0), 3, 2));
  staticBlocks.push(new Block(windowWidth * 0.26, windowHeight * 0.04, windowWidth * 0.08, windowHeight * 0.12, color(255, 0, 0), 3, 2));
  staticBlocks.push(new Block(windowWidth * 0.16, windowHeight * 0.54, windowWidth * 0.12, windowHeight * 0.08, color(255, 0, 0), 3, 2));
  staticBlocks.push(new Block(windowWidth * 0.58, windowHeight * 0.4, windowWidth * 0.12, windowHeight * 0.1, color(255, 0, 0), 3, 2));
  staticBlocks.push(new Block(windowWidth * 0.68, windowHeight * 0.6, windowWidth * 0.1, windowHeight * 0.14, color(255, 0, 0), 3, 2));
 
    // Creating static gray blocks at specific positions with predefined colors and sizes
  staticBlocks.push(new Block(windowWidth * 0.28, windowHeight * 0.08, windowWidth * 0.06, windowHeight * 0.06, color(169), 2, 1));
  staticBlocks.push(new Block(windowWidth * 0.46, windowHeight * 0.22, windowWidth * 0.1, windowHeight * 0.14, color(169), 2, 1));
  staticBlocks.push(new Block(windowWidth * 0.46, windowHeight * 0.74, windowWidth * 0.06, windowHeight * 0.1, color(169), 2, 1));
  staticBlocks.push(new Block(windowWidth * 0.74, windowHeight * 0.62, windowWidth * 0.08, windowHeight * 0.04, color(169), 2, 1));
  staticBlocks.push(new Block(windowWidth * 0.8, windowHeight * 0.04, windowWidth * 0.1, windowHeight * 0.06, color(169), 2, 1));


  calculateDynamicBlocks();
}

// Calculate positions and create dynamic blocks
function calculateDynamicBlocks() {
  dynamicBlocks = [];

 // Calculate adjusted positions for horizontal and vertical streets based on window size
  let yPosArray = calculatePositions([10, 50, 120, 150, 220, 250, 280, 340, 440], windowHeight);
  let xPosArray = calculatePositions([10, 30, 70, 140, 300, 330, 420, 440, 480, 500], windowWidth);
 
  // Create dynamic blocks for horizontal and vertical streets
  horizontalStreets(yPosArray);
  verticalStreets(xPosArray);
}


function calculatePositions(positionArray, canvasSize) {
  let adjustedPositions = [];
  for (let pos of positionArray) {
    adjustedPositions.push((pos / 500) * canvasSize);
  }
  return adjustedPositions;
}

// Creates dynamic blocks to represent horizontal streets
function horizontalStreets(yPosArray) {
function horizontalStreets(yPosArray) {
  for (let yPos of yPosArray) {
    for (let i = 0; i < width; i += 10) {
      let num = floor(random(101));
      let c = colourMap(num);
      dynamicBlocks.push(new Block(i, yPos, 10, 10, c, 0, 0));
    }
  }
}

// Creates dynamic blocks to represent vertical streets
function verticalStreets(xPosArray) {
  for (let xPos of xPosArray) {
    for (let i = 0; i < height; i += 10) {
      let num = floor(random(101));
      let c = colourMap(num);
      dynamicBlocks.push(new Block(xPos, i, 10, 10, c, 0, 0));
    }
  }
}

// Maps a number to a color based on specified ranges
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

// Draws the blocks on the canvas, updating their positions if they are dynamic
function draw() {
  background(229, 228, 240);
 
  for (let block of staticBlocks) {
    block.display();
    block.update();
  }
 
   // Display dynamic blocks without updating positions (since their speed is 0)
  for (let block of dynamicBlocks) {
    block.display();
  }
}

// Adjusts the canvas and dynamic blocks when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateDynamicBlocks();
}
