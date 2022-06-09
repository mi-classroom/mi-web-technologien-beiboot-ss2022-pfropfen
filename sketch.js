



let kunstwerke;
let img = [];
let ratio = [];  // SEITENVERHÄLTNIS
let hoehe = [];
let breite = [];

let years_count;

let bildsize = 5;
let biggestImage;


function preload() {
  
  f = loadFont('inconsolata.ttf');
  
  let url =
   'json/cda-paintings-2022-04-22.de.json';
  kunstwerke = loadJSON(url, sortKunstwerke);
  
  //anzahlItems = kunstwerke.items.length;
    
  
}


function sortKunstwerke(){
  kunstwerke.items.sort((a, b) => {
    let fa = a.sortingNumber.toLowerCase(),
        fb = b.sortingNumber.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
	
	
});

  kunstwerke.items = kunstwerke.items.filter(item => item.isBestOf);


  //print(typeof kunstwerke.items);
  //print(kunstwerke.items.length);
  //print(kunstwerke.items[0].isBestOf);
  //print(kunstwerke.items[0].sortingNumber);
  //img = loadImage('https://lucascranach.org/data-proxy/image.php?subpath=/CH_SORW_1925-1b_FR006/01_Overall/CH_SORW_1925-1b_FR006_2008-11_Overall-s.jpg');
  
 
  biggestImage = 0;
  
  for (let i=0; i<kunstwerke.items.length; i++) {
	//print(i);
	let imageLinkOld = kunstwerke.items[i].images.overall.images[0].sizes.medium.src;
	let imageLinkNew = imageLinkOld.replace("imageserver-2022", "data-proxy/image.php?subpath=");
	img[i] = loadImage(imageLinkNew);
	
	//DIMENSIONS  height/width
	hoehe[i] = kunstwerke.items[i].images.overall.infos.maxDimensions.height;
	breite[i] = kunstwerke.items[i].images.overall.infos.maxDimensions.width;
	ratio[i] = kunstwerke.items[i].images.overall.infos.maxDimensions.height/kunstwerke.items[i].images.overall.infos.maxDimensions.width;
	
	/*
	if (hoehe[i] > biggestImage) {
		biggestImage = hoehe[i];
	}
	*/
	
	
	if (bildsize*ratio[i] > biggestImage) {
		biggestImage = bildsize*ratio[i];
	}
	
	
  }
  
  years_count = 0;
  for (let i=0; i<kunstwerke.items.length-1; i++) {
	
	sort_nr = kunstwerke.items[i].sortingNumber.split("-");
	current_year = sort_nr[0];
			
	next_sort_nr = kunstwerke.items[i+1].sortingNumber.split("-");
	next_year = next_sort_nr[0];
	
	if (next_year != current_year) {
	years_count++;
	}
	
	//print("YEAR_COUNT: "+years_count);
  }
  
    
  
  

 

}






class Player extends RoverCam {
  constructor() {
    super();
    this.dimensions = createVector(1, 3, 1);
    this.velocity = createVector(0, 0, 0);
    this.gravity = createVector(0, 0.03, 0);
    this.grounded = false;
    this.pointerLock = false;
    this.sensitivity = 0.002;
    this.speed = 0.04;
  }
  
  controller() { // override
    if (player.pointerLock) {
      this.yaw(movedX * this.sensitivity);   // mouse left/right
      this.pitch(movedY * this.sensitivity); // mouse up/down
      if(keyIsDown(65) || keyIsDown(LEFT_ARROW))  this.moveY(0.01); // a
      if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.moveY(-0.01);// d
    }
    else { // otherwise yaw/pitch with keys
      if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) this.yaw(-0.02); // a
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.yaw(0.02); // d
      if (keyIsDown(82)) this.pitch(-0.02); // r
      if (keyIsDown(70)) this.pitch(0.02);  // f
    }
    if (keyIsDown(87) || keyIsDown(UP_ARROW)) this.moveX(this.speed);    // w
    if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) this.moveX(-this.speed); // s
    if (keyIsDown(69)) this.moveZ(0.05); // e
  }
  
  update() {
    if (keyIsPressed && key == 'e') {
      this.grounded = false;
      return;
    }
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);

    if (this.grounded && keyIsPressed && keyCode == 32) { // space
      this.grounded = false;
      this.velocity.y = -1.5;
      this.position.y -= 0.2;
    }
	
	if (this.position.y > 0) {
		this.position.y = 0;
		this.velocity.y = 0;
	
	}
	
		
  }
}

// this is needed to catch the exit from pointerLock when user presses ESCAPE
function onPointerlockChange() {
  if (document.pointerLockElement === canvas.elt ||
    document.mozPointerLockElement === canvas.elt)
    console.log("locked");
  else {
    console.log("unlocked");
    player.pointerLock = false;
  }
}
document.addEventListener('pointerlockchange', onPointerlockChange, false);

var player, maze, f, help = false,
  canvas;

/*
function preload() {
  f = loadFont('inconsolata.ttf');
}
*/

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  strokeWeight(0.04);
  textFont(f);
  textSize(10);
  player = new Player();

  frameRate(60);
  strokeWeight(2);
  player.position.x = 0;
  player.position.z = 0;
}


	
	
function keyPressed() {
  if (key == 'h') help = !help;
  if(key=='+'){
    player.pov.fovy -= 0.1;
    player.updatePOV();
  }
  if(key=='-'){
    player.pov.fovy += 0.1;
    player.updatePOV();
  }
}

function draw() {
  
  background(0, 0, 51);


  player.update();
  //drawAxes();
  drawTimeline();

}

function drawAxes(){
	push();
      noStroke();
	  fill(127,0,0); // X red
	 // translate(75,0.5,0.5);
	  box(150,1,1);
	pop();
	push();
      noStroke();
	  fill(0,127,0); // Y green
	// translate(0.5,75,0.5);
	  box(1,150,1);
	pop();
	push();
      noStroke();
	  fill(0,0,127); // Z blue
	//  translate(0.5,0.5,75);
	  box(1,1,150);
	pop();
}

function drawTimeline() {
	

	let years_distance = 10;
	//let years_start_position = 25;
	let timeline_size = 0.1;
	
	let w = 0;
	let sort_nr;
	let current_year;
	
	let next_sort_nr; 
	let next_year; 

	
	
	let bildabstand = 5;
	
	let rand = 2;
	
	let year_size;
	
	
	
	
	
	translate(0,2,0); //CAMERA POSITION
	
	
	push();					//TIMELINE
	  noStroke();
	  fill(127,127,127);
	  translate((years_count*years_distance)/2,0,-rand*2);
	  box(years_count*years_distance,timeline_size,timeline_size);
	pop();
	
	
	
	

	
	
	
	
	
	
	for (let i = 0; i < years_count; i++) { 

		
		
		
		push();
		rotateY(PI/2);
		//translate(-bildabstand/2,-bildsize/2,0);
		//translate(-bildabstand/2-bildsize/2,-bildsize/2,0);
		translate(-bildsize/2,-biggestImage/2,0);
		
		year_size = 0.0;
		
		do {
		

			
			
			
			texture(img[w]);
			noStroke();
			plane(bildsize,bildsize*ratio[w]);   // plane(width,height)
			//plane(breite[w]/100,hoehe[w]/100);   // plane(width,height)
			translate(-bildabstand-bildsize,0,0);
			//pop();
			
				
			
			
			sort_nr = kunstwerke.items[w].sortingNumber.split("-");
			current_year = sort_nr[0];
			//print(current_year);
			
			next_sort_nr = kunstwerke.items[w+1].sortingNumber.split("-");
			next_year = next_sort_nr[0];
			
			w++;
			year_size += bildabstand + bildsize;

			
		
		
		
		} while (next_year == current_year);
		pop();
		
		year_size -= bildabstand;
		
		push();		// PURPLE YEAR LINE
		  noStroke();
		  fill(127,0,127);
		  translate(0,0,year_size/2-rand/2);
		  box(timeline_size,timeline_size,year_size+rand*2);
		pop();
	
	/*
		push();		// YEAR WALL
		  stroke(51);
		  noFill();
		 // translate(i*years_distance,-2.5,12.5);
		  translate(timeline_size/2,-biggestImage/2,year_size/2-rand/2);
		 // box(timeline_size,5,25);	
		  box(timeline_size,biggestImage,year_size+rand*2);	
		pop();
	*/	
		
	translate(years_distance,0,0);
		
		
		
	
	}
	
	
	
}

function mouseClicked() {
  if (!player.pointerLock) {
    player.pointerLock = true;
    requestPointerLock();
  } else {
    exitPointerLock();
    player.pointerLock = false;
  }
}





