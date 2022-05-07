
let page_nr = 5;

let xabstand = 400;
let yabstand = 600;
let seitenabstand = 20;
let buttonAbstand = 50;

let anzahlItems = 2408
let anzahlItemsProSeite = 40;
let anzahlItemsProZeile = 4;
let anzahlItemsProSpalte = 10; //Math.floor(anzahlItemsProSeite / anzahlItemsProZeile)
let anzahlSeiten = Math.ceil(anzahlItems / anzahlItemsProSeite);

let kunstwerke;


function preload() {
  let url =
   'json/cda-paintings-2022-04-22.de.json';
  kunstwerke = loadJSON(url);
  
  anzahlItems = kunstwerke.items.length;
}




function setup() {
	
		
	show_page(page_nr);
	
	
}


function show_buttons(xpos, ypos, page_nr) {
	
	buttonAbstand = 50;
	
	if (page_nr != anzahlSeiten) {
		let btnForward = createButton('>>');
		btnForward.position(xpos+buttonAbstand, ypos);
		btnForward.mousePressed(btnForwardPressed);
	}
	
	if (page_nr != 1) {
		let btnBack = createButton('<<');
		btnBack.position(xpos-buttonAbstand, ypos);
		btnBack.mousePressed(btnBackPressed);
	}
		
	
}

function btnForwardPressed() {
	page_nr++;
	show_page(page_nr);
}

function btnBackPressed() {
	page_nr--;
	show_page(page_nr);
}




function show_page(page_nr) {
	
	removeElements();
	print("SHOW PAGE: ", page_nr)
	
	print(kunstwerke.items.length);
	
	

  	
  
	for (let i = 0; i < anzahlItemsProSpalte; i++) {
		for (let j = 0; j < anzahlItemsProZeile; j++) {
			xpos = j*xabstand+seitenabstand;
			ypos = i*yabstand;
			show_item((i*anzahlItemsProZeile+j)+(page_nr-1)*anzahlItemsProSeite, xpos, ypos);
			print((i*anzahlItemsProZeile+j)+(page_nr-1)*anzahlItemsProSeite);
			
		}
	}
	

	show_buttons(((xabstand)*(anzahlItemsProZeile))/2,(yabstand)*(anzahlItemsProSpalte)+buttonAbstand,page_nr)

	
}

	


let img;
let title;
let date;
let medium;
let repository;

function show_item(id, xpos, ypos) {
	bildabstand = kunstwerke.items[id].images.overall.images[0].sizes.xsmall.dimensions.height;
	zeilenabstand = 16;
	
	img = createImg(kunstwerke.items[id].images.overall.images[0].sizes.xsmall.src, "");
	img.position(xpos, ypos);
	
    title = createP(kunstwerke.items[id].metadata.title);
	title.style('font-size', '16px');
	title.position(xpos, ypos+bildabstand);
	
	date = createP(kunstwerke.items[id].metadata.date);
	date.style('font-size', '16px');
	date.position(xpos, ypos+bildabstand+zeilenabstand);
	
	mediumfull = split(kunstwerke.items[id].medium, '[');
	medium = createP(mediumfull[0]);
	medium.style('font-size', '16px');
	medium.style('font-face', 'Arial');
	medium.position(xpos, ypos+bildabstand+zeilenabstand*2);
	
	repository = createP(kunstwerke.items[id].repository);
	repository.style('font-size', '16px');
	repository.position(xpos, ypos+bildabstand+zeilenabstand*3);
	
	

}




