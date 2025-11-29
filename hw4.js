(function() {
  let s4 = function(p) {
    let width = 20;
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
    
    // 색상 변화를 위한 변수들
    let baseColor1, baseColor2;
    let currentColor1, currentColor2;
    
    p.setup = function() {
      let canvas = p.createCanvas(600, 400);
      canvas.parent('hw4-container');
      
      // 색상 모드 설정 (HSB 모드로 색상 변화를 더 부드럽게)
      p.colorMode(p.RGB, 255);
      
      // 기본 색상 설정
      baseColor1 = p.color("#E6C795"); // 바둑판 배경색
      baseColor2 = p.color("#D4A574"); // 변화할 색상
      
      currentColor1 = baseColor1;
      currentColor2 = baseColor2;
    };

    p.draw = function() {
      // 배경을 매 프레임마다 그리기 (애니메이션 효과)
      p.background(255);
      
      // 시간 기반 애니메이션 변수들
      let time = p.millis() * 0.001; // 초 단위로 변환
      let frame = p.frameCount;
      
      // 색상 변화 (lerpColor 사용)
      let colorProgress = (p.sin(time * 0.5) + 1) / 2; // 0~1 사이 값
      currentColor1 = p.lerpColor(baseColor1, baseColor2, colorProgress);
      
      // 바둑판 테두리
      p.stroke(0);
      p.noFill();
      p.rect(10, 5, 580, 390);
      
      // 바둑판 그리드 (색상 변화 적용)
      p.stroke(0);
      for (let i = 1; i <= 18; i++) {
        for (let j = 1; j <= 18; j++) {
          // 각 칸마다 약간의 색상 변화
          let cellColorProgress = (p.sin(time * 0.3 + i * 0.1 + j * 0.1) + 1) / 2;
          let cellColor = p.lerpColor(currentColor1, baseColor2, cellColorProgress * 0.3);
          p.fill(cellColor);
          p.rect((i-1)*width+120, (j-1)*width+20, width, width);
        }
      }
      
      // 중앙 동심원 애니메이션 (크기 변화 + 회전 효과)
      let centerX = 120 + width * 10;
      let centerY = width + width * 8;
      
      // 회전 효과를 위한 오프셋
      let rotation = time * 0.3;
      let offsetX = p.cos(rotation) * 3;
      let offsetY = p.sin(rotation) * 3;
      
      // 크기 변화 (펄스 효과)
      let pulse1 = 1 + p.sin(time * 2) * 0.15; // ±15% 크기 변화
      let pulse2 = 1 + p.sin(time * 2 + p.PI/3) * 0.12;
      let pulse3 = 1 + p.sin(time * 2 + p.PI*2/3) * 0.1;
      
      // 동심원 그리기 (크기와 위치 변화)
      p.noStroke();
      p.fill(200, 180, 150, 150);
      p.ellipse(centerX + offsetX, centerY + offsetY, (width+15)*pulse1, (width+15)*pulse1);
      
      p.fill(220, 200, 170, 180);
      p.ellipse(centerX + offsetX * 0.7, centerY + offsetY * 0.7, (width+10)*pulse2, (width+10)*pulse2);
      
      p.fill(240, 220, 190, 200);
      p.ellipse(centerX + offsetX * 0.5, centerY + offsetY * 0.5, (width+5)*pulse3, (width+5)*pulse3);
      
      // 바둑돌 그리기 (움직임 + 크기 변화)
      for (let j = 0; j < 19; j++) {
        for (let i = 0; i < 19; i++) {
          if (arr[i][j] == 0) continue;
          
          // 각 돌마다 다른 애니메이션 속도와 방향
          let stoneTime = time + (i + j) * 0.1;
          let moveX = p.cos(stoneTime * 0.8) * 1.5; // 좌우 움직임
          let moveY = p.sin(stoneTime * 0.6) * 1.5; // 상하 움직임
          
          // 크기 변화 (펄스 효과)
          let stonePulse = 1 + p.sin(stoneTime * 3) * 0.1;
          let stoneSize = (width - 1) * stonePulse;
          
          let x = 120 + width * j + moveX;
          let y = width + width * i + moveY;
          
          if (arr[i][j] == 1) {
            // 검은 돌 (색상 변화 추가)
            let blackProgress = (p.sin(stoneTime * 2) + 1) / 2;
            let blackColor = p.lerpColor(p.color(0), p.color(30, 30, 30), blackProgress * 0.3);
            p.stroke(255);
            p.strokeWeight(1);
            p.fill(blackColor);
            p.ellipse(x, y, stoneSize, stoneSize);
          } else {
            // 흰 돌 (색상 변화 추가)
            let whiteProgress = (p.sin(stoneTime * 2 + p.PI) + 1) / 2;
            let whiteColor = p.lerpColor(p.color(255), p.color(240, 240, 240), whiteProgress * 0.2);
            p.stroke(0);
            p.strokeWeight(1);
            p.fill(whiteColor);
            p.ellipse(x, y, stoneSize, stoneSize);
          }
        }
      }
      
      // GIF 저장 (10초 후 자동 저장)
      // 주석 해제하여 사용: if (time >= 10) p.saveGif("hw4_animation.gif", 10);
    };
    
    function bd(p, x, y, width) {
      p.stroke(255);
      p.fill(0);
      p.ellipse(120+width*x, width+width*y, width-1, width-1);
    }
    
    function wd(p, x, y, width) {
      p.stroke(0);
      p.fill(255);
      p.ellipse(120+width*x, width+width*y, width-1, width-1);
    }
  };
  
  new p5(s4);
})();

