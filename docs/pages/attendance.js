document.addEventListener('DOMContentLoaded', function () {
  var DAY_START_HOUR = 6;
  var SLOT_HEIGHT = 24;
  var TOTAL_HOURS = 24;
  var TOTAL_SLOTS = 96;
  var currentStaffFilter = 'all';
  var currentRoleFilter = 'all';
  var header = document.getElementById('calendar-header');
  var body = document.getElementById('calendar-body');

  function parseTime(str) {
    var parts = str.split(':');
    return { hour: parseInt(parts[0], 10), minute: parseInt(parts[1], 10) };
  }

  function timeToRow(hour, minute) {
    var adjusted = hour < DAY_START_HOUR ? hour + 24 : hour;
    return (adjusted - DAY_START_HOUR) * 4 + Math.floor(minute / 15) + 1;
  }

  function findStaffIndex(staffId, staffList) {
    for (var i = 0; i < staffList.length; i++) {
      if (staffList[i].id === staffId) return i;
    }
    return -1;
  }

  function adjHourToLabel(adj) {
    var h = adj >= 24 ? adj - 24 : adj;
    var prefix = adj >= 24 ? '翌' : '';
    return prefix + (h < 10 ? '0' : '') + h + ':00';
  }

  function getFilteredStaff() {
    var staff = ATTENDANCE_STAFF;

    if (currentStaffFilter === 'scheduled') {
      var scheduledIds = ATTENDANCE_SHIFTS.map(function (s) { return s.staffId; });
      staff = staff.filter(function (s) { return scheduledIds.indexOf(s.id) !== -1; });
    } else if (currentStaffFilter === 'working') {
      var workingIds = ATTENDANCE_SHIFTS
        .filter(function (s) { return s.actualStart !== null; })
        .map(function (s) { return s.staffId; });
      staff = staff.filter(function (s) { return workingIds.indexOf(s.id) !== -1; });
    }

    if (currentRoleFilter === 'with-title') {
      staff = staff.filter(function (s) { return s.title !== ''; });
    } else if (currentRoleFilter === 'no-title') {
      staff = staff.filter(function (s) { return s.role === 'ホスト' && s.title === ''; });
    } else if (currentRoleFilter === 'naikan') {
      staff = staff.filter(function (s) { return s.role === '内勤'; });
    }

    return staff;
  }

  function renderCalendar(staffList) {
    header.innerHTML = '';
    body.innerHTML = '';

    var timeBg = document.createElement('div');
    timeBg.style.gridColumn = '1';
    timeBg.style.gridRow = '1 / ' + (TOTAL_SLOTS + 1);
    timeBg.style.position = 'sticky';
    timeBg.style.left = '0';
    timeBg.style.width = '64px';
    timeBg.style.zIndex = '4';
    timeBg.style.background = '#fff';
    timeBg.style.pointerEvents = 'none';
    body.appendChild(timeBg);

    var staffCount = staffList.length;
    var colsStyle = '64px repeat(' + staffCount + ', 130px)';
    header.style.gridTemplateColumns = colsStyle;
    body.style.gridTemplateColumns = colsStyle;

    var gutter = document.createElement('div');
    gutter.className = 'calendar-header-gutter';
    header.appendChild(gutter);

    staffList.forEach(function (staff) {
      var cell = document.createElement('div');
      cell.className = 'calendar-staff-name';
      cell.innerHTML = staff.name + '<span class="calendar-staff-role">' + staff.role + '</span>';
      header.appendChild(cell);
    });

    for (var h = 0; h < TOTAL_HOURS; h++) {
      var hourValue = (DAY_START_HOUR + h) % 24;
      var row = h * 4 + 1;

      var label = document.createElement('div');
      label.className = 'time-label';
      label.style.gridColumn = '1';
      label.style.gridRow = String(row);
      label.textContent = (hourValue < 10 ? '0' : '') + hourValue + ':00';
      body.appendChild(label);

      var hourLine = document.createElement('div');
      hourLine.className = 'hour-line';
      hourLine.style.gridColumn = '2 / ' + (staffCount + 2);
      hourLine.style.gridRow = String(row);
      body.appendChild(hourLine);

      var halfLine = document.createElement('div');
      halfLine.className = 'half-line';
      halfLine.style.gridColumn = '2 / ' + (staffCount + 2);
      halfLine.style.gridRow = String(row + 2);
      body.appendChild(halfLine);
    }

    for (var s = 0; s < staffCount; s++) {
      var divider = document.createElement('div');
      divider.className = 'col-divider';
      divider.style.gridColumn = String(s + 2);
      divider.style.gridRow = '1 / ' + (TOTAL_SLOTS + 1);
      body.appendChild(divider);
    }

    ATTENDANCE_SHIFTS.forEach(function (shift) {
      var colIndex = findStaffIndex(shift.staffId, staffList);
      if (colIndex === -1) return;
      var gridCol = colIndex + 2;

      var sch = parseTime(shift.scheduledStart);
      var schEnd = parseTime(shift.scheduledEnd);
      var rowStart = timeToRow(sch.hour, sch.minute);
      var rowEnd = timeToRow(schEnd.hour, schEnd.minute);

      if (shift.actualStart) {
        var bgBlock = document.createElement('div');
        bgBlock.className = 'shift-block shift-block--scheduled';
        bgBlock.style.gridColumn = String(gridCol);
        bgBlock.style.gridRow = rowStart + ' / ' + rowEnd;
        bgBlock.dataset.rowStart = String(rowStart);
        bgBlock.dataset.rowEnd = String(rowEnd);
        bgBlock.innerHTML = '<span class="shift-time">' + shift.scheduledStart + '〜' + shift.scheduledEnd + '</span>';
        body.appendChild(bgBlock);

        var act = parseTime(shift.actualStart);
        var actRowStart = timeToRow(act.hour, act.minute);
        var fgBlock = document.createElement('div');
        fgBlock.className = 'shift-block shift-block--' + shift.status;
        fgBlock.style.gridColumn = String(gridCol);
        fgBlock.style.gridRow = actRowStart + ' / ' + rowEnd;
        fgBlock.dataset.rowStart = String(actRowStart);
        fgBlock.dataset.rowEnd = String(rowEnd);
        var statusLabel = shift.status === 'late' ? '遅刻' : '';
        fgBlock.innerHTML =
          '<span class="shift-time">' + shift.actualStart + '〜' + shift.scheduledEnd + '</span>' +
          (statusLabel ? '<span class="shift-status">' + statusLabel + '</span>' : '');
        body.appendChild(fgBlock);
      } else {
        var block = document.createElement('div');
        block.className = 'shift-block shift-block--' + shift.status;
        block.style.gridColumn = String(gridCol);
        block.style.gridRow = rowStart + ' / ' + rowEnd;
        block.dataset.rowStart = String(rowStart);
        block.dataset.rowEnd = String(rowEnd);
        block.innerHTML =
          '<span class="shift-time">' + shift.scheduledStart + '〜' + shift.scheduledEnd + '</span>' +
          '<span class="shift-status">未打刻</span>';
        body.appendChild(block);
      }
    });

    applyTimeFilter();
  }

  document.getElementById('date-label').textContent = ATTENDANCE_DATE;
  document.getElementById('today-btn').addEventListener('click', function () {
    document.getElementById('date-label').textContent = ATTENDANCE_DATE;
  });

  function parseDisplayDate(str) {
    var parts = str.split('/');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }

  function formatDisplayDate(d) {
    var y = d.getFullYear();
    var m = ('0' + (d.getMonth() + 1)).slice(-2);
    var day = ('0' + d.getDate()).slice(-2);
    return y + '/' + m + '/' + day;
  }

  document.getElementById('prev-day').addEventListener('click', function () {
    var d = parseDisplayDate(document.getElementById('date-label').textContent);
    d.setDate(d.getDate() - 1);
    document.getElementById('date-label').textContent = formatDisplayDate(d);
  });

  document.getElementById('next-day').addEventListener('click', function () {
    var d = parseDisplayDate(document.getElementById('date-label').textContent);
    d.setDate(d.getDate() + 1);
    document.getElementById('date-label').textContent = formatDisplayDate(d);
  });

  var filterStart = document.getElementById('filter-start');
  var filterEnd = document.getElementById('filter-end');

  for (var fh = DAY_START_HOUR; fh <= 29; fh++) {
    var optS = document.createElement('option');
    optS.value = String(fh);
    optS.textContent = adjHourToLabel(fh);
    if (fh === 18) { optS.selected = true; }
    filterStart.appendChild(optS);
  }

  for (var fh = DAY_START_HOUR + 1; fh <= 30; fh++) {
    var optE = document.createElement('option');
    optE.value = String(fh);
    optE.textContent = adjHourToLabel(fh);
    if (fh === 26) { optE.selected = true; }
    filterEnd.appendChild(optE);
  }

  function applyTimeFilter() {
    var startAdj = parseInt(filterStart.value, 10);
    var endAdj = parseInt(filterEnd.value, 10);
    if (endAdj <= startAdj) { return; }

    var startRow = (startAdj - DAY_START_HOUR) * 4 + 1;
    var endRow = (endAdj - DAY_START_HOUR) * 4 + 1;
    var rangeHeight = (endRow - startRow) * SLOT_HEIGHT;
    var scrollOffset = (startRow - 1) * SLOT_HEIGHT;

    var scrollContainer = document.querySelector('.calendar-scroll');
    var headerEl = document.getElementById('calendar-header');
    var headerHeight = headerEl ? headerEl.offsetHeight : 0;

    scrollContainer.style.height = (rangeHeight + headerHeight) + 'px';
    scrollContainer.style.maxHeight = (rangeHeight + headerHeight) + 'px';
    scrollContainer.style.minHeight = '';
    scrollContainer.style.overflowY = 'hidden';

    body.style.marginTop = '';
    scrollContainer.scrollTop = scrollOffset;

    // 表示時間範囲に重なる部分だけバーを描画する
    var allBlocks = body.querySelectorAll('.shift-block');
    allBlocks.forEach(function(block) {
      var origStart = parseInt(block.dataset.rowStart, 10);
      var origEnd = parseInt(block.dataset.rowEnd, 10);

      if (isNaN(origStart) || isNaN(origEnd)) return;

      if (origEnd <= startRow || origStart >= endRow) {
        block.style.display = 'none';
        return;
      }

      block.style.display = '';
      var renderStart = Math.max(origStart, startRow);
      var renderEnd = Math.min(origEnd, endRow);
      block.style.gridRow = renderStart + ' / ' + renderEnd;
    });
  }

  filterStart.addEventListener('change', applyTimeFilter);
  filterEnd.addEventListener('change', applyTimeFilter);

  var staffBadges = document.querySelectorAll('#staff-display-filter .filter-badge');
  staffBadges.forEach(function (badge) {
    badge.addEventListener('click', function () {
      currentStaffFilter = this.getAttribute('data-staff');
      staffBadges.forEach(function (b) { b.classList.add('tag-gray'); });
      this.classList.remove('tag-gray');
      renderCalendar(getFilteredStaff());
    }.bind(badge));
  });

  var roleBadges = document.querySelectorAll('#role-filter .filter-badge');
  roleBadges.forEach(function (badge) {
    badge.addEventListener('click', function () {
      currentRoleFilter = this.getAttribute('data-role');
      roleBadges.forEach(function (b) { b.classList.add('tag-gray'); });
      this.classList.remove('tag-gray');
      renderCalendar(getFilteredStaff());
    }.bind(badge));
  });

  renderCalendar(getFilteredStaff());
});
