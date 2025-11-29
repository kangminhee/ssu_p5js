(function() {
  let s2 = function(p) {
    let hairColor = "#000000";
    let hairClicked = false;

    p.setup = function() {
      let canvas = p.createCanvas(600, 400);
      canvas.parent('hw2-container');
    };

    p.draw = function() {
      p.background("#FFF");
      for (let j = 15; j < 400; j+=90)
      for (let i = 15; i < 600; i+=60) star(p, i, j, 15);
      for (let j = 60; j < 400; j+=90)
      for (let i = 45; i < 600; i+=60) star(p, i, j, 15);
      
      // 베이스 기타
      bass(p, 60, 200, 2);
      // 나
      me(p, hairColor);
    };

    function bass(p, x, y, s = 1) {
      p.strokeWeight(1);
      p.push();
      p.translate(x, y);
      p.scale(s);

      // 바디
      p.fill("#2E86AB");
      p.stroke(0);
      p.ellipse(0, 30, 40, 60);

      // 넥
      p.fill("#8D6E63");
      p.rectMode(p.CENTER);
      p.rect(0, -20, 10, 60);

      // 헤드
      p.fill("#5D4037");
      p.rect(0, -65, 20, 30);

      // 줄
      p.stroke(255);
      p.strokeWeight(1.5);
      for (let i = -3; i <= 3; i += 2) {
        p.line(i, -50, i, 40);
      }

      p.pop();
    }

    function star(p, cx, cy, size) {
      size = Math.min(size, 20);

      let outerR = size / 2;
      let innerR = outerR * 0.45;

      p.fill("#FFFFDE");
      p.stroke("#F0F8F6");
      p.push();
      p.translate(cx, cy);
      p.strokeWeight(1);
      p.beginShape();
      for (let i = 0; i < 5; i++) {
        let a = p.TWO_PI * (i / 5) - p.HALF_PI;
        p.vertex(p.cos(a) * outerR, p.sin(a) * outerR);
        let a2 = a + p.TWO_PI / 10;
        p.vertex(p.cos(a2) * innerR, p.sin(a2) * innerR);
      }
      p.endShape(p.CLOSE);
      p.pop();
    }

    function me(p, hairColor) {
      // hair(back)
      p.fill("#000000");
      p.ellipse(300,200,320,370);
      p.quad(140,200,460,200,460,390,140,390);
      
      // neck
      p.fill("#F5C3B1");
      p.rect(250,300,100,110);
      
      // ear
      p.noStroke();
      p.ellipse(150,250,50,100);
      p.ellipse(450,250,50,100);
      
      // head
      p.fill("#FFE5D8"); 
      p.noStroke();
      p.ellipse(300,200,300,360);
      p.ellipse(300,290,300,170);
      
      // hair(front)
      p.fill("#000");
      p.arc(300, 170, 280, 300, p.PI, p.TWO_PI, p.CHORD);

      // nose
      p.fill("#F5C3B1");
      p.ellipse(300,280,18,10);
      
      // eye
      p.fill("#ffffff");
      p.strokeWeight(2);
      p.stroke("#000000");
      p.arc(225, 220, 80, 80, 0, p.PI + p.QUARTER_PI, p.CHORD);
      p.arc(375, 220, 80, 80, -p.QUARTER_PI, p.PI, p.CHORD);
      p.fill("#000000");
      p.ellipse(228,220,20,20);
      p.ellipse(372,220,20,20);
      
      // glasses
      p.noFill();
      p.stroke("#644900");
      p.strokeWeight(5);
      p.circle(210,220,160);
      p.circle(390,220,160);
      p.line(290,220,310,220);
      
      // mouth
      p.fill("#E04A4Aaa");
      p.noStroke();
      p.arc(300, 315, 150, 60, 0, p.PI, p.CHORD);
    }
  };
  
  new p5(s2);
})();

function bass(x, y, s = 1) {
  strokeWeight(1);
  push();
  translate(x, y);
  scale(s); // 크기 조절

  // 바디
  fill("#2E86AB");
  stroke(0);
  ellipse(0, 30, 40, 60);

  // 넥
  fill("#8D6E63");
  rectMode(CENTER);
  rect(0, -20, 10, 60);

  // 헤드
  fill("#5D4037");
  rect(0, -65, 20, 30);

  // 줄
  stroke(255);
  strokeWeight(1.5);
  for (let i = -3; i <= 3; i += 2) {
    line(i, -50, i, 40);
  }

  pop();
}

function star(cx, cy, size) {
  size = Math.min(size, 20);

  let outerR = size / 2;
  let innerR = outerR * 0.45;

  fill("#FFFFDE");
  stroke("#F0F8F6");
  push();
  translate(cx, cy);
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < 5; i++) {
    let a = TWO_PI * (i / 5) - HALF_PI;
    vertex(cos(a) * outerR, sin(a) * outerR);
    let a2 = a + TWO_PI / 10;
    vertex(cos(a2) * innerR, sin(a2) * innerR);
  }
  endShape(CLOSE);
  pop();
}

function me() {
  // hair(back)
  fill("#000000");
  ellipse(300,200,320,370);
  quad(140,200,460,200,460,390,140,390);
  
  // neck
  fill("#F5C3B1");
  rect(250,300,100,110);
  
  // ear
  noStroke();
  ellipse(150,250,50,100);
  ellipse(450,250,50,100);
  
  // head
  fill("#FFE5D8"); 
  noStroke();
  ellipse(300,200,300,360);
  ellipse(300,290,300,170);
  
  // hair(front)
  fill("#000");
  arc(300, 170, 280, 300, PI, TWO_PI, CHORD);
  // arc(300, 170, 250, 300, PI, TWO_PI, CHORD);
  // arc(300, 170, 250, 300, PI, TWO_PI, CHORD);
  // arc(300, 120, 250, 200, PI, TWO_PI, CHORD);

  // nose
  fill("#F5C3B1");
  ellipse(300,280,18,10);
  
  // eye
  fill("#ffffff");
  strokeWeight(2);
  stroke("#000000");
  arc(225, 220, 80, 80, 0, PI + QUARTER_PI, CHORD);
  arc(375, 220, 80, 80, -QUARTER_PI, PI, CHORD);
  fill("#000000");
  ellipse(228,220,20,20);
  ellipse(372,220,20,20);
  
  // glasses
  noFill();
  stroke("#644900");
  strokeWeight(5);
  circle(210,220,160);
  circle(390,220,160);
  line(290,220,310,220);
  
  // mouth
  fill("#E04A4Aaa");
  noStroke();
  arc(300, 315, 150, 60, 0, PI, CHORD);
  

}