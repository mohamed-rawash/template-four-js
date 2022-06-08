//check if there's local storage color option

let mainColor = localStorage.getItem(`color-option`);
let colorIndex = localStorage.getItem("color-index");
const colorsLi = document.querySelectorAll(".colors-list li");


if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  //this is the way in the demo
  /* // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColor) {
      // Add Active Class
      element.classList.add("active");
    }
  }); */
}

if (colorIndex !== null) {
  colorsLi[0].classList.remove("active");
  colorsLi[parseInt(colorIndex)].classList.add("active");
}

document.querySelector(".setting-box .toggle-setting i").onclick = function () {
  console.log("clicked");
  this.classList.toggle("opacity");
  this.classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("opened");
};

//switch colors
//loop on al list items
colorsLi.forEach((li, index) => {
  // click on every list items
  li.addEventListener("click", (e) => {
    addActive(colorsLi)
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // add color to loacal storage
    localStorage.setItem(`color-option`, e.target.dataset.color);
    // add color index in local storage
    localStorage.setItem(`color-index`, index);
  });
});

// get landing page item
let landingPage = document.querySelector(".landing-page");

// get images
let images = [
  "landing-1.jpg",
  "landing-2.webp",
  "landing-3.jpg",
  "landing-4.png",
];

//back graound option and setinterval control
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("backgroundLocalItem")


//check if random background local stroage is not empty
if(backgroundLocalItem !== null){

  if(backgroundLocalItem === "true"){
    backgroundOption = true;
  }else {
    backgroundOption = false;
  }

  document.querySelectorAll(".random-background button").forEach((element) => {
    element.classList.remove("active");
  });

  if(backgroundLocalItem === "true"){
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }

}


document.querySelectorAll(".random-background button").forEach((element) => {
  element.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");

    if (e.target.dataset.random === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("backgroundLocalItem", true)
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("backgroundLocalItem", false)
    }
  });
});

function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      //get random number
      randomNumber = Math.floor(Math.random() * images.length);
      landingPage.style.backgroundImage = `url(images/${images[randomNumber]})`;
    }, 10000);
  }
}

randomizeImgs();

// Select Skills Selector

let ourSkills = document.querySelector(".skills")

window.onscroll = function () {
  // Get Skills Section Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  //Get Skills Section Outer Height
  let sikllsOuterHeight = ourSkills.offsetHeight

  //Window Height
  let windowHeight = this.innerHeight;

  // window scroll top 
  let windowScrollTop = this.scrollY
  

  if(windowScrollTop > (skillsOffsetTop + sikllsOuterHeight - windowHeight)) {
    
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });

  }

}

//create popup with image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(image => {

  image.addEventListener("click", (e) => {

    // create overlay element 
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.classList.add("popup-overlay");

    //append overlay to the body
    document.body.appendChild(overlay);

    //create popup box
    let popupBox = document.createElement("div");

    //add class to popup
    popupBox.classList.add("popup-box");

    if(image.alt !== null){
      //creat heading 
      let popupTitle = document.createElement("h3");

      //create text for heading 
      let titleText = document.createTextNode(image.alt);

      //add text to heading
      popupTitle.appendChild(titleText);

      //append heading to popup box
      popupBox.appendChild(popupTitle);
    }

    //create image of popup box
    let popupImage = document.createElement("img");

    //change the image src
    popupImage.src = image.src;

    //add the image to the popup box
    popupBox.appendChild(popupImage);

    //add popup box to the body
    document.body.appendChild(popupBox)

    //create close button 
    let closeButton = document.createElement("span")

    //create close button text
    let closeButtonText = document.createTextNode("x");

    //append text to button
    closeButton.appendChild(closeButtonText)

    // add class to the close button 
    closeButton.classList.add("close-button");

    //append close button to the popup box
    popupBox.appendChild(closeButton);

  });

});

// remove popup 
document.addEventListener("click", (e) => {
  
  if(e.target.className == "close-button") {
    e.target.parentNode.remove()
    document.querySelector(".popup-overlay").remove()
  }

})

//select All bullets 
let allBullets = document.querySelectorAll(".nav-bullets .bullet")

scrollToSomeWhere(allBullets);
addActive(allBullets);


function scrollToSomeWhere(elements) {

  elements.forEach(element => {

    element.addEventListener("click", event => {
        document.querySelector(event.target.dataset.section).scrollIntoView({
          behavior: "smooth"
        });
    });

  });
}

function addActive(elements) {

  elements.forEach(element => {
    element.addEventListener("click", event => {
      elements.forEach(element => element.classList.remove("active"));
      event.target.classList.add("active");
    });
  });
}

function handelActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach(element => element.classList.remove("active"));
  event.target.classList.add("active");
}

let bulletsButtons = document.querySelectorAll(".bullets-option button");
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletsLocalOption = localStorage.getItem("bullets_option")

if(bulletsLocalOption !== null) {
  console.log("not")

  bulletsButtons.forEach(element => element.classList.remove("active"));

  if (bulletsLocalOption === "show") {
  
    document.querySelector(".bullets-option .yes").classList.add("active");
    bulletsContainer.style.display = "block";

  } else {
    document.querySelector(".bullets-option .no").classList.add("active");
    bulletsContainer.style.display = "none";
  }
}

bulletsButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    if(e.target.dataset.display === 'show'){

      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "show")

    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "hide")

    }
    handelActive(e)
  });
})


//Reset Button

document.querySelector(".reset-option").onclick = function () {
  localStorage.clear()
  window.location.reload()
}