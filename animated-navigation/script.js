const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");

const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");

const navItems = [nav1, nav2, nav3, nav4, nav5];

// Animation classes
function navAnimation(toRemove, toAdd) {
    navItems.forEach((nav, i) => {
        nav.classList.replace(`slide-${toRemove}-${i + 1}`, `slide-${toAdd}-${i + 1}`);
    });
}

function toggleNav() {
    // Toggle menu bars open/closed
    menuBars.classList.toggle('change');

    //Toggle menu active
    overlay.classList.toggle('overlay-active');
    if (overlay.classList.contains('overlay-active')) {
        // In
        overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');

        // Animate in - nav items
        navAnimation('out', 'in');

    } else {
        // Out
        overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');

        // Animate out - nav items
        navAnimation('in', 'out');
    }
}

// Event listeners
menuBars.addEventListener('click', toggleNav);
navItems.forEach((item) => {
    item.addEventListener('click', toggleNav);
});