const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('imag1');
const image2 = document.getElementById('imag2');
const image3 = document.getElementById('imag3');
const textBox = document.getElementById('text-box');

// Toggle mode
const toggleMode = (mode) => {
    toggleIcon.children[0].textContent = `${mode} Mode`;
    mode = mode.toLowerCase();

    const isLight = mode === 'light';

    textBox.style.backgroundColor = isLight ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255 / 50%)";
    nav.style.backgroundColor = isLight ? "rgb(255 255 255 / 50%)" : "rgb(0 0 0 / 50%)";
    toggleIcon.children[1].classList.remove(isLight ? 'fa-moon' : 'fa-sun');
    toggleIcon.children[1].classList.add(isLight ? 'fa-sun' : 'fa-moon');
    image1.src = `img/undraw_proud_coder_${mode}.svg`;
    image2.src = `img/undraw_feeling_proud_${mode}.svg`;
    image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
}

// Switch theme dynamically
const switchTheme = (event) => {
    const { checked } = event.target;
    document.documentElement.setAttribute('data-theme', checked ? 'dark' : 'light');
    toggleMode(checked ? 'Dark' : 'Light');
    localStorage.setItem('theme', checked ? 'dark' : 'light');
}

// Event listener
toggleSwitch.addEventListener('change', switchTheme);

// Check local storage for thenme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    toggleSwitch.checked = currentTheme === 'dark';
    const capitalizedTheme = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
    toggleMode(capitalizedTheme);
}