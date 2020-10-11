let button = document.querySelector("button");

// Generate random number from 0 to 255 (within rgb scale).
function generateRandomNumber() {
    return Math.floor(Math.random() * 255)
}

// Change the color of the background on click.
button.addEventListener("click", () => {
    let red = generateRandomNumber();
    let green = generateRandomNumber();
    let blue = generateRandomNumber();

    let body = document.querySelector("body");
    body.style.background = `rgb(${red}, ${green}, ${blue})`;
    
    let id = document.getElementById("div-text");
    id.textContent = `rgb(${red}, ${green}, ${blue})`;
    id.style.color = `rgb(${red}, ${green}, ${blue})`;
})

