/* ==========================================
   YACHT DETAIL - JavaScript
   ========================================== */

// Get URL parameters
function getYachtFromURL() {
    const params = new URLSearchParams(window.location.search);
    const yachtParam = params.get('yacht');
    
    if (!yachtParam) return null;
    
    // Check if it's a name (contains spaces or letters)
    if (yachtParam.includes('%20') || yachtParam.includes(' ')) {
        return decodeURIComponent(yachtParam).toLowerCase().replace(/\s+/g, '-');
    }
    
    // Otherwise it's an ID
    return yachtParam;
}

// Get yacht by name from URL
function getYachtByName(name) {
    const normalizedName = name.toLowerCase().replace(/%20|\s+/g, '-');
    const entries = Object.entries(YACHT_DETAILS);
    
    // First try exact match with normalized name
    for (const [id, yacht] of entries) {
        const normalizedYachtName = yacht.name.toLowerCase().replace(/\s+/g, '-');
        if (normalizedYachtName === normalizedName) {
            return { id, ...yacht };
        }
    }
    
    // Try original ID
    if (YACHT_DETAILS[normalizedName]) {
        return { id: normalizedName, ...YACHT_DETAILS[normalizedName] };
    }
    
    // Try partial match
    for (const [id, yacht] of entries) {
        if (yacht.name.toLowerCase().replace(/\s+/g, '-').includes(normalizedName)) {
            return { id, ...yacht };
        }
    }
    
    return null;
}

// Yacht data with full details - All 35 yachts
const YACHT_DETAILS = {
    'yacht-001': {
        name: 'Aqua Queen',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 8,
        price: 15000,
        featured: true,
        description: 'The Aqua Queen Yacht offers an unparalleled luxury experience on the waters of Goa. Perfect for intimate gatherings and celebrations.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-2.jpg']
    },
    'yacht-002': {
        name: 'White Sea',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 12,
        price: 18000,
        featured: true,
        description: 'The White Sea Yacht is a magnificent vessel perfect for larger groups seeking luxury.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck, Cockpit Area',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-6.jpg']
    },
    'yacht-003': {
        name: 'Amaze',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 13,
        price: 20000,
        featured: true,
        description: 'Experience the thrill of sailing on the Amaze yacht. Perfect for adventure seekers.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-1.jpg']
    },
    'yacht-004': {
        name: 'Sea Heiress',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 8,
        price: 22000,
        featured: true,
        description: 'The Sea Heiress offers a regal experience on the waters of Goa.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-18.jpg']
    },
    'yacht-005': {
        name: 'MV Star',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 8,
        price: 16000,
        featured: true,
        description: 'MV Star provides an exceptional yachting experience with modern amenities.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-17.jpg']
    },
    'yacht-006': {
        name: 'SeaRay R',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 10,
        price: 17000,
        featured: true,
        description: 'The SeaRay R offers comfort and style for your Goan adventure.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-33.jpg']
    },
    'yacht-007': {
        name: 'Rinker',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 6,
        price: 12000,
        description: 'Perfect for small groups seeking an intimate yacht experience.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-25.jpg']
    },
    'yacht-008': {
        name: 'Prawn',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 6,
        price: 11000,
        description: 'Compact and comfortable yacht ideal for small gatherings.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-24.jpg']
    },
    'yacht-009': {
        name: 'Bluefin',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 5,
        price: 10000,
        description: 'Elegant and efficient yacht for small group outings.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-23.jpg']
    },
    'yacht-010': {
        name: 'Manta Bay',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 8,
        price: 14000,
        description: 'Experience luxury on the Manta Bay yacht.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-4.jpg']
    },
    'yacht-011': {
        name: 'Priestess',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 8,
        price: 13000,
        description: 'The Priestess yacht offers a divine sailing experience.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-5.jpg']
    },
    'yacht-012': {
        name: 'Fantasea',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 12,
        price: 19000,
        description: 'Fantasea brings your dreams to life on the water.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck, Cockpit Area',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-3.jpg']
    },
    'yacht-013': {
        name: 'Sea Whale',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 10,
        price: 15000,
        description: 'Majestic Sea Whale for memorable voyages.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-7.jpg']
    },
    'yacht-014': {
        name: 'Desire',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 8,
        price: 14000,
        description: 'Follow your desire for adventure on the sea.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-16.jpg']
    },
    'yacht-015': {
        name: 'Sea Eagle',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 14,
        price: 22000,
        description: 'Soar like an eagle on the Sea Eagle yacht.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck, Cockpit Area',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-10.jpg']
    },
    'yacht-016': {
        name: 'Bay Elite',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 10,
        price: 16000,
        description: 'The Bay Elite offers premium yachting experience.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-31.jpg']
    },
    'yacht-017': {
        name: 'Torpedo',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 10,
        price: 18000,
        description: 'Fast and furious Torpedo for thrill seekers.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-36.jpg']
    },
    'yacht-018': {
        name: 'Solaris',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 8,
        price: 13000,
        description: 'Let Solaris illuminate your Goan adventure.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-9.jpg']
    },
    'yacht-019': {
        name: 'White Dolphin',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 16,
        price: 25000,
        description: 'Graceful White Dolphin for medium-sized groups.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck, Cockpit Area',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-34.jpg']
    },
    'yacht-020': {
        name: 'Ralston II',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 16,
        price: 24000,
        description: 'The Ralston II offers reliability and comfort.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck, Cockpit Area',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-35.jpg']
    },
    'yacht-021': {
        name: 'Pegasus',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 20,
        price: 30000,
        description: 'Fly high with Pegasus - perfect for larger celebrations.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Multiple Decks',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-12.jpg']
    },
    'yacht-022': {
        name: 'Sailing Yacht 39',
        type: 'Sailing Yacht',
        location: 'Goa, India',
        capacity: 15,
        price: 28000,
        description: 'Classic sailing experience on this beautiful yacht.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-19.jpg']
    },
    'yacht-023': {
        name: 'Ciao Bella',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 16,
        price: 26000,
        description: 'Italian elegance meets Goan beauty on Ciao Bella.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-13.jpg']
    },
    'yacht-024': {
        name: 'Majesty 56',
        type: 'Luxury Yacht',
        location: 'Goa, India',
        capacity: 20,
        price: 35000,
        description: 'True majesty on water - the Majesty 56 experience.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-15.jpg']
    },
    'yacht-025': {
        name: 'Squadron BD',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 20,
        price: 32000,
        description: 'Command your voyage on the Squadron BD.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Multiple Decks',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-29.jpg']
    },
    'yacht-026': {
        name: 'Ferretti 460',
        type: 'Luxury Yacht',
        location: 'Goa, India',
        capacity: 16,
        price: 28000,
        description: 'Italian craftsmanship meets luxury on Ferretti 460.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Sun Deck, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-22.jpg']
    },
    'yacht-027': {
        name: 'Ferretti 550',
        type: 'Luxury Yacht',
        location: 'Goa, India',
        capacity: 22,
        price: 45000,
        description: 'Premium Ferretti 550 for the discerning yacht enthusiast.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-14.jpg']
    },
    'yacht-028': {
        name: 'Ferretti FL',
        type: 'Luxury Yacht',
        location: 'Goa, India',
        capacity: 25,
        price: 50000,
        description: 'The flagship Ferretti FL for ultimate luxury.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-27.jpg']
    },
    'yacht-029': {
        name: 'Calypso',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 16,
        price: 24000,
        description: 'Let Calypso enchant you with Goan waters.',
        amenities: 'Welcome Drink, Water-bottle, Ice, Music System, Sun Deck',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-28.jpg']
    },
    'yacht-030': {
        name: 'Ahilo',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 25,
        price: 48000,
        description: 'Spacious Ahilo for grand celebrations.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-30.jpg']
    },
    'yacht-031': {
        name: 'Zia Bella',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 30,
        price: 55000,
        description: 'The beautiful Zia Bella for large gatherings.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-11.jpg']
    },
    'yacht-032': {
        name: 'Sea Comfort',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 25,
        price: 45000,
        description: 'Comfort meets style on Sea Comfort.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-32.jpg']
    },
    'yacht-033': {
        name: 'Ripples Chique',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 50,
        price: 75000,
        description: 'Premium yacht for large events and celebrations.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-20.jpg']
    },
    'yacht-034': {
        name: 'Mi Amor',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 50,
        price: 80000,
        description: 'My love - the ultimate yacht experience.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Multiple Decks, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-21.jpg']
    },
    'yacht-035': {
        name: 'Lady M',
        type: 'Yacht',
        location: 'Goa, India',
        capacity: 22,
        price: 40000,
        description: 'Lady M - elegance personified on water.',
        amenities: 'Welcome Drink, Premium Bar, Music System, Sun Deck, Air Conditioning',
        images: ['https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/service-yacht-35.jpg']
    }
};

// Default extras for all yachts
const DEFAULT_EXTRAS = [
    { name: 'Decorations', price: 'upto ₹4,000/-' },
    { name: 'Snacks & Beverages', price: 'As per requirement' },
    { name: 'DSLR Photographer', price: 'upto ₹6,000/-' },
    { name: 'Drone Videographer', price: 'upto ₹5,000/-' }
];

// Format price
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// Load yacht details
function loadYachtDetails() {
    const yachtId = getYachtFromURL();
    let yacht = getYachtByName(yachtId);
    
    // Default to MV Star if not found
    if (!yacht) {
        yacht = { id: 'yacht-005', ...YACHT_DETAILS['yacht-005'] };
    }
    
    // Store current yacht name for WhatsApp message
    window.currentYachtName = yacht.name;
    
    // Update page title
    document.getElementById('pageTitle').textContent = yacht.name + ' | Goa Yacht World';
    document.getElementById('pageDesc').content = 'Book ' + yacht.name + ' yacht in Goa. ' + yacht.capacity + ' guests capacity. ' + yacht.amenities + '.';
    
    // Main info
    document.getElementById('yachtName').textContent = yacht.name;
    document.getElementById('yachtLocation').textContent = yacht.location;
    document.getElementById('yachtDescription').textContent = yacht.description;
    document.getElementById('yachtType').textContent = yacht.type;
    document.getElementById('yachtCapacity').textContent = yacht.capacity;
    document.getElementById('yachtPrice').innerHTML = formatPrice(yacht.price) + ' <small>/hour</small>';
    document.getElementById('yachtAmenities').textContent = yacht.amenities;
    
    // Store base price for calculation
    window.basePrice = yacht.price;
    window.selectedExtras = [];
    
    // Render extras as checkboxes (async)
    getExtrasForYacht(yacht).then(extras => {
        renderExtras(extras);
        // Listen for real-time updates
        listenToExtras((updatedExtras) => {
            renderExtras(updatedExtras);
        });
    });
    
    // Render FAQ questions
    renderFAQ(getQuestionsForYacht(yacht));
    
    // Update total price display
    updateTotalPrice();
    
    // Main image
    document.getElementById('mainImage').src = yacht.images[0];
    document.getElementById('mainImage').alt = yacht.name;
    
    // Video button
    const videoBtn = document.getElementById('viewVideoBtn');
    if (yacht.video) {
        videoBtn.href = yacht.video;
        videoBtn.style.display = 'block';
    } else {
        videoBtn.style.display = 'none';
    }
    
    // Thumbnails
    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.innerHTML = yacht.images.map((img, index) => 
        '<div class="yacht-thumbnail' + (index === 0 ? ' active' : '') + '" data-src="' + img + '">' +
            '<img src="' + img + '" alt="' + yacht.name + ' ' + (index + 1) + '">' +
        '</div>'
    ).join('');
    
    // Thumbnail click handler
    document.querySelectorAll('.yacht-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            document.getElementById('mainImage').src = thumb.dataset.src;
            document.querySelectorAll('.yacht-thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

// Render FAQ questions
function renderFAQ(questions) {
    const faqContainer = document.getElementById('faqContainer');
    if (!faqContainer) return;
    
    if (questions.length === 0) {
        // Show default questions if none selected
        const defaultQuestions = getDefaultQuestions();
        faqContainer.innerHTML = defaultQuestions.map((q, i) => `
            <div class="faq-item">
                <h3><i class="fas fa-chevron-down"></i> ${q.question}</h3>
                <div class="faq-answer">
                    <p>${q.answer}</p>
                </div>
            </div>
        `).join('');
    } else {
        faqContainer.innerHTML = questions.map((q, i) => `
            <div class="faq-item">
                <h3><i class="fas fa-chevron-down"></i> ${q.question}</h3>
                <div class="faq-answer">
                    <p>${q.answer}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Re-initialize FAQ accordion for new items
    initFAQ();
}

// Render extras as checkboxes
function renderExtras(extras) {
    const extrasContainer = document.getElementById('yachtExtras');
    if (!extrasContainer) return;
    
    extrasContainer.innerHTML = extras.map((extra, index) => {
        // Determine if price is numeric or text
        const isNumericPrice = typeof extra.price === 'number' || !isNaN(parseInt(extra.price));
        const numericPrice = isNumericPrice ? parseInt(extra.price) : 0;
        const priceDisplay = !isNumericPrice || numericPrice === 0 
            ? 'As per requirement' 
            : 'upto ₹' + numericPrice.toLocaleString('en-IN') + '/-';
        return `
        <label class="extra-checkbox">
            <input type="checkbox" value="${numericPrice}" data-price-type="${isNumericPrice ? 'numeric' : 'text'}" data-name="${extra.name}" onchange="toggleExtra(this)">
            <span class="checkmark"></span>
            <span class="extra-name">${extra.name}</span>
            <span class="extra-price">${priceDisplay}</span>
        </label>
    `}).join('');
}

// Toggle extra service
function toggleExtra(checkbox) {
    const extrasTotal = document.getElementById('extrasTotal');
    const extrasTotalAmount = document.getElementById('extrasTotalAmount');
    const priceType = checkbox.dataset.priceType;
    let price = 0;
    
    if (priceType === 'text') {
        price = 0; // Don't add to total for "As per requirement"
    } else {
        price = parseInt(checkbox.value) || 0;
    }
    
    const name = checkbox.dataset.name;
    
    if (checkbox.checked) {
        window.selectedExtras.push({ name, price, priceType });
    } else {
        window.selectedExtras = window.selectedExtras.filter(e => e.name !== name);
    }
    
    // Show/hide extras total (only show if there are numeric extras selected)
    const hasNumericExtras = window.selectedExtras.some(e => e.priceType !== 'text' && e.price > 0);
    if (hasNumericExtras) {
        extrasTotal.style.display = 'flex';
        const extrasSum = window.selectedExtras.reduce((sum, e) => sum + (e.price || 0), 0);
        extrasTotalAmount.textContent = '₹' + extrasSum.toLocaleString('en-IN');
    } else {
        extrasTotal.style.display = 'none';
    }
    
    updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
    const totalPriceEl = document.getElementById('totalPrice');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const extrasTotal = document.getElementById('extrasTotal');
    const extrasTotalAmount = document.getElementById('extrasTotalAmount');
    
    if (!window.basePrice) return;
    
    // Calculate sum of only numeric extras
    const numericExtras = window.selectedExtras.filter(e => e.priceType !== 'text' && e.price > 0);
    const extrasSum = numericExtras.reduce((sum, e) => sum + (e.price || 0), 0);
    const total = window.basePrice + extrasSum;
    
    totalPriceEl.textContent = '₹' + total.toLocaleString('en-IN');
    
    // Show/hide extras total
    if (numericExtras.length > 0) {
        extrasTotal.style.display = 'flex';
        extrasTotalAmount.textContent = '₹' + extrasSum.toLocaleString('en-IN');
    } else {
        extrasTotal.style.display = 'none';
    }
    
    // Update WhatsApp message with full booking details
    const yachtName = window.currentYachtName || 'a yacht';
    const dateValue = document.getElementById('bookingDate')?.value || 'Not specified';
    const hoursValue = document.getElementById('bookingHours')?.value || 'Not specified';
    const guestsValue = document.getElementById('guestsInput')?.value || 'Not specified';
    
    let message = `Hello Goa Yacht World! 🛥️\n\n`;
    message += `I'm interested in booking:\n`;
    message += `━━━━━━━━━━━━━━━━━━\n`;
    message += `*Yacht:* ${yachtName}\n`;
    message += `*Date:* ${dateValue}\n`;
    message += `*Duration:* ${hoursValue} hours\n`;
    message += `*Guests:* ${guestsValue} pax\n`;
    
    if (window.selectedExtras.length > 0) {
        message += `\n*Add-on Services:*\n`;
        window.selectedExtras.forEach(e => {
            const priceDisplay = e.price === 0 ? 'As per requirement' : `₹${e.price.toLocaleString('en-IN')}`;
            message += `• ${e.name} - ${priceDisplay}\n`;
        });
    }
    
    const extrasTotalDisplay = numericExtras.length > 0 ? `\n*Extras Total:* ₹${extrasSum.toLocaleString('en-IN')}` : '';
    message += `\n━━━━━━━━━━━━━━━━━━\n`;
    message += `*Base Price:* ₹${window.basePrice.toLocaleString('en-IN')}/hour${extrasTotalDisplay}\n`;
    message += `*Estimated Total:* ₹${total.toLocaleString('en-IN')}\n`;
    message += `━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Please confirm availability and share booking details.`;
    
    if (bookNowBtn) {
        bookNowBtn.href = 'https://wa.me/918446275985?text=' + encodeURIComponent(message);
    }
}

// FAQ accordion
function initFAQ() {
    document.querySelectorAll('.faq-item h3').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            item.classList.toggle('active');
        });
    });
}

// Get default extras
function getDefaultExtras() {
    return [
        { name: 'Decorations', price: 4000 },
        { name: 'Snacks & Beverages', price: 0 },
        { name: 'DSLR Photographer', price: 6000 },
        { name: 'Drone Videographer', price: 5000 }
    ];
}

// Get default questions
function getDefaultQuestions() {
    return [
        { question: 'Are fuel costs included in the rental price?', answer: 'Yes, fuel costs are included for up to 3 hours of cruising within Goan waters. Additional hours may incur extra fuel charges.' },
        { question: 'What is your cancellation policy?', answer: 'Free cancellation up to 48 hours before the booking. 50% refund for cancellations within 24-48 hours. No refund for cancellations within 24 hours.' },
        { question: 'Is there a security deposit required?', answer: 'A refundable security deposit of ₹5,000 to ₹20,000 may be required depending on the yacht selected. It will be returned after the trip minus any damages.' },
        { question: 'Can we bring our own food and drinks?', answer: 'Yes, you are welcome to bring your own food and beverages. We also offer catering packages at an additional cost.' },
        { question: 'What happens if it rains on the booking day?', answer: 'In case of light rain, the yacht cruise can continue. For heavy storms, we offer free rescheduling to another convenient date.' }
    ];
}

// Get extras from Firebase first, then localStorage, then defaults
async function getExtrasForYacht(yacht) {
    try {
        if (typeof firebase !== 'undefined' && firebase.database) {
            const snapshot = await firebase.database().ref('extras').once('value');
            const data = snapshot.val();
            if (data && Array.isArray(data)) {
                // Save to localStorage for offline use
                localStorage.setItem('yacht_extras', JSON.stringify(data));
                return data.filter(e => e.active !== false);
            }
        }
    } catch (error) {
        console.log('Firebase not available for extras');
    }
    
    // Fallback to localStorage for admin-managed extras
    const adminExtras = localStorage.getItem('yacht_extras');
    
    if (adminExtras) {
        const extras = JSON.parse(adminExtras);
        // Filter only active extras
        return extras.filter(e => e.active !== false);
    }
    
    // Fallback to yacht-specific extras if available
    if (yacht.extras && yacht.extras.length > 0) {
        return yacht.extras;
    }
    
    // Last fallback to defaults
    return getDefaultExtras();
}

// Listen for real-time extras updates
function listenToExtras(callback) {
    if (typeof firebase !== 'undefined' && firebase.database) {
        firebase.database().ref('extras').on('value', snapshot => {
            const data = snapshot.val();
            if (data && Array.isArray(data)) {
                localStorage.setItem('yacht_extras', JSON.stringify(data));
                callback(data.filter(e => e.active !== false));
            }
        });
    }
}

// Get FAQ questions for yacht
function getQuestionsForYacht(yacht) {
    // First check localStorage for admin-selected questions
    const storedQuestions = localStorage.getItem('yacht_questions');
    
    if (yacht.questions && yacht.questions.length > 0) {
        // Use questions from localStorage (admin curated) filtered by yacht selection
        const allQuestions = storedQuestions ? JSON.parse(storedQuestions) : getDefaultQuestions();
        const filtered = allQuestions.filter(q => yacht.questions.includes(q.question));
        // If filtered results exist, return them
        if (filtered.length > 0) return filtered;
    }
    
    // If no questions selected for this yacht, show default questions
    return getDefaultQuestions();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadYachtDetails();
    initFAQ();
});
