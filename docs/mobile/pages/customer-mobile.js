var MOBILE_CUSTOMER_LIST = [
  {
    name: '高橋 美優',
    rankLabel: 'VIP',
    rankClass: 'tag',
    lastVisit: '2026/05/23',
    visitCount: '28回',
    host: 'REN',
    visitFreq: '月3回',
    monthlySales: '¥285,000',
    totalSales: '¥4,200,000',
    firstVisit: '2023/08/15',
    firstRepeat: '2023/09/02',
    notes: 'シャンパン好み、VIP個室希望'
  },
  {
    name: '渡辺 ゆり',
    rankLabel: 'VIP',
    rankClass: 'tag',
    lastVisit: '2026/05/15',
    visitCount: '35回',
    host: 'REN',
    visitFreq: '月3回',
    monthlySales: '¥210,000',
    totalSales: '¥5,600,000',
    firstVisit: '2022/12/10',
    firstRepeat: '2023/01/05',
    notes: 'ワイン好み、連れ来店多い'
  },
  {
    name: '佐々木 結衣',
    rankLabel: 'レギュラー',
    rankClass: 'badge badge-info',
    lastVisit: '2026/05/20',
    visitCount: '15回',
    host: 'REN',
    visitFreq: '月2回',
    monthlySales: '¥88,000',
    totalSales: '¥1,240,000',
    firstVisit: '2025/02/11',
    firstRepeat: '2025/03/07',
    notes: ''
  },
  {
    name: '田中 彩香',
    rankLabel: 'レギュラー',
    rankClass: 'badge badge-info',
    lastVisit: '2026/05/19',
    visitCount: '7回',
    host: 'REN',
    visitFreq: '月1回',
    monthlySales: '¥42,000',
    totalSales: '¥360,000',
    firstVisit: '2025/10/22',
    firstRepeat: '2025/11/15',
    notes: 'ソフトドリンク希望'
  },
  {
    name: '木村 なな',
    rankLabel: '新規',
    rankClass: 'badge badge-neutral',
    lastVisit: '2026/05/24',
    visitCount: '2回',
    host: 'REN',
    visitFreq: '－',
    monthlySales: '¥36,000',
    totalSales: '¥36,000',
    firstVisit: '2026/05/10',
    firstRepeat: '2026/05/24',
    notes: ''
  }
];

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
        '<div class="mobile-list-title"><span>' + c.name + '</span>' +
        '<span class="' + c.rankClass + '">' + c.rankLabel + '</span></div>' +
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
    set('mcm-host', c.host);
    set('mcm-visit-count', c.visitCount);
    set('mcm-visit-freq', c.visitFreq);
    set('mcm-monthly-sales', c.monthlySales);
    set('mcm-total-sales', c.totalSales);
    set('mcm-first-visit', c.firstVisit);
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
      var filtered = MOBILE_CUSTOMER_LIST.filter(function (c) {
        return c.name.indexOf(query) !== -1;
      });
      renderCustomers(filtered);
    });
  }

  renderCustomers(MOBILE_CUSTOMER_LIST);
});
