const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station = [
  { id: 1, code: "JE01", name: "東京駅" },
  { id: 2, code: "JE07", name: "舞浜駅" },
  { id: 3, code: "JE12", name: "新習志野駅" },
  { id: 4, code: "JE13", name: "幕張豊砂駅" },
  { id: 5, code: "JE14", name: "海浜幕張駅" },
  { id: 6, code: "JE05", name: "新浦安駅" },
];

let station2 = [
  { id: 1, code: "JE01", name: "東京駅", change: "総武本線，中央線，etc", passengers: 403831, distance: 0 },
  { id: 2, code: "JE02", name: "八丁堀駅", change: "日比谷線", passengers: 31071, distance: 1.2 },
  { id: 3, code: "JE05", name: "新木場駅", change: "有楽町線，りんかい線", passengers: 67206, distance: 7.4 },
  { id: 4, code: "JE07", name: "舞浜駅", change: "舞浜リゾートライン", passengers: 76156, distance: 12.7 },
  { id: 5, code: "JE12", name: "新習志野駅", change: "", passengers: 11655, distance: 28.3 },
  { id: 6, code: "JE17", name: "千葉みなと駅", change: "千葉都市モノレール", passengers: 16602, distance: 39.0 },
  { id: 7, code: "JE18", name: "蘇我駅", change: "内房線，外房線", passengers: 31328, distance: 43.0 },
];

//////////////////////////////////

let idol = [
  { id: 1, name: "花海 咲季", age: 15, size: 152, weight: 45, song: 4, period: "2024年5月16日", explanation: "勝ち気で負けず嫌いな元アスリート．妹の花海佑芽とは大の仲良しで，様々なスポーツで競い合ってきたライバル同士．佑芽の才能を誰より評価し，恐れている．" },
  { id: 2, name: "月村 手毬", age: 15, size: 162, weight: 51, song: 4, period: "2024年5月16日", explanation: "中等部ナンバーワンユニットの元メンバーであり，すでに一線級の歌唱力を持つ．クールでストイックかと思いきや，甘えん坊で怠け者なトラブルメイカーというような二面性のある少女．" },
  { id: 3, name: "藤田 ことね", age: 15, size: 156, weight: 40, song: 4, period: "2024年5月16日", explanation: "人生一発逆転の手段としてアイドルを目指している，可愛い顔には自信のある，がめつい女の子．なぜか過大評価してくる生徒会長・星南のことがちょっぴり苦手．" },
];
// 一覧
app.get("/idol", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('idol', { data: idol });
});
// Create
app.get("/idol/create", (req, res) => {
  res.redirect('/public/idol_new.html');
});
// 詳細
app.get("/idol/:id", (req, res) => {
  const id = req.params.id;
  const detail = idol[id];
  res.render('idol_detail', { id: id, data: detail });
});
// Delete confirmation
app.get("/idol/deletek/:id", (req, res) => {
  const id = req.params.id;
  const detail = idol[id];
  res.render('idol_delete', { id: id, data: detail });
});
// Delete
app.get("/idol/delete/:id", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  idol.splice(req.params.id, 1);
  res.redirect('/idol');
});
// Create
app.post("/idol", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = Math.max(...idol.map(i => i.id), 0) + 1;
  const name = req.body.name;
  const age = req.body.age;
  const size = req.body.size;
  const weight = req.body.weight;
  const song = req.body.song;
  const period = req.body.period;
  const explanation = req.body.explanation;
  idol.push({ id: id, name: name, age: age, size: size, weight: weight, song: song, period: period, explanation: explanation });
  console.log(idol);
  res.render('idol', { data: idol });
});
// Edit
app.get("/idol/edit/:id", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = req.params.id;
  const detail = idol[id];
  res.render('idol_edit', { id: id, data: detail });
});
// Update
app.post("/idol/update/:id", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  idol[req.params.id].name = req.body.name;
  idol[req.params.id].age = req.body.age;
  idol[req.params.id].size = req.body.size;
  idol[req.params.id].weight = req.body.weight;
  idol[req.params.id].song = req.body.song;
  idol[req.params.id].period = req.body.period;
  idol[req.params.id].explanation = req.body.explanation;
  console.log(idol);
  res.redirect('/idol/' + req.params.id);
});

let song = [
  { id: 1, name: "【初星フェス】「Campus mode!!」燕ガシャ", caraname: "雨夜 燕", period: "2025/12/26-2026/01/05", level: 5, songname: "Campus mode!!" },
  { id: 2, name: "Story of Re;IRIS放映記念SSR1.5倍セレクトピックアップガシャ", caraname: "Re;IRIS & Begrazia", period: "2025/12/26-2026/01/05", level: 3, songname: "雨上がりのアイリス & Star-mine" },
  { id: 3, name: "【step3解禁】「自己肯定感爆上げ↑↑しゅきしゅきソング」ことねガシャ", caraname: "藤田 ことね", period: "2025/12/18-2025/12/26", level: 4, songname: "自己肯定感爆上げ↑↑しゅきしゅきソング" },
  { id: 4, name: "【step3解禁】「36℃ U･B･U」莉波ガシャ", caraname: "姫崎 莉波", period: "2025/12/18-2025/12/26", level: 4, songname: "36℃ U･B･U" },
  { id: 5, name: "【恒常】「グースーピー」佑芽ガシャ", caraname: "花海 佑芽", period: "2025/11/28-2025/12/08", level: 3, songname: "グースーピー" },
  { id: 6, name: "【恒常】「理論武装して」燕ガシャ", caraname: "雨夜 燕", period: "2025/11/16-2025/11/28", level: 2, songname: "理論武装して" },
  { id: 7, name: "【ライブツアー】「がむしゃらに行こう！」手毬ガシャ", caraname: "月村 手毬", period: "2025/10/10-2025/10/21", level: 5, songname: "がむしゃらに行こう！" },
  { id: 8, name: "【初星フェス】「Campus mode!!」美鈴ガシャ", caraname: "秦谷 美鈴", period: "2025/06/30-2025/07/07", level: 5, songname: "Campus mode!!" },
  { id: 9, name: "【シーズン】「桜フォトグラフ」咲季ガシャ", caraname: "花海 咲季", period: "2025/04/11-2025/04/22", level: 4, songname: "桜フォトグラフ" },
  { id: 10, name: "【恒常】「極光」リーリヤガシャ", caraname: "葛城 リーリヤ", period: "2025/03/21-2025/04/01", level: 3, songname: "夏色パレット" },
  { id: 11, name: "【シーズン】「雪解けに」麻央ガシャ", caraname: "有村 麻央", period: "2025/03/10-2025/03/21", level: 4, songname: "雪解けに" },
  { id: 12, name: "【シーズン】「ハッピーミルフィーユ」星南ガシャ", caraname: "十王 星南", period: "2025/02/14-2025/02/28", level: 5, songname: "ハッピーミルフィーユ" },
  { id: 13, name: "【シーズン】「仮装狂騒曲」広ガシャ", caraname: "篠澤 広", period: "2024/10/08-2024/10/18", level: 3, songname: "仮装狂騒曲" },
  { id: 14, name: "【恒常】「ようこそ初星温泉」千奈ガシャ", caraname: "倉本 千奈", period: "2024/09/11-2024/09/20", level: 4, songname: "ようこそ初星温泉" },
  { id: 15, name: "【シーズン】「キミとセミブルー」清夏ガシャ", caraname: "紫雲 清夏", period: "2024/07/01-2024/07/12", level: 4, songname: "キミとセミブルー" },
];
// 一覧
app.get("/song", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('song', { data: song });
});
// Create
app.get("/song/create", (req, res) => {
  res.redirect('/public/song_new.html');
});
// 詳細
app.get("/song/:id", (req, res) => {
  const id = req.params.id;
  const detail = song[id];
  res.render('song_detail', { id: id, data: detail });
});
// Delete confirmation
app.get("/song/deletek/:id", (req, res) => {
  const id = req.params.id;
  const detail = song[id];
  res.render('song_delete', { id: id, data: detail });
});
// Delete
app.get("/song/delete/:id", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  song.splice(req.params.id, 1);
  res.redirect('/song');
});
// Create
app.post("/song", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = Math.max(...song.map(i => i.id), 0) + 1;
  const name = req.body.name;
  const caraname = req.body.caraname;
  const period = req.body.period;
  const level = req.body.level;
  const songname = req.body.songname;
  song.push({ id: id, name: name, caraname: caraname, period: period, level: level, songname: songname });
  console.log(song);
  res.render('song', { data: song });
});
// Edit
app.get("/song/edit/:id", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = req.params.id;
  const detail = song[id];
  res.render('song_edit', { id: id, data: detail });
});
// Update
app.post("/song/update/:id", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  song[req.params.id].name = req.body.name;
  song[req.params.id].caraname = req.body.caraname;
  song[req.params.id].period = req.body.period;
  song[req.params.id].level = req.body.level;
  song[req.params.id].songname = req.body.songname;
  console.log(song);
  const id = req.params.id;
  res.redirect('/song/' + id);
});

let newmd = [
  { id: 1, code: "DM24-EX4", name: "「異次元の超獣使い」", release_date: "2025/3/15", price: 5940, explanation: "1パック8枚入り　1BOX 12パック入り/VTuber/バーチャルライバーグループ「にじさんじ」とデュエマがコラボレーションしたEXパックが新登場！" },
  { id: 2, code: "DM25-RP2", name: "邪神vs邪神Ⅱ ～ジャシン・イン・ザ・シェル～", release_date: "2025/6/21", price: 6000, explanation: "1パック5枚入り　1BOX 30パック入り/新章王道W（ダブル）の基本となる拡張パック第2弾！" },
  { id: 3, code: "DM25-EX1", name: "愛感謝祭 ヒロインBEST", release_date: "2025/7/19", price: 5280, explanation: "1パック6枚入り　1BOX 16パック入り/ファンタジーBESTに続く、種族をフォーカスした「BEST」シリーズ第3弾！今回も新たに５種族をフィーチャー！テーマは「デュエマのヒロイン」！" },
  { id: 4, code: "DM25-RP3", name: "邪神vs時皇 ～ビヨンド・ザ・タイム～", release_date: "2025/9/20", price: 6000, explanation: "1パック5枚入り　1BOX 30パック入り/王道Wの基本となる拡張パック第3弾！" },
  { id: 5, code: "DM25-EX2", name: "王道vs邪道 デュエキングWDreaM 2025", release_date: "2025/10/18", price: 5500, explanation: "1パック9枚入り　1BOX 10パック入り/豪華再録・強力新規カードで大好評の、デュエキングMAXパックの最新版！" },
  { id: 6, code: "DM25-RP4", name: "終淵 ～LOVE＆ABYSS～", release_date: "2025/12/20", price: 6000, explanation: "1パック5枚入り　1BOX 30パック入り/王道Wの基本となる拡張パック第4弾！" },
  { id: 7, code: "DM25-EX3", name: "邪神爆発デュエナマイトパック「王道W」", release_date: "2026/1/17", price: 11880, explanation: "1パック10枚入り　1BOX 8パック入り/王道W拡張パック1弾～4弾からカードをセレクションしたフルホイルパック！" },
];
// 一覧
app.get("/dm", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('dm', { data: newmd });
});
// Create
app.get("/dm/create", (req, res) => {
  res.redirect('/public/dm_new.html');
});
// 詳細
app.get("/dm/:id", (req, res) => {
  const id = req.params.id;
  const detail = newmd[id];
  res.render('dm_detail', { id: id, data: detail });
});
// Delete confirmation
app.get("/dm/deletek/:id", (req, res) => {
  const id = req.params.id;
  const detail = newmd[id];
  res.render('dm_delete', { id: id, data: detail });
});
// Delete
app.get("/dm/delete/:id", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  newmd.splice(req.params.id, 1);
  res.redirect('/dm');
});
// Create
app.post("/dm", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = Math.max(...newmd.map(i => i.id), 0) + 1;
  const code = req.body.code;
  const name = req.body.name;
  const release_date = req.body.release_date;
  const price = req.body.price;
  const explanation = req.body.explanation;
  newmd.push({ id: id, code: code, name: name, release_date: release_date, price: price, explanation: explanation });
  console.log(newmd);
  res.render('dm', { data: newmd });
});
// Edit
app.get("/dm/edit/:id", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = req.params.id;
  const detail = newmd[id];
  res.render('dm_edit', { id: id, data: detail });
});
// Update
app.post("/dm/update/:id", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  newmd[req.params.id].name = req.body.name;
  newmd[req.params.id].code = req.body.code;
  newmd[req.params.id].release_date = req.body.release_date;
  newmd[req.params.id].price = req.body.price;
  newmd[req.params.id].explanation = req.body.explanation;
  console.log(newmd);
  const id = req.params.id;
  res.redirect('/dm/' + id);
});



//////////////////////////////////


// 一覧
app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', { data: station2 });
});

// Create
app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});
// Read
app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_detail', { id: number, data: detail });
});

// Delete confirmation
app.get("/keiyo2/deletek/:number", (req, res) => {

  res.render('keiyo2_delete', { id: req.params.number, data: station2[req.params.number] });
});
// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice(req.params.number, 1);
  res.redirect('/keiyo2');
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = Math.max(...station2.map(i => i.id), 0) + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push({ id: id, code: code, name: name, change: change, passengers: passengers, distance: distance });
  console.log(station2);
  res.render('keiyo2', { data: station2 });
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_edit', { id: number, data: detail });
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log(station2);
  res.redirect('/keiyo2');
});





app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push(newdata);
  res.redirect('/public/keiyo_add.html');
  res.render('db1', { data: station });
});

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';

  res.send('今日の運勢は' + luck + 'です');
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';

  res.render('omikuji2', { result: luck });
});

app.get("/my_janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win);
  let total = Number(req.query.total);
  console.log({ hand, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  let judgement = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  if (hand == cpu) {
    judgement = 'あいこ';
    total += 1;
  } else if (value == 1 && num == 3, value == 2 && num == 1, value == 3 && num == 2) {
    judgement = '勝ち';
    win += 1;
    total += 1;
  } else {
    judgement = '負け';
    total += 1;
  }

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('my_janken', display);
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
