(function () {
  "use strict";

  window.GAME_DATA = {
    title: "未寄出的山海",
    subtitle: "去年谷雨，你为《山海》互动人格海报写下第一版草稿，也给一年后的自己写了一封信。那封信一直没寄出。今天又是谷雨，也是《山海》展示的日子。清晨你翻出旧信和草稿，带着它们走过一天：上午定方向，午后找素材，傍晚完成展示，深夜回看自己。20 个选择既是在补完作品，也是在生成最后的人格结果。",
    concept: "信里写着：如果还不明白自己，就把普通的一天认真过完。",
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
      bgMorning: "./images/bg_morning.webp",
      bgOffice: "./images/bg_office.webp",
      bgStreet: "./images/bg_street.webp",
      bgStage: "./images/bg_stage.webp",
      bgDiner: "./images/bg_diner.webp",
      objMirror: "./images/obj_mirror.svg",
      objLetter: "./images/obj_letter.svg",
      objMap: "./images/obj_map.svg",
      badgeResult: "./images/badge_result.svg",
      ISTJ: "./images/ISTJ.png",
      ISFJ: "./images/ISFJ.png",
      INFJ: "./images/INFJ.png",
      INTJ: "./images/INTJ.png",
      ISTP: "./images/ISTP.png",
      ISFP: "./images/ISFP.png",
      INFP: "./images/INFP.png",
      INTP: "./images/INTP.png",
      ESTP: "./images/ESTP.png",
      ESFP: "./images/ESFP.png",
      ENFP: "./images/ENFP.png",
      ENTP: "./images/ENTP.png",
      ESTJ: "./images/ESTJ.png",
      ESFJ: "./images/ESFJ.png",
      ENFJ: "./images/ENFJ.png",
      ENTJ: "./images/ENTJ.png"
    },
    scenes: [
      {
        id: "morning",
        title: "第一幕",
        name: "谷雨清晨",
        time: "07:18",
        asset: "bgMorning",
        color: "#4f9f8f",
        intro: "雨落在窗外。你从抽屉里翻出去年写给自己的信，信里夹着《山海》的旧草稿。今天傍晚，它就要被展示。"
      },
      {
        id: "office",
        title: "第二幕",
        name: "上午办公室",
        time: "10:03",
        asset: "bgOffice",
        color: "#427fc3",
        intro: "你带着信来到办公室。上午的会要定下《山海》的方向，屏幕还没亮，桌上的便签已经堆成小小的潮水。"
      },
      {
        id: "street",
        title: "第三幕",
        name: "午后街口",
        time: "14:27",
        asset: "bgStreet",
        color: "#d26262",
        intro: "会开完，你离开办公室去找最后的素材。雨停了一半，街口的倒影、地图和路人，都像在替《山海》补空白。"
      },
      {
        id: "stage",
        title: "第四幕",
        name: "傍晚创作现场",
        time: "18:40",
        asset: "bgStage",
        color: "#6b8f4f",
        intro: "素材带回来了，灯也亮了。《山海》被投到墙上。展示前的每一次分歧，都在逼你说清自己相信什么。"
      },
      {
        id: "diner",
        title: "第五幕",
        name: "深夜食堂",
        time: "23:12",
        asset: "bgDiner",
        color: "#2f8b86",
        intro: "展示结束后，你没有立刻回家。旧信和海报草稿摊在灯下，热汤升起白气，一整天的选择终于落回你手里。"
      }
    ],
    events: [
      {
        id: "e01",
        sceneId: "morning",
        title: "窗边醒来",
        objectLabel: "雨窗",
        speaker: "清晨",
        prompt: "手机亮了一下，窗外正下着谷雨。抽屉半开着，露出那封去年没寄出的信。醒来后，你会先做什么？",
        hotspot: { id: "window", x: 60, y: 54, w: 150, h: 170, kind: "window", label: "雨窗" },
        choices: [
          { text: "先回复消息", score: { E: 2, F: 1, J: 1 }, feedback: "你先把外面的世界接进来。一句早安发出去，房间像被轻轻点亮。" },
          { text: "先静静听雨声", score: { I: 2, N: 1, P: 1 }, feedback: "你没有急着碰那封信，只听雨落在窗上。时间慢下来，心里的话也慢慢浮上来。" },
          { text: "先规划今天的事", score: { J: 2, S: 1, T: 1 }, feedback: "你把今天要做的事排成几段。旧信还没拆开，但你的脚步已经有了顺序。" }
        ]
      },
      {
        id: "e02",
        sceneId: "morning",
        title: "镜子前的停顿",
        objectLabel: "镜子",
        requires: ["e01"],
        speaker: "镜子",
        prompt: "信里第一句写着：“如果还不明白自己，就先照一照。”镜子里的你比平时安静。你会怎样形容此刻的自己？",
        hint: "长按镜子，也许能听见心底的声音。",
        hotspot: { id: "mirror", x: 270, y: 96, w: 90, h: 116, kind: "mirror", asset: "objMirror", label: "镜子" },
        choices: [
          { text: "用事实描述自己", score: { S: 2, T: 1 }, feedback: "你确认睡眠、天气、时间和要带的东西。清晰的现实，让你找回踏实的状态。" },
          { text: "用感受描述自己", score: { N: 2, F: 1, I: 1 }, feedback: "你说自己像一封折到一半的信。镜子没有说话，只是把这份心情悄悄收下。" },
          { text: "用目标描述自己", score: { J: 2, T: 1, E: 1 }, feedback: "你把今天想完成的事说给镜子听。声音落下，像给自己按下了启动键。" }
        ]
      },
      {
        id: "e03",
        sceneId: "morning",
        title: "桌上的早餐",
        objectLabel: "早餐",
        requires: ["e01"],
        speaker: "桌面",
        prompt: "早餐旁边摊着《山海》旧草稿。山那边写着“稳定”，海那边写着“出发”。出门前，你会怎样对待这个早晨？",
        hotspot: { id: "breakfast", x: 10, y: 282, w: 150, h: 104, kind: "table", label: "早餐" },
        choices: [
          { text: "先照顾自己的心情", score: { I: 2, F: 1, P: 1 }, feedback: "你放慢节奏，先问问自己想怎么做。被温柔对待的心情，一点点回暖。" },
          { text: "按习惯有条不紊", score: { S: 2, J: 1 }, feedback: "你按熟悉的步骤摆好杯子、面包和钥匙。稳定的小事，支撑起你一整天的安心。" },
          { text: "临时改变安排", score: { P: 2, N: 1 }, feedback: "你突然想换一种早餐。新的味道不一定更好，但让今天多了一点惊喜。" }
        ]
      },
      {
        id: "e04",
        sceneId: "morning",
        title: "未寄出的信",
        objectLabel: "信",
        requires: ["e02", "e03"],
        speaker: "信纸",
        prompt: "你终于拆开信。里面写着：“如果还不明白自己，就把普通的一天认真过完。”你会怎么带走它？",
        hotspot: { id: "letterMorning", x: 236, y: 338, w: 112, h: 62, kind: "letter", asset: "objLetter", label: "未寄出" },
        choices: [
          { text: "今天就寄出", score: { E: 2, F: 1, J: 1 }, feedback: "你把信放进包里。它去年没有出发，今天至少可以陪你走完这段路。" },
          { text: "先暂时放着", score: { I: 2, N: 1, P: 1 }, feedback: "你把信留在原地。不是逃避，只是有些话，需要再和自己待一会儿。" },
          { text: "拆开重新写", score: { T: 2, N: 1, J: 1 }, feedback: "你拆开信封，把模糊的句子重新整理。心意还在，但表达变得更准确了。" }
        ]
      },
      {
        id: "e05",
        sceneId: "office",
        title: "早会前一分钟",
        objectLabel: "会议桌",
        speaker: "会议室",
        prompt: "办公室里，大家等着讨论《山海》的展示版本。投影还没完全亮起，你会以怎样的状态开始这个上午？",
        hotspot: { id: "meeting", x: 34, y: 224, w: 156, h: 106, kind: "meeting", label: "早会" },
        choices: [
          { text: "主动带动气氛", score: { E: 2, J: 1, F: 1 }, feedback: "你先抛出一个轻松的开头。氛围打开了，话题也自然地展开。" },
          { text: "安静记录要点", score: { I: 2, S: 1, T: 1 }, feedback: "你默默记下关键词，不急于发言。信息在纸上排列清晰，慢慢显出条理。" },
          { text: "先确认规则流程", score: { J: 2, T: 1, S: 1 }, feedback: "你先问清边界与要求。有人松了口气，因为接下来终于知道该往哪走。" }
        ]
      },
      {
        id: "e06",
        sceneId: "office",
        title: "桌面上的便签",
        objectLabel: "便签",
        requires: ["e05"],
        speaker: "便签",
        prompt: "便签上混着任务、灵感和别人留下的小问题。它们都要进今天的版本里，你会先处理哪一类？",
        hotspot: { id: "notes", x: 292, y: 96, w: 86, h: 96, kind: "notes", label: "便签" },
        choices: [
          { text: "整理优先级", score: { J: 2, S: 1, T: 1 }, feedback: "你把便签按轻重缓急排好。混乱不再拥挤，桌面像做了一次深呼吸。" },
          { text: "顺着灵感画画", score: { N: 2, P: 1, F: 1 }, feedback: "你沿着那条线继续画。它变成一座小山，又变成一条可以走过去的路。" },
          { text: "关心同事状态", score: { E: 2, F: 1 }, feedback: "你抬头问一句“还好吗”。有人笑了笑，上午忽然不再像冰冷的表格。" }
        ]
      },
      {
        id: "e07",
        sceneId: "office",
        title: "旁人的求助",
        objectLabel: "同事",
        requires: ["e05"],
        speaker: "旁人",
        prompt: "负责素材的同事小声问：“我是不是把这一块弄乱了？”你会先怎么回应？",
        hotspot: { id: "helper", x: 4, y: 292, w: 112, h: 156, kind: "person", label: "旁人" },
        choices: [
          { text: "耐心听他说完", score: { F: 2, E: 1, P: 1 }, feedback: "你没有急着纠正，只是把说话的机会留给对方。话说完，问题已经轻了一半。" },
          { text: "给出解决步骤", score: { T: 2, J: 1, S: 1 }, feedback: "你把麻烦拆成三步。每一步都不大，但足够让人重新往前走。" },
          { text: "先自己核实情况", score: { I: 2, T: 1, J: 1 }, feedback: "你先把资料核对一遍。确定的答案，比安慰更让你安心。" }
        ]
      },
      {
        id: "e08",
        sceneId: "office",
        title: "临时任务",
        objectLabel: "新任务",
        requires: ["e06", "e07"],
        speaker: "屏幕",
        prompt: "临近中午，屏幕弹出新要求：展示前还要补一组街头素材。时间紧，说明也有些模糊。你会怎么应对？",
        hotspot: { id: "task", x: 106, y: 70, w: 184, h: 126, kind: "screen", label: "临时任务" },
        choices: [
          { text: "立刻推进执行", score: { E: 1, T: 1, J: 2 }, feedback: "你先把能做的部分动起来。方向不必完美，但停着永远到不了。" },
          { text: "拆分详细计划", score: { S: 1, T: 1, J: 2 }, feedback: "你把任务切成清晰的模块，标上时间。模糊被整理成可执行的步骤。" },
          { text: "保留灵活空间", score: { N: 1, F: 1, P: 2 }, feedback: "你留出可以调整的余地。变化还在，但不再像突然落下的雨。" }
        ]
      },
      {
        id: "e09",
        sceneId: "street",
        title: "玻璃窗倒影",
        objectLabel: "倒影",
        speaker: "街口",
        prompt: "会开完，你离开办公室。玻璃橱窗里，你和雨后街道叠在一起，像《山海》里还没画完的一页。下一步，你会怎么走？",
        hotspot: { id: "reflection", x: 226, y: 72, w: 150, h: 228, kind: "glass", label: "倒影" },
        choices: [
          { text: "继续按计划赶路", score: { S: 1, T: 1, J: 2 }, feedback: "你没有被影子停留。脚步沿着原定方向前进，路边的雨水渐渐退去。" },
          { text: "停下静静观察", score: { I: 1, N: 2, P: 1 }, feedback: "你停下来，看见玻璃里的自己像站在另一片时光里。这一秒很短，却格外安静。" },
          { text: "改走小路试试", score: { N: 1, P: 2, E: 1 }, feedback: "你拐进旁边的小巷。新路没有预告，却带给你一丝小小的兴奋。" }
        ]
      },
      {
        id: "e10",
        sceneId: "street",
        title: "饮品小票",
        objectLabel: "小票",
        requires: ["e09"],
        speaker: "柜台",
        prompt: "你买了饮品，柜台递来小票。下午还长，你想给自己和海报都换一点味道。你会选？",
        hotspot: { id: "drink", x: 16, y: 388, w: 88, h: 116, kind: "cup", label: "小票" },
        choices: [
          { text: "点固定老口味", score: { S: 2, J: 1, I: 1 }, feedback: "你选熟悉的味道。它像一个小锚，稳稳拴住你的下午。" },
          { text: "尝试新品", score: { N: 2, P: 1 }, feedback: "你点了从没喝过的那一杯。入口前的一点不确定，反而让你更清醒。" },
          { text: "邀请别人一起", score: { E: 2, F: 1, P: 1 }, feedback: "你把选择分享给别人。饮品还没好，分享的快乐已经先到。" }
        ]
      },
      {
        id: "e11",
        sceneId: "street",
        title: "被风翻开的地图",
        objectLabel: "地图",
        requires: ["e09"],
        speaker: "地图",
        prompt: "一张城市地图被风吹开，山与海之间画着好几条路线。你准备把哪种路放进《山海》？",
        hotspot: { id: "map", x: 204, y: 424, w: 166, h: 110, kind: "map", asset: "objMap", label: "山海" },
        choices: [
          { text: "仔细规划路线", score: { J: 2, S: 1, T: 1 }, feedback: "你把路线标得清清楚楚，像给未来点亮一串灯。远方从此变得可以到达。" },
          { text: "只确定大方向", score: { N: 2, P: 1 }, feedback: "你只记住大概方向。剩下的路，交给风和脚步一起决定。" },
          { text: "跟着直觉走", score: { F: 1, N: 1, P: 2 }, feedback: "你选心里最先亮起来的那条路。它没有理由，却有温柔的牵引力。" }
        ]
      },
      {
        id: "e12",
        sceneId: "street",
        title: "陌生人的问题",
        objectLabel: "陌生人",
        requires: ["e09"],
        speaker: "路人",
        prompt: "路边有人向你问路，语气有些着急。你手里还攥着信和小票，会先怎么做？",
        hotspot: { id: "stranger", x: 22, y: 174, w: 84, h: 132, kind: "person", label: "路人" },
        choices: [
          { text: "热情耐心回应", score: { E: 2, F: 1 }, feedback: "你停下来，把方向讲得很明白。对方道谢时，街口的风也变得温柔。" },
          { text: "简单指明路线", score: { S: 1, F: 1, I: 1 }, feedback: "你指出最直接的路，不多废话。帮助不必热闹，但足够准确。" },
          { text: "先判断再帮忙", score: { T: 2, J: 1, S: 1 }, feedback: "你先观察周围，再给出回答。善意没有缺席，只是多了一份谨慎。" }
        ]
      },
      {
        id: "e13",
        sceneId: "stage",
        title: "灯光亮起",
        objectLabel: "灯光",
        speaker: "现场",
        prompt: "你带着素材回到现场。傍晚灯光亮起，《山海》被投到屏幕上。你会先补上哪一环？",
        hotspot: { id: "light", x: 92, y: 18, w: 206, h: 74, kind: "light", label: "灯光" },
        choices: [
          { text: "上台讲解说明", score: { E: 2, J: 1, T: 1 }, feedback: "你站到前面，把重点讲清楚。大家的目光聚拢，方向也随之明确。" },
          { text: "完善文字内容", score: { I: 1, S: 1, T: 1, J: 1 }, feedback: "你回到文档，一点点补齐缺口。安静的修补，也能撑起整个现场。" },
          { text: "调节现场气氛", score: { E: 1, F: 2, N: 1 }, feedback: "你先让大家轻松一笑。紧绷松开后，灵感才有空间回来。" }
        ]
      },
      {
        id: "e14",
        sceneId: "stage",
        title: "分歧出现",
        objectLabel: "圆桌",
        requires: ["e13"],
        speaker: "讨论",
        prompt: "关于海报结尾，两个方案同时出现。有人想更理性，有人想更柔软，你会怎么处理？",
        hotspot: { id: "split", x: 30, y: 388, w: 154, h: 108, kind: "meeting", label: "分歧" },
        choices: [
          { text: "直接做出决定", score: { E: 1, T: 2, J: 1 }, feedback: "你清晰给出判断，也承担选择的责任。犹豫停止，大家终于能继续推进。" },
          { text: "倾听协调各方", score: { F: 2, E: 1, P: 1 }, feedback: "你让每个人把顾虑说完。分歧没有立刻消失，但开始被理解。" },
          { text: "提出新的方案", score: { N: 2, T: 1, P: 1 }, feedback: "你把两个方向拆开重组。新方案像一扇临时打开的窗。" }
        ]
      },
      {
        id: "e15",
        sceneId: "stage",
        title: "山海投影",
        objectLabel: "投影",
        requires: ["e14"],
        speaker: "投影",
        prompt: "墙上投射出山与海。有人问：“这张海报到底想说什么？”你会怎么回答？",
        hotspot: { id: "projection", x: 32, y: 100, w: 328, h: 230, kind: "projection", label: "山海" },
        choices: [
          { text: "解释结构逻辑", score: { T: 2, J: 1, S: 1 }, feedback: "你把层次、流程和结尾讲清楚。山海不再只是好看，也有了清晰骨架。" },
          { text: "讲述它的寓意", score: { N: 2, F: 1, I: 1 }, feedback: "你说山是留下来，海是走出去。有人没有立刻点头，却默默记住了这句话。" },
          { text: "邀请大家补充", score: { E: 2, F: 1, P: 1 }, feedback: "你把问题交给大家。投影里的山海，多了很多人的故事。" }
        ]
      },
      {
        id: "e16",
        sceneId: "stage",
        title: "逆风时刻",
        objectLabel: "风",
        requires: ["e15"],
        speaker: "风声",
        prompt: "快要展示时，设备和节奏同时出了小问题。风从门缝吹进来，你会选择？",
        hotspot: { id: "wind", x: 304, y: 330, w: 66, h: 116, kind: "wind", label: "逆风" },
        choices: [
          { text: "坚持原定计划", score: { J: 2, T: 1, S: 1 }, feedback: "你稳住原有节奏，不让失误扩散。计划像一根被重新拉紧的绳子。" },
          { text: "顺势调整方向", score: { P: 2, N: 1, T: 1 }, feedback: "你把失误变成转折。风没有停，但你借着它换了一条路。" },
          { text: "先稳定大家情绪", score: { F: 2, E: 1, J: 1 }, feedback: "你先照顾每个人的心情。心稳住了，现场才重新找回呼吸。" }
        ]
      },
      {
        id: "e17",
        sceneId: "diner",
        title: "坐到吧台前",
        objectLabel: "吧台",
        speaker: "深夜食堂",
        prompt: "展示结束后，你没有立刻回家。深夜食堂只剩几盏小灯，你把旧信放在吧台上，会坐在哪里？",
        hotspot: { id: "bar", x: 0, y: 276, w: 390, h: 174, kind: "bar", label: "吧台" },
        choices: [
          { text: "坐熟悉的位置", score: { I: 1, S: 2, J: 1 }, feedback: "你坐到常坐的地方。身体先认出这里，心才慢慢卸下疲惫。" },
          { text: "坐没坐过的位置", score: { N: 1, P: 2, E: 1 }, feedback: "你换到新角落。夜色从另一个角度，轻轻靠近你。" },
          { text: "和老板聊聊天", score: { E: 2, F: 1 }, feedback: "你和老板简单聊了几句。热汤还没上，灯下已经有了人的温度。" }
        ]
      },
      {
        id: "e18",
        sceneId: "diner",
        title: "一碗热汤",
        objectLabel: "热汤",
        requires: ["e17"],
        speaker: "碗沿",
        prompt: "一碗热汤放在面前，白气缓缓升起。你想起白天那些选择，会怎么梳理它们？",
        hotspot: { id: "soup", x: 52, y: 286, w: 150, h: 106, kind: "soup", label: "热汤" },
        choices: [
          { text: "慢慢感受就好", score: { I: 1, F: 2, P: 1 }, feedback: "你不急着总结，只让暖意停在手心。今天先成为感受，再变成文字。" },
          { text: "理性复盘今天", score: { T: 2, S: 1, J: 1 }, feedback: "你在心里回顾选择、结果与原因。一天被你拆开，又好好合上。" },
          { text: "写下明日提醒", score: { J: 2, I: 1, T: 1 }, feedback: "你写下三句给明天的话。字不多，却像给自己留了一盏灯。" }
        ]
      },
      {
        id: "e19",
        sceneId: "diner",
        title: "山海边界",
        objectLabel: "窗外",
        requires: ["e18"],
        speaker: "夜窗",
        prompt: "窗外的雨痕像一张小小的山海图。海报已经完成，你更想把今天的自己画向哪里？",
        hotspot: { id: "border", x: 190, y: 54, w: 188, h: 198, kind: "window", label: "山海" },
        choices: [
          { text: "走向山", score: { I: 1, N: 2, J: 1 }, feedback: "你想走向山，向内、向高处、向更安静的答案。那里没有人催促。" },
          { text: "走向海", score: { E: 1, N: 1, P: 2 }, feedback: "你想走向海，向外、向远方、向不断变化的风。那里没有固定边界。" },
          { text: "回头看城市", score: { S: 2, F: 1, J: 1 }, feedback: "你回头望向灯火与来路。远方很美，但你在意的人都在这里。" }
        ]
      },
      {
        id: "e20",
        sceneId: "diner",
        title: "最后一封未寄出",
        objectLabel: "信",
        requires: ["e18"],
        speaker: "信纸",
        prompt: "夜深了，那封去年写给自己的信又回到你手中。今天结束前，你会怎么对待它？",
        hint: "长按信纸背面，也许会吹来一阵夜风。",
        hotspot: { id: "letterNight", x: 212, y: 324, w: 156, h: 72, kind: "letter", asset: "objLetter", label: "未寄出" },
        choices: [
          { text: "寄出", score: { E: 2, F: 1, J: 1 }, feedback: "你把信交给夜色。它不再只属于去年，也终于奔向一个真实的明天。" },
          { text: "好好封存", score: { I: 2, N: 1, P: 1 }, feedback: "你把信小心收好。不是所有心事都要立刻交出去，有些会在安静里继续发光。" },
          { text: "重写给明天", score: { T: 1, N: 1, J: 2 }, feedback: "你换一张纸，把今天的感悟写给明天。未寄出的心意，也可以成为新的开始。" }
        ]
      }
    ],
    secrets: [
      {
        id: "h1",
        eventId: "e02",
        title: "镜中回声",
        objectLabel: "镜子",
        prompt: "镜面泛起微光，里面的你轻声说：你不是答案，你是正在靠近答案的人。",
        actionText: "收下这段回声",
        score: { I: 1, N: 2 },
        feedback: "这句话没有改变任何事，却让你和自己靠得更近了一点。"
      },
      {
        id: "h2",
        eventId: "e20",
        title: "信纸背面",
        objectLabel: "未寄出",
        prompt: "信纸背面藏着一行浅字：如果还不知道寄给谁，就先寄给明天。",
        actionText: "让它被夜风带走",
        score: { N: 1, F: 1, P: 2 },
        feedback: "夜风从指缝穿过。它没有替你做决定，只是轻轻把明天推近了一点。"
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
