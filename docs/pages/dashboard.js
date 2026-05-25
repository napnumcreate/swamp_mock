document.addEventListener('DOMContentLoaded', function () {
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
});
