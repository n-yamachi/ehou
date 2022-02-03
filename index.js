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