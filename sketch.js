
// Represents a single moving block on the canvas
class Block {
  constructor(x, y, w, h, c, speedX, speedY) {
 // Properties for position, dimensions, color, and velocity // Properties for position, dimensions, color, and velocity
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.speedX = speedX;
    this.speedY = speedY;
  }

 // Method to display the block on the canvas
  display() {
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
  }

// Method to update the block's position and handle bouncing from edges
  update() {
    this.x += this.speedX;
    this.y += this.speedY;


 // Reverse velocity if the block hits the canvas boundary
    if (this.x < 0 || this.x + this.w > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y + this.h > height) {
      this.speedY *= -1;
    }
  }
}


let blocks = [];// Array to hold all the block objects
let interval;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(229, 228, 240); 
 
  let a = 0;
  interval = setInterval(draw, 100);


 // Calculate positions for blocks based on window size
  let yPosArray = calculatePositions([10, 50, 120, 150, 220, 250, 280, 340, 440], windowHeight);
  let xPosArray = calculatePositions([10, 30, 70, 140, 300, 330, 420, 440, 480, 500], windowWidth);
 
  horizontalStreets(yPosArray);
  verticalStreets(xPosArray);
 // Creation of moving blocks with specific positions, dimensions, colors, and velocities
  blocks.push(new Block(windowWidth * 0.1, windowHeight * 0.16, windowWidth * 0.06, windowHeight * 0.06, color(0, 0, 255), 2, 3));
  blocks.push(new Block(windowWidth * 0.1, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(0, 0, 255), 2, 3));
  blocks.push(new Block(windowWidth * 0.32, windowHeight * 0.52, windowWidth * 0.06, windowHeight * 0.1, color(0, 0, 255), 2, 3));
  blocks.push(new Block(windowWidth * 0.76, windowHeight * 0.32, windowWidth * 0.1, windowHeight * 0.2, color(0, 0, 255), 2, 3));
  blocks.push(new Block(windowWidth * 0.82, windowHeight * 0.7, windowWidth * 0.08, windowHeight * 0.08, color(0, 0, 255), 2, 3));
 
  blocks.push(new Block(windowWidth * 0.16, windowHeight * 0.04, windowWidth * 0.04, windowHeight * 0.18, color(255, 0, 0), 3, 2));
  blocks.push(new Block(windowWidth * 0.26, windowHeight * 0.04, windowWidth * 0.08, windowHeight * 0.12, color(255, 0, 0), 3, 2));
  blocks.push(new Block(windowWidth * 0.16, windowHeight * 0.54, windowWidth * 0.12, windowHeight * 0.08, color(255, 0, 0), 3, 2));
  blocks.push(new Block(windowWidth * 0.58, windowHeight * 0.4, windowWidth * 0.12, windowHeight * 0.1, color(255, 0, 0), 3, 2));
  blocks.push(new Block(windowWidth * 0.68, windowHeight * 0.6, windowWidth * 0.1, windowHeight * 0.14, color(255, 0, 0), 3, 2));
 
 
  blocks.push(new Block(windowWidth * 0.28, windowHeight * 0.08, windowWidth * 0.06, windowHeight * 0.06, color(169), 2, 1));
  blocks.push(new Block(windowWidth * 0.46, windowHeight * 0.22, windowWidth * 0.1, windowHeight * 0.14, color(169), 2, 1));
  blocks.push(new Block(windowWidth * 0.46, windowHeight * 0.74, windowWidth * 0.06, windowHeight * 0.1, color(169), 2, 1));
  blocks.push(new Block(windowWidth * 0.74, windowHeight * 0.62, windowWidth * 0.08, windowHeight * 0.04, color(169), 2, 1));
  blocks.push(new Block(windowWidth * 0.8, windowHeight * 0.04, windowWidth * 0.1, windowHeight * 0.06, color(169), 2, 1));
}


function calculatePositions(positionArray, canvasSize) {

  let adjustedPositions = [];
  for (let pos of positionArray) {
    adjustedPositions.push((pos / 500) * canvasSize);
  }
  return adjustedPositions;
}


function horizontalStreets(yPosArray) {
  for (let yPos of yPosArray) {
    for (let i = 0; i < width; i += 10) {
      let num = floor(random(101));
      let c = colourMap(num);
      blocks.push(new Block(i, yPos, 10, 10, c, 0, 0)); 
    }
  }
}


function verticalStreets(xPosArray) {
  for (let xPos of xPosArray) {
    for (let i = 0; i < height; i += 10) {
      let num = floor(random(101));
      let c = colourMap(num);
      blocks.push(new Block(xPos, i, 10, 10, c, 0, 0)); 
    }
  }
}

 // Conditions that map numbers to different colors
function colourMap(num) {
  if (num >= 0 && num <= 65) {
    return color(255, 255, 0); // Yellow
  } else if (num >= 66 && num <= 80) {
    return color(0); // Black
  } else if (num >= 81 && num <= 85) {
    return color(255, 0, 0); // Red
  } else if (num >= 86 && num <= 100) {
    return color(169); // Gray
  }
}


function draw() {
  background(229, 228, 240);
   // Loop through all blocks and update their display and position
  for (let block of blocks) {
    block.display();
    block.update();
  }
}

// Handles window resizing by resetting the canvas and blocks
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clearInterval(interval);  
  setup();  
}
