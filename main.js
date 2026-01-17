// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

const navTrigger = document.getElementById('navTrigger');
const navClose = document.getElementById('navClose');
const dropdownNav = document.getElementById('dropdownNav');
const navLinks = document.querySelectorAll('.nav-link');

function closeNav() {
    dropdownNav.classList.remove('active');
    navTrigger.classList.remove('hidden');
    document.body.classList.remove('nav-open');
}

// Open navigation
navTrigger.addEventListener('click', () => {
    dropdownNav.classList.add('active');
    navTrigger.classList.add('hidden');
    document.body.classList.add('nav-open');
});

// Close navigation
navClose.addEventListener('click', closeNav);

// Close navigation when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeNav();
    });
});

// Close navigation when clicking outside
document.addEventListener('click', (e) => {
    if (!dropdownNav.contains(e.target) && !navTrigger.contains(e.target)) {
        closeNav();
    }
});

// ==========================================
// ARTIST CAROUSEL FUNCTIONALITY
// ==========================================

const artistSlides = document.querySelectorAll('.artist-slide');
const prevBtn = document.getElementById('prevArtist');
const nextBtn = document.getElementById('nextArtist');

let currentArtist = 0;
const totalArtists = artistSlides.length;

// Initialize styles
artistSlides.forEach((slide, index) => {
    if (index === 0) {
        slide.classList.add('active');
    } else {
        slide.classList.add('next');
    }
});

function showArtist(nextIndex, direction) {
    if (nextIndex === currentArtist) return;

    const currentSlide = artistSlides[currentArtist];
    const nextSlide = artistSlides[nextIndex];

    // Remove all positioning classes to reset
    artistSlides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
        // Force reset
        if (slide !== currentSlide && slide !== nextSlide) {
            slide.style.transition = 'none';
            slide.classList.add('next'); // Push others to right by default or hidden
            // Force reflow
            void slide.offsetWidth;
            slide.style.transition = '';
        }
    });

    if (direction === 'next') {
        // Prepare next slide to come from RIGHT
        nextSlide.style.transition = 'none';
        nextSlide.classList.remove('active', 'prev', 'next');
        nextSlide.classList.add('next');
        void nextSlide.offsetWidth; // Force reflow
        nextSlide.style.transition = '';

        // Animate
        currentSlide.classList.add('prev'); // Exit to LEFT

        nextSlide.classList.remove('next'); // Remove start position
        nextSlide.classList.add('active'); // Enter to CENTER
    } else {
        // Prepare next slide to come from LEFT
        nextSlide.style.transition = 'none';
        nextSlide.classList.remove('active', 'prev', 'next');
        nextSlide.classList.add('prev');
        void nextSlide.offsetWidth; // Force reflow
        nextSlide.style.transition = '';

        // Animate
        currentSlide.classList.add('next'); // Exit to RIGHT

        nextSlide.classList.remove('prev'); // Remove start position
        nextSlide.classList.add('active'); // Enter to CENTER
    }

    currentArtist = nextIndex;
}

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const prevIndex = (currentArtist - 1 + totalArtists) % totalArtists;
    showArtist(prevIndex, 'prev');
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextIndex = (currentArtist + 1) % totalArtists;
    showArtist(nextIndex, 'next');
});

// Keyboard navigation for artist carousel (left/right)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const prevIndex = (currentArtist - 1 + totalArtists) % totalArtists;
        showArtist(prevIndex, 'prev');
    } else if (e.key === 'ArrowRight') {
        const nextIndex = (currentArtist + 1) % totalArtists;
        showArtist(nextIndex, 'next');
    }
});

// ==========================================
// ARTIST LINKS CLICK HANDLING
// ==========================================

document.querySelectorAll('.artist-link').forEach(link => {
    link.addEventListener('click', (e) => {
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
