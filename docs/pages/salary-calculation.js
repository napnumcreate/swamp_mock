(function () {
  var formatYen = function (n) { return '¥' + n.toLocaleString('ja-JP'); };

  var hostTbody = document.getElementById('host-salary-tbody');
  HOST_SALARY.forEach(function (s) {
    var host = null;
    for (var i = 0; i < MOCK_HOSTS.length; i++) {
      if (MOCK_HOSTS[i].id === s.hostId) { host = MOCK_HOSTS[i]; break; }
    }
    if (!host) return;
    var badgeClass = s.status === '支払済' ? 'badge-success' : 'badge-warning';
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="cell-strong">' + host.name + '</td>' +
      '<td>' + host.rank + '</td>' +
      '<td class="cell-money"><strong>' + formatYen(s.net) + '</strong></td>' +
      '<td class="cell-money">' + formatYen(s.base) + '</td>' +
      '<td class="cell-money">' + formatYen(s.commission) + '</td>' +
      '<td class="cell-money">' + formatYen(s.salesBack) + '</td>' +
      '<td class="cell-money">' + formatYen(s.dohanBack) + '</td>' +
      '<td class="cell-money">' + formatYen(s.other) + '</td>' +
      '<td class="cell-money">' + formatYen(s.deduction) + '</td>' +
      '<td><span class="badge ' + badgeClass + '">' + s.status + '</span></td>';
    hostTbody.appendChild(tr);
  });

  var staffTbody = document.getElementById('staff-salary-tbody');
  STAFF_SALARY.forEach(function (s) {
    var staff = null;
    for (var i = 0; i < MOCK_STAFF.length; i++) {
      if (MOCK_STAFF[i].id === s.staffId) { staff = MOCK_STAFF[i]; break; }
    }
    if (!staff) return;
    var badgeClass = s.status === '支払済' ? 'badge-success' : 'badge-warning';
    var tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="cell-strong">' + staff.name + '</td>' +
      '<td>' + staff.title + '</td>' +
      '<td class="cell-money"><strong>' + formatYen(s.net) + '</strong></td>' +
      '<td class="cell-money">' + formatYen(s.base) + '</td>' +
      '<td class="cell-money">' + formatYen(s.allowance) + '</td>' +
      '<td class="cell-money">' + formatYen(s.deduction) + '</td>' +
      '<td><span class="badge ' + badgeClass + '">' + s.status + '</span></td>';
    staffTbody.appendChild(tr);
  });
})();

const tabButtons = document.querySelectorAll('[data-tab]');
const tabHost = document.getElementById('tab-host');
const tabStaff = document.getElementById('tab-staff');
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const showHost = button.dataset.tab === 'host';

    tabHost.style.display = showHost ? '' : 'none';
    tabStaff.style.display = showHost ? 'none' : '';

    tabButtons.forEach((tabButton) => {
      if (tabButton === button) {
        tabButton.classList.add('btn-tab--active');
      } else {
        tabButton.classList.remove('btn-tab--active');
      }
    });
  });
});

const sumPaymentAmounts = (selector) => {
  return Array.from(document.querySelectorAll(selector)).reduce((total, row) => {
    const paymentCell = row.querySelectorAll('td')[2];
    const paymentText = paymentCell.querySelector('strong')?.textContent || paymentCell.textContent;
    return total + parseInt(paymentText.replace(/[¥,]/g, ''), 10);
  }, 0);
};

const hostTotal = sumPaymentAmounts('#tab-host tbody tr');
const staffTotal = sumPaymentAmounts('#tab-staff tbody tr');
const grandTotal = hostTotal + staffTotal;
const unpaidCount = document.querySelectorAll('#tab-host .badge-warning, #tab-staff .badge-warning').length;
const kpiCards = document.querySelectorAll('.grid-4 .kpi-card');
const formatYen = (amount) => '¥' + amount.toLocaleString('ja-JP');

kpiCards[0].querySelector('.kpi-value').textContent = formatYen(grandTotal);
kpiCards[1].querySelector('.kpi-value').textContent = formatYen(hostTotal);
kpiCards[2].querySelector('.kpi-value').textContent = formatYen(staffTotal);
kpiCards[3].querySelector('.kpi-value').textContent = unpaidCount + '名';

const header = document.querySelector('header.header');
const initialMonthMatch = header.dataset.tag.match(/([0-9]{4})年([0-9]{1,2})月/);
let year = initialMonthMatch ? parseInt(initialMonthMatch[1], 10) : 2026;
let month = initialMonthMatch ? parseInt(initialMonthMatch[2], 10) : 5;
const baseYear = year;
const baseMonth = month;

const updateMonthDisplay = () => {
  const monthText = year + '年' + month + '月';
  document.getElementById('month-label').textContent = monthText;
  document.querySelector('.page-subtitle').textContent = monthText + '分 給与・報酬の確認';

  const headerTag = document.querySelector('header.header .tag');
  if (headerTag) {
    headerTag.textContent = monthText;
  }
};

document.getElementById('prev-month').addEventListener('click', () => {
  month--;
  if (month < 1) {
    month = 12;
    year--;
  }
  updateMonthDisplay();
});

document.getElementById('next-month').addEventListener('click', () => {
  month++;
  if (month > 12) {
    month = 1;
    year++;
  }
  updateMonthDisplay();
});

document.getElementById('this-month-btn').addEventListener('click', () => {
  year = baseYear;
  month = baseMonth;
  updateMonthDisplay();
});
