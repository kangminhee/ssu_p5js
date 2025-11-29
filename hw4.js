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
      
      // 색상 모드 설정 (HSB 모드로 무지개 색상 구현)
      p.colorMode(p.HSB, 360, 100, 100);
    };

    p.draw = function() {
      // 배경을 매 프레임마다 그리기 (애니메이션 효과)
      p.background(255);
      
      // 시간 기반 애니메이션 변수들
      let time = p.millis() * 0.001; // 초 단위로 변환
      let frame = p.frameCount;
      
      // 바둑판 테두리 (RGB 모드로 검은색)
      p.colorMode(p.RGB, 255);
      p.stroke(0);
      p.noFill();
      p.rect(10, 5, 580, 390);
      
      // 바둑판 그리드 (무지개 색상 적용)
      p.colorMode(p.HSB, 360, 100, 100);
      p.stroke(0, 0, 0); // 검은색 선 (HSB 모드에서)
      for (let i = 1; i <= 18; i++) {
        for (let j = 1; j <= 18; j++) {
          // 각 칸마다 시간과 위치에 따라 무지개 색상 변화
          // Hue: 0~360 (무지개 전체 범위)
          // 시간에 따라 색상이 순환하고, 위치에 따라 다른 색상 시작점
          let hue = (time * 30 + (i + j) * 10) % 360; // 시간과 위치에 따라 색상 변화
          let saturation = 70 + p.sin(time * 2 + i * 0.2 + j * 0.2) * 20; // 채도 변화 (50~90)
          let brightness = 80 + p.cos(time * 1.5 + i * 0.15 + j * 0.15) * 15; // 밝기 변화 (65~95)
          
          p.fill(hue, saturation, brightness);
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
      
      // 동심원 그리기 (크기와 위치 변화, 무지개 색상)
      p.colorMode(p.HSB, 360, 100, 100);
      p.noStroke();
      let centerHue = (time * 40) % 360;
      p.fill(centerHue, 80, 90);
      p.ellipse(centerX + offsetX, centerY + offsetY, (width+15)*pulse1, (width+15)*pulse1);
      
      p.fill((centerHue + 60) % 360, 75, 85);
      p.ellipse(centerX + offsetX * 0.7, centerY + offsetY * 0.7, (width+10)*pulse2, (width+10)*pulse2);
      
      p.fill((centerHue + 120) % 360, 70, 80);
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
            // 검은 돌 (RGB 모드로 검은색 유지)
            p.colorMode(p.RGB, 255);
            p.stroke(255);
            p.strokeWeight(1);
            p.fill(0);
            p.ellipse(x, y, stoneSize, stoneSize);
          } else {
            // 흰 돌 (RGB 모드로 흰색 유지)
            p.colorMode(p.RGB, 255);
            p.stroke(0);
            p.strokeWeight(1);
            p.fill(255);
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

