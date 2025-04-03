const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const filenames = ["images/pic1.jpg", "images/pic2.jpg", "images/pic3.jpg", "images/pic4.jpg", "images/pic5.jpg"]
/* Declaring the alternative text for each image file */
const alternative = ["Eye", "Rock", "Flowers", "Hieroglyphs", "Butterfly"]

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
