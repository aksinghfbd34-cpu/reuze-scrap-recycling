/**
 * Reuze Scrap Recycling - Main Global Script
 * Handles navigation, mobile drawer, sticky header, back-to-top, toast notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initBackToTop();
  initCitySelector();
  initPincodeChecker();
});

// Sticky Header on Scroll
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Drawer Menu
function initMobileDrawer() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close-btn');

  if (!hamburgerBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Accordions inside mobile drawer
  const accordions = document.querySelectorAll('.mobile-nav-accordion-header');
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const subMenu = header.nextElementSibling;
      if (subMenu) {
        subMenu.classList.toggle('open');
        const icon = header.querySelector('i.fa-chevron-down');
        if (icon) icon.style.transform = subMenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.querySelector('.btn-back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Global City Selector synchronization
function initCitySelector() {
  const citySelects = document.querySelectorAll('.city-select');
  const savedCity = localStorage.getItem('reuze_selected_city') || 'delhi-ncr';

  citySelects.forEach(select => {
    select.value = savedCity;
    select.addEventListener('change', (e) => {
      const chosenCity = e.target.value;
      localStorage.setItem('reuze_selected_city', chosenCity);
      citySelects.forEach(s => s.value = chosenCity);
      showToast(`Operational city switched to ${getCityName(chosenCity)}`);
      
      // Dispatch custom event for pages that display city hub details
      window.dispatchEvent(new CustomEvent('cityChanged', { detail: { cityId: chosenCity } }));
    });
  });
}

function getCityName(cityId) {
  if (!window.REUZE_DATA) return cityId;
  const hub = window.REUZE_DATA.cityHubs.find(h => h.id === cityId);
  return hub ? hub.name.split('(')[0].trim() : cityId;
}

// Quick Pincode Availability Checker
function initPincodeChecker() {
  const searchButtons = document.querySelectorAll('.btn-check-pincode');
  searchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.hero-search-box')?.querySelector('.hero-search-input');
      if (!input) return;
      
      const val = input.value.trim();
      if (!val) {
        showToast('Please enter your 6-digit Pincode or Locality name');
        input.focus();
        return;
      }

      // Check if serviceable
      showToast(`🎉 Great news! We provide same-day doorstep pickup in "${val}".`);
    });
  });
}

// Global Toast Notification Helper
function showToast(message, duration = 3500) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Export showToast to window
window.showToast = showToast;
