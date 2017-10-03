# Experiments
Collection of my web compatible experiments.

### 1. Illusion with Circles #1
There's a big circle whose radius can be controlled, on it there are small circles equally distributed whose numbers and radii can be controlled as well. 
Points are rotating on each of those small circles and are connected by lines creating illusion of 3D at default parameters that I chose.

### 2. WaveOps
An educational thing where user can listen to various waves, play with their parameters, perform addition and multiplication operations on two waves.
See Inputs and Outputs in TIme Domain as well as Frequency Domain. 

### 3. Starfield
A simple 3D Starfield illusion in 2D. Speed of stars coming towards user can be controlled by X location of Mouse.

### 4. Bouncing Balls
A simple implementation of 2D physics : A ball appears and starts bouncing wherever the user clicks + drags.

### 5. SHM Example #1
Okay, so if you want to imagine this one with only discription, then start imagining this:
There are X and Y axes..and there are two points - one able to move only along X axis and another only along Y, I named them 'anchors'.
Both of those anchors undergo their separate Simple Harmonic Motions, their individual angular speeds, amplitudes, etc can be controlled on the fly.
Then on a line joining those two, there's a point which divides the line segment joining those anchors in some ratio, say m1: m2.
In GUI controls, m1 and m2 would've been confusing for someone who didn't read description, so I named those control labels as *proximities* from anchors. Playing with this could result in many pretty cool results. 

### 6. Fractal Tree #1 (Functional)
A simple fractal tree made with recursive function logic, with some controls added to it to make it interesting. 

### 7. 2D Orbital Motion #1
Implementation of 2D orbital motion of 10 things, moving with different speeds on circles with different radii, with controls.

### 8. Graph Paper
Graph Paper made in Canvas, with controls to zoom in or rotate. Some use case maybe while simulating something like a CRO machine.

### 9. Rotating Squares creating 3D illusion
It's exactly the same as the title..with controls. 

### 10. Particles: Cloud-ish Effect
User clicks, holds and drag mouse to expand the particles below the mouse, creating a cool cloudy effect.

### 11. A 3D Rotating Cube with ThreeJS
Title says everything..except, it also has one or two control parameters that can be changed with GUI. 

### 12. Fractal Implementation #2 : Squares
One of many possible fractal tree implementations..this one with square. I can't even provide a unique name to every fractal tree. Maybe there's some naming convention that I'm not aware of, *shrugs* ..

### 13. Analog Clock Implementation #1
It's a super simple analog clock implementation, inspired from one of Daniel Shiffman's works. I'll make a robust super nice clock sometime later in future.

### 14. Sound Visualizer Implementation #1
It's not a robust sound visualizer, it lacks many basic features, like user cannot upload their favorite song and stuff.. But it's still good to make as a brain exercise, plus, it's good for the eyes. By default there's Harry Potter's Hedwig theme playing in the background. The rings near center of the screen represent lower frequency bands.
Amplitude at various frequency bands determines the color of rings. Brighter the colour means greater the amplitude of sound at that frequency.

### 16. Animation inspired from crop circle pattern
An animated geometrical pattern inspired from wikipedia entry of a crop circle in Javascript.

### 17. Gaussian Distribution of Points
Gaussian Distribution is interesting to simulate because it's how random distribution in nature looks like, sort of.
Instructions for easy play :
1. Origin : Center of the screen.
2. A thousand points appear simultaneously, coordinates of which belonging to some Gaussian distribution.
3. If you change Mean of abscissas/ordinates : you shift the abscissa/ordinate of center of cloud of those points to new mean position.
4. If you change standard deviation, you change the extent of spread from mean, for both abscissas and ordinates.
5. Plus, (r, g, b) colour values of those points also follow Gaussian distribution. Try changing mean from -5 to +5.
Advice : Use refresh button to re-render only the new points (after you change parameters, if you want that.)

### 18. Data Viz #1 : Pi upto 500 decimal places
Most things in this animation are in some way related to digits of Pi.
Starting from left, there are bars whose height and color represent a value from 0 to 9. (9 being brightest and tallest, 0 being darkest and shortest)
Digits (that those bars represent) are oscillating with speeds and equilibrium positions depending on the digit itself. So, a 9 will oscillate faster, with mean position much away from center of the bars than a 0 will. 0 doesn't even oscillate.
For readability purposes, I've taken alternate digits of Pi and made them oscillate in upper and lower halves of window. Meaning : (Pi : 3 1 4 1 ..)
3 oscillates right below the first bar, then 1 oscillates right above the second bar, then 4 right below its own bar, etc.

### 19. Spiral Pattern Implementation #1
This is an illusion created by a rotating spiral. In polar coordinates, for sufficient number of points & low spacing, it'll resemble :
r = θ, θ >= 0
If you're on PC, do check out the "spacing animation", it's an OK feature to pass the time. My screen recorder couldn't capture it, so I couldn't include it here in video demo. It'll run on browsers anyways.
Recommended Browser : Chrome Desktop

### 20. Slightly Useful Typewriter
What is it : User types something, the letter he/she presses appears on the screen with some sound effects.
Story behind this :
Sometimes when I'm bored or thinking, I find myself just randomly clicking or pressing keys on my keyboard. But laptop keyboards don't have that nice 'tap' sound like Desktop keyboards, so I made this thing which has few inbuilt typing sound effects (and it's okayish to look at, maybe I'll improve this later).
I can see two advantages :
1. I can just do my typing random keys + thinking thing in the library while wearing earphones.
2. After some modifications, I'll turn it into something super aesthetic, which will again be a fun experiment for the future me.

### 21. Fractal Implementation #3 : Circles
Third implementation of a fractal. Just a bunch of circles over circles.

### 22. Dussehra 2017 - 2D Fireworks
Particles start from the bottom, reach their max height of trajectory and then explode, creating 100 other smaller particles each with their own trajectories. Everything in Javascript, so it'll run in the browser. Based on Dan Shiffman's Coding Challenge.

### 23. Spooky Eyes
Logic is very similar to that of Exp. 15 (Vector Field) except this time it's the eyes that point towards the mouse instead of arrows. It can be used somewhere in future u.u
(By logic I mean just a little bit of trigonometry)

### 24. 3D Oscillations #1 - Cubes
Lots of cubes each executing SHM in two dimensions.


