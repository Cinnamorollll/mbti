(function () {
  "use strict";

  window.GAME_DATA = {
    title: "未寄出的山海",
    subtitle: "谷雨这天，你把一封信带过清晨、街口、灯下与深夜。",
    concept: "在一段半现实半幻想的一天里，选择会慢慢长成你的 16 型人格海报。",
    config: {
      width: 390,
      height: 844,
      longPressMs: 650,
      moveCancelPx: 12,
      normalEventTotal: 20,
      hiddenEventTotal: 2
    },
    defaultTie: {
      EI: "I",
      SN: "N",
      TF: "F",
      JP: "P"
    },
    assets: {
      bgMorning: "./images/bg_morning.svg",
      bgOffice: "./images/bg_office.svg",
      bgStreet: "./images/bg_street.svg",
      bgStage: "./images/bg_stage.svg",
      bgDiner: "./images/bg_diner.svg",
      objMirror: "./images/obj_mirror.svg",
      objLetter: "./images/obj_letter.svg",
      objMap: "./images/obj_map.svg",
      badgeResult: "./images/badge_result.svg"
    },
    scenes: [
      {
        id: "morning",
        title: "第一幕",
        name: "谷雨清晨",
        time: "07:18",
        asset: "bgMorning",
        color: "#4f9f8f",
        intro: "雨把窗沿敲得很轻。你醒来时，桌上有一封还没有寄出的信。"
      },
      {
        id: "office",
        title: "第二幕",
        name: "上午办公室",
        time: "10:03",
        asset: "bgOffice",
        color: "#427fc3",
        intro: "电梯门合上又打开，桌面上的便签像一小片等你整理的潮汐。"
      },
      {
        id: "street",
        title: "第三幕",
        name: "午后街口",
        time: "14:27",
        asset: "bgStreet",
        color: "#d26262",
        intro: "雨停了一半。街角玻璃映出你，也映出一条不太确定的路。"
      },
      {
        id: "stage",
        title: "第四幕",
        name: "傍晚创作现场",
        time: "18:40",
        asset: "bgStage",
        color: "#6b8f4f",
        intro: "灯光亮起，山海的影子落在墙上。每个人都在等一个可以继续的方向。"
      },
      {
        id: "diner",
        title: "第五幕",
        name: "深夜食堂",
        time: "23:12",
        asset: "bgDiner",
        color: "#2f8b86",
        intro: "最后一盏灯还亮着。汤的热气往上走，像一条慢慢回家的河。"
      }
    ],
    events: [
      {
        id: "e01",
        sceneId: "morning",
        title: "窗边醒来",
        objectLabel: "雨窗",
        speaker: "清晨",
        prompt: "手机亮了一下，窗外正下着谷雨。你醒来的第一件事，会把注意力放在哪里？",
        hotspot: { id: "window", x: 42, y: 104, w: 118, h: 172, kind: "window", label: "雨窗" },
        choices: [
          { text: "先回应消息", score: { E: 2, F: 1, J: 1 }, feedback: "你把一句早安发出去，房间像被轻轻点亮。有人回应时，你的今天也多了一条回声。" },
          { text: "先观察雨声", score: { I: 2, N: 1, P: 1 }, feedback: "你没有急着打开世界，只听雨声把时间揉软。那些还没说出口的话，先在心里散开。" },
          { text: "先整理今日计划", score: { J: 2, S: 1, T: 1 }, feedback: "你把今天拆成几段可抵达的小路。窗外还在下雨，但你的脚步已经有了顺序。" }
        ]
      },
      {
        id: "e02",
        sceneId: "morning",
        title: "镜子前的停顿",
        objectLabel: "镜子",
        speaker: "镜子",
        prompt: "洗漱台前，镜子里的你比平时安静一点。你会怎样描述此刻的自己？",
        hint: "长按镜子，也许能听见更深处。",
        hotspot: { id: "mirror", x: 218, y: 116, w: 104, h: 156, kind: "mirror", asset: "objMirror", label: "镜子" },
        choices: [
          { text: "用事实描述自己", score: { S: 2, T: 1 }, feedback: "你确认睡眠、天气、时间和要带走的物品。清楚的事实让你找回身体的重心。" },
          { text: "用感觉描述自己", score: { N: 2, F: 1, I: 1 }, feedback: "你说自己像一封折了一半的信。镜面没有反驳，只把这句话收进微光里。" },
          { text: "用目标描述自己", score: { J: 2, T: 1, E: 1 }, feedback: "你把今天想完成的事说给镜子听。声音落下时，像给自己按下一个小小的开始键。" }
        ]
      },
      {
        id: "e03",
        sceneId: "morning",
        title: "桌上的早餐",
        objectLabel: "早餐",
        speaker: "桌面",
        prompt: "杯子边缘还留着一点温度。你准备怎么对待这个慢下来的早晨？",
        hotspot: { id: "breakfast", x: 58, y: 352, w: 154, h: 98, kind: "table", label: "早餐" },
        choices: [
          { text: "先照顾自己的感受", score: { I: 2, F: 1, P: 1 }, feedback: "你把节奏放低，先问自己想不想继续。被照顾的那一小块心情，慢慢回暖。" },
          { text: "按习惯准备", score: { S: 2, J: 1 }, feedback: "你按熟悉的顺序摆好杯子、面包和钥匙。稳定的小动作，替你撑起一整天。" },
          { text: "临时改变安排", score: { P: 2, N: 1 }, feedback: "你突然决定换一种早餐。新的味道不一定更好，但它让今天不再完全可预测。" }
        ]
      },
      {
        id: "e04",
        sceneId: "morning",
        title: "未寄出的信",
        objectLabel: "信",
        speaker: "信纸",
        prompt: "那封未寄出的信躺在桌角，封口压着一小片雨光。你会怎么处理它？",
        hotspot: { id: "letterMorning", x: 242, y: 356, w: 104, h: 80, kind: "letter", asset: "objLetter", label: "未寄出" },
        choices: [
          { text: "今天就寄出", score: { E: 2, F: 1, J: 1 }, feedback: "你把信装进包里，像把一颗心放进有地址的清晨。它终于有了去处。" },
          { text: "继续暂存", score: { I: 2, N: 1, P: 1 }, feedback: "你把信留在原处。并不是逃避，只是有些话需要再和自己相处一会儿。" },
          { text: "拆开重写", score: { T: 2, N: 1, J: 1 }, feedback: "你拆开封口，把模糊的句子重新排列。情绪还在，但它开始有了更准确的形状。" }
        ]
      },
      {
        id: "e05",
        sceneId: "office",
        title: "早会前一分钟",
        objectLabel: "会议桌",
        speaker: "会议室",
        prompt: "大家陆续坐下，投影还没完全亮起。你会怎样进入这个上午？",
        hotspot: { id: "meeting", x: 48, y: 258, w: 152, h: 98, kind: "meeting", label: "早会" },
        choices: [
          { text: "主动开场", score: { E: 2, J: 1, F: 1 }, feedback: "你先抛出一个轻快的开头。空气被打开，话题也顺势找到了入口。" },
          { text: "安静记录", score: { I: 2, S: 1, T: 1 }, feedback: "你把关键词写下来，不急着抢在前面。信息在纸上排好队，慢慢露出结构。" },
          { text: "先确认规则", score: { J: 2, T: 1, S: 1 }, feedback: "你先把边界问清楚。有人松了口气，因为接下来终于知道该往哪里走。" }
        ]
      },
      {
        id: "e06",
        sceneId: "office",
        title: "桌面上的便签",
        objectLabel: "便签",
        speaker: "便签",
        prompt: "几张便签散在桌面上，有的写着任务，有的只画了一条弯弯的线。你先处理哪一种？",
        hotspot: { id: "notes", x: 236, y: 330, w: 106, h: 96, kind: "notes", label: "便签" },
        choices: [
          { text: "整理顺序", score: { J: 2, S: 1, T: 1 }, feedback: "你把便签按轻重缓急排好。混乱不再挤在一起，桌面也像深呼吸了一次。" },
          { text: "画出灵感", score: { N: 2, P: 1, F: 1 }, feedback: "你沿着那条线继续画下去。它变成一座小山，又变成一条可以穿过去的路。" },
          { text: "询问他人状态", score: { E: 2, F: 1 }, feedback: "你抬头问了一句还好吗。有人笑了笑，上午忽然没那么像一张冷冰冰的表格。" }
        ]
      },
      {
        id: "e07",
        sceneId: "office",
        title: "旁人的求助",
        objectLabel: "同事",
        speaker: "旁人",
        prompt: "身边的人小声问你：我是不是把事情搞乱了？你会先怎么回应？",
        hotspot: { id: "helper", x: 54, y: 382, w: 112, h: 146, kind: "person", label: "旁人" },
        choices: [
          { text: "陪对方说完", score: { F: 2, E: 1, P: 1 }, feedback: "你没有急着修正，只把位置让给对方的声音。话说完时，问题已经轻了一点。" },
          { text: "给出解决步骤", score: { T: 2, J: 1, S: 1 }, feedback: "你把麻烦拆成三步。每一步都不大，但足够让人重新迈出去。" },
          { text: "先自己查证", score: { I: 2, T: 1, J: 1 }, feedback: "你先把资料核一遍。确认过的答案，比安慰更能让你安心。" }
        ]
      },
      {
        id: "e08",
        sceneId: "office",
        title: "临时任务",
        objectLabel: "新任务",
        speaker: "屏幕",
        prompt: "一条新任务弹出来，时间紧，要求也有些模糊。你会如何接住它？",
        hotspot: { id: "task", x: 114, y: 122, w: 166, h: 96, kind: "screen", label: "临时任务" },
        choices: [
          { text: "立刻推进", score: { E: 1, T: 1, J: 2 }, feedback: "你先把能动的部分推起来。方向不必完美，但停在原地一定不会抵达。" },
          { text: "拆分计划", score: { S: 1, T: 1, J: 2 }, feedback: "你把任务切成清楚的块，再给每一块标上时间。模糊被折成了可执行的纸条。" },
          { text: "保留弹性", score: { N: 1, F: 1, P: 2 }, feedback: "你留出一个可以转弯的口子。变化没有消失，但它不再像突然砸下来的雨。" }
        ]
      },
      {
        id: "e09",
        sceneId: "street",
        title: "玻璃窗倒影",
        objectLabel: "倒影",
        speaker: "街口",
        prompt: "玻璃窗里，你和雨后的街道叠在一起。下一步，你会怎么走？",
        hotspot: { id: "reflection", x: 222, y: 106, w: 104, h: 170, kind: "glass", label: "倒影" },
        choices: [
          { text: "继续赶路", score: { S: 1, T: 1, J: 2 }, feedback: "你没有被倒影留住。脚步沿着原定路线往前，雨水在路边慢慢退开。" },
          { text: "停下观察", score: { I: 1, N: 2, P: 1 }, feedback: "你停下来，看见玻璃里的自己像站在另一层天气里。那一秒很短，却足够安静。" },
          { text: "改走小巷", score: { N: 1, P: 2, E: 1 }, feedback: "你绕进旁边的小巷。新的路没有提前说明，但它给了你一点轻微的兴奋。" }
        ]
      },
      {
        id: "e10",
        sceneId: "street",
        title: "饮品小票",
        objectLabel: "小票",
        speaker: "柜台",
        prompt: "你看着小票和杯口升起的冷雾，忽然想给下午换个味道。你会选择？",
        hotspot: { id: "drink", x: 78, y: 382, w: 112, h: 102, kind: "cup", label: "小票" },
        choices: [
          { text: "固定口味", score: { S: 2, J: 1, I: 1 }, feedback: "你选择熟悉的味道。它像一个小小的锚，把下午稳稳系住。" },
          { text: "尝试新品", score: { N: 2, P: 1 }, feedback: "你点了从没试过的那杯。入口前的一点不确定，反而让你清醒起来。" },
          { text: "邀请别人一起", score: { E: 2, F: 1, P: 1 }, feedback: "你把选择发给另一个人。饮品还没做好，分享的快乐已经先到了。" }
        ]
      },
      {
        id: "e11",
        sceneId: "street",
        title: "被风翻开的地图",
        objectLabel: "地图",
        speaker: "地图",
        prompt: "一张地图被风翻开，山与海之间有好几条线。你会怎样读它？",
        hotspot: { id: "map", x: 200, y: 356, w: 128, h: 104, kind: "map", asset: "objMap", label: "山海" },
        choices: [
          { text: "规划路线", score: { J: 2, S: 1, T: 1 }, feedback: "你把路线标清楚，像替未来点亮一串小灯。远方因此变得可抵达。" },
          { text: "只定方向", score: { N: 2, P: 1 }, feedback: "你只记住大概的方向。剩下的路，让风和脚步一起商量。" },
          { text: "跟随直觉", score: { F: 1, N: 1, P: 2 }, feedback: "你选了心里先亮起来的那条线。它没有理由，却有一种温柔的牵引。" }
        ]
      },
      {
        id: "e12",
        sceneId: "street",
        title: "陌生人的问题",
        objectLabel: "陌生人",
        speaker: "路人",
        prompt: "有人在路边向你问路，声音有点急。你会先怎么做？",
        hotspot: { id: "stranger", x: 56, y: 246, w: 112, h: 170, kind: "person", label: "路人" },
        choices: [
          { text: "热情回应", score: { E: 2, F: 1 }, feedback: "你停下来，把方向讲得很清楚。对方道谢时，街口的风也变得柔和。" },
          { text: "简短帮忙", score: { S: 1, F: 1, I: 1 }, feedback: "你指了最直接的路线，没有多说。帮助不一定热闹，但足够准确。" },
          { text: "先判断真假", score: { T: 2, J: 1, S: 1 }, feedback: "你先看清周围，再给出回应。善意没有缺席，只是多了一层谨慎。" }
        ]
      },
      {
        id: "e13",
        sceneId: "stage",
        title: "灯光亮起",
        objectLabel: "灯光",
        speaker: "现场",
        prompt: "傍晚的灯光亮起，所有人都看向同一个屏幕。你会先补上哪一块？",
        hotspot: { id: "light", x: 82, y: 90, w: 230, h: 138, kind: "light", label: "灯光" },
        choices: [
          { text: "上台说明", score: { E: 2, J: 1, T: 1 }, feedback: "你站到前面，把重点说出来。人群的视线聚拢，方向也随之清楚。" },
          { text: "完善文本", score: { I: 1, S: 1, T: 1, J: 1 }, feedback: "你回到文档，把缺口一点点补齐。安静的修补，也能撑住一个现场。" },
          { text: "调整气氛", score: { E: 1, F: 2, N: 1 }, feedback: "你先让大家笑了一下。紧绷松开后，灵感才有空间重新进来。" }
        ]
      },
      {
        id: "e14",
        sceneId: "stage",
        title: "分歧出现",
        objectLabel: "圆桌",
        speaker: "讨论",
        prompt: "两个方案同时出现，房间里开始有不同的声音。你会怎么处理？",
        hotspot: { id: "split", x: 42, y: 374, w: 190, h: 98, kind: "meeting", label: "分歧" },
        choices: [
          { text: "直接拍板", score: { E: 1, T: 2, J: 1 }, feedback: "你把判断说清楚，也承担选择的重量。犹豫停止后，大家终于能继续行动。" },
          { text: "倾听协调", score: { F: 2, E: 1, P: 1 }, feedback: "你让每个人把担心说完。分歧没有立刻消失，但它开始变得可被理解。" },
          { text: "提出新方案", score: { N: 2, T: 1, P: 1 }, feedback: "你把两个方向拆开又重组。新的方案像一扇临时打开的窗。" }
        ]
      },
      {
        id: "e15",
        sceneId: "stage",
        title: "山海投影",
        objectLabel: "投影",
        speaker: "投影",
        prompt: "墙上出现山海的投影。有人问：这到底在表达什么？你会怎么回答？",
        hotspot: { id: "projection", x: 86, y: 198, w: 218, h: 114, kind: "projection", label: "山海" },
        choices: [
          { text: "解释结构", score: { T: 2, J: 1, S: 1 }, feedback: "你把层次、动线和结尾讲清楚。山海不再只是美，它也有了骨架。" },
          { text: "讲述隐喻", score: { N: 2, F: 1, I: 1 }, feedback: "你说山是留下，海是出发。有人没有立刻点头，却安静地记住了这句话。" },
          { text: "邀请大家补完", score: { E: 2, F: 1, P: 1 }, feedback: "你把问题交还给大家。投影里的山海多了很多人的脚印。" }
        ]
      },
      {
        id: "e16",
        sceneId: "stage",
        title: "逆风时刻",
        objectLabel: "风",
        speaker: "风声",
        prompt: "临近结束，一个小失误打乱了节奏。风从门缝里钻进来。你会选择？",
        hotspot: { id: "wind", x: 258, y: 352, w: 84, h: 112, kind: "wind", label: "逆风" },
        choices: [
          { text: "坚持原计划", score: { J: 2, T: 1, S: 1 }, feedback: "你稳住原来的线，不让失误继续扩散。计划像一根被重新拉紧的绳。" },
          { text: "顺势改路", score: { P: 2, N: 1, T: 1 }, feedback: "你把失误变成转场。风没有停，但你借着它换了一个方向。" },
          { text: "先稳定情绪", score: { F: 2, E: 1, J: 1 }, feedback: "你先照看每个人的表情。心稳住以后，现场才重新有了呼吸。" }
        ]
      },
      {
        id: "e17",
        sceneId: "diner",
        title: "坐到吧台前",
        objectLabel: "吧台",
        speaker: "深夜食堂",
        prompt: "深夜食堂里只剩几盏小灯。你会坐在哪里？",
        hotspot: { id: "bar", x: 54, y: 416, w: 278, h: 92, kind: "bar", label: "吧台" },
        choices: [
          { text: "熟悉的位置", score: { I: 1, S: 2, J: 1 }, feedback: "你坐到常坐的位置。身体先认出这里，心才慢慢放下包。" },
          { text: "新的位置", score: { N: 1, P: 2, E: 1 }, feedback: "你换到从没坐过的角落。夜色从另一个角度靠近你。" },
          { text: "和老板聊天", score: { E: 2, F: 1 }, feedback: "你和老板聊了两句。热汤还没端上来，灯下已经有了人的温度。" }
        ]
      },
      {
        id: "e18",
        sceneId: "diner",
        title: "一碗热汤",
        objectLabel: "热汤",
        speaker: "碗沿",
        prompt: "一碗热汤放在你面前，白气慢慢升起来。你会怎样消化今天？",
        hotspot: { id: "soup", x: 90, y: 304, w: 118, h: 88, kind: "soup", label: "热汤" },
        choices: [
          { text: "慢慢感受", score: { I: 1, F: 2, P: 1 }, feedback: "你没有急着总结，只让热意停在掌心。今天先成为感受，再成为语言。" },
          { text: "分析今天", score: { T: 2, S: 1, J: 1 }, feedback: "你在心里复盘选择、结果和原因。一天被你拆开，又重新合上。" },
          { text: "写下结论", score: { J: 2, I: 1, T: 1 }, feedback: "你写下三句给明天的话。字不多，却像给自己留了一盏灯。" }
        ]
      },
      {
        id: "e19",
        sceneId: "diner",
        title: "山海边界",
        objectLabel: "窗外",
        speaker: "夜窗",
        prompt: "窗外的雨痕像一张很小的山海图。你觉得自己更想走向哪里？",
        hotspot: { id: "border", x: 224, y: 112, w: 106, h: 174, kind: "window", label: "山海" },
        choices: [
          { text: "走向山", score: { I: 1, N: 2, J: 1 }, feedback: "你想走向山，向内、向高处、向更安静的答案。那里也许没有人催促。" },
          { text: "走向海", score: { E: 1, N: 1, P: 2 }, feedback: "你想走向海，向外、向远处、向不断变化的风。那里没有固定的边界。" },
          { text: "回头看城", score: { S: 2, F: 1, J: 1 }, feedback: "你回头看见灯火和来路。远方很好，但被你在意的人也在这里。" }
        ]
      },
      {
        id: "e20",
        sceneId: "diner",
        title: "最后一封未寄出",
        objectLabel: "信",
        speaker: "信纸",
        prompt: "夜深了，那封未寄出的信又回到你手里。今天结束前，你会怎么对它？",
        hint: "长按信纸背面，也许还有一阵夜风。",
        hotspot: { id: "letterNight", x: 238, y: 318, w: 108, h: 84, kind: "letter", asset: "objLetter", label: "未寄出" },
        choices: [
          { text: "寄出", score: { E: 2, F: 1, J: 1 }, feedback: "你把信交给夜色。它不再只属于你，也终于开始奔向一个真实的回音。" },
          { text: "封存", score: { I: 2, N: 1, P: 1 }, feedback: "你把信收好。不是所有心事都必须抵达别人，有些会在安静里继续发光。" },
          { text: "重写给明天", score: { T: 1, N: 1, J: 2 }, feedback: "你换了一张纸，把今天留下的线索写给明天。未寄出的，也可以成为新的开始。" }
        ]
      }
    ],
    secrets: [
      {
        id: "h1",
        eventId: "e02",
        title: "镜中回声",
        objectLabel: "镜子",
        prompt: "镜面泛起一圈很轻的光。里面的你低声说：你不是答案，你是正在靠近答案的人。",
        actionText: "收下这段回声",
        score: { I: 1, N: 2 },
        feedback: "那句话没有改变任何事情，却让你和自己站得近了一点。"
      },
      {
        id: "h2",
        eventId: "e20",
        title: "信纸背面",
        objectLabel: "未寄出",
        prompt: "信纸背面藏着一行浅浅的字：如果还不能抵达，就先让夜风替你保管。",
        actionText: "让它被夜风带走",
        score: { N: 1, F: 1, P: 2 },
        feedback: "夜风从指缝里穿过去。它没有替你做决定，只把明天轻轻推近了一点。"
      }
    ],
    results: {
      ISTJ: {
        name: "守灯整理者",
        description: "你擅长把混乱的日子收成清楚的顺序。别人看见的是稳，你自己知道那是认真对待生活的方式。",
        work: "适合明确目标、稳定节奏、可追踪结果的学习与工作方式。清单、复盘和固定时段会让你发挥得更好。",
        summary: "今天的你多次选择确认事实、整理路径和守住计划。你像一盏不喧哗的灯，照住了每一步。"
      },
      ISFJ: {
        name: "温汤守夜人",
        description: "你很会照看细节，也很会记住别人的需要。你的温柔不是泛泛而谈，而是落在具体行动里。",
        work: "适合稳定协作、清晰职责和有实际反馈的环境。把照顾他人与照顾自己同时写进计划，会更长久。",
        summary: "今天的你在熟悉的位置、真实的感受和他人的需要之间来回确认。你把夜晚照顾得很温热。"
      },
      INFJ: {
        name: "山雾引路人",
        description: "你常在细微处看见更远的意义。你不急着解释一切，却能在关键时刻指出一条温柔的方向。",
        work: "适合有长期意义、允许深度思考并能帮助他人的任务。独处构思后再表达，会让你的判断更有力量。",
        summary: "今天的你听见镜中回声，也在山海之间寻找隐喻。你走得安静，却一直知道心要往哪里靠近。"
      },
      INTJ: {
        name: "星图策划者",
        description: "你习惯从高处看见结构，再把复杂目标拆成路线。你对未来的想象很远，对落地的要求也很清楚。",
        work: "适合独立规划、系统设计和长期项目。先建立框架，再选择关键节点，会让你效率稳定。",
        summary: "今天的你不断把模糊变成结构，把山海折成地图。你的远方不是梦话，而是一张正在成形的星图。"
      },
      ISTP: {
        name: "安静修理师",
        description: "你喜欢直接接触问题本身。比起热闹表达，你更信任观察、判断和动手修正。",
        work: "适合技术拆解、即时判断和独立解决问题。给你足够空间和真实任务，你会越做越准。",
        summary: "今天的你常先观察、查证、判断，再用最短路径解决问题。你像随身带着一套安静工具。"
      },
      ISFP: {
        name: "风中采样员",
        description: "你对气氛、感受和当下的细节很敏锐。你不一定大声表达，但你会用选择保存心里的颜色。",
        work: "适合自由度较高、重视体验和审美判断的学习与工作。用作品或记录表达，会比硬性汇报更自然。",
        summary: "今天的你让雨声、热汤和夜色先抵达自己。你采下许多细小感受，把它们放进心里发光。"
      },
      INFP: {
        name: "未寄信诗人",
        description: "你珍惜内心的真实，也相信没有说出口的东西依然重要。你在选择里寻找意义，而不只是答案。",
        work: "适合有价值感、允许想象和个人表达的任务。把灵感转成小步骤，会让温柔的理想更容易抵达。",
        summary: "今天的你一次次靠近那封未寄出的信。你没有急着完成它，却让它替你说出了很深的部分。"
      },
      INTP: {
        name: "树洞推演者",
        description: "你喜欢把问题拆到更深处，直到看见其中的逻辑与可能性。安静不是空白，而是你的推演正在进行。",
        work: "适合研究、建模、分析和探索型任务。保留自由思考时间，再设置交付边界，会让你更稳。",
        summary: "今天的你常在旁边观察，再把线索放进脑中重组。你没有急着回答世界，而是在推演更好的问题。"
      },
      ESTP: {
        name: "街角行动派",
        description: "你反应快，敢试，也愿意把想法放到现实里碰一碰。变化不会吓退你，反而会让你更清醒。",
        work: "适合现场推进、短周期挑战和需要即时反馈的任务。先动起来，再边走边校准，是你的优势。",
        summary: "今天的你在街口、任务和逆风里不断行动。你不等一切完美，路是在脚下被你踩出来的。"
      },
      ESFP: {
        name: "深夜发光体",
        description: "你擅长把气氛变亮，也愿意让情绪真实流动。你的存在感不是压力，而是一种能让人松开的温度。",
        work: "适合表达、协作、体验设计和需要感染力的场景。保留弹性，同时设置轻量收尾，会更完整。",
        summary: "今天的你把消息、聊天、热汤和灯光都变得有人味。你走过的地方，夜色会亮一点。"
      },
      ENFP: {
        name: "山海漫游者",
        description: "你总能在日常里发现新的入口。你关心人，也关心可能性，像一阵会带来方向的风。",
        work: "适合创意发散、原型探索和跨人群协作。先允许灵感打开，再用小节点收束，会让你走得更远。",
        summary: "今天的你不断选择新的路、新的味道和新的回应。山海很大，而你愿意先出发。"
      },
      ENTP: {
        name: "逆风试验家",
        description: "你喜欢把限制拆开看看，也擅长在变化里找到新方案。对你来说，逆风常常是实验开始的地方。",
        work: "适合策略碰撞、创新方案和快速试错。给想法设置验证标准，会让你的锋利更有成果。",
        summary: "今天的你把分歧、失误和模糊都当成材料。风越不规整，你越能试出新的路。"
      },
      ESTJ: {
        name: "秩序推进者",
        description: "你习惯承担推进责任，也擅长把目标落到可执行的步骤。你给团队带来的，是可以前进的确定感。",
        work: "适合管理、统筹、流程优化和结果导向的任务。明确边界和节点，会让你的判断更有说服力。",
        summary: "今天的你多次选择开场、确认规则和推进计划。你不是只想掌控，而是在替事情找到出口。"
      },
      ESFJ: {
        name: "暖桌召集人",
        description: "你很在意关系里的温度，也愿意主动把人聚到一起。你让协作不只是完成任务，也像一张有人坐下的桌子。",
        work: "适合团队协作、服务沟通和需要共识的场景。把自己的需要也放进照顾清单，会让你更松弛。",
        summary: "今天的你回应消息、照顾情绪，也愿意主动连接他人。你让一天从冷雨里长出了暖意。"
      },
      ENFJ: {
        name: "灯下引路人",
        description: "你擅长读懂人群的状态，并把大家带向更有意义的方向。你的表达里有光，也有照顾。",
        work: "适合组织、表达、教育、策划和需要共同愿景的任务。先确认内心立场，再带动他人，会更稳。",
        summary: "今天的你在灯光下协调、说明、安抚，也把山海讲给别人听。你不是站在中央，而是在让方向变亮。"
      },
      ENTJ: {
        name: "山海策划王",
        description: "你看重目标、判断和推进，也愿意为选择承担责任。远方对你来说不是幻想，而是等待执行的版图。",
        work: "适合战略规划、项目推进和高强度决策。给团队保留反馈通道，会让你的执行力更有韧性。",
        summary: "今天的你把山海、任务和现场都纳入路线。你看见远处，也知道下一步该怎么落下。"
      }
    }
  };
})();
