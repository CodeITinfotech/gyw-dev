/* ==========================================
   GOA YACHT WORLD - Main JavaScript
   ========================================== */

// Configuration
const CONFIG = {
    whatsappNumber: '918446275985',
    bookingUrl: 'https://wa.me/918446275985?text=Hi,%20I%20want%20to%20book%20a%20yacht',
    siteName: 'Goa Yacht World',
    dbName: 'GoaYachtWorldDB'
};

// Google Reviews - Load from Firebase first, fallback to localStorage, then defaults
const DEFAULT_REVIEWS = [
    { name: "Naveen Sharma", date: "2 weeks ago", rating: 5, text: "Absolutely outstanding video shoot experience! The team was incredibly professional, creative, and attentive to detail. Highly recommend!", avatar: "NS", active: true },
    { name: "Daniel Fernandes", date: "1 month ago", rating: 5, text: "Fantastic yacht experience! Clean, well-maintained vessels, friendly staff, easy booking, and affordable rates.", avatar: "DF", active: true },
    { name: "Manish Rajput", date: "3 weeks ago", rating: 5, text: "Five-star cruise experience, well-equipped boats, knowledgeable crew, and reasonable prices. Highly recommended!", avatar: "MR", active: true },
    { name: "Priya Patel", date: "1 week ago", rating: 5, text: "Amazing birthday celebration on the yacht! The team went above and beyond to make our special day perfect.", avatar: "PP", active: true },
    { name: "Amit Kumar", date: "2 months ago", rating: 5, text: "Best yacht rental service in Goa! Professional crew, beautiful yachts, and excellent customer service.", avatar: "AK", active: true },
    { name: "Sneha Gupta", date: "3 weeks ago", rating: 5, text: "Romantic sunset cruise was absolutely magical! Perfect for couples!", avatar: "SG", active: true },
    { name: "Rahul Mehta", date: "1 month ago", rating: 5, text: "Great experience for our family outing. Kids loved every moment.", avatar: "RM", active: true },
    { name: "Vikram Singh", date: "5 days ago", rating: 5, text: "Best decision to book with Goa Yacht World! Highly professional team!", avatar: "VS", active: true },
    { name: "Ananya Reddy", date: "2 weeks ago", rating: 5, text: "Dream yacht experience! Perfect for our anniversary celebration.", avatar: "AR", active: true },
    { name: "Karthik Nair", date: "1 week ago", rating: 4, text: "Great service overall. Would have given 5 stars but wish the booking process was slightly faster.", avatar: "KN", active: true }
];

// Initialize Google Reviews from Firebase/localStorage
let GOOGLE_REVIEWS = [];

// Load reviews from Firebase or fallback
async function loadReviews() {
    try {
        if (typeof firebase !== 'undefined' && firebase.database) {
            const snapshot = await firebase.database().ref('reviews').once('value');
            const data = snapshot.val();
            if (data && Array.isArray(data)) {
                GOOGLE_REVIEWS = data.filter(r => r.active !== false);
                localStorage.setItem('google_reviews', JSON.stringify(data));
                return GOOGLE_REVIEWS;
            }
        }
    } catch (error) {
        console.log('Firebase not available, using localStorage');
    }
    // Fallback to localStorage
    const stored = localStorage.getItem('google_reviews');
    GOOGLE_REVIEWS = stored ? JSON.parse(stored).filter(r => r.active !== false) : DEFAULT_REVIEWS.filter(r => r.active !== false);
    return GOOGLE_REVIEWS;
}

// Listen for real-time updates from Firebase
function listenToReviews(callback) {
    if (typeof firebase !== 'undefined' && firebase.database) {
        firebase.database().ref('reviews').on('value', snapshot => {
            const data = snapshot.val();
            if (data && Array.isArray(data)) {
                GOOGLE_REVIEWS = data.filter(r => r.active !== false);
                localStorage.setItem('google_reviews', JSON.stringify(data));
                callback(GOOGLE_REVIEWS);
            }
        });
    }
}

function getReviews() {
    return GOOGLE_REVIEWS.length > 0 ? GOOGLE_REVIEWS : DEFAULT_REVIEWS.filter(r => r.active !== false);
}

let displayedReviews = 0;
const REVIEWS_PER_PAGE = 6;
const REVIEWS_PER_LOAD = 3;
const MAX_REVIEWS_DISPLAY = 30;
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/Goa+Yacht+World';

// Yacht data - Using local images from assets/images/
const DEFAULT_YACHTS = [
    { id: 'yacht-001', name: 'Aqua Queen', type: 'Yacht', location: 'Panjim', capacity: 8, price: 15000, featured: true, images: ['assets/images/service-yacht-2.jpg'] },
    { id: 'yacht-002', name: 'White Sea', type: 'Yacht', location: 'Panjim', capacity: 12, price: 18000, featured: true, images: ['assets/images/service-yacht-6.jpg'] },
    { id: 'yacht-003', name: 'Amaze', type: 'Yacht', location: 'Panjim', capacity: 13, price: 20000, featured: true, images: ['assets/images/service-yacht-1.jpg'] },
    { id: 'yacht-004', name: 'Sea Heiress', type: 'Yacht', location: 'Panjim', capacity: 8, price: 22000, featured: true, images: ['assets/images/service-yacht-18.jpg'] },
    { id: 'yacht-005', name: 'MV Star', type: 'Yacht', location: 'Panjim', capacity: 8, price: 16000, featured: true, images: ['assets/images/service-yacht-17.jpg'] },
    { id: 'yacht-006', name: 'SeaRay R', type: 'Yacht', location: 'Panjim', capacity: 10, price: 17000, featured: true, images: ['assets/images/service-yacht-33.jpg'] },
    { id: 'yacht-007', name: 'Rinker', type: 'Yacht', location: 'Panjim', capacity: 6, price: 12000, featured: false, images: ['assets/images/service-yacht-25.jpg'] },
    { id: 'yacht-008', name: 'Prawn', type: 'Yacht', location: 'Panjim', capacity: 6, price: 11000, featured: false, images: ['assets/images/service-yacht-24.jpg'] },
    { id: 'yacht-009', name: 'Bluefin', type: 'Yacht', location: 'Panjim', capacity: 5, price: 10000, featured: false, images: ['assets/images/service-yacht-23.jpg'] },
    { id: 'yacht-010', name: 'Manta Bay', type: 'Yacht', location: 'Panjim', capacity: 8, price: 14000, featured: false, images: ['assets/images/service-yacht-4.jpg'] },
    { id: 'yacht-011', name: 'Priestess', type: 'Yacht', location: 'Panjim', capacity: 8, price: 13000, featured: false, images: ['assets/images/service-yacht-5.jpg'] },
    { id: 'yacht-012', name: 'Fantasea', type: 'Yacht', location: 'Panjim', capacity: 12, price: 19000, featured: false, images: ['assets/images/service-yacht-3.jpg'] },
    { id: 'yacht-013', name: 'Sea Whale', type: 'Yacht', location: 'Panjim', capacity: 10, price: 15000, featured: false, images: ['assets/images/service-yacht-7.jpg'] },
    { id: 'yacht-014', name: 'Desire', type: 'Yacht', location: 'Panjim', capacity: 8, price: 14000, featured: false, images: ['assets/images/service-yacht-16.jpg'] },
    { id: 'yacht-015', name: 'Sea Eagle', type: 'Yacht', location: 'Panjim', capacity: 14, price: 22000, featured: false, images: ['assets/images/service-yacht-10.jpg'] },
    { id: 'yacht-016', name: 'Bay Elite', type: 'Yacht', location: 'Panjim', capacity: 10, price: 16000, featured: false, images: ['assets/images/service-yacht-31.jpg'] },
    { id: 'yacht-017', name: 'Torpedo', type: 'Yacht', location: 'Old Goa', capacity: 10, price: 18000, featured: false, images: ['assets/images/service-yacht-36.jpg'] },
    { id: 'yacht-018', name: 'Solaris', type: 'Yacht', location: 'Panjim', capacity: 8, price: 13000, featured: false, images: ['assets/images/service-yacht-9.jpg'] },
    { id: 'yacht-019', name: 'White Dolphin', type: 'Yacht', location: 'Panjim', capacity: 16, price: 25000, featured: false, images: ['assets/images/service-yacht-34.jpg'] },
    { id: 'yacht-020', name: 'Ralston II', type: 'Yacht', location: 'Panjim', capacity: 16, price: 24000, featured: false, images: ['assets/images/service-yacht-35.jpg'] },
    { id: 'yacht-021', name: 'Pegasus', type: 'Yacht', location: 'Panjim', capacity: 20, price: 30000, featured: false, images: ['assets/images/service-yacht-12.jpg'] },
    { id: 'yacht-022', name: 'Sailing Yacht 39', type: 'Yacht', location: 'Panjim', capacity: 15, price: 28000, featured: false, images: ['assets/images/service-yacht-19.jpg'] },
    { id: 'yacht-023', name: 'Ciao Bella', type: 'Yacht', location: 'Panjim', capacity: 16, price: 26000, featured: false, images: ['assets/images/service-yacht-13.jpg'] },
    { id: 'yacht-024', name: 'Majesty 56', type: 'Yacht', location: 'Panjim', capacity: 20, price: 35000, featured: false, images: ['assets/images/service-yacht-15.jpg'] },
    { id: 'yacht-025', name: 'Squadron BD', type: 'Yacht', location: 'Panjim', capacity: 20, price: 32000, featured: false, images: ['assets/images/service-yacht-29.jpg'] },
    { id: 'yacht-026', name: 'Ferretti 460', type: 'Yacht', location: 'Panjim', capacity: 16, price: 28000, featured: false, images: ['assets/images/service-yacht-22.jpg'] },
    { id: 'yacht-027', name: 'Ferretti 550', type: 'Yacht', location: 'Panjim', capacity: 22, price: 45000, featured: false, images: ['assets/images/service-yacht-14.jpg'] },
    { id: 'yacht-028', name: 'Ferretti FL', type: 'Yacht', location: 'Panjim', capacity: 25, price: 50000, featured: false, images: ['assets/images/service-yacht-27.jpg'] },
    { id: 'yacht-029', name: 'Calypso', type: 'Yacht', location: 'Panjim', capacity: 16, price: 24000, featured: false, images: ['assets/images/service-yacht-28.jpg'] },
    { id: 'yacht-030', name: 'Ahilo', type: 'Yacht', location: 'Panjim', capacity: 25, price: 48000, featured: false, images: ['assets/images/service-yacht-30.jpg'] },
    { id: 'yacht-031', name: 'Zia Bella', type: 'Yacht', location: 'Panjim', capacity: 30, price: 55000, featured: false, images: ['assets/images/service-yacht-11.jpg'] },
    { id: 'yacht-032', name: 'Sea Comfort', type: 'Yacht', location: 'Panjim', capacity: 25, price: 45000, featured: false, images: ['assets/images/service-yacht-32.jpg'] },
    { id: 'yacht-033', name: 'Ripples Chique', type: 'Yacht', location: 'Old Goa', capacity: 50, price: 75000, featured: false, images: ['assets/images/service-yacht-20.jpg'] },
    { id: 'yacht-034', name: 'Mi Amor', type: 'Yacht', location: 'Old Goa', capacity: 50, price: 80000, featured: false, images: ['assets/images/service-yacht-21.jpg'] },
    { id: 'yacht-035', name: 'Lady M', type: 'Yacht', location: 'Old Goa', capacity: 22, price: 40000, featured: false, images: ['assets/images/service-yacht-35.jpg'] }
];

// Database class - Reads from Firebase, falls back to localStorage
class YachtDatabase {
    constructor() {
        this.yachtsKey = 'yachts';
        this.settingsKey = 'settings';
        this.yachtsCache = null;
        this.categoriesCache = null;
    }

    // Load yachts from Firebase first
    async loadYachts() {
        try {
            if (typeof firebase !== 'undefined' && firebase.database) {
                const snapshot = await firebase.database().ref('yachts').once('value');
                const data = snapshot.val();
                if (data && Array.isArray(data)) {
                    this.yachtsCache = data;
                    localStorage.setItem(this.yachtsKey, JSON.stringify(data));
                    return this.yachtsCache;
                }
            }
        } catch (error) {
            console.log('Firebase not available for yachts');
        }
        // Fallback to localStorage
        const data = localStorage.getItem(this.yachtsKey);
        this.yachtsCache = data ? JSON.parse(data) : DEFAULT_YACHTS;
        return this.yachtsCache;
    }

    // Listen for real-time yacht updates
    listenToYachts(callback) {
        if (typeof firebase !== 'undefined' && firebase.database) {
            firebase.database().ref('yachts').on('value', snapshot => {
                const data = snapshot.val();
                if (data && Array.isArray(data)) {
                    this.yachtsCache = data;
                    localStorage.setItem(this.yachtsKey, JSON.stringify(data));
                    callback(this.getActiveYachts());
                }
            });
        }
    }

    getActiveYachts() {
        if (!this.yachtsCache) return DEFAULT_YACHTS.filter(y => !y.disabled);
        return this.yachtsCache.filter(y => !y.disabled);
    }

    getAllYachts() {
        return this.getActiveYachts();
    }

    getFeaturedYachts() {
        return this.getActiveYachts().filter(y => y.featured);
    }

    // Categories from Firebase
    async loadCategories() {
        try {
            if (typeof firebase !== 'undefined' && firebase.database) {
                const snapshot = await firebase.database().ref('categories').once('value');
                const data = snapshot.val();
                if (data && Array.isArray(data)) {
                    this.categoriesCache = data;
                    localStorage.setItem('yacht_categories', JSON.stringify(data));
                    return this.categoriesCache.filter(c => c.active !== false);
                }
            }
        } catch (error) {
            console.log('Firebase not available for categories');
        }
        // Fallback
        const stored = localStorage.getItem('yacht_categories');
        this.categoriesCache = stored ? JSON.parse(stored) : DEFAULT_CATEGORIES_JS;
        return this.categoriesCache.filter(c => c.active !== false);
    }

    listenToCategories(callback) {
        if (typeof firebase !== 'undefined' && firebase.database) {
            firebase.database().ref('categories').on('value', snapshot => {
                const data = snapshot.val();
                if (data && Array.isArray(data)) {
                    this.categoriesCache = data;
                    localStorage.setItem('yacht_categories', JSON.stringify(data));
                    callback(this.categoriesCache.filter(c => c.active !== false));
                }
            });
        }
    }

    getCategories() {
        if (!this.categoriesCache) return DEFAULT_CATEGORIES_JS.filter(c => c.active !== false);
        return this.categoriesCache.filter(c => c.active !== false);
    }

    // Settings
    saveSettings(settings) {
        localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    }

    getSettings() {
        const data = localStorage.getItem(this.settingsKey);
        return data ? JSON.parse(data) : {};
    }
}

// Initialize database
const db = new YachtDatabase();

// Format price
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// Render yachts
function renderYachts() {
    const grid = document.getElementById('yachtsGrid');
    if (!grid) return;
    
    const yachts = db.getAllYachts();
    
    grid.innerHTML = yachts.map(yacht => {
        const urlName = encodeURIComponent(yacht.name.toLowerCase().replace(/\s+/g, '-'));
        const videoBadge = yacht.video ? `<span class="video-badge" onclick="event.preventDefault(); window.open('${yacht.video}', '_blank')"><i class="fas fa-play-circle"></i></span>` : '';
        return `
        <div class="yacht-card">
            <a href="yacht-detail.html?yacht=${urlName}" class="yacht-card-link">
                <div class="yacht-card-img">
                    <img src="${yacht.images[0]}" alt="${yacht.name}" loading="lazy">
                    ${yacht.featured ? '<span class="yacht-card-badge">Featured</span>' : ''}
                    ${videoBadge}
                </div>
                <div class="yacht-card-body">
                    <span class="yacht-card-type">${yacht.type}</span>
                    <h3>${yacht.name}</h3>
                    <div class="yacht-card-meta">
                        <span><i class="fas fa-users"></i> Max Capacity: ${yacht.capacity}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${yacht.location}</span>
                    </div>
                    <div class="yacht-card-price">
                        ${formatPrice(yacht.price)} <small>/hour</small>
                    </div>
                </div>
            </a>
            <div class="yacht-card-actions">
                <a href="https://wa.me/91${CONFIG.whatsappNumber}?text=Hello%20Goa%20Yacht%20World!%20%F0%9F%9F%A2%0A%0AI%27m%20interested%20in%20booking%3A%0A%0A*Yacht%3A*%20${encodeURIComponent(yacht.name)}%0A*Location%3A*%20${encodeURIComponent(yacht.location)}%0A*Capacity%3A*%20${yacht.capacity}%20guests%0A*Price%3A*%20%E2%82%B9${yacht.price.toLocaleString('en-IN')}%2Fhour%0A%0APlease%20confirm%20availability." target="_blank" class="btn btn-whatsapp">
                    <i class="fab fa-whatsapp"></i> Book
                </a>
                <a href="tel:+91${CONFIG.whatsappNumber}" class="btn btn-primary">
                    <i class="fas fa-phone"></i>
                </a>
            </div>
        </div>`;
    }).join('');
}

// Render stars
function renderStars(rating) {
    return Array(5).fill(0).map((_, i) => 
        `<i class="fas fa-star${i < rating ? '' : '-half-alt'}"></i>`
    ).join('');
}

// Sort reviews: 5-star with long comments first, then rest
function sortReviews(reviews) {
    return [...reviews].sort((a, b) => {
        const aLong = a.text.length > 100;
        const bLong = b.text.length > 100;
        if (a.rating === 5 && b.rating !== 5) return -1;
        if (b.rating === 5 && a.rating !== 5) return 1;
        if (aLong && !bLong) return -1;
        if (bLong && !aLong) return 1;
        return b.rating - a.rating;
    });
}

// Render reviews
function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    const footer = document.getElementById('reviewsFooter');
    const loadMoreBtn = document.getElementById('loadMoreReviews');
    if (!grid) return;
    
    const sortedReviews = sortReviews(GOOGLE_REVIEWS);
    const totalAvailable = sortedReviews.length;
    const isFirstLoad = displayedReviews === 0;
    
    // First load: show 6 reviews
    // Subsequent loads: add 3 more
    const count = isFirstLoad ? REVIEWS_PER_PAGE : REVIEWS_PER_LOAD;
    const reviewsToShow = sortedReviews.slice(0, displayedReviews + count);
    
    grid.innerHTML = reviewsToShow.map(review => {
        const isLong = review.text.length > 100;
        return `
            <div class="review-card">
                <div class="review-card-header">
                    <div class="review-card-avatar">${review.avatar}</div>
                    <div class="review-card-info">
                        <h4>${review.name}</h4>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="stars">${renderStars(review.rating)}</div>
                <p class="${isLong ? 'short' : ''}" id="review-text-${review.name.replace(/\s/g, '-')}">${review.text}</p>
                <div class="review-card-footer">
                    <span class="review-card-google">
                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_42x16dp.png" alt="Google" style="height:14px;">
                        Google
                    </span>
                    ${isLong ? `<button class="read-more-btn" onclick="toggleReviewText('${review.name.replace(/\s/g, '-')}')">Read more</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    displayedReviews = reviewsToShow.length;
    
    // Show/hide load more button or redirect link
    if (footer) {
        if (displayedReviews >= MAX_REVIEWS_DISPLAY || displayedReviews >= totalAvailable) {
            // Show redirect to Google
            footer.innerHTML = `
                <a href="${GOOGLE_REVIEWS_URL}" target="_blank" class="btn btn-primary btn-lg">
                    <i class="fab fa-google"></i> See All Reviews on Google
                </a>
            `;
        } else {
            // Show Load More button
            footer.innerHTML = `
                <button class="btn btn-outline" id="loadMoreReviews" onclick="renderReviews()">
                    <i class="fas fa-plus"></i> Load More Reviews
                </button>
            `;
        }
    }
}

// Toggle review text expansion
function toggleReviewText(id) {
    const element = document.getElementById('review-text-' + id);
    const button = element.nextElementSibling.querySelector('.read-more-btn');
    if (element.classList.contains('short')) {
        element.classList.remove('short');
        if (button) button.textContent = 'Read less';
    } else {
        element.classList.add('short');
        if (button) button.textContent = 'Read more';
    }
}

// Make toggleReviewText available globally
window.toggleReviewText = toggleReviewText;

// Hero Slider with Video on Hover & Auto Scroll
function initHeroSlider() {
    const heroSection = document.querySelector('.hero-slider');
    const video = document.querySelector('.hero-video');
    
    if (heroSection && video) {
        heroSection.addEventListener('mouseenter', function() {
            video.play().catch(e => console.log('Video autoplay prevented'));
        });
        
        heroSection.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
            // Auto scroll to yachts section
            const autoScroll = localStorage.getItem('heroAutoScroll');
            if (autoScroll !== 'false') {
                const yachtsSection = document.getElementById('yachts');
                if (yachtsSection) {
                    yachtsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
}

// WhatsApp
const WhatsApp = {
    openChat: function(message) {
        message = message || 'Hi, I want to book a yacht';
        window.open(`https://wa.me/91${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
};

// Mobile Menu
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            document.getElementById('mainNav')?.classList.remove('active');
        }
    });
});

// Default categories
const DEFAULT_CATEGORIES_JS = [
    { id: 'yacht', name: 'Yacht Booking', icon: 'fa-ship', order: 1 },
    { id: 'cruise', name: 'Cruise Booking', icon: 'fa-anchor', order: 2 },
    { id: 'sailboat', name: 'Sailboat Booking', icon: 'fa-wind', order: 3 },
    { id: 'speedboat', name: 'Speed Boat Booking', icon: 'fa-bolt', order: 4 }
];

// Load services menu from admin categories
function loadServicesMenu() {
    const menu = document.getElementById('servicesMenu');
    const servicesLink = document.querySelector('.nav-item-has-children > a');
    if (!menu) return;
    
    // Get categories from localStorage or use defaults
    const storedCategories = localStorage.getItem('yacht_categories');
    const categories = storedCategories ? JSON.parse(storedCategories) : DEFAULT_CATEGORIES_JS;
    
    if (categories && categories.length > 0) {
        const sortedCategories = categories.sort((a, b) => a.order - b.order);
        
        if (sortedCategories.length === 1) {
            // Only one category - replace "Our Services" with the category name
            if (servicesLink) {
                servicesLink.innerHTML = `<i class="fas ${sortedCategories[0].icon || 'fa-ship'}"></i> ${sortedCategories[0].name}`;
                servicesLink.href = 'index.html#yachts';
            }
            menu.innerHTML = ''; // No dropdown needed
        } else {
            // Multiple categories - show dropdown
            if (servicesLink) {
                servicesLink.innerHTML = '<i class="fas fa-concierge-bell"></i> Our Services <i class="fas fa-chevron-down"></i>';
            }
            menu.innerHTML = sortedCategories.map(cat => 
                `<li><a href="index.html#yachts?type=${cat.id}"><i class="fas ${cat.icon || 'fa-ship'}"></i> ${cat.name}</a></li>`
            ).join('');
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async function() {
    // Load data from Firebase first, then render
    await Promise.all([
        db.loadYachts(),
        db.loadCategories(),
        loadReviews()
    ]);
    
    // Render initial content
    renderYachts();
    renderReviews();
    initHeroSlider();
    initMobileMenu();
    loadServicesMenu();
    
    // Listen for real-time updates from Firebase
    db.listenToYachts((yachts) => {
        if (document.getElementById('yachtsGrid')) {
            renderYachts();
        }
    });
    
    db.listenToCategories((categories) => {
        if (document.querySelector('.services-dropdown')) {
            loadServicesMenu();
        }
    });
    
    listenToReviews((reviews) => {
        if (document.querySelector('.reviews-grid')) {
            renderReviews();
        }
    });
    
    // Load more reviews button
    const loadMoreBtn = document.getElementById('loadMoreReviews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderReviews);
    }
});
