// Query selectors for time options
const pomodoroButton = document.querySelector("#pomodoro");
const shortButton = document.querySelector("#short");
const longButton = document.querySelector("#long");
const customButton = document.querySelector(".custom");
const stopButton = document.querySelector("#stop");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const title = document.querySelector("title");

// Query selector for clock
const timer = document.querySelector(".timer");
console.log(stopButton);

// Binding to set setInterval in
let countDown;

// Begin pomodoro when pomodoro button is clicked
pomodoroButton.addEventListener("click", (event) => {
  // Display 25 minutes
  timer.firstElementChild.textContent = "25:00";

  // Clear any existing timers
  clearInterval(countDown);

  // Begin counting down
  countDown = setInterval(decrementTime, 1000);

  // Disable the pomodoro button and start button. Enable all other buttons
  pomodoroButton.disabled = true;
  startButton.disabled = true;
  shortButton.disabled = false;
  longButton.disabled = false;
});

// Begin / resume pomodoro when start button is clicked
startButton.addEventListener("click", () => {
  // Start counting down
  countDown = setInterval(decrementTime, 1000);

  // Disable the start button on click
  startButton.disabled = true;
});

// Stop the pomodoro timer
stopButton.addEventListener("click", () => {
  // Call the stopTime function
  stopTime();
  // Allow user to click start button to resume
  startButton.disabled = false;
});

// Reset the pomodoro
resetButton.addEventListener("click", () => {
  // These address cases where the start button is clicked immediately w/o first clicking a time option
  if (
    (startButton.disabled == true) &
    (pomodoroButton.disabled == false) &
    (shortButton.disabled == false)
  ) {
    stopTime();
    startButton.disabled = false;
    timer.firstElementChild.textContent = "25:00";
    clearInterval(countDown);
  } else if (
    (startButton.disabled == false) &
    (pomodoroButton.disabled == false) &
    (shortButton.disabled == false)
  ) {
    timer.firstElementChild.textContent = "25:00";
    clearInterval(countDown);
  }

  // If pomodoro is currently selected, reset timer to 25 min
  else if (pomodoroButton.disabled == true) {
    stopTime();
    startButton.disabled = false;
    timer.firstElementChild.textContent = "25:00";
    clearInterval(countDown);
  }

  // If short break button is selected, reset timer to 5 minutes
  else if (shortButton.disabled == true) {
    stopTime();
    startButton.disabled = false;
    timer.firstElementChild.textContent = "05:00";
    clearInterval(countDown);
  }

  // If longbreak button is selected, reset timer to 10 minutes
  if (longButton.disabled == true) {
    stopTime();
    startButton.disabled = false;
    timer.firstElementChild.textContent = "10:00";
  }

  title.textContent = "Pomodoro Timer";
});

// Function which decrements the time
function decrementTime() {
  // Get the minutes, seconds, and total time from HTML content
  let currentMinutes = parseInt(
    timer.firstElementChild.textContent.slice(0, 3)
  );
  let extraSeconds = parseInt(timer.firstElementChild.textContent.slice(3));
  let timeInSeconds = currentMinutes * 60 + extraSeconds;

  // Decrement totaltime by 1 second
  timeInSeconds -= 1;

  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;

  // Formatting the zeros when the timer hits a 10 either in seconds or minutes
  seconds < 10
    ? (timer.firstElementChild.textContent = `${minutes}:0${seconds}`)
    : (timer.firstElementChild.textContent = `${minutes}:${seconds}`);

  if (minutes < 10) {
    timer.firstElementChild.textContent = `0${minutes}:${seconds}`;
  }

  if ((minutes < 10) & (seconds < 10)) {
    timer.firstElementChild.textContent = `0${minutes}:0${seconds}`;
  }

  // When time's up, play a sound
  if (timeInSeconds == 0) {
    stopTime();
    let audio = new Audio("Popular Alarm Clock Sound Effect.mp3");
    audio.play();
  }
  // Show the timer counting down on tab.
  title.textContent = timer.firstElementChild.textContent;
}

// function which stops the timer;
function stopTime() {
  // Clear the timer
  clearInterval(countDown);
}

// When short break button is clicked, only have the button and start button selected. Set the timer to 10 minutes, and begin counting down
shortButton.addEventListener("click", () => {
  shortButton.disabled = true;
  startButton.disabled = true;
  pomodoroButton.disabled = false;
  longButton.disabled = false;

  timer.firstElementChild.textContent = "05:00";

  clearInterval(countDown);
  countDown = setInterval(decrementTime, 1000);
});

// Similarly for Long break
longButton.addEventListener("click", () => {
  longButton.disabled = true;
  startButton.disabled = true;
  pomodoroButton.disabled = false;
  shortButton.disabled = false;

  timer.firstElementChild.textContent = "10:00";

  clearInterval(countDown);
  countDown = setInterval(decrementTime, 1000);
});
