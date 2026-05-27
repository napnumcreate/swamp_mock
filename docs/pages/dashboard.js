document.addEventListener('DOMContentLoaded', function () {
  var salesTbody = document.querySelector('#sales-report-table tbody');
  function parseSales(salesStr) {
    return parseInt(salesStr.replace(/[¥,]/g, ''), 10) || 0;
  }
  var sortedSales = TODAY_HOST_SALES.slice().sort(function (a, b) {
    return parseSales(b.sales) - parseSales(a.sales);
  });
  var rankLabels = {};
  if (sortedSales.length >= 1) rankLabels[sortedSales[0].hostId] = 'ラスソン';
  if (sortedSales.length >= 3) rankLabels[sortedSales[2].hostId] = 'オリシャン一位';

  TODAY_HOST_SALES.forEach(function (h) {
    var tr = document.createElement('tr');
    tr.dataset.hostId = h.hostId;
    tr.dataset.hasSales = (h.sales !== '¥0') ? 'yes' : 'no';
    tr.innerHTML =
      '<td class="cell-strong">' + h.name + '</td>' +
      '<td class="cell-money">' + h.sales + '</td>' +
      '<td>' + (rankLabels[h.hostId] || '－') + '</td>' +
      '<td class="cell-money">' + h.sales + '</td>' +
      '<td>' + h.guests + '組</td>' +
      '<td>' + h.nominations + '組</td>' +
      '<td>' + h.dohan + '</td>' +
      '<td>' + h.after + '</td>';
    salesTbody.appendChild(tr);
  });

  var salesRows = document.querySelectorAll('#sales-report-table tbody tr');
  salesRows.forEach(function (row) {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function () {
      var hostId = row.dataset.hostId;
      var hostEntry = null;
      var salesEntry = null;
      if (typeof MOCK_HOSTS !== 'undefined') {
        for (var i = 0; i < MOCK_HOSTS.length; i++) {
          if (MOCK_HOSTS[i].id === hostId) {
            hostEntry = MOCK_HOSTS[i];
            break;
          }
        }
      }
      if (typeof TODAY_HOST_SALES !== 'undefined') {
        for (var i = 0; i < TODAY_HOST_SALES.length; i++) {
          if (TODAY_HOST_SALES[i].hostId === hostId) {
            salesEntry = TODAY_HOST_SALES[i];
            break;
          }
        }
      }
      openHostModal(
        hostEntry ? hostEntry.name : row.cells[0].textContent, // name
        hostEntry ? hostEntry.rank : '－',                      // rank
        salesEntry ? salesEntry.sales : '－',                   // todaySales
        salesEntry ? String(salesEntry.guests) : '－',          // guests
        salesEntry ? String(salesEntry.nominations) : '－',     // nominations
        salesEntry ? salesEntry.dohan : '－',                   // dohan
        salesEntry ? salesEntry.after : '－',                   // after
        hostEntry ? hostEntry.monthlySales : '－',              // monthlySales
        hostEntry ? hostEntry.monthlyAttendance : '－',         // monthlyAttendance
        hostEntry ? hostEntry.todayShift : '－'                 // todayShift
      );
    });
  });

  var salesFilterBtns = document.querySelectorAll('.sales-filter-btn');

  function applySalesFilter(filter) {
    salesRows.forEach(function (row) {
      if (filter === 'all') {
        row.style.display = '';
      } else if (filter === 'with-sales') {
        row.style.display = row.dataset.hasSales === 'yes' ? '' : 'none';
      } else {
        row.style.display = row.dataset.hasSales === 'no' ? '' : 'none';
      }
    });
  }

  salesFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      salesFilterBtns.forEach(function (b) {
        b.className = 'tag tag-gray sales-filter-btn';
      });
      btn.className = 'tag sales-filter-btn';
      applySalesFilter(btn.dataset.salesFilter);
    });
  });

  applySalesFilter('with-sales');

  var visitTbody = document.querySelector('#visit-table tbody');
  TODAY_VISITS.forEach(function (v) {
    var tr = document.createElement('tr');
    tr.dataset.status = v.status;
    tr.dataset.registerDate = v.registerDate;
    tr.dataset.firstRepeat = v.firstRepeat;
    tr.dataset.visitCount = v.visitCount;
    tr.dataset.visitFreq = v.visitFreq;
    tr.dataset.monthlySales = v.monthlySales;
    tr.dataset.totalSales = v.totalSales;
    tr.dataset.notes = v.notes;
    tr.innerHTML =
      '<td class="cell-strong">' + v.name + '</td>' +
      '<td>' + v.host + '</td>' +
      '<td>' + v.seat + '</td>' +
      '<td class="cell-time">' + v.entryTime + '</td>' +
      '<td class="cell-time">' + v.exitTime + '</td>' +
      '<td class="cell-money">' + v.currentSales + '</td>';
    visitTbody.appendChild(tr);
  });

  var filterBtns = document.querySelectorAll('.filter-btn');
  var rows = document.querySelectorAll('#visit-table tbody tr');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.className = 'tag tag-gray filter-btn';
      });
      btn.className = 'tag filter-btn';
      var filter = btn.dataset.filter;
      rows.forEach(function (row) {
        row.style.display = (filter === 'all' || row.dataset.status === filter) ? '' : 'none';
      });
    });
  });

  rows.forEach(function (row) {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function () {
      openCustomerModal(
        row.cells[0].textContent,
        row.cells[1].textContent,
        row.cells[2].textContent,
        row.cells[3].textContent,
        row.cells[4].textContent,
        row.dataset.registerDate,
        row.dataset.firstRepeat,
        row.dataset.visitCount,
        row.dataset.visitFreq,
        row.dataset.monthlySales,
        row.dataset.totalSales,
        row.dataset.notes
      );
    });
  });

  rows.forEach(function (row) {
    row.style.display = row.dataset.status === 'active' ? '' : 'none';
  });
});
