
// Query all classes with 'header'.
let allHeaders = document.querySelectorAll(".header");
console.log(allHeaders);

// Loop through all headers and toggle their display on click.
for (let header of allHeaders) {
    header.addEventListener("click", ()=> {
        if (header.nextElementSibling.style.display == "none") {
            header.nextElementSibling.style.display = "block";
        }
        else {header.nextElementSibling.style.display = "none";} 
    })
}