// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

const navTrigger = document.getElementById('navTrigger');
const navClose = document.getElementById('navClose');
const dropdownNav = document.getElementById('dropdownNav');
const navLinks = document.querySelectorAll('.nav-link');

// Open navigation
navTrigger.addEventListener('click', () => {
    dropdownNav.classList.add('active');
    navTrigger.classList.add('hidden');
    document.body.classList.add('nav-open');
});

// Close navigation
navClose.addEventListener('click', () => {
    dropdownNav.classList.remove('active');
    navTrigger.classList.remove('hidden');
    document.body.classList.remove('nav-open');
});

// Close navigation when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        dropdownNav.classList.remove('active');
        navTrigger.classList.remove('hidden');
        document.body.classList.remove('nav-open');

        // Handle ferris wheel navigation
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetIndex = sections.findIndex(s => s.id === targetId);
        if (targetIndex !== -1) {
            goToSection(targetIndex);
        }
    });
});

// Close navigation when clicking outside
document.addEventListener('click', (e) => {
    if (!dropdownNav.contains(e.target) && !navTrigger.contains(e.target)) {
        dropdownNav.classList.remove('active');
        navTrigger.classList.remove('hidden');
        document.body.classList.remove('nav-open');
    }
});

// ==========================================
// FERRIS WHEEL SCROLL FUNCTIONALITY
// ==========================================

const mainContent = document.querySelector('.main-content');
const sections = Array.from(document.querySelectorAll('.main-content > section'));
let currentSection = 0;
let isAnimating = false;
const animationDuration = 800; // ms

// Initialize sections with 3D positioning
function initSections() {
    sections.forEach((section, index) => {
        section.style.position = 'absolute';
        section.style.top = '0';
        section.style.left = '0';
        section.style.width = '100%';
        section.style.height = '100vh';
        section.style.transformStyle = 'preserve-3d';
        section.style.transition = `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${animationDuration}ms ease`;

        if (index === 0) {
            // Current section - visible, in front
            section.style.transform = 'translateY(0) rotateX(0deg) translateZ(0px)';
            section.style.opacity = '1';
            section.style.pointerEvents = 'all';
        } else {
            // Below sections - waiting at bottom, rotated back
            section.style.transform = 'translateY(100%) rotateX(-45deg) translateZ(-500px)';
            section.style.opacity = '0';
            section.style.pointerEvents = 'none';
        }
    });
}

function goToSection(targetIndex) {
    if (isAnimating || targetIndex === currentSection || targetIndex < 0 || targetIndex >= sections.length) {
        return;
    }

    isAnimating = true;
    const direction = targetIndex > currentSection ? 1 : -1;

    // Animate current section out
    const currentSec = sections[currentSection];
    if (direction > 0) {
        // Scrolling down - current goes up and rotates away
        currentSec.style.transform = 'translateY(-100%) rotateX(45deg) translateZ(-500px)';
    } else {
        // Scrolling up - current goes down and rotates away
        currentSec.style.transform = 'translateY(100%) rotateX(-45deg) translateZ(-500px)';
    }
    currentSec.style.opacity = '0';
    currentSec.style.pointerEvents = 'none';

    // Animate target section in
    const targetSec = sections[targetIndex];
    targetSec.style.transform = 'translateY(0) rotateX(0deg) translateZ(0px)';
    targetSec.style.opacity = '1';
    targetSec.style.pointerEvents = 'all';

    currentSection = targetIndex;

    setTimeout(() => {
        isAnimating = false;

        // Reset positions of non-visible sections
        sections.forEach((section, index) => {
            if (index !== currentSection) {
                if (index < currentSection) {
                    // Above - already passed
                    section.style.transform = 'translateY(-100%) rotateX(45deg) translateZ(-500px)';
                } else {
                    // Below - waiting
                    section.style.transform = 'translateY(100%) rotateX(-45deg) translateZ(-500px)';
                }
            }
        });
    }, animationDuration);
}

// Wheel scroll handler
let scrollAccumulator = 0;
const scrollThreshold = 50;

mainContent.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (isAnimating) return;

    scrollAccumulator += e.deltaY;

    if (Math.abs(scrollAccumulator) >= scrollThreshold) {
        if (scrollAccumulator > 0 && currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        } else if (scrollAccumulator < 0 && currentSection > 0) {
            goToSection(currentSection - 1);
        }
        scrollAccumulator = 0;
    }
}, { passive: false });

// Touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

mainContent.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

mainContent.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50 && !isAnimating) {
        if (diff > 0 && currentSection < sections.length - 1) {
            goToSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
            goToSection(currentSection - 1);
        }
    }
}, { passive: true });

// Keyboard navigation (up/down arrows)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        goToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        goToSection(currentSection - 1);
    }
});

// Initialize on load
window.addEventListener('load', () => {
    initSections();
});

// ==========================================
// ARTIST CAROUSEL FUNCTIONALITY
// ==========================================

const artistSlides = document.querySelectorAll('.artist-slide');
const prevBtn = document.getElementById('prevArtist');
const nextBtn = document.getElementById('nextArtist');

let currentArtist = 0;
const totalArtists = artistSlides.length;

function showArtist(index) {
    artistSlides.forEach(slide => {
        slide.classList.remove('active', 'exiting');
    });

    artistSlides[currentArtist].classList.add('exiting');
    artistSlides[index].classList.add('active');
    currentArtist = index;
}

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const prevIndex = (currentArtist - 1 + totalArtists) % totalArtists;
    showArtist(prevIndex);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextIndex = (currentArtist + 1) % totalArtists;
    showArtist(nextIndex);
});

// Keyboard navigation for artist carousel (left/right)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const prevIndex = (currentArtist - 1 + totalArtists) % totalArtists;
        showArtist(prevIndex);
    } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentArtist + 1) % totalArtists;
        showArtist(nextIndex);
    }
});

// ==========================================
// ARTIST LINKS CLICK HANDLING
// ==========================================

document.querySelectorAll('.artist-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Ensure the link opens normally but doesn't trigger ferris wheel
        e.stopPropagation();
    });
});

// ==========================================
// IMAGE LOADING HELPER
// ==========================================

function setArtistImage(artistId, imagePath) {
    const imageElement = document.getElementById(`${artistId}Image`);
    if (imageElement) {
        imageElement.style.backgroundImage = `url('${imagePath}')`;
    }
}

// Example usage:
// setArtistImage('ritvisky', 'images/ritvisky.jpg');
// setArtistImage('saygi322', 'images/saygi322.jpg');

// ==========================================
// PREVENT DEFAULT SCROLL RESTORATION
// ==========================================

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
