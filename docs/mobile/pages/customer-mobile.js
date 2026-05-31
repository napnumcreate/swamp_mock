document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('customer-list');
  var searchInput = document.getElementById('customer-search');
  var modal = document.getElementById('mobile-customer-modal');
  var modalClose = document.getElementById('mcm-close');

  function renderCustomers(list) {
    if (!container) return;
    container.innerHTML = '';
    list.forEach(function (c) {
      var article = document.createElement('article');
      article.className = 'mobile-card';
      article.style.cursor = 'pointer';
      article.innerHTML =
        '<div class="mobile-list-title"><span>' + c.name + '</span></div>' +
        '<p class="mobile-list-meta">最終来店日：' + c.lastVisit + ' / 来店回数：' + c.visitCount + '</p>';
      article.addEventListener('click', function () {
        openModal(c);
      });
      container.appendChild(article);
    });
  }

  function openModal(c) {
    if (!modal) return;
    var set = function (id, val) {
      var el = document.getElementById(id);
      if (el) el.textContent = (val && val !== '') ? val : '－';
    };
    set('mcm-name', c.name);
    var _hr = (typeof MOCK_HOSTS !== 'undefined') ? MOCK_HOSTS.filter(function(m){ return m.id === c.hostId; })[0] : null;
    set('mcm-host', _hr ? _hr.name : c.hostId);
    set('mcm-visit-count', c.visitCount);
    set('mcm-visit-freq', c.visitFreq);
    set('mcm-monthly-sales', c.monthlySales);
    set('mcm-total-sales', c.totalSales);
    set('mcm-first-visit', c.registerDate);
    set('mcm-first-repeat', c.firstRepeat);
    set('mcm-notes', c.notes);
    modal.style.display = 'flex';
  }

  if (modalClose) {
    modalClose.addEventListener('click', function () {
      if (modal) modal.style.display = 'none';
    });
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = searchInput.value;
      var renCustomers = MOCK_CUSTOMERS.filter(function (c) { return c.hostId === 'ren'; });
      var filtered = renCustomers.filter(function (c) {
        return c.name.indexOf(query) !== -1;
      });
      renderCustomers(filtered);
    });
  }

  renderCustomers(MOCK_CUSTOMERS.filter(function (c) { return c.hostId === 'ren'; }));
});
