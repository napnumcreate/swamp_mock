document.addEventListener('DOMContentLoaded', function () {
  var buttons = [
    { btn: document.getElementById('btn-today'), chart: document.getElementById('chart-today') },
    { btn: document.getElementById('btn-week'), chart: document.getElementById('chart-week') },
    { btn: document.getElementById('btn-month'), chart: document.getElementById('chart-month') }
  ];

  buttons.forEach(function (item) {
    if (!item.btn) return;
    item.btn.addEventListener('click', function () {
      buttons.forEach(function (b) {
        if (b.btn) { b.btn.className = 'btn btn-secondary'; }
        if (b.chart) { b.chart.classList.add('sales-chart-panel--hidden'); }
      });
      item.btn.className = 'btn btn-primary';
      if (item.chart) { item.chart.classList.remove('sales-chart-panel--hidden'); }
    });
  });
});
