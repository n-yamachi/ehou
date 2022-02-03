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

// 初期化
function init() {
  // 簡易的なOS判定
  os = detectOSSimply();
  if (os == "iphone") {
      // safari用。DeviceOrientation APIの使用をユーザに許可して貰う
      document.querySelector("#permit").addEventListener("click", permitDeviceOrientationForSafari);

      window.addEventListener(
          "deviceorientation",
          orientation,
          true
      );
  } else if (os == "android") {
      window.addEventListener(
          "deviceorientationabsolute",
          orientation,
          true
      );
  } else {
      window.alert("PC未対応サンプル");
  }
}

// 簡易OS判定
function detectOSSimply() {
  let ret;
  if (
      navigator.userAgent.indexOf("iPhone") > 0 ||
      navigator.userAgent.indexOf("iPad") > 0 ||
      navigator.userAgent.indexOf("iPod") > 0
  ) {
      // iPad OS13以上のsafariはデフォルト「Macintosh」なので別途要対応
      ret = "iphone";
  } else if (navigator.userAgent.indexOf("Android") > 0) {
      ret = "android";
  } else {
      ret = "pc";
  }

  return ret;
}

// 方向を取得
function obtainDeviceDirection() {

  os = detectOSSimply();
  if (os == "iphone") {
      // safari用。DeviceOrientation APIの使用をユーザに許可して貰う
      document.querySelector("#permit").addEventListener("click", permitDeviceOrientationForSafari);

      window.addEventListener(
          "deviceorientation",
          orientation,
          true
      );
  }

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


function orientation(event) {
  let absolute = event.absolute;
  let alpha = event.alpha;
  let beta = event.beta;
  let gamma = event.gamma;

  let degrees;
  if(os == "iphone") {
      // webkitCompasssHeading値を採用
      degrees = event.webkitCompassHeading;

  }else{
      // deviceorientationabsoluteイベントのalphaを補正
      degrees = compassHeading(alpha, beta, gamma);
  }

  let direction;
  if (
      (degrees > 337.5 && degrees < 360) ||
      (degrees > 0 && degrees < 22.5)
  ) {
      direction = "北";
  } else if (degrees > 22.5 && degrees < 67.5) {
      direction = "北東";
  } else if (degrees > 67.5 && degrees < 112.5) {
      direction = "東";
  } else if (degrees > 112.5 && degrees < 157.5) {
      direction = "東南";
  } else if (degrees > 157.5 && degrees < 202.5) {
      direction = "南";
  } else if (degrees > 202.5 && degrees < 247.5) {
      direction = "南西";
  } else if (degrees > 247.5 && degrees < 292.5) {
      direction = "西";
  } else if (degrees > 292.5 && degrees < 337.5) {
      direction = "北西";
  }

  document.querySelector("#direction").innerHTML =
      direction + " : " + degrees;
  document.querySelector("#absolute").innerHTML = absolute;
  document.querySelector("#alpha").innerHTML = alpha;
  document.querySelector("#beta").innerHTML = beta;
  document.querySelector("#gamma").innerHTML = gamma;
}

// 端末の傾き補正（Android用）
// https://www.w3.org/TR/orientation-event/
function compassHeading(alpha, beta, gamma) {
  var degtorad = Math.PI / 180; // Degree-to-Radian conversion

  var _x = beta ? beta * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos(_x);
  var cY = Math.cos(_y);
  var cZ = Math.cos(_z);
  var sX = Math.sin(_x);
  var sY = Math.sin(_y);
  var sZ = Math.sin(_z);

  // Calculate Vx and Vy components
  var Vx = -cZ * sY - sZ * sX * cY;
  var Vy = -sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan(Vx / Vy);

  // Convert compass heading to use whole unit circle
  if (Vy < 0) {
      compassHeading += Math.PI;
  } else if (Vx < 0) {
      compassHeading += 2 * Math.PI;
  }

  return compassHeading * (180 / Math.PI); // Compass Heading (in degrees)
}

// safariの権限設定
function permitDeviceOrientationForSafari() {
  DeviceOrientationEvent.requestPermission()
      .then(response => {
          if (response === "granted") {
              window.addEventListener(
                  "deviceorientation",
                  detectDirection
              );
          }
      })
      .catch(console.error);
}

init();

let textbox_element = document.getElementById('ehou');

let new_element = document.createElement('h1');
new_element.textContent = '今年の恵方は' + judgeEhou();

textbox_element.appendChild(new_element);

obtainDeviceDirection();