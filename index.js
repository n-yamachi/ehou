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

let textbox_element = document.getElementById('ehou');

let new_element = document.createElement('h1');
new_element.textContent = '今年の恵方は' + judgeEhou();

textbox_element.appendChild(new_element);