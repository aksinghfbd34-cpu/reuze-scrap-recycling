/**
 * Reuze Scrap Recycling - 4-Step Pickup Booking Wizard
 * Item selection -> Address & Time Slot -> Contact & Payout -> Instant Confirmation & LocalStorage Store
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingWizard();
});

function initBookingWizard() {
  const wizardForm = document.getElementById('pickup-wizard-form');
  if (!wizardForm || !window.REUZE_DATA) return;

  let currentStep = 1;
  const totalSteps = 4;

  // Booking Data Model
  const bookingState = {
    selectedItems: {}, // itemId -> { qty, unit, price, name }
    city: localStorage.getItem('reuze_selected_city') || 'delhi-ncr',
    address: '',
    pincode: '',
    landmark: '',
    slotDate: 'Tomorrow, Sep 4',
    slotTime: 'Morning (9:00 AM - 12:00 PM)',
    fullName: '',
    phone: '',
    email: '',
    paymentMode: 'upi',
    upiId: '',
    bankAccount: '',
    bankIfsc: '',
    specialInstructions: ''
  };

  // Prepopulate items from sessionStorage if available
  const prefilledRaw = sessionStorage.getItem('reuze_prefilled_items');
  if (prefilledRaw) {
    try {
      const prefilledList = JSON.parse(prefilledRaw);
      prefilledList.forEach(item => {
        bookingState.selectedItems[item.id] = {
          qty: item.qty,
          unit: item.unit,
          price: item.price,
          name: item.name
        };
      });
      sessionStorage.removeItem('reuze_prefilled_items'); // clear once consumed
    } catch (e) {
      console.error(e);
    }
  }

  // Initialize UI components
  renderStep1Items(bookingState);
  setupStepNavigation(wizardForm, bookingState, currentStep, totalSteps);
  setupSlotPicker(bookingState);
  setupPaymentModeToggle(bookingState);
}

function renderStep1Items(bookingState) {
  const itemsContainer = document.getElementById('wizard-items-selection-grid');
  if (!itemsContainer) return;

  itemsContainer.innerHTML = window.REUZE_DATA.scrapItems.map(item => {
    const isSelected = !!bookingState.selectedItems[item.id];
    const currentQty = isSelected ? bookingState.selectedItems[item.id].qty : item.minQty || 1;

    return `
      <div class="wizard-item-select-card ${isSelected ? 'selected' : ''}" data-id="${item.id}">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" class="item-checkbox" data-id="${item.id}" ${isSelected ? 'checked' : ''}>
            <span style="font-weight: 700; font-size: 0.95rem;">${item.name}</span>
          </div>
          <span style="font-weight: 800; color: var(--primary); font-size: 0.95rem;">₹${item.price}/${item.unit}</span>
        </div>

        <div class="item-qty-row" style="display: ${isSelected ? 'flex' : 'none'}; align-items: center; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--border-subtle);">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Estimated Quantity:</span>
          <div style="display: flex; align-items: center; gap: 6px;">
            <input type="number" class="wizard-qty-input form-control" style="width: 70px; padding: 4px 8px; text-align: center;" min="1" max="1000" value="${currentQty}" data-id="${item.id}">
            <span style="font-size: 0.85rem; font-weight: 600;">${item.unit}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach Checkbox and Qty listeners
  itemsContainer.querySelectorAll('.wizard-item-select-card').forEach(card => {
    const checkbox = card.querySelector('.item-checkbox');
    const qtyRow = card.querySelector('.item-qty-row');
    const qtyInput = card.querySelector('.wizard-qty-input');
    const itemId = card.dataset.id;
    const item = window.REUZE_DATA.scrapItems.find(i => i.id === itemId);

    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        card.classList.add('selected');
        qtyRow.style.display = 'flex';
        bookingState.selectedItems[itemId] = {
          qty: parseInt(qtyInput.value) || item.minQty || 1,
          unit: item.unit,
          price: item.price,
          name: item.name
        };
      } else {
        card.classList.remove('selected');
        qtyRow.style.display = 'none';
        delete bookingState.selectedItems[itemId];
      }
      updateStep1Summary(bookingState);
    });

    qtyInput.addEventListener('input', (e) => {
      if (bookingState.selectedItems[itemId]) {
        bookingState.selectedItems[itemId].qty = parseInt(e.target.value) || 1;
        updateStep1Summary(bookingState);
      }
    });
  });

  updateStep1Summary(bookingState);
}

function updateStep1Summary(bookingState) {
  const selectedCount = Object.keys(bookingState.selectedItems).length;
  let estimatedTotal = 0;

  Object.values(bookingState.selectedItems).forEach(item => {
    estimatedTotal += item.qty * item.price;
  });

  const countEl = document.getElementById('wizard-selected-count');
  const totalEl = document.getElementById('wizard-estimated-total');

  if (countEl) countEl.textContent = `${selectedCount} items selected`;
  if (totalEl) totalEl.textContent = `₹${estimatedTotal.toLocaleString('en-IN')}`;
}

function setupSlotPicker(bookingState) {
  const slotCards = document.querySelectorAll('.slot-option-card');
  slotCards.forEach(card => {
    card.addEventListener('click', () => {
      slotCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      bookingState.slotTime = card.dataset.slot;
    });
  });

  const dateSelect = document.getElementById('wizard-pickup-date');
  if (dateSelect) {
    dateSelect.addEventListener('change', (e) => {
      bookingState.slotDate = e.target.value;
    });
  }
}

function setupPaymentModeToggle(bookingState) {
  const paymentRadios = document.querySelectorAll('input[name="payment-mode"]');
  const upiField = document.getElementById('payout-upi-container');
  const bankField = document.getElementById('payout-bank-container');

  paymentRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      bookingState.paymentMode = e.target.value;
      if (upiField) upiField.style.display = e.target.value === 'upi' ? 'block' : 'none';
      if (bankField) bankField.style.display = e.target.value === 'bank' ? 'block' : 'none';
    });
  });
}

function setupStepNavigation(form, bookingState, currentStep, totalSteps) {
  const nextBtn = document.getElementById('wizard-btn-next');
  const prevBtn = document.getElementById('wizard-btn-prev');
  const submitBtn = document.getElementById('wizard-btn-submit');

  function updateWizardView(step) {
    // Update step view
    for (let i = 1; i <= totalSteps; i++) {
      const stepSection = document.getElementById(`wizard-step-${i}`);
      const node = document.querySelector(`.wizard-step-node[data-step="${i}"]`);
      if (stepSection) stepSection.style.display = i === step ? 'block' : 'none';
      if (node) {
        node.classList.remove('active', 'completed');
        if (i < step) node.classList.add('completed');
        if (i === step) node.classList.add('active');
      }
    }

    // Update progress bar line
    const progressFill = document.querySelector('.wizard-progress-fill');
    if (progressFill) {
      const percentage = ((step - 1) / (totalSteps - 1)) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    // Button visibilities
    if (prevBtn) prevBtn.style.display = step > 1 && step < 4 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.style.display = step < 3 ? 'inline-flex' : 'none';
    if (submitBtn) submitBtn.style.display = step === 3 ? 'inline-flex' : 'none';

    window.scrollTo({ top: 150, behavior: 'smooth' });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep === 1) {
        if (Object.keys(bookingState.selectedItems).length === 0) {
          showToast('⚠️ Please select at least 1 scrap item to continue');
          return;
        }
      }
      if (currentStep === 2) {
        const address = document.getElementById('wizard-address')?.value.trim();
        const pincode = document.getElementById('wizard-pincode')?.value.trim();
        if (!address || !pincode) {
          showToast('⚠️ Please provide your full pickup address and pincode');
          return;
        }
        bookingState.address = address;
        bookingState.pincode = pincode;
        bookingState.landmark = document.getElementById('wizard-landmark')?.value.trim() || '';
      }

      currentStep++;
      updateWizardView(currentStep);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardView(currentStep);
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('wizard-name')?.value.trim();
      const phone = document.getElementById('wizard-phone')?.value.trim();
      const email = document.getElementById('wizard-email')?.value.trim();

      if (!name || !phone || phone.length < 10) {
        showToast('⚠️ Please enter a valid name and 10-digit mobile number');
        return;
      }

      bookingState.fullName = name;
      bookingState.phone = phone;
      bookingState.email = email;
      bookingState.upiId = document.getElementById('wizard-upi-id')?.value.trim() || '';
      bookingState.specialInstructions = document.getElementById('wizard-instructions')?.value.trim() || '';

      // Complete booking
      const generatedBookingId = `RZ-${Math.floor(10000 + Math.random() * 90000)}`;
      
      const newBooking = {
        id: generatedBookingId,
        customerName: bookingState.fullName,
        phone: bookingState.phone,
        email: bookingState.email,
        city: bookingState.city,
        address: `${bookingState.address}, Pincode: ${bookingState.pincode}`,
        items: Object.values(bookingState.selectedItems).map(item => ({
          name: item.name,
          qty: `${item.qty} ${item.unit}`,
          rate: `₹${item.price}/${item.unit}`,
          subtotal: item.qty * item.price
        })),
        estimatedPayout: Object.values(bookingState.selectedItems).reduce((acc, curr) => acc + (curr.qty * curr.price), 0),
        slotDate: `${bookingState.slotDate} (${bookingState.slotTime})`,
        paymentMode: bookingState.paymentMode,
        status: 'booked',
        statusIndex: 0,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      saveBookingToLocalStorage(newBooking);

      // Render step 4 confirmation
      renderStep4Confirmation(newBooking);
      currentStep = 4;
      updateWizardView(currentStep);

      showToast(`🎉 Pickup Booked Successfully! ID: ${generatedBookingId}`);
    });
  }

  updateWizardView(currentStep);
}

function saveBookingToLocalStorage(booking) {
  let existing = [];
  try {
    const raw = localStorage.getItem('reuze_user_bookings');
    if (raw) existing = JSON.parse(raw);
  } catch (e) {
    existing = [];
  }
  existing.unshift(booking);
  localStorage.setItem('reuze_user_bookings', JSON.stringify(existing));
}

function renderStep4Confirmation(booking) {
  const container = document.getElementById('wizard-step-4-content');
  if (!container) return;

  container.innerHTML = `
    <div style="text-align: center; padding: 20px 0;">
      <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--primary-light); color: var(--primary); font-size: 2.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
        <i class="fa-solid fa-check"></i>
      </div>
      <h2 style="font-size: 1.8rem; margin-bottom: 8px;">Pickup Scheduled Successfully!</h2>
      <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 24px auto;">
        We have assigned your request to the nearest Eco-Hub. An SMS & WhatsApp confirmation has been dispatched.
      </p>

      <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 24px; text-align: left; max-width: 520px; margin: 0 auto 28px auto; border: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 12px;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Booking Reference ID:</span>
          <span style="font-size: 1.1rem; font-weight: 800; color: var(--primary); font-family: var(--font-heading);">${booking.id}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
          <span style="color: var(--text-muted);">Scheduled Slot:</span>
          <strong>${booking.slotDate}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
          <span style="color: var(--text-muted);">Address:</span>
          <span style="text-align: right; max-width: 60%;">${booking.address}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
          <span style="color: var(--text-muted);">Payout Estimate:</span>
          <strong style="color: var(--primary); font-size: 1.05rem;">₹${booking.estimatedPayout.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap;">
        <a href="dashboard.html" class="btn btn-primary btn-lg">
          <i class="fa-solid fa-truck-fast"></i> Track Live Status in Dashboard
        </a>
        <a href="index.html" class="btn btn-outline btn-lg">
          <i class="fa-solid fa-house"></i> Return to Home
        </a>
      </div>
    </div>
  `;
}
