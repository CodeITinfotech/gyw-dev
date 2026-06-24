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

// Google Reviews - Replace with actual Google Reviews embed or API
// Placeholder reviews (replace with live data from Google Reviews API or embed)
const GOOGLE_REVIEWS = [
    { name: "Naveen Sharma", date: "2 weeks ago", rating: 5, text: "Absolutely outstanding video shoot experience! The team was incredibly professional, creative, and attentive to detail. From concept to execution, they exceeded all expectations. Highly recommend for any yacht charter needs in Goa!", avatar: "NS" },
    { name: "Daniel Fernandes", date: "1 month ago", rating: 5, text: "Fantastic yacht experience! Clean, well-maintained vessels, friendly staff, easy booking, and affordable rates. Our day on the water was unforgettable. Will definitely book again!", avatar: "DF" },
    { name: "Manish Rajput", date: "3 weeks ago", rating: 5, text: "Five-star cruise experience, well-equipped boats, knowledgeable crew, and reasonable prices. Our day on the cruise was pure bliss. Highly recommended for anyone visiting Goa!", avatar: "MR" },
    { name: "Priya Patel", date: "1 week ago", rating: 5, text: "Amazing birthday celebration on the yacht! The team went above and beyond to make our special day perfect. Everything from decorations to food was top-notch!", avatar: "PP" },
    { name: "Amit Kumar", date: "2 months ago", rating: 5, text: "Best yacht rental service in Goa! Professional crew, beautiful yachts, and excellent customer service. Perfect for our corporate event!", avatar: "AK" },
    { name: "Sneha Gupta", date: "3 weeks ago", rating: 5, text: "Romantic sunset cruise was absolutely magical! The yacht was beautiful, champagne was included, and the views were breathtaking. Perfect for couples!", avatar: "SG" },
    { name: "Rahul Mehta", date: "1 month ago", rating: 5, text: "Great experience for our family outing. Kids loved every moment. The crew was patient with children and very accommodating. Will come back!", avatar: "RM" },
    { name: "Vikram Singh", date: "5 days ago", rating: 5, text: "Best decision to book with Goa Yacht World! The entire process from booking to the actual cruise was seamless. Highly professional team!", avatar: "VS" },
    { name: "Ananya Reddy", date: "2 weeks ago", rating: 5, text: "Dream yacht experience! We celebrated our anniversary here and it was perfect. The sunset views from the deck were absolutely stunning!", avatar: "AR" },
    { name: "Karthik Nair", date: "1 week ago", rating: 4, text: "Great service overall. The yacht was clean and well-maintained. Would have given 5 stars but wish the booking process was slightly faster.", avatar: "KN" }
];

let displayedReviews = 0;
const REVIEWS_PER_PAGE = 5;

// Yacht data - Real boats from goayachtworld.com
const DEFAULT_YACHTS = [
    { id: 'yacht-001', name: 'Aqua Queen', type: 'Yacht', location: 'Panjim', capacity: 8, price: 15000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-2.jpg'] },
    { id: 'yacht-002', name: 'White Sea', type: 'Yacht', location: 'Panjim', capacity: 12, price: 18000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-6.jpg'] },
    { id: 'yacht-003', name: 'Amaze', type: 'Yacht', location: 'Panjim', capacity: 13, price: 20000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-1.jpg'] },
    { id: 'yacht-004', name: 'Sea Heiress', type: 'Yacht', location: 'Panjim', capacity: 8, price: 22000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-18.jpg'] },
    { id: 'yacht-005', name: 'MV Star', type: 'Yacht', location: 'Panjim', capacity: 8, price: 16000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-17.jpg'] },
    { id: 'yacht-006', name: 'SeaRay R', type: 'Yacht', location: 'Panjim', capacity: 10, price: 17000, featured: true, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-33.jpg'] },
    { id: 'yacht-007', name: 'Rinker', type: 'Yacht', location: 'Panjim', capacity: 6, price: 12000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-25.jpg'] },
    { id: 'yacht-008', name: 'Prawn', type: 'Yacht', location: 'Panjim', capacity: 6, price: 11000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-24.jpg'] },
    { id: 'yacht-009', name: 'Bluefin', type: 'Yacht', location: 'Panjim', capacity: 5, price: 10000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-23.jpg'] },
    { id: 'yacht-010', name: 'Manta Bay', type: 'Yacht', location: 'Panjim', capacity: 8, price: 14000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-4.jpg'] },
    { id: 'yacht-011', name: 'Priestess', type: 'Yacht', location: 'Panjim', capacity: 8, price: 13000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-5.jpg'] },
    { id: 'yacht-012', name: 'Fantasea', type: 'Yacht', location: 'Panjim', capacity: 12, price: 19000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-3.jpg'] },
    { id: 'yacht-013', name: 'Sea Whale', type: 'Yacht', location: 'Panjim', capacity: 10, price: 15000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-7.jpg'] },
    { id: 'yacht-014', name: 'Desire', type: 'Yacht', location: 'Panjim', capacity: 8, price: 14000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-16.jpg'] },
    { id: 'yacht-015', name: 'Sea Eagle', type: 'Yacht', location: 'Panjim', capacity: 14, price: 22000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-10.jpg'] },
    { id: 'yacht-016', name: 'Bay Elite', type: 'Yacht', location: 'Panjim', capacity: 10, price: 16000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-31.jpg'] },
    { id: 'yacht-017', name: 'Torpedo', type: 'Yacht', location: 'Old Goa', capacity: 10, price: 18000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-36.jpg'] },
    { id: 'yacht-018', name: 'Solaris', type: 'Yacht', location: 'Panjim', capacity: 8, price: 13000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-9.jpg'] },
    { id: 'yacht-019', name: 'White Dolphin', type: 'Yacht', location: 'Panjim', capacity: 16, price: 25000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-34.jpg'] },
    { id: 'yacht-020', name: 'Ralston II', type: 'Yacht', location: 'Panjim', capacity: 16, price: 24000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-35.jpg'] },
    { id: 'yacht-021', name: 'Pegasus', type: 'Yacht', location: 'Panjim', capacity: 20, price: 30000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-12.jpg'] },
    { id: 'yacht-022', name: 'Sailing Yacht 39', type: 'Yacht', location: 'Panjim', capacity: 15, price: 28000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-19.jpg'] },
    { id: 'yacht-023', name: 'Ciao Bella', type: 'Yacht', location: 'Panjim', capacity: 16, price: 26000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-13.jpg'] },
    { id: 'yacht-024', name: 'Majesty 56', type: 'Yacht', location: 'Panjim', capacity: 20, price: 35000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-15.jpg'] },
    { id: 'yacht-025', name: 'Squadron BD', type: 'Yacht', location: 'Panjim', capacity: 20, price: 32000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-29.jpg'] },
    { id: 'yacht-026', name: 'Ferretti 460', type: 'Yacht', location: 'Panjim', capacity: 16, price: 28000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-22.jpg'] },
    { id: 'yacht-027', name: 'Ferretti 550', type: 'Yacht', location: 'Panjim', capacity: 22, price: 45000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-14.jpg'] },
    { id: 'yacht-028', name: 'Ferretti FL', type: 'Yacht', location: 'Panjim', capacity: 25, price: 50000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-27.jpg'] },
    { id: 'yacht-029', name: 'Calypso', type: 'Yacht', location: 'Panjim', capacity: 16, price: 24000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-28.jpg'] },
    { id: 'yacht-030', name: 'Ahilo', type: 'Yacht', location: 'Panjim', capacity: 25, price: 48000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-30.jpg'] },
    { id: 'yacht-031', name: 'Zia Bella', type: 'Yacht', location: 'Panjim', capacity: 30, price: 55000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-11.jpg'] },
    { id: 'yacht-032', name: 'Sea Comfort', type: 'Yacht', location: 'Panjim', capacity: 25, price: 45000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-32.jpg'] },
    { id: 'yacht-033', name: 'Ripples Chique', type: 'Yacht', location: 'Old Goa', capacity: 50, price: 75000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-20.jpg'] },
    { id: 'yacht-034', name: 'Mi Amor', type: 'Yacht', location: 'Old Goa', capacity: 50, price: 80000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-21.jpg'] },
    { id: 'yacht-035', name: 'Lady M', type: 'Yacht', location: 'Old Goa', capacity: 22, price: 40000, featured: false, images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-35.jpg'] }
];

// Database class
class YachtDatabase {
    constructor() {
        this.yachtsKey = 'yachts';
        this.settingsKey = 'settings';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.yachtsKey)) {
            this.seedData();
        }
        if (!localStorage.getItem(this.settingsKey)) {
            this.saveSettings({
                whatsappNumber: CONFIG.whatsappNumber,
                bookingUrl: CONFIG.bookingUrl,
                siteName: CONFIG.siteName
            });
        }
    }

    seedData() {
        localStorage.setItem(this.yachtsKey, JSON.stringify(DEFAULT_YACHTS));
    }

    getAllYachts() {
        const data = localStorage.getItem(this.yachtsKey);
        return data ? JSON.parse(data) : [];
    }

    getFeaturedYachts() {
        return this.getAllYachts().filter(y => y.featured);
    }

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
    
    grid.innerHTML = yachts.map(yacht => `
        <div class="yacht-card">
            <div class="yacht-card-img">
                <img src="${yacht.images[0]}" alt="${yacht.name}" loading="lazy">
                ${yacht.featured ? '<span class="yacht-card-badge">Featured</span>' : ''}
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
                <div class="yacht-card-actions">
                    <a href="https://wa.me/91${CONFIG.whatsappNumber}?text=Hi,%20I%20want%20to%20book%20${encodeURIComponent(yacht.name)}" target="_blank" class="btn btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> Book
                    </a>
                    <a href="tel:+91${CONFIG.whatsappNumber}" class="btn btn-primary">
                        <i class="fas fa-phone"></i>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
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
    const reviewsToShow = sortedReviews.slice(0, displayedReviews + REVIEWS_PER_PAGE);
    
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
    
    // Show/hide load more button
    if (footer) {
        footer.style.display = displayedReviews >= sortedReviews.length ? 'none' : 'block';
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

// Hero Slider with Video on Hover
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

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    renderYachts();
    renderReviews();
    initHeroSlider();
    initMobileMenu();
    
    // Load more reviews button
    const loadMoreBtn = document.getElementById('loadMoreReviews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', renderReviews);
    }
});
