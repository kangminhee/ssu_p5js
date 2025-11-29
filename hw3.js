(function() {
  let s3 = function(p) {
    let hairColor = "#000000"; // 초기 머리 색
    let isSmiling = true;      // 표정 상태
    let bassFollowing = false; // 베이스 따라가기 상태
    let bassSize = 2;          // 베이스 크기
    let bassX = 60;            // 초기 베이스 위치
    let bassY = 200;
    let starBlink = true;      // 별 깜빡임 상태
    let lastBlinkTime = 0;     // 마지막 깜빡임 시간 기록

    p.setup = function() {
      let canvas = p.createCanvas(600, 400);
      canvas.parent('hw3-container');
    }; 

    p.draw = function() {
      p.background("#FFF");

      // 1초마다 별 깜빡이기
      if (p.millis() - lastBlinkTime > 1000) {
        starBlink = !starBlink;
        lastBlinkTime = p.millis();
      }

      // 배경 별
      if (starBlink) p.fill("#FFFF00");
      else p.fill("#FFF");
      for (let j = 15; j < 400; j += 90)
        for (let i = 15; i < 600; i += 60) star(p, i, j, 15);
      for (let j = 60; j < 400; j += 90)
        for (let i = 45; i < 600; i += 60) star(p, i, j, 15);

      // 베이스 이동 처리
      if (bassFollowing) {
        bassX = bassX + (p.mouseX - bassX) * 0.2;
        bassY = bassY + (p.mouseY - bassY) * 0.2;
      }

      // 베이스와 인물 그리기
      me(p, hairColor, bassFollowing, bassX, bassY);
      bass(p, bassX, bassY, bassSize);
    };

    function me(p, hairColor, bassFollowing, bassX, bassY) {
      // 눈 기준 좌표
      let leftEyeX = 228;
      let leftEyeY = 220;
      let rightEyeX = 372;
      let rightEyeY = 220;

      // 기본적으로 정면을 보게 설정
      let leftMoveX = 0;
      let leftMoveY = 0;
      let rightMoveX = 0;
      let rightMoveY = 0;

      // 베이스를 클릭해서 따라가는 중이라면, 눈동자가 그쪽을 바라보게
      if (bassFollowing) {
        let leftDirX = bassX - leftEyeX;
        let leftDirY = bassY - leftEyeY;
        let rightDirX = bassX - rightEyeX;
        let rightDirY = bassY - rightEyeY;

        let leftDist = p.sqrt(leftDirX * leftDirX + leftDirY * leftDirY);
        let rightDist = p.sqrt(rightDirX * rightDirX + rightDirY * rightDirY);

        let eyeMove = 10; // 눈동자가 움직일 최대 거리

        if (leftDist > 0.001) {
          leftMoveX = (leftDirX / leftDist) * eyeMove;
          leftMoveY = (leftDirY / leftDist) * eyeMove;
        }
        if (rightDist > 0.001) {
          rightMoveX = (rightDirX / rightDist) * eyeMove;
          rightMoveY = (rightDirY / rightDist) * eyeMove;
        }
      }

      // --- 얼굴 그리기 ---
      p.fill(hairColor);
      p.ellipse(300, 200, 320, 370);
      p.quad(140, 200, 460, 200, 460, 390, 140, 390);

      p.fill("#F5C3B1");
      p.rect(250, 300, 100, 110);

      p.noStroke();
      p.ellipse(150, 250, 50, 100);
      p.ellipse(450, 250, 50, 100);

      p.fill("#FFE5D8");
      p.ellipse(300, 200, 300, 360);
      p.ellipse(300, 290, 300, 170);

      p.fill(hairColor);
      p.arc(300, 170, 280, 300, p.PI, p.TWO_PI, p.CHORD);

      p.fill("#F5C3B1");
      p.ellipse(300, 280, 18, 10);

      // 흰자
      p.fill("#ffffff");
      p.strokeWeight(2);
      p.stroke("#000000");
      p.arc(225, 220, 80, 80, 0, p.PI + p.QUARTER_PI, p.CHORD);
      p.arc(375, 220, 80, 80, -p.QUARTER_PI, p.PI, p.CHORD);

      // 눈동자
      p.fill("#000000");
      p.ellipse(leftEyeX + leftMoveX, leftEyeY + leftMoveY, 20, 20);
      p.ellipse(rightEyeX + rightMoveX, rightEyeY + rightMoveY, 20, 20);

      // 안경
      p.noFill();
      p.stroke("#644900");
      p.strokeWeight(5);
      p.circle(210, 220, 160);
      p.circle(390, 220, 160);
      p.line(290, 220, 310, 220);

      // 입
      p.fill("#E04A4Aaa");
      p.noStroke();
      if (isSmiling) {
        p.arc(300, 315, 150, 60, 0, p.PI, p.CHORD);
      } else {
        p.rect(225, 310, 150, 10, 5);
      }
    }

    // 베이스
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

    // 별
    function star(p, cx, cy, size) {
      let outerR = size / 2;
      let innerR = outerR * 0.45;
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

    // 마우스 클릭
    p.mousePressed = function() {
      // 머리 클릭 시 무작위 색으로 변경
      let dHair = p.dist(p.mouseX, p.mouseY, 300, 200);
      if (dHair < 160) {
        hairColor = p.color(p.random(50, 255), p.random(50, 255), p.random(50, 255));
      }

      // 베이스 클릭 시
      let dBass = p.dist(p.mouseX, p.mouseY, bassX, bassY);
      if (dBass < 60) {
        if (!bassFollowing) {
          bassFollowing = true;
          bassSize = 0.5; // 작아짐
        } else {
          bassFollowing = false;
          bassSize = 2; // 원래 크기
          bassX = 60;
          bassY = 200;
        }
      }
    };

    // 키보드 입력
    p.keyPressed = function() {
      // 표정 전환
      isSmiling = !isSmiling;
    };
  };
  
  new p5(s3);
})();
