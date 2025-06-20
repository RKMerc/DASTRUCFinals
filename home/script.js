// script.js

// Supabase Client Initialization - IMPORTANT: Replace with your actual keys
const SUPABASE_URL = 'https://pfvrfndyqxyhowcdjslv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmdnJmbmR5cXh5aG93Y2Rqc2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTQ5MjgsImV4cCI6MjA2NTk3MDkyOH0.knM9HNGZl_kmPlJnBL4yfCeN4timnuuAT9aEBtTUc-o';

// Corrected: Supabase should be capitalized as it comes from the CDN.
const supabase = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global variable to store current user session
let activeUser = null;

// This sellerData will now be dynamically populated from Supabase
let sellerData = []; // Initialize as an empty array, will be filled by fetchAllSellerData()


// Get elements for the modal (existing)
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

// New UI element references (added)
const authStatusDiv = document.getElementById('authStatus');
const authFormsDiv = document.getElementById('authForms');
const loginFormDiv = document.getElementById('loginForm');
const signupFormDiv = document.getElementById('signupForm');
const loginEmailInput = document.getElementById('loginEmail');
const loginPasswordInput = document.getElementById('loginPassword');
const signupEmailInput = document.getElementById('signupEmail');
const signupPasswordInput = document.getElementById('signupPassword');
const messageContainer = document.getElementById('messageContainer');

const profileCreationSection = document.getElementById('profileCreationSection');
const profileCompanyNameInput = document.getElementById('profileCompanyName');
const profileBioInput = document.getElementById('profileBio');
const profileContactInfoInput = document.getElementById('profileContactInfo');
const profileMessageDiv = document.getElementById('profileMessage');

const addServiceSection = document.getElementById('addServiceSection');
const serviceNameInput = document.getElementById('serviceName');
const serviceDescriptionInput = document.getElementById('serviceDescription');
const servicePriceRangeInput = document.getElementById('servicePriceRange'); // Corrected typo here
const serviceTagsInput = document.getElementById('serviceTags');
const serviceMessageDiv = document.getElementById('serviceMessage');


// Supabase Authentication Functions (existing)
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
    }
}

// Function to display messages to the user (existing)
function showMessage(message, type = 'info') {
    console.log(`[${type.toUpperCase()}]: ${message}`);
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `p-3 rounded-lg mt-4 ${type === 'error' ? 'bg-red-100 text-red-700' : type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`;
    }
}


// New UI State Management Functions (added)
/**
 * Handles showing the login form and hiding others.
 */
function showLoginForm() {
    loginFormDiv.classList.remove('hidden');
    signupFormDiv.classList.add('hidden');
    messageContainer.textContent = ''; // Clear messages
}

/**
 * Handles showing the sign-up form and hiding others.
 */
function showSignupForm() {
    signupFormDiv.classList.remove('hidden');
    loginFormDiv.classList.add('hidden');
    messageContainer.textContent = ''; // Clear messages
}

/**
 * Handles user login form submission.
 */
async function handleLogin() {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    await signIn(email, password);
}

/**
 * Handles user sign-up form submission.
 */
async function handleSignUp() {
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;
    await signUp(email, password);
}


// Supabase Data Fetching Functions (existing)
/**
 * Fetches all seller data from Supabase and updates the global sellerData array.
 * This function will also trigger rendering of cards and tags.
 */
async function fetchAllSellerData() {
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

    sellerData = profiles.map(profile => ({
        id: profile.id,
        userId: profile.user_id,
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
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching current user\'s seller profile:', error.message);
        return null;
    }

    if (data) {
        console.log('Current user\'s seller profile:', data);
        return data;
    } else {
        console.log('Current user does not have a seller profile yet.');
        return null;
    }
}


// New Seller Profile and Service Management Functions (added)
/**
 * Creates a new seller profile for the logged-in user.
 */
async function createSellerProfile(profileData) {
    if (!activeUser) {
        profileMessageDiv.textContent = 'Error: You must be logged in to create a profile.';
        profileMessageDiv.className = 'mt-4 text-center text-red-700';
        return;
    }
    const { data, error } = await supabase
        .from('seller_profiles')
        .insert({
            user_id: activeUser.id,
            company_name: profileData.companyName,
            bio: profileData.bio,
            contact_info: profileData.contactInfo
        })
        .select();

    if (error) {
        console.error('Error creating profile:', error.message);
        profileMessageDiv.textContent = 'Error creating profile: ' + error.message;
        profileMessageDiv.className = 'mt-4 text-center text-red-700';
    } else {
        console.log('Profile created:', data);
        profileMessageDiv.textContent = 'Seller profile created successfully!';
        profileMessageDiv.className = 'mt-4 text-center text-green-700';
        // Clear form
        profileCompanyNameInput.value = '';
        profileBioInput.value = '';
        profileContactInfoInput.value = '';

        await fetchAllSellerData();
        updateAuthUI(); // Re-evaluate and update UI after profile creation
    }
}

/**
 * Handles seller profile creation form submission.
 */
async function handleCreateSellerProfile() {
    const companyName = profileCompanyNameInput.value;
    const bio = profileBioInput.value;
    const contactInfo = profileContactInfoInput.value;

    if (!companyName) {
        profileMessageDiv.textContent = 'Company Name is required!';
        profileMessageDiv.className = 'mt-4 text-center text-red-700';
        return;
    }

    await createSellerProfile({ companyName, bio, contactInfo });
}

/**
 * Adds a new service to the current user's seller profile.
 */
async function addServiceToProfile(serviceData) {
    if (!activeUser) {
        serviceMessageDiv.textContent = 'Error: You must be logged in to add a service.';
        serviceMessageDiv.className = 'mt-4 text-center text-red-700';
        return;
    }

    const { data: sellerProfile, error: profileError } = await supabase
        .from('seller_profiles')
        .select('id')
        .eq('user_id', activeUser.id)
        .single();

    if (profileError || !sellerProfile) {
        console.error('Error fetching seller profile for current user:', profileError?.message || 'Profile not found.');
        serviceMessageDiv.textContent = 'Error: Could not find your seller profile. Please create one first.';
        serviceMessageDiv.className = 'mt-4 text-center text-red-700';
        return;
    }

    const { data, error } = await supabase
        .from('services')
        .insert({
            seller_profile_id: sellerProfile.id,
            name: serviceData.name,
            description: serviceData.description,
            price_range: serviceData.priceRange,
            tags: serviceData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
        })
        .select();

    if (error) {
        console.error('Error adding service:', error.message);
        serviceMessageDiv.textContent = 'Error adding service: ' + error.message;
        serviceMessageDiv.className = 'mt-4 text-center text-red-700';
    } else {
        console.log('Service added:', data);
        serviceMessageDiv.textContent = 'Service added successfully!';
        serviceMessageDiv.className = 'mt-4 text-center text-green-700';
        // Clear form
        serviceNameInput.value = '';
        serviceDescriptionInput.value = '';
        servicePriceRangeInput.value = '';
        serviceTagsInput.value = '';

        await fetchAllSellerData(); // Re-fetch all data to ensure new service appears
    }
}

/**
 * Handles add service form submission.
 */
async function handleAddService() {
    const name = serviceNameInput.value;
    const description = serviceDescriptionInput.value;
    const priceRange = servicePriceRangeInput.value;
    const tags = serviceTagsInput.value;

    if (!name || !description || !priceRange) {
        serviceMessageDiv.textContent = 'Service Name, Description, and Price Range are required!';
        serviceMessageDiv.className = 'mt-4 text-center text-red-700';
        return;
    }

    await addServiceToProfile({ name, description, priceRange, tags });
}


// MODIFIED updateAuthUI function (now properly handles UI visibility based on auth and profile existence)
async function updateAuthUI() {
    if (activeUser) {
        authStatusDiv.innerHTML = `Logged in as: <span class="font-semibold">${activeUser.email}</span> (<button onclick="signOut()" class="text-blue-600 hover:underline">Logout</button>)`;
        authFormsDiv.classList.add('hidden'); // Hide login/signup forms

        const userProfile = await fetchSellerProfileForCurrentUser(); // Check if user has a profile
        if (userProfile) {
            profileCreationSection.classList.add('hidden'); // Hide profile creation if profile exists
            addServiceSection.classList.remove('hidden'); // Show add service section
        } else {
            profileCreationSection.classList.remove('hidden'); // Show profile creation
            addServiceSection.classList.add('hidden'); // Hide add service section
        }
    } else {
        authStatusDiv.innerHTML = `Not logged in.`;
        authFormsDiv.classList.remove('hidden'); // Show login/signup forms
        loginFormDiv.classList.remove('hidden'); // Default to showing login form
        signupFormDiv.classList.add('hidden'); // Hide signup initially
        profileCreationSection.classList.add('hidden'); // Hide profile creation
        addServiceSection.classList.add('hidden'); // Hide add service
        messageContainer.textContent = ''; // Clear message when logging out
    }
}


// Your existing rendering and filtering functions (no changes here, they use `sellerData` which is now populated from Supabase)
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


// Modified DOMContentLoaded Listener (existing, but re-checked against latest HTML and logic)
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to search input field
    document.getElementById('searchInput').addEventListener('keyup', filterSellers);

    // Supabase auth state change listener
    supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            activeUser = session.user;
            console.log('Auth state changed: Logged in', activeUser);
        } else {
            activeUser = null;
            console.log('Auth state changed: Logged out');
        }
        updateAuthUI(); // Always update auth UI
        fetchAllSellerData(); // Always fetch all seller data
    });

    // Manually trigger the initial auth state check and data fetch
    // This is important for when the page first loads and a user might already be logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            activeUser = session.user;
        } else {
            activeUser = null;
        }
        updateAuthUI();
        fetchAllSellerData();
    });

    // Close modal when clicking outside of the content
    sellerDetailModal.addEventListener('click', (event) => {
        if (event.target === sellerDetailModal) {
            closeModal();
        }
    });
});