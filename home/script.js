// script.js (using hardcoded dummy data instead of Supabase)

// --- Dummy Data ---
// This array replaces fetching data from Supabase for demonstration purposes.
const sellerData = [
    {
        id: 'dummy-seller-1',
        userId: 'dummy-user-1-id', // Not actively used for display in this dummy version
        companyName: 'Bayanihan Crafts Co.',
        bio: 'A collective of local artisans specializing in traditional Filipino crafts and bespoke modern designs. We connect heritage with innovation through our unique, handcrafted items, celebrating the rich culture of the Philippines.',
        contactInfo: 'email: info@bayancrafts.ph | phone: +63 917 123 4567 | fb: @BayanihanCrafts',
        services: [
            {
                id: 'svc-101',
                name: 'Custom Weaving Workshops',
                description: 'Hands-on workshops teaching traditional weaving techniques. Learn to create beautiful textiles with all materials provided.',
                priceRange: 'P1,500 - P3,000 per session',
                tags: ['workshop', 'crafts', 'weaving', 'experience', 'local']
            },
            {
                id: 'svc-102',
                name: 'Online Craft Tutorials',
                description: 'Digital courses on various crafting skills, accessible anytime, anywhere. Perfect for learning at your own pace.',
                priceRange: 'P500/course',
                tags: ['online', 'education', 'crafting', 'digital', 'diy']
            }
        ],
        products: [
            {
                id: 'prod-201',
                name: 'Handwoven Basket (Small)',
                description: 'Beautifully crafted small basket, perfect for home decor or as a unique gift.',
                price: 850.00,
                stock: 25
            },
            {
                id: 'prod-202',
                name: 'Philippine Motif Scarves',
                description: 'Elegant silk scarves with intricate indigenous designs, a blend of tradition and modern fashion.',
                price: 1200.00,
                stock: 15
            }
        ],
        externalLinks: [
            {
                id: 'link-301',
                platformName: 'Instagram',
                url: 'https://instagram.com/bayanihancrafts'
            },
            {
                id: 'link-302',
                platformName: 'Facebook',
                url: 'https://facebook.com/bayanihancrafts'
            }
        ]
    },
    {
        id: 'dummy-seller-2',
        userId: 'dummy-user-2-id',
        companyName: 'Luzon Logistics Express',
        bio: 'Your reliable partner for fast and secure package delivery across Luzon. We handle everything from small parcels to bulk cargo with utmost care and efficiency.',
        contactInfo: 'email: contact@luzonlogistics.ph | phone: +63 920 987 6543 | web: luzonlogistics.ph',
        services: [
            {
                id: 'svc-103',
                name: 'Same-Day City Delivery',
                description: 'Express delivery within Metro Manila for urgent packages. Our fastest service for time-sensitive needs.',
                priceRange: 'P250 - P800 (depending on size/distance)',
                tags: ['delivery', 'express', 'metro manila', 'logistics']
            },
            {
                id: 'svc-104',
                name: 'Provincial Cargo Transport',
                description: 'Secure and insured transport of goods to any province in Luzon. Ideal for businesses and personal large items.',
                priceRange: 'Starts at P1,500',
                tags: ['cargo', 'provincial', 'transport', 'logistics']
            }
        ],
        products: [], // This seller offers no products
        externalLinks: [
            {
                id: 'link-303',
                platformName: 'Website',
                url: 'https://luzonlogistics.ph'
            }
        ]
    },
    {
        id: 'dummy-seller-3',
        userId: 'dummy-user-3-id',
        companyName: 'Island Eats Catering',
        bio: 'Bringing the authentic flavors of the Philippine islands to your events. Specializing in traditional dishes and modern culinary delights, perfect for any gathering, big or small.',
        contactInfo: 'email: events@islandeats.ph | phone: +63 939 111 2222',
        services: [
            {
                id: 'svc-105',
                name: 'Event Catering Packages',
                description: 'Customizable menus for weddings, birthdays, corporate events, and more. Full-service catering tailored to your needs.',
                priceRange: 'P800 - P2,500/head',
                tags: ['catering', 'events', 'food', 'party', 'filipino cuisine']
            },
            {
                id: 'svc-106',
                name: 'Meal Prep Delivery',
                description: 'Healthy and delicious pre-cooked meals delivered weekly. Perfect for busy individuals or families.',
                priceRange: 'P3,500/week (5 meals)',
                tags: ['meal prep', 'healthy', 'delivery', 'weekly']
            }
        ],
        products: [
            {
                id: 'prod-203',
                name: 'Adobo Flakes Jar',
                description: 'Crispy adobo flakes, perfect as a topping, snack, or addition to your favorite rice dish.',
                price: 280.00,
                stock: 50
            },
            {
                id: 'prod-204',
                name: 'Gourmet Tuyo Paste',
                description: 'Spicy gourmet tuyo (dried fish) paste, a Filipino breakfast staple.',
                price: 220.00,
                stock: 30
            }
        ],
        externalLinks: [] // This seller has no external links
    },
    {
        id: 'dummy-seller-4',
        userId: 'dummy-user-4-id',
        companyName: 'Visayas Veggie Hub',
        bio: 'Your fresh source for organic vegetables straight from Visayan farms. Committed to sustainable farming practices and promoting healthy eating in the community.',
        contactInfo: 'email: veggiehub@example.com | phone: +63 945 333 4444 | fb: @VisayasVeggieHub',
        services: [
            {
                id: 'svc-107',
                name: 'Weekly Organic Vegetable Boxes',
                description: 'A curated selection of fresh, seasonal organic vegetables delivered to your door every week.',
                priceRange: 'P700/box',
                tags: ['organic', 'vegetables', 'subscription', 'farm fresh', 'visayas']
            },
            {
                id: 'svc-108',
                name: 'Farm Visits & Tours',
                description: 'Educational tours of our organic farms. Learn about sustainable agriculture and pick your own produce!',
                priceRange: 'P300/person',
                tags: ['farm', 'tour', 'education', 'experience']
            }
        ],
        products: [
            {
                id: 'prod-205',
                name: 'Organic Kale Bunch',
                description: 'Freshly harvested organic kale, rich in nutrients.',
                price: 120.00,
                stock: 70
            },
            {
                id: 'prod-206',
                name: 'Heirloom Tomatoes (1kg)',
                description: 'Sweet and juicy heirloom tomatoes, grown with traditional methods for superior flavor.',
                price: 250.00,
                stock: 30
            }
        ],
        externalLinks: [
            {
                id: 'link-304',
                platformName: 'Facebook',
                url: 'https://facebook.com/visayasveggiehub'
            }
        ]
    }
];

// --- End of Dummy Data ---


// Get elements for the modal
const sellerDetailModal = document.getElementById('sellerDetailModal');
const modalContent = document.getElementById('modalContent');
const modalCompanyName = document.getElementById('modalCompanyName');
const modalBio = document.getElementById('modalBio');
const modalContactInfo = document.getElementById('modalContactInfo');
const modalServices = document.getElementById('modalServices');
const modalProducts = document.getElementById('modalProducts');
const modalExternalLinks = document.getElementById('modalExternalLinks');

// Variable to store the currently active filter tag
let activeTagFilter = '';

// UI element references (Authentication related - non-functional in this dummy version)
const authStatusDiv = document.getElementById('authStatus');
const authActionsDiv = document.getElementById('authActions');
const showLoginBtn = document.getElementById('showLoginBtn');
const showSignupBtn = document.getElementById('showSignupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authFormsDiv = document.getElementById('authForms');
const loginFormDiv = document.getElementById('loginForm');
const signupFormDiv = document.getElementById('signupForm');
const messageContainer = document.getElementById('messageContainer');

// Seller Profile and Service forms (non-functional in this dummy version)
const profileCreationSection = document.getElementById('profileCreationSection');
const addServiceSection = document.getElementById('addServiceSection');


// --- Non-functional Auth Placeholder Functions ---
// These functions exist for UI consistency but do not interact with a backend.
function showMessage(message, type = 'info') {
    console.log(`[${type.toUpperCase()}]: ${message}`);
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `p-3 rounded-lg mt-4 ${type === 'error' ? 'bg-red-100 text-red-700' : type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`;
    }
}

function showLoginForm() {
    authFormsDiv.classList.remove('hidden');
    loginFormDiv.classList.remove('hidden');
    signupFormDiv.classList.add('hidden');
    authActionsDiv.classList.add('hidden');
    showMessage('Login form is for display only in this demo.', 'info');
}

function showSignupForm() {
    authFormsDiv.classList.remove('hidden');
    signupFormDiv.classList.remove('hidden');
    loginFormDiv.classList.add('hidden');
    authActionsDiv.classList.add('hidden');
    showMessage('Sign Up form is for display only in this demo.', 'info');
}

function updateAuthUI() {
    // In this dummy version, we always show "Not logged in"
    // and the Login/Signup buttons by default.
    authStatusDiv.innerHTML = `Not logged in.`;
    authActionsDiv.classList.remove('hidden');
    showLoginBtn.classList.remove('hidden');
    showSignupBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    authFormsDiv.classList.add('hidden'); // Keep forms hidden until clicked
    profileCreationSection.classList.add('hidden'); // Hide profile creation
    addServiceSection.classList.add('hidden'); // Hide add service
    messageContainer.textContent = ''; // Clear message
}

// --- Dummy Data Fetching (mimics real data fetching but uses local array) ---
function fetchAllSellerData() {
    // In a real app, this would be an async call to Supabase.
    // Here, we just use the pre-defined dummyData.
    renderSellerCards();
    renderTagsSidebar();
}


// Your existing rendering and filtering functions (adapted for dummy data)
/**
 * Renders all seller profile cards on the page.
 */
function renderSellerCards() {
    const container = document.getElementById('sellerCardsContainer');
    container.innerHTML = ''; // Clear existing cards

    sellerData.forEach(seller => {
        const card = document.createElement('div');
        card.id = `seller-card-${seller.id}`;
        card.className = `bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300
                         transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col items-center
                         text-center border border-gray-200`;
        card.onclick = () => openModal(seller.id);

        const allServiceTags = [...new Set(seller.services.flatMap(svc => svc.tags || []))];
        const displayedTags = allServiceTags.slice(0, 3);
        const tagsHtml = displayedTags.map(tag => `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-1 mb-1">#${tag}</span>`).join('');
        const moreTags = allServiceTags.length > 3 ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mr-1 mb-1">...</span>` : '';

        card.innerHTML = `
            <h2 class="text-2xl font-semibold text-gray-800 mb-2">${seller.companyName}</h2>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">${seller.bio}</p>
            <div class="flex flex-wrap justify-center mb-4">
                ${tagsHtml}${moreTags}
            </div>
            <button class="mt-auto px-5 py-2 bg-blue-500 text-white font-medium rounded-lg
                           hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:ring-opacity-50 transition duration-200 ease-in-out shadow-md">
                View Services
            </button>
        `;
        container.appendChild(card);
    });
    filterSellers();
}

/**
 * Opens the modal and populates it with seller details.
 * @param {string} sellerId - The ID of the seller to display.
 */
function openModal(sellerId) {
    const seller = sellerData.find(s => s.id === sellerId);
    if (!seller) {
        console.error("Seller not found:", sellerId);
        return;
    }

    modalCompanyName.textContent = seller.companyName;
    modalBio.textContent = seller.bio;
    modalContactInfo.textContent = seller.contactInfo;

    modalServices.innerHTML = '';
    modalProducts.innerHTML = '';
    modalExternalLinks.innerHTML = '';

    if (seller.services.length > 0) {
        seller.services.forEach(service => {
            const li = document.createElement('li');
            li.className = 'mb-1';
            const serviceTagsHtml = (service.tags && service.tags.length > 0) ?
                `<div class="flex flex-wrap mt-1">${service.tags.map(tag => `<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mr-1 mb-1">#${tag}</span>`).join('')}</div>` : '';

            li.innerHTML = `
                <span class="font-medium">${service.name}:</span> ${service.description} (${service.priceRange})
                ${serviceTagsHtml}
            `;
            modalServices.appendChild(li);
        });
    } else {
        modalServices.innerHTML = '<li>No services listed yet.</li>';
    }

    if (seller.products.length > 0) {
        seller.products.forEach(product => {
            const li = document.createElement('li');
            li.className = 'mb-1';
            li.innerHTML = `<span class="font-medium">${product.name}:</span> ${product.description} (<span class="text-green-600">$${product.price.toFixed(2)}</span>, Stock: ${product.stock})`;
            modalProducts.appendChild(li);
        });
    } else {
        modalProducts.innerHTML = '<li>No products listed yet.</li>';
    }

    if (seller.externalLinks.length > 0) {
        seller.externalLinks.forEach(link => {
            const li = document.createElement('li');
            li.className = 'mb-1';
            li.innerHTML = `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">
                                <span class="font-medium">${link.platformName}:</span> ${link.url}
                           </a>`;
            modalExternalLinks.appendChild(li);
        });
    } else {
        modalExternalLinks.innerHTML = '<li>No external links provided.</li>';
    }

    sellerDetailModal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('opacity-0', 'scale-95');
        modalContent.classList.add('opacity-100', 'scale-100');
    }, 10);
}

/**
 * Closes the seller detail modal.
 */
function closeModal() {
    modalContent.classList.remove('opacity-100', 'scale-100');
    modalContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        sellerDetailModal.classList.add('hidden');
    }, 300);
}

/**
 * Filters seller cards based on search input and the active tag filter.
 */
function filterSellers() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    const cards = document.getElementById('sellerCardsContainer').children;

    Array.from(cards).forEach(card => {
        const sellerId = card.id.replace('seller-card-', '');
        const seller = sellerData.find(s => s.id === sellerId);

        if (!seller) {
            card.style.display = 'none';
            return;
        }

        const companyName = seller.companyName.toLowerCase();
        const bio = seller.bio.toLowerCase();
        const servicesText = seller.services.map(s => s.name.toLowerCase() + ' ' + s.description.toLowerCase()).join(' ');
        const productsText = seller.products.map(p => p.name.toLowerCase() + ' ' + p.description.toLowerCase()).join(' ');

        const matchesSearch = searchTerm === '' ||
                              companyName.includes(searchTerm) ||
                              bio.includes(searchTerm) ||
                              servicesText.includes(searchTerm) ||
                              productsText.includes(searchTerm);

        const allServiceTags = new Set(seller.services.flatMap(svc => svc.tags || []).map(tag => tag.toLowerCase()));
        const matchesTag = activeTagFilter === '' || allServiceTags.has(activeTagFilter);

        if (matchesSearch && matchesTag) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Generates and displays the clickable tags in the sidebar.
 */
function renderTagsSidebar() {
    const tagListContainer = document.getElementById('tagList');
    tagListContainer.innerHTML = '';

    const allTags = new Set();
    sellerData.forEach(seller => {
        seller.services.forEach(service => {
            if (service.tags) {
                service.tags.forEach(tag => allTags.add(tag.toLowerCase()));
            }
        });
    });

    const sortedTags = Array.from(allTags).sort();

    const allTagElement = document.createElement('li');
    allTagElement.className = `px-3 py-2 rounded-lg cursor-pointer text-gray-800 font-medium
                               hover:bg-blue-100 hover:text-blue-700 transition duration-200 ease-in-out
                               ${activeTagFilter === '' ? 'bg-blue-200 text-blue-800' : ''}`;
    allTagElement.textContent = "All Services";
    allTagElement.onclick = () => {
        activeTagFilter = '';
        updateTagSelectionUI();
        filterSellers();
    };
    tagListContainer.appendChild(allTagElement);


    sortedTags.forEach(tag => {
        const li = document.createElement('li');
        li.className = `px-3 py-2 rounded-lg cursor-pointer text-gray-800 font-medium
                       hover:bg-blue-100 hover:text-blue-700 transition duration-200 ease-in-out
                       ${activeTagFilter === tag ? 'bg-blue-200 text-blue-800' : ''}`;
        li.textContent = `#${tag}`;
        li.onclick = () => {
            activeTagFilter = (activeTagFilter === tag) ? '' : tag;
            updateTagSelectionUI();
            filterSellers();
        };
        tagListContainer.appendChild(li);
    });
}

/**
 * Updates the UI to show which tag is currently selected in the sidebar.
 */
function updateTagSelectionUI() {
    const tagElements = document.querySelectorAll('#tagList li');
    tagElements.forEach(li => {
        const tagText = li.textContent.startsWith('#') ? li.textContent.substring(1).toLowerCase() : li.textContent.toLowerCase();
        if (activeTagFilter === tagText || (activeTagFilter === '' && tagText === 'all services')) {
            li.classList.add('bg-blue-200', 'text-blue-800');
            li.classList.remove('bg-blue-100', 'text-blue-700');
        } else {
            li.classList.remove('bg-blue-200', 'text-blue-800');
        }
    });
}


// DOMContentLoaded Listener
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to search input field
    document.getElementById('searchInput').addEventListener('keyup', filterSellers);

    // Attach event listeners for auth action buttons (now just for UI state change, no backend)
    if (showLoginBtn) showLoginBtn.addEventListener('click', showLoginForm);
    if (showSignupBtn) showSignupBtn.addEventListener('click', showSignupForm);
    // Logout button won't be visible in this dummy version, but keeping the listener for completeness
    if (logoutBtn) logoutBtn.addEventListener('click', () => {
        updateAuthUI(); // Just reset auth UI state
        showMessage('You have been "logged out" (dummy action).', 'info');
    });

    // Manually trigger the initial rendering with dummy data
    updateAuthUI(); // Initialize auth UI (will show "Not logged in")
    fetchAllSellerData(); // Populate cards and tags with dummy data

    // Close modal when clicking outside of the content
    sellerDetailModal.addEventListener('click', (event) => {
        if (event.target === sellerDetailModal) {
            closeModal();
        }
    });
});
