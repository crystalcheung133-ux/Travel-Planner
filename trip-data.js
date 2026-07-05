// CCMV Journey Planner — Trip Data Engine
// Build 10.1.3
// To create a new trip planner, duplicate this file and replace this object only.
// The approved UI, review UX, localStorage keys and Supabase layer live in index.html.

window.CCMV_TRIP_DATA = {
  "schemaVersion": "1.0",
  "build": "10.1.3",
  "planId": "ccmv-saigon-2026",
  "title": "CCMV Journey Planner",
  "subtitle": "Vietnam 2026",
  "destination": "Saigon, Vietnam",
  "startDate": "2026-10-30",
  "endDate": "2026-11-03",
  "reviewers": [
    {
      "id": "Christal",
      "name": "Christal",
      "emoji": "🧸"
    },
    {
      "id": "Crystal",
      "name": "Crystal",
      "emoji": "👓"
    },
    {
      "id": "Mero",
      "name": "Mero",
      "emoji": "✝️"
    },
    {
      "id": "Vivian",
      "name": "Vivian",
      "emoji": "👟"
    }
  ],
  "days": [
    {
      "id": "day1",
      "label": "DAY 1",
      "eyebrow": "30/10/2026 · Fri",
      "title": "初見西貢・Arrival & Welcome",
      "glance": [
        {
          "emoji": "🚶",
          "label": "Walk",
          "value": "3–4 km"
        },
        {
          "emoji": "🚕",
          "label": "Transport",
          "value": "Airport transfer + ~4 Grab rides"
        },
        {
          "emoji": "☕",
          "label": "Breakfast",
          "value": "In-flight / light arrival"
        },
        {
          "emoji": "🍜",
          "label": "Lunch",
          "value": "Phở SOL · $"
        },
        {
          "emoji": "🍣",
          "label": "Dinner",
          "value": "Omakase Tiger · $$$"
        },
        {
          "emoji": "🧖",
          "label": "Spa",
          "value": "Nha Suga Premium"
        }
      ],
      "todayPlan": "第一天以酒店作為中心點，先處理行李、換匯與第一餐，再完成酒店附近的三大經典地標。Post Office、紅教堂與書街後可以先 check-in 休息，也可以按體力直接去 Café Apartments。下午用 Nha Suga 放慢節奏，晚上用 5:30 日落早場收結，避免第一晚食得太夜。",
      "timeline": [
        {
          "time": "09:30 – 10:00",
          "emoji": "🚕",
          "title": "🚕 Airport ATM",
          "description": "Tien Phong Bank LiveBank 取 VND；若順利完成，Ha Tam 金店只作 backup。"
        },
        {
          "time": "10:00 – 10:45",
          "emoji": "🚕",
          "title": "🚕 Airport Transfer → Fusion Original",
          "description": "Klook 接送直達酒店，先 drop luggage。"
        },
        {
          "time": "10:45 – 11:15",
          "emoji": "💵",
          "title": "💵 Ha Tam Jewelry（Backup）",
          "description": "只在機場 ATM 未成功時使用。"
        },
        {
          "time": "11:15 – 12:15",
          "emoji": "🍜",
          "title": "🍜 Phở SOL",
          "description": "酒店附近第一餐，石鍋河粉可 share。"
        },
        {
          "time": "12:30 – 14:00",
          "emoji": "🏛️",
          "title": "🏛️ Post Office → Notre-Dame Cathedral → Book Street",
          "description": "三個經典點集中在酒店附近。完成後可先回酒店 check-in，或直接繼續。"
        },
        {
          "time": "14:00 – 17:00",
          "emoji": "☕",
          "title": "☕ Café Apartments + Nha Suga Spa",
          "description": "Spa 位於 Café Apartments 內；可先逛 café / 小店，再入療程。"
        },
        {
          "time": "17:30 – 19:30",
          "emoji": "🍷",
          "title": "🍷 Omakase Tiger",
          "description": "5:30 日落早場，晚餐後仍可早返市中心與酒店。"
        },
        {
          "time": "19:45 – 20:15",
          "emoji": "📸",
          "title": "📸 Nguyễn Huệ Night Walk",
          "description": "Optional：The Café Apartments 霓虹夜景與阮惠步行街。"
        },
        {
          "time": "20:15 onwards",
          "emoji": "🚕",
          "title": "🚕 Return Hotel",
          "description": "第一晚重點是 settle in，不拖到太夜。"
        }
      ],
      "reviewItems": [
        {
          "id": "pho-sol-day1",
          "category": "restaurant",
          "emoji": "🍜",
          "title": "🍜 Phở SOL",
          "meta": "Arrival Lunch · Hotel Area",
          "badge": "Selected meal",
          "why": "Day 1 第一餐安排在酒店附近，重點是穩陣、近、容易集合。石鍋河粉有記憶點，但仍然是輕鬆地道第一餐，不會太 heavy。",
          "chips": [
            "Lunch",
            "Near Fusion",
            "First meal"
          ]
        },
        {
          "id": "activity-1-1",
          "category": "poi",
          "emoji": "📍",
          "title": "📍 三大經典地標",
          "meta": "Classic First Look · Free",
          "badge": "Why this plan",
          "why": "這三個點都在酒店附近，適合第一天用最少交通完成西貢第一輪打卡。去完可以先 check-in 休息，也可以直接去 Café Apartments，保留最大彈性。",
          "chips": [
            "Post Office",
            "Cathedral",
            "Book Street"
          ]
        },
        {
          "id": "nha-suga-premium",
          "category": "spa",
          "emoji": "🧖",
          "title": "🧖 Nha Suga Premium",
          "meta": "Arrival Spa · VND 500k–800k pp",
          "badge": "Why this plan",
          "why": "抵達日不適合一直硬行。Nha Suga 放在 Café Apartments 同一段，是為了把逛、坐低、放鬆合併處理，讓大家在第一天慢慢進入旅程狀態。",
          "chips": [
            "Head spa",
            "Shoulder + neck",
            "Café Apartments"
          ]
        },
        {
          "id": "omakase-tiger",
          "category": "restaurant",
          "emoji": "🍷",
          "title": "🍷 Omakase Tiger",
          "meta": "Sunset Counter Dinner · AUD ~$60 pp",
          "badge": "Why this plan",
          "why": "第一天以適應節奏為主。5:30 早場可以欣賞日落，又可提早完成晚餐，讓大家在長途飛行後慢慢調整狀態，不用第一晚已經食到太夜。",
          "chips": [
            "Sunset seating",
            "Japanese omakase",
            "Early finish"
          ]
        }
      ],
      "wrapUp": {
        "id": "day1",
        "title": "DAY 1 Review"
      }
    },
    {
      "id": "day2",
      "label": "DAY 2",
      "eyebrow": "31/10/2026 · Sat",
      "title": "一日廚娘・D1 Brands・LÚNE",
      "glance": [
        {
          "emoji": "🚶",
          "label": "Walk",
          "value": "3–5 km"
        },
        {
          "emoji": "🚕",
          "label": "Transport",
          "value": "~4 Grab rides"
        },
        {
          "emoji": "☕",
          "label": "Breakfast",
          "value": "Cơm Tấm Mộc · $"
        },
        {
          "emoji": "🍳",
          "label": "Lunch",
          "value": "Saigon Cooking Class · AUD ~$50"
        },
        {
          "emoji": "🍷",
          "label": "Dinner",
          "value": "LÚNE · $$$"
        },
        {
          "emoji": "🧖",
          "label": "Spa",
          "value": "Mộc Kim Spa & Beauty"
        }
      ],
      "todayPlan": "Day 2 的核心是 shared memory。早餐先試越南豬扒碎飯，10 點到 1 點用 Cooking Class 完成一段最有參與感的共同體驗。完課後直接去 Spa 休息，再進入 D1 brands 購物線。LÚNE 放在晚上，是因為它順路、夠特別，也讓旅程有第一餐 Michelin selected 法餐記憶點。",
      "timeline": [
        {
          "time": "08:30 – 09:30",
          "emoji": "🍜",
          "title": "🍜 Cơm Tấm Mộc",
          "description": "越南豬扒碎飯早餐，份量可 share。"
        },
        {
          "time": "10:00 – 13:00",
          "emoji": "🍳",
          "title": "🍳 Saigon Cooking Class",
          "description": "3 小時手作廚藝體驗，完成後即場享用作 lunch。Estimated cost：AUD ~$50 pp。"
        },
        {
          "time": "13:00 – 13:15",
          "emoji": "🚕",
          "title": "🚕 Grab → Mộc Kim Spa",
          "description": "Cooking class 1 點完，直接去 Spa 休息。"
        },
        {
          "time": "13:15 – 15:15",
          "emoji": "🧖",
          "title": "🧖 Mộc Kim Spa & Beauty",
          "description": "草本洗頭 / head spa，做完剛好整理狀態。"
        },
        {
          "time": "15:30 – 18:30",
          "emoji": "🛍️",
          "title": "🛍️ D1 Brand Walk",
          "description": "LIBÉ / Dauple by Ka’s / NOSBYN / The New Playground 等；核心店優先。"
        },
        {
          "time": "18:45 – 19:00",
          "emoji": "🚕",
          "title": "🚕 Grab → LÚNE",
          "description": "從 D1 shopping / Vincom 轉場最簡單。"
        },
        {
          "time": "19:00 – 21:00",
          "emoji": "🍷",
          "title": "🍷 LÚNE",
          "description": "Michelin selected contemporary French。預算約 800,000–1,500,000 VND pp。"
        }
      ],
      "reviewItems": [
        {
          "id": "c-m-t-m-m-c",
          "category": "activity",
          "emoji": "🍜",
          "title": "🍜 Cơm Tấm Mộc",
          "meta": "Vietnamese Breakfast · VND 60k–100k pp",
          "badge": "Why this plan",
          "why": "早餐不是為了食得豪，而是想在 Day 2 開始前試一次越南豬扒碎飯。份量可以 share，既有在地感，也不會令後面的 cooking class 太飽。",
          "chips": [
            "Pork chop rice",
            "Local breakfast",
            "Shareable"
          ]
        },
        {
          "id": "saigon-cooking-class",
          "category": "activity",
          "emoji": "🍳",
          "title": "🍳 Saigon Cooking Class",
          "meta": "Shared Memory · AUD ~$50 pp",
          "badge": "Why this plan",
          "why": "這段不只是午餐，而是四個朋友一起完成的 shared memory。由學、煮到食，參與感比單純打卡更強，是 Day 2 最值得保留的核心活動。",
          "chips": [
            "Hands-on",
            "Shared lunch",
            "Memory point"
          ]
        },
        {
          "id": "m-c-kim-spa",
          "category": "spa",
          "emoji": "🧖",
          "title": "🧖 Mộc Kim Spa",
          "meta": "Post-class Reset · Check package",
          "badge": "Why this plan",
          "why": "Cooking class 到 1 點完，直接去 Spa 是為了讓下午先有一段真正休息。做完草本洗頭與 head spa，再去逛街會舒服得多。",
          "chips": [
            "Herbal hair wash",
            "Head spa",
            "Reset before shopping"
          ]
        },
        {
          "id": "l-ne",
          "category": "restaurant",
          "emoji": "🍷",
          "title": "🍷 LÚNE",
          "meta": "Michelin Selected French · VND 800k–1.5m pp",
          "badge": "Why this plan",
          "why": "LÚNE 放在 Day 2，是因為它接在 D1 shopping 後最順路，而且能滿足旅程中一餐較正式的法餐體驗。相比之後的 Quince，它更偏 contemporary French 與 Michelin selected 的精緻感。",
          "chips": [
            "Contemporary French",
            "Michelin selected",
            "Elegant dinner"
          ]
        }
      ],
      "wrapUp": {
        "id": "day2",
        "title": "DAY 2 Review"
      }
    },
    {
      "id": "day3",
      "label": "DAY 3",
      "eyebrow": "01/11/2026 · Sun",
      "title": "文青草田・Slow Thảo Điền",
      "glance": [
        {
          "emoji": "🚶",
          "label": "Walk",
          "value": "4–6 km"
        },
        {
          "emoji": "🚕",
          "label": "Transport",
          "value": "~4 Grab rides"
        },
        {
          "emoji": "☕",
          "label": "Breakfast",
          "value": "Quán Thuý 94 · $"
        },
        {
          "emoji": "🥐",
          "label": "Lunch / Tea",
          "value": "Bakes / Dreamers · $"
        },
        {
          "emoji": "🍷",
          "label": "Dinner",
          "value": "Little Bear · $$"
        },
        {
          "emoji": "🧖",
          "label": "Spa",
          "value": "Mộc Hương Wellness"
        }
      ],
      "todayPlan": "Day 3 是文青日，不追求逛盡每一間店，而是把 Thảo Điền 當成一個慢生活 neighbourhood。上午先完成蟹肉粉絲與粉紅教堂，再過橋到草田。下午茶、OHQUAO、Mộc Hương、Louh 和 Little Bear 連成一條較舒服的節奏，食唔食、食幾多都由大家自己 buffer。",
      "timeline": [
        {
          "time": "09:00 – 10:00",
          "emoji": "🍜",
          "title": "🍜 Quán Thuý 94",
          "description": "蟹肉粉絲早餐，之後步行約 5 分鐘到粉紅教堂。"
        },
        {
          "time": "10:00 – 10:45",
          "emoji": "🏛️",
          "title": "🏛️ Pink Church + Cộng Cà Phê",
          "description": "快閃打卡；可在 Cộng Cà Phê 高層坐一坐。"
        },
        {
          "time": "10:45 – 11:30",
          "emoji": "🚕",
          "title": "🚕 Grab → Thảo Điền",
          "description": "跨橋到草田區，開啟 slower neighbourhood day。"
        },
        {
          "time": "11:45 – 13:00",
          "emoji": "🛍️",
          "title": "🛍️ Lifestyle Walk",
          "description": "Saigon Concept → In the Mood → Soo Kafe 外帶蛋撻 → YouOn Boutique。"
        },
        {
          "time": "13:00 – 14:00",
          "emoji": "☕",
          "title": "☕ Afternoon Tea",
          "description": "Bakes 或 The Dreamers。食唔食、食幾多自己 buffer；重點是坐低休息。"
        },
        {
          "time": "14:30 – 15:00",
          "emoji": "🛍️",
          "title": "🛍️ OHQUAO Living",
          "description": "藝術家明信片、香氛、手工藝品。放 Spa 前，趁仍有精神慢慢睇。"
        },
        {
          "time": "15:30 – 17:30",
          "emoji": "🧖",
          "title": "🧖 Mộc Hương Wellness",
          "description": "白色法式別墅、蒸氣房、草本熱石水療；可寄存戰利品。"
        },
        {
          "time": "17:30 – 18:00",
          "emoji": "🛍️",
          "title": "🛍️ Louh × Alouane",
          "description": "高級棉織品家居服，Spa 後慢慢逛，讓節奏降下來。"
        },
        {
          "time": "18:30 – 20:30",
          "emoji": "🍷",
          "title": "🍷 Little Bear",
          "description": "Creative Vietnamese，Michelin Guide 入選。Mộc Hương 到 Little Bear 約 3 分鐘 Grab。"
        }
      ],
      "reviewItems": [
        {
          "id": "quan-thuy-94-day3",
          "category": "restaurant",
          "emoji": "🍜",
          "title": "🍜 Quán Thuý 94",
          "meta": "Breakfast · Crab Vermicelli",
          "badge": "Selected meal",
          "why": "Day 3 早餐用蟹肉粉絲開場，之後順路去粉紅教堂。這餐是地道小店感覺，適合放在文青日之前，先補一個 local food memory。",
          "chips": [
            "Breakfast",
            "Crab vermicelli",
            "Near Pink Church"
          ]
        },
        {
          "id": "pink-church-day3",
          "category": "poi",
          "emoji": "🏛️",
          "title": "🏛️ Pink Church + Cộng Cà Phê",
          "meta": "Photo Stop · District 3",
          "badge": "Selected sight",
          "why": "粉紅教堂是快閃景點，不會佔太多體力；Cộng Cà Phê 作為短暫冷氣位，讓大家拍完照可以坐一坐再過橋去 Thảo Điền。",
          "chips": [
            "Photo stop",
            "Short visit",
            "Cooling break"
          ]
        },
        {
          "id": "afternoon-tea",
          "category": "activity",
          "emoji": "☕",
          "title": "☕ Afternoon Tea",
          "meta": "Soft Buffer · VND 80k–150k pp",
          "badge": "Why this plan",
          "why": "下午茶是一段 buffer，不是一餐硬性午餐。大家可以視乎肚餓程度決定食幾多，重點是坐低、吹冷氣，讓下半日節奏更舒服。",
          "chips": [
            "Bakes",
            "Dreamers",
            "No rush"
          ]
        },
        {
          "id": "m-c-h-ng-wellness",
          "category": "activity",
          "emoji": "🧖",
          "title": "🧖 Mộc Hương Wellness",
          "meta": "French Villa Spa · VND 700k–1.1m pp",
          "badge": "Why this plan",
          "why": "Mộc Hương 是 Day 3 的中段 reset。白色法式別墅、蒸氣房與熱石按摩適合放在逛街後，讓身體真正慢下來，再進入晚餐前的輕鬆節奏。",
          "chips": [
            "Colonial villa",
            "Steam room",
            "Hot stone",
            "Luggage friendly"
          ]
        },
        {
          "id": "little-bear",
          "category": "restaurant",
          "emoji": "🍷",
          "title": "🍷 Little Bear",
          "meta": "Creative Vietnamese · VND 600k–1m pp",
          "badge": "Why this plan",
          "why": "Little Bear 放在 Day 3，不是因為順路，而是因為它最適合作為文青日的結尾。比正式 fine dining 更 chill，更適合逛完整天後慢慢聊天、分享菜式。",
          "chips": [
            "Michelin selected",
            "Relaxed",
            "Sharing dinner"
          ]
        }
      ],
      "wrapUp": {
        "id": "day3",
        "title": "DAY 3 Review"
      }
    },
    {
      "id": "day4",
      "label": "DAY 4",
      "eyebrow": "02/11/2026 · Mon",
      "title": "人文漫遊・Phú Nhuận・Quince",
      "glance": [
        {
          "emoji": "🚶",
          "label": "Walk",
          "value": "4–5 km"
        },
        {
          "emoji": "🚕",
          "label": "Transport",
          "value": "~5 Grab rides"
        },
        {
          "emoji": "☕",
          "label": "Breakfast",
          "value": "The Running Bean · $"
        },
        {
          "emoji": "🍕",
          "label": "Lunch",
          "value": "Pizza 4P's · $$"
        },
        {
          "emoji": "🍷",
          "label": "Dinner",
          "value": "Quince · $$$"
        },
        {
          "emoji": "🧖",
          "label": "Spa",
          "value": "Temple Leaf Spa Land"
        }
      ],
      "todayPlan": "Day 4 是整趟旅程較完整的城市日。上午放人文與博物館，午餐用當地不能錯過的 Pizza 4P’s 轉換氣氛，再進入 Phú Nhuận shopping。傍晚用 Temple Leaf 把體力收回來，晚餐 Quince 則以窯烤、open kitchen 與較 chill 的 contemporary European 作為旅程壓軸。",
      "timeline": [
        {
          "time": "08:30 – 09:30",
          "emoji": "☕",
          "title": "☕ The Running Bean",
          "description": "晨間咖啡，為博物館行程留精神。"
        },
        {
          "time": "09:30 – 11:30",
          "emoji": "🏛️",
          "title": "🏛️ War Remnants Museum",
          "description": "上午參觀，避開午後疲倦。"
        },
        {
          "time": "11:30 – 13:00",
          "emoji": "🍜",
          "title": "🍜 Pizza 4P's Hai Bà Trưng",
          "description": "當地不能錯過的 Pizza 品牌；食完向 Phú Nhuận 方向走，動線順。"
        },
        {
          "time": "13:30 – 16:30",
          "emoji": "🛍️",
          "title": "🛍️ Phú Nhuận Shopping Route",
          "description": "先 11 Garmentory，再按時間逛 ByVee、Pinguyen、thekat.shop、So Dópe Club、Dalla、RUBIES、Lane Cì。"
        },
        {
          "time": "17:30 – 19:15",
          "emoji": "🧖",
          "title": "🧖 Temple Leaf Spa Land",
          "description": "足底 / 全身按摩，把 shopping day 的體力消耗降下來。"
        },
        {
          "time": "19:15 – 19:45",
          "emoji": "🚕",
          "title": "🚕 Return Hotel / Change",
          "description": "回酒店梳洗換裝，準備晚餐。"
        },
        {
          "time": "20:15 – 22:15",
          "emoji": "🍷",
          "title": "🍷 Quince Saigon",
          "description": "Wood-fired contemporary European。Dinner category：$$$."
        },
        {
          "time": "22:15 onwards",
          "emoji": "📍",
          "title": "📍 Social Club Rooftop（Optional）",
          "description": "視體力決定，不作硬性安排。"
        }
      ],
      "reviewItems": [
        {
          "id": "the-running-bean",
          "category": "restaurant",
          "emoji": "☕",
          "title": "☕ The Running Bean",
          "meta": "Breakfast Coffee Stop · $",
          "badge": "Why this plan",
          "why": "Running Bean 放在 Day 4 早餐，是為了用一個簡單、舒服、容易集合的 coffee stop 開始博物館日。這張卡可以確認大家想保留西式早餐咖啡，還是改回更地道早餐。",
          "chips": [
            "Breakfast",
            "Coffee",
            "Easy start"
          ]
        },
        {
          "id": "pizza-4p-s",
          "category": "restaurant",
          "emoji": "🍜",
          "title": "🍜 Pizza 4P's",
          "meta": "Local Must-try Pizza · VND 200k–350k pp",
          "badge": "Why this plan",
          "why": "Pizza 4P’s 放在 lunch，是因為它幾乎是胡志明不能錯過的本地 pizza 品牌。午餐試會比晚餐輕鬆，也能為 Quince 保留晚上的食慾。",
          "chips": [
            "Vietnam favourite",
            "Burrata",
            "Crab pasta"
          ]
        },
        {
          "id": "temple-leaf-spa-land",
          "category": "spa",
          "emoji": "🧖",
          "title": "🧖 Temple Leaf Spa Land",
          "meta": "Foot + Body Reset · VND 530k–630k pp",
          "badge": "Why this plan",
          "why": "Temple Leaf 放在 Phú Nhuận shopping 後，是為了讓晚餐前有一段真正休息。足底、熱石與六樓花園放鬆區，剛好把白天的城市節奏降下來。",
          "chips": [
            "Foot massage",
            "Hot stone",
            "Garden rest area"
          ]
        },
        {
          "id": "quince",
          "category": "restaurant",
          "emoji": "🍷",
          "title": "🍷 Quince",
          "meta": "Wood-fired Contemporary European · $$$",
          "badge": "Why this plan",
          "why": "Quince 是另一種法餐方向：比 LÚNE 更有窯烤、open kitchen 與 relaxed dining 氣氛。放在最後一晚，是想用一餐成熟但不拘謹的 dinner 作為旅程高點。",
          "chips": [
            "Wood-fired",
            "Open kitchen",
            "Relaxed fine dining"
          ]
        }
      ],
      "wrapUp": {
        "id": "day4",
        "title": "DAY 4 Review"
      }
    },
    {
      "id": "day5",
      "label": "DAY 5",
      "eyebrow": "03/11/2026 · Tue",
      "title": "復古大片・Hạ Spa・Farewell",
      "glance": [
        {
          "emoji": "🚶",
          "label": "Walk",
          "value": "3–4 km"
        },
        {
          "emoji": "🚕",
          "label": "Transport",
          "value": "~5 Grab rides"
        },
        {
          "emoji": "☕",
          "label": "Breakfast",
          "value": "Phở Việt Nam · $"
        },
        {
          "emoji": "🍜",
          "label": "Lunch",
          "value": "Bếp Mẹ Ỉn · $$"
        },
        {
          "emoji": "🍷",
          "label": "Dinner",
          "value": "Airport light bite · $"
        },
        {
          "emoji": "🧖",
          "label": "Spa",
          "value": "Hạ Spa"
        }
      ],
      "todayPlan": "最後一天保持簡單。上午留在酒店附近吃 Phở Việt Nam、去美術館拍照，再用 Bếp Mẹ Ỉn 作 farewell lunch。下午回酒店提行李後直接去機場附近 Hạ Spa，把最後半天變成放鬆與收尾，而不是拖住行李到處趕。",
      "timeline": [
        {
          "time": "09:30 – 10:30",
          "emoji": "🍜",
          "title": "🍜 Phở Việt Nam Bến Thành",
          "description": "最後一碗石鍋河粉，距酒店步行或 Grab 3–5 分鐘。"
        },
        {
          "time": "10:30 – 11:45",
          "emoji": "🏛️",
          "title": "🏛️ Museum of Fine Arts",
          "description": "從河粉店步行約 4 分鐘，適合復古人文街拍。"
        },
        {
          "time": "11:45 – 13:00",
          "emoji": "🍜",
          "title": "🍜 Bếp Mẹ Ỉn",
          "description": "Michelin Bib Gourmand，黃金煎餅、椰子炒飯與越式拼盤。"
        },
        {
          "time": "13:00 – 14:15",
          "emoji": "📍",
          "title": "📍 Takashimaya + Maison Marou",
          "description": "最後手信時間：朱古力、咖啡、茶葉與乾果。"
        },
        {
          "time": "14:15 – 14:45",
          "emoji": "🚕",
          "title": "🚕 Return Hotel / Luggage",
          "description": "回 Fusion Original 提取寄存行李。"
        },
        {
          "time": "14:45 – 15:30",
          "emoji": "🚕",
          "title": "🚕 Grab → Hạ Spa",
          "description": "提早離開 D1，避開黃昏塞車。"
        },
        {
          "time": "15:30 – 17:30",
          "emoji": "🧖",
          "title": "🧖 Hạ Spa",
          "description": "草本洗頭 + 全身熱石按摩，近機場。"
        },
        {
          "time": "17:45 – 18:00",
          "emoji": "🚕",
          "title": "🚕 Airport",
          "description": "Hạ Spa 到新山一國際航廈約 2 分鐘。"
        },
        {
          "time": "18:00 – 21:10",
          "emoji": "🚕",
          "title": "🚕 Check-in / Duty Free / Boarding",
          "description": "預留 3 小時處理 check-in、過關與登機。"
        }
      ],
      "reviewItems": [
        {
          "id": "ph-vi-t-nam",
          "category": "restaurant",
          "emoji": "🍜",
          "title": "🍜 Phở Việt Nam + 美術館",
          "meta": "Farewell Morning · VND 100k–150k pp + entry",
          "badge": "Why this plan",
          "why": "最後一日上午不再跨區，所有安排都在酒店附近。河粉與美術館步行可接，既保留最後一組照片，也降低趕機風險。",
          "chips": [
            "Close to hotel",
            "Photo stop",
            "Low risk"
          ]
        },
        {
          "id": "b-p-m-n",
          "category": "restaurant",
          "emoji": "🍜",
          "title": "🍜 Bếp Mẹ Ỉn",
          "meta": "Farewell Lunch · VND 200k–350k pp",
          "badge": "Why this plan",
          "why": "Bếp Mẹ Ỉn 放在最後一日，是因為它是傳統越菜、容易分享，又在酒店生活圈附近。比起再追新區域，這餐更適合作為西貢味道的收結。",
          "chips": [
            "Bib Gourmand",
            "Traditional Vietnamese",
            "Sharing lunch"
          ]
        },
        {
          "id": "h-spa",
          "category": "spa",
          "emoji": "🧖",
          "title": "🧖 Hạ Spa",
          "meta": "Pre-flight Reset · Check package",
          "badge": "Why this plan",
          "why": "Hạ Spa 最大價值是近機場。把最後一段時間移到機場旁邊，可以避開下班塞車，也讓大家在登機前真正放鬆，而不是拖住行李等時間。",
          "chips": [
            "Near airport",
            "Luggage friendly",
            "Before flight"
          ]
        }
      ],
      "wrapUp": {
        "id": "day5",
        "title": "DAY 5 Review"
      }
    }
  ],
  "overallReview": {
    "id": "journey",
    "title": "Overall Plan Review"
  }
};
