function fadeIn(element, duration) {
    let seconds = duration / 1000;
    element.style.animation = `fade-in ${seconds}s ease-in`;

    let timer = setTimeout(() => {
        element.style.visibility = 'visible';
        clearTimeout(timer);
    }, duration);
}

function playFadeInAnimationSequence(elements, callback) {
    elements.forEach((el, i) => {
        setTimeout(() => {
            fadeIn(el, 500);
        }, 1000 * (i + 1));
    });

    let duration = 1000 * elements.length;
    
    setTimeout(() => {
        if (callback)
            callback();
    }, duration);
}

function typeText(element, string, callback) {
    let chars = [ ...string ];
    let text = '';

    chars.forEach((char, i) => {
        setTimeout(() => {
            text += char;

            element.innerHTML = (i % 2 == 0 && i < chars.length - 1)
                ? text + '<span class="cursor">|</span>'
                : text;
        }, 100 * (i + 1));
    });

    let duration = 100 * chars.length;

    setTimeout(() => {
        if (callback)
            callback();
    }, duration);
}

function shuffleArray(array) {
    let aux = array.slice(0);

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = aux[i];
        aux[i]   = aux[j];
        aux[j]   = temp;
    }

    return aux;
}

function assignColors(colors, elements) {
    let i = 0;

    for (let el of elements) {
        el.style.backgroundColor = colors[i];

        i++;
    }
}

function colorChangeAnimation(colors, elements, delay = 2000) {
    setInterval(() => {
        let shuffle = shuffleArray(colors);
        assignColors(shuffle, elements);
    }, delay);
}

function addMarginToMain(main) {
    let width = document.body.clientWidth;

    if (width > 1268) {
        main.style.marginTop = '190px';
    } else {
        main.style.marginTop = '110px';
    }
}

function removeMarginFromMain(main) {
    main.style.marginTop = '0px';
}

const main       = document.querySelector('main');
const navBar     = document.getElementById('navbar');
let { scrollY }  = window;
const colors     = [
    '#9a6030',
    '#c19171',
    '#f4a377',
    '#fdcc55',
    '#8ec583',
    '#e2e693',
    '#ed7483'
];

const dividers  = document.getElementsByClassName('divider');

colorChangeAnimation(colors, dividers);

document.addEventListener('scroll', () => {
    scrollY = window.scrollY;

    if (scrollY > 59) {
        if (!navBar.classList.contains('navbar-fixed')) {
            navBar.classList.add('navbar-fixed');
        }

        addMarginToMain(main);
        
    } else {
        if (navBar.classList.contains('navbar-fixed')) {
            navBar.classList.remove('navbar-fixed');
            
            removeMarginFromMain(main);
        }
    }
});

window.addEventListener('resize', () => {
    if (navBar.classList.contains('navbar-fixed')) {
        addMarginToMain(main);
    } else {
        removeMarginFromMain(main);
    }
})