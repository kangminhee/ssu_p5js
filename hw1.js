(function() {
  let s1 = function(p) {
    p.setup = function() {
      let canvas = p.createCanvas(600, 400);
      canvas.parent('hw1-container');
      p.background(255);
      
      let width = 20;
      
      p.stroke(0);
      p.noFill();
      p.rect(10,5,580,390);
      
      for (let i = 1; i <= 18; i++) {
        for (let j = 1; j <= 18; j++) {
          p.fill("#E6C795");
          p.rect((i-1)*width+120,(j-1)*width+20,width,width);
        }
      }
      
      p.ellipse(120+width*10,width+width*8,width+15,width+15); 
      p.ellipse(120+width*10,width+width*8,width+10,width+10);
      p.ellipse(120+width*10,width+width*8,width+5,width+5);
      
      let arr = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0,0,2,0,2,0,0,1,0,0,0,0,0],
        [0,0,0,1,2,1,0,1,0,2,1,2,2,1,0,0,0,0,0],
        [0,0,1,0,1,2,1,1,2,0,1,0,1,1,0,1,0,1,0],
        [0,0,0,0,2,2,2,1,2,0,0,0,1,2,1,0,0,0,1],
        [0,0,0,1,0,2,1,1,2,0,0,1,2,2,1,0,1,1,2],
        [0,2,2,1,2,2,1,1,0,2,0,0,1,2,0,1,2,2,2],
        [1,1,1,2,2,1,2,0,2,2,1,1,1,2,1,0,1,2,0],
        [2,0,2,0,2,1,2,0,2,1,2,1,2,1,2,2,2,0,0],
        [0,2,2,2,1,1,0,1,2,1,1,2,2,1,1,1,2,2,2],
        [2,1,1,1,0,1,1,2,2,0,1,0,2,2,2,1,1,1,1],
        [0,2,1,0,0,1,2,0,0,2,1,0,1,2,1,2,2,2,2],
        [0,0,0,0,0,0,2,0,1,0,1,0,0,0,2,0,0,0,0],
        [0,1,1,1,1,0,0,2,1,0,0,0,0,0,0,0,0,0,0],
        [0,0,2,0,2,2,2,1,0,0,0,0,0,0,1,2,0,0,0],
        [0,2,1,2,1,2,0,2,0,2,0,0,1,0,1,0,2,0,0],
        [0,0,2,0,0,2,0,0,1,0,0,0,0,1,2,2,0,0,0],
        [0,0,0,0,2,1,1,0,0,0,0,0,0,0,1,1,2,0,0],
        [0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,1,2,0]
      ];
      
      for (let j = 0; j < 19; j++) {
        for (let i = 0; i < 19; i++) {
          if (arr[i][j] == 0) continue;
          else if (arr[i][j] == 1) bd(p, j, i, width);
          else wd(p, j, i, width);
        }
      }
    };
    
    function bd(p, x, y, width) {
      p.stroke(255);
      p.fill(0);
      p.ellipse(120+width*x,width+width*y,width-1,width-1);
    }
    
    function wd(p, x, y, width) {
      p.stroke(0);
      p.fill(255);
      p.ellipse(120+width*x,width+width*y,width-1,width-1);
    }
  };
  
  new p5(s1);
})();