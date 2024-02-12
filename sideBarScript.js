
function show(){
    document.querySelector('.hamburger').classList.toggle('open')
    document.querySelector('.navigation').classList.toggle('active')    
    const messageElement = document.querySelector('#messageSection');
}
function show2(){
    let pageContainer = document.querySelector('#pageContainer')
    if(window.innerWidth > 700){
        pageContainer.classList.toggle('slide')

    }
}
window.addEventListener('resize', function () {
    const screenWidth = window.innerWidth;
    const navigation = document.querySelector('.navigation');
    const burger = document.querySelector('.hamburger');
    const messageElement = document.querySelector('#messageSection');
    if (screenWidth > 700) {
        navigation.classList.add('active');
        burger.classList.add('open')
    } else {
        navigation.classList.remove('active');
        burger.classList.remove('open')

    }
});

window.addEventListener('load', function () {
    const screenWidth = window.innerWidth;
    const navigation = document.querySelector('.navigation');
    const burger = document.querySelector('.hamburger')
    const messageElement = document.querySelector('#messageSection');



    if (screenWidth > 700) {
        navigation.classList.add('active');
        burger.classList.add('open')
    } else {
        navigation.classList.remove('active');
        burger.classList.remove('open')
    }
});