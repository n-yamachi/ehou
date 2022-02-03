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
    textbox_element.appendChild(new_element);
      // safari用。DeviceOrientation APIの使用をユーザに許可して貰う
      document.querySelector("#permit").addEventListener("click", permitDeviceOrientationForSafari);

      window.addEventListener(
          "deviceorientation",
          obtainDeviceDirection,
          true
      );
  } else if (os == "android") {
      window.addEventListener(
          "deviceorientationabsolute",
          obtainDeviceDirection,
          true
      );
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
  let absolute = event.absolute;
  let alpha = event.alpha;
  let beta = event.beta;
  let gamma = event.gamma;

  let degrees;
  if (os == "iphone") {
      // webkitCompasssHeading値を採用
      degrees = event.webkitCompassHeading;

  } else {
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