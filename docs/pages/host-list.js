document.addEventListener('DOMContentLoaded', function () {
  function isOverdue(dateStr) {
    if (!dateStr) return false;
    var parts = dateStr.split('/');
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    return year < 2026 || (year === 2026 && month <= 4);
  }

  var tbody = document.querySelector('#host-table tbody');

  MOCK_HOSTS.forEach(function (host) {
    var row = document.createElement('tr');
    row.dataset.hostId = host.id;
    var cells = [
      { value: host.name, className: 'cell-strong' },
      { value: host.rank },
      { value: host.monthlySales, className: 'cell-money' },
      { value: host.monthlyAttendance },
      { value: host.todayShift, className: host.todayShift === '休み' ? 'text-muted' : '' }
    ];

    cells.forEach(function (cell) {
      var td = document.createElement('td');
      td.textContent = cell.value;

      if (cell.className) {
        td.className = cell.className;
      }

      row.appendChild(td);
    });

    // 年齢確認セル
    var tdAge = document.createElement('td');
    var ageVal = host.ageVerification || '未確認';
    var ageSpan = document.createElement('span');
    if (ageVal === '成人済') {
      ageSpan.className = 'tag tag--success';
      ageSpan.style.cssText = 'background-color:var(--color-success-bg);color:var(--color-success);';
    } else if (ageVal === '未成年') {
      ageSpan.className = 'tag tag--danger';
      ageSpan.style.cssText = 'background-color:var(--color-danger-bg);color:var(--color-danger);';
    } else {
      ageSpan.className = 'tag';
    }
    ageSpan.textContent = ageVal;
    tdAge.appendChild(ageSpan);
    row.appendChild(tdAge);

    // 本籍地セル
    var tdAddr = document.createElement('td');
    var dateVal = host.permanentResidenceDate;
    if (dateVal) {
      tdAddr.textContent = dateVal;
      if (isOverdue(dateVal)) {
        tdAddr.style.color = 'var(--color-danger, #dc2626)';
        tdAddr.style.fontWeight = '600';
      }
    } else {
      var addrSpan = document.createElement('span');
      addrSpan.className = 'tag';
      addrSpan.textContent = '未確認';
      tdAddr.appendChild(addrSpan);
    }
    row.appendChild(tdAddr);

    tbody.appendChild(row);
  });

  var hostRows = document.querySelectorAll('#host-table tbody tr');
  hostRows.forEach(function (row) {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function () {
      var hostId = row.dataset.hostId;
      var hostData = null;
      for (var j = 0; j < MOCK_HOSTS.length; j++) {
        if (MOCK_HOSTS[j].id === hostId) {
          hostData = MOCK_HOSTS[j];
          break;
        }
      }
      var salesEntry = null;
      if (typeof TODAY_HOST_SALES !== 'undefined') {
        for (var i = 0; i < TODAY_HOST_SALES.length; i++) {
          if (TODAY_HOST_SALES[i].hostId === hostId) {
            salesEntry = TODAY_HOST_SALES[i];
            break;
          }
        }
      }
      openHostModal(
        row.cells[0].textContent,                                         // name
        row.cells[1].textContent,                                         // rank
        hostData ? hostData.age : '－',                                   // age
        salesEntry ? salesEntry.sales : '－',                             // todaySales
        salesEntry ? String(salesEntry.guests) : '－',                    // guests
        salesEntry ? String(salesEntry.nominations) : '－',               // nominations
        salesEntry ? salesEntry.dohan : '－',                             // dohan
        salesEntry ? salesEntry.after : '－',                             // after
        hostData ? (hostData.ageVerification || '未確認') : '未確認',     // ageVerification
        hostData ? (hostData.permanentResidenceDate || '未確認') : '未確認', // permanentResidenceDate
        row.cells[2].textContent,                                         // monthlySales
        row.cells[3].textContent,                                         // monthlyAttendance
        row.cells[4].textContent                                          // todayShift
      );
    });
  });

  // KPI カード更新
  var totalHosts = MOCK_HOSTS.filter(function (h) { return h.rank !== '体験入店'; }).length;
  var todayAttendance = MOCK_HOSTS.filter(function (h) { return h.todayShift !== '休み'; }).length;
  var topEntry = (typeof TODAY_HOST_SALES !== 'undefined' && TODAY_HOST_SALES.length > 0) ? TODAY_HOST_SALES[0] : null;
  var todayTrial = MOCK_HOSTS.filter(function (h) { return h.rank === '体験入店' && h.todayShift !== '休み'; }).length;

  var kpiEl;
  kpiEl = document.querySelector('#kpi-total-hosts');     if (kpiEl) kpiEl.textContent = totalHosts + '名';
  kpiEl = document.querySelector('#kpi-today-attendance'); if (kpiEl) kpiEl.textContent = todayAttendance + '名';
  kpiEl = document.querySelector('#kpi-top-host');         if (kpiEl) kpiEl.textContent = topEntry ? (function () { for (var i = 0; i < MOCK_HOSTS.length; i++) { if (MOCK_HOSTS[i].id === topEntry.hostId) return MOCK_HOSTS[i].name; } return topEntry.hostId; }()) : '－';
  kpiEl = document.querySelector('#kpi-top-sales');        if (kpiEl) kpiEl.textContent = topEntry ? topEntry.sales : '－';
  kpiEl = document.querySelector('#kpi-new-hosts');        if (kpiEl) kpiEl.textContent = todayTrial + '名';
});
