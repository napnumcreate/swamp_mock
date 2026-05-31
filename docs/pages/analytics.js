var HOST_CHART_DATA = [
  {
    hostId: 'ren',
    today: { labels: ['18時', '19時', '20時', '21時', '22時', '23時', '0時', '1時'], actual: [0, 18000, 45000, 82000, 128000, 175000, 155000, 120000], target: [10000, 25000, 50000, 90000, 130000, 170000, 150000, 115000] },
    week: { labels: ['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27'], actual: [0, 165000, 210000, 185000, 195000, 220000, 190000], target: [150000, 160000, 180000, 180000, 190000, 200000, 185000] },
    month: { labels: ['1週', '2週', '3週', '4週'], actual: [520000, 610000, 580000, 640000], target: [500000, 580000, 560000, 620000] }
  },
  {
    hostId: 'kaito',
    today: { labels: ['18時', '19時', '20時', '21時', '22時', '23時', '0時', '1時'], actual: [0, 12000, 35000, 68000, 105000, 148000, 130000, 95000], target: [10000, 20000, 40000, 75000, 110000, 150000, 130000, 100000] },
    week: { labels: ['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27'], actual: [0, 130000, 175000, 155000, 162000, 188000, 160000], target: [130000, 145000, 165000, 160000, 170000, 180000, 165000] },
    month: { labels: ['1週', '2週', '3週', '4週'], actual: [450000, 520000, 495000, 540000], target: [440000, 510000, 490000, 530000] }
  },
  {
    hostId: 'hayato',
    today: { labels: ['18時', '19時', '20時', '21時', '22時', '23時', '0時', '1時'], actual: [0, 10000, 28000, 55000, 92000, 135000, 118000, 88000], target: [8000, 18000, 35000, 65000, 100000, 140000, 120000, 90000] },
    week: { labels: ['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27'], actual: [0, 110000, 155000, 140000, 148000, 172000, 145000], target: [120000, 135000, 155000, 145000, 155000, 165000, 150000] },
    month: { labels: ['1週', '2週', '3週', '4週'], actual: [410000, 480000, 455000, 490000], target: [400000, 470000, 450000, 480000] }
  },
  {
    hostId: 'ryu',
    today: { labels: ['18時', '19時', '20時', '21時', '22時', '23時', '0時', '1時'], actual: [0, 8000, 22000, 42000, 72000, 105000, 92000, 68000], target: [8000, 15000, 30000, 50000, 80000, 110000, 95000, 70000] },
    week: { labels: ['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27'], actual: [0, 85000, 120000, 108000, 115000, 135000, 112000], target: [90000, 105000, 120000, 110000, 118000, 130000, 115000] },
    month: { labels: ['1週', '2週', '3週', '4週'], actual: [310000, 370000, 348000, 382000], target: [300000, 360000, 340000, 370000] }
  },
  {
    hostId: 'sora',
    today: { labels: ['18時', '19時', '20時', '21時', '22時', '23時', '0時', '1時'], actual: [0, 6000, 18000, 35000, 58000, 85000, 75000, 52000], target: [5000, 12000, 25000, 42000, 65000, 88000, 78000, 55000] },
    week: { labels: ['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27'], actual: [0, 68000, 98000, 88000, 92000, 108000, 90000], target: [70000, 82000, 100000, 90000, 95000, 108000, 92000] },
    month: { labels: ['1週', '2週', '3週', '4週'], actual: [248000, 295000, 275000, 310000], target: [240000, 285000, 270000, 300000] }
  },
  {
    hostId: 'yuki',
    today: { labels: ['18時', '19時', '20時', '21時', '22時', '23時', '0時', '1時'], actual: [0, 5000, 14000, 28000, 46000, 68000, 60000, 42000], target: [4000, 10000, 20000, 35000, 52000, 70000, 62000, 44000] },
    week: { labels: ['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27'], actual: [0, 55000, 78000, 70000, 74000, 88000, 72000], target: [55000, 65000, 80000, 72000, 76000, 88000, 74000] },
    month: { labels: ['1週', '2週', '3週', '4週'], actual: [198000, 238000, 220000, 248000], target: [190000, 230000, 215000, 240000] }
  }
];

var chartState = { hostIndex: 0, period: 'today' };
var SVG_NS = 'http://www.w3.org/2000/svg';

function toY(val, max) {
  return 130 - (val / max) * 110;
}

function toX(i, total) {
  if (total <= 1) {
    return 25;
  }
  return 25 + (450 * i) / (total - 1);
}

function formatChartValue(value) {
  return Math.round(value).toLocaleString('ja-JP');
}

function createSvgElement(tagName, attrs, text) {
  var el = document.createElementNS(SVG_NS, tagName);
  Object.keys(attrs).forEach(function (key) {
    el.setAttribute(key, attrs[key]);
  });
  if (text !== undefined) {
    el.textContent = text;
  }
  return el;
}

function buildPoints(values, max) {
  return values.map(function (value, index) {
    return toX(index, values.length).toFixed(1) + ',' + toY(value, max).toFixed(1);
  }).join(' ');
}

function renderHostChart() {
  var svg = document.getElementById('host-sales-svg');
  var hostName = document.getElementById('chart-host-name');

  if (!svg || !hostName) {
    return;
  }

  var host = HOST_CHART_DATA[chartState.hostIndex];
  var chart = host[chartState.period];
  var max = Math.max.apply(null, chart.actual.concat(chart.target)) || 1;
  var gridYs = [20, 53, 87, 120];

  var _hm = (typeof MOCK_HOSTS !== 'undefined') ? MOCK_HOSTS.filter(function(m){ return m.id === host.hostId; })[0] : null;
  hostName.textContent = _hm ? _hm.name : host.hostId;
  svg.textContent = '';

  gridYs.forEach(function (y) {
    svg.appendChild(createSvgElement('line', {
      x1: 0,
      y1: y,
      x2: 500,
      y2: y,
      stroke: '#e5e7eb',
      'stroke-width': 1
    }));
  });

  gridYs.forEach(function (y, index) {
    var value = max - (max / 3) * index;
    svg.appendChild(createSvgElement('text', {
      x: 3,
      y: y + 3,
      fill: '#9ca3af',
      'font-size': 8
    }, formatChartValue(value)));
  });

  chart.labels.forEach(function (label, index) {
    svg.appendChild(createSvgElement('text', {
      x: toX(index, chart.labels.length),
      y: 150,
      fill: '#9ca3af',
      'font-size': 9,
      'text-anchor': 'middle'
    }, label));
  });

  svg.appendChild(createSvgElement('polyline', {
    stroke: '#9ca3af',
    'stroke-width': 2,
    'stroke-dasharray': '5,3',
    fill: 'none',
    'stroke-linejoin': 'round',
    points: buildPoints(chart.target, max)
  }));

  svg.appendChild(createSvgElement('polyline', {
    stroke: '#C9A84C',
    'stroke-width': 2.5,
    fill: 'none',
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round',
    points: buildPoints(chart.actual, max)
  }));

  chart.actual.forEach(function (value, index) {
    svg.appendChild(createSvgElement('circle', {
      cx: toX(index, chart.actual.length),
      cy: toY(value, max),
      r: 3.5,
      fill: '#C9A84C'
    }));
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var prev = document.getElementById('chart-host-prev');
  var next = document.getElementById('chart-host-next');
  var periodButtons = document.querySelectorAll('.chart-period-btn');

  if (prev) {
    prev.addEventListener('click', function () {
      chartState.hostIndex = (chartState.hostIndex - 1 + HOST_CHART_DATA.length) % HOST_CHART_DATA.length;
      renderHostChart();
    });
  }

  if (next) {
    next.addEventListener('click', function () {
      chartState.hostIndex = (chartState.hostIndex + 1) % HOST_CHART_DATA.length;
      renderHostChart();
    });
  }

  periodButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      chartState.period = button.dataset.period;
      periodButtons.forEach(function (periodButton) {
        var isActive = periodButton.dataset.period === chartState.period;
        periodButton.classList.toggle('btn-primary', isActive);
        periodButton.classList.toggle('btn-secondary', !isActive);
      });
      renderHostChart();
    });
  });

  renderHostChart();
});
