// 今年の恵方を返す
function judgeEhou(date = new Date) {
  const year = date.getFullYear();

  // 西暦の下一桁
  const lastDigit = year % 10;

  if (lastDigit == 2 || lastDigit == 7) {
    return "北北西"
  }
  else if (lastDigit == 4 || lastDigit == 9) {
    return "東北東"
  }
  else if (lastDigit == 0 || lastDigit == 5) {
    return "西南西"
  }
  else {
    return "南南東"
  }
}

// 方向を取得
function obtainDeviceDirection() {
  document.querySelector("#permit").addEventListener("click", permitDeviceOrientationForSafari);

  window.addEventListener(
      "deviceorientation",
      orientation,
      true
  );

  window.addEventListener('deviceorientation', function(event) {
    console.log('方角       : ' + event.alpha);
    console.log('上下の傾き : ' + event.beta);
    console.log('左右の傾き : ' + event.gamma);
    
    console.log('コンパスの向き : ' + event.webkitCompassHeading);
    console.log('コンパスの精度 : ' + event.webkitCompassAccuracy);

    let msg = '方角' + event.alpha;
    let textbox_element = document.getElementById('direction');

    let new_element = document.createElement('h2');
    new_element.textContent = msg;

    textbox_element.appendChild(new_element);
  });
}

let textbox_element = document.getElementById('ehou');

let new_element = document.createElement('h1');
new_element.textContent = '今年の恵方は' + judgeEhou();

textbox_element.appendChild(new_element);

obtainDeviceDirection();