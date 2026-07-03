const days = [
{ id:'day1', title:'DAY 1｜初見西貢・日落 Omakase', date:'30/10/2026 Fri', summary:['Arrival buffer','Walking 3–4km','Spa + Cafe Apartment','Dinner 17:30'], items:[
['09:30–10:00','💵 機場 ATM 取款','★★★★★','30 mins','Must Do','Tien Phong Bank LiveBank，新山一機場大廳。Wise 卡優先，先準備現金，之後唔使特登搵 ATM。','若 ATM 失敗，10:45 去 Ha Tam Jewelry backup。','Priority 高；但 Ha Tam 只係 backup，不是必去。'],
['10:00–10:45','🏨 Fusion Original 寄放行李','★★★★★','45 mins','Buffer','Klook 機場接送直達酒店大堂，寄放行李、簡單梳洗、重新出發。','如果入境或交通 delay，呢度係第一個吸收位。','唔建議壓縮，因為下機後需要 reset。'],
['10:45–11:15','💵 Ha Tam Jewelry 金店','★☆☆☆☆','30 mins','Backup only','距酒店步行約 9 分鐘，ATM 未能取錢先去。','如果 ATM 成功，直接 skip，提早去 Phở SOL。','現場人多，注意財物安全。'],
['11:15–12:15','🍜 Phở SOL - Bến Thành','★★★★★','60 mins','Lunch','第一餐選佢，因為近酒店、環境乾淨、石鍋河粉有記憶點。','必點：石鍋炙燒牛骨髓牛排河粉、Quẩy、 生雞蛋。4 人點 2 碗石鍋粉分食。','酒店 → Phở SOL 約 3 mins Grab / 步行 8–10 mins。'],
['12:30–14:00','📸 中央郵局 → 紅教堂 → 書街','★★★★☆','90 mins','Photo walk','第一日唔安排正式 shopping，先用三大景點慢慢進入西貢氣氛。','全部免費；中央郵局打卡、紅教堂外觀、書街漫步。','Phở SOL → 中央郵局 Grab 約 5 mins。若太熱，可縮短至 45–60 mins。'],
['14:00–17:00','💆‍♀️ Nha Suga Spa + The Cafe Apartments','★★★★★','3 hrs','Spa + Explore','Spa 就喺 The Cafe Apartments 內，同一棟樓下午做 Spa、夜晚影霓虹，動線好靚。','Spa 招牌：韓式 LED Galvanic 頭皮理療 + 肩頸開背。Cafe 可逛 % Arabica、Partea、Saigon Oi、Buihaus。','If late：保留 Spa；Cafe Apartment 只影相 + 買飲品。Scent Lab / 逐層慢逛可 skip。'],
['17:30–19:30','🍣 Omakase Tiger','★★★★★','2 hrs','Booked dinner','Welcome Dinner。17:30 正值日落，望 Landmark 81 / Golden River 夜景食 Omakase，第一晚有儀式感。','推薦 12 道套餐；招牌 Otoro 松露醬油、鰻魚松露忌廉、稻草煙燻三文魚。','Cafe Apartments → Omakase Tiger Grab 約 15 mins。必須準時。'],
['19:45–20:15','📸 阮惠步行街 + Cafe Apartments 夜景','★★★★☆','30 mins','Optional photo','食完返阮惠，The Cafe Apartments 霓虹燈全亮，下午同一地點變成夜景彩蛋。','順路拍合照，之後步行 5 mins 返酒店，可外帶熱豆腐花。','如果累，可直接回酒店。']
]},
{ id:'day2', title:'DAY 2｜廚藝課・D1 購物・LÚNE', date:'31/10/2026 Sat', summary:['Breakfast 08:30','Cooking 10–13','Spa 13:15','Shopping 15:30–18:45'], items:[
['08:30–09:30','🥩 Cơm Tấm Mộc 早餐','★★★★☆','60 mins','Local breakfast','在地特色早餐，距酒店步行約 8 mins，食炭烤厚切豬排碎米飯，唔會同之後廚藝課重複太多。','必點：Cơm Tấm Sườn。4 人點 2–3 份分食。','之後 Grab 去 Saigon Cooking Class 約 5 mins。'],
['10:00–13:00','🍳 Saigon Cooking Class','★★★★★','3 hrs','Experience + lunch','3 小時老建築內親手煮 3 道越菜，做完即場食，等於午餐。','特色係市場/香草/越菜體驗，比普通 lunch 有參與感。','不能遲到；早餐要控制時間。'],
['13:15–15:15','🌿 Mộc Kim Spa & Beauty','★★★★☆','2 hrs','Recovery','廚藝課後直接 Spa，先放鬆再 shopping。Spa 備吹風機，可整理儀容。','亦可寄放隨身物品，購物前輕鬆好多。','Cooking Class → Spa 約 10–15 mins。'],
['15:30–16:15','👗 LIBÉ / Dear José','★★★★★','45 mins','Core shopping','D1 最多人推薦 casual chic，似越南版 Aritzia，裁剪準確、日常好穿。','記得上多層，款式可能分樓層。','核心站，不建議 skip。'],
['16:15–16:45','🧵 Dauple by Ka’s','★★★★☆','30 mins','Core shopping','高級都會知性風，亞麻、真絲剪裁，偏成熟優雅。','適合挑 1–2 件精品單品。','LIBÉ 步行約 3–4 mins。'],
['16:45–17:20','🖤 NOSBYN','★★★★★','35 mins','Core shopping','D1 布料質感公認最好之一，極簡優雅，Timeless 款。','風格似 COS 但更女性化，買完唔易後悔。','核心站。'],
['17:20–18:10','🛍️ The Idiot / Compound Garment','★★★☆☆','50 mins','Optional','兩站較偏 optional：The Idiot 是設計師精選；Compound Garment 是 streetwear。','時間夠就入；唔夠可以直接去 Vincom。','If late：兩站都可 skip。'],
['18:10–18:45','🏬 The New Playground @ Vincom B1','★★★★☆','35 mins','Core / Aircon','本地品牌集合地，冷氣開放，適合作為晚餐前最後一站。','Streetwear 到精品都有，亦方便叫 Grab 去 LÚNE。','Vincom → LÚNE 約 5 mins。'],
['19:00–21:00','🍷 LÚNE Restaurant & Bar','★★★★★','2 hrs','Dinner','米芝蓮入選 / 亞洲 50 最佳餐廳元素，作為 Day 2 晚餐有記憶點，又唔需要離開 D1 太遠。','預算 800k–1.5m VND/人。建議 10/1 搶訂。','19:00 前要離開 Vincom。']
]},
{ id:'day3', title:'DAY 3｜粉紅教堂・草田區・Little Bear', date:'01/11/2026 Sun', summary:['Crab noodles','Pink Church','Thảo Điền','Little Bear'], items:[
['09:00–10:00','🦀 Quán Thuý 94 蟹肉粉絲','★★★★☆','60 mins','Local breakfast','老字號蟹肉粉絲，之後步行 5 mins 到粉紅教堂，動線順。','必點：蟹肉炒粉絲湯 + 炸蟹肉春捲。','酒店 → 店約 8–10 mins Grab。'],
['10:00–10:45','⛪ 粉紅教堂 + Cộng Cà Phê','★★★★☆','45 mins','Photo + coffee','正面廣場拍全景，再去對面 Cộng Cà Phê 三樓俯瞰教堂。','椰子咖啡/打卡視角。','如果太熱，直接上 Cộng 坐低。'],
['10:45–11:30','👗 Push Push Official','★★☆☆☆','45 mins','Conditional','品牌可能未確認實體店；如在教堂附近就順路，否則略過。','主打 streetwear。','出發前查 IG 地址；不確定就 skip。'],
['11:45–13:30','🛍️ Thảo Điền 選物店掃街','★★★★★','105 mins','Core shopping','草田區慢節奏、高質感，Saigon Concept、In the Mood、YouOn Boutique 順路。','DESIGNED BY SISI、LYKKE Studios、棉麻度假風。','粉紅教堂 → Thảo Điền 約 15 mins Grab。'],
['13:30–14:30','☕ Bakes / The Dreamers Bakery','★★★★☆','60 mins','Tea break','精緻法式甜點，4 人點 2–3 件分食即可，不會太飽。','Bakes 千層可頌；Dreamers 蛋撻 + 大叻鮮奶。','兩店距離約 50m，二選一。'],
['14:30–15:30','🎨 OHQUAO / Louh × Alouane','★★★☆☆','60 mins','Nice to have','文創家居、香氛、手工藝與棉織品，適合買小物。','OHQUAO 明信片/香氛；Louh 高級棉織品。','If late：保留 Louh，縮短 OHQUAO。'],
['15:45–17:45','🌿 Mộc Hương Wellness Thảo Điền','★★★★★','2 hrs','Spa','白色法式別墅、草本熱石、附蒸氣房，亦可寄存戰利品。','從 Louh 步行 2–3 mins，很順。','預約要穩妥。'],
['19:00–21:00','🍷 Little Bear','★★★★★','2 hrs','Dinner','草田區摩登創意越菜，難訂位，放 Day 3 因為全日都在 Thảo Điền，不用來回跑。','Michelin Guide 入選；預算 600k–1m VND/人。','Spa → Little Bear 約 3 mins Grab。'],
['21:00','🍫 Maison Marou @ Fusion','★★★☆☆','Optional','Hotel treat','返回酒店後，樓下/大廈內熱朱古力作收尾。','適合不想再出去的人。','Little Bear → 酒店約 15 mins。']
]},
{ id:'day4', title:'DAY 4｜歷史・Phú Nhuận Shopping・Quince', date:'02/11/2026 Mon', summary:['Museum','Pizza 4P’s','8-shop route','Quince'], items:[
['08:30–09:30','☕ The Running Bean','★★★☆☆','60 mins','Coffee','晨間咖啡，蛋咖啡/椰子咖啡，為博物館前暖身。','預算 60k–100k VND/杯。','可縮短至外帶。'],
['09:30–11:30','🏛️ 戰爭遺蹟博物館','★★★★★','2 hrs','Culture','冷氣、動線清晰，深入了解西貢歷史。','入場 40k VND。','情緒較重，之後安排 Pizza 平衡。'],
['11:30–13:00','🍕 Pizza 4P’s Hai Bà Trưng','★★★★★','90 mins','Lunch','呢間最順路，食完去 11 Garmentory 方向完全順；評分高。','必點：Burrata Parma Ham Half & Half、蟹肉意粉。','博物館 → Pizza 約 8 mins Grab。'],
['13:30–14:20','🛍️ 11 Garmentory','★★★★★','50 mins','Must shop','Phú Nhuận 最大選物店，先去壓軸必行，避免之後無時間。','多品牌、都會剪裁，二樓咖啡可休息。','Pizza → 11 Garmentory 約 15 mins。'],
['14:20–15:15','👗 ByVee / Pinguyen / thekat.shop','★★★★☆','55 mins','Core route','Trần Huy Liệu 順路三站，布料、剪裁同評分都強。','ByVee 精緻；Pinguyen COS 風；thekat.shop 人氣滿分。','全程步行。'],
['15:15–16:30','🛍️ So Dópe / Dalla / RUBIES / Lane Cì','★★★☆☆','75 mins','Optional route','Trần Quang Diệu 尾段視時間逛，選擇多但可彈性 cut。','So Dópe 多元；Dalla 設計感；RUBIES 選擇多；Lane Cì 女性化。','If late：只逛 So Dópe + Dalla。'],
['17:30–19:15','🌿 Temple Leaf Spa Land','★★★★★','105 mins','Foot spa','購物後足底舒壓，6 層樓設施 + 熱石，為晚餐前恢復體力。','足底 90 mins 530k；全身 90 mins 630k。','尾站 → Spa 約 12–15 mins Grab。'],
['19:15–19:45','👗 回酒店梳洗換裝','★★★★☆','30 mins','Buffer','Quince 前換裝整理，避免由 Spa 直去 fine dining。','Temple Leaf → 酒店約 8–10 mins。','呢段 buffer 建議保留。'],
['20:15–22:15','🍷 Quince Saigon','★★★★★','2 hrs','Farewell dinner','頂級窯烤歐陸，Asia’s 50 Best / Michelin Selected，適合作為壓軸晚餐。','預算 USD 50–70/人；每月 1 日開放下月訂位。','酒店 → Quince 約 8–10 mins。'],
['22:15+','🥂 Social Club Rooftop Bar','★★☆☆☆','Optional','If energy','自由備案，有體力先去，夜景配 mocktail / drinks。','不飲酒都可點 non-alcoholic。','If tired：直接回酒店。']
]},
{ id:'day5', title:'DAY 5｜最後一口西貢・機場 Spa', date:'03/11/2026 Tue', summary:['Pho breakfast','Museum photo','Souvenirs','Airport spa'], items:[
['09:30–10:30','⭐ Phở Việt Nam Bến Thành','★★★★★','60 mins','Final pho','Michelin 推介，石鍋牛肉河粉，作為最後一日早餐最有收尾感。','滾燙石鍋現場燙生和牛片。','距酒店 3–5 mins。'],
['10:30–11:45','📸 胡志明市美術館','★★★★☆','75 mins','Photo spot','復古人文街拍，木製手拉升降電梯、彩色玻璃窗，王家衛感。','入場 30k VND。','Phở 店步行約 4 mins。'],
['11:45–13:00','🥞 Bếp Mẹ Ỉn 午餐','★★★★★','75 mins','Vietnamese lunch','Bib Gourmand，多年連續；最後一餐越式家常菜，滿足你想 fit 入嘅 Bếp Mẹ Ỉn。','必點：Bánh Xèo、椰子炒飯、越式拼盤。','美術館 → 店約 4 mins Grab。'],
['13:00–14:15','🍫 Takashimaya + Maison Marou','★★★★☆','75 mins','Souvenirs','手信快閃，Marou 朱古力、咖啡豆、乾果、茶葉。','Maison Marou 熱/冰朱古力。','Bếp Mẹ Ỉn → 高島屋約 3 mins。'],
['14:15–14:45','🧳 回酒店提行李','★★★★★','30 mins','Must Do','提取寄存行李，最後整理，準備離開 D1。','要快速塞箱打包。','不可 skip。'],
['14:45–15:30','🚗 酒店 → Hạ Spa','★★★★★','45 mins','Traffic strategy','提早離開，避開 17:00 後第一郡下班塞車。','酒店 → Hạ Spa 約 20–25 mins。','呢個策略好重要。'],
['15:30–17:30','🌿 Hạ Spa 120 mins','★★★★★','2 hrs','Airport spa','機場旁 2 mins，草本洗頭 + 全身熱石，免費大行李寄存，航班前終極放鬆。','預約時註明 21:00 航班，療程必須 17:30 完成。','此站必須守時。'],
['17:45–18:00','✈️ Hạ Spa → 機場','★★★★★','15 mins','Airport transfer','Spa 到新山一國際航廈約 2 mins，預留 15 mins 更安全。','18:00 準時 check-in。','不可延誤。'],
['18:00–21:10','🛫 Check-in → 免稅店 → 登機','★★★★★','3 hrs','Departure','國際線建議提早 3 小時。過關後可食最後一口米紙卷。','為五天畫上最後一口西貢色彩。','順利登機。']
]}
];
function render(){
 const root=document.getElementById('days');
 root.innerHTML=days.map(day=>`<section id="${day.id}" class="day card"><div class="day-header"><div><p class="eyebrow">${day.date}</p><h2>${day.title}</h2><p>睇重點：Priority、Buffer、If late cut 咩，先判斷會唔會太趕。</p></div><img src="assets/ccmv-logo.jpeg" style="width:72px;height:72px;border-radius:50%;object-fit:cover;opacity:.72"></div><div class="summary">${day.summary.map(s=>`<div>${s}</div>`).join('')}</div><div class="timeline">${day.items.map((it,idx)=>activity(day.id,idx,it)).join('')}</div>${dayReview(day.id)}</section>`).join('');
 loadSaved();
}
function activity(dayId,idx,it){return `<article class="activity"><div class="time">${it[0]}</div><div class="activity-card"><div class="activity-top"><h3>${it[1]}</h3><span class="tag">${it[2]}</span></div><div class="meta"><span>⏱ ${it[3]}</span><span>🎯 ${it[4]}</span></div><div class="cols"><div class="info"><b>點解咁排？</b><p>${it[5]}</p></div><div class="info"><b>必食 / 必做 / 重點</b><p>${it[6]}</p></div></div><p class="note"><b>Planner Note：</b>${it[7]}</p><div class="comment"><textarea data-key="${dayId}-${idx}" placeholder="💬 有咩想講？例如：呢度會唔會太趕 / 想 skip / 有替代建議"></textarea></div></div></article>`}
function dayReview(id){return `<div class="review-panel"><h3>🎯 呢日可以 Lock 嗎？</h3><div class="footer-review"><select data-key="${id}-pace"><option>節奏：剛剛好</option><option>節奏：有少少趕</option><option>節奏：太鬆</option><option>未肯定</option></select><select data-key="${id}-approval"><option>✅ OK</option><option>⚠️ 小修改</option><option>❌ 想再討論</option></select><select data-key="${id}-rating"><option>★★★★★</option><option>★★★★</option><option>★★★</option><option>★★</option><option>★</option></select><textarea data-key="${id}-final" placeholder="✨ 如果係你，呢日會點改？"></textarea></div><div class="save-status">自動儲存在此裝置 localStorage</div></div>`}
function loadSaved(){document.querySelectorAll('textarea,select').forEach(el=>{const k=el.dataset.key;if(localStorage.getItem(k))el.value=localStorage.getItem(k);el.addEventListener('input',()=>localStorage.setItem(k,el.value));});}
render();
