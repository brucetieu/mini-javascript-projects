const hamburger = document.querySelector(".fa-bars");
const links = document.querySelector(".copy-div");

console.log(links.classList)
hamburger.addEventListener("click", ()=> {
    links.classList.toggle("show-list");
})
