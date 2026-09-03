/**
 * Reuze Scrap Recycling - User Dashboard & Live Pickup Tracker
 * Order tracking, status simulator, Green Recycling Certificate modal & Digital Invoice
 */

document.addEventListener('DOMContentLoaded', () => {
  initUserDashboard();
});

function initUserDashboard() {
  const trackerContainer = document.getElementById('dashboard-active-booking-container');
  if (!trackerContainer || !window.REUZE_DATA) return;

  // Retrieve user bookings from localStorage or fallback to demo
  let userBookings = [];
  try {
    const raw = localStorage.getItem('reuze_user_bookings');
    if (raw) userBookings = JSON.parse(raw);
  } catch (e) {
    userBookings = [];
  }

  if (userBookings.length === 0) {
    userBookings = window.REUZE_DATA.demoBookings;
  }

  const activeBooking = userBookings[0];
  renderActiveTracker(trackerContainer, activeBooking);
  renderPickupHistory(userBookings);
  updateDashboardWallet(userBookings);
}

function renderActiveTracker(container, booking) {
  const stages = [
    { title: 'Booking Confirmed', desc: 'Request assigned to Eco-Hub', icon: 'fa-calendar-check' },
    { title: 'Scrap Hero Assigned', desc: 'Verified runner allocated', icon: 'fa-user-shield' },
    { title: 'Out For Pickup', desc: 'Van en-route to your doorstep', icon: 'fa-truck-fast' },
    { title: 'Weighed & Paid', desc: 'Digital scale & instant payout', icon: 'fa-money-bill-transfer' },
    { title: 'Certified Recycled', desc: 'Material in circular processing', icon: 'fa-recycle' }
  ];

  const currentStatusIndex = booking.statusIndex !== undefined ? booking.statusIndex : 2;
  const progressPercent = (currentStatusIndex / (stages.length - 1)) * 100;

  container.innerHTML = `
    <div class="dashboard-tracker-card">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 20px; margin-bottom: 25px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(16, 185, 129, 0.12); color: var(--primary); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; margin-bottom: 6px;">
            <i class="fa-solid fa-circle" style="font-size: 0.5rem;"></i> LIVE STATUS: ${stages[currentStatusIndex].title.toUpperCase()}
          </div>
          <h2 style="font-size: 1.6rem; font-weight: 800;">Booking ID: ${booking.id}</h2>
          <div style="font-size: 0.88rem; color: var(--text-muted);">Scheduled for: <strong>${booking.slotDate}</strong></div>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-outline btn-sm" onclick="advanceStatusDemo('${booking.id}')" title="Simulate next tracking stage">
            <i class="fa-solid fa-forward-step"></i> Next Step (Demo)
          </button>
          <button class="btn btn-primary btn-sm" onclick="openCertificateModal('${booking.id}')">
            <i class="fa-solid fa-award"></i> Green Certificate
          </button>
        </div>
      </div>

      <!-- 5-Stage Live Timeline -->
      <div class="status-timeline-tracker">
        <div class="status-progress-fill" style="width: ${progressPercent}%;"></div>
        ${stages.map((stage, idx) => {
          const isCompleted = idx < currentStatusIndex;
          const isActive = idx === currentStatusIndex;
          return `
            <div class="timeline-point ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}">
              <div class="timeline-dot">
                <i class="fa-solid ${stage.icon}"></i>
              </div>
              <div style="text-align: center; max-width: 140px;">
                <div style="font-weight: 700; font-size: 0.85rem; color: ${isActive ? 'var(--primary)' : 'var(--text-main)'};">${stage.title}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${stage.desc}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Active Scrap Hero Details & Item Breakdown -->
      <div class="dashboard-active-details-grid">
        <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 20px; border-left: 4px solid var(--primary);">
          <div style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Assigned Scrap Hero</div>
          <div style="font-size: 1.15rem; font-weight: 700; margin-top: 4px;">${booking.hero?.name || 'Dharmendra Kumar'}</div>
          <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">${booking.hero?.vehicle || 'EV Green Cargo Van (DL 1Z 4829)'}</div>
          
          <div style="display: flex; gap: 10px;">
            <a href="tel:${booking.hero?.phone || '+919811188990'}" class="btn btn-outline btn-sm" style="background: #ffffff;">
              <i class="fa-solid fa-phone"></i> Call Hero
            </a>
            <a href="https://wa.me/${(booking.hero?.phone || '+919811188990').replace(/[^0-9]/g, '')}" target="_blank" class="btn btn-outline btn-sm" style="background: #ffffff; color: #25d366; border-color: #25d366;">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp
            </a>
          </div>
        </div>

        <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 20px;">
          <div style="font-size: 0.82rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Pickup Items & Valuation</div>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem;">
            ${(booking.items || []).map(item => `
              <div style="display: flex; justify-content: space-between;">
                <span>${item.name} (${item.qty})</span>
                <strong>₹${item.subtotal?.toLocaleString('en-IN') || '---'}</strong>
              </div>
            `).join('')}
            <div style="display: flex; justify-content: space-between; border-top: 1px dashed var(--border-subtle); padding-top: 8px; margin-top: 6px; font-weight: 800; font-size: 1rem; color: var(--primary);">
              <span>Estimated Payout:</span>
              <span>₹${booking.estimatedPayout?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function advanceStatusDemo(bookingId) {
  let userBookings = [];
  try {
    const raw = localStorage.getItem('reuze_user_bookings');
    if (raw) userBookings = JSON.parse(raw);
  } catch (e) {
    userBookings = [];
  }

  if (userBookings.length === 0) {
    userBookings = window.REUZE_DATA.demoBookings;
  }

  const booking = userBookings.find(b => b.id === bookingId) || userBookings[0];
  let cur = booking.statusIndex !== undefined ? booking.statusIndex : 2;
  cur = (cur + 1) % 5;
  booking.statusIndex = cur;

  localStorage.setItem('reuze_user_bookings', JSON.stringify(userBookings));
  const trackerContainer = document.getElementById('dashboard-active-booking-container');
  if (trackerContainer) renderActiveTracker(trackerContainer, booking);
  showToast(`Demo: Tracking state advanced to Stage ${cur + 1}/5`);
}

function renderPickupHistory(bookings) {
  const historyContainer = document.getElementById('dashboard-history-table-body');
  if (!historyContainer) return;

  historyContainer.innerHTML = bookings.map(b => `
    <tr>
      <td style="padding: 14px 16px; font-weight: 700; color: var(--primary);">${b.id}</td>
      <td style="padding: 14px 16px;">${b.slotDate}</td>
      <td style="padding: 14px 16px; font-size: 0.88rem;">${(b.items || []).map(i => i.name).join(', ')}</td>
      <td style="padding: 14px 16px; font-weight: 700;">₹${b.estimatedPayout?.toLocaleString('en-IN')}</td>
      <td style="padding: 14px 16px;">
        <span class="badge-status" style="background: rgba(16, 185, 129, 0.15); color: #059669; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 700;">
          Completed
        </span>
      </td>
      <td style="padding: 14px 16px; text-align: right;">
        <button class="btn btn-outline btn-sm" onclick="openCertificateModal('${b.id}')">
          <i class="fa-solid fa-file-pdf"></i> Certificate
        </button>
      </td>
    </tr>
  `).join('');
}

function updateDashboardWallet(bookings) {
  let totalEarnings = 0;
  let totalKg = 0;

  bookings.forEach(b => {
    totalEarnings += b.estimatedPayout || 0;
    (b.items || []).forEach(i => {
      totalKg += parseInt(i.qty) || 10;
    });
  });

  const earnEl = document.getElementById('dash-wallet-earnings');
  const kgEl = document.getElementById('dash-wallet-kg');
  const treeEl = document.getElementById('dash-wallet-trees');

  if (earnEl) earnEl.textContent = `₹${totalEarnings.toLocaleString('en-IN')}`;
  if (kgEl) kgEl.textContent = `${totalKg} kg`;
  if (treeEl) treeEl.textContent = `${(totalKg * 0.015).toFixed(1)} Trees`;
}

function openCertificateModal(bookingId) {
  const modal = document.getElementById('certificate-modal');
  if (!modal) return;

  const refEl = modal.querySelector('#cert-booking-id');
  const dateEl = modal.querySelector('#cert-date');
  if (refEl) refEl.textContent = bookingId;
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  modal.classList.add('active');
}

// Export functions to global scope
window.advanceStatusDemo = advanceStatusDemo;
window.openCertificateModal = openCertificateModal;
