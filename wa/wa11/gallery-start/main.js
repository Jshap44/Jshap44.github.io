const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const filenames = ["images/1.PNG", "images/2.png", "images/3.png", "images/4.png", "images/5.png"]
/* Declaring the alternative text for each image file */
const alternative = ["Water Droplets", "Water Pattern Produced by Sound", "Water Droplet Splash", "Strawberry Dropped in Water", "Water in Jar"]

/* Looping through images */
const thumb = document.getElementById('thumb-bar');
      for(let i = 0; i < filenames.length; i++) {
        const newImage = document.createElement('img');
        newImage.setAttribute('src', filenames[i]);
        newImage.setAttribute('alt', alternative[i]);
        thumbBar.appendChild(newImage);
        newImage.addEventListener('click', function() {
            displayedImage.setAttribute('src', filenames[i]);
            displayedImage.setAttribute('alt', alternative[i]);
          });
          let on = false;
          btn.addEventListener('click', function() {
            if (!on) {
              overlay.style.backgroundColor = 'rgba(30, 27, 27, 0.6)';
              on = true;
            } else {
              overlay.style.backgroundColor = ''; 
              on = false;
            }
          });
    }   

/* Wiring up the Darken/Lighten button */
