/**
 * Reuze Scrap Recycling - Modals & Popups Controller
 * Handles Corporate B2B, Support Complaints, Certificate Popups, and Area Incharge contacts
 */

document.addEventListener('DOMContentLoaded', () => {
  initModals();
});

function initModals() {
  // Modal Triggers
  const triggers = document.querySelectorAll('[data-modal-target]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Modal Closers
  const closeButtons = document.querySelectorAll('.modal-close-btn, .modal-close-trigger');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close on backdrop click
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Corporate Form Submission
  const corporateForm = document.getElementById('corporate-enquiry-form');
  if (corporateForm) {
    corporateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🚀 Corporate bulk disposal request submitted! An Enterprise Key Account Manager will contact you within 2 business hours.');
      const modal = corporateForm.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
      corporateForm.reset();
      document.body.style.overflow = '';
    });
  }

  // Complaint Form Submission
  const complaintForm = document.getElementById('complaint-support-form');
  if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🎫 Support ticket created successfully! Ticket ID #TK-' + Math.floor(1000 + Math.random() * 9000));
      const modal = complaintForm.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
      complaintForm.reset();
      document.body.style.overflow = '';
    });
  }
}
