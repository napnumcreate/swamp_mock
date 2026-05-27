(function () {
  // --- カテゴリーフィルター ---
  function applyCategory(cat) {
    document.querySelectorAll('.order-cat-btn').forEach(function (b) {
      b.className = b.dataset.category === cat
        ? 'btn btn-primary order-cat-btn'
        : 'btn btn-secondary order-cat-btn';
    });
    document.querySelectorAll('.mobile-list-item[data-category]').forEach(function (item) {
      item.style.display = item.dataset.category === cat ? '' : 'none';
    });
  }
  document.querySelectorAll('.order-cat-btn').forEach(function (b) {
    b.addEventListener('click', function () { applyCategory(this.dataset.category); });
  });
  applyCategory('bottle');

  // --- カート更新 ---
  function updateCart() {
    var lines = [];
    var total = 0;
    document.querySelectorAll('.mobile-list-item[data-item]').forEach(function (item) {
      var qty = parseInt(item.querySelector('.qty-val').textContent, 10);
      if (qty > 0) {
        var price = parseInt(item.dataset.price, 10);
        lines.push({ name: item.dataset.item, qty: qty, price: price });
        total += qty * price;
      }
    });
    var cart = document.getElementById('order-cart');
    var cartLines = document.getElementById('cart-lines');
    var cartTotal = document.getElementById('cart-total');
    if (lines.length === 0) {
      cart.style.display = 'none';
    } else {
      cart.style.display = '';
      cartLines.innerHTML = lines.map(function (l) {
        return '<div class="mobile-status-row" style="padding:var(--space-1) 0;">'
          + '<span>' + l.name + ' &times; ' + l.qty + '</span>'
          + '<span>&yen;' + (l.qty * l.price).toLocaleString() + '</span>'
          + '</div>';
      }).join('');
      cartTotal.textContent = '¥' + total.toLocaleString();
    }
  }

  // --- ＋ボタン ---
  document.querySelectorAll('.qty-plus').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.closest('.mobile-list-item');
      var valEl = item.querySelector('.qty-val');
      valEl.textContent = parseInt(valEl.textContent, 10) + 1;
      updateCart();
    });
  });

  // --- －ボタン ---
  document.querySelectorAll('.qty-minus').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.closest('.mobile-list-item');
      var valEl = item.querySelector('.qty-val');
      var cur = parseInt(valEl.textContent, 10);
      if (cur > 0) {
        valEl.textContent = cur - 1;
        updateCart();
      }
    });
  });
}());
