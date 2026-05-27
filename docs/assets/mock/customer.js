var MOCK_CUSTOMERS = [
  { id: 'c001', hostId: 'kaito',  name: '佐藤 美咲',  host: '鳳條隼人',  registerDate: '2023/11/02', lastVisit: '2026/05/24', firstRepeat: '2023/11/24', visitCount: '31回', visitFreq: '月2回', monthlySales: '¥124,000',  totalSales: '¥3,560,000', notes: 'ワイン好み、2人来店が多い' },
  { id: 'c002', hostId: 'ren',    name: '小林 真奈',  host: '瑞樹成瀬',    registerDate: '2024/01/21', lastVisit: '2026/05/18', firstRepeat: '2024/02/03', visitCount: '27回', visitFreq: '月2回', monthlySales: '¥210,000',  totalSales: '¥3,120,000', notes: '' },
  { id: 'c003', hostId: 'ren',    name: '田中 優子',  host: '瑞樹成瀬',    registerDate: '2024/03/15', lastVisit: '2026/05/24', firstRepeat: '2024/04/02', visitCount: '24回', visitFreq: '月2回', monthlySales: '¥186,000',  totalSales: '¥2,840,000', notes: 'シャンパン好み、誕生日 8/12' },
  { id: 'c004', hostId: 'hayato', name: '松本 葵',    host: '戦神', registerDate: '2024/05/09', lastVisit: '2026/05/09', firstRepeat: '2024/05/30', visitCount: '19回', visitFreq: '月1回', monthlySales: '¥84,000',   totalSales: '¥1,670,000', notes: '' },
  { id: 'c005', hostId: 'sora',   name: '伊藤 沙織',  host: '海堂しんのすけ',   registerDate: '2024/06/14', lastVisit: '2026/05/24', firstRepeat: '2024/06/29', visitCount: '18回', visitFreq: '月1回', monthlySales: '¥65,000',   totalSales: '¥1,540,000', notes: 'シャンパン・フード注文多い' },
  { id: 'c006', hostId: 'ryu',    name: '高橋 夏子',  host: '成宮サラン',    registerDate: '2024/08/27', lastVisit: '2026/05/24', firstRepeat: '2024/09/10', visitCount: '20回', visitFreq: '月2回', monthlySales: '¥72,000',   totalSales: '¥1,860,000', notes: '誕生日 3/5、ケーキ希望' },
  { id: 'c007', hostId: 'yuki',   name: '吉田 玲奈',  host: '京本カレン',   registerDate: '2024/10/04', lastVisit: '2026/05/02', firstRepeat: '2024/10/25', visitCount: '14回', visitFreq: '月1回', monthlySales: '－',         totalSales: '¥980,000',   notes: '' },
  { id: 'c008', hostId: 'hayato', name: '鈴木 麻衣',  host: '戦神', registerDate: '2025/01/18', lastVisit: '2026/05/24', firstRepeat: '2025/02/08', visitCount: '15回', visitFreq: '月1回', monthlySales: '¥98,000',   totalSales: '¥1,420,000', notes: 'フルーツ系カクテル好み' },
  { id: 'c009', hostId: 'yuki',   name: '渡辺 留美',  host: '京本カレン',   registerDate: '2025/02/09', lastVisit: '2026/05/24', firstRepeat: '2025/03/06', visitCount: '11回', visitFreq: '月1回', monthlySales: '¥52,000',   totalSales: '¥680,000',   notes: '静かな席希望' },
  { id: 'c010', hostId: 'sora',   name: '加藤 遥',    host: '海堂しんのすけ',   registerDate: '2025/03/17', lastVisit: '2026/05/07', firstRepeat: '2025/04/07', visitCount: '8回',  visitFreq: '月1回', monthlySales: '－',         totalSales: '¥455,000',   notes: '' },
  { id: 'c011', hostId: 'kenta',  name: '山本 京香',  host: '神月黒夜',  registerDate: '2025/04/03', lastVisit: '2026/05/24', firstRepeat: '2025/04/24', visitCount: '6回',  visitFreq: '月1回', monthlySales: '¥38,000',   totalSales: '¥264,000',   notes: '2回目の来店' },
  { id: 'c012', hostId: 'daiki',  name: '中村 彩花',  host: 'トリンドルウララ',  registerDate: '2025/05/11', lastVisit: '2026/05/24', firstRepeat: '2025/05/18', visitCount: '3回',  visitFreq: '週1回', monthlySales: '¥45,000',   totalSales: '¥118,000',   notes: 'ソフトドリンク希望' },
  { id: 'c013', hostId: 'ryu',    name: '木村 千尋',  host: '成宮サラン',    registerDate: '2025/07/22', lastVisit: '2026/05/15', firstRepeat: '2025/08/16', visitCount: '7回',  visitFreq: '月1回', monthlySales: '¥58,000',   totalSales: '¥392,000',   notes: '' },
  { id: 'c014', hostId: 'kenta',  name: '清水 朋美',  host: '神月黒夜',  registerDate: '2025/09/05', lastVisit: '2026/05/12', firstRepeat: '2025/09/26', visitCount: '5回',  visitFreq: '月1回', monthlySales: '－',         totalSales: '¥234,000',   notes: 'ノンアルコール希望' },
  { id: 'c015', hostId: 'daiki',  name: '井上 理沙',  host: 'トリンドルウララ',  registerDate: '2026/01/12', lastVisit: '2026/05/03', firstRepeat: '2026/02/01', visitCount: '4回',  visitFreq: '月1回', monthlySales: '¥42,000',   totalSales: '¥156,000',   notes: '' },
  { id: 'c016', hostId: 'ren',    name: '石井 菜月',  host: '瑞樹成瀬',    registerDate: '2026/04/19', lastVisit: '2026/04/19', firstRepeat: '－',         visitCount: '1回',  visitFreq: '－',   monthlySales: '－',         totalSales: '¥36,000',    notes: '新規来店' },
  { id: 'c017', hostId: 'ren',    name: '高橋 美優',  host: '瑞樹成瀬',    registerDate: '2023/08/15', lastVisit: '2026/05/23', firstRepeat: '2023/09/02', visitCount: '28回', visitFreq: '月3回', monthlySales: '¥285,000',  totalSales: '¥4,200,000', notes: 'シャンパン好み、VIP個室希望' },
  { id: 'c018', hostId: 'ren',    name: '渡辺 ゆり',  host: '瑞樹成瀬',    registerDate: '2022/12/10', lastVisit: '2026/05/15', firstRepeat: '2023/01/05', visitCount: '35回', visitFreq: '月3回', monthlySales: '¥210,000',  totalSales: '¥5,600,000', notes: 'ワイン好み、連れ来店多い' },
  { id: 'c019', hostId: 'ren',    name: '佐々木 結衣', host: '瑞樹成瀬',   registerDate: '2025/02/11', lastVisit: '2026/05/20', firstRepeat: '2025/03/07', visitCount: '15回', visitFreq: '月2回', monthlySales: '¥88,000',   totalSales: '¥1,240,000', notes: '' },
  { id: 'c020', hostId: 'ren',    name: '田中 彩香',  host: '瑞樹成瀬',    registerDate: '2025/10/22', lastVisit: '2026/05/19', firstRepeat: '2025/11/15', visitCount: '7回',  visitFreq: '月1回', monthlySales: '¥42,000',   totalSales: '¥360,000',   notes: 'ソフトドリンク希望' },
  { id: 'c021', hostId: 'ren',    name: '木村 なな',  host: '瑞樹成瀬',    registerDate: '2026/05/10', lastVisit: '2026/05/24', firstRepeat: '2026/05/24', visitCount: '2回',  visitFreq: '－',   monthlySales: '¥36,000',   totalSales: '¥36,000',    notes: '' }
];

var TODAY_VISITS = [
  {
    customerId: 'c003', hostId: 'ren',
    status: 'active', name: '田中 優子', host: '瑞樹成瀬', seat: 'A-01',
    entryTime: '19:30', exitTime: '－', currentSales: '¥186,000',
    registerDate: '2024/03/15', firstRepeat: '2024/04/02',
    visitCount: '24回', visitFreq: '月2回', monthlySales: '¥186,000', totalSales: '¥2,840,000',
    notes: 'シャンパン好み、誕生日 8/12'
  },
  {
    customerId: 'c001', hostId: 'kaito',
    status: 'exited', name: '佐藤 美咲', host: '鳳條隼人', seat: 'A-02',
    entryTime: '19:45', exitTime: '22:20', currentSales: '¥124,000',
    registerDate: '2023/11/02', firstRepeat: '2023/11/24',
    visitCount: '31回', visitFreq: '月2回', monthlySales: '¥124,000', totalSales: '¥3,560,000',
    notes: 'ワイン好み、2人来店が多い'
  },
  {
    customerId: 'c008', hostId: 'hayato',
    status: 'active', name: '鈴木 麻衣', host: '戦神', seat: 'B-01',
    entryTime: '20:00', exitTime: '－', currentSales: '¥98,000',
    registerDate: '2025/01/18', firstRepeat: '2025/02/08',
    visitCount: '15回', visitFreq: '月1回', monthlySales: '¥98,000', totalSales: '¥1,420,000',
    notes: 'フルーツ系カクテル好み'
  },
  {
    customerId: 'c006', hostId: 'ryu',
    status: 'active', name: '高橋 夏子', host: '成宮サラン', seat: 'B-03',
    entryTime: '20:15', exitTime: '－', currentSales: '¥72,000',
    registerDate: '2024/08/27', firstRepeat: '2024/09/10',
    visitCount: '20回', visitFreq: '月2回', monthlySales: '¥72,000', totalSales: '¥1,860,000',
    notes: '誕生日 3/5、ケーキ希望'
  },
  {
    customerId: 'c005', hostId: 'sora',
    status: 'exited', name: '伊藤 沙織', host: '海堂しんのすけ', seat: 'C-02',
    entryTime: '20:40', exitTime: '23:05', currentSales: '¥65,000',
    registerDate: '2024/06/14', firstRepeat: '2024/06/29',
    visitCount: '18回', visitFreq: '月1回', monthlySales: '¥65,000', totalSales: '¥1,540,000',
    notes: 'シャンパン・フード注文多い'
  },
  {
    customerId: 'c009', hostId: 'yuki',
    status: 'active', name: '渡辺 留美', host: '京本カレン', seat: 'C-04',
    entryTime: '21:00', exitTime: '－', currentSales: '¥52,000',
    registerDate: '2025/02/09', firstRepeat: '2025/03/06',
    visitCount: '11回', visitFreq: '月1回', monthlySales: '¥52,000', totalSales: '¥680,000',
    notes: '静かな席希望'
  },
  {
    customerId: 'c011', hostId: 'kenta',
    status: 'active', name: '山本 京香', host: '神月黒夜', seat: 'D-01',
    entryTime: '21:25', exitTime: '－', currentSales: '¥38,000',
    registerDate: '2025/04/03', firstRepeat: '2025/04/24',
    visitCount: '6回', visitFreq: '月1回', monthlySales: '¥38,000', totalSales: '¥264,000',
    notes: '2回目の来店'
  },
  {
    customerId: 'c012', hostId: 'daiki',
    status: 'active', name: '中村 彩花', host: 'トリンドルウララ', seat: 'D-03',
    entryTime: '21:50', exitTime: '－', currentSales: '¥45,000',
    registerDate: '2025/05/11', firstRepeat: '2025/05/18',
    visitCount: '3回', visitFreq: '週1回', monthlySales: '¥45,000', totalSales: '¥118,000',
    notes: 'ソフトドリンク希望'
  }
];
