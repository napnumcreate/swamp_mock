(function () {
  window.openCustomerModal = function (name, host, firstVisit, firstRepeat, visitCount, visitFreq, monthlySales, totalSales, notes) {
    var modal = document.querySelector('#customer-modal');
    if (!modal) return;
    document.querySelector('#modal-name').textContent = name;
    document.querySelector('#modal-host').textContent = host;
    document.querySelector('#modal-first-visit').textContent = firstVisit;
    document.querySelector('#modal-first-repeat').textContent = firstRepeat;
    document.querySelector('#modal-visit-count').textContent = visitCount;
    document.querySelector('#modal-visit-freq').textContent = visitFreq;
    document.querySelector('#modal-monthly-sales').textContent = monthlySales;
    document.querySelector('#modal-total-sales').textContent = totalSales;
    document.querySelector('#modal-notes').textContent = notes;
    modal.style.display = 'flex';
  };

  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.querySelector('#customer-modal');
    if (!modal) return;
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
  });
})();
