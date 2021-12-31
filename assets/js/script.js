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

const navBar     = document.getElementById('navbar');
let { scrollY }  = window;

document.addEventListener('scroll', () => {
    scrollY = window.scrollY;

    if (scrollY >= 59) {
        if (!navBar.classList.contains('navbar-fixed')) {
            navBar.classList.add('navbar-fixed');
        }
    } else {
        if (navBar.classList.contains('navbar-fixed')) {
            navBar.classList.remove('navbar-fixed');
        }
    }
});