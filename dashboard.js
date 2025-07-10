// Agricultural Management System - Dashboard JavaScript
console.log('Loading dashboard.js...');

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing dashboard...');
    initializeDashboard();
});

// Main dashboard initialization function
function initializeDashboard() {
    console.log('Starting dashboard initialization...');
    
    // Load user profile
    loadProfile();
    
    // Set up language
    const savedLang = localStorage.getItem('language') || 'en';
    document.getElementById('languageSelect').value = savedLang;
    changeLanguage();
    
    // Initialize all dashboard components
    initializeAgricultureGallery();
    updateMarketPrices();
    updateNews();
    
    // Start periodic updates
    startPeriodicUpdates();
    
    console.log('Dashboard initialization complete');
}

// Global variables
let marketPrices = {
    wheat: { base: 2150, current: 2150 },
    rice: { base: 2850, current: 2850 },
    cotton: { base: 5200, current: 5200 },
    soybean: { base: 4100, current: 4100 },
    maize: { base: 1950, current: 1950 },
    sugarcane: { base: 280, current: 280 }
};

// Weather conditions for variety
const weatherConditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear', 'Overcast'];
const landQualities = ['Excellent', 'Good', 'Fair', 'Poor'];

// Section management
function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Update active navigation link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Handle specific sections
    if (sectionId === 'profile') {
        loadProfile();
    }
}

// Dynamic Agriculture Gallery with Real Techniques
function initializeAgricultureGallery() {
    console.log('Initializing agriculture gallery...');
    
    const techniques = [
        {
            title: "Precision Agriculture",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "GPS-guided farming using sensors and data analytics to optimize field-level management with variable rate technology for seeds, fertilizers, and pesticides."
        },
        {
            title: "Drip Irrigation",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Water-efficient irrigation method that delivers water directly to plant roots, reducing water waste by 30-50% compared to traditional sprinkler systems."
        },
        {
            title: "Hydroponics",
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Soilless cultivation technique growing plants in nutrient-rich water solutions for higher yields in controlled environments with minimal space requirements."
        },
        {
            title: "Vertical Farming",
            image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Multi-layer crop production in vertically stacked layers, maximizing space efficiency and enabling year-round production in urban environments."
        },
        {
            title: "Organic Farming",
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Sustainable farming without synthetic pesticides or fertilizers, promoting soil health, biodiversity, and environmental conservation."
        },
        {
            title: "Greenhouse Technology",
            image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Climate-controlled environment for optimal crop growth with protection from weather extremes, pests, and diseases while extending growing seasons."
        },
        {
            title: "Crop Rotation",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Systematic sequence of different crops on the same land to improve soil fertility, reduce pest buildup, and break disease cycles naturally."
        },
        {
            title: "Agroforestry",
            image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            description: "Integration of trees with crops and livestock for improved productivity, soil conservation, carbon sequestration, and enhanced biodiversity."
        }
    ];

    const gallery = document.getElementById('agriGallery');
    if (gallery) {
        console.log('Gallery element found, populating...');
        gallery.innerHTML = techniques.map(tech => `
            <div class="agri-image" style="background-image:url('${tech.image}')" 
                 data-title="${tech.title}" 
                 data-description="${tech.description}"
                 onclick="openModal(this)">
            </div>
        `).join('');
        console.log('Gallery populated with', techniques.length, 'items');
    } else {
        console.error('Gallery element not found!');
    }
}

// Market Price Updates
function updateMarketPrices() {
    console.log('Updating market prices...');
    const crops = ['wheat', 'rice', 'cotton', 'soybean', 'maize', 'sugarcane'];
    const cropNames = ['Wheat', 'Rice', 'Cotton', 'Soybean', 'Maize', 'Sugarcane'];

    crops.forEach(crop => {
        const change = (Math.random() - 0.5) * 0.08; // -4% to +4% change
        marketPrices[crop].current = Math.round(marketPrices[crop].current * (1 + change));
    });

    const marketGrid = document.getElementById('marketGrid');
    if (marketGrid) {
        console.log('Market grid found, updating...');
        marketGrid.innerHTML = crops.map((crop, index) => {
            const price = marketPrices[crop];
            const changePercent = ((price.current - price.base) / price.base * 100).toFixed(1);
            const isUp = changePercent >= 0;
            return `
                <div class="market-item">
                    <div class="market-crop">${cropNames[index]}</div>
                    <div class="market-price">₹${price.current}/q</div>
                    <div class="market-change ${isUp ? 'up' : 'down'}">
                        ${isUp ? '↑' : '↓'} ${isUp ? '+' : ''}${changePercent}%
                    </div>
                </div>
            `;
        }).join('');
        console.log('Market prices updated');
    } else {
        console.error('Market grid element not found!');
    }
}

// Dynamic News Updates
const newsDatabase = [
    {
        title: "🌾 Revolutionary CRISPR Wheat Varieties Show 40% Higher Yields",
        content: "New gene-edited wheat varieties demonstrate remarkable drought resistance and increased productivity in field trials across multiple states."
    },
    {
        title: "💧 Smart Water Management Systems Reduce Irrigation Costs by 60%",
        content: "IoT-based irrigation monitoring helps farmers optimize water usage with real-time soil moisture data and weather forecasting integration."
    },
    {
        title: "🚁 Drone Technology Detects Crop Diseases 2 Weeks Earlier",
        content: "AI-powered agricultural drones provide early disease detection using multispectral imaging, saving millions in crop losses annually."
    },
    {
        title: "🌱 Vertical Farming Market Expected to Reach $20 Billion by 2026",
        content: "Indoor farming facilities continue expanding globally, offering year-round production capabilities and 95% water savings compared to traditional farming."
    },
    {
        title: "📱 Farm Management Apps Increase Productivity by 25%",
        content: "Digital agriculture platforms help farmers make data-driven decisions for optimal crop management, weather monitoring, and supply chain coordination."
    },
    {
        title: "🌿 Biofortified Crops Address Malnutrition in Rural Communities",
        content: "Nutrient-enhanced varieties of staple crops provide essential vitamins and minerals, reducing iron and zinc deficiencies in developing regions."
    },
    {
        title: "⚡ Solar-Powered Farming Equipment Reduces Operating Costs by 45%",
        content: "Renewable energy solutions for agriculture gain traction as farmers seek sustainable alternatives to diesel-powered machinery and irrigation systems."
    },
    {
        title: "🧬 Soil Microbiome Research Unlocks Natural Fertilizer Alternatives",
        content: "Scientists develop beneficial bacteria cocktails that enhance plant growth and reduce chemical fertilizer dependency by 30% while improving soil health."
    }
];

function updateNews() {
    console.log('Updating news...');
    const shuffled = [...newsDatabase].sort(() => Math.random() - 0.5);
    const newsContainer = document.getElementById('newsContainer');
    if (newsContainer) {
        console.log('News container found, updating...');
        newsContainer.innerHTML = shuffled.slice(0, 4).map(news => `
            <div class="card" style="margin-bottom:1rem;padding:1rem">
                <div class="card-title">${news.title}</div>
                <div style="color:#666;margin-top:0.5rem">${news.content}</div>
            </div>
        `).join('');
        console.log('News updated with', shuffled.slice(0, 4).length, 'items');
    } else {
        console.error('News container element not found!');
    }
}

// Weather Updates
function updateWeather() {
    const temp = Math.round(22 + Math.random() * 18); // 22-40°C range
    const humid = Math.round(45 + Math.random() * 40); // 45-85% range  
    const wind = Math.round(5 + Math.random() * 20); // 5-25 km/h range
    const forecast = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const landQuality = landQualities[Math.floor(Math.random() * landQualities.length)];

    const tempElement = document.getElementById('temp');
    const weatherTempElement = document.getElementById('weather-temp');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');
    const forecastElement = document.getElementById('forecastValue');
    const landQualityElement = document.getElementById('landQualityValue');

    if (tempElement) tempElement.textContent = `${temp}°C`;
    if (weatherTempElement) weatherTempElement.textContent = `${temp}°C`;
    if (humidityElement) humidityElement.textContent = `${humid}%`;
    if (windElement) windElement.textContent = `${wind} km/h`;
    if (forecastElement) forecastElement.textContent = forecast;
    if (landQualityElement) landQualityElement.textContent = landQuality;
}

// Start periodic updates
function startPeriodicUpdates() {
    console.log('Starting periodic updates...');
    
    // Update weather every 3 seconds
    setInterval(updateWeather, 3000);
    
    // Update market prices every 12 seconds
    setInterval(updateMarketPrices, 12000);
    
    // Update news every 25 seconds
    setInterval(updateNews, 25000);
}

// Crop Prediction
function predictCrop() {
    console.log('Predicting crop...');
    
    const soilPh = parseFloat(document.getElementById('soilPh').value);
    const soilMoisture = parseFloat(document.getElementById('soilMoisture').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const humidity = parseFloat(document.getElementById('humidity').value);
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    const soilType = document.getElementById('soilType').value;

    if (!soilPh || !soilMoisture || !temperature || !humidity || !rainfall || !soilType) {
        alert('Please fill in all fields');
        return;
    }

    let recommendedCrop = '';
    let confidence = 0;

    // AI-based crop prediction logic
    if (soilPh >= 6 && soilPh <= 7.5 && soilMoisture >= 40 && temperature >= 20 && temperature <= 30 && rainfall >= 600) {
        recommendedCrop = '🌾 Wheat';
        confidence = 92;
    } else if (soilPh >= 5.5 && soilPh <= 6.5 && soilMoisture >= 60 && temperature >= 25 && temperature <= 35 && rainfall >= 1000) {
        recommendedCrop = '🌾 Rice';
        confidence = 89;
    } else if (soilPh >= 6.5 && soilPh <= 8 && soilMoisture >= 30 && temperature >= 15 && temperature <= 25 && rainfall >= 300) {
        recommendedCrop = '🌾 Soybean';
        confidence = 87;
    } else if (soilPh >= 6 && soilPh <= 7 && soilMoisture >= 35 && temperature >= 20 && temperature <= 30 && rainfall >= 500) {
        recommendedCrop = '🌽 Maize';
        confidence = 85;
    } else {
        recommendedCrop = '🥬 Vegetables';
        confidence = 78;
    }

    // Get crop image
    const cropImage = getCropImage(recommendedCrop);

    // Display result
    const resultDiv = document.getElementById('predictionResult');
    const cropDiv = document.getElementById('predictionCrop');
    const detailsDiv = document.getElementById('predictionDetails');
    const confidenceDiv = document.getElementById('confidenceBadge');
    const imageDiv = document.getElementById('cropImage');

    if (resultDiv && cropDiv && detailsDiv && confidenceDiv && imageDiv) {
        cropDiv.textContent = `Recommended Crop: ${recommendedCrop}`;
        detailsDiv.textContent = `Based on your soil conditions (pH: ${soilPh}, Moisture: ${soilMoisture}%, Type: ${soilType}) and climate data (Temp: ${temperature}°C, Humidity: ${humidity}%, Rainfall: ${rainfall}mm), this crop is most suitable for optimal yield.`;
        confidenceDiv.textContent = `${confidence}% Match`;
        imageDiv.innerHTML = `<img src="${cropImage}" alt="${recommendedCrop}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-top: 1rem;">`;
        resultDiv.style.display = 'block';
    }
}

// Crop Images for Prediction Results
function getCropImage(crop) {
    const cropImages = {
        '🌾 Soybean': 'https://images.unsplash.com/photo-1509719016326-7bd1b380b460?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        '🌽 Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        '🌾 Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        '🌾 Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        '🥬 Vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    };
    return cropImages[crop] || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
}

// Modal Functions
function openModal(element) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    if (modal && modalImage && modalTitle && modalDescription) {
        modalImage.src = element.style.backgroundImage.slice(5, -2);
        modalTitle.textContent = element.dataset.title;
        modalDescription.textContent = element.dataset.description;
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Language Support
const translations = {
    en: {
        welcome: 'Welcome',
        home: '🏠 Home',
        predictor: '🤖 Crop Predictor',
        market: '💰 Market',
        weather: '🌤️ Weather',
        news: '📰 News',
        profile: '👤 Profile',
        heroTitle: 'Welcome to AgriSmart',
        heroSubtitle: 'Your AI-powered agricultural management platform for smart farming decisions',
        galleryTitle: 'Smart Agriculture Gallery',
        farmOverview: 'Today\'s Farm Overview',
        aiPrediction: 'AI Crop Prediction',
        soilPh: 'Soil pH Level',
        soilMoisture: 'Soil Moisture (%)',
        temperature: 'Temperature (°C)',
        humidity: 'Humidity (%)',
        rainfall: 'Annual Rainfall (mm)',
        soilType: 'Soil Type',
        predictBtn: 'Predict Best Crop',
        marketTitle: 'Live Market Prices',
        weatherTitle: 'Weather & Climate Data',
        newsTitle: 'Agricultural News & Updates',
        profileTitle: 'Farmer Profile',
        personalInfo: 'Personal Information',
        fullName: 'Full Name',
        email: 'Email',
        phone: 'Phone',
        location: 'Location',
        farmSize: 'Farm Size',
        experience: 'Farming Experience',
        primaryCrops: 'Primary Crops',
        editProfile: 'Edit Profile',
        logout: 'Logout',
        selectSoil: 'Select Soil Type',
        loamy: 'Loamy',
        clay: 'Clay',
        sandy: 'Sandy',
        silt: 'Silt',
        forecast: 'Forecast',
        windSpeed: 'Wind Speed',
        avgRainfall: 'Avg Rainfall',
        landQuality: 'Land Quality',
        mostGrown: 'Most Grown Crop',
        professionalTitle: 'Agricultural Professional',
        tempCard: 'Temperature',
        moistureCard: 'Soil Moisture',
        rainfallCard: 'Rainfall',
        wheatCrop: 'Wheat',
        riceCrop: 'Rice',
        cottonCrop: 'Cotton',
        soybeanCrop: 'Soybean',
        maizeCrop: 'Maize',
        sugarcaneCrop: 'Sugarcane',
        good: 'Good',
        partlyCloudy: 'Partly Cloudy',
        humidityCard: 'Humidity',
        windCard: 'Wind Speed',
        weatherForecastCard: 'Forecast',
        news1: '🌾 New drought-resistant wheat varieties released',
        news1Content: 'Scientists develop wheat varieties that can survive with 30% less water while maintaining high yields.',
        news2: '💰 Government announces ₹50,000 crore agriculture package',
        news2Content: 'Major investment in rural infrastructure and modern farming equipment to boost productivity.',
        news3: '🚁 AI-powered pest detection drones launched',
        news3Content: 'New drone technology can identify crop diseases and pests with 95% accuracy using computer vision.',
        news4: '🌱 Organic farming subsidies increased by 25%',
        news4Content: 'Better support for farmers transitioning to organic farming methods.'
    },
    hi: {
        welcome: 'स्वागत',
        home: '🏠 होम',
        predictor: '🤖 फसल भविष्यवाणी',
        market: '💰 मार्केट',
        weather: '🌤️ मौसम',
        news: '📰 समाचार',
        profile: '👤 प्रोफाइल',
        heroTitle: 'एग्रीस्मार्ट में आपका स्वागत है',
        heroSubtitle: 'स्मार्ट खेती के फैसलों के लिए आपका AI-संचालित कृषि प्रबंधन प्लेटफॉर्म',
        galleryTitle: 'स्मार्ट कृषि गैलरी',
        farmOverview: 'आज की खेती की स्थिति',
        aiPrediction: 'AI फसल भविष्यवाणी',
        soilPh: 'मिट्टी का pH स्तर',
        soilMoisture: 'मिट्टी की नमी (%)',
        temperature: 'तापमान (°C)',
        humidity: 'आर्द्रता (%)',
        rainfall: 'वार्षिक वर्षा (mm)',
        soilType: 'मिट्टी का प्रकार',
        predictBtn: 'सर्वोत्तम फसल की भविष्यवाणी करें',
        marketTitle: 'लाइव मार्केट मूल्य',
        weatherTitle: 'मौसम और जलवायु डेटा',
        newsTitle: 'कृषि समाचार और अपडेट',
        profileTitle: 'किसान प्रोफाइल',
        personalInfo: 'व्यक्तिगत जानकारी',
        fullName: 'पूरा नाम',
        email: 'ईमेल',
        phone: 'फोन',
        location: 'स्थान',
        farmSize: 'खेत का आकार',
        experience: 'खेती का अनुभव',
        primaryCrops: 'मुख्य फसलें',
        editProfile: 'प्रोफाइल संपादित करें',
        logout: 'लॉग आउट',
        selectSoil: 'मिट्टी का प्रकार चुनें',
        loamy: 'दोमट',
        clay: 'चिकनी',
        sandy: 'रेतीली',
        silt: 'गाद',
        forecast: 'पूर्वानुमान',
        windSpeed: 'हवा की गति',
        avgRainfall: 'औसत वर्षा',
        landQuality: 'भूमि गुणवत्ता',
        mostGrown: 'सबसे ज्यादा उगाई जाने वाली फसल',
        professionalTitle: 'कृषि पेशेवर',
        tempCard: 'तापमान',
        moistureCard: 'मिट्टी की नमी',
        rainfallCard: 'वर्षा',
        wheatCrop: 'गेहूं',
        riceCrop: 'चावल',
        cottonCrop: 'कपास',
        soybeanCrop: 'सोयाबीन',
        maizeCrop: 'मक्का',
        sugarcaneCrop: 'गन्ना',
        good: 'अच्छा',
        partlyCloudy: 'आंशिक रूप से बादल',
        humidityCard: 'आर्द्रता',
        windCard: 'हवा की गति',
        weatherForecastCard: 'पूर्वानुमान',
        news1: '🌾 नई सूखा प्रतिरोधी गेहूं की किस्में जारी',
        news1Content: 'वैज्ञानिकों ने गेहूं की किस्में विकसित की हैं जो 30% कम पानी में जीवित रह सकती हैं और उच्च उपज बनाए रख सकती हैं।',
        news2: '💰 सरकार ने ₹50,000 करोड़ का कृषि पैकेज घोषित किया',
        news2Content: 'उत्पादकता बढ़ाने के लिए ग्रामीण बुनियादी ढांचे और आधुनिक कृषि उपकरणों में बड़ा निवेश।',
        news3: '🚁 AI-संचालित कीट पहचान ड्रोन लॉन्च किए गए',
        news3Content: 'नई ड्रोन तकनीक कंप्यूटर विजन का उपयोग करके 95% सटीकता के साथ फसल रोगों और कीटों की पहचान कर सकती है।',
        news4: '🌱 जैविक खेती सब्सिडी में 25% की वृद्धि',
        news4Content: 'जैविक खेती विधियों की ओर स्थानांतरित होने वाले किसानों के लिए बेहतर सहायता।'
    },
    te: {
        welcome: 'స్వాగతం',
        home: '🏠 హోమ్',
        predictor: '🤖 పంట అంచనా',
        market: '💰 మార్కెట్',
        weather: '🌤️ వాతావరణం',
        news: '📰 వార్తలు',
        profile: '👤 ప్రొఫైల్',
        heroTitle: 'అగ్రీస్మార్ట్‌కు స్వాగతం',
        heroSubtitle: 'స్మార్ట్ వ్యవసాయ నిర్ణయాల కోసం మీ AI-శక్తితో కూడిన వ్యవసాయ నిర్వహణ వేదిక',
        galleryTitle: 'స్మార్ట్ వ్యవసాయ గ్యాలరీ',
        farmOverview: 'నేటి వ్యవసాయ స్థితి',
        aiPrediction: 'AI పంట అంచనా',
        soilPh: 'మట్టి pH స్థాయి',
        soilMoisture: 'మట్టి తేమ (%)',
        temperature: 'ఉష్ణోగ్రత (°C)',
        humidity: 'తేమాశాతం (%)',
        rainfall: 'వార్షిక వర్షపాతం (mm)',
        soilType: 'మట్టి రకం',
        predictBtn: 'ఉత్తమ పంట అంచనా వేయండి',
        marketTitle: 'ప్రత్యక్ష మార్కెట్ ధరలు',
        weatherTitle: 'వాతావరణ మరియు వాతావరణ డేటా',
        newsTitle: 'వ్యవసాయ వార్తలు మరియు నవీకరణలు',
        profileTitle: 'రైతు ప్రొఫైల్',
        personalInfo: 'వ్యక్తిగత సమాచారం',
        fullName: 'పూర్తి పేరు',
        email: 'ఇమెయిల్',
        phone: 'ఫోన్',
        location: 'స్థానం',
        farmSize: 'వ్యవసాయ పరిమాణం',
        experience: 'వ్యవసాయ అనుభవం',
        primaryCrops: 'ప్రధాన పంటలు',
        editProfile: 'ప్రొఫైల్ సవరించండి',
        logout: 'లాగ్ అవుట్',
        selectSoil: 'మట్టి రకాన్ని ఎంచుకోండి',
        loamy: 'లోమీ',
        clay: 'బంకమట్టి',
        sandy: 'ఇసుకరేణు',
        silt: 'సిల్ట్',
        forecast: 'అంచనా',
        windSpeed: 'గాలి వేగం',
        avgRainfall: 'సగటు వర్షపాతం',
        landQuality: 'భూమి నాణ్యత',
        mostGrown: 'ఎక్కువగా పండించే పంట',
        professionalTitle: 'వ్యవసాయ వృత్తిపరుడు',
        tempCard: 'ఉష్ణోగ్రత',
        moistureCard: 'మట్టి తేమ',
        rainfallCard: 'వర్షపాతం',
        wheatCrop: 'గోధుమలు',
        riceCrop: 'వరి',
        cottonCrop: 'పత్తి',
        soybeanCrop: 'సోయాబీన్',
        maizeCrop: 'మొక్కజొన్న',
        sugarcaneCrop: 'చెరకు',
        good: 'మంచి',
        partlyCloudy: 'పాక్షికంగా మేఘావృతం',
        humidityCard: 'తేమాశాతం',
        windCard: 'గాలి వేగం',
        weatherForecastCard: 'అంచనా',
        news1: '🌾 కొత్త కరువు నిరోధక గోధుమ రకాలు విడుదల',
        news1Content: 'శాస్త్రవేత్తలు 30% తక్కువ నీటితో జీవించగలిగే మరియు అధిక దిగుబడిని కొనసాగించే గోధుమ రకాలను అభివృద్ధి చేశారు.',
        news2: '💰 ప్రభుత్వం ₹50,000 కోట్ల వ్యవసాయ ప్యాకేజీని ప్రకటించింది',
        news2Content: 'ఉత్పాదకతను పెంచడానికి గ్రామీణ మౌలిక సదుపాయాలు మరియు ఆధునిక వ్యవసాయ పరికరాలలో పెద్ద పెట్టుబడి.',
        news3: '🚁 AI-శక్తితో కూడిన కీట గుర్తింపు డ్రోన్లు లాంచ్',
        news3Content: 'కొత్త డ్రోన్ సాంకేతికత కంప్యూటర్ విజన్ ఉపయోగించి 95% ఖచ్చితత్వంతో పంట వ్యాధులు మరియు కీటకాలను గుర్తించగలదు.',
        news4: '🌱 సేంద్రీయ వ్యవసాయ సబ్సిడీలు 25% పెరుగుతాయి',
        news4Content: 'సేంద్రీయ వ్యవసాయ పద్ధతులకు మారుతున్న రైతులకు మెరుగైన మద్దతు.'
    }
};

function changeLanguage() {
    const lang = document.getElementById('languageSelect').value;
    console.log('Changing language to:', lang);
    
    localStorage.setItem('language', lang);
    
    if (translations[lang]) {
        const t = translations[lang];
        
        // Update navigation
        document.querySelectorAll('.nav-links a').forEach((link, index) => {
            const keys = ['home', 'predictor', 'market', 'weather', 'news', 'profile'];
            if (keys[index]) link.textContent = t[keys[index]];
        });
        
        // Update hero section
        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero p');
        if (heroTitle) heroTitle.innerHTML = `<i class="fas fa-leaf"></i> ${t.heroTitle}`;
        if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
        
        // Update section headers
        const sections = [
            { selector: '#home .section h2', text: `<i class="fas fa-images"></i> ${t.galleryTitle}` },
            { selector: '#home .section:nth-child(3) h2', text: `<i class="fas fa-chart-line"></i> ${t.farmOverview}` },
            { selector: '#predictor .section h2', text: `<i class="fas fa-brain"></i> ${t.aiPrediction}` },
            { selector: '#market .section h2', text: `<i class="fas fa-rupee-sign"></i> ${t.marketTitle}` },
            { selector: '#weather .section h2', text: `<i class="fas fa-cloud-sun"></i> ${t.weatherTitle}` },
            { selector: '#news .section h2', text: `<i class="fas fa-newspaper"></i> ${t.newsTitle}` },
            { selector: '#profile .section h2', text: `<i class="fas fa-user"></i> ${t.profileTitle}` }
        ];
        
        sections.forEach(section => {
            const element = document.querySelector(section.selector);
            if (element) element.innerHTML = section.text;
        });
        
        // Update form labels
        const formLabels = [
            { id: 'soilPhLabel', text: t.soilPh },
            { id: 'soilMoistureLabel', text: t.soilMoisture },
            { id: 'temperatureLabel', text: t.temperature },
            { id: 'humidityLabel', text: t.humidity },
            { id: 'rainfallLabel', text: t.rainfall },
            { id: 'soilTypeLabel', text: t.soilType }
        ];
        
        formLabels.forEach(label => {
            const element = document.getElementById(label.id);
            if (element) element.textContent = label.text;
        });
        
        // Update buttons
        const logoutBtn = document.querySelector('.logout-btn');
        const predictBtn = document.querySelector('.predict-btn');
        
        if (logoutBtn) logoutBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${t.logout}`;
        if (predictBtn) predictBtn.innerHTML = `<i class="fas fa-magic"></i> ${t.predictBtn}`;
        
        updateWelcomeMessage();
    }
}

function updateWelcomeMessage() {
    const lang = document.getElementById('languageSelect').value;
    const userName = document.getElementById('userName');
    
    if (userName && translations[lang]) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const name = user ? user.name : 'Farmer';
        userName.textContent = `${translations[lang].welcome}, ${name}!`;
    }
}

// Profile Management
function loadProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        const profileElements = [
            { id: 'profileName', value: user.name },
            { id: 'profileFullName', value: user.name },
            { id: 'profileEmail', value: user.email },
            { id: 'profilePhone', value: user.phone || '+91 9876543210' },
            { id: 'profileLocation', value: user.location || 'Andhra Pradesh, India' }
        ];
        
        profileElements.forEach(element => {
            const el = document.getElementById(element.id);
            if (el) el.textContent = element.value;
        });
    }
}

function editProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const newPhone = prompt('Enter your phone number:', document.getElementById('profilePhone').textContent) || document.getElementById('profilePhone').textContent;
    const newLocation = prompt('Enter your location:', document.getElementById('profileLocation').textContent) || document.getElementById('profileLocation').textContent;
    
    document.getElementById('profilePhone').textContent = newPhone;
    document.getElementById('profileLocation').textContent = newLocation;
    
    currentUser.phone = newPhone;
    currentUser.location = newLocation;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Profile updated successfully!');
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

console.log('Dashboard.js loaded successfully');
