(function () {
  "use strict";

  window.GAME_DATA = {
  "title": "谷雨-未寄信",
  "subtitle": "谷雨前夜，你翻出一封少年时写下却从未寄出的信。",
  "concept": "一场从谷雨清晨走向周末的分支旅程。选择在后台累计 MBTI 倾向，也把那封旧信带向不同结局。",
  "config": {
    "width": 390,
    "height": 844,
    "longPressMs": 650,
    "moveCancelPx": 12,
    "normalEventTotal": 21,
    "hiddenEventTotal": 0
  },
  "defaultTie": {
    "EI": "I",
    "SN": "N",
    "TF": "F",
    "JP": "P"
  },
  "startSceneId": "s01",
  "endingSceneId": null,
  "introProloguePages": [
    "城市堪堪入春，昼长夜短的节律慢慢显现，早晚的气温总在微凉与暖意间反复，风里带着刚破土的草木气，混着暮春独有的湿润，轻轻绕在街巷角落。",
    "你在这座城市扎根了太久，朝九晚五的日子早已磨成了无需思索的惯性，三餐有序，步履匆匆，日子平静得像无风的湖面，可只有你自己知道，心底始终压着一段没来得及收尾的过往，像一枚藏在衣缝里的细针，平日里毫无察觉，偶尔触碰，便泛起细碎的酸涩。",
    "那封信，在抽屉最深处安安静静地躺了很多年。",
    "写在少年时一个慵懒的午后，阳光透过教室的玻璃窗斜斜漫进来，在课桌上投下斑驳的光影，窗外七里香开得热烈，清甜的香气顺着风钻进教室，裹着年少的悸动与忐忑。你坐在靠窗的位置，握着笔一笔一画，认认真真写满了三页纸，字迹青涩却笃定，如今具体的字句早已模糊，只依稀记得，是写给心底惦念的那个人，关于一场约定好、却终究没能兑现的远行。",
    "写完之后，那封信却始终没能寄出。",
    "不是粗心忘记，是年少的胆怯与犹豫，总在等一个自以为完美的时机，等勇气足够，等时机刚好，等着等着，就变成了一句无声的“算了”。后来数次搬家，杂物丢了大半，唯独这封信一直被妥善收好，跟着你辗转各处，信封边角被岁月磨得微微发毛，却从未被拆开，也从未被遗失。",
    "谷雨将至的这个夜晚，你在整理旧物时，无意间将它翻了出来。指尖抚过粗糙的信封纸面，那些被尘封的少年时光，瞬间涌上心头。你终究没有拆开，只是指尖轻轻摩挲着泛黄的字迹，仿佛隔着漫长的岁月，轻轻触碰了当年那个局促又真诚的自己。",
    "窗外不知何时下起了细雨，雨丝落在窗沿上，声音轻而柔，像极了少年时欲言又止的心事。你沉默良久，缓缓将信塞进随身的背包里，抬手关掉台灯，房间瞬间沉入静谧的黑暗，唯有窗外的雨声，慢慢包裹住整个夜晚。"
  ],
  "assets": {
    "firstCover": "./images/first.webp",
    "bg01": "./images/bg_01_departure.png",
    "bg02": "./images/bg_02_cat_corner.png",
    "bg03": "./images/bg_03_workstation.png",
    "bg04": "./images/bg_04_milk_tea.png",
    "bg05": "./images/bg_05_memory.png",
    "bg06": "./images/bg_06_mirror_work.png",
    "bg07": "./images/bg_07_running.png",
    "bg08": "./images/bg_08_afternoon.png",
    "bg09": "./images/bg_09_luggage.png",
    "bg10": "./images/bg_10_alone.png",
    "bg11": "./images/bg_11_run_finish.png",
    "bg12": "./images/bg_12_reconcile.png",
    "bg13": "./images/bg_13_service_area.png",
    "bg14": "./images/bg_14_together.png",
    "bg15": "./images/bg_15_road.png",
    "bg16": "./images/bg_16_daily.png",
    "bg17": "./images/bg_17_cat_return.png",
    "bg18": "./images/bg_18_companion.png",
    "bg19": "./images/bg_19_destination.png",
    "bg20": "./images/bg_20_growth.png",
    "bg21": "./images/bg_21_ending.png",
    "door": "./images/obj_door.png",
    "letter": "./images/obj_letter.png",
    "music": "./images/obj_music.png",
    "cat": "./images/char_cat.png",
    "catSit": "./images/cat_sit.webp",
    "catStand": "./images/cat_stand.webp",
    "towel": "./images/obj_towel.png",
    "workstation": "./images/obj_workstation.png",
    "mirror": "./images/obj_mirror.png",
    "note": "./images/obj_sticky_note.png",
    "milkTea": "./images/obj_milk_tea.png",
    "phone": "./images/obj_phone.png",
    "coworker": "./images/char_coworker.png",
    "report": "./images/obj_report.png",
    "track": "./images/obj_track.png",
    "flower": "./images/obj_flower.png",
    "luggage": "./images/obj_luggage.png",
    "bench": "./images/obj_bench.png",
    "paperPlane": "./images/obj_paper_plane.png",
    "car": "./images/obj_car.png",
    "traveler": "./images/char_traveler.png",
    "friend": "./images/char_friend.png",
    "roadShop": "./images/obj_road_shop.png",
    "notebook": "./images/obj_notebook.png",
    "postcard": "./images/obj_postcard.png",
    "sunrise": "./images/obj_sunrise.png",
    "diary": "./images/obj_diary.png",
    "ending": "./images/obj_ending.png",
    "badgeResult": "./images/badge_result.svg",
    "ISTJ": "./images/ISTJ.png",
    "ISFJ": "./images/ISFJ.png",
    "INFJ": "./images/INFJ.png",
    "INTJ": "./images/INTJ.png",
    "ISTP": "./images/ISTP.png",
    "ISFP": "./images/ISFP.png",
    "INFP": "./images/INFP.png",
    "INTP": "./images/INTP.png",
    "ESTP": "./images/ESTP.png",
    "ESFP": "./images/ESFP.png",
    "ENFP": "./images/ENFP.png",
    "ENTP": "./images/ENTP.png",
    "ESTJ": "./images/ESTJ.png",
    "ESFJ": "./images/ESFJ.png",
    "ENFJ": "./images/ENFJ.png",
    "ENTJ": "./images/ENTJ.png",
    "story01": "./images/1.webp",
    "story02": "./images/2.webp",
    "story03": "./images/3.webp",
    "story04": "./images/4.webp",
    "story05": "./images/5.webp",
    "story06": "./images/6.webp",
    "story07": "./images/7.webp",
    "story08": "./images/8.webp",
    "story09": "./images/9.webp",
    "story10": "./images/10.webp",
    "story11": "./images/11.webp",
    "story14": "./images/14.webp",
    "story15": "./images/15.webp",
    "story16": "./images/16.webp",
    "story17": "./images/17.webp",
    "story18": "./images/18-19-20.webp",
    "story21": "./images/21.webp",
    "story22": "./images/22.webp",
    "endImage1": "./images/end1.webp",
    "endImage2": "./images/end2.webp",
    "endImage3": "./images/end3.webp",
    "endImage4": "./images/end4.webp",
    "endImage5": "./images/end5.webp"
  },
  "scenes": [
    {
      "id": "s01",
      "title": "第一幕",
      "name": "谷雨清晨・风启初心",
      "time": "清晨",
      "heading": "谷雨清晨・风启初心",
      "asset": "story01",
      "color": "#5a9c8f",
      "intro": "推开门的瞬间，谷雨清晨的风扑面而来，带着泥土的腥甜、青草的鲜嫩与雨后的湿润，轻轻拂过脸颊，驱散了一夜的困顿。路面还残留着夜雨的湿润，青石板与柏油路上泛着浅浅的水光，路边的枝叶上悬着晶莹的水珠，风一吹便缓缓坠落，在地面漾开一圈圈细碎的涟漪，转瞬即逝。\n\n背包里的信贴着脊背，存在感微弱却清晰，像一段无声的陪伴，提醒着那些未完成的过往。你随手戴上耳机，音乐随机播放，下一秒，《七里香》的旋律缓缓流淌而出，熟悉的曲调入耳，那些遥远又柔软的少年记忆，不受控制地翻涌上来，漫过心底的每一处角落。\n\n你站在门口，微微顿住脚步，清晨的风拂过发梢，心底五味杂陈，说不清是怀念、遗憾，还是释然，一时间竟不知道，该带着怎样的心情，开启这平凡又特殊的一天。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s02a",
      "title": "第二幕・A",
      "name": "直奔公司",
      "time": "清晨",
      "heading": "直奔公司",
      "asset": "story02",
      "color": "#6eaa82",
      "intro": "你收回心绪，加快脚步朝着公司走去，耳机里《七里香》的旋律还未结束，步履匆匆间，很快便接近了办公楼。恰逢早高峰，前路车流拥堵，你不想耽误时间，顺势拐进了旁边僻静的小巷绕行。巷子深处种着一棵苍老的梧桐，盘虬的树根裸露在地面，树根旁的石阶边，一只浑身湿透的小奶猫缩成一团，绒毛黏在身上，瑟瑟发抖，发出细弱又可怜的叫声，在空旷的巷子里格外清晰。\n\n你脚步猛地顿住，目光落在那只弱小的生命上，心底瞬间软了下来。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s02b",
      "title": "第二幕・B",
      "name": "老街慢行",
      "time": "清晨",
      "heading": "老街慢行",
      "asset": "story02",
      "color": "#6eaa82",
      "intro": "你放缓脚步，转身拐进了充满烟火气的老街，湿润的青石板路踩上去微凉，街边的早点摊冒着腾腾的热气，豆浆的香甜、包子的鲜香混着雨后泥土的气息，扑面而来，满是安稳的人间烟火。你慢慢走着，任由《七里香》在耳边循环，目光掠过街边熟悉的老店，心底的浮躁渐渐平复。快到公司时，巷口的梧桐树下，那只浑身湿透的小猫正抬着头，怯生生地望着你，眼神里满是无助。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s02c",
      "title": "第二幕・C",
      "name": "便利店出发",
      "time": "清晨",
      "heading": "便利店出发",
      "asset": "story02",
      "color": "#6eaa82",
      "intro": "你转身走进街角的便利店，挑了一杯温热的饮品，掌心被暖意包裹，浑身的寒意都被驱散，脚步也自然而然地慢了下来。谷雨时节的草木长势正好，路边的新绿鲜嫩得发亮，叶尖悬挂的水珠晶莹剔透，像散落的碎钻，风一吹便轻轻晃动。你握着热饮慢慢前行，走到老梧桐旁时，险些踩到脚下那只小小的、浑身湿透的奶猫，它缩在角落，连躲避的力气都没有。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s02d",
      "title": "第二幕・D",
      "name": "听完歌出发",
      "time": "清晨",
      "heading": "听完歌出发",
      "asset": "story02",
      "color": "#6eaa82",
      "intro": "你没有着急迈步，就站在原地，静静听完了整首《七里香》，旋律落幕的那一刻，心底的杂乱也渐渐沉淀。晚出发了几分钟，你却不想再追赶时间，只想顺着心意，慢慢往前走。你挑了一条平日里不常走的小路，沿途草木葱茏，走到老梧桐下时，那只湿透的小猫缩在树根处，抬着湿漉漉的脑袋，怯生生地望着你，眼神惹人怜惜。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s03",
      "title": "第三幕",
      "name": "工位落座・初对心镜",
      "time": "上午",
      "heading": "工位落座・初对心镜",
      "asset": "story03",
      "color": "#807968",
      "intro": "走进安静的办公室，咖啡机正低声运转，浓郁又醇厚的咖啡香弥漫在空气里，抚平了些许晨起的浮躁。你放下背包，伸手翻找笔记本准备开启工作，那封藏在背包夹层里的信，突然滑落出来，轻轻落在键盘上，无声无息，却瞬间牵动了你的所有注意力。\n\n你微微一怔，目光直直落在信封上。\n\n它就那样安安静静地躺在冰冷的键盘上，像一段被突然翻出的、尘封多年的心事，沉重又柔软。桌角的小镜子映出你的模样，神情看似平静无波，眼底却藏着一丝不易察觉的动摇与慌乱，那些被压抑的怀念与遗憾，在此刻再也藏不住。\n\n你盯着那封信，指尖悬在电脑开关上，终究没有立刻按下。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s04",
      "title": "第四幕",
      "name": "奶茶邀约・三分糖的记忆",
      "time": "午休",
      "heading": "奶茶邀约・三分糖的记忆",
      "asset": "story04",
      "color": "#987b55",
      "intro": "一上午的忙碌过后，紧绷的神经终于得以放松，你起身走出办公楼，无意间路过街角那家熟悉的奶茶店。暖黄色的灯牌在正午的阳光下依旧温柔，门口贴着一行手写的小字，笔触温暖：第二杯半价。\n\n三分糖芋圆奶茶，是你少年时最偏爱的味道，甜度刚好，软糯的芋圆裹着淡淡的奶香，那时候总觉得，日子很长，时光很慢，所有的约定都能兑现，所有的心意都能说出口。你站在路边，望着奶茶店的门头发呆，心底轻轻一动，尘封的回忆再次翻涌。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s05",
      "title": "第五幕",
      "name": "午休窗边・回忆回响",
      "time": "午休",
      "heading": "午休窗边・回忆回响",
      "asset": "story05",
      "color": "#807968",
      "intro": "回到工位，那封信依旧安放在原处，你没有勇气拆开，只是伸出指尖，轻轻碰了碰粗糙的信封边缘，指尖传来的触感，像极了当年那个忐忑的自己。\n\n办公室里格外安静，窗外又飘起了绵绵细雨，雨丝细碎，落在玻璃上晕开浅浅的水痕。邻座同事随手播放着音乐，熟悉的《七里香》再次响起，与清晨的旋律重合，瞬间将你拉回年少的时光。\n\n你忽然想起很久以前，操场的晚风里，你和那个少年并肩坐着，望着漫天晚霞，满心欢喜地约定，毕业以后要一起去公路旅行，要走遍想去的地方。那时候的你，眼神笃定，无比确信这场约定一定会如期兑现。\n\n就在这时，手机轻轻震动了一下，打破了安静的氛围。\n\n你拿起手机，屏幕上跳出的消息，正是那位许久未联系的朋友：“周末有空吗？路过以前的学校了。”\n\n你的手指悬在屏幕上方，看着短短一行字，心跳莫名漏了一拍，犹豫良久，迟迟没有按下回复键。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s06",
      "title": "第六幕",
      "name": "回应落定・心意外放",
      "time": "午后",
      "heading": "回应落定・心意外放",
      "asset": "story06",
      "color": "#807968",
      "intro": "指尖终究按下回复，消息发出的瞬间，你莫名泛起一丝紧张，手心微微发烫，既期待又忐忑。没过多久，对方便回复了消息，语气里满是惊喜：“有空。你还记得啊。”\n\n紧接着，又一条消息弹了出来：“那我们这次，真的去吧。”\n\n你盯着屏幕，嘴角不自觉地微微上扬，轻轻回了一个字：“好。”\n\n这场拖延了无数年的约定，这场藏在心底多年的心事，就在这一刻，轻轻落定。你拿起桌上的那封信，指尖拆开一角，却又缓缓停下，其实信里的内容早已不重要，你终究和当年的自己、和那段未完成的过往，达成了彻底的和解。\n\n窗外的雨丝依旧温柔，整个世界都变得安静又美好。就在这时，同事匆匆走到你身边，神色焦急，希望你能帮忙赶一份紧急工作任务。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s07",
      "title": "第七幕",
      "name": "回应克制・留白未说",
      "time": "午后",
      "heading": "回应克制・留白未说",
      "asset": "story07",
      "color": "#807968",
      "intro": "你思虑良久，最终只简单回复了“有空”两个字，那些憋在心底的、关于当年约定与那封未寄信的话，翻来覆去，最终还是没能说出口，化作了心底的一段留白。\n\n对方很快回复，语气平淡又温和，没有追问，没有深究：“那有空出来走走。”\n\n你盯着屏幕，心底莫名空了一小块，遗憾与释然交织在一起，桌上的信依旧安静躺着，你终究还是没有勇气拆开。\n\n同事快步走来，求助紧急工作任务。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s08",
      "title": "第八幕",
      "name": "回应推开・节奏收紧",
      "time": "午后",
      "heading": "回应推开・节奏收紧",
      "asset": "story08",
      "color": "#807968",
      "intro": "你指尖停顿许久，终究敲下一行字：“这周不太方便。”，按下发送的瞬间，心底泛起一丝说不清的怅然。\n\n对方没有多问，只淡淡回了一句：“好，改天。”\n\n简短的对话，就此戛然而止。你快速将桌上的信塞回背包深处，像是在逃避一段不愿面对的情绪，不想再被这份悬而未决的心事牵绊。窗外的雨声渐渐密集，你深吸一口气，强行将所有注意力拉回工作中。\n\n同事过来求助紧急工作任务。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s09",
      "title": "第九幕",
      "name": "侧面试探・心意外溢",
      "time": "午后",
      "heading": "侧面试探・心意外溢",
      "asset": "story09",
      "color": "#807968",
      "intro": "你没有直接输入文字回复，沉默片刻后，拿起桌上那封泛黄的信，对着开头拍了一张照片，发给了对方，附带一行字：“当年没寄出去的。”\n\n消息发出的瞬间，心底忽然一片空茫，有忐忑，有释然，也有终于直面过往的坦荡。你没有催促，只是安静地握着手机，望着窗外温柔的雨丝，心里清楚，有些尘封已久的东西，终究要迎来一个结局，有些事，也早已和当初不一样了。\n\n同事过来求助紧急工作任务。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s10",
      "title": "第十幕",
      "name": "核心支援・适度收手",
      "time": "傍晚",
      "heading": "核心支援・适度收手",
      "asset": "story10",
      "color": "#807968",
      "intro": "你没有全盘接手，只是帮同事梳理思路、完成了最关键、最繁琐的工作部分，将剩余内容交还对方自行收尾，既解了同事的燃眉之急，也守住了自己的工作节奏。手头的工作彻底结束时，窗外的雨已经停了，雨后的空气格外清新，混着草木的清香，深吸一口，满身疲惫都被驱散。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s11",
      "title": "第十一幕",
      "name": "全盘接手・独自完成",
      "time": "傍晚",
      "heading": "全盘接手・独自完成",
      "asset": "story11",
      "color": "#807968",
      "intro": "你看着同事焦急的模样，心软之下，将整个紧急任务全盘接下，一个人坐在工位上安静忙碌，抛开所有杂念，全身心投入工作中。等到所有工作彻底收尾时，天色已经完全暗了下来，窗外灯火点点，身体满是疲惫，心底却格外平静安稳，所有的情绪都被忙碌抚平。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s12",
      "title": "第十二幕",
      "name": "协作分工・节奏平衡",
      "time": "傍晚",
      "heading": "协作分工・节奏平衡",
      "asset": "story11",
      "color": "#807968",
      "intro": "你没有独自承担，也没有拒绝帮忙，而是和同事合理分工、默契配合，各司其职推进工作，效率平稳又高效，刚好在下班前按时完成了所有任务。整个过程不累不躁、节奏适中，既帮同事解决了难题，也没有打乱自己的状态，一切都刚刚好。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s13",
      "title": "第十三幕",
      "name": "边界清晰・独立收束",
      "time": "傍晚",
      "heading": "边界清晰・独立收束",
      "asset": "story11",
      "color": "#807968",
      "intro": "你礼貌且委婉地婉拒了同事的求助，讲明自身的工作安排，守住了自己的工作边界，按自己的节奏有条不紊地完成了手头工作。准时下班时，头脑依旧清醒，情绪平稳无波澜，没有被额外的琐事打乱节奏，浑身都透着轻松。",
      "objects": [],
      "interactionMode": "hotspot",
      "ending": false
    },
    {
      "id": "s14",
      "title": "第十四幕",
      "name": "人群之中・短暂偏移",
      "time": "夜晚→周末",
      "heading": "人群之中・短暂偏移",
      "asset": "story14",
      "color": "#7d8b72",
      "intro": "你赴约参加了团建，同事们聚在一起，气氛热闹又温暖，欢声笑语不断。可身处喧嚣的人群中，你却几次下意识地伸手，摸向背包里的那封信，心底始终藏着一段未言说的心事，最终，你还是没有将它拿出。\n\n团建散场后，你拖着些许疲惫的身体回家，洗漱过后便沉沉入睡，一夜无梦。清晨醒来，阳光透过窗帘缝隙洒进房间，迎来了安稳又平和的周末。",
      "objects": [],
      "interactionMode": "continueToNext",
      "ending": false,
      "memoryNext": {
        "key": "choice5",
        "routes": {
          "A": "s18",
          "B": "s19",
          "C": "s20",
          "D": "s21"
        },
        "fallback": "s18"
      }
    },
    {
      "id": "s15",
      "title": "第十五幕",
      "name": "街角回返・微光停驻",
      "time": "夜晚→周末",
      "heading": "街角回返・微光停驻",
      "asset": "story15",
      "color": "#6eaa82",
      "intro": "你没有直接返程，而是特意绕路，回到了清晨遇见小猫的那棵梧桐树下。原本弱小无助的小猫，已经被好心人妥善安置在干净的纸箱里，绒毛被擦干，变得蓬松柔软，身边放着充足的水与食物，正安静地蜷缩着，一切都在慢慢变好。\n\n你蹲在一旁，静静看了片刻，心底满是柔软，随即转身离开。那一夜，你睡得格外安稳，一夜安睡，清晨的阳光如约而至，迎来了轻松的周末。",
      "objects": [],
      "interactionMode": "continueToNext",
      "ending": false,
      "memoryNext": {
        "key": "choice5",
        "routes": {
          "A": "s18",
          "B": "s19",
          "C": "s20",
          "D": "s21"
        },
        "fallback": "s18"
      }
    },
    {
      "id": "s16",
      "title": "第十六幕",
      "name": "归于室内・缓慢沉淀",
      "time": "夜晚→周末",
      "heading": "归于室内・缓慢沉淀",
      "asset": "story16",
      "color": "#8a775f",
      "intro": "你拒绝了所有额外邀约，径直回家，关上房门的瞬间，外界的喧嚣全部被隔绝，世界瞬间归于安静。你缓缓从背包里拿出那封信，轻轻放在桌面上，沉默良久，终于鼓起勇气，一点点拆开了信封。\n\n纸上的字迹青涩稚嫩，字里行间满是少年人的真诚与悸动，你一字一句安静读完，缓缓将信纸重新折好，放回信封里。心底没有剧烈的情绪起伏，没有遗憾，没有不甘，只有历经岁月后，长久的释然与平静。\n\n周末清晨，阳光温柔，心底一片轻盈坦荡。",
      "objects": [],
      "interactionMode": "continueToNext",
      "ending": false,
      "memoryNext": {
        "key": "choice5",
        "routes": {
          "A": "s18",
          "B": "s19",
          "C": "s20",
          "D": "s21"
        },
        "fallback": "s18"
      }
    },
    {
      "id": "s17",
      "title": "第十七幕",
      "name": "江风入夜・步伐向前",
      "time": "夜晚→周末",
      "heading": "江风入夜・步伐向前",
      "asset": "story17",
      "color": "#5b788f",
      "intro": "你沿着江边慢慢慢跑，微凉的晚风拂过脸颊，吹散了满身的疲惫、心底的纠结与所有的负面情绪，脚步越来越轻快。慢跑过后，身体带着恰到好处的疲惫，心底却格外干净通透，往日的执念与遗憾，都被江风一一吹散。\n\n回家后，你倒头便睡，一夜酣眠。周末清晨醒来，神清气爽，满心都是奔赴未来的坦荡。",
      "objects": [],
      "interactionMode": "continueToNext",
      "ending": false,
      "memoryNext": {
        "key": "choice5",
        "routes": {
          "A": "s18",
          "B": "s19",
          "C": "s20",
          "D": "s21"
        },
        "fallback": "s18"
      }
    },
    {
      "id": "s18",
      "title": "第十八幕",
      "name": "如约而至・未尽之路",
      "time": "周末",
      "heading": "如约而至・未尽之路",
      "asset": "story18",
      "color": "#79a4a8",
      "intro": "你按时赴约，准时抵达约定地点，见到对方的那一刻，心底泛起熟悉又陌生的感觉，岁月在彼此身上留下了淡淡的痕迹，却依旧能一眼认出。两人简单闲聊了几句近况，打破了初见的沉默，你望着对方，轻声开口，语气笃定：“当年说的公路旅行，我们去完成吧。”\n\n对方神色微微动容，随即露出些许为难，轻声说道：“我也想，只是这两天真的抽不开身。”",
      "objects": [],
      "interactionMode": "continueToChoice",
      "ending": false
    },
    {
      "id": "s19",
      "title": "第十九幕",
      "name": "如约而至・话到边缘",
      "time": "周末",
      "heading": "如约而至・话到边缘",
      "asset": "story18",
      "color": "#79a4a8",
      "intro": "你们如约见面，闲聊着彼此的近况、生活的琐碎，气氛温和又自然，没有尴尬，没有疏离。自始至终，谁都没有提起年少的约定，也没有说起那封未寄的信，默契地守住了心底的留白。分别之时，对方轻声开口，说接下来还有其他事情要忙。",
      "objects": [],
      "interactionMode": "continueToChoice",
      "ending": false
    },
    {
      "id": "s20",
      "title": "第二十幕",
      "name": "偶然重逢・一句解释",
      "time": "周末",
      "heading": "偶然重逢・一句解释",
      "asset": "story18",
      "color": "#79a4a8",
      "intro": "你没有刻意赴约，只是出门随意闲逛，享受周末的慵懒时光，却在街角意外和对方重逢。四目相对的瞬间，气氛有一瞬轻微的尴尬，两人都愣了片刻，时光仿佛在这一刻静止。",
      "objects": [],
      "interactionMode": "continueToChoice",
      "ending": false
    },
    {
      "id": "s21",
      "title": "第二十一幕",
      "name": "突兀递出・话到深处",
      "time": "周末",
      "heading": "突兀递出・话到深处",
      "asset": "story21",
      "color": "#8a775f",
      "intro": "周末清晨醒来，你第一件事便是拿起手机，屏幕上躺着对方的回复，简单一句：“这是什么？”\n\n你看向桌上静静躺着的那封信，心底清楚，逃避了多年的心事，终究要给出一个答案，再也没有闪躲的余地。",
      "objects": [],
      "interactionMode": "continueToChoice",
      "ending": false
    },
    {
      "id": "s22",
      "title": "第二十二幕",
      "name": "同行之中・未说之意",
      "time": "傍晚",
      "heading": "同行之中・未说之意",
      "asset": "story22",
      "color": "#9a7f4d",
      "intro": "你们没有刻意准备行李、规划路线，没有等待所谓的最佳时机，就这样说走就走，奔赴了年少的约定。无论是租车远行，还是只是沿着公路步行一小段，旅途的形式早已不重要，重要的是，这一次，你们没有犹豫，没有拖延，真的出发了。\n\n脚下的路不断向前延伸，那些缺席了无数年的时光，那些未曾说出口的心意，都在这段同行的旅途里，慢慢被填补。黄昏缓缓降临，晚风温柔，落日将两人的影子拉长，彼此之间的距离，不远不近，刚好是最舒服的状态，满是不言而喻的默契。",
      "objects": [],
      "interactionMode": "continueToChoice",
      "ending": false
    },
    {
      "id": "end1",
      "title": "结局",
      "name": "BE1 不欢而散",
      "time": "故事收束",
      "heading": "BE1 不欢而散",
      "asset": "endImage1",
      "color": "#7f8f8b",
      "intro": "你执念于立刻出发，一心想要弥补当年的遗憾，全然不顾对方的难处，执意要即刻启程。对方实在无法抽身，反复解释却依旧无法说服你，最终只能无奈沉默。你看着对方，轻声说了一句“算了”，语气里满是失望与不甘，两人没有再多说一句话，各自转身，走向了不同的方向。\n\n那场年少时约定好的旅途，终究还是没能开启，那条本该并肩同行的路，终究还是空无一人。那封信依旧安静地躺在背包里，没有被拆开，也没有被寄出，那段未完成的约定，那段尘封的过往，终究还是停在了原地，成了永久的遗憾。",
      "objects": [],
      "interactionMode": "ending",
      "ending": true,
      "endingKey": "end1"
    },
    {
      "id": "end2",
      "title": "结局",
      "name": "END2 思绪笃定",
      "time": "故事收束",
      "heading": "END2 思绪笃定",
      "asset": "endImage2",
      "color": "#7f8f8b",
      "intro": "你没有再主动提起年少的约定，也没有触碰那段尘封的过往，只是平静地与对方道别，转身回归自己的生活。往后的日子，一切都回到了原本的节奏，三餐有序，工作安稳，生活平淡却踏实。\n\n那封信依旧被妥善珍藏，可你已经再也没有想要拆开它、提及它的念头。有些心事，不必说清；有些过往，不必重启；有些遗憾，不必弥补。停在这里，放下执念，坦然前行，就是最好的结局。",
      "objects": [],
      "interactionMode": "ending",
      "ending": true,
      "endingKey": "end2"
    },
    {
      "id": "end3",
      "title": "结局",
      "name": "END3 温情和解",
      "time": "故事收束",
      "heading": "END3 温情和解",
      "asset": "endImage3",
      "color": "#7f8f8b",
      "intro": "你们相视一笑，默契地约定好下次再聚，没有强求，没有执念，也没有遗憾。分别后，手机弹出对方的消息，简简单单一句：“下次再约。”，你指尖微动，平静回复了一个“好”字。\n\n那封未寄的信，依旧被好好珍藏，它再也不是心底的遗憾与枷锁，只是一段承载着少年时光的温柔旧物。人生本就是一场充满遗憾的旅途，有些人，不必同行相伴，也能永远住在心底，成为岁月里最温柔的念想，这便是最好的温情和解。",
      "objects": [],
      "interactionMode": "ending",
      "ending": true,
      "endingKey": "end3"
    },
    {
      "id": "end4",
      "title": "结局",
      "name": "END4 温暖相伴",
      "time": "故事收束",
      "heading": "END4 温暖相伴",
      "asset": "endImage4",
      "color": "#7f8f8b",
      "intro": "你拿起那封尘封多年的信，轻轻递到对方手里，声音温柔却笃定：“那时候写的，现在也还是。”，一句话，道尽了多年的执念与心意。\n\n对方郑重地收好信，目光认真地望着你，语气坚定：“那就一起走吧。”\n\n雨停风软，天色温柔，你们并肩走在落日余晖里，脚步坚定，方向一致。那封未寄的信，再也不是困住过往的枷锁，而是陪伴着你，奔赴往后岁月、奔赴满心欢喜的底气，从此，岁岁年年，温暖相伴。",
      "objects": [],
      "interactionMode": "ending",
      "ending": true,
      "endingKey": "end4"
    },
    {
      "id": "end5",
      "title": "结局",
      "name": "END5 奔赴山海",
      "time": "故事收束",
      "heading": "END5 奔赴山海",
      "asset": "endImage5",
      "color": "#7f8f8b",
      "intro": "你没有拿出那封信，也没有说太多煽情的话语，只是望着远方的路，笑着开口：“我想再走远一点。”\n\n对方没有丝毫犹豫，眼神坚定，语气干脆：“那就走。”\n\n这场旅途，从来不是为了弥补当年的遗憾，也不是为了兑现尘封的旧约，只是为了当下的心动，为了想要奔赴远方的心意。脚下的路还很长，未来的日子也还很远，不必着急，不必彷徨，因为你们早已出发，并肩奔赴山海，奔赴属于自己的远方。那封信安安静静躺在背包里，成了一句不必说出口、却始终存在的底气。",
      "objects": [],
      "interactionMode": "ending",
      "ending": true,
      "endingKey": "end5"
    }
  ],
  "events": [
    {
      "id": "e01",
      "sceneId": "s01",
      "title": "关键抉择 1",
      "objectLabel": "谷雨清晨・风启初心",
      "speaker": "关键抉择 1",
      "prompt": "关键抉择 1，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s01",
        "kind": "story",
        "asset": "story01",
        "label": "",
        "x": 136,
        "y": 188,
        "w": 118,
        "h": 178
      },
      "choices": [
        {
          "label": "A",
          "text": "直接赶往公司，用忙碌填满思绪",
          "score": {
            "J": 2,
            "T": 1
          },
          "nextSceneId": "s02a",
          "feedback": "s02a",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "走老街慢慢走，想认真感受这个清晨",
          "score": {
            "P": 2,
            "S": 1
          },
          "nextSceneId": "s02b",
          "feedback": "s02b",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "去便利店买一杯热饮，让自己缓一缓",
          "score": {
            "S": 2,
            "F": 1
          },
          "nextSceneId": "s02c",
          "feedback": "s02c",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "站在原地把这首歌听完，再出发",
          "score": {
            "I": 2,
            "N": 1
          },
          "nextSceneId": "s02d",
          "feedback": "s02d",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e02a",
      "sceneId": "s02a",
      "title": "关键抉择 2",
      "objectLabel": "直奔公司",
      "speaker": "关键抉择 2",
      "prompt": "关键抉择 2，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s02a",
        "kind": "story",
        "asset": "story02",
        "label": "",
        "x": 158,
        "y": 210,
        "w": 96,
        "h": 132
      },
      "choices": [
        {
          "label": "A",
          "text": "抱起小猫，擦干后联系救助",
          "score": {
            "F": 2,
            "N": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "给它一点食物，摸了摸头，继续赶路",
          "score": {
            "S": 2,
            "T": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "拍照发到邻居群求助，然后离开",
          "score": {
            "E": 2,
            "J": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "走开后又折返，买了幼猫粮放在它身边",
          "score": {
            "P": 2,
            "N": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e02b",
      "sceneId": "s02b",
      "title": "关键抉择 2",
      "objectLabel": "老街慢行",
      "speaker": "关键抉择 2",
      "prompt": "关键抉择 2，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s02b",
        "kind": "story",
        "asset": "story02",
        "label": "",
        "x": 158,
        "y": 210,
        "w": 96,
        "h": 132
      },
      "choices": [
        {
          "label": "A",
          "text": "抱起小猫，擦干后托人照看",
          "score": {
            "F": 2,
            "N": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "给它一点零食，陪它片刻再离开",
          "score": {
            "S": 2,
            "T": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "拍照发到群里求助，继续前行",
          "score": {
            "E": 2,
            "J": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "走开后又折返，买了幼猫粮放在它身边",
          "score": {
            "P": 2,
            "N": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e02c",
      "sceneId": "s02c",
      "title": "关键抉择 2",
      "objectLabel": "便利店出发",
      "speaker": "关键抉择 2",
      "prompt": "关键抉择 2，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s02c",
        "kind": "story",
        "asset": "story02",
        "label": "",
        "x": 158,
        "y": 210,
        "w": 96,
        "h": 132
      },
      "choices": [
        {
          "label": "A",
          "text": "放下饮品，抱起小猫擦干安置",
          "score": {
            "F": 2,
            "N": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "分给它一点零食，蹲下来陪一会儿",
          "score": {
            "S": 2,
            "T": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "拍照发到群里求助，然后离开",
          "score": {
            "E": 2,
            "J": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "走开后又折返，买了幼猫粮放在它身边",
          "score": {
            "P": 2,
            "N": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e02d",
      "sceneId": "s02d",
      "title": "关键抉择 2",
      "objectLabel": "听完歌出发",
      "speaker": "关键抉择 2",
      "prompt": "关键抉择 2，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s02d",
        "kind": "story",
        "asset": "story02",
        "label": "",
        "x": 158,
        "y": 210,
        "w": 96,
        "h": 132
      },
      "choices": [
        {
          "label": "A",
          "text": "抱起小猫，擦干后托人照看",
          "score": {
            "F": 2,
            "N": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "给它一点食物，摸了摸头再离开",
          "score": {
            "S": 2,
            "T": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "拍照发到群里求助，继续前行",
          "score": {
            "E": 2,
            "J": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "走开后又折返，买了幼猫粮放在它身边",
          "score": {
            "P": 2,
            "N": 1
          },
          "nextSceneId": "s03",
          "feedback": "s03",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e03",
      "sceneId": "s03",
      "title": "关键抉择 3",
      "objectLabel": "工位落座・初对心镜",
      "speaker": "关键抉择 3",
      "prompt": "关键抉择 3，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s03",
        "kind": "story",
      "asset": "story03",
      "label": "",
      "x": 112,
      "y": 262,
      "w": 76,
      "h": 46
    },
      "choices": [
        {
          "label": "A",
          "text": "把信放到一边，告诉自己午休再面对",
          "score": {
            "J": 2,
            "T": 1
          },
          "nextSceneId": "s04",
          "feedback": "s04",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "让信留在桌角，继续工作",
          "score": {
            "I": 2,
            "P": 1
          },
          "nextSceneId": "s04",
          "feedback": "s04",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "把信塞回包里，深吸一口气开始工作",
          "score": {
            "S": 2,
            "J": 1
          },
          "nextSceneId": "s04",
          "feedback": "s04",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "拿着信去茶水间，默读一遍再收好",
          "score": {
            "F": 2,
            "N": 1
          },
          "nextSceneId": "s04",
          "feedback": "s04",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e04",
      "sceneId": "s04",
      "title": "关键抉择 4",
      "objectLabel": "奶茶邀约・三分糖的记忆",
      "speaker": "关键抉择 4",
      "prompt": "关键抉择 4，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s04",
        "kind": "story",
        "asset": "story04",
        "label": "",
        "x": 82,
        "y": 244,
        "w": 68,
        "h": 94
      },
      "choices": [
        {
          "label": "A",
          "text": "点两杯，都留给自己",
          "score": {
            "P": 2,
            "I": 1
          },
          "nextSceneId": "s05",
          "feedback": "s05",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "只点一杯，压下多余的情绪",
          "score": {
            "J": 2,
            "T": 1
          },
          "nextSceneId": "s05",
          "feedback": "s05",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "点两杯，带一杯给同事",
          "score": {
            "E": 2,
            "F": 1
          },
          "nextSceneId": "s05",
          "feedback": "s05",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "不进店，在棚子里的椅子上坐一会儿",
          "score": {
            "I": 2,
            "N": 1
          },
          "nextSceneId": "s05",
          "feedback": "s05",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e05",
      "sceneId": "s05",
      "title": "关键抉择 5",
      "objectLabel": "午休窗边・回忆回响",
      "speaker": "关键抉择 5",
      "prompt": "关键抉择 5，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s05",
        "kind": "story",
        "asset": "story05",
        "label": "",
        "x": 294,
        "y": 244,
        "w": 46,
        "h": 76
      },
      "choices": [
        {
          "label": "A",
          "text": "回复 “有空”，并提起当年的约定",
          "score": {
            "E": 2,
            "N": 1
          },
          "nextSceneId": "s06",
          "feedback": "s06",
          "setMemory": {
            "key": "choice5",
            "value": "A"
          }
        },
        {
          "label": "B",
          "text": "回复 “有空”，只聊近况",
          "score": {
            "S": 2,
            "F": 1
          },
          "nextSceneId": "s07",
          "feedback": "s07",
          "setMemory": {
            "key": "choice5",
            "value": "B"
          }
        },
        {
          "label": "C",
          "text": "回复 “不太方便”，委婉推开",
          "score": {
            "I": 2,
            "J": 1
          },
          "nextSceneId": "s08",
          "feedback": "s08",
          "setMemory": {
            "key": "choice5",
            "value": "C"
          }
        },
        {
          "label": "D",
          "text": "不回复文字，直接拍信发过去",
          "score": {
            "N": 2,
            "P": 1
          },
          "nextSceneId": "s09",
          "feedback": "s09",
          "setMemory": {
            "key": "choice5",
            "value": "D"
          }
        }
      ]
    },
    {
      "id": "e06",
      "sceneId": "s06",
      "title": "关键抉择 6",
      "objectLabel": "回应落定・心意外放",
      "speaker": "关键抉择 6",
      "prompt": "关键抉择 6，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s06",
        "kind": "story",
        "asset": "story06",
        "label": "",
        "x": 218,
        "y": 250,
        "w": 84,
        "h": 98
      },
      "choices": [
        {
          "label": "A",
          "text": "帮忙完成核心部分，其余交还对方",
          "score": {
            "T": 2,
            "J": 1
          },
          "nextSceneId": "s10",
          "feedback": "s10",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "全部接过来，一个人做完",
          "score": {
            "J": 2,
            "I": 1
          },
          "nextSceneId": "s11",
          "feedback": "s11",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "和同事分工，一起完成",
          "score": {
            "N": 2,
            "P": 1
          },
          "nextSceneId": "s12",
          "feedback": "s12",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "说明情况，礼貌拒绝",
          "score": {
            "T": 2,
            "N": 1
          },
          "nextSceneId": "s13",
          "feedback": "s13",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e07",
      "sceneId": "s07",
      "title": "关键抉择 6",
      "objectLabel": "回应克制・留白未说",
      "speaker": "关键抉择 6",
      "prompt": "关键抉择 6，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s07",
        "kind": "story",
        "asset": "story07",
        "label": "",
        "x": 218,
        "y": 250,
        "w": 84,
        "h": 98
      },
      "choices": [
        {
          "label": "A",
          "text": "协助核心，不全盘接手",
          "score": {
            "T": 2,
            "J": 1
          },
          "nextSceneId": "s10",
          "feedback": "s10",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "独自完成全部",
          "score": {
            "J": 2,
            "I": 1
          },
          "nextSceneId": "s11",
          "feedback": "s11",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "分工协作",
          "score": {
            "N": 2,
            "P": 1
          },
          "nextSceneId": "s12",
          "feedback": "s12",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "婉拒帮忙",
          "score": {
            "T": 2,
            "N": 1
          },
          "nextSceneId": "s13",
          "feedback": "s13",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e08",
      "sceneId": "s08",
      "title": "关键抉择 6",
      "objectLabel": "回应推开・节奏收紧",
      "speaker": "关键抉择 6",
      "prompt": "关键抉择 6，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s08",
        "kind": "story",
        "asset": "story08",
        "label": "",
        "x": 218,
        "y": 250,
        "w": 84,
        "h": 98
      },
      "choices": [
        {
          "label": "A",
          "text": "协助核心，不全盘接手",
          "score": {
            "T": 2,
            "J": 1
          },
          "nextSceneId": "s10",
          "feedback": "s10",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "独自完成全部",
          "score": {
            "J": 2,
            "I": 1
          },
          "nextSceneId": "s11",
          "feedback": "s11",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "分工协作",
          "score": {
            "N": 2,
            "P": 1
          },
          "nextSceneId": "s12",
          "feedback": "s12",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "婉拒帮忙",
          "score": {
            "T": 2,
            "N": 1
          },
          "nextSceneId": "s13",
          "feedback": "s13",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e09",
      "sceneId": "s09",
      "title": "关键抉择 6",
      "objectLabel": "侧面试探・心意外溢",
      "speaker": "关键抉择 6",
      "prompt": "关键抉择 6，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s09",
        "kind": "story",
        "asset": "story09",
        "label": "",
        "x": 218,
        "y": 250,
        "w": 84,
        "h": 98
      },
      "choices": [
        {
          "label": "A",
          "text": "协助核心，不全盘接手",
          "score": {
            "T": 2,
            "J": 1
          },
          "nextSceneId": "s10",
          "feedback": "s10",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "独自完成全部",
          "score": {
            "J": 2,
            "I": 1
          },
          "nextSceneId": "s11",
          "feedback": "s11",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "分工协作",
          "score": {
            "N": 2,
            "P": 1
          },
          "nextSceneId": "s12",
          "feedback": "s12",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "婉拒帮忙",
          "score": {
            "T": 2,
            "N": 1
          },
          "nextSceneId": "s13",
          "feedback": "s13",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e10",
      "sceneId": "s10",
      "title": "关键抉择 10",
      "objectLabel": "核心支援・适度收手",
      "speaker": "关键抉择 10",
      "prompt": "关键抉择 10，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s10",
        "kind": "story",
        "asset": "story10",
        "label": "",
        "x": 154,
        "y": 160,
        "w": 96,
        "h": 90
      },
      "choices": [
        {
          "label": "A",
          "text": "去参加团建",
          "score": {
            "E": 2,
            "T": 1
          },
          "nextSceneId": "s14",
          "feedback": "s14",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "绕路去看看那只小猫",
          "score": {
            "F": 2,
            "S": 1
          },
          "nextSceneId": "s15",
          "feedback": "s15",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "直接回家",
          "score": {
            "I": 2,
            "J": 1
          },
          "nextSceneId": "s16",
          "feedback": "s16",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "去江边慢跑",
          "score": {
            "P": 2,
            "S": 1
          },
          "nextSceneId": "s17",
          "feedback": "s17",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e11",
      "sceneId": "s11",
      "title": "关键抉择 10",
      "objectLabel": "全盘接手・独自完成",
      "speaker": "关键抉择 10",
      "prompt": "关键抉择 10，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s11",
        "kind": "story",
        "asset": "story11",
        "label": "",
        "x": 158,
        "y": 156,
        "w": 96,
        "h": 114
      },
      "choices": [
        {
          "label": "A",
          "text": "去参加团建",
          "score": {
            "E": 2,
            "T": 1
          },
          "nextSceneId": "s14",
          "feedback": "s14",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "看看小猫",
          "score": {
            "F": 2,
            "S": 1
          },
          "nextSceneId": "s15",
          "feedback": "s15",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "直接回家",
          "score": {
            "I": 2,
            "J": 1
          },
          "nextSceneId": "s16",
          "feedback": "s16",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "江边慢跑",
          "score": {
            "P": 2,
            "S": 1
          },
          "nextSceneId": "s17",
          "feedback": "s17",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e12",
      "sceneId": "s12",
      "title": "关键抉择 10",
      "objectLabel": "协作分工・节奏平衡",
      "speaker": "关键抉择 10",
      "prompt": "关键抉择 10，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s12",
        "kind": "story",
        "asset": "story11",
        "label": "",
        "x": 158,
        "y": 156,
        "w": 96,
        "h": 114
      },
      "choices": [
        {
          "label": "A",
          "text": "去参加团建",
          "score": {
            "E": 2,
            "T": 1
          },
          "nextSceneId": "s14",
          "feedback": "s14",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "看看小猫",
          "score": {
            "F": 2,
            "S": 1
          },
          "nextSceneId": "s15",
          "feedback": "s15",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "直接回家",
          "score": {
            "I": 2,
            "J": 1
          },
          "nextSceneId": "s16",
          "feedback": "s16",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "江边慢跑",
          "score": {
            "P": 2,
            "S": 1
          },
          "nextSceneId": "s17",
          "feedback": "s17",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e13",
      "sceneId": "s13",
      "title": "关键抉择 10",
      "objectLabel": "边界清晰・独立收束",
      "speaker": "关键抉择 10",
      "prompt": "关键抉择 10，请选择接下来的行动。",
      "hotspot": {
        "id": "hotspot-s13",
        "kind": "story",
        "asset": "story11",
        "label": "",
        "x": 158,
        "y": 156,
        "w": 96,
        "h": 114
      },
      "choices": [
        {
          "label": "A",
          "text": "去参加团建",
          "score": {
            "E": 2,
            "T": 1
          },
          "nextSceneId": "s14",
          "feedback": "s14",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "看看小猫",
          "score": {
            "F": 2,
            "S": 1
          },
          "nextSceneId": "s15",
          "feedback": "s15",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "直接回家",
          "score": {
            "I": 2,
            "J": 1
          },
          "nextSceneId": "s16",
          "feedback": "s16",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "江边慢跑",
          "score": {
            "P": 2,
            "S": 1
          },
          "nextSceneId": "s17",
          "feedback": "s17",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e18",
      "sceneId": "s18",
      "title": "关键抉择 28",
      "objectLabel": "如约而至・未尽之路",
      "speaker": "关键抉择 28",
      "prompt": "关键抉择 28，请选择接下来的行动。",
      "hotspot": null,
      "choices": [
        {
          "label": "A",
          "text": "坚持现在就走",
          "score": {
            "E": 2,
            "P": 1
          },
          "nextSceneId": "end1",
          "feedback": "end1",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "重新约定一个时间",
          "score": {
            "J": 2,
            "F": 1
          },
          "nextSceneId": "s22",
          "feedback": "s22",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "当作随口一提，不再继续",
          "score": {
            "I": 2,
            "T": 1
          },
          "nextSceneId": "end2",
          "feedback": "end2",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "提议今天先走一小段，当作开始",
          "score": {
            "P": 2,
            "N": 1
          },
          "nextSceneId": "s22",
          "feedback": "s22",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e19",
      "sceneId": "s19",
      "title": "关键抉择 29",
      "objectLabel": "如约而至・话到边缘",
      "speaker": "关键抉择 29",
      "prompt": "关键抉择 29，请选择接下来的行动。",
      "hotspot": null,
      "choices": [
        {
          "label": "A",
          "text": "提起当年的旅行约定",
          "score": {
            "E": 2,
            "N": 1
          },
          "nextSceneId": "s22",
          "feedback": "s22",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "只说下次再约",
          "score": {
            "F": 2,
            "S": 1
          },
          "nextSceneId": "end3",
          "feedback": "end3",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "默默告别，不再多言",
          "score": {
            "I": 2,
            "T": 1
          },
          "nextSceneId": "end2",
          "feedback": "end2",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "把那封信交给对方",
          "score": {
            "F": 2,
            "E": 1
          },
          "nextSceneId": "end4",
          "feedback": "end4",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e20",
      "sceneId": "s20",
      "title": "关键抉择 30",
      "objectLabel": "偶然重逢・一句解释",
      "speaker": "关键抉择 30",
      "prompt": "关键抉择 30，请选择接下来的行动。",
      "hotspot": null,
      "choices": [
        {
          "label": "A",
          "text": "解释上次婉拒，并主动邀约旅行",
          "score": {
            "E": 2,
            "F": 1
          },
          "nextSceneId": "s22",
          "feedback": "s22",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "轻描淡写说只是出来走走",
          "score": {
            "S": 2,
            "I": 1
          },
          "nextSceneId": "end1",
          "feedback": "end1",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "简单打招呼后离开",
          "score": {
            "I": 2,
            "T": 1
          },
          "nextSceneId": "end1",
          "feedback": "end1",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "半开玩笑化解尴尬",
          "score": {
            "P": 2,
            "E": 1
          },
          "nextSceneId": "s22",
          "feedback": "s22",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e21",
      "sceneId": "s21",
      "title": "关键抉择 31",
      "objectLabel": "突兀递出・话到深处",
      "speaker": "关键抉择 31",
      "prompt": "关键抉择 31，请选择接下来的行动。",
      "hotspot": null,
      "choices": [
        {
          "label": "A",
          "text": "坦白当年与现在的心意",
          "score": {
            "F": 2,
            "E": 1
          },
          "nextSceneId": "end4",
          "feedback": "end4",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "承认当年心动，但选择放下",
          "score": {
            "T": 2,
            "F": 1
          },
          "nextSceneId": "end3",
          "feedback": "end3",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "只说是年少旧物，不提情感",
          "score": {
            "S": 2,
            "I": 1
          },
          "nextSceneId": "end3",
          "feedback": "end3",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "不再回复，就此作罢",
          "score": {
            "I": 2,
            "J": 1
          },
          "nextSceneId": "end3",
          "feedback": "end3",
          "setMemory": null
        }
      ]
    },
    {
      "id": "e22",
      "sceneId": "s22",
      "title": "关键抉择 32",
      "objectLabel": "同行之中・未说之意",
      "speaker": "关键抉择 32",
      "prompt": "关键抉择 32，请选择接下来的行动。",
      "hotspot": null,
      "choices": [
        {
          "label": "A",
          "text": "说出你现在的心意",
          "score": {
            "F": 2,
            "E": 1
          },
          "nextSceneId": "end4",
          "feedback": "end4",
          "setMemory": null
        },
        {
          "label": "B",
          "text": "不戳破，让美好停在此刻",
          "score": {
            "I": 2,
            "P": 1
          },
          "nextSceneId": "end5",
          "feedback": "end5",
          "setMemory": null
        },
        {
          "label": "C",
          "text": "轻轻试探对方的想法",
          "score": {
            "N": 2,
            "F": 1
          },
          "nextSceneId": "end3",
          "feedback": "end3",
          "setMemory": null
        },
        {
          "label": "D",
          "text": "转移话题，平静收尾",
          "score": {
            "S": 2,
            "P": 1
          },
          "nextSceneId": "end3",
          "feedback": "end3",
          "setMemory": null
        }
      ]
    }
  ],
  "storyEndings": {
    "end1": {
      "shortName": "不欢而散",
      "description": "执念急着抵达，反而让旧约停在原地。"
    },
    "end2": {
      "shortName": "思绪笃定",
      "description": "不再重启过往，把生活重新握回自己手里。"
    },
    "end3": {
      "shortName": "温情和解",
      "description": "没有强求，也没有遗憾，旧信成为温柔旧物。"
    },
    "end4": {
      "shortName": "温暖相伴",
      "description": "把心意认真交出，也终于并肩走向往后。"
    },
    "end5": {
      "shortName": "奔赴山海",
      "description": "不为补偿过去，只为当下心动一起出发。"
    }
  },
  "scoreReview": {
    "rule": "每个选项后台记录 1-2 分、1-2 个 MBTI 字母倾向；前端不向玩家显示分值。",
    "totals": {
      "E": 30,
      "I": 33,
      "S": 30,
      "N": 30,
      "T": 32,
      "F": 33,
      "J": 31,
      "P": 33
    }
  },
  "results": {
    "ISTJ": {
      "name": "守灯整理者",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ISFJ": {
      "name": "温汤守夜人",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "INFJ": {
      "name": "山雾引路人",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "INTJ": {
      "name": "星图策划者",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ISTP": {
      "name": "安静修理师",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ISFP": {
      "name": "风中采样员",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "INFP": {
      "name": "未寄信诗人",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "INTP": {
      "name": "树洞推演者",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ESTP": {
      "name": "街角行动派",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ESFP": {
      "name": "深夜发光体",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ENFP": {
      "name": "山海漫游者",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ENTP": {
      "name": "逆风试验家",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ESTJ": {
      "name": "秩序推进者",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ESFJ": {
      "name": "暖桌召集人",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ENFJ": {
      "name": "灯下引路人",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    },
    "ENTJ": {
      "name": "山海策划王",
      "description": "你习惯用自己的节奏理解世界，在选择里保留清醒，也给情感留下位置。",
      "work": "适合把重要任务拆成清晰步骤，同时为灵感、沟通和休息留出弹性。",
      "summary": "这一天里，你处理旧信、关系与当下生活的方式，慢慢显出了属于你的稳定倾向。"
    }
  }
};
})();
