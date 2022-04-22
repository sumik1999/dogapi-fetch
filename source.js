// fetch("https://dog.ceo/api/breeds/list/all")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err.message));

async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  createBreedList(data.message);
}

start();
function createBreedList(breedList) {
  document.getElementById(
    "breed"
  ).innerHTML = `<select onchange="onchangeClick(this.value)">
  <option> Choose a dog breed </option>
    ${Object.keys(breedList) //making an array from an object
      .map((breed) => {
        return `<option>${breed}</option>`;
      })
      .join("")}
  </select>`;
}

async function onchangeClick(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  const data = await response.json();
  createSLideShow(data.message);
}

function createSLideShow(images) {
  let current = 0;
  document.getElementById(
    "slideshow"
  ).innerHTML = `<div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>`;
  current += 2;
  setInterval(nextSlide, 3000);
}

function nextSlide() {
  document.getElementById(
    "slideshow"
  ).innerHTML += `<div class="slide" style="background-image: url('${images[current]}')"></div>`;
  setTimeout(() => {
    document.querySelector(".slide").remove();
  }, 1000);
  if (current + 1 >= images.length) {
    current = 0;
  } else {
    current += 1;
  }
}
