document.addEventListener('DOMContentLoaded', function () {
  var tbody = document.querySelector('#host-table tbody');

  MOCK_HOSTS.forEach(function (host) {
    var row = document.createElement('tr');
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

    tbody.appendChild(row);
  });

  var hostRows = document.querySelectorAll('#host-table tbody tr');
  hostRows.forEach(function (row) {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function () {
      var hostName = row.cells[0].textContent;
      var salesEntry = null;
      if (typeof TODAY_HOST_SALES !== 'undefined') {
        for (var i = 0; i < TODAY_HOST_SALES.length; i++) {
          if (TODAY_HOST_SALES[i].name === hostName) {
            salesEntry = TODAY_HOST_SALES[i];
            break;
          }
        }
      }
      openHostModal(
        row.cells[0].textContent,                                   // name
        row.cells[1].textContent,                                   // rank
        salesEntry ? salesEntry.sales : '－',                        // todaySales
        salesEntry ? String(salesEntry.guests) : '－',               // guests
        salesEntry ? String(salesEntry.nominations) : '－',          // nominations
        salesEntry ? salesEntry.dohan : '－',                        // dohan
        salesEntry ? salesEntry.after : '－',                        // after
        row.cells[2].textContent,                                   // monthlySales
        row.cells[3].textContent,                                   // monthlyAttendance
        row.cells[4].textContent                                    // todayShift
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
  kpiEl = document.querySelector('#kpi-top-host');         if (kpiEl) kpiEl.textContent = topEntry ? topEntry.name : '－';
  kpiEl = document.querySelector('#kpi-top-sales');        if (kpiEl) kpiEl.textContent = topEntry ? topEntry.sales : '－';
  kpiEl = document.querySelector('#kpi-new-hosts');        if (kpiEl) kpiEl.textContent = todayTrial + '名';
});
