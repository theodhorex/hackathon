// User credentials
const DUMMY_USERS = [
    { username: "admin", password: "admin123", name: "Admin User", avatar: "👤" },
    { username: "demo", password: "demo123", name: "Demo User", avatar: "🎨" }
];

// Mock detected content data
const MOCK_DETECTED_CONTENT = [
    {
        id: 1,
        url: "https://www.exitlag.com/blog/wp-content/uploads/2025/07/cyberpunk-2077-characters.jpeg",
        type: "image",
        status: "ORIGINAL",
        confidence: 100,
        size: "1920x1080",
        title: "Cyber Punk Character",
        alt: "Cyber Punk Character"
    },
    {
        id: 2,
        url: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/34604cb1-acc6-4a40-bf26-60185ca7da5c/NIKE+AIR+MAX+1+ESS.png",
        type: "image",
        status: "BRAND_IP_DETECTED",
        brand: "Nike Inc.",
        confidence: 95,
        size: "800x600",
        title: "Sneaker Concept",
        alt: "Sneaker Concept"
    },
    {
        id: 3,
        url: "https://media.istockphoto.com/id/1471683196/vector/black-wavy-lines-isolated-on-white-abstract-background-design.jpg?s=612x612&w=0&k=20&c=OiEcsV3iKnIS96d2fHbVXQS-aWBeWaTfx5o_fY3Q_Rg=",
        type: "image",
        status: "ALREADY_REGISTERED",
        owner: "0x742d...5678",
        confidence: 100,
        size: "2560x1440",
        title: "Abstract Wave",
        alt: "Abstract Wave"
    },
    {
        id: 4,
        url: "https://soundcloud.com/sample-track",
        type: "audio",
        status: "ORIGINAL",
        confidence: 100,
        size: "3:45 min",
        title: "Synthwave Track 01",
        alt: "Synthwave Track 01"
    }
];

// Current user and states
let currentUser = null;
let isMonitoring = true;
let currentTab = 'detect';
let currentView = 'main'; // 'main', 'sidebar', 'register', 'analysis'

// DOM Elements - Screens
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');

// DOM Elements - Login
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');

// DOM Elements - Dashboard
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const monitoringBtn = document.getElementById('monitoringBtn');
const actionButton = document.getElementById('actionButton');
const alertsBtn = document.getElementById('alertsBtn');
const dashboardLink = document.querySelector('.dashboard-link');

// DOM Elements - Sidebar
const sidebarView = document.getElementById('sidebarView');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const contentList = document.getElementById('contentList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    chrome.storage.local.get(['currentUser'], (result) => {
        if (result.currentUser) {
            currentUser = result.currentUser;
            showDashboard();
        }
    });

    // Setup event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);

    // Logout button
    logoutBtn.addEventListener('click', handleLogout);

    // Monitoring toggle
    monitoringBtn.addEventListener('click', toggleMonitoring);

    // Action button
    actionButton.addEventListener('click', handleActionButton);

    // Alerts button
    alertsBtn.addEventListener('click', () => {
        alert('🔔 Alerts feature coming soon!\\n\\nYou have 3 pending alerts:\\n- IP infringement detected\\n- New royalty payment\\n- IP successfully registered');
    });

    // Dashboard link
    dashboardLink.addEventListener('click', () => {
        alert('📊 Opening IP Dashboard...\\n\\nFeatures:\\n- View all protected IPs\\n- Monitor earnings\\n- License management\\n- Infringement reports');
    });

    // Close sidebar
    closeSidebarBtn.addEventListener('click', closeSidebar);

    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            currentTab = tab.dataset.tab;
            switchTab(tab);
        });
    });
}

function handleLogin(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Show loading state
    const buttonText = loginButton.querySelector('.button-text');
    const buttonIcon = loginButton.querySelector('.button-icon');
    buttonText.textContent = 'Logging in...';
    buttonIcon.textContent = '🔄';
    loginButton.disabled = true;

    // Simulate delay for better UX
    setTimeout(() => {
        const user = DUMMY_USERS.find(u => u.username === username && u.password === password);

        if (user) {
            currentUser = user;

            // Store user in chrome storage
            chrome.storage.local.set({ currentUser: user }, () => {
                loginError.style.display = 'none';
                showDashboard();
            });
        } else {
            // Show error
            loginError.style.display = 'flex';
            loginError.querySelector('.error-text').textContent = 'Invalid username or password';

            // Reset button
            buttonText.textContent = 'Sign In';
            buttonIcon.textContent = '🛡️';
            loginButton.disabled = false;

            // Shake animation
            loginForm.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
        }
    }, 800);
}

function handleLogout() {
    // Confirm logout
    if (confirm('Are you sure you want to logout?')) {
        chrome.storage.local.remove(['currentUser'], () => {
            currentUser = null;
            currentView = 'main';
            showLogin();
        });
    }
}

function showDashboard() {
    loginScreen.classList.remove('active');
    dashboardScreen.classList.add('active');

    // Update user info
    if (currentUser) {
        userAvatar.textContent = currentUser.avatar;
        userName.textContent = currentUser.username;
    }

    // Start animation
    startBackgroundAnimation();

    // Update tab content based on current tab
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        updateTabContent(activeTab.dataset.tab);
    }
}

function showLogin() {
    dashboardScreen.classList.remove('active');
    loginScreen.classList.add('active');

    // Reset form
    loginForm.reset();
    loginError.style.display = 'none';

    const buttonText = loginButton.querySelector('.button-text');
    const buttonIcon = loginButton.querySelector('.button-icon');
    buttonText.textContent = 'Sign In';
    buttonIcon.textContent = '🛡️';
    loginButton.disabled = false;

    // Close any open sidebar
    if (sidebarView) {
        sidebarView.classList.remove('active');
    }
}

function toggleMonitoring() {
    isMonitoring = !isMonitoring;

    const statusText = document.querySelector('.system-status');
    const statusDot = statusText.querySelector('.status-dot');

    if (isMonitoring) {
        monitoringBtn.classList.add('active');
        statusText.classList.add('active');
        statusText.childNodes[1].textContent = 'System Active';
    } else {
        monitoringBtn.classList.remove('active');
        statusText.classList.remove('active');
        statusText.childNodes[1].textContent = 'System Paused';
    }
}

function switchTab(clickedTab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    clickedTab.classList.add('active');

    const tabType = clickedTab.dataset.tab;
    currentTab = tabType;
    updateTabContent(tabType);

    // Close sidebar when switching tabs
    closeSidebar();
}

function updateTabContent(tabType) {
    const tabBadge = document.querySelector('.tab-badge');
    const featureIcon = document.querySelector('.feature-icon-emoji');
    const featureTitle = document.querySelector('.feature-description h2');
    const featureDesc = document.querySelector('.feature-description p');
    const actionButtonText = document.querySelector('.action-button-content span:nth-child(2)');
    const actionButtonBg = document.querySelector('.action-button-bg');
    const infoTitle = document.querySelector('.info-title');
    const infoDesc = document.querySelector('.info-desc');

    if (tabType === 'detect') {
        tabBadge.textContent = '🎯 Yakoa Integration: Real-time';
        tabBadge.style.background = 'linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))';
        tabBadge.style.color = '#22d3ee';
        tabBadge.style.borderColor = 'rgba(34, 211, 238, 0.3)';

        featureIcon.textContent = '⚡';
        featureTitle.textContent = 'Detect & Protect';
        featureDesc.textContent = 'Auto-scan page content & analyze with Yakoa.';
        actionButtonText.textContent = 'Start Detection';
        actionButtonBg.style.background = 'linear-gradient(90deg, #3b82f6, #06b6d4)';

        infoTitle.textContent = 'IP & Web3 Ecosystem';
        infoDesc.textContent = 'Didukung oleh Yakoa, ekstensi ini memindai secara mendalam untuk melindungi konten original Anda dari penyalahgunaan digital.';
    } else if (tabType === 'analysis') {
        tabBadge.textContent = '🔬 AI-Powered IP Deep Analysis';
        tabBadge.style.background = 'linear-gradient(90deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))';
        tabBadge.style.color = '#14b8a6';
        tabBadge.style.borderColor = 'rgba(20, 184, 166, 0.3)';

        featureIcon.textContent = '🔬';
        featureTitle.textContent = 'IP Analysis';
        featureDesc.textContent = 'Deep content fingerprinting & risk assessment.';
        actionButtonText.textContent = 'Start IP Analysis';
        actionButtonBg.style.background = 'linear-gradient(90deg, #14b8a6, #06b6d4)';

        infoTitle.textContent = 'IP & Web3 Ecosystem';
        infoDesc.textContent = 'Menggunakan machine learning canggih untuk memverifikasi kepemilikan dan potensi pelanggaran di seluruh web.';
    } else if (tabType === 'register') {
        tabBadge.textContent = '⛓️ Story Protocol: IP NFT';
        tabBadge.style.background = 'linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))';
        tabBadge.style.color = '#a855f7';
        tabBadge.style.borderColor = 'rgba(168, 85, 247, 0.3)';

        featureIcon.textContent = '⛓️';
        featureTitle.textContent = 'Register IP';
        featureDesc.textContent = 'One-click registration to Story Protocol.';
        actionButtonText.textContent = 'Start Registration';
        actionButtonBg.style.background = 'linear-gradient(90deg, #a855f7, #ec4899)';

        infoTitle.textContent = 'IP & Web3 Ecosystem';
        infoDesc.textContent = 'Integrasi Story Protocol memungkinkan pencetakan \'IP NFT\' untuk melacak silsilah, lisensi, dan royalti di blockchain.';
    }
}

function handleActionButton() {
    if (currentTab === 'detect') {
        openDetectionSidebar();
    } else if (currentTab === 'analysis') {
        showAnalysisView();
    } else if (currentTab === 'register') {
        showRegisterView();
    }
}

function openDetectionSidebar() {
    currentView = 'sidebar';
    sidebarView.classList.add('active');

    // Populate content list
    renderDetectedContent();
}

function renderDetectedContent() {
    contentList.innerHTML = '';

    MOCK_DETECTED_CONTENT.forEach(content => {
        const contentCard = createContentCard(content);
        contentList.appendChild(contentCard);
    });
}

function createContentCard(content) {
    const card = document.createElement('div');
    card.className = 'content-card';

    const statusColors = {
        'ORIGINAL': { bg: 'bg-emerald-500/90', text: 'text-white', label: 'Original', icon: '✓' },
        'BRAND_IP_DETECTED': { bg: 'bg-orange-500/90', text: 'text-white', label: 'Brand IP', icon: '⚠' },
        'ALREADY_REGISTERED': { bg: 'bg-red-500/90', text: 'text-white', label: 'Registered', icon: '🔒' }
    };

    const status = statusColors[content.status] || statusColors.ORIGINAL;

    card.innerHTML = `
    <div class="content-card-glow"></div>
    <div class="content-card-body">
      <div class="content-preview">
        <img src="${content.url}" alt="${content.title}" class="content-image">
        <div class="content-overlay"></div>
        
        <div class="content-status ${status.bg}">
          <span class="status-icon">${status.icon}</span>
          <span class="status-text">${status.label} (${content.confidence}%)</span>
        </div>
        
        <div class="content-size">${content.size}</div>
      </div>
      
      <div class="content-info">
        <h4 class="content-title">${content.title}</h4>
        <p class="content-desc">
          ${content.status === 'BRAND_IP_DETECTED' ? `Match: ${content.brand}` :
            content.status === 'ALREADY_REGISTERED' ? `Owner: ${content.owner}` :
                'No matches found in Yakoa DB'}
        </p>
        
        <button 
          class="content-protect-btn ${content.status !== 'ORIGINAL' ? 'disabled' : ''}"
          ${content.status !== 'ORIGINAL' ? 'disabled' : ''}
          onclick="protectContent(${content.id})"
        >
          <span class="protect-btn-bg"></span>
          <span class="protect-btn-content">
            <span class="protect-icon">🛡️</span>
            <span>${content.status === 'ORIGINAL' ? 'Protect This (Quick)' : 'Cannot Protect'}</span>
          </span>
        </button>
      </div>
    </div>
  `;

    return card;
}

function protectContent(contentId) {
    const content = MOCK_DETECTED_CONTENT.find(c => c.id === contentId);
    if (!content) return;

    // Show loading state
    const btn = event.target.closest('.content-protect-btn');
    const btnContent = btn.querySelector('.protect-btn-content span:last-child');
    const originalText = btnContent.textContent;
    btnContent.textContent = 'Protecting...';
    btn.disabled = true;

    // Simulate protection process
    setTimeout(() => {
        alert(`✅ Content Protected!\\n\\nTitle: ${content.title}\\nStatus: Successfully registered to Story Protocol\\nIP Asset ID: 0x${Math.random().toString(16).substr(2, 8)}...\\n\\nYour content is now protected on the blockchain! 🎉`);

        // Reset button
        btnContent.textContent = originalText;
        btn.disabled = false;

        // Close sidebar
        closeSidebar();
    }, 1500);
}

function showAnalysisView() {
    alert('🔬 Starting Deep IP Analysis...\\n\\nFeatures:\\n✓ Domain reputation check\\n✓ Blockchain verification\\n✓ Content fingerprinting\\n✓ Security score calculation\\n\\nAnalysis Results:\\n- Security Score: 92/100\\n- Status: Safe to Use\\n- Verified: Yes\\n- IP Registry: 3 Assets Found');
}

function showRegisterView() {
    alert('⛓️ Opening IP Registration Form...\\n\\nSteps:\\n1. Upload or select content\\n2. Set asset type (Image/Audio/Video/Text)\\n3. Choose license type\\n4. Set royalty percentage\\n5. Add description\\n6. Register & Protect\\n\\nYour IP will be minted as an NFT on Story Protocol! 🚀');
}

function closeSidebar() {
    if (sidebarView) {
        sidebarView.classList.add('closing');
        setTimeout(() => {
            sidebarView.classList.remove('active');
            sidebarView.classList.remove('closing');
            currentView = 'main';
        }, 300);
    }
}

// Background Animation
function startBackgroundAnimation() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 600;

    const particles = [];
    const MAX_PARTICLES = 80;

    for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 1.5 + 0.3,
            opacity: Math.random() * 0.4 + 0.1,
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 15, 25, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            gradient.addColorStop(0, `rgba(100, 255, 255, ${p.opacity})`);
            gradient.addColorStop(1, 'rgba(100, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();

            particles.slice(i + 1).forEach((p2) => {
                const dx = p2.x - p.x;
                const dy = p2.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 90) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(100, 255, 255, ${(1 - dist / 90) * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);
