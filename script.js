/* ============================================================
   BREW & BLISS CAFÉ — script.js
   Premium Interactions & Dynamic Content
   ============================================================ */

'use strict';

/* ============================================================
   1. LOADER
   ============================================================ */
window.addEventListener('load', () => {
  document.body.classList.add('loading');
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    // Start hero entrance animation
    document.querySelector('.hero-content')?.classList.add('in-view');
  }, 2200);
});

/* ============================================================
   2. NAVBAR
   ============================================================ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

// Scroll behaviour
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  toggleBackToTop();
});

// Hamburger
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Active nav link on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ============================================================
   3. RIPPLE EFFECT
   ============================================================ */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ripple');
  if (!btn) return;
  const rect   = btn.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);
  const x      = e.clientX - rect.left - size / 2;
  const y      = e.clientY - rect.top  - size / 2;
  const circle = document.createElement('span');
  circle.classList.add('ripple-circle');
  circle.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 700);
});

/* ============================================================
   4. SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-up, .reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ============================================================
   5. COUNTER ANIMATION
   ============================================================ */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    counterObserver.unobserve(entry.target);
    const el       = entry.target;
    const target   = parseInt(el.dataset.target, 10);
    const isDecimal= el.nextElementSibling?.dataset.decimal;
    const duration = 2000;
    const step     = 16;
    const increment= (target / (duration / step));
    let current    = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (isDecimal) {
        el.textContent = (current / 10).toFixed(1);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, step);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

/* ============================================================
   6. MENU DATA & RENDERING
   ============================================================ */
const menuItems = [
  // ☕ Coffee
  { id: 'm1',  cat: 'coffee',    name: 'Espresso',              desc: 'Rich, bold single-shot espresso with a perfect crema finish.',                        price: 120, rating: '4.9', badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80&auto=format&fit=crop' },
  { id: 'm2',  cat: 'coffee',    name: 'Cappuccino',            desc: 'Velvety espresso with steamed milk and a thick foam layer.',                          price: 160, rating: '4.8', badge: 'Popular',     img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80&auto=format&fit=crop' },
  { id: 'm3',  cat: 'coffee',    name: 'Café Latte',            desc: 'Smooth espresso blended with creamy steamed milk and beautiful latte art.',           price: 170, rating: '4.9', badge: 'Fan Fav',     img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80&auto=format&fit=crop' },
  { id: 'm4',  cat: 'coffee',    name: 'Mocha',                 desc: 'Espresso with rich chocolate syrup, steamed milk and whipped cream.',                 price: 190, rating: '4.7', badge: '',            img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80&auto=format&fit=crop' },
  { id: 'm5',  cat: 'coffee',    name: 'Flat White',            desc: 'Double ristretto with microfoam milk — smooth, intense, perfect.',                    price: 180, rating: '4.8', badge: '',            img: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d7?w=600&q=80&auto=format&fit=crop' },
  { id: 'm6',  cat: 'coffee',    name: 'Cold Coffee',           desc: 'Chilled espresso blended with milk and ice — the ultimate summer refresher.',         price: 175, rating: '4.9', badge: 'Summer Hit',  img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80&auto=format&fit=crop' },

  // 🍔 Burgers
  { id: 'm7',  cat: 'burger',    name: 'Classic Veg Burger',    desc: 'Crispy vegetable patty, lettuce, tomato, and our signature house sauce.',             price: 180, rating: '4.6', badge: '',            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80&auto=format&fit=crop' },
  { id: 'm8',  cat: 'burger',    name: 'Crispy Chicken Burger', desc: 'Juicy fried chicken fillet with coleslaw, pickles and smoky BBQ sauce.',              price: 240, rating: '4.8', badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80&auto=format&fit=crop' },
  { id: 'm9',  cat: 'burger',    name: 'Double Cheese Burger',  desc: 'Double beef patty, double cheddar, caramelised onions and mustard aioli.',            price: 290, rating: '4.9', badge: 'Chef\'s Pick', img: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=600&q=80&auto=format&fit=crop' },

  // 🍕 Pizza
  { id: 'm10', cat: 'pizza',     name: 'Margherita',            desc: 'Classic tomato base, fresh mozzarella, basil on our signature thin crust.',           price: 280, rating: '4.7', badge: '',            img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80&auto=format&fit=crop' },
  { id: 'm11', cat: 'pizza',     name: 'Farmhouse',             desc: 'Capsicum, mushrooms, onions, corn and olives on a herbed tomato base.',               price: 320, rating: '4.8', badge: 'Popular',     img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80&auto=format&fit=crop' },
  { id: 'm12', cat: 'pizza',     name: 'Veg Supreme',           desc: 'Loaded with seven premium vegetables, three cheese blend and pesto drizzle.',         price: 360, rating: '4.9', badge: 'Must Try',    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80&auto=format&fit=crop' },

  // 🍝 Pasta
  { id: 'm13', cat: 'pasta',     name: 'Alfredo Pasta',         desc: 'Fettuccine in a luxurious Parmesan cream sauce with garlic butter.',                  price: 250, rating: '4.8', badge: '',            img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80&auto=format&fit=crop' },
  { id: 'm14', cat: 'pasta',     name: 'Arrabbiata Pasta',      desc: 'Penne in spicy tomato and garlic sauce with fresh herbs and chilli flakes.',          price: 230, rating: '4.7', badge: 'Spicy 🌶',   img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80&auto=format&fit=crop' },
  { id: 'm15', cat: 'pasta',     name: 'White Sauce Pasta',     desc: 'Creamy béchamel sauce with seasonal vegetables and Italian herbs.',                   price: 240, rating: '4.6', badge: '',            img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=600&q=80&auto=format&fit=crop' },

  // 🥪 Sandwiches
  { id: 'm16', cat: 'sandwich',  name: 'Club Sandwich',         desc: 'Triple-decker with chicken, bacon, lettuce, tomato and garlic mayo.',                 price: 210, rating: '4.7', badge: 'Classic',     img: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=600&q=80&auto=format&fit=crop' },
  { id: 'm17', cat: 'sandwich',  name: 'Veg Grilled Sandwich',  desc: 'Grilled with cheddar, capsicum, tomato and mixed herbs on whole wheat bread.',        price: 160, rating: '4.5', badge: '',            img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80&auto=format&fit=crop' },
  { id: 'm18', cat: 'sandwich',  name: 'Paneer Sandwich',       desc: 'Marinated cottage cheese, mint chutney, onions on toasted sourdough.',                price: 180, rating: '4.6', badge: '',            img: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=600&q=80&auto=format&fit=crop' },

  // 🍰 Desserts
  { id: 'm19', cat: 'dessert',   name: 'Chocolate Brownie',     desc: 'Warm fudgy brownie with vanilla ice cream and chocolate drizzle.',                    price: 175, rating: '4.9', badge: 'Must Have',   img: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80&auto=format&fit=crop' },
  { id: 'm20', cat: 'dessert',   name: 'New York Cheesecake',   desc: 'Creamy, velvety cheesecake on a buttery graham crust with berry compote.',            price: 220, rating: '4.8', badge: '',            img: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&q=80&auto=format&fit=crop' },
  { id: 'm21', cat: 'dessert',   name: 'Tiramisu',              desc: 'Italian classic with mascarpone, espresso-soaked fingers and cocoa dusting.',         price: 260, rating: '4.9', badge: 'Chef\'s Rec', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80&auto=format&fit=crop' },
  { id: 'm22', cat: 'dessert',   name: 'Blueberry Muffin',      desc: 'Freshly baked, bursting with blueberries and topped with streusel crumble.',          price: 120, rating: '4.6', badge: 'Fresh Baked', img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=80&auto=format&fit=crop' },
  { id: 'm23', cat: 'dessert',   name: 'Butter Croissant',      desc: 'Flaky, golden, buttery croissant baked fresh every morning with almond cream.',       price: 110, rating: '4.7', badge: '',            img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&q=80&auto=format&fit=crop' },

  // 🥤 Beverages
  { id: 'm24', cat: 'beverage',  name: 'Fresh Lime Soda',       desc: 'Freshly squeezed lime with sparkling water, mint and a pinch of chaat masala.',      price: 90,  rating: '4.7', badge: 'Refreshing',  img: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&q=80&auto=format&fit=crop' },
  { id: 'm25', cat: 'beverage',  name: 'Virgin Mojito',         desc: 'Mint, lime, sugar syrup and sparkling water — eternally refreshing.',                 price: 130, rating: '4.8', badge: 'Popular',     img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&q=80&auto=format&fit=crop' },
  { id: 'm26', cat: 'beverage',  name: 'Cold Chocolate',        desc: 'Rich chilled chocolate drink with whipped cream and a chocolate drizzle.',            price: 160, rating: '4.9', badge: 'Must Try',    img: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=600&q=80&auto=format&fit=crop' },
  { id: 'm27', cat: 'beverage',  name: 'Fresh Juice',           desc: 'Seasonal fresh-pressed juices — orange, watermelon, pomegranate or mixed fruit.',     price: 110, rating: '4.6', badge: '100% Fresh',  img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80&auto=format&fit=crop' },
];

function renderMenuCards(filter = 'all') {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';

  const filtered = filter === 'all' ? menuItems : menuItems.filter(i => i.cat === filter);

  filtered.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'menu-card reveal-up';
    card.style.setProperty('--delay', `${(idx % 6) * 0.07}s`);
    card.innerHTML = `
      <div class="menu-card-img">
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
        ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
        <span class="menu-card-rating"><i class="fa-solid fa-star"></i> ${item.rating}</span>
      </div>
      <div class="menu-card-body">
        <h3 class="menu-card-title">${item.name}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">₹${item.price}</span>
          <button class="btn-cart ripple" data-id="${item.id}" aria-label="Add ${item.name} to cart">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // Observe for reveal
    setTimeout(() => revealObserver.observe(card), 10);
  });

  // Cart button events
  grid.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.classList.contains('added')) return;
      this.classList.add('added');
      this.innerHTML = '<i class="fa-solid fa-check"></i> Added!';
      setTimeout(() => {
        this.classList.remove('added');
        this.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add to Cart';
      }, 1800);
    });
  });
}

// Tab switching
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    renderMenuCards(this.dataset.cat);
  });
});

renderMenuCards();

/* ============================================================
   7. GALLERY DATA & RENDERING
   ============================================================ */
const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=80&auto=format&fit=crop', caption: 'Luxury Café Interior',       h: 'tall' },
  { src: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d7?w=700&q=80&auto=format&fit=crop', caption: 'Perfect Flat White',          h: 'short' },
  { src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700&q=80&auto=format&fit=crop', caption: 'Latte Art Masterpiece',       h: 'medium' },
  { src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=80&auto=format&fit=crop', caption: 'Finest Coffee Beans',         h: 'short' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80&auto=format&fit=crop', caption: 'Expert Barista at Work',      h: 'tall' },
  { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&q=80&auto=format&fit=crop', caption: 'Gourmet Burger',              h: 'short' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&q=80&auto=format&fit=crop', caption: 'Artisan Wood-Fired Pizza',    h: 'medium' },
  { src: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=700&q=80&auto=format&fit=crop', caption: 'Creamy Alfredo Pasta',        h: 'short' },
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=80&auto=format&fit=crop', caption: 'Cosy Café Ambience',            h: 'tall' },
  { src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=700&q=80&auto=format&fit=crop', caption: 'Signature Tiramisu',          h: 'medium' },
  { src: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=700&q=80&auto=format&fit=crop', caption: 'Warm Chocolate Brownie',      h: 'short' },
  { src: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700&q=80&auto=format&fit=crop', caption: 'Freshly Baked Croissant',     h: 'medium' },
  { src: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=700&q=80&auto=format&fit=crop', caption: 'Fresh Seasonal Juice',        h: 'short' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80&auto=format&fit=crop', caption: 'Outdoor Café Seating',        h: 'tall' },
  { src: 'https://images.unsplash.com/photo-1522992319-0365e5f11656?w=700&q=80&auto=format&fit=crop', caption: 'Morning Coffee Ritual',         h: 'short' },
  { src: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&q=80&auto=format&fit=crop', caption: 'Refreshing Drinks',           h: 'medium' },
];

function renderGallery() {
  const grid = document.getElementById('gallery-grid');

  galleryItems.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.index = idx;
    div.setAttribute('tabindex', '0');
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', `View ${item.caption}`);
    div.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy" />
      <div class="gallery-item-overlay">
        <i class="fa-solid fa-magnifying-glass-plus"></i>
      </div>
    `;
    grid.appendChild(div);

    div.addEventListener('click', () => openLightbox(idx));
    div.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(idx); });
  });
}

renderGallery();

/* ============================================================
   8. LIGHTBOX
   ============================================================ */
let currentLbIdx = 0;

const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbCaption= document.getElementById('lb-caption');
const lbClose  = document.getElementById('lb-close');
const lbPrev   = document.getElementById('lb-prev');
const lbNext   = document.getElementById('lb-next');

function openLightbox(idx) {
  currentLbIdx = idx;
  setLightboxImage(idx);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function setLightboxImage(idx) {
  lbImg.src     = galleryItems[idx].src;
  lbImg.alt     = galleryItems[idx].caption;
  lbCaption.textContent = galleryItems[idx].caption;
}

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

lbPrev.addEventListener('click', () => {
  currentLbIdx = (currentLbIdx - 1 + galleryItems.length) % galleryItems.length;
  setLightboxImage(currentLbIdx);
});

lbNext.addEventListener('click', () => {
  currentLbIdx = (currentLbIdx + 1) % galleryItems.length;
  setLightboxImage(currentLbIdx);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});

/* ============================================================
   9. RESERVATION FORM
   ============================================================ */
const reservationForm = document.getElementById('reservation-form');
const formSuccess     = document.getElementById('form-success');
const newReservation  = document.getElementById('new-reservation');

// Set min date to today
const dateInput = document.getElementById('res-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

reservationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('res-name').value.trim();
  const phone   = document.getElementById('res-phone').value.trim();
  const email   = document.getElementById('res-email').value.trim();
  const guests  = document.getElementById('res-guests').value;
  const date    = document.getElementById('res-date').value;
  const time    = document.getElementById('res-time').value;
  const message = document.getElementById('res-message').value.trim();

  if (!name || !phone || !email || !guests || !date || !time) {
    shakeForm();
    return;
  }

  const btn = document.getElementById('reserve-btn');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing…';
  btn.disabled  = true;

  try {
    const response = await fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, guests, date, time, message })
    });

    const data = await response.json();

    if (data.success) {
      reservationForm.style.display = 'none';
      formSuccess.classList.add('visible');
    } else {
      btn.innerHTML = '<i class="fa-regular fa-calendar-check"></i> Reserve My Table';
      btn.disabled  = false;
      alert('❌ ' + (data.message || 'Something went wrong. Please try again.'));
    }
  } catch (error) {
    console.error('Reservation error:', error);
    btn.innerHTML = '<i class="fa-regular fa-calendar-check"></i> Reserve My Table';
    btn.disabled  = false;
    alert('❌ Network error. Please check your connection and try again.');
  }
});

newReservation.addEventListener('click', () => {
  formSuccess.classList.remove('visible');
  reservationForm.style.display = 'block';
  reservationForm.reset();
  const btn = document.getElementById('reserve-btn');
  btn.innerHTML = '<i class="fa-regular fa-calendar-check"></i> Reserve My Table';
  btn.disabled  = false;
});

function shakeForm() {
  const wrap = document.querySelector('.reservation-form-wrap');
  wrap.style.animation = 'none';
  wrap.offsetHeight; // reflow
  wrap.style.animation = 'shake 0.45s ease';
  setTimeout(() => wrap.style.animation = '', 500);
}

// Inject shake keyframe
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%     { transform: translateX(-8px); }
    40%     { transform: translateX(8px); }
    60%     { transform: translateX(-5px); }
    80%     { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ============================================================
   10. NEWSLETTER FORM
   ============================================================ */
document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email   = document.getElementById('nl-email').value.trim();
  const msg     = document.getElementById('nl-msg');
  const form    = e.target;
  if (!email) return;

  msg.textContent = '⏳ Subscribing…';
  msg.style.color = 'var(--cream-dim)';

  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (data.success) {
      msg.textContent = '🎉 Subscribed! Exclusive offers are on their way.';
      msg.style.color = 'var(--gold)';
      form.reset();
      setTimeout(() => { msg.textContent = ''; }, 5000);
    } else {
      msg.textContent = '❌ ' + (data.message || 'Failed. Try again.');
      msg.style.color = '#ff6b6b';
    }
  } catch (error) {
    msg.textContent = '❌ Network error. Please try again.';
    msg.style.color = '#ff6b6b';
  }
});

/* ============================================================
   11. BACK TO TOP
   ============================================================ */
const backToTop = document.getElementById('back-to-top');

function toggleBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
   12. SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   13. PARALLAX EFFECT (Hero)
   ============================================================ */
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    const scrolled = window.scrollY;
    heroImg.style.transform = `scale(1.06) translateY(${scrolled * 0.2}px)`;
  }
});

/* ============================================================
   14. MENU CARD ENTRANCE AFTER FILTER CHANGE
   ============================================================ */
// Re-observe new elements after tab switch (already handled in renderMenuCards)

/* ============================================================
   15. INPUT FLOATING LABEL ANIMATION
   ============================================================ */
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
  el.addEventListener('focus', () => {
    el.parentElement.classList.add('focused');
  });
  el.addEventListener('blur', () => {
    el.parentElement.classList.remove('focused');
  });
});

/* ============================================================
   16. DIGITAL MENU QR CODE
   ============================================================ */
function initMenuQR() {
  const qrImg = document.getElementById('menu-qr-img');
  const downloadBtn = document.getElementById('download-qr-btn');
  if (!qrImg || !downloadBtn) return;

  // Use the current origin + path + #menu to dynamically point to the menu section
  const menuUrl = window.location.origin + window.location.pathname + '#menu';
  
  // Set the QR Code image source with gold color (#c9974a) and matching dark theme background (#141008)
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=c9974a&bgcolor=141008&data=${encodeURIComponent(menuUrl)}`;
  qrImg.src = qrApiUrl;

  // Make the QR Code downloadable
  downloadBtn.addEventListener('click', async () => {
    downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Downloading...';
    downloadBtn.disabled = true;
    try {
      // Fetch the image as blob to bypass cross-origin restrictions on download attribute
      const response = await fetch(qrApiUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'brew-and-bliss-menu-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // Fallback: open image in new tab if blob fetch fails
      window.open(qrApiUrl, '_blank');
    } finally {
      downloadBtn.innerHTML = '<i class="fa-solid fa-download"></i> Download QR Code';
      downloadBtn.disabled = false;
    }
  });
}

// Initialize QR code on DOMContentLoaded/load
document.addEventListener('DOMContentLoaded', initMenuQR);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initMenuQR();
}

/* ============================================================
   DONE — Brew & Bliss Café script loaded successfully
   ============================================================ */
console.log('%cBrew & Bliss Café ☕', 'color:#c9974a; font-size:20px; font-weight:bold; font-family:serif;');
console.log('%cWhere Every Sip Feels Like Home.', 'color:#9a8a78; font-size:13px;');
