var ATTENDANCE_DATE = '2026/05/24';

var ATTENDANCE_STAFF = [
  { id: 'ren',     name: 'REN',       role: 'ホスト', title: '副代表'     },
  { id: 'kaito',   name: 'KAITO',     role: 'ホスト', title: ''           },
  { id: 'sora',    name: 'SORA',      role: 'ホスト', title: ''           },
  { id: 'hayato',  name: 'HAYATO',    role: 'ホスト', title: 'ナンバー2'  },
  { id: 'ryu',     name: 'RYU',       role: 'ホスト', title: 'キャプテン' },
  { id: 'yuki',    name: 'YUKI',      role: 'ホスト', title: ''           },
  { id: 'ryota',   name: 'RYOTA',     role: 'ホスト', title: ''           },
  { id: 'hanako',  name: '山田 花子', role: '内勤',   title: '店長'       },
  { id: 'ken',     name: 'KEN',       role: 'ホスト', title: 'ナンバー3'  },
  { id: 'daiki',   name: 'DAIKI',     role: 'ホスト', title: ''           },
  { id: 'shota',   name: 'SHOTA',     role: 'ホスト', title: ''           },
  { id: 'jun',     name: 'JUN',       role: 'ホスト', title: 'キャプテン' },
  { id: 'tatsuya', name: 'TATSUYA',   role: 'ホスト', title: ''           },
  { id: 'hiroki',  name: 'HIROKI',    role: 'ホスト', title: ''           },
  { id: 'daisuke', name: 'DAISUKE',   role: 'ホスト', title: 'ナンバー4'  },
  { id: 'kenji',   name: 'KENJI',     role: 'ホスト', title: ''           },
  { id: 'tomoya',  name: 'TOMOYA',    role: 'ホスト', title: ''           },
  { id: 'masato',  name: 'MASATO',    role: 'ホスト', title: ''           },
  { id: 'shingo',  name: 'SHINGO',    role: 'ホスト', title: 'チーフ'     },
  { id: 'naoki',   name: 'NAOKI',     role: 'ホスト', title: ''           }
];

var ATTENDANCE_SHIFTS = [
  { staffId: 'ren',    scheduledStart: '20:00', scheduledEnd: '02:00', actualStart: '20:03', status: 'active'  },
  { staffId: 'kaito',  scheduledStart: '19:30', scheduledEnd: '01:00', actualStart: '19:28', status: 'active'  },
  { staffId: 'sora',   scheduledStart: '21:00', scheduledEnd: '02:00', actualStart: '21:15', status: 'late'    },
  { staffId: 'hayato', scheduledStart: '20:00', scheduledEnd: '02:00', actualStart: '20:01', status: 'active'  },
  { staffId: 'ryu',    scheduledStart: '20:30', scheduledEnd: '01:30', actualStart: '20:29', status: 'active'  },
  { staffId: 'yuki',   scheduledStart: '21:00', scheduledEnd: '02:00', actualStart: '21:00', status: 'active'  },
  { staffId: 'ryota',  scheduledStart: '20:00', scheduledEnd: '02:00', actualStart: null,    status: 'missing' },
  { staffId: 'hanako', scheduledStart: '18:00', scheduledEnd: '01:00', actualStart: '17:58', status: 'active'  },
  { staffId: 'ken',     scheduledStart: '20:00', scheduledEnd: '02:00', actualStart: '19:58', status: 'active'  },
  { staffId: 'daiki',   scheduledStart: '19:30', scheduledEnd: '01:30', actualStart: '19:31', status: 'active'  },
  { staffId: 'shota',   scheduledStart: '21:00', scheduledEnd: '02:30', actualStart: '21:18', status: 'late'    },
  { staffId: 'jun',     scheduledStart: '20:30', scheduledEnd: '02:00', actualStart: '20:28', status: 'active'  },
  { staffId: 'tatsuya', scheduledStart: '21:00', scheduledEnd: '03:00', actualStart: '21:02', status: 'active'  },
  { staffId: 'hiroki',  scheduledStart: '19:00', scheduledEnd: '01:00', actualStart: '18:59', status: 'active'  },
  { staffId: 'daisuke', scheduledStart: '20:00', scheduledEnd: '02:00', actualStart: '20:05', status: 'active'  },
  { staffId: 'kenji',   scheduledStart: '20:30', scheduledEnd: '01:30', actualStart: '20:29', status: 'active'  },
  { staffId: 'tomoya',  scheduledStart: '21:30', scheduledEnd: '02:30', actualStart: '21:30', status: 'active'  },
  { staffId: 'masato',  scheduledStart: '20:00', scheduledEnd: '02:00', actualStart: '20:01', status: 'active'  },
  { staffId: 'shingo',  scheduledStart: '19:30', scheduledEnd: '01:00', actualStart: '19:32', status: 'active'  },
  { staffId: 'naoki',   scheduledStart: '20:00', scheduledEnd: '02:00', actualStart: null,    status: 'missing' }
];
