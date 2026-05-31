document.addEventListener('DOMContentLoaded', function () {
  function getHostName(hostId) {
    if (typeof MOCK_HOSTS === 'undefined') return hostId;
    for (var i = 0; i < MOCK_HOSTS.length; i++) {
      if (MOCK_HOSTS[i].id === hostId) return MOCK_HOSTS[i].name;
    }
    return hostId;
  }

  var customerTbody = document.querySelector('#customer-table tbody');
  MOCK_CUSTOMERS.forEach(function (c) {
    var tr = document.createElement('tr');
    tr.dataset.registerDate = c.registerDate;
    tr.dataset.firstRepeat = c.firstRepeat;
    tr.dataset.visitCount = c.visitCount;
    tr.dataset.visitFreq = c.visitFreq;
    tr.dataset.monthlySales = c.monthlySales;
    tr.dataset.totalSales = c.totalSales;
    tr.dataset.notes = c.notes;
    tr.innerHTML =
      '<td class="cell-strong">' + c.name + '</td>' +
      '<td>' + getHostName(c.hostId) + '</td>' +
      '<td>' + c.registerDate + '</td>' +
      '<td>' + c.firstRepeat + '</td>' +
      '<td>' + c.visitCount + '</td>' +
      '<td>' + c.visitFreq + '</td>' +
      '<td class="cell-money">' + c.monthlySales + '</td>' +
      '<td class="cell-money">' + c.totalSales + '</td>' +
      '<td>' + (c.notes ? '有' : '無') + '</td>';
    customerTbody.appendChild(tr);
  });

  var customerRows = document.querySelectorAll('#customer-table tbody tr');
  var PAGE_SIZE = 10;
  var currentPage = 1;
  var totalPages = Math.ceil(customerRows.length / PAGE_SIZE);

  function renderPage(page) {
    currentPage = page;
    customerRows.forEach(function (row, index) {
      var pageStart = (page - 1) * PAGE_SIZE;
      var pageEnd = pageStart + PAGE_SIZE;
      row.style.display = (index >= pageStart && index < pageEnd) ? '' : 'none';
    });
    updatePagination();
  }

  function updatePagination() {
    var pagination = document.querySelector('#customer-pagination');
    pagination.innerHTML = '';

    var previousButton = document.createElement('button');
    previousButton.type = 'button';
    previousButton.className = 'btn btn-ghost btn-sm';
    previousButton.textContent = '‹';
    previousButton.disabled = currentPage === 1;
    previousButton.addEventListener('click', function () {
      renderPage(currentPage - 1);
    });
    pagination.appendChild(previousButton);

    for (var page = 1; page <= totalPages; page += 1) {
      (function (pageNumber) {
        var pageButton = document.createElement('button');
        pageButton.type = 'button';
        pageButton.className = pageNumber === currentPage ? 'btn btn-sm' : 'btn btn-ghost btn-sm';
        pageButton.textContent = pageNumber;
        pageButton.addEventListener('click', function () {
          renderPage(pageNumber);
        });
        pagination.appendChild(pageButton);
      }(page));
    }

    var nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'btn btn-ghost btn-sm';
    nextButton.textContent = '›';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', function () {
      renderPage(currentPage + 1);
    });
    pagination.appendChild(nextButton);
  }

  customerRows.forEach(function (row) {
    row.style.cursor = 'pointer';
    row.addEventListener('click', function () {
      openCustomerModal(
        row.cells[0].textContent,  // name
        row.cells[1].textContent,  // host
        '',                        // seat（このモーダルには不要）
        '',                        // entryTime（このモーダルには不要）
        '',                        // exitTime（このモーダルには不要）
        row.dataset.registerDate,  // firstVisit
        row.dataset.firstRepeat,   // firstRepeat
        row.dataset.visitCount,    // visitCount
        row.dataset.visitFreq,     // visitFreq
        row.dataset.monthlySales,  // monthlySales
        row.dataset.totalSales,    // totalSales
        row.dataset.notes          // notes
      );
    });
  });

  renderPage(1);
});
