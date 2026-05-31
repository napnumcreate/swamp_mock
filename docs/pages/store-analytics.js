(function () {
  var stores = window.MOCK_STORES || [];

  function formatMoney(value) {
    return '&yen;' + value.toLocaleString('ja-JP');
  }

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) {
      element.innerHTML = value;
    }
  }

  function renderKpis() {
    var totalSales = stores.reduce(function (sum, store) {
      return sum + store.monthlySales;
    }, 0);
    var totalVisits = stores.reduce(function (sum, store) {
      return sum + store.monthlyVisits;
    }, 0);
    var totalHosts = stores.reduce(function (sum, store) {
      return sum + store.hostCount;
    }, 0);
    var avgSpend = stores.length
      ? Math.round(stores.reduce(function (sum, store) {
        return sum + store.avgSpend;
      }, 0) / stores.length)
      : 0;

    setText('kpi-total-sales', formatMoney(totalSales));
    setText('kpi-total-visits', totalVisits.toLocaleString('ja-JP') + '組');
    setText('kpi-avg-spend', formatMoney(avgSpend));
    setText('kpi-total-hosts', totalHosts.toLocaleString('ja-JP') + '名');
  }

  function renderTable() {
    var tbody = document.getElementById('store-tbody');
    if (!tbody) {
      return;
    }

    tbody.innerHTML = stores.map(function (store) {
      return '<tr>'
        + '<td>' + store.name + ' <span class="tag">' + store.status + '</span></td>'
        + '<td class="cell-money">' + formatMoney(store.todaySales) + '</td>'
        + '<td class="cell-money">' + formatMoney(store.monthlySales) + '</td>'
        + '<td>'
        + '<div style="display:flex; align-items:center; gap:8px;">'
        + '<span>' + store.achievementRate + '%</span>'
        + '<span style="width:72px; height:6px; background:var(--color-surface-secondary); border-radius:4px; overflow:hidden; display:inline-block;">'
        + '<span style="display:block; width:' + store.achievementRate + '%; height:100%; background:var(--color-accent);"></span>'
        + '</span>'
        + '</div>'
        + '</td>'
        + '<td>' + store.hostCount + '名</td>'
        + '<td>' + store.monthlyVisits + '組</td>'
        + '<td class="cell-money">' + formatMoney(store.avgSpend) + '</td>'
        + '<td>' + store.vipCount + '名</td>'
        + '</tr>';
    }).join('');
  }

  function renderRanking() {
    var ranking = document.getElementById('store-ranking');
    if (!ranking) {
      return;
    }

    ranking.innerHTML = stores.slice().sort(function (a, b) {
      return b.monthlySales - a.monthlySales;
    }).map(function (store, index) {
      var trendClass = store.prevMonthChange > 0 ? 'kpi-trend kpi-trend--up' : 'kpi-trend';
      var trendPrefix = store.prevMonthChange > 0 ? '+' : '';

      return '<div class="detail-row">'
        + '<span class="detail-label"><span class="tag">' + (index + 1) + '位</span> ' + store.name + '</span>'
        + '<span class="detail-value">' + formatMoney(store.monthlySales)
        + ' <span class="' + trendClass + '">' + trendPrefix + store.prevMonthChange + '%</span>'
        + '</span>'
        + '</div>';
    }).join('');
  }

  function renderProgressTable() {
    var tbody = document.getElementById('progress-tbody');
    if (!tbody) return;

    var periods = [
      { key: 'daily', label: '日次' },
      { key: 'weekly', label: '週次' },
      { key: 'monthly', label: '月次' }
    ];

    var rows = [];
    stores.forEach(function (store) {
      periods.forEach(function (period, i) {
        var p = store.progress[period.key];
        var nameCell = i === 0
          ? '<td rowspan="3" style="vertical-align:middle; font-weight:600;">' + store.name + '</td>'
          : '';
        rows.push(
          '<tr>'
          + nameCell
          + '<td>' + period.label + '</td>'
          + '<td class="cell-money">' + formatMoney(p.actual) + '</td>'
          + '<td>'
          + '<div style="display:flex; align-items:center; gap:8px;">'
          + '<span>' + p.progressPct + '%</span>'
          + '<span style="width:72px; height:6px; background:var(--color-surface-secondary); border-radius:4px; overflow:hidden; display:inline-block;">'
          + '<span style="display:block; width:' + p.progressPct + '%; height:100%; background:#C9A84C;"></span>'
          + '</span>'
          + '</div>'
          + '</td>'
          + '<td>'
          + '<div style="display:flex; align-items:center; gap:8px;">'
          + '<span>' + p.timeAchievementPct + '%</span>'
          + '<span style="width:72px; height:6px; background:var(--color-surface-secondary); border-radius:4px; overflow:hidden; display:inline-block;">'
          + '<span style="display:block; width:' + p.timeAchievementPct + '%; height:100%; background:var(--color-success, #16a34a);"></span>'
          + '</span>'
          + '</div>'
          + '</td>'
          + '</tr>'
        );
      });
    });

    tbody.innerHTML = rows.join('');

    var COLOR_HOVER = 'var(--color-accent-light)';

    // Group hover: only from the store-name (rowspan) cell — highlights all 3 rows
    Array.prototype.slice.call(tbody.querySelectorAll('td[rowspan]')).forEach(function(nameCell) {
      var row1 = nameCell.parentElement;
      var row2 = row1.nextElementSibling;
      var row3 = row2 ? row2.nextElementSibling : null;
      var groupRows = [row1, row2, row3].filter(Boolean);
      var groupCells = [];
      groupRows.forEach(function(r) {
        Array.prototype.slice.call(r.querySelectorAll('td')).forEach(function(td) {
          groupCells.push(td);
        });
      });
      nameCell.addEventListener('mouseenter', function() {
        groupCells.forEach(function(td) { td.style.setProperty('background-color', COLOR_HOVER); });
      });
      nameCell.addEventListener('mouseleave', function() {
        groupCells.forEach(function(td) { td.style.removeProperty('background-color'); });
      });
    });

    // Individual hover: only for non-rowspan cells (期間/実績/進捗/時間達成率)
    // Does NOT highlight the store-name cell
    Array.prototype.slice.call(tbody.querySelectorAll('tr')).forEach(function(row) {
      var dataCells = Array.prototype.slice.call(row.querySelectorAll('td:not([rowspan])'));
      dataCells.forEach(function(td) {
        td.addEventListener('mouseenter', function() {
          dataCells.forEach(function(c) { c.style.setProperty('background-color', COLOR_HOVER); });
        });
        td.addEventListener('mouseleave', function(e) {
          var stillInRow = dataCells.some(function(c) {
            return c === e.relatedTarget || (e.relatedTarget && c.contains(e.relatedTarget));
          });
          if (!stillInRow) {
            dataCells.forEach(function(c) { c.style.removeProperty('background-color'); });
          }
        });
      });
    });
  }

  function renderProgressRateRanking() {
    var container = document.getElementById('progress-rate-ranking');
    if (!container) return;

    container.innerHTML = stores.slice().sort(function(a, b) {
      return b.achievementRate - a.achievementRate;
    }).map(function(store, index) {
      return '<div class="detail-row">'
        + '<span class="detail-label"><span class="tag">' + (index + 1) + '位</span> ' + store.name + '</span>'
        + '<span class="detail-value" style="display:flex; align-items:center; gap:8px;">'
        + '<span style="font-weight:700;">' + store.achievementRate + '%</span>'
        + '<span style="width:64px; height:6px; background:var(--color-surface-secondary); border-radius:4px; overflow:hidden; display:inline-block;">'
        + '<span style="display:block; width:' + store.achievementRate + '%; height:100%; background:#C9A84C;"></span>'
        + '</span>'
        + '</span>'
        + '</div>';
    }).join('');
  }
  renderKpis();
  renderTable();
  renderRanking();
  renderProgressTable();
  renderProgressRateRanking();
})();
