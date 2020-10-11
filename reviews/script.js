// Array of objects storing user info
const reviews = [
  {
    id: 1,
    photo: "https://api.adorable.io/avatars/100/@adorable.io.png",
    name: "Susan Smith",
    occupation: "Web developer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ab, hic, quisquam nostrum nihil aspernatur nemo distinctio voluptatem dolore itaque, sit impedit et cupiditate aliquid dicta esse maxime! Eveniet, debitis?",
  },
  {
    id: 2,
    photo: "https://api.adorable.io/avatars/100/happy@adorable.io.png",
    name: "John Smith",
    occupation: "Full Stack Developer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ab, hic, quisquam nostrum nihil aspernatur nemo distinctio voluptatem dolore itaque, sit impedit et cupiditate aliquid dicta esse maxime! Eveniet, debitis?",
  },
  {
    id: 3,
    photo: "https://api.adorable.io/avatars/100/hello@adorable.io.png",
    name: "Jane Doe",
    occupation: "Software Engineer",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ab, hic, quisquam nostrum nihil aspernatur nemo distinctio voluptatem dolore itaque, sit impedit et cupiditate aliquid dicta esse maxime! Eveniet, debitis?",
  },
  {
    id: 4,
    photo: "user.jpg",
    name: "Default",
    occupation: "Data Analyst",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ab, hic, quisquam nostrum nihil aspernatur nemo distinctio voluptatem dolore itaque, sit impedit et cupiditate aliquid dicta esse maxime! Eveniet, debitis?",
  },
];

// Query selectors.
let headshot = document.querySelector(".headshot");
let name = document.querySelector("#name");
let occupation = document.querySelector("#occupation");
let description = document.querySelector("#description");

let rightButton = document.querySelector(".fa-chevron-right");
let leftButton = document.querySelector(".fa-chevron-left");
let random = document.querySelector("#randomize");

let count = 0;

// Change photo when left button is clicked.
leftButton.addEventListener("click", () => {
  count--;
  if (count < 0) count = reviews.length - 1;
  console.log(count);
  headshot.src = reviews[count].photo;
  name.textContent = reviews[count].name;
  occupation.textContent = reviews[count].occupation;
  description.textContent = reviews[count].description;
});

// Change photo when right button is clicked.
rightButton.addEventListener("click", () => {
  if (count == reviews.length) count = 0;
  count++;
  headshot.src = reviews[count - 1].photo;
  name.textContent = reviews[count - 1].name;
  occupation.textContent = reviews[count - 1].occupation;
  description.textContent = reviews[count - 1].description;
  console.log(count);
});

// Randomize the photo.
random.addEventListener("click", () => {
  let randNum = Math.floor(Math.random() * 4);
  headshot.src = reviews[randNum].photo;
  name.textContent = reviews[randNum].name;
  occupation.textContent = reviews[randNum].occupation;
  description.textContent = reviews[randNum].description;
});
