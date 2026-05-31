(function () {
  window.openCustomerModal = function (name, host, seat, entryTime, exitTime, firstVisit, firstRepeat, visitCount, visitFreq, monthlySales, totalSales, notes) {
    var modal = document.querySelector('#customer-modal');
    if (!modal) return;
    var el;
    el = document.querySelector('#modal-name'); if (el) el.textContent = name;
    el = document.querySelector('#modal-host'); if (el) el.textContent = host;
    el = document.querySelector('#modal-seat'); if (el) el.textContent = seat;
    el = document.querySelector('#modal-entry-time'); if (el) el.textContent = entryTime;
    el = document.querySelector('#modal-exit-time'); if (el) el.textContent = exitTime;
    el = document.querySelector('#modal-first-visit'); if (el) el.textContent = firstVisit;
    el = document.querySelector('#modal-first-repeat'); if (el) el.textContent = firstRepeat;
    el = document.querySelector('#modal-visit-count'); if (el) el.textContent = visitCount;
    el = document.querySelector('#modal-visit-freq'); if (el) el.textContent = visitFreq;
    el = document.querySelector('#modal-monthly-sales'); if (el) el.textContent = monthlySales;
    el = document.querySelector('#modal-total-sales'); if (el) el.textContent = totalSales;
    el = document.querySelector('#modal-notes'); if (el) el.textContent = notes;
    modal.style.display = 'flex';
  };

  window.openHostModal = function (name, rank, age, todaySales, guests, nominations, dohan, after, ageVerification, permanentResidenceDate, monthlySales, monthlyAttendance, todayShift) {
    var modal = document.querySelector('#host-modal');
    if (!modal) return;
    var el;
    el = document.querySelector('#host-modal-name');               if (el) el.textContent = name;
    el = document.querySelector('#host-modal-rank');               if (el) el.textContent = rank;
    el = document.querySelector('#host-modal-age');                if (el) el.textContent = age;
    el = document.querySelector('#host-modal-monthly-sales');      if (el) el.textContent = monthlySales;
    el = document.querySelector('#host-modal-monthly-attendance'); if (el) el.textContent = monthlyAttendance;
    el = document.querySelector('#host-modal-today-shift');        if (el) el.textContent = todayShift;
    el = document.querySelector('#host-modal-today-sales');        if (el) el.textContent = todaySales;
    el = document.querySelector('#host-modal-guests');             if (el) el.textContent = guests;
    el = document.querySelector('#host-modal-nominations');        if (el) el.textContent = nominations;
    el = document.querySelector('#host-modal-dohan');              if (el) el.textContent = dohan;
    el = document.querySelector('#host-modal-after');              if (el) el.textContent = after;
    el = document.querySelector('#host-modal-age-verification');   if (el) el.textContent = ageVerification;
    el = document.querySelector('#host-modal-permanent-residence'); if (el) el.textContent = permanentResidenceDate;
    modal.style.display = 'flex';
  };

  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.querySelector('#customer-modal');
    if (modal) {
      var closeBtn = document.querySelector('#modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          modal.style.display = 'none';
        });
      }
      modal.addEventListener('click', function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

    var hostModal = document.querySelector('#host-modal');
    if (hostModal) {
      var hostCloseBtn = document.querySelector('#host-modal-close');
      if (hostCloseBtn) {
        hostCloseBtn.addEventListener('click', function () {
          hostModal.style.display = 'none';
        });
      }
      hostModal.addEventListener('click', function (event) {
        if (event.target === hostModal) {
          hostModal.style.display = 'none';
        }
      });
    }
  });
})();
