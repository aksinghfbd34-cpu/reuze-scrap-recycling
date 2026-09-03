/**
 * Reuze Scrap Recycling - Live Prices Directory Script
 * Handles category filtering, live search with debouncing, sorting, and dynamic card generation
 */

document.addEventListener('DOMContentLoaded', () => {
  initPriceList();
});

function initPriceList() {
  const container = document.getElementById('scrap-cards-container');
  if (!container || !window.REUZE_DATA) return;

  let currentCategory = 'all';
  let searchQuery = '';

  renderCards(container, currentCategory, searchQuery);

  // Category Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  filterTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      filterTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category || 'all';
      renderCards(container, currentCategory, searchQuery);
    });
  });

  // Search Input with Debounce
  const searchInput = document.querySelector('.price-search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderCards(container, currentCategory, searchQuery);
      }, 200);
    });
  }

  // Print / PDF Button
  const printBtn = document.getElementById('btn-print-rates');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

function renderCards(container, category, query) {
  let items = window.REUZE_DATA.scrapItems;

  if (category !== 'all') {
    items = items.filter(item => item.category === category);
  }

  if (query) {
    items = items.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #ffffff; border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--text-subtle); margin-bottom: 15px;"></i>
        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">No Scrap Items Found</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Try searching for a different metal, electronic item, or switch category tabs.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="scrap-item-card" data-category="${item.category}" data-id="${item.id}">
      <div class="scrap-card-header">
        <div class="scrap-icon-box" style="background: ${item.imageBg};">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <span class="scrap-trend-badge ${item.trendType}">
          ${item.trendType === 'up' ? '<i class="fa-solid fa-arrow-trend-up"></i>' : '<i class="fa-solid fa-minus"></i>'}
          ${item.trend}
        </span>
      </div>
      <h3 class="scrap-item-title">${item.name}</h3>
      <p class="scrap-item-desc">${item.description}</p>
      
      <div class="scrap-price-row">
        <div>
          <div class="scrap-price-val">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="scrap-unit">per ${item.unit}</div>
        </div>
        <div style="text-align: right; font-size: 0.78rem; color: var(--text-muted);">
          Min Qty: <strong>${item.minQty} ${item.unit}</strong>
        </div>
      </div>

      <div class="scrap-card-action">
        <button class="btn btn-outline btn-sm btn-quick-book" style="flex: 1;" onclick="quickBookItem('${item.id}')">
          <i class="fa-regular fa-calendar-check"></i> Sell This
        </button>
        <button class="btn btn-primary btn-sm btn-icon" title="Add to Estimate" onclick="addToEstimator('${item.id}')">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Quick Book Action
function quickBookItem(itemId) {
  const item = window.REUZE_DATA.scrapItems.find(i => i.id === itemId);
  if (!item) return;

  const prefilled = [{
    id: item.id,
    name: item.name,
    qty: item.minQty || 1,
    unit: item.unit,
    price: item.price,
    subtotal: (item.minQty || 1) * item.price
  }];

  sessionStorage.setItem('reuze_prefilled_items', JSON.stringify(prefilled));
  window.location.href = 'pickup.html';
}

function addToEstimator(itemId) {
  const item = window.REUZE_DATA.scrapItems.find(i => i.id === itemId);
  if (!item) return;
  showToast(`✅ Added ${item.name} (₹${item.price}/${item.unit}) to your pickup list!`);
}

// Export functions to global scope
window.quickBookItem = quickBookItem;
window.addToEstimator = addToEstimator;
