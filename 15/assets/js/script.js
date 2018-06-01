(function() {
  // Initializing Canvas
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Data for this experiment
  let data = {
    background: "#FFFFFF",
    arrow: {
      spacing: 48,
      size: 8,
      rows: Math.floor(window.innerHeight / 48),
      cols: Math.floor(window.innerWidth / 48),
      counter_speed: 0.01,
      pointy: true,
      stroke_style: "#000000"
    }
  };

  // To create ControlKit GUI
  var controlKit;
  var createControlKit = () => {
    controlKit = new ControlKit();

    controlKit
      .addPanel({
        fixed: false,
        label: "Controls"
      })
      .addColor(data, "background", {
        label: "Background"
      })
      .addSubGroup({
        label: "Vector Field Controls"
      })
      .addColor(data.arrow, "stroke_style", {
        label: "Color"
      })
      .addNumberInput(data.arrow, "size", {
        label: "Size"
      })
      .addNumberInput(data.arrow, "spacing", {
        label: "Spacing"
      })
      .addNumberInput(data.arrow, "rows", {
        label: "Rows",
        onChange: function() {
          init();
        }
      })
      .addNumberInput(data.arrow, "cols", {
        label: "Columns",
        onChange: function() {
          init();
        }
      })
      .addCheckbox(data.arrow, "pointy", {
        label: "Pointy Vectors?"
      });
  };
  createControlKit();

  /**
   * Class : Arrow
   * Fields : 
   *   x : abscissa of center of arrow vector
   *   y : ordinate of center of arrow vector
   *   i : ith factor, required to position it horizontally as some multiple of spacing
   *   j : jth factor, required to position it vertically as some multiple of spacing
   *   dx : difference between abscissas of mouse and center of self
   *   dy : difference between ordinates of mouse and center of self
   *   angle : angle to rotate arrow -> will depend on atan2 of dy and dx  
   *   -------------------------------------------------------------------
   *   How to use this class : 
   *     Put objects of this in an array once, like its done in this sketch..
   *     ..and then call method 'show' on them in an animation loop.    
   */
  class Arrow {
    constructor(i, j, spacing) {
      this.x = data.arrow.spacing * i;
      this.y = data.arrow.spacing * j;
      this.i = i;
      this.j = j;
      this.spacing = spacing;
      this.dx;
      this.dy;
      this.angle = 0;
    }

    show() {
      this.spacing = data.arrow.spacing;
      this.x = data.arrow.spacing * this.i;
      this.y = data.arrow.spacing * this.j;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.beginPath();
      ctx.moveTo(data.arrow.size, 0);
      ctx.lineTo(-data.arrow.size, 0);
      ctx.moveTo(data.arrow.size, 0);
      if (data.arrow.pointy) {
        ctx.lineTo(data.arrow.size / 2, -data.arrow.size / 2);
        ctx.moveTo(data.arrow.size, 0);
        ctx.lineTo(data.arrow.size / 2, data.arrow.size / 2);
      }
      ctx.strokeStyle = data.arrow.stroke_style;
      ctx.stroke();
      ctx.restore();
    }

    mouseUpdate(e) {
      this.dx = e.clientX - this.x;
      this.dy = e.clientY - this.y;
      this.angle = Math.atan2(this.dy, this.dx);
    }
  }

  // Array which will store our Arrow objects
  let arrows = [];

  // Every time this function will be called when columns or rows are updated..to reinitialize the array
  function init() {
    arrows = [];
    for (var i = 1, upperLimiti = data.arrow.cols; i < upperLimiti; i += 1) {
      for (var j = 1, upperLimitj = data.arrow.rows; j < upperLimitj; j += 1) {
        arrows.push(new Arrow(i, j, data.arrow.spacing));
      }
    }
  }
  // Calling init
  init();

  // Animation loop
  function render() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = data.background;
    ctx.fillRect(0, 0, width, height);
    for (var i = 0, upperLimit = arrows.length; i < upperLimit; i += 1) {
      arrows[i].show();
    }
    requestAnimationFrame(render);
  }

  // Calling our animation loop
  render();

  // Objects inside arrows array will rotate according to mouse..
  document.body.addEventListener(
    "mousemove",
    function(e) {
      for (var i = 0, upperLimit = arrows.length; i < upperLimit; i += 1) {
        arrows[i].mouseUpdate(e);
      }
    },
    true
  );
})();
