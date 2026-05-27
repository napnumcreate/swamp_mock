(function () {
  var btns = document.querySelectorAll('.seat-filter-btn');
  var cards = document.querySelectorAll('.mobile-card[data-status]');
  function apply(status) {
    btns.forEach(function (b) {
      if (b.dataset.filter === status) { b.classList.remove('tag-gray'); }
      else { b.classList.add('tag-gray'); }
    });
    cards.forEach(function (c) {
      c.style.display = c.dataset.status === status ? '' : 'none';
    });
  }
  btns.forEach(function (b) {
    b.addEventListener('click', function () { apply(this.dataset.filter); });
  });
  apply('入店中');
}());
