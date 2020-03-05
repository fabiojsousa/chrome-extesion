document.addEventListener('click', ()=>{
    // window.open(url, '_blank')
})

const country = document.querySelector('#country').value;


const url = document.location.href;
// const url = 'https://www.teste.asdfasdf.facebook.com';

document.querySelector('#url').url;

const regex = /\w*\.(com|net|info|org)/gmi;

const domain = url.match(regex);

console.log(domain);