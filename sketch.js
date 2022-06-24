

// calculate height for the plane
      const calculateHeight = (element) => {
            const split = element.dimensions.replace(/[\])}[{(]/g, ' ').split(' ');
            const scalingFactor = 1 / 1.8;
            const splitWithoutCM = split.filter(
              (string) => string !== 'cm' && string !== ''
            );

            let size;
            let sideMeasured;

            for (const string of splitWithoutCM) {
              const stringSlicedAtDash = string.split('-')[0];

              if (!size) {
                if (/\d/.test(stringSlicedAtDash)) {
                  size = parseFloat(stringSlicedAtDash.replace(/,/g, '.'));
                }
              } else {
                sideMeasured = stringSlicedAtDash;

                break;
              }
            }

            switch (sideMeasured) {
              case 'oben':
                size =
                  (size / element.images.overall.images[0].sizes.medium.dimensions.width) *
                  element.images.overall.images[0].sizes.medium.dimensions.height;

                break;
              case 'Durchmesser':
                /* eslint-disable */
                const scaledDiameter = Math.sqrt(
                  Math.pow(
                    element.images.overall.images[0].sizes.medium.dimensions.width,
                    2
                  ) +
                    Math.pow(
                      element.images.overall.images[0].sizes.medium.dimensions.height,
                      2
                    )
                );

                const scalingFactor = size / scaledDiameter;

                size =
                  element.images.overall.images[0].sizes.medium.dimensions.height *
                  scalingFactor;

                break;
              default:
                break;
            }

            return (size / 100) * scalingFactor;
          };


let kunstwerke;
let img = [];
let hoehe = [];
let breite = [];
let ratio = [];  // SEITENVERHÄLTNIS

let years_count;

let bildsize = 5;
let biggestImage;


let tsize = 0.12;
let tsize_year = 1.2;
let pg;

let sichtweite = 3;   // SICHTWEITE


function preload() {
  
  f = loadFont('inconsolata.ttf');
  
  let url =
   'json/cda-paintings-2022-04-22.de.json';
  kunstwerke = loadJSON(url, sortKunstwerke);
  
    
  
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


  biggestImage = 0;
  
  for (let i=0; i<kunstwerke.items.length; i++) {

	let imageLinkOld = kunstwerke.items[i].images.overall.images[0].sizes.medium.src;
	let imageLinkNew = imageLinkOld.replace("imageserver-2022", "data-proxy/image.php?subpath=");
	img[i] = loadImage(imageLinkNew);
	
	
	//DIMENSIONS
	let scalingFactor = 10;
	hoehe[i] = calculateHeight(kunstwerke.items[i])*scalingFactor;
	//ratio[i] = kunstwerke.items[i].images.overall.infos.maxDimensions.width/kunstwerke.items[i].images.overall.infos.maxDimensions.height;
	ratio[i] = kunstwerke.items[i].images.overall.images[0].sizes.medium.dimensions.width/kunstwerke.items[i].images.overall.images[0].sizes.medium.dimensions.height;
	breite[i] = hoehe[i]*ratio[i];
	
	
	
	if (hoehe[i] > biggestImage) {
		biggestImage = hoehe[i];
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
	
	
	

  }
  //print("YEARCOUNT: "+years_count);
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
  
 

  
  textSize(tsize);
}


	
	
function keyPressed() {
  if (key == 'h') help = !help;
  if(key=='+'){
    sichtweite++;
  }
  if(key=='-'){
    sichtweite--;
  }
  if(key=='1'){
    sichtweite = 1;
  }
  if(key=='2'){
    sichtweite = 2;
  }
  if(key=='3'){
    sichtweite = 3;
  }
  if(key=='4'){
    sichtweite = 4;
  }
  if(key=='5'){
    sichtweite = 5;
  }
  if(key=='6'){
    sichtweite = 6;
  }
  if(key=='7'){
    sichtweite = 7;
  }
  if(key=='8'){
    sichtweite = 8;
  }
  if(key=='9'){
    sichtweite = 9;
  }
  if(key=='0'){
    sichtweite = years_count;
  }
}


function draw() {
  
  background(0, 0, 51);


  player.update();
  //drawAxes();
  drawTimeline();

}



function drawTimeline() {
	

	let years_distance = 10.0;
	let timeline_size = 0.1;
	
	let w = 0;
	let sort_nr;
	let current_year;
	
	let next_sort_nr; 
	let next_year; 

	
	
	let bildabstand = 5;
	
	let rand = 0.2;
	
	let year_size;
	
	
	
	
	
	
	
	translate(0,2,0); //CAMERA POSITION
	print(player.position.x);
	
	
	push();					//TIMELINE
	  noStroke();
	  fill(127,127,127);
	  translate((years_count*years_distance)/2,0,-rand);
	  box(years_count*years_distance,timeline_size,timeline_size);
	pop();
	
	
	
	
	
	for (let i = 0; i < years_count; i++) { 


		push();
		rotateY(PI/2);
		translate(-bildsize/2,-biggestImage/2,0);
		
		year_size = 0.0;
		
		
		
		
		
		
		
		do {
			if (i*years_distance < player.position.x + sichtweite*years_distance &&
     	        i*years_distance > player.position.x - sichtweite*years_distance) {
			// BILD ANZEIGEN
			push();
			texture(img[w]);
			noStroke();
			plane(breite[w],hoehe[w]);   // vorderseite (bild) plane(width,height)
			pop();
			

			
			
			// TEXT ANZEIGEN
			textSize(tsize);
			push();
			noStroke();
			translate(0,0,0.1);
			plane(breite[w],hoehe[w]);  // rückseite für text
			fill(0);
			translate(-breite[w]/2+0.1,0,0.1);
			text('Titel: '+kunstwerke.items[w].metadata.title,0,0);
			translate(0,tsize,0);
			text('Künstler: '+kunstwerke.items[w].involvedPersons[0].name,0,0);
			translate(0,tsize,0);
			text('Art: '+kunstwerke.items[w].medium,0,0);
			translate(0,tsize,0);
			text('Besitzer: '+kunstwerke.items[w].repository,0,0);
			pop();
			
				} // ENDIF
			translate(-bildabstand-breite[w],0,0);
			
			
			
			
			sort_nr = kunstwerke.items[w].sortingNumber.split("-");
			current_year = sort_nr[0];

			
			next_sort_nr = kunstwerke.items[w+1].sortingNumber.split("-");
			next_year = next_sort_nr[0];
			
			w++;
			year_size += bildabstand + bildsize;

			
		
		
		
		} while (next_year == current_year);
		pop();
		
		
		year_size -= bildabstand;
		
		if (i*years_distance < player.position.x + sichtweite*years_distance &&
     	        i*years_distance > player.position.x - sichtweite*years_distance) {
		push();		// PURPLE YEAR LINE
		
		  push();
		  textSize(tsize_year);
		  translate(0,0,-2.9);
		  rotateY(-PI/2);
		  text(current_year,0,0);   // JAHR Text
		  pop();
		  
		  noStroke();
		  fill(127,0,127);
		  translate(0,0,year_size/2-rand/2);
		  box(timeline_size,timeline_size,year_size+rand*2);
		  
		  
		pop();
		
		
				} // ENDIF
	
	//  } // ENDIF SICHTWEITE
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








