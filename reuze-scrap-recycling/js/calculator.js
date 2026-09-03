/**
 * Reuze Scrap Recycling - Live Scrap Price Calculator
 * Interactive weight/quantity sliders, real-time total payout & environmental impact calculation
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrapCalculator();
});

function initScrapCalculator() {
  const calcContainer = document.querySelector('.calculator-container');
  if (!calcContainer || !window.REUZE_DATA) return;

  // Selected default items for calculator
  const defaultItemIds = ['copper-wire', 'split-ac-15', 'iron-heavy', 'laptop-working', 'corrugated-carton', 'lead-battery'];
  
  // State: itemId -> quantity
  const calcState = {
    'copper-wire': 5,
    'split-ac-15': 1,
    'iron-heavy': 25,
    'laptop-working': 1,
    'corrugated-carton': 20,
    'lead-battery': 12
  };

  renderCalculatorRows(calcContainer, calcState);
  recalculateTotals(calcState);

  // Add Item Dropdown event
  const addItemSelect = calcContainer.querySelector('#calc-add-item-select');
  if (addItemSelect) {
    populateAddItemSelect(addItemSelect, calcState);
    addItemSelect.addEventListener('change', (e) => {
      const selectedId = e.target.value;
      if (selectedId && !calcState[selectedId]) {
        calcState[selectedId] = 5;
        renderCalculatorRows(calcContainer, calcState);
        populateAddItemSelect(addItemSelect, calcState);
        recalculateTotals(calcState);
        showToast('Added item to your calculation estimate');
      }
      addItemSelect.value = '';
    });
  }

  // "Book Free Pickup with Estimate" Button
  const bookWithEstimateBtn = calcContainer.querySelector('#btn-book-with-estimate');
  if (bookWithEstimateBtn) {
    bookWithEstimateBtn.addEventListener('click', () => {
      // Save items to sessionStorage for pickup wizard
      const selectedItemsData = Object.keys(calcState)
        .filter(id => calcState[id] > 0)
        .map(id => {
          const item = window.REUZE_DATA.scrapItems.find(i => i.id === id);
          return {
            id: item.id,
            name: item.name,
            qty: calcState[id],
            unit: item.unit,
            price: item.price,
            subtotal: calcState[id] * item.price
          };
        });

      sessionStorage.setItem('reuze_prefilled_items', JSON.stringify(selectedItemsData));
      window.location.href = 'pickup.html';
    });
  }
}

function populateAddItemSelect(selectEl, calcState) {
  selectEl.innerHTML = '<option value="">+ Add More Scrap Items...</option>';
  window.REUZE_DATA.scrapItems.forEach(item => {
    if (!calcState[item.id]) {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.name} (₹${item.price}/${item.unit})`;
      selectEl.appendChild(opt);
    }
  });
}

function renderCalculatorRows(calcContainer, calcState) {
  const rowsList = calcContainer.querySelector('.calc-rows-list');
  if (!rowsList) return;

  rowsList.innerHTML = '';

  Object.keys(calcState).forEach(itemId => {
    const item = window.REUZE_DATA.scrapItems.find(i => i.id === itemId);
    if (!item) return;

    const currentQty = calcState[itemId];
    const maxQty = item.unit === 'piece' ? 10 : 100;
    const step = 1;

    const row = document.createElement('div');
    row.className = 'calc-row-item';
    row.innerHTML = `
      <div class="calc-item-info">
        <div class="scrap-icon-box" style="background: ${item.imageBg};">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <div>
          <div style="font-weight: 700; font-size: 0.95rem;">${item.name}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Rate: ₹${item.price} / ${item.unit}</div>
        </div>
      </div>
      <div class="calc-slider-wrapper">
        <input type="range" class="calc-slider" min="0" max="${maxQty}" step="${step}" value="${currentQty}" data-id="${item.id}">
        <input type="number" class="calc-qty-input" min="0" max="${maxQty * 2}" value="${currentQty}" data-id="${item.id}">
        <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted);">${item.unit}</span>
      </div>
      <div class="calc-item-total" id="total-${item.id}">
        ₹${(currentQty * item.price).toLocaleString('en-IN')}
      </div>
    `;

    // Bind slider & number input sync
    const slider = row.querySelector('.calc-slider');
    const numInput = row.querySelector('.calc-qty-input');

    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 0;
      numInput.value = val;
      calcState[item.id] = val;
      updateRowTotal(item, val);
      recalculateTotals(calcState);
    });

    numInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value) || 0;
      slider.value = val;
      calcState[item.id] = val;
      updateRowTotal(item, val);
      recalculateTotals(calcState);
    });

    rowsList.appendChild(row);
  });
}

function updateRowTotal(item, qty) {
  const totalEl = document.getElementById(`total-${item.id}`);
  if (totalEl) {
    totalEl.textContent = `₹${(qty * item.price).toLocaleString('en-IN')}`;
  }
}

function recalculateTotals(calcState) {
  let grandTotal = 0;
  let totalApproxKg = 0;

  Object.keys(calcState).forEach(itemId => {
    const item = window.REUZE_DATA.scrapItems.find(i => i.id === itemId);
    if (!item) return;
    const qty = calcState[itemId];
    grandTotal += qty * item.price;
    
    // Approximate kg for impact
    if (item.unit === 'kg') {
      totalApproxKg += qty;
    } else {
      totalApproxKg += qty * 15; // approx 15kg for large appliances/PCs
    }
  });

  // Update DOM total
  const grandTotalEl = document.getElementById('calc-grand-payout');
  if (grandTotalEl) {
    grandTotalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  }

  // Update live eco impact in calculator panel
  const co2El = document.getElementById('calc-co2-saved');
  const treesEl = document.getElementById('calc-trees-saved');
  if (co2El) co2El.textContent = `${Math.round(totalApproxKg * 2.1)} kg`;
  if (treesEl) treesEl.textContent = `${(totalApproxKg * 0.015).toFixed(1)} Trees`;
}
