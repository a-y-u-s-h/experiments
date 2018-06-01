/**
 * Experiment 3 : 3D Starfield using 2D logic
 *
 * Description : 
 *
 * Imagine a sci-fi movie scenario where some spaceship is warping through space, 
 * crossing lots of stars. What you see in these cases is usually a starfield. 
 * This is what I've made here in JavaScript using p5. 
 * X coordinate of your mouse will determine the speed of your spaceship.
 * Inspired from works of Daniel Shiffman.
 *
 * Remarks : 
 *
 * Um, maybe some day I'll use this in some sort of page with Dr. Who music in the background, that'd be pretty cool. 
 * I made it using 2D logic in 2D canvas creating an illusion of 3D, so it'll still run a little slower on phones.
 * 
 */


/* 
	Data related to this experiment: 
	n = number of stars,
	r  = radius of those stars (max),
	speed = speed of stars,
	stars = an array containing those stars
*/
var data = {
	n: 800,
	r: 4,
	speed: 100,
	stars: []
};

setup = () => {
	createCanvas(windowWidth, windowHeight);
	/*
		Putting Star object instances in stars array.
	*/
	if (data.n) {
		for (var i = 0, upperLimit = data.n; i < upperLimit; i += 1) {
			data.stars.push(new Star());
		}
	}
};

draw = () => {
	background(0);
	translate(width / 2, height / 2);

	data.speed = map(mouseX, 0, width, 2, 80);

	for (var i = 0, upperLimit = data.n; i < upperLimit; i += 1) {
		data.stars[i].show();
		data.stars[i].update();
	}
};

var windowResized = () => {
	resizeCanvas(windowWidth, windowHeight);
}
