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

### 24. 2D Mouse Torch
I don't know, can be used somewhere for decoration I guess. Or maybe, if I start writing an online book some day, I'll include an alternative night mode like this one where user can just lumos to look at the text. Same idea, but the book thing will require a far better and readable design than this.. well I'll leave that problem for future me, enough tasks at hand already.

### 25. 3D Oscillations #1 - Cubes
Lots of cubes each executing SHM in two dimensions.

### 26. Packing : Circles 
Random circles are generated with zero radius, they grow until they touch any other circle or borders of the screen. Super simple math. It's just an animation without controls.

### 27. Illusion with Circles #2 
Rings of circles with oscillating radii creating an illusion of ripples.

### 28. 10 PRINT Pattern Implementation #1
Developers in the past used to make this kind of pattern on BASIC and stuff using random numbers and forward & backward slashes. This one is a canvas implementation of a classic trick, without text, only lines.
Referring to this one : [10 Print](https://www.youtube.com/watch?v=m9joBLOZVEo)

### 29. Fractal Implementation #4 : Arcs
Reasons for making this :
1. I like fractals these days.
2. Last fractal that I made was with circles (blurry memory), and a circle is made up of arcs, so if I make a fractal with arcs and then vary parameters, I should get even more generalised fractal simulator than last one.
Opinion :
This one is cool, maybe because it encompasses many fractal patterns because of so many controllable parameters. I couldn't include much in this video, of course. But this line of thinking still has a lot of potential, which I'll think about in future.

### 30. Deception with Colours #1
An animation showing a classic example of some colour trickery ; how colour of environment of the body can trick our eyes into assuming colour of the body itself.
In other words :
When those circular bodies are in white half of the page, they look a little darker than they are, when they're in black half, they look a little brighter than they are, while reality being : both of them have a constant colour of grey at all times as demonstrated by colour picker.
Those values that colour picker shows us represent colour in hexadecimal form :
767676 represents grey. 
000000 represents black. 
FFFFFF represents white.

### 31. Yin Yang
It's a simple animation made in JS in around 20 minutes or something. Future plans for it :
1. To use it in fractals or to make a fractal out of it.
2. Add some physics or oscillations to it.
3. Split it into halves and give each half some sort of fish like motion.

### 32.  2 dimensional iterative animation #1 : Maze
"Exp. 28 : 10 PRINT" was one dimensional iterative animation, where a forward or backward slash would appear at each frame and position itself according to some expression that I decided.
This one shares the same idea just extended to 2 dimensions. Uses random numbers from a uniform random generator and then creates a maze like structure.

### 33. Sound Visualizer #2 : Bars
Note : 
If you want to pause the song : click.
To resume : click again.
What I learned after making this :
1. HSB color mode gives more interesting outputs compared to RGB or HSL when one wants gradual change in color.
2. I need a better workflow and more songs.
What do I need to add :
1. Ways for user to drag and drop their own songs. 
2. Ways for them to control speed of song, and other parameters.
Background music credits :
Title : One step at a time.
From : TVF Pitchers.
Music and Lyrics : Vaibhav Bundhoo.

### 34. Pixel Data Manipulation #1 : Dance!
This experiment is currently my favourite, because my approach while making this was very different than usual, and it looks cool. It's all in JS and loops forever.

### 35. Cube Layers 
On click, all layers begins to rotate along a common axis with different speeds.
In future, maybe I should do a similar one with spheres, maybe show layers of atmosphere or lithosphere by choosing some right colours or textures.

### 36. Fractal Implementation #5 : Cubes
How is this a fractal :
There's the biggest (root) cube in the center of cluster, at each of its vertices (spacing factor = 1) there's a cube with a little less size, and then they have their own children on their own vertices, and so on. Those wires connect root with its children for each generation.
3D usually is a little bit tedious to work with. I'm not happy with the controls in this one. I'll add proper controls to this same thing in free time some time later instead of brainstorming again for a new cube based fractal.

### 37. 2D Shape Customizer 
This tool creates a custom shapes, it's some kind of super primitive polygon making machine, with an unnecessary option to animate it as well.
What good it may do to this world :
1. People who want to play with various parameters of a shape, especially front end developers will benefit from it. I mean, who wouldn't play with 2D shapes right?
2. It has several modes and will produce several shapes. It's not well thought out since I made it in last 2 hours. But I'm sure somebody will get inspired and create a superb thing out of this same idea some day.
3. One can synchronize their breathing with this thing to *relax*.
If I spend a few more days making this same thing, I can turn it into something super useful. But I cannot. Time's up. Will get back to this after I finish at least a 100 experiments.

### 38. Fractal Implementation #6 : Suits Animation
Possibilities are endless with static fractals already, and even more if I start adding motion/animation to various parameters .-. Even then it's a little tough to think of a new pattern and motion after making one.
This fractal implementation doesn't have any visible controls. Pressing Up and Down arrow keys will change level of fractal, Right and Left arrow keys will change spacing between generations.

### 39. Algorithmic Botany : Tree v1
Inspired from this cool book : "Algorithmic Beauty of Plants" by Lindenmayer and Prusinkiewicz and works of Daniel Shiffman.
It talks about the rules and axioms involved in growth of plants. If you're crazy about converting math of greenery around you in code, definitely read this book.
Another cool book : Algorithmic Beauty of Seashells.
Note to self :
This has flaws, it's not complete. No controls for n and delta as given in the book. Better to implement these kind of things in C++ for performance.

### 40. Sound Propagation : Compression & Rarefaction Animation
This experiment is soundless. It's just some kind of animated visualization of compression and rarefaction, static versions of which teachers show to kids when explaining sound. Book's static versions are kind of boring so I thought I should make this as well.

### 41. Happy Diwali!
ॐ based fractal with size according to amplitude analysis, and background according to frequency analysis of the background track.
Background track : Aigiri Nandini (takes a while to load)

### 42. Mirrored Drawing Pad
Controls : 
Press any key to clear. 
Click and drag to draw.

### 43. The Matrix Terminal
Matrix terminal animation in JS, with Devanagari letters instead of Katakana. Inspired by Emily Xie's matrix animation in p5.js.
I've been working on some network security and stuff these days in Nettech workshop, better use this terminal from now on.

### 44. Illusion with Circles #3 
This was going to be a pretty normal experiment ; I didn't expect such interesting behaviour from a thought so simple.
I was going to create a bunch of circles with initially a common center and maybe alternate black and white colour and give them motion to see what happens. That is exactly what's going on here.
But this concept can generate a lot of patterns that I can't really show in just one sketch. I can change motion a little bit and create something else entirely. The results of this idea are super sensitive to any change in the equation.

### 45. Illusion with Squares #2 
A variation of Exp. 44 : this time with squares. This one also has a colour mode. On click, things get coloured appropriately.

### 46. Illusion with Circles #4
Weird. If my memory resets sometime in future, I won't be able to guess how I made this one.


