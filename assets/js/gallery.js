/* ==========================================
   GALLERY - JavaScript (Photos, Reels, Shorts)
   ========================================== */

// Default gallery data
const DEFAULT_GALLERY = {
    photos: `https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-1.jpg
https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-2.jpg
https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-3.jpg
https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-4.jpg
https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-5.jpg
https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-6.jpg
https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-7.jpg
https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-8.jpg
https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/gallery-9.jpg`,
    reels: '',
    shorts: ''
};

let currentTab = 'photos';
let currentLightboxIndex = 0;
let currentItems = [];

// Get gallery data from localStorage
function getGalleryData() {
    const stored = localStorage.getItem('gallery_items');
    if (stored) {
        return JSON.parse(stored);
    }
    return DEFAULT_GALLERY;
}

// Parse URLs from text (one per line)
function parseUrls(text) {
    if (!text) return [];
    return text.split('\n').map(url => url.trim()).filter(url => url.length > 0);
}

// Render photos
function renderPhotos() {
    const grid = document.getElementById('photosGrid');
    if (!grid) return;
    
    const gallery = getGalleryData();
    const urls = parseUrls(gallery.photos);
    currentItems = urls;
    
    if (urls.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No photos yet. Add photos from the admin panel.</p>';
        return;
    }
    
    grid.innerHTML = urls.map((url, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="${url}" alt="Photo ${index + 1}" loading="lazy">
            <div class="gallery-item-overlay">
                <i class="fas fa-expand"></i>
            </div>
        </div>
    `).join('');
}

// Render reels (videos)
function renderReels() {
    const grid = document.getElementById('reelsGrid');
    if (!grid) return;
    
    const gallery = getGalleryData();
    const urls = parseUrls(gallery.reels);
    currentItems = urls;
    
    if (urls.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No reels yet. Add video URLs from the admin panel.</p>';
        return;
    }
    
    grid.innerHTML = urls.map((url, index) => `
        <div class="gallery-item video-item" onclick="openVideoLightbox(${index}, '${url}')">
            <video src="${url}" muted></video>
            <div class="gallery-item-overlay">
                <i class="fas fa-play-circle"></i>
            </div>
        </div>
    `).join('');
}

// Render shorts (YouTube embeds)
function renderShorts() {
    const grid = document.getElementById('shortsGrid');
    if (!grid) return;
    
    const gallery = getGalleryData();
    const urls = parseUrls(gallery.shorts);
    currentItems = urls;
    
    if (urls.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No shorts yet. Add YouTube Shorts URLs from the admin panel.</p>';
        return;
    }
    
    grid.innerHTML = urls.map((url, index) => {
        const videoId = extractYouTubeId(url);
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        return `
            <div class="gallery-item video-item shorts-item">
                <iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>
            </div>
        `;
    }).join('');
}

// Extract YouTube video ID
function extractYouTubeId(url) {
    const match = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/)([^&\?\/]+)/);
    return match ? match[1] : '';
}

// Tab handling
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabName = tab.dataset.tab;
            currentTab = tabName;
            
            // Hide all sections
            document.getElementById('photos-section').style.display = 'none';
            document.getElementById('reels-section').style.display = 'none';
            document.getElementById('shorts-section').style.display = 'none';
            
            // Show selected section
            document.getElementById(tabName + '-section').style.display = 'block';
            
            // Render content
            if (tabName === 'photos') renderPhotos();
            if (tabName === 'reels') renderReels();
            if (tabName === 'shorts') renderShorts();
        });
    });
}

// Lightbox for photos
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    
    if (lightbox && img) {
        currentLightboxIndex = index;
        img.src = currentItems[index];
        img.style.display = 'block';
        img.parentElement.querySelector('video')?.remove();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Lightbox for videos
function openVideoLightbox(index, url) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    
    if (lightbox && img) {
        currentLightboxIndex = index;
        img.style.display = 'none';
        img.parentElement.querySelector('video')?.remove();
        
        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '90vw';
        video.style.maxHeight = '80vh';
        img.parentElement.appendChild(video);
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        // Remove video if present
        lightbox.querySelector('video')?.remove();
    }
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentItems.length;
    const img = document.getElementById('lightboxImg');
    img.src = currentItems[currentLightboxIndex];
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentItems.length) % currentItems.length;
    const img = document.getElementById('lightboxImg');
    img.src = currentItems[currentLightboxIndex];
}

// Initialize lightbox controls
function initLightbox() {
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const lightbox = document.getElementById('lightbox');
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);
    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

// Mobile menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    renderPhotos();
    initGalleryTabs();
    initLightbox();
    initMobileMenu();
});
