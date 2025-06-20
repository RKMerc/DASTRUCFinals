// script.js
const SUPABASE_URL = 'https://pfvrfndyqxyhowcdjslv.supabase.co'; // From Supabase API Settings
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdnJmbmR5cXh5aG93Y2Rqc2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTQ5MjgsImV4cCI6MjA2NTk3MDkyOH0.knM9HNGZl_kmPlJnBL4yfCeN4timnuuAT9aEBtTUc-o'; // From Supabase API Settings
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Data mirroring the Python classes (simplified for client-side HTML)
// Global variable to store current user session
let activeUser = null;

// This sellerData will now be dynamically populated from Supabase
let sellerData = []; // Initialize as an empty array, will be filled by fetchAllSellerData()


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


// Supabase Authentication Functions
/**
 * Handles user sign-up with email and password.
 * @param {string} email
 * @param {string} password
 */
async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        console.error('Sign Up Error:', error.message);
        showMessage('Error signing up: ' + error.message, 'error');
    } else {
        console.log('User signed up:', data.user);
        showMessage('Sign up successful! Please check your email to confirm your account.', 'success');
        // Optionally, you might want to automatically sign in or redirect
    }
    return { data, error };
}

/**
 * Handles user sign-in with email and password.
 * @param {string} email
 * @param {string} password
 */
async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error('Sign In Error:', error.message);
        showMessage('Error signing in: ' + error.message, 'error');
    } else {
        console.log('User signed in:', data.user);
        showMessage('Welcome back!', 'success');
        // The onAuthStateChange listener will handle fetching data and updating UI
    }
    return { data, error };
}

/**
 * Handles user sign-out.
 */
async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Sign Out Error:', error.message);
        showMessage('Error signing out: ' + error.message, 'error');
    } else {
        console.log('User signed out.');
        showMessage('You have been logged out.', 'info');
        // The onAuthStateChange listener will handle clearing data and updating UI
    }
}

// Placeholder for a function to display messages to the user (e.g., in a div or modal)
function showMessage(message, type = 'info') {
    console.log(`[${type.toUpperCase()}]: ${message}`);
    // Implement actual UI display here (e.g., update a message div)
    const messageContainer = document.getElementById('messageContainer'); // You'd add this div in your HTML
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `p-3 rounded-lg mt-4 ${type === 'error' ? 'bg-red-100 text-red-700' : type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`;
    }
}


// Supabase Data Fetching Functions
/**
 * Fetches all seller data from Supabase and updates the global sellerData array.
 * This function will also trigger rendering of cards and tags.
 */
async function fetchAllSellerData() {
    // Select all seller profiles and their related services, products, and links
    const { data: profiles, error: profilesError } = await supabase
        .from('seller_profiles')
        .select(`
            id,
            user_id,
            company_name,
            bio,
            contact_info,
            services ( id, name, description, price_range, tags ),
            products ( id, name, description, price, stock ),
            external_links ( id, platform_name, url )
        `);

    if (profilesError) {
        console.error('Error fetching seller profiles:', profilesError.message);
        showMessage('Error loading seller profiles.', 'error');
        return;
    }

    // Transform data to match your existing sellerData structure
    // Ensure nested arrays are correctly handled (Supabase will return them as arrays)
    sellerData = profiles.map(profile => ({
        id: profile.id,
        userId: profile.user_id, // Store Supabase user ID for ownership checks
        companyName: profile.company_name,
        bio: profile.bio,
        contactInfo: profile.contact_info,
        services: profile.services || [],
        products: profile.products || [],
        externalLinks: profile.external_links || []
    }));

    renderSellerCards();
    renderTagsSidebar();
}

/**
 * Fetches the seller profile for the currently logged-in user.
 * This would be used to determine if a user needs to create a profile or can add services.
 */
async function fetchSellerProfileForCurrentUser() {
    if (!activeUser) {
        console.log("No active user to fetch seller profile for.");
        return null;
    }
    const { data, error } = await supabase
        .from('seller_profiles')
        .select('*')
        .eq('user_id', activeUser.id)
        .single(); // Use .single() as each user should have only one profile

    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
        console.error('Error fetching current user\'s seller profile:', error.message);
        return null;
    }

    if (data) {
        console.log('Current user\'s seller profile:', data);
        // You might store this profile data globally if needed, or just use it to update UI
        return data;
    } else {
        console.log('Current user does not have a seller profile yet.');
        return null;
    }
}


// Helper function to update UI elements related to authentication status
// You will need to implement the actual HTML elements for login, signup, logout, etc.
function updateAuthUI() {
    const authStatusDiv = document.getElementById('authStatus'); // Example div for status messages
    if (authStatusDiv) {
        if (activeUser) {
            authStatusDiv.innerHTML = `Logged in as: ${activeUser.email} (<button onclick="signOut()" class="text-blue-500 hover:underline">Logout</button>)`;
            // Add logic here to show elements for profile creation/editing, add service, etc.
            // Example: document.getElementById('createProfileSection').classList.remove('hidden');
        } else {
            authStatusDiv.innerHTML = `Not logged in. <button onclick="showLoginForm()" class="text-blue-500 hover:underline">Login</button> or <button onclick="showSignupForm()" class="text-blue-500 hover:underline">Sign Up</button>`;
            // Add logic here to hide elements for profile creation/editing, add service, etc.
            // Example: document.getElementById('createProfileSection').classList.add('hidden');
        }
    }
}


// Your existing rendering and filtering functions
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
                <span class="font-medium">${service.name}:</span> ${service.description} (<span class="text-blue-600">${service.priceRange}</span>)
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


// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Listen for Supabase auth state changes immediately
    supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            activeUser = session.user;
            console.log('Auth state changed: Logged in', activeUser);
            // Fetch the current user's seller profile (or check if they have one)
            // This is useful for showing "create profile" or "add service" options
            fetchSellerProfileForCurrentUser();
        } else {
            activeUser = null;
            console.log('Auth state changed: Logged out');
            // Clear any user-specific data and re-fetch all public data
        }
        // Always update auth UI regardless of login state
        updateAuthUI();
        // Always fetch all seller data (either public or user-specific if a profile exists)
        fetchAllSellerData();
    });

    // Attach event listeners to search input field
    document.getElementById('searchInput').addEventListener('keyup', filterSellers);
});

// Close modal when clicking outside of the content
sellerDetailModal.addEventListener('click', (event) => {
    if (event.target === sellerDetailModal) {
        closeModal();
    }
});