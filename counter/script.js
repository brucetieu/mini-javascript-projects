let number = document.getElementById("num");
var count = 0;

// Increase the counter.
function increase() {
  count += 1;
  number.textContent = count;
  if (count > 0) number.style.color = "green";
}

// Decrease the counter.
function decrease() {
  count -= 1;
  number.textContent = count;
  if (count < 0) number.style.color = "red";
}

// Reset the counter.
function reset() {
  count = 0;
  number.textContent = count;
  number.style.color = "black";
}
