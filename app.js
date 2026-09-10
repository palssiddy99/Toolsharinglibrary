// --- SPA NAVIGATION ROUTER ---
function navigate(viewId) {
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');

  const map = {
    'page-tools': 'nav-tools',
    'page-add': 'nav-add',
    'page-borrows': 'nav-borrows',
    'page-rules': 'nav-rules',
    'page-auth': 'nav-auth'
  };
  if (map[viewId]) {
    const activeLink = document.getElementById(map[viewId]);
    if (activeLink) activeLink.classList.add('active');
  }

  // Pre-fill owner name if signed in
  const session = JSON.parse(localStorage.getItem('session_user') || 'null');
  if (session && document.getElementById('ownerNameInput')) {
    document.getElementById('ownerNameInput').value = session.name;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderAll();
}

// --- NOTIFICATION TOAST ---
function toast(msg, type = 'success') {
  const t = document.getElementById('toastBox');
  t.textContent = msg;
  t.className = `toast toast-${type}`;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, 3200);
}

// --- AUTH UI & STATE ---
function switchAuthTab(type) {
  document.getElementById('formLogin').style.display = type === 'login' ? 'block' : 'none';
  document.getElementById('formRegister').style.display = type === 'reg' ? 'block' : 'none';
  document.getElementById('tabLogin').className = type === 'login' ? 'auth-tab-btn active' : 'auth-tab-btn';
  document.getElementById('tabReg').className = type === 'reg' ? 'auth-tab-btn active' : 'auth-tab-btn';
}

function checkAuthState() {
  const session = JSON.parse(localStorage.getItem('session_user') || 'null');
  const authLink = document.getElementById('nav-auth');
  const logoutBtn = document.getElementById('nav-logout');

  if (session) {
    authLink.textContent = `👤 ${session.name}`;
    logoutBtn.style.display = 'inline-block';
    if (document.getElementById('ownerNameInput')) {
      document.getElementById('ownerNameInput').value = session.name;
    }
  } else {
    authLink.textContent = 'Sign In';
    logoutBtn.style.display = 'none';
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const password = document.getElementById('regPassword').value;

  const users = getStoredUsers();
  if (users.find(u => u.email === email)) return toast('Email is already registered!', 'error');

  users.push({ id: Date.now(), name, email, password });
  saveStoredUsers(users);
  localStorage.setItem('session_user', JSON.stringify({ name, email }));

  toast('Welcome! Account registered successfully.');
  checkAuthState();
  navigate('page-tools');
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  const users = getStoredUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return toast('Invalid email or password.', 'error');

  localStorage.setItem('session_user', JSON.stringify({ name: user.name, email: user.email }));
  toast(`Welcome back, ${user.name}!`);
  checkAuthState();
  navigate('page-tools');
}

function logout() {
  localStorage.removeItem('session_user');
  checkAuthState();
  toast('Signed out.');
  navigate('page-tools');
}

// --- TOOL CREATION & LISTING ---
function handleCreateTool(e) {
  e.preventDefault();
  const ownerInput = document.getElementById('ownerNameInput').value.trim();
  const name = document.getElementById('newToolName').value.trim();
  const cat = document.getElementById('newToolCat').value;
  const condition = document.getElementById('newToolCondition').value;
  const desc = document.getElementById('newToolDesc').value.trim();

  const newTool = {
    id: Date.now(),
    name: name,
    cat: cat,
    condition: condition,
    desc: desc || 'Newly listed community tool ready to borrow.',
    status: 'available',
    owner: ownerInput || 'Community Member',
    borrower: null,
    isNew: true
  };

  const tools = getStoredTools();
  tools.unshift(newTool);
  saveStoredTools(tools);

  e.target.reset();
  document.getElementById('searchInput').value = '';
  document.getElementById('categoryFilter').value = 'all';

  toast('Tool listed! Showing at top of catalog...');
  navigate('page-tools');
}

// --- BORROW & RETURN LOGIC ---
function toggleBorrow(id) {
  const session = JSON.parse(localStorage.getItem('session_user') || 'null');
  const borrowerIdentity = session ? session.email : 'guest_borrower';

  const tools = getStoredTools();
  const tool = tools.find(t => t.id === id);

  if (tool) {
    if (tool.status === 'available') {
      tool.status = 'borrowed';
      tool.borrower = borrowerIdentity;
      toast(`Checked out: ${tool.name}`);
    } else {
      tool.status = 'available';
      tool.borrower = null;
      toast(`Returned: ${tool.name}`);
    }
    saveStoredTools(tools);
    renderAll();
  }
}

// --- SEARCH & CATEGORY CHIP CONTROLS ---
function setQuickChip(cat, el) {
  document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('categoryFilter').value = cat;
  handleSearch();
}

function handleSearch() {
  renderCatalog();
}

// --- RENDER CATALOG WITH FALLBACKS ---
function renderCatalog() {
  const tools = getStoredTools();
  const session = JSON.parse(localStorage.getItem('session_user') || 'null');
  const borrowerIdentity = session ? session.email : 'guest_borrower';
  const query = (document.getElementById('searchInput').value || '').trim().toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const grid = document.getElementById('toolGrid');

  let matches = tools.filter(t => {
    const matchesQuery = t.name.toLowerCase().includes(query) || (t.desc && t.desc.toLowerCase().includes(query));
    const matchesCat = category === 'all' || t.cat === category;
    return matchesQuery && matchesCat;
  });

  let showFallbackBanner = false;

  // Never keep screen empty on missing search query
  if (matches.length === 0 && tools.length > 0) {
    showFallbackBanner = true;
    const shuffled = [...tools].sort(() => 0.5 - Math.random());
    matches = shuffled.slice(0, 4);
  }

  let html = '';
  if (showFallbackBanner) {
    html += `
      <div class="fallback-banner">
        <span>💡 No exact matches for "<b>${query}</b>". Here are alternative community tools available right now:</span>
      </div>
    `;
  }

  html += matches.map(t => {
    const isBorrowed = t.status === 'borrowed';
    const isMyBorrow = t.borrower === borrowerIdentity;

    let btn = '';
    if (!isBorrowed) {
      btn = `<button class="btn-action btn-borrow" onclick="toggleBorrow(${t.id})">Borrow This Equipment</button>`;
    } else if (isMyBorrow) {
      btn = `<button class="btn-action btn-return" onclick="toggleBorrow(${t.id})">Return to Library</button>`;
    } else {
      btn = `<button class="btn-action btn-disabled" disabled>Currently In Use</button>`;
    }

    return `
      <div class="tool-card ${t.isNew ? 'user-created' : ''}">
        <div>
          <div class="tool-header">
            <span class="tag tag-cat">${t.cat}</span>
            ${t.isNew ? '<span class="tag tag-new">YOUR LISTING</span>' : ''}
            <span class="tag tag-status ${isBorrowed ? 'borrowed' : ''}">${isBorrowed ? 'In Use' : 'Available'}</span>
          </div>
          <div class="tool-title">${t.name}</div>
          <div style="font-size: 0.8rem; color: #6366f1; font-weight: 600; margin-bottom: 0.4rem;">Condition: ${t.condition || 'Good'}</div>
          <div class="tool-desc">${t.desc}</div>
        </div>
        <div class="tool-footer">
          <div class="owner-info">
            <span>Owner: <b>${t.owner}</b></span>
            <span>Ref: #${t.id.toString().slice(-4)}</span>
          </div>
          ${btn}
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = html;
}

// --- RENDER BORROWED ITEMS ---
function renderMyBorrows() {
  const tools = getStoredTools();
  const session = JSON.parse(localStorage.getItem('session_user') || 'null');
  const borrowerIdentity = session ? session.email : 'guest_borrower';
  const target = document.getElementById('myBorrowsGrid');

  const activeBorrows = tools.filter(t => t.borrower === borrowerIdentity);

  // Update badge count
  const badge = document.getElementById('borrowCountBadge');
  if (badge) badge.textContent = activeBorrows.length;

  if (activeBorrows.length === 0) {
    target.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">You have zero tools checked out right now.</p>';
    return;
  }

  target.innerHTML = activeBorrows.map(t => `
    <div class="tool-card">
      <div>
        <div class="tool-header">
          <span class="tag tag-cat">${t.cat}</span>
          <span class="tag tag-status borrowed">Checked Out</span>
        </div>
        <div class="tool-title">${t.name}</div>
        <div class="tool-desc">${t.desc}</div>
      </div>
      <div class="tool-footer">
        <div class="owner-info">
          <span>Lender: <b>${t.owner}</b></span>
        </div>
        <button class="btn-action btn-return" onclick="toggleBorrow(${t.id})">Return to Library</button>
      </div>
    </div>
  `).join('');
}

// --- UPDATE SYSTEM METRICS STRIP ---
function updateSystemMetrics() {
  const tools = getStoredTools();
  const available = tools.filter(t => t.status === 'available').length;
  const inUse = tools.filter(t => t.status === 'borrowed').length;
  const statsEl = document.getElementById('systemStats');
  if (statsEl) {
    statsEl.textContent = `📦 Total Inventory: ${tools.length} | Available: ${available} | In Use: ${inUse}`;
  }
}

function renderAll() {
  renderCatalog();
  renderMyBorrows();
  updateSystemMetrics();
}

// --- BOOTSTRAP ---
checkAuthState();
renderAll();
