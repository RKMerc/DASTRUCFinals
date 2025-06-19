// script.js

// Data mirroring the Python classes (simplified for client-side HTML)
const sellerData = [
    {
        id: "S_PROF001",
        companyName: "Alice's Handcrafted Goods",
        bio: "Passionate artisan specializing in unique handmade jewelry and custom designs. Every piece is crafted with love and attention to detail, perfect for special gifts or personal treasures.",
        contactInfo: "contact@alicecrafts.com | +63 917 123 4567",
        services: [
            { name: "Local Delivery", description: "Fast and reliable delivery within Bacoor and nearby areas.", priceRange: "$5 - $15", tags: ["delivery", "local", "quick"] },
            { name: "Jewelry Design Consultation", description: "Personalized consultation for custom jewelry designs, bringing your unique ideas to life.", priceRange: "$50/hour", tags: ["consultation", "jewelry", "custom"] },
            { name: "Repair Services", description: "Expert repair for all types of jewelry, ensuring your cherished pieces last a lifetime.", priceRange: "Starts at $20", tags: ["repair", "jewelry", "maintenance"] }
        ],
        products: [
            { name: "Silver Pendant Necklace", description: "Hand-forged silver pendant with a unique design, hypoallergenic.", price: 75.00, stock: 10 },
            { name: "Gemstone Drop Earrings", description: "Elegant earrings featuring natural gemstones, available in various stone types.", price: 45.50, stock: 25 },
            { name: "Custom Engraved Bracelets", description: "Personalized bracelets with your chosen text or design.", price: 60.00, stock: 15 }
        ],
        externalLinks: [
            { platformName: "Shopee Store", url: "https://shopee.ph/alices_crafts" },
            { platformName: "Lazada Shop", url: "https://www.lazada.com.ph/shop/alices_crafts" },
            { platformName: "Personal Website", url: "https://www.alicecrafts.com" }
        ]
    },
    {
        id: "S_PROF002",
        companyName: "Tech Solutions Hub",
        bio: "Your go-to for all tech support and gadget repair needs. We offer fast, reliable, and affordable solutions for homes and businesses.",
        contactInfo: "support@techsol.com | +63 920 987 6543",
        services: [
            { name: "Computer Repair", description: "Diagnostic and repair for laptops and desktops, including hardware and software issues.", priceRange: "$30 - $150", tags: ["repair", "tech support", "computer"] },
            { name: "Network Setup", description: "Professional home and office network installation and configuration.", priceRange: "$80 - $200", tags: ["network", "installation", "setup"] },
            { name: "Software Installation", description: "Assistance with operating system and application installations.", priceRange: "$25/software", tags: ["software", "installation", "tech support"] }
        ],
        products: [
            { name: "Wireless Routers", description: "High-speed Wi-Fi routers for seamless internet connectivity.", price: 120.00, stock: 50 },
            { name: "USB-C Hubs", description: "Multi-port USB-C hubs for expanded device connectivity.", price: 35.00, stock: 100 }
        ],
        externalLinks: [
            { platformName: "Website", url: "https://www.techsol.com" },
            { platformName: "Facebook Page", url: "https://facebook.com/techsolutionshub" }
        ]
    },
    {
        id: "S_PROF003",
        companyName: "Green Thumb Garden Supply",
        bio: "Providing a wide range of plants, gardening tools, and expert advice for your green projects. Grow your dream garden with us!",
        contactInfo: "info@greenthumb.ph | +63 998 112 2334",
        services: [
            { name: "Garden Consultation", description: "On-site garden planning and advice from experienced horticulturists.", priceRange: "$70/visit", tags: ["consultation", "garden", "planning"] },
            { name: "Planting Services", description: "Assistance with planting and landscaping for small to medium gardens.", priceRange: "Quotation based", tags: ["planting", "landscaping", "garden"] }
        ],
        products: [
            { name: "Organic Potting Mix", description: "Premium organic potting mix for healthy plant growth.", price: 15.00, stock: 200 },
            { name: "Assorted Succulents", description: "Variety of easy-to-care-for succulent plants.", price: 8.00, stock: 150 },
            { name: "Ergonomic Garden Tools Set", description: "Durable and comfortable tools for all your gardening needs.", price: 95.00, stock: 30 }
        ],
        externalLinks: [
            { platformName: "Instagram", url: "https://instagram.com/greenthumbgardens" },
            { platformName: "Lazada Shop", url: "https://www.lazada.com.ph/shop/greenthumb" }
        ]
    },
    {
        id: "S_PROF004",
        companyName: "Pet Care Paradise",
        bio: "Your one-stop shop for pet food, accessories, grooming services, and pet training. We love your pets as much as you do!",
        contactInfo: "woof@petcare.com | +63 905 445 5667",
        services: [
            { name: "Pet Grooming", description: "Full grooming services for dogs and cats, including bathing, hair cut, and nail trimming.", priceRange: "$30 - $80", tags: ["grooming", "pet", "animal care"] },
            { name: "Dog Training Classes", description: "Group and private dog training lessons for obedience and behavior.", priceRange: "$100/session", tags: ["training", "dog", "pet"] }
        ],
        products: [
            { name: "Premium Dog Food", description: "High-quality, nutritious dog food for all breeds and sizes.", price: 50.00, stock: 100 },
            { name: "Interactive Cat Toys", description: "Engaging and durable toys to keep your cat entertained.", price: 12.00, stock: 150 }
        ],
        externalLinks: [
            { platformName: "Shopee Store", url: "https://shopee.ph/petcare_paradise" },
            { platformName: "TikTok", url: "https://tiktok.com/@petcareparadise" }
        ]
    },
    {
        id: "S_PROF005",
        companyName: "Artistic Creations Studio",
        bio: "Unique hand-painted artworks and custom commissions. Bring beauty to your home with a piece crafted just for you.",
        contactInfo: "artistic.creations@example.com | +63 977 123 9876",
        services: [
            { name: "Custom Portrait Painting", description: "Transform your photos into timeless oil or acrylic portraits.", priceRange: "$200 - $500", tags: ["art", "portrait", "custom", "painting"] },
            { name: "Mural Painting", description: "Large-scale wall murals for homes, offices, and commercial spaces.", priceRange: "Quotation based", tags: ["mural", "art", "interior design"] }
        ],
        products: [
            { name: "Abstract Canvas Prints", description: "High-quality prints of original abstract artworks, various sizes available.", price: 80.00, stock: 50 },
            { name: "DIY Painting Kits", description: "All-inclusive kits for beginners to create their own masterpieces.", price: 30.00, stock: 75 }
        ],
        externalLinks: [
            { platformName: "Portfolio Website", url: "https://www.artisticcreations.com" },
            { platformName: "Instagram", url: "https://instagram.com/artistic_creations" }
        ]
    },
    {
        id: "S_PROF006",
        companyName: "Healthy Bites Catering",
        bio: "Wholesome and delicious catering services for events of all sizes. Specializing in healthy, organic, and dietary-friendly options.",
        contactInfo: "info@healthybites.ph | +63 945 345 6789",
        services: [
            { name: "Event Catering", description: "Full-service catering for birthdays, corporate events, and gatherings.", priceRange: "Custom quotes", tags: ["catering", "event", "food"] },
            { name: "Meal Prep Delivery", description: "Nutritious and ready-to-eat meals delivered to your doorstep weekly.", priceRange: "$70/week", tags: ["meal prep", "delivery", "healthy food"] }
        ],
        products: [
            { name: "Organic Snack Boxes", description: "Curated boxes of healthy, organic snacks for daily enjoyment.", price: 25.00, stock: 100 },
            { name: "Freshly Baked Whole Wheat Bread", description: "Artisan whole wheat bread, baked fresh daily.", price: 8.00, stock: 50 }
        ],
        externalLinks: [
            { platformName: "Website", url: "https://www.healthybites.ph" },
            { platformName: "Facebook", url: "https://facebook.com/healthybitescatering" }
        ]
    },
    {
        id: "S_PROF007",
        companyName: "QuickFix Appliance Repair",
        bio: "Fast and reliable repair services for all your home appliances. We fix refrigerators, washing machines, ovens, and more!",
        contactInfo: "service@quickfix.com | +63 966 555 4444",
        services: [
            { name: "Washing Machine Repair", description: "Troubleshooting and repair for all washing machine brands and models.", priceRange: "$40 - $180", tags: ["repair", "appliance", "washing machine"] },
            { name: "Refrigerator Maintenance", description: "Regular check-ups and minor repairs to keep your fridge running efficiently.", priceRange: "$50 - $120", tags: ["maintenance", "refrigerator", "appliance"] }
        ],
        products: [], // No products for this seller example
        externalLinks: [
            { platformName: "Website", url: "https://www.quickfixappliance.com" },
            { platformName: "Service Hotline", url: "tel:+639665554444" }
        ]
    }
];

// Get elements for the modal
const sellerDetailModal = document.getElementById('sellerDetailModal');
const modalContent = document.getElementById('modalContent');
const modalCompanyName = document.getElementById('modalCompanyName');
const modalBio = document.getElementById('modalBio');
const modalContactInfo = document.getElementById('modalContactInfo');
const modalServices = document.getElementById('modalServices');
const modalProducts = document.getElementById('modalProducts');
const modalExternalLinks = document.getElementById('modalExternalLinks');

/**
 * Renders all seller profile cards on the page.
 */
function renderSellerCards() {
    const container = document.getElementById('sellerCardsContainer');
    container.innerHTML = ''; // Clear existing cards

    sellerData.forEach(seller => {
        const card = document.createElement('div');
        card.id = `seller-card-${seller.id}`; // Add an ID to the card for easier selection if needed
        card.className = `bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300
                         transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col items-center
                         text-center border border-gray-200`;
        card.onclick = () => openModal(seller.id); // Attach click event to open modal

        // Collect unique tags from all services for preview
        const allServiceTags = [...new Set(seller.services.flatMap(svc => svc.tags || []))];
        const displayedTags = allServiceTags.slice(0, 3); // Display up to 3 unique tags
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

    // Clear previous content
    modalServices.innerHTML = '';
    modalProducts.innerHTML = '';
    modalExternalLinks.innerHTML = '';

    // Populate services
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

    // Populate products
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

    // Populate external links
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

    // Show modal with animation
    sellerDetailModal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('opacity-0', 'scale-95');
        modalContent.classList.add('opacity-100', 'scale-100');
    }, 10); // Small delay for transition
}

/**
 * Closes the seller detail modal.
 */
function closeModal() {
    modalContent.classList.remove('opacity-100', 'scale-100');
    modalContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
        sellerDetailModal.classList.add('hidden');
    }, 300); // Wait for transition to complete before hiding
}

/**
 * Filters seller cards based on search input and tag filter.
 */
function filterSellers() {
    const searchInput = document.getElementById('searchInput');
    const tagFilterInput = document.getElementById('tagFilterInput');

    const searchTerm = searchInput.value.toLowerCase();
    const tagFilterTerm = tagFilterInput.value.toLowerCase().split(',').map(tag => tag.trim()).filter(tag => tag !== ''); // Split by comma for multiple tags

    const cards = document.getElementById('sellerCardsContainer').children;

    Array.from(cards).forEach(card => {
        const sellerId = card.id.replace('seller-card-', '');
        const seller = sellerData.find(s => s.id === sellerId);

        if (!seller) {
            card.style.display = 'none';
            return;
        }

        // Check for main search term
        const companyName = seller.companyName.toLowerCase();
        const bio = seller.bio.toLowerCase();
        const servicesText = seller.services.map(s => s.name.toLowerCase() + ' ' + s.description.toLowerCase()).join(' ');
        const productsText = seller.products.map(p => p.name.toLowerCase() + ' ' + p.description.toLowerCase()).join(' ');

        const matchesSearch = searchTerm === '' ||
                              companyName.includes(searchTerm) ||
                              bio.includes(searchTerm) ||
                              servicesText.includes(searchTerm) ||
                              productsText.includes(searchTerm);

        // Check for tag filter term
        const allServiceTags = new Set(seller.services.flatMap(svc => svc.tags || []).map(tag => tag.toLowerCase()));
        let matchesTags = true; // Assume true if no tags are being filtered
        if (tagFilterTerm.length > 0) {
            matchesTags = tagFilterTerm.every(filterTag => allServiceTags.has(filterTag));
        }

        // A card is visible if it matches BOTH the search term AND the tag filter term
        if (matchesSearch && matchesTags) {
            card.style.display = ''; // Show card
        } else {
            card.style.display = 'none'; // Hide card
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderSellerCards();

    // Attach event listeners to input fields
    document.getElementById('searchInput').addEventListener('keyup', filterSellers);
    document.getElementById('tagFilterInput').addEventListener('keyup', filterSellers);
});

// Close modal when clicking outside of the content
sellerDetailModal.addEventListener('click', (event) => {
    if (event.target === sellerDetailModal) {
        closeModal();
    }
});
