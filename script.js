const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = '4PF-DZYh4y5BkPoPYQxOE6KcVgXU8o5xbFGpx2KYVI0';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30  
    }
}

// helper function to set attributes on DOM Elements
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}


// Create Elements for links & photos Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
    //  Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
    href:photo.links.html,
    target:'_blank',
    });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        // Event listener,check when each is finished loading
        img.addEventListener('load',imageLoaded);
         // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
    const response = await fetch (apiUrl);
    photosArray = await response.json();
    displayPhotos();
    } catch (error){
        // Catch error here
    }
}

// Check to see if scrolling near bottom of the page,load more photos
window.addEventListener('scroll',()=>{
if (window.innerHeight+window.scrollY>=document.body.offsetHeight -1000 && ready) {
    ready = false;
    getPhotos();
    
}
});


// On load
getPhotos();