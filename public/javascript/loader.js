

/* DISPLAY LOADING PAGE */

const displayLoader = () => {

    console.log("LOADING... 1")

  

  
    const loader = document.getElementById('loader');
    loader.classList.remove('d-none');
 

    document.querySelector('html').classList.add('loading')

}
console.log("LOADING... 2")