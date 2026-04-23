/* 寻境大庆 · 档案解谜 - Game Logic */
const $=id=>document.getElementById(id);
const AK=atob('c2stODNkMGM1ZWEyODFhNDcwNzhlZDU1ZWIwYWE0NjcxNWY=');
const AB='https://api.deepseek.com';

// ========== HISTORY IMAGES ==========
const HI={
  img_wilderness:"images/scene_wilderness.jpg",img_drill:"images/pic_drill.jpg",
  img_core:"images/pic_core.jpg",img_telegram:"images/pic_telegram.jpg",
  img_camp:"images/scene_camp.jpg",img_gandalai:"images/pic_gandalai.jpg",
  img_carry:"images/pic_carry.jpg",img_battle:"images/pic_battle.jpg",
  img_ironman:"images/scene_ironman.jpg",img_blowout:"images/pic_blowout.jpg",
  img_mud:"images/pic_mud.jpg",img_honor:"images/pic_honor.jpg",
  img_modern:"images/scene_modern.jpg",img_museum:"images/pic_museum.jpg",
  img_century:"images/pic_century.jpg",img_green:"images/pic_green.jpg"
};

// ========== GAME DATA ==========
const DATA={
  chapters:[
    {id:0,title:"序章：异常档案",subtitle:"时空的裂缝",date:"2026年 · 铁人纪念馆",
     bg:HI.img_wilderness,
     rule:"【规则0】如果你正在阅读这本手册，说明你已经进入了1959年的异常时空。不要试图离开，直到你解开所有规则背后的真相。记住：规则是保护，也是考验。",
     ruleCracked:false,
     story:"2026年，你在铁人纪念馆的角落里，发现了一本被锁在玻璃柜中的泛黄档案手册。手册封面上印着红色的'绝密'二字，旁边还有一行小字：'只有真正理解历史的人，才能解开其中的密码。'你好奇地翻开第一页，突然一阵眩晕...",
     hotspots:[
       {id:"h0_1",x:50,y:40,icon:"📖",title:"档案手册",type:"info",
        content:"这是一本泛黄的档案手册，封面上印着'大庆油田异常事件记录·绝密'。翻开第一页，上面写着：'1959年9月，松嫩平原发生了改变中国命运的异常事件...'",img:HI.img_telegram},
       {id:"h0_2",x:30,y:60,icon:"🗺️",title:"地图残片",type:"clue",cardId:"c_map",
        content:"一张手绘地图，标注着'松基三井'的位置。旁边有一行小字：'北纬46度，荒原之下，黑色黄金沉睡。'地图背面还有一段被涂黑的文字，只能看清几个字：'...困境...进口...卡脖子...'",
        card:{name:"松基三井位置图",cat:"地理环境",rarity:"common",desc:"松辽盆地第三口基准井的位置，1959年9月26日，这里喷出了工业油流。"},img:HI.img_drill},
       {id:"h0_3",x:70,y:50,icon:"👤",title:"神秘人影",type:"npc",npcId:"guide",
        content:"一个模糊的人影站在远处，似乎在等你...他的身影在光影中若隐若现。"},
       {id:"h0_4",x:45,y:75,icon:"🔐",title:"密码锁",type:"info",
        content:"档案手册最后一页有一个密码锁，上面刻着：'1959年，中国的石油年产量仅____万吨，绝大部分依赖进口。'你需要输入正确的数字才能解锁。",img:HI.img_telegram}
     ],
     npcs:{guide:{name:"档案守护者",role:"时空引导者",aiEnabled:true,
       avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
       dialogs:[
         {text:"你终于来了。这本档案手册已经等了六十七年。",next:1},
         {text:"1959年的大庆荒原，不是普通的荒原。那里藏着改变中国命运的秘密。",next:2},
         {text:"但在你进入那段时空之前，我需要确认——你真正理解当时中国面临的困境吗？",next:3},
         {text:"看看档案手册最后一页的密码锁。答案就在你收集的线索中。",
          choices:[{text:"我已经找到答案了",next:4},{text:"请给我更多提示",next:5}]},
         {text:"很好。记住，这段旅程不只是了解历史，更是理解一种精神。准备好进入1959年了吗？",
          choices:[{text:"准备好了",action:"nextChapter"},{text:"再等等",action:"close"}]},
         {text:"提示：1959年，中国年产原油仅10余万吨，石油基本上靠从外国进口，被人家'卡脖子'。这个数字，就是密码。",action:"close"}
       ]}},
     quiz:{question:"在进入1959年之前，你必须确认：当时的中国面临什么困境？（密码锁上的数字是多少？）",
       options:["A. 年产原油仅10余万吨，石油大部分靠进口，被外国卡脖子","B. 年产原油100万吨，基本自给自足","C. 年产原油500万吨，但质量不佳","D. 年产原油1000万吨，但运输困难"],
       correct:0,explanation:"正确！当时中国年产原油仅10余万吨，石油基本上靠从外国进口，严重制约国家发展。这是进入1959年时空的密码。"},
     crackCondition:{cards:["c_map"],quiz:true},
     crackResult:{title:"规则0破解：时空的召唤",text:"1959年，新中国急需石油。西方国家断言中国是'贫油国'，石油进口被卡脖子。在这种背景下，地质勘探队伍来到松嫩平原，开始了改变命运的钻探。这本档案手册，正是那段历史的见证。<br><br>随着密码锁的解开，你被卷入了一道金色的光芒中..."}},
    {id:1,title:"第一章：荒原规则",subtitle:"黑色黄金的发现",date:"1959年9月25日 · 松嫩平原",
     bg:HI.img_wilderness,
     rule:"【规则1】如果你在荒原上看到一个高达40米的钢铁架子，那是正常的。不要试图计算它的重量。\n【规则2】如果你在地下1400米深处发现黑色砂岩，请保持冷静。这是'希望'的颜色。\n【规则3】如果你听到欢呼声从钻井方向传来，请立即前往。你将见证历史。",
     ruleCracked:false,
     story:"你穿越到了1959年9月25日的大庆荒原。远处矗立着高耸的钻井井架，工人们正在紧张作业。突然，你听到帐篷里传来一阵争论声——'还要不要继续往下打？已经打到1400米了，再往下风险很大！'",
     hotspots:[
       {id:"h1_1",x:45,y:35,icon:"🗼",title:"钢铁架子",type:"clue",cardId:"c_drill",
        content:"一座高耸的钻井井架矗立在荒原上。标牌写着：'松基三井，设计井深3200米'。工人们正在紧张地作业。一位工程师说：'已经打到1400米了，如果再往下打还是不出油，整个项目可能要下马...'",
        card:{name:"松基三井井架",cat:"技术知识",rarity:"common",desc:"松基三井的钻井井架高达40米，1959年4月正式开钻，工人们日夜不停地工作。"},img:HI.img_drill},
       {id:"h1_2",x:25,y:55,icon:"🪨",title:"岩心样本",type:"clue",cardId:"c_core",
        content:"地质队员正在检查一段岩心样本。黑色的砂岩散发着特殊的气味——那是石油的味道！'有油砂！'一位年轻的地质队员激动地喊道，'这说明下面可能有石油！'",
        card:{name:"含油岩心",cat:"技术知识",rarity:"rare",desc:"从地下1400米处取出的岩心样本，黑色砂岩显示有油砂，这是发现石油的重要标志。"},img:HI.img_core},
       {id:"h1_3",x:65,y:45,icon:"⛺",title:"地质帐篷",type:"npc",npcId:"geologist",
        content:"一顶帆布帐篷，里面传来热烈的争论声：'还要不要继续打？经费快用完了...'"},
       {id:"h1_4",x:80,y:65,icon:"📜",title:"电报记录",type:"clue",cardId:"c_telegram",
        content:"一张发黄的电报纸，上面的字迹有些模糊：'...9月26日...松基三井...喷出...工业油流...日产13.02吨...'你注意到电报边角有被泪水浸湿的痕迹。",
        card:{name:"喷油电报",cat:"历史事件",rarity:"epic",desc:"1959年9月26日下午4时，松基三井喷出工业油流，标志着大庆油田的发现。"},img:HI.img_telegram},
       {id:"h1_5",x:55,y:70,icon:"👷",title:"钻井工人",type:"npc",npcId:"worker",
        content:"一位满身油污的工人正在休息，他看起来很累但眼神坚定。他说：'我在这干了半年了，老婆孩子都在老家。但国家需要石油，咱不能回去。'"},
       {id:"h1_6",x:35,y:30,icon:"⚠️",title:"紧急通知",type:"info",
        content:"一张贴在帐篷外的通知：'鉴于钻探进度缓慢，上级考虑暂停松基三井钻探工作。请各队做好撤离准备。'通知的日期是1959年9月24日——就是昨天！",img:HI.img_telegram}
     ],
     npcs:{geologist:{name:"张地质师",role:"地质勘探队员",aiEnabled:true,
       avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
       dialogs:[
         {text:"咦？你是谁？怎么穿得这么奇怪？",next:1},
         {text:"算了，现在不是问这个的时候。我们正在钻探松基三井，刚刚取出的岩心显示有油砂！",next:2},
         {text:"这可能是重大发现！9月26日，我们可能见证历史。",next:3},
         {text:"你知道岩心是什么吗？",choices:[{text:"从地下取出的岩石样本",next:4},{text:"不太清楚",next:5}]},
         {text:"对！通过研究岩心，我们可以判断地下有没有石油。松基三井的岩心有油砂，说明下面很可能有石油！",next:6},
         {text:"岩心就是从地下取出的岩石样本。通过研究它，我们能判断地下有没有石油。",next:6},
         {text:"小同志，你愿意加入我们吗？为国家寻找石油！",
          choices:[{text:"我愿意！",action:"collectCard",cardId:"c_spirit",next:7},{text:"我想再了解一下",next:8}]},
         {text:"太好了！这就是石油工人的精神——为国分忧、为民族争气！",action:"complete"},
         {text:"石油是国家命脉。现在我们国家大部分石油靠进口，被人家卡脖子。我们要把石油工业搞上去！",next:6}
       ]},
       worker:{name:"李师傅",role:"钻井工人",aiEnabled:true,
       avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
       dialogs:[
         {text:"小伙子，你是新来的吧？",next:1},
         {text:"我们已经在这荒原上干了快半年了。条件苦，但大家都憋着一股劲。",next:2},
         {text:"知道为什么吗？因为国家需要石油！我们争的不是油，是一口气！",next:3},
         {text:"我们住在干打垒里，就是用土坯搭的房子。虽然简陋，但能遮风挡雨。",action:"complete"}
       ]}},
     quiz:{question:"松基三井喷出工业油流的日期是？这一事件标志着什么？",
       options:["A. 1959年9月26日，标志着大庆油田的发现","B. 1960年3月，标志着石油会战开始","C. 1958年9月，标志着勘探开始","D. 1963年，标志着油田建成"],
       correct:0,explanation:"正确！1959年9月26日，松基三井喷出工业油流，日产量13.02吨，标志着大庆油田的发现，打破了'中国贫油论'。"},
     crackCondition:{cards:["c_drill","c_core","c_telegram"],quiz:true},
     crackResult:{title:"规则破解：荒原下的黑色黄金",text:"1959年9月26日，松基三井喷出工业油流，日产量13.02吨。这标志着大庆油田的发现，是中国石油工业史上的里程碑事件。'大庆'之名寓意'大庆之年得油田'——正值新中国成立10周年前夕。这一发现打破了'中国贫油论'，为国家的工业化奠定了基础。"}},
    {id:2,title:"第二章：营地规则",subtitle:"荒原上的奇迹",date:"1960年春 · 大庆石油会战",
     bg:HI.img_camp,
     rule:"【规则4】如果你看到一群人用肩膀扛着钢铁在荒原上行走，不要惊讶。这是正常的运输方式。\n【规则5】如果你住的房子没有砖没有瓦，只有土和草，请感恩。这是最好的房子。\n【规则6】如果你听到有人喊'宁肯少活二十年'，请跟着喊。这是力量的源泉。",
     ruleCracked:false,
     story:"1960年春，你来到大庆石油会战现场。数万名工人从全国各地奔赴荒原。但你很快发现，情况比想象中更加严峻——没有吊车，没有房子，没有足够的粮食，甚至连饮用水都要从几十里外运来...",
     hotspots:[
       {id:"h2_1",x:40,y:40,icon:"🏠",title:"干打垒",type:"clue",cardId:"c_gandalai",
        content:"一排排低矮的土坯房，墙上糊着报纸。门口挂着'艰苦奋斗'的标语。一位老工人说：'这房子夏天漏雨冬天漏风，但比住露天地强。当年我们刚来时，连这都没有，就睡草甸子！'",
        card:{name:"干打垒",cat:"历史事件",rarity:"common",desc:"干打垒是石油会战期间工人用土坯搭建的简易房屋，体现了艰苦奋斗的精神。"},img:HI.img_gandalai},
       {id:"h2_2",x:60,y:35,icon:"🏗️",title:"人拉肩扛",type:"clue",cardId:"c_carry",
        content:"几十名工人用绳索和撬棍，正在拖动一台巨大的钻机。没有吊车，只有人的肩膀。王进喜走在最前面，肩膀上的绳子已经勒出了血痕。",
        card:{name:"人拉肩扛",cat:"人物事迹",rarity:"epic",desc:"王进喜带领1205钻井队用人拉肩扛的方式，将60多吨钻机设备运到井场。"},img:HI.img_carry},
       {id:"h2_3",x:30,y:60,icon:"👤",title:"王进喜",type:"npc",npcId:"wangjinx",
        content:"一位身材魁梧的工人站在井架旁，目光坚毅。他胸前戴着'1205钻井队'的徽章。他的手上缠着绷带，渗着血迹。"},
       {id:"h2_4",x:75,y:55,icon:"📰",title:"会战战报",type:"clue",cardId:"c_battle",
        content:"一张《战报》：'1960年2月，中央批准在大庆进行石油大会战。数万名工人从全国各地奔赴荒原。'战报边角有一行手写的小字：'李四光部长说，中国石油工业的希望就在这里。'",
        card:{name:"石油会战",cat:"历史事件",rarity:"rare",desc:"1960年开始，数万名石油工人从全国各地奔赴大庆，在艰苦条件下创造奇迹。"},img:HI.img_battle},
       {id:"h2_5",x:50,y:70,icon:"🍚",title:"食堂",type:"info",
        content:"简易食堂里，工人们正在吃饭。桌上是粗粮和咸菜。一位老工人说：'吃饱了好干活，为了国家，啥苦都能吃！昨天有个年轻娃子饿晕了，醒了还吵着要上井场...'",img:HI.img_camp},
       {id:"h2_6",x:20,y:35,icon:"💧",title:"水井",type:"info",
        content:"一口简陋的水井，旁边放着一个破旧的木桶。'这水是从十里外运来的，'一位女工说，'洗脸水要留着洗脚，洗脚水要留着浇菜。每一滴水都金贵啊。'",img:HI.img_gandalai}
     ],
     npcs:{wangjinx:{name:"王进喜",role:"铁人·1205钻井队队长",aiEnabled:true,
       avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
       dialogs:[
         {text:"我是王进喜，1205钻井队队长。你是新来的同志吧？",next:1},
         {text:"看到那台钻机了吗？60多吨重，没有吊车，咱们就人拉肩扛，硬是给运到了井场！",next:2},
         {text:"有条件要上，没有条件创造条件也要上！",next:3},
         {text:"你知道我为什么叫'铁人'吗？",choices:[{text:"因为您像铁一样坚强",next:4},{text:"不太清楚",next:5}]},
         {text:"哈哈，不是因为身体像铁，是因为咱们石油工人的意志像铁一样！为国分忧、为民族争气！",next:6},
         {text:"1960年井喷那次，没有搅拌设备，我跳进泥浆池用身体搅拌水泥。宁可少活二十年，拼命也要拿下大油田！",next:6},
         {text:"这就是铁人精神：爱国、创业、求实、奉献。你要记住，不管什么时候，国家需要咱们，咱就得顶上！",action:"complete"}
       ]}},
     quiz:{question:"王进喜带领1205钻井队用什么方法将60多吨钻机设备运到井场？这体现了什么精神？",
       options:["A. 人拉肩扛，体现了艰苦奋斗、自力更生的精神","B. 用吊车吊装，体现了科学施工的精神","C. 用火车运输，体现了团结协作的精神","D. 用汽车拉运，体现了高效作业的精神"],
       correct:0,explanation:"正确！王进喜带领1205钻井队用人拉肩扛的方式，将60多吨钻机设备从火车站运到井场。这体现了艰苦奋斗、自力更生的创业精神。"},
     crackCondition:{cards:["c_gandalai","c_carry","c_battle"],quiz:true},
     crackResult:{title:"规则破解：荒原上的奇迹",text:"1960年，大庆石油会战开始。数万名工人从全国各地奔赴荒原，在'天当房、地当床'的极端艰苦条件下，仅用三年多时间就建成了年产600万吨的大油田。王进喜带领的1205钻井队创造了月钻5009米的全国纪录。'宁肯少活二十年，拼命也要拿下大油田'成为那个时代的最强音。"}},
    {id:3,title:"第三章：铁人规则",subtitle:"用生命守护生命",date:"1960年 · 井喷时刻",
     bg:HI.img_ironman,
     rule:"【规则7】如果钻井过程中地面开始震动，请保持镇定。这是大地在回应你的努力。\n【规则8】如果黑色的液体从地下喷涌而出高达几十米，不要逃跑。这是胜利的礼花。\n【规则9】如果有人跳进黑色的泥浆中，请不要阻止他。他在用生命守护生命。",
     ruleCracked:false,
     story:"1960年4月，你来到1205钻井队的井场。突然，地面开始剧烈震动——井喷了！黑色的原油像喷泉一样从地下涌出，高达几十米。工人们惊慌失措，有人大喊：'没有搅拌设备！水泥不够！怎么办？'",
     hotspots:[
       {id:"h3_1",x:50,y:40,icon:"🌋",title:"井喷现场",type:"clue",cardId:"c_blowout",
        content:"黑色的原油从井口喷涌而出，高达几十米。空气中弥漫着刺鼻的气味。一位技术员大喊：'压力还在上升！如果不赶快制服，整个井场都要毁了！'",
        card:{name:"井喷时刻",cat:"历史事件",rarity:"legendary",desc:"松基三井喷出工业油流，日产量13.02吨，标志着大庆油田的诞生。"},img:HI.img_blowout},
       {id:"h3_2",x:30,y:55,icon:"🏊",title:"泥浆池",type:"clue",cardId:"c_mud",
        content:"一个巨大的泥浆池，里面盛满了黑色的泥浆。旁边的老工人颤抖着说：'王队长就是从这里跳下去的...没有搅拌设备，他用自己的身体在泥浆里搅拌了三个多小时...上来的时候，人都冻僵了...'",
        card:{name:"跳泥浆池",cat:"人物事迹",rarity:"legendary",desc:"井喷险情中，王进喜跳进泥浆池用身体搅拌水泥，制服了井喷。"},img:HI.img_mud},
       {id:"h3_3",x:70,y:45,icon:"👤",title:"老工人",type:"npc",npcId:"oldworker",
        content:"一位白发苍苍的老工人坐在泥浆池边，眼神深邃。他的手在微微颤抖。"},
       {id:"h3_4",x:45,y:70,icon:"🏆",title:"荣誉墙",type:"clue",cardId:"c_honor",
        content:"墙上贴着奖状：'1205钻井队荣获钢铁钻井队称号'。旁边是一面锦旗，写着'为国争光'。锦旗下面有一行小字：'献给我的战友们——王进喜'。",
        card:{name:"铁人荣誉",cat:"精神文化",rarity:"epic",desc:"王进喜和1205钻井队获得多项荣誉，铁人精神成为中华民族精神的重要组成部分。"},img:HI.img_honor},
       {id:"h3_5",x:80,y:60,icon:"📷",title:"老照片",type:"info",
        content:"一张黑白照片：王进喜站在钻井旁，满身泥浆，但笑容灿烂。背面写着：'1960年，铁人王进喜'。照片边缘已经泛黄，有明显被手指反复摩挲的痕迹。",img:HI.img_ironman},
       {id:"h3_6",x:25,y:40,icon:"🩹",title:"医疗室",type:"info",
        content:"简陋的医疗室里，一位医生正在整理药品。'王队长跳上来后，腿上全是伤口，泥浆腐蚀的。他躺了两天就又要上井场，我怎么拦都拦不住...'医生叹了口气。",img:HI.img_mud}
     ],
     npcs:{oldworker:{name:"赵师傅",role:"老石油工人",aiEnabled:true,
       avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
       dialogs:[
         {text:"小伙子，我在这油田干了六十多年了。",next:1},
         {text:"王队长跳泥浆池那天，我就在现场。那场面，我这辈子都忘不了。",next:2},
         {text:"没有搅拌设备，井喷越来越大。王队长把棉衣一脱，'扑通'就跳进去了。",next:3},
         {text:"他在泥浆里泡了三个多小时，上来的时候人都冻僵了，可他还笑着说'井喷制服了'。",next:4},
         {text:"这就是铁人精神。不是因为他身体像铁，是因为他的信念比铁还硬！",action:"complete"}
       ]}},
     quiz:{question:"王进喜跳进泥浆池用身体搅拌水泥，最终制服了井喷。这体现了铁人精神的哪个核心内涵？",
       options:["A. 为国分忧、为民族争气的爱国主义精神","B. 讲求科学、三老四严的求实精神","C. 独立自主、自力更生的艰苦创业精神","D. 胸怀全局、为国分忧的奉献精神"],
       correct:0,explanation:"正确！王进喜在井喷险情中不顾个人安危，用身体搅拌水泥，体现了'为国分忧、为民族争气'的爱国主义精神，这是铁人精神的核心。"},
     crackCondition:{cards:["c_blowout","c_mud","c_honor"],quiz:true},
     crackResult:{title:"规则破解：铁人精神的诞生",text:"王进喜，1923-1970，中国石油工人的杰出代表。他带领1205钻井队参加大庆石油会战，创造了月钻5009米的全国纪录。在井喷险情中，他跳进泥浆池用身体搅拌水泥，制服了井喷。'宁肯少活二十年，拼命也要拿下大油田'——这句豪言壮语，成为铁人精神的核心。铁人精神：为国分忧、为民族争气的爱国主义精神；独立自主、自力更生的艰苦创业精神；讲求科学、'三老四严'的求实精神；胸怀全局、为国分忧的奉献精神。"}},
    {id:4,title:"尾声：传承规则",subtitle:"薪火相传",date:"2026年 · 百年油田",
     bg:HI.img_modern,
     rule:"【规则10】如果你看到荒原变成了城市，水井变成了油井，请不要惊讶。这是几代人用汗水换来的奇迹。\n【最终规则】如果你读懂了这些规则，请把这份精神传承下去。这是最重要的任务。",
     ruleCracked:false,
     story:"你回到了2026年。站在铁人纪念馆前，回望这段穿越时空的旅程。一位年轻的石油工人走过来，递给你一张请柬：'明天是铁人王进喜逝世56周年纪念活动，我们想邀请你作为特殊嘉宾参加——因为你来自1959年。'",
     hotspots:[
       {id:"h4_1",x:40,y:40,icon:"🏙️",title:"现代大庆",type:"clue",cardId:"c_modern",
        content:"高楼林立的城市，远处是成千上万的'磕头机'（抽油机）。荒原已经变成了现代化的石油城。一位老人说：'我爷爷那辈人在这里打井时，这里还是一片荒原。现在，我的孙子在油田的研究院工作。'",
        card:{name:"现代大庆",cat:"现代发展",rarity:"rare",desc:"大庆从荒原发展成为现代化城市，累计生产原油超过25亿吨。"},img:HI.img_modern},
       {id:"h4_2",x:60,y:35,icon:"🏛️",title:"铁人纪念馆",type:"clue",cardId:"c_museum",
        content:"铁人王进喜纪念馆。建筑外形是'工人'二字组合，顶部是钻头造型。每年接待数十万参观者。展厅里，你看到了你穿越时见过的那口井架——它已经被完整地搬到了这里。",
        card:{name:"铁人纪念馆",cat:"纪念场馆",rarity:"epic",desc:"铁人王进喜纪念馆是国家一级博物馆、全国爱国主义教育示范基地。"},img:HI.img_museum},
       {id:"h4_3",x:30,y:60,icon:"👤",title:"现代石油工人",type:"npc",npcId:"modern",
        content:"一位穿着现代化工作服的年轻工人，正在操作智能采油设备。他的胸牌上写着'1205钻井队'——和王进喜一样的编号。"},
       {id:"h4_4",x:75,y:50,icon:"📊",title:"百年目标",type:"clue",cardId:"c_century",
        content:"展板上写着：'建设百年油田，实现可持续发展'。大庆油田已累计生产原油超过25亿吨。旁边有一个互动屏幕，显示着实时数据：'今日原油产量：XXX吨'。",
        card:{name:"百年油田",cat:"现代发展",rarity:"legendary",desc:"建设百年油田是大庆的发展目标，通过技术创新实现可持续发展。"},img:HI.img_century},
       {id:"h4_5",x:50,y:70,icon:"🌿",title:"绿色油田",type:"info",
        content:"曾经荒凉的盐碱地，如今变成了绿树成荫的公园。'绿水青山就是金山银山'的标语矗立在道路两旁。一位导游正在给游客讲解：'这里曾经是干打垒的地方，现在变成了铁人广场...'",img:HI.img_green},
       {id:"h4_6",x:20,y:45,icon:"📜",title:"传承誓言",type:"info",
        content:"一块巨大的石碑，上面刻着几代石油工人的名字。最上面是王进喜，下面密密麻麻写着成千上万个名字。石碑底部刻着一句话：'为国分忧、为民族争气——这是石油工人永恒的誓言。'",img:HI.img_museum}
     ],
     npcs:{modern:{name:"小刘",role:"新时代石油工人",aiEnabled:true,
       avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
       dialogs:[
         {text:"你好！我是大庆油田的新一代石油工人。",next:1},
         {text:"现在我们用智能采油技术，一个人可以管理几十口井。但铁人精神一直没变。",next:2},
         {text:"'宁肯少活二十年'那种拼命劲儿，现在变成了'精益求精、科技报国'。",next:3},
         {text:"大庆油田已经累计生产了25亿吨原油，为国家能源安全做出了巨大贡献。",next:4},
         {text:"铁人精神不只是历史，它是我们每个人的行动指南。爱国、创业、求实、奉献！",action:"complete"}
       ]}},
     quiz:{question:"大庆精神的核心内涵是什么？在新时代，我们应该如何传承铁人精神？",
       options:["A. 为国争光、为民族争气的爱国主义精神；在新时代用科技创新报国","B. 艰苦奋斗、无私奉献；放弃现代技术，回归原始方法","C. 个人英雄主义；每个人都应该像王进喜一样跳进泥浆池","D. 追求经济效益；把石油产量放在第一位"],
       correct:0,explanation:"正确！大庆精神的核心是'为国争光、为民族争气的爱国主义精神'。在新时代，我们应该用科技创新、精益求精来传承铁人精神，为国家发展贡献力量。"},
     crackCondition:{cards:["c_modern","c_museum","c_century"],quiz:true},
     crackResult:{title:"最终破解：精神的传承",text:"从1959年松基三井喷油，到2026年建设百年油田，大庆精神、铁人精神始终是石油工人的灵魂。累计生产原油超过25亿吨，连续27年年产5000万吨以上。大庆从荒原变成现代化城市，从'贫油国'到能源自给。这不仅是石油的奇迹，更是精神的奇迹。铁人精神属于过去，也属于现在，更属于未来。"}}
  ],
  cards:{c_spirit:{name:"石油精神",cat:"精神文化",rarity:"rare",desc:"为国分忧、为民族争气的爱国主义精神，是石油工人的核心价值观。"}},
  state:{currentChapter:0,collectedCards:[],crackedRules:[],dialogHistory:{},aiTalkCount:0,quizPassed:{},arScanned:[],quizCorrect:0,quizWrong:0,aiChats:0,
    playerProfile:{archetype:'explorer',riskTolerance:0.5,engagement:0},dynamicRules:[],branchHistory:[]}
};

// ========== NPC PERSONAS ==========
const PERSONAS={
  guide:{name:"档案守护者",systemPrompt:"你是档案守护者，一个神秘的时空引导者。你存在于1959年和2026年之间的夹缝中，引导现代人了解大庆油田的历史。你神秘、智慧、略带诗意。每次回答控制在80字以内。"},
  geologist:{name:"张地质师",systemPrompt:"你是张地质师，1959年大庆油田的地质勘探队员。你年轻、热情、充满理想。你的知识领域：地质勘探、岩心分析、石油地质学、1959年大庆油田发现过程。每次回答控制在100字以内。"},
  worker:{name:"李师傅",systemPrompt:"你是李师傅，1959年大庆油田的钻井工人。你40多岁，经验丰富，是从玉门油矿来的老工人。你朴实、直爽。每次回答控制在100字以内。"},
  wangjinx:{name:"王进喜",systemPrompt:"你是王进喜，中国石油工人的杰出代表，被誉为'铁人'，1205钻井队队长。你豪迈、坚定、充满力量。每次回答控制在100字以内。"},
  oldworker:{name:"赵师傅",systemPrompt:"你是赵师傅，一位在大庆油田干了六十多年的老石油工人。你慈祥、睿智、充满故事。每次回答控制在100字以内。"},
  modern:{name:"小刘",systemPrompt:"你是小刘，2026年大庆油田的新时代石油工人。你年轻、有活力、懂技术。每次回答控制在100字以内。"}
};

const CLUES={'岩心':{cardId:'c_core',hint:'你提到了岩心...'},'松基三井':{cardId:'c_drill',hint:'松基三井...那是关键地点...'},'喷油':{cardId:'c_telegram',hint:'喷油的那一刻...'},'干打垒':{cardId:'c_gandalai',hint:'干打垒里藏着故事...'},'铁人':{cardId:'c_honor',hint:'铁人精神...值得铭记...'},'泥浆池':{cardId:'c_mud',hint:'泥浆池中的壮举...'},'人拉肩扛':{cardId:'c_carry',hint:'人拉肩扛的奇迹...'},'石油会战':{cardId:'c_battle',hint:'会战的岁月...'},'井喷':{cardId:'c_blowout',hint:'井喷的时刻...'},'纪念馆':{cardId:'c_museum',hint:'纪念馆中的记忆...'},'百年油田':{cardId:'c_century',hint:'百年油田的目标...'},'现代':{cardId:'c_modern',hint:'现代大庆的面貌...'}};

const AR_MARKS=[
  {id:'ar1',name:'虚拟磕头机（抽油机）',img:'images/drill.jpg',desc:'大庆油田标志性设备——磕头机。上下往复运动抽采原油，当地人称它为"磕头机"，因为工作时像人磕头一样上下摆动。大庆油田有超过十万台抽油机，是油田最普遍的地面设备，日夜不停地运转，是大庆"铁人精神"在新时代的延续。',clue:'线索：每台抽油机每天可采油数吨，它们日夜不停，仿佛在向大地致敬。铁人王进喜说："宁可少活二十年，拼命也要拿下大油田！"',chapter:1},
  {id:'ar2',name:'虚拟井架模型',img:'images/core.jpg',desc:'石油钻探的核心设备——钻井井架。松基三井喷油时用的就是这种井架。1959年9月26日，正是通过这样的井架，钻探人员钻到了1400多米深，发现了大庆油田。王进喜带领1205钻井队用人拉肩扛的方式，在没有吊车的情况下把它竖了起来。',clue:'线索：井架高38米，重22吨。王进喜说："有条件要上，没有条件创造条件也要上！"',chapter:1},
  {id:'ar3',name:'虚拟泥浆池',img:'images/battle.jpg',desc:'王进喜跳入泥浆池用身体搅拌压井喷的地方。1960年5月，打第二口井时突然发生井喷，当时没有搅拌机，王进喜纵身跳入泥浆池，用身体搅拌泥浆压住了井喷。这张由新华社记者拍摄的照片成为中国工业史上的经典影像。',clue:'线索：王进喜说："宁肯少活二十年，拼命也要拿下大油田！"这一跳，定格了中国石油工业的精神丰碑。',chapter:2},
  {id:'ar4',name:'铁人精神相关符号',img:'images/gandalai.jpg',desc:'铁人精神是大庆精神的核心体现。"爱国、创业、求实、奉献"——这八个字凝聚了几代石油人的奋斗信念。铁人王进喜是这一精神的象征，他用自己的行动诠释了什么是"为国分忧、为民族争气"。',clue:'线索：铁人精神不仅是历史记忆，更是新时代青年应当传承的精神财富。了解铁人，就是了解中国工业的自强之路。',chapter:2},
  {id:'ar5',name:'建筑轮廓与纪念地标',img:'images/extra1.jpg',desc:'大庆的地标建筑承载着厚重的历史记忆。铁人王进喜纪念馆、松基三井纪念碑、大庆油田历史陈列馆……这些建筑的轮廓勾勒出一座城市的信仰坐标，记录着从荒原到油城的壮丽历程。',clue:'线索：1963年底，周恩来总理庄严宣告："中国石油产品已经基本自给！"大庆从此成为中国工业自力更生的象征。',chapter:3}
];


const FALLBACK={
  geologist:{'岩心':'岩心就是从地下取出的圆柱形岩石样本。通过研究岩心，我们能判断地下有没有石油。','松基三井':'松基三井是松辽盆地第三口基准井，1959年4月开钻。9月26日喷出了工业油流！','石油':'石油是工业的血液！当时我们国家石油大部分靠进口，被人家卡脖子。'},
  worker:{'干打垒':'干打垒就是咱们用土坯搭的房子。虽然简陋，但能遮风挡雨。','王进喜':'王进喜那是咱的榜样！铁人精神就是为国分忧、为民族争气。','条件':'条件是苦啊！住干打垒、吃粗粮，但大家都憋着一股劲。'},
  wangjinx:{'铁人':'不是因为身体像铁，是因为石油工人的意志像铁一样！','泥浆池':'井喷了！没有搅拌设备，我跳进泥浆池用身体搅拌水泥。','钻机':'60多吨的钻机，没有吊车，咱们就人拉肩扛！'},
  oldworker:{'王进喜':'王队长跳泥浆池那天，我就在现场。他在泥浆里泡了三个多小时。','变化':'从荒原到城市，从贫油到自给，这六十多年变化太大了。'},
  modern:{'技术':'现在我们用智能采油，物联网、大数据、AI都有。','百年':'建设百年油田，通过技术创新实现可持续发展。','精神':'铁人精神在新时代就是精益求精、科技报国。'}
};

// ========== STATE ==========
let curDialog=null,curNpcId=null,curAiNpc=null,aiHist=[];
let arStream=null,arTimer=null;

// ========== CORE GAME OBJECT ==========
const G={
  // Init
  init(){
    DATA.chapters.forEach(ch=>ch.hotspots.forEach(h=>{if(h.card)DATA.cards[h.cardId]=h.card;}));
    this.load();
    this.renderCards();
    this.updatePrg();
    // Check save
    try{const s=JSON.parse(localStorage.getItem('dq_game_state')||'{}');
      if(s.collectedCards&&s.collectedCards.length>0)$('cb').style.display='inline-block';
    }catch(e){}
  },

  // Save/Load
  save(){try{localStorage.setItem('dq_game_state',JSON.stringify(DATA.state));}catch(e){}},
  load(){try{const s=JSON.parse(localStorage.getItem('dq_game_state'));if(!s)return;
    DATA.state.collectedCards=s.collectedCards||[];DATA.state.crackedRules=s.crackedRules||[];
    DATA.state.quizPassed=s.quizPassed||{};DATA.state.aiTalkCount=s.aiTalkCount||0;
    DATA.state.arScanned=s.arScanned||[];DATA.state.quizCorrect=s.quizCorrect||0;
    DATA.state.quizWrong=s.quizWrong||0;DATA.state.aiChats=s.aiChats||0;
    DATA.state.playerProfile=s.playerProfile||{archetype:'explorer',riskTolerance:0.5,engagement:0};
    DATA.state.dynamicRules=s.dynamicRules||[];DATA.state.branchHistory=s.branchHistory||[];
    DATA.state.crackedRules.forEach(id=>{if(DATA.chapters[id])DATA.chapters[id].ruleCracked=true;});
  }catch(e){}},

  // Start/Continue
  start(){localStorage.removeItem('dq_game_state');DATA.state={currentChapter:0,collectedCards:[],crackedRules:[],dialogHistory:{},aiTalkCount:0,quizPassed:{},arScanned:[],quizCorrect:0,quizWrong:0,aiChats:0,playerProfile:{archetype:'explorer',riskTolerance:0.5,engagement:0},dynamicRules:[],branchHistory:[]};
    $('menu').classList.add('hide');$('game').classList.remove('hide');
    this.init();this.loadCh(0);},
  go(){$('menu').classList.add('hide');$('game').classList.remove('hide');
    this.init();const s=JSON.parse(localStorage.getItem('dq_game_state')||'{}');this.loadCh(s.currentChapter||0);},
  home(){$('menu').classList.remove('hide');$('game').classList.add('hide');this.closeDlg();this.closeAI();},

  // Load Chapter
  loadCh(idx){
    const ch=DATA.chapters[idx];if(!ch)return;
    DATA.state.currentChapter=idx;this.save();
    $('cht').textContent=ch.title;
    const bg=$('sbg');bg.className='bg ch'+idx;bg.style.backgroundImage=`url('${ch.bg}')`;
    $('rt').textContent=ch.rule;
    $('rs').textContent=ch.ruleCracked?'✓ 已破解':'未破解';
    $('rs').style.color=ch.ruleCracked?'var(--green)':'var(--gold)';
    // Hotspots
    const hp=$('hps');hp.innerHTML='';
    ch.hotspots.forEach(h=>{
      const el=document.createElement('div');el.className='hp';
      el.style.left=h.x+'%';el.style.top=h.y+'%';el.setAttribute('data-i',h.icon);
      const lb=document.createElement('div');lb.className='hl';lb.textContent=h.title;el.appendChild(lb);
      el.onclick=()=>this.onHotspot(h);hp.appendChild(el);
    });
    this.renderCards();this.updatePrg();
  },

  // Update Progress
  updatePrg(){
    const ch=DATA.chapters[DATA.state.currentChapter];
    const total=DATA.chapters.length;
    $('prg').textContent=`规则破解：${DATA.state.crackedRules.length}/${total}`;
    $('ccnt').textContent=`已收集线索：${DATA.state.collectedCards.length}/${Object.keys(DATA.cards).length}`;
  },

  // Render Card List
  renderCards(){
    const cl=$('clist');cl.innerHTML='';
    const ch=DATA.chapters[DATA.state.currentChapter];
    const chCards=ch.hotspots.filter(h=>h.card).map(h=>h.cardId);
    chCards.forEach(cid=>{
      const c=DATA.cards[cid];const have=DATA.state.collectedCards.includes(cid);
      const el=document.createElement('div');el.className='cs'+(have?'':' lk');
      el.innerHTML=`<div class="csi ${c.rarity}">${have?'📋':'🔒'}</div><div><div class="csn">${have?c.name:'???'}</div><div class="csg">${have?c.cat:'未收录'}</div></div>`;
      if(have)el.onclick=()=>this.showOv(c.name,`<div class="cc"><h4>${c.name}</h4><p><b>分类：</b>${c.cat}</p><p><b>稀有度：</b>${this.rarityLbl(c.rarity)}</p><p>${c.desc}</p></div>`);
      cl.appendChild(el);
    });
  },

  rarityLbl(r){return{common:'普通',rare:'稀有',epic:'史诗',legendary:'传说'}[r]||r;},

  // Hotspot Click
  onHotspot(h){
    if(h.type==='info'){
      let html=`<p>${h.content}</p>`;
      if(h.img)html+=`<img class="hi" src="${h.img}" alt="${h.title}" onclick="G.showImg('${h.img}','${h.title}')"><div class="hc">点击放大查看 · ${h.title}</div>`;
      this.showOv(h.title,html);
    }else if(h.type==='clue'){
      const have=DATA.state.collectedCards.includes(h.cardId);
      let html=`<div class="cc"><h4>📋 ${h.title}</h4><p>${h.content}</p></div>`;
      if(h.img)html+=`<img class="hi" src="${h.img}" alt="${h.title}" onclick="G.showImg('${h.img}','${h.title}')"><div class="hc">点击放大查看 · 历史照片</div>`;
      if(!have)html+=`<button class="btn btn-p" style="width:100%;margin-top:.8rem" onclick="G.collectCard('${h.cardId}')">📋 收录档案</button>`;
      else html+=`<p style="color:var(--gold);text-align:center;margin-top:.8rem">✓ 已收录到档案袋</p>`;
      this.showOv(h.title,html);
    }else if(h.type==='npc'){
      this.startDlg(h.npcId);
    }
  },

  // Collect Card
  collectCard(cid){
    if(DATA.state.collectedCards.includes(cid))return;
    DATA.state.collectedCards.push(cid);const c=DATA.cards[cid];
    this.toast(`📋 获得线索：${c.name} [${this.rarityLbl(c.rarity)}]`);
    this.renderCards();this.updatePrg();this.closeOv();this.checkCrack();this.save();
    RE.onEvent('card_collect',{cardId:cid});
    setTimeout(()=>RE.checkDynamic(),500);
  },

  // Check Crack
  checkCrack(){
    const ch=DATA.chapters[DATA.state.currentChapter];
    if(!ch.crackCondition||ch.ruleCracked)return;
    const needed=ch.crackCondition.cards;
    if(needed.every(cid=>DATA.state.collectedCards.includes(cid)))this.showQuiz();
  },

  // Quiz
  showQuiz(){
    const ch=DATA.chapters[DATA.state.currentChapter];const q=ch.quiz;if(!q)return;
    if(DATA.state.quizPassed[ch.id]){this.showChDone();return;}
    let html=`<div class="qz"><div class="qz-q">📝 ${q.question}</div><div class="qz-o">`;
    q.options.forEach((o,i)=>{html+=`<button class="qo" onclick="G.answerQuiz(${i})">${o}</button>`;});
    html+=`</div></div>`;
    this.showOv('📋 破解验证',html);
  },

  answerQuiz(idx){
    const ch=DATA.chapters[DATA.state.currentChapter];const q=ch.quiz;
    const opts=document.querySelectorAll('.qo');
    opts.forEach((o,i)=>{o.disabled=true;if(i===q.correct)o.classList.add('ok');else if(i===idx&&i!==q.correct)o.classList.add('no');});
    if(idx===q.correct){
      DATA.state.quizPassed[ch.id]=true;DATA.state.quizCorrect++;this.save();
      const fb=document.createElement('div');fb.style.cssText='margin-top:.8rem;padding:.8rem;background:rgba(74,155,74,.1);border-radius:6px';
      fb.innerHTML=`<b style="color:var(--green)">✓ 回答正确！</b><br>${q.explanation}<br><br><button class="btn btn-p" onclick="G.closeOv();G.showChDone()">继续破解</button>`;
      opts[0].parentElement.parentElement.appendChild(fb);
      RE.onEvent('quiz_answer',{correct:true,chapter:ch.id});
    }else{
      DATA.state.quizWrong++;this.save();
      const fb=document.createElement('div');fb.style.cssText='margin-top:.8rem;padding:.8rem;background:rgba(139,38,53,.1);border-radius:6px';
      fb.innerHTML=`<b style="color:var(--red)">✗ 回答错误</b><br>${q.explanation}<br><br><button class="btn btn-p" onclick="G.closeOv();G.showQuiz()">重新答题</button>`;
      opts[0].parentElement.parentElement.appendChild(fb);
      RE.onEvent('quiz_answer',{correct:false,chapter:ch.id});
    }
    setTimeout(()=>RE.checkDynamic(),500);
  },

  // Chapter Complete
  showChDone(){
    const ch=DATA.chapters[DATA.state.currentChapter];ch.ruleCracked=true;
    if(!DATA.state.crackedRules.includes(ch.id))DATA.state.crackedRules.push(ch.id);
    $('dnt').textContent='🔓 '+ch.crackResult.title;
    $('dnb').innerHTML=`<div class="tr"><h4>历史真相</h4><p>${ch.crackResult.text}</p></div>
      <div class="sts"><div class="st"><div class="sv">${DATA.state.collectedCards.length}</div><div class="sl">线索收集</div></div>
      <div class="st"><div class="sv">${DATA.state.crackedRules.length}</div><div class="sl">规则破解</div></div></div>
      <button class="btn btn-p" style="width:100%" onclick="G.nextCh()">继续探索 →</button>`;
    $('ov-dn').classList.add('open');this.updatePrg();this.save();
    RE.onEvent('chapter_complete',{chapter:ch.id});
  },

  nextCh(){
    $('ov-dn').classList.remove('open');
    if(DATA.state.currentChapter<DATA.chapters.length-1)this.loadCh(DATA.state.currentChapter+1);
    else this.showEnding();
  },

  // Ending
  showEnding(){
    const totalCards=Object.keys(DATA.cards).length;
    const rate=DATA.state.collectedCards.length/totalCards;
    let badge='石油学徒';
    if(rate>=0.9)badge='⭐ 铁人传人';else if(rate>=0.7)badge='🏆 石油先锋';else if(rate>=0.5)badge='🛡️ 油田卫士';
    $('edb').innerHTML=`
      <h2 style="font-family:'ZCOOL XiaoWei',serif;font-size:2.2rem;color:var(--gold);margin-bottom:1rem">寻境大庆 · 调查完成</h2>
      <div style="color:var(--paper);max-width:500px;margin:0 auto;line-height:2;text-align:left">
        <p>你完成了对大庆油田历史的调查。</p>
        <p>从1959年松基三井喷油，到1960年石油会战，再到铁人精神的诞生...</p>
        <p>你见证了荒原变城市、贫油变自强的奇迹。</p>
        <p>大庆精神、铁人精神，是中华民族伟大精神的重要组成部分。</p>
        <p>作为新时代的青年，传承这份精神，就是你的使命。</p>
      </div>
      <div style="border-left:4px solid var(--gold);padding-left:1rem;margin:1.5rem auto;color:var(--gold-l);font-style:italic;max-width:400px;text-align:left;line-height:2">"宁肯少活二十年，拼命也要拿下大油田！" —— 王进喜</div>
      <div class="sts"><div class="st"><div class="sv">${DATA.state.collectedCards.length}</div><div class="sl">线索收集</div></div>
        <div class="st"><div class="sv">${DATA.state.crackedRules.length}</div><div class="sl">规则破解</div></div>
        <div class="st"><div class="sv">${DATA.state.aiTalkCount}</div><div class="sl">AI对话</div></div></div>
      <div style="background:linear-gradient(135deg,var(--gold),var(--gold-l));color:var(--ink);padding:1rem 2rem;border-radius:8px;font-weight:700;font-size:1.2rem;display:inline-block;margin-top:1rem">${badge}</div>
      <br><button class="btn" style="margin-top:1.5rem" onclick="G.home()">🏠 返回主页</button>`;
    $('ov-ed').classList.add('open');
  },

  // Chapter Select
  chSel(){
    const g=$('chg');g.innerHTML='';
    DATA.chapters.forEach((ch,i)=>{
      const st=DATA.state.crackedRules.includes(i)?' ✓已破解':'';
      const el=document.createElement('div');el.className='cc2';
      el.innerHTML=`<div class="cn">第 ${i} 章${st}</div><div class="ct">${ch.title}</div><div class="cs2">${ch.subtitle}</div>`;
      el.onclick=()=>{$('ov-ch').classList.remove('open');$('menu').classList.add('hide');$('game').classList.remove('hide');
        if(!DATA.state.collectedCards.length)this.init();this.loadCh(i);};
      g.appendChild(el);
    });
    $('ov-ch').classList.add('open');
  },

  // Dialog System
  startDlg(npcId){
    const ch=DATA.chapters[DATA.state.currentChapter];const npc=ch.npcs[npcId];if(!npc)return;
    curNpcId=npcId;
    if(npc.aiEnabled!==false){
      this.showOv(`与 ${npc.name} 对话`,`
        <p style="margin-bottom:.8rem">你可以选择：</p>
        <button class="dc" style="width:100%;margin-bottom:.4rem" onclick="G.closeOv();G.storyDlg('${npcId}')">📖 主线对话（推进剧情）</button>
        <button class="dc" style="width:100%;margin-bottom:.4rem" onclick="G.closeOv();G.openAI('${npcId}')">💬 自由对话（问任何问题）</button>
        <p style="color:var(--gray);font-size:.72rem;margin-top:.6rem">💡 自由对话可以问任何关于大庆油田、石油勘探、铁人精神的问题。答案中可能隐藏着线索！</p>`);
    }else{this.storyDlg(npcId);}
  },

  storyDlg(npcId){
    const ch=DATA.chapters[DATA.state.currentChapter];const npc=ch.npcs[npcId];
    curDialog={npc,npcId,step:0};this.renderDlg();
  },

  renderDlg(){
    const p=$('dlg');const{npc,step}=curDialog;const d=npc.dialogs[step];
    if(!d){p.classList.remove('open');return;}
    let html=`<div class="d-s"><div><div class="d-n">${npc.name}</div><div class="d-r">${npc.role}</div></div></div><div class="d-t">${d.text}</div>`;
    if(d.choices){
      html+='<div class="d-ch">';
      d.choices.forEach((c,i)=>{html+=`<button class="dc" onclick="G.chooseDlg(${i})">${c.text}</button>`;});
      html+='</div>';
    }else if(d.action==='complete'){
      html+=`<button class="dc" onclick="G.endDlg()">结束对话</button>`;
    }else if(d.next!==undefined){
      html+=`<button class="dc" onclick="G.nextDlg()">继续...</button>`;
    }
    html+=`<div style="display:flex;gap:.4rem;margin-top:.6rem;padding-top:.6rem;border-top:1px solid rgba(184,149,58,.2);justify-content:center">
      <button class="btn btn-s" onclick="G.endDlg()">← 返回场景</button></div>`;
    p.innerHTML=html;p.classList.add('open');
  },

  nextDlg(){const{npc,step}=curDialog;curDialog.step=npc.dialogs[step].next;this.renderDlg();},
  chooseDlg(i){
    const{npc,step}=curDialog;const c=npc.dialogs[step].choices[i];
    if(c.action==='nextChapter'){this.endDlg();if(DATA.state.currentChapter<DATA.chapters.length-1)this.loadCh(DATA.state.currentChapter+1);return;}
    if(c.action==='close'){this.endDlg();return;}
    if(c.action==='collectCard')this.collectCard(c.cardId);
    curDialog.step=c.next;this.renderDlg();
  },
  endDlg(){curDialog=null;$('dlg').classList.remove('open');},
  closeDlg(){this.endDlg();},

  // AI Chat
  openAI(npcId){
    const p=PERSONAS[npcId];if(!p)return;
    curAiNpc=npcId;aiHist=[];
    $('acav').style.display='none';
    $('acnm').textContent=p.name;$('acm').innerHTML='';
    const welcomes={guide:"你又来了。时间的缝隙中，真相在等你发现...",geologist:"你好！我是张地质师。你对地质勘探有什么想了解的吗？",worker:"小伙子/姑娘，有啥想问的？咱知无不言！",wangjinx:"我是王进喜。为了国家，为了石油，有什么想问的尽管说！",oldworker:"孩子，我在这油田干了六十多年了。你想听什么故事？",modern:"你好！我是大庆油田的新一代石油工人。有什么想问的吗？"};
    this.addAiMsg('b',welcomes[npcId]||"你好，有什么想问的吗？");
    this.renderClueBtns(npcId);
    $('aichat').classList.add('open');$('dlg').classList.remove('open');
    RE.onEvent('npc_talk',{npcId});
  },

  renderClueBtns(npcId){
    const cl=$('acl');
    const btns={geologist:[{t:"🔍 什么是岩心？",q:"什么是岩心？"},{t:"🔍 松基三井多深？",q:"松基三井打了多深？"},{t:"🔍 为什么找石油？",q:"为什么国家这么急需石油？"}],
      worker:[{t:"🔍 干打垒是什么？",q:"干打垒是什么？"},{t:"🔍 王进喜是谁？",q:"王进喜是谁？"},{t:"🔍 生活条件怎样？",q:"你们生活条件怎么样？"}],
      wangjinx:[{t:"🔍 为什么叫铁人？",q:"为什么大家叫你铁人？"},{t:"🔍 跳泥浆池？",q:"跳泥浆池是怎么回事？"},{t:"🔍 人拉肩扛？",q:"人拉肩扛运钻机是怎么回事？"}],
      oldworker:[{t:"🔍 王进喜的故事？",q:"讲讲王进喜的故事"},{t:"🔍 油田的变化？",q:"油田这六十多年有什么变化？"}],
      modern:[{t:"🔍 现代采油技术？",q:"现在用什么技术采油？"},{t:"🔍 百年油田？",q:"什么是百年油田？"},{t:"🔍 铁人精神现在？",q:"铁人精神在新时代还有什么意义？"}]
    };
    cl.innerHTML=(btns[npcId]||[]).map(b=>`<button class="ac-cb" onclick="G.sendAI('${b.q}')">${b.t}</button>`).join('');
  },

  addAiMsg(cls,text,clueData){
    const m=$('acm');const d=document.createElement('div');d.className='am '+cls;
    let html=text;
    if(clueData&&!DATA.state.collectedCards.includes(clueData.cardId))
      html+=`<br><span class="cb" onclick="G.collectCardFromChat('${clueData.cardId}')">📋 ${clueData.hint} [点击收录]</span>`;
    d.innerHTML=html;m.appendChild(d);m.scrollTop=m.scrollHeight;
  },

  collectCardFromChat(cid){if(!DATA.cards[cid])return;this.collectCard(cid);document.querySelectorAll('.cb').forEach(c=>c.style.display='none');},

  async sendAI(preset){
    const inp=$('acin');const q=preset||inp.value.trim();if(!q)return;if(!preset)inp.value='';
    this.addAiMsg('u',q);$('atp').classList.remove('hide');
    DATA.state.aiTalkCount++;DATA.state.aiChats=(DATA.state.aiChats||0)+1;this.save();
    try{
      const p=PERSONAS[curAiNpc];
      const msgs=[{role:"system",content:p.systemPrompt},...aiHist.slice(-6),{role:"user",content:q}];
      const res=await fetch(AB+'/chat/completions',{method:'POST',
        headers:{'Content-Type':'application/json','Authorization':'Bearer '+AK},
        body:JSON.stringify({model:"deepseek-chat",messages:msgs,stream:false,max_tokens:200,temperature:0.8})});
      if(!res.ok)throw new Error('API error');
      const data=await res.json();const reply=data.choices[0].message.content;
      aiHist.push({role:"user",content:q},{role:"assistant",content:reply});
      let clueData=null;
      for(const[kw,cl]of Object.entries(CLUES)){if(reply.includes(kw)&&!DATA.state.collectedCards.includes(cl.cardId)){clueData=cl;break;}}
      $('atp').classList.add('hide');this.addAiMsg('b',reply,clueData);
    }catch(e){
      $('atp').classList.add('hide');
      const fb=this.getFallback(curAiNpc,q);this.addAiMsg('b',fb+"\n\n[网络连接不稳定，已切换至离线模式]");
    }
  },

  getFallback(npcId,q){
    const fb=FALLBACK[npcId]||{};
    for(const[k,v]of Object.entries(fb)){if(q.includes(k))return v;}
    return"这个问题很有意思。作为"+(PERSONAS[npcId]?.name||"NPC")+"，我尽量回答你。";
  },

  closeAI(){$('aichat').classList.remove('open');curAiNpc=null;aiHist=[];},

  // Overlay
  showOv(title,body){$('ovt').textContent=title;$('ovb').innerHTML=body;$('ov').classList.add('open');},
  closeOv(id){if(id)$(id).classList.remove('open');else $('ov').classList.remove('open');},
  cov(id){this.closeOv(id||'ov');},

  // Image Viewer
  showImg(src,cap){$('ivi').src=src;$('ivc').textContent=cap;$('iv').classList.add('open');},

  // Toast
  toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('open');setTimeout(()=>t.classList.remove('open'),3000);},

  // AR Scanner
  showAR(){
    let html=`<div style="padding:.8rem"><div style="color:#ce93d8;font-size:.9rem;margin-bottom:.6rem">📷 对准油田实物标记进行扫描，或点击下方标记图手动识别</div>
      <div style="display:flex;gap:.5rem;overflow-x:auto;padding:.5rem 0">`;
    AR_MARKS.forEach(m=>{
      const done=DATA.state.arScanned.includes(m.id);
      html+=`<img class="ar-thumb${done?' done':''}" src="${m.img}" alt="${m.name}" title="${m.name}" onclick="G.arDetect('${m.id}')">`;
    });
    html+=`</div></div>`;
    $('arb').innerHTML=html;$('ov-ar').classList.add('open');
  },

  arDetect(mid){
    const m=AR_MARKS.find(x=>x.id===mid);if(!m)return;
    if(!DATA.state.arScanned.includes(mid)){DATA.state.arScanned.push(mid);this.save();RE.onEvent('ar_scan',{markerId:mid,chapter:m.chapter});}
    this.toast(`📷 识别成功：${m.name}`);
    this.closeOv('ov-ar');
    this.showOv(`📷 ${m.name}`,`<div style="margin-bottom:.6rem">${m.desc}</div><div class="ar-badge">${m.clue}</div>`);
    setTimeout(()=>RE.checkDynamic(),500);
  },

  closeAR(){$('ov-ar').classList.remove('open');},

  // Dashboard
  showDash(){
    const s=DATA.state;const tc=Object.keys(DATA.cards).length;const tr=DATA.chapters.length;
    const ta=AR_MARKS.length;const qt=s.quizCorrect+s.quizWrong;
    const qr=qt>0?Math.round(s.quizCorrect/qt*100):0;
    const cr=Math.round(s.collectedCards.length/tc*100);
    const rr=Math.round(s.crackedRules.length/tr*100);
    const ar=Math.round(s.arScanned.length/ta*100);
    const chr=Math.min(100,Math.round((s.aiChats||0)/10*100));
    const ov=Math.round((cr+rr+ar+qr)/4);
    const lv=this.getLv(ov);const arch=this.getArch(cr,rr,ar,qr,chr);

    let html=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:.8rem">
      <div class="cc2" onclick="G.showRadar()" style="cursor:pointer"><div class="cn">五维评估</div><div class="ct">🎯 能力雷达图</div><div class="cs2">点击查看</div></div>
      <div class="cc2" onclick="G.showBar()" style="cursor:pointer"><div class="cn">进度追踪</div><div class="ct">📈 章节完成度</div><div class="cs2">点击查看</div></div>
      <div class="cc2" onclick="G.showPie()" style="cursor:pointer"><div class="cn">正确/错误</div><div class="ct">📊 答题分布</div><div class="cs2">点击查看</div></div>
      <div class="cc2" onclick="G.showGauge()" style="cursor:pointer"><div class="cn">${lv.grade}</div><div class="ct">🎖️ 综合评级</div><div class="cs2">点击查看</div></div></div>`;

    // KPI cards
    html+=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin-bottom:.8rem">
      <div style="text-align:center;padding:.6rem;background:rgba(66,165,245,.1);border-radius:6px"><div style="font-size:1.3rem;color:#42a5f5">${s.collectedCards.length}/${tc}</div><div style="font-size:.7rem;color:var(--gray)">线索收集</div></div>
      <div style="text-align:center;padding:.6rem;background:rgba(102,187,106,.1);border-radius:6px"><div style="font-size:1.3rem;color:#66bb6a">${s.crackedRules.length}/${tr}</div><div style="font-size:.7rem;color:var(--gray)">规则破解</div></div>
      <div style="text-align:center;padding:.6rem;background:rgba(255,167,38,.1);border-radius:6px"><div style="font-size:1.3rem;color:#ffa726">${qr}%</div><div style="font-size:.7rem;color:var(--gray)">答题正确率</div></div></div>`;

    // Player profile
    html+=`<div style="padding:.8rem;background:rgba(171,71,188,.08);border:1px solid rgba(171,71,188,.2);border-radius:8px;margin-bottom:.8rem">
      <div style="color:#ab47bc;font-weight:700;margin-bottom:.4rem">👤 学习画像：${arch.icon} ${arch.name}</div>
      <div>${arch.tags.map(t=>`<span class="ar-badge">${t}</span>`).join('')}</div></div>`;

    // Analysis
    const analysis=this.genAnalysis(cr,rr,ar,qr,chr,ov);
    html+=`<div style="padding:.8rem;background:rgba(66,165,245,.08);border:1px solid rgba(66,165,245,.2);border-radius:8px">
      <div style="color:#42a5f5;font-weight:700;margin-bottom:.4rem">🧠 AI 智能学习诊断</div>
      <p style="font-size:.82rem;line-height:1.8;margin-bottom:.4rem">${analysis.behavior}</p>
      <div style="font-size:.8rem;color:var(--gold)">💡 ${analysis.suggestions.join(' | ')}</div></div>`;

    $('dab').innerHTML=html;$('ov-da').classList.add('open');
  },

  getLv(o){if(o>=90)return{grade:'传奇',color:'#ffd700'};if(o>=75)return{grade:'卓越',color:'#81c784'};if(o>=50)return{grade:'优秀',color:'#64b5f6'};if(o>=25)return{grade:'进阶',color:'#ffb74d'};return{grade:'入门',color:'#e0e0e0'};},
  getArch(c,r,a,q,ch){const m=Math.max(c,r,a,q,ch);
    if(m===c)return{name:'探索型学者',icon:'🔍',tags:['主动探索','线索敏感','细节控']};
    if(m===r)return{name:'逻辑型破解者',icon:'🧩',tags:['规则洞察','推理强','目标导向']};
    if(m===a)return{name:'实践型观察者',icon:'👁️',tags:['AR热衷','实物关联','空间记忆']};
    if(m===q)return{name:'知识型答题者',icon:'📚',tags:['准确率高','记忆好','知识储备']};
    return{name:'社交型互动者',icon:'🗣️',tags:['AI对话','深度交流','表达欲强']};},

  genAnalysis(c,r,a,q,ch,ov){
    const dims=[{n:'线索收集',v:c},{n:'规则破解',v:r},{n:'AR扫描',v:a},{n:'答题能力',v:q},{n:'AI互动',v:ch}].sort((x,y)=>y.v-x.v);
    const top=dims[0],bot=dims[dims.length-1];
    let behavior=ov===0?'你刚刚开始这段学习旅程，所有数据维度都处于起步阶段。':
      ov>=80?`你的学习表现非常出色！在「${top.n}」维度展现了极强能力（${top.v}%）。`:
      ov>=50?`学习稳步推进中。「${top.n}」是最强项（${top.v}%），「${bot.n}」还有提升空间（${bot.v}%）。`:
      `你正处于探索初期。「${top.n}」已初见成效（${top.v}%），建议加强「${bot.n}」。`;
    const suggestions=[];
    if(c<60)suggestions.push('多点击场景热点收集线索');if(r<60)suggestions.push('与NPC对话寻找规则答案');
    if(a<60)suggestions.push('尝试AR扫描油田实物');if(q<60)suggestions.push('多参与答题挑战');
    if(ch<30)suggestions.push('与AI角色深入对话');
    if(!suggestions.length)suggestions.push('保持当前节奏','挑战更高难度');
    return{behavior,suggestions};},

  // SVG Charts
  showRadar(){
    const s=DATA.state;const tc=Object.keys(DATA.cards).length;const tr=DATA.chapters.length;const ta=AR_MARKS.length;
    const qt=s.quizCorrect+s.quizWrong;const qr=qt>0?Math.round(s.quizCorrect/qt*100):0;
    const data=[Math.round(s.collectedCards.length/tc*100),Math.round(s.crackedRules.length/tr*100),Math.round(s.arScanned.length/ta*100),qr,Math.min(100,Math.round((s.aiChats||0)/10*100))];
    this.showOv('🎯 能力雷达图',`<div id="rv-chart" style="display:flex;justify-content:center"></div>`);
    setTimeout(()=>this.drawRadar('rv-chart',data),50);
  },

  drawRadar(id,data){
    const c=$(id);if(!c)return;const w=300,h=280,cx=150,cy=140,R=100;const labels=['探索力','逻辑力','观察力','知识力','互动深度'];const colors=['#42a5f5','#66bb6a','#ab47bc','#ffa726','#26c6da'];const n=5;
    let grid='',axs='',lbl='',pts='',dots='';
    for(let l=1;l<=4;l++){let p='';for(let i=0;i<n;i++){const a=Math.PI*2*i/n-Math.PI/2;const r=R*l/4;p+=`${cx+Math.cos(a)*r},${cy+Math.sin(a)*r} `;}
      grid+=`<polygon points="${p.trim()}" fill="none" stroke="rgba(66,165,245,${0.1+l*0.05})" stroke-width="1"/>`;}
    for(let i=0;i<n;i++){const a=Math.PI*2*i/n-Math.PI/2;axs+=`<line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(a)*R}" y2="${cy+Math.sin(a)*R}" stroke="rgba(66,165,245,.15)"/>`;
      const lx=cx+Math.cos(a)*(R+22),ly=cy+Math.sin(a)*(R+22);lbl+=`<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" fill="${colors[i]}" font-size="11" font-weight="bold">${labels[i]}</text>`;}
    data.forEach((v,i)=>{const a=Math.PI*2*i/n-Math.PI/2;const r=R*Math.min(v,100)/100;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;pts+=`${x},${y} `;dots+=`<circle cx="${x}" cy="${y}" r="4" fill="${colors[i]}" stroke="#fff" stroke-width="1.5"/>`;});
    c.innerHTML=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${grid}${axs}<polygon points="${pts}" fill="rgba(66,165,245,.2)" stroke="#42a5f5" stroke-width="2"/>${dots}<circle cx="${cx}" cy="${cy}" r="3" fill="#42a5f5"/>${lbl}</svg>`;
  },

  showBar(){
    this.showOv('📈 章节完成度',`<div id="bar-chart" style="display:flex;justify-content:center"></div>`);
    setTimeout(()=>this.drawBar('bar-chart'),50);
  },

  drawBar(id){
    const c=$(id);if(!c)return;const w=320,h=200;const chs=['序章','第一章','第二章','第三章','第四章'];const cols=['#90a4ae','#42a5f5','#ffa726','#ef5350','#66bb6a'];
    const prog=chs.map((_,i)=>{const ch=DATA.chapters[i];const tc=ch.hotspots.filter(h=>h.type==='clue').length;
      const cc=DATA.state.collectedCards.filter(cid=>ch.hotspots.some(h=>h.cardId===cid)).length;
      return tc>0?Math.round(cc/tc*100):0;});
    const bW=42,gap=14,sX=(w-(bW*5+gap*4))/2,mH=h-50,bl=h-20;
    let bars='';chs.forEach((l,i)=>{const bh=mH*Math.min(prog[i],100)/100;const bx=sX+i*(bW+gap);const by=bl-bh;
      bars+=`<rect x="${bx}" y="${by}" width="${bW}" height="${bh}" fill="${cols[i]}" rx="3"/>
        <text x="${bx+bW/2}" y="${by-6}" text-anchor="middle" fill="#fff" font-size="11" font-weight="bold">${prog[i]}%</text>
        <text x="${bx+bW/2}" y="${bl+14}" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="9">${l}</text>`;});
    c.innerHTML=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${bars}</svg>`;
  },

  showPie(){
    this.showOv('📊 答题分布',`<div id="pie-chart" style="display:flex;justify-content:center"></div>`);
    setTimeout(()=>this.drawPie('pie-chart',DATA.state.quizCorrect,DATA.state.quizWrong),50);
  },

  drawPie(id,correct,wrong){
    const c=$(id);if(!c)return;const w=240,h=240,cx=120,cy=110,r=80;const total=correct+wrong;
    if(total===0){c.innerHTML=`<svg width="${w}" height="${h}"><text x="${cx}" y="${cy}" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="12">暂无答题数据</text></svg>`;return;}
    const ca=(correct/total)*Math.PI*2,wa=(wrong/total)*Math.PI*2;
    const c1x=cx+Math.cos(-Math.PI/2)*r,c1y=cy+Math.sin(-Math.PI/2)*r;
    const c2x=cx+Math.cos(-Math.PI/2+ca)*r,c2y=cy+Math.sin(-Math.PI/2+ca)*r;
    const c3x=cx+Math.cos(-Math.PI/2+ca+wa)*r,c3y=cy+Math.sin(-Math.PI/2+ca+wa)*r;
    const rate=Math.round(correct/total*100);
    let paths=correct>0?`<path d="M${cx},${cy} L${c1x},${c1y} A${r},${r} 0 ${ca>Math.PI?1:0},1 ${c2x},${c2y} Z" fill="#66bb6a"/>`:'';
    paths+=wrong>0?`<path d="M${cx},${cy} L${c2x},${c2y} A${r},${r} 0 ${wa>Math.PI?1:0},1 ${c3x},${c3y} Z" fill="#ef5350"/>`:'';
    c.innerHTML=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${paths}
      <text x="${cx}" y="${cy-4}" text-anchor="middle" fill="#fff" font-size="18" font-weight="bold">${rate}%</text>
      <text x="${cx}" y="${cy+12}" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="10">正确率</text>
      <rect x="${cx-40}" y="${cy+30}" width="10" height="10" fill="#66bb6a" rx="2"/><text x="${cx-27}" y="${cy+39}" fill="#fff" font-size="10">正确 ${correct}</text>
      <rect x="${cx+15}" y="${cy+30}" width="10" height="10" fill="#ef5350" rx="2"/><text x="${cx+28}" y="${cy+39}" fill="#fff" font-size="10">错误 ${wrong}</text></svg>`;
  },

  showGauge(){
    const s=DATA.state;const tc=Object.keys(DATA.cards).length;const tr=DATA.chapters.length;const ta=AR_MARKS.length;
    const qt=s.quizCorrect+s.quizWrong;const qr=qt>0?Math.round(s.quizCorrect/qt*100):0;
    const ov=Math.round((Math.round(s.collectedCards.length/tc*100)+Math.round(s.crackedRules.length/tr*100)+Math.round(s.arScanned.length/ta*100)+qr)/4);
    const lv=this.getLv(ov);
    this.showOv(`🎖️ 综合评级 - ${lv.grade}`,`<div id="gauge-chart" style="display:flex;justify-content:center"></div>`);
    setTimeout(()=>this.drawGauge('gauge-chart',ov,lv),50);
  },

  drawGauge(id,value,lv){
    const c=$(id);if(!c)return;const r=60,sw=10,cx=80,cy=75;const circ=2*Math.PI*r;const off=circ*(1-value/100);
    c.innerHTML=`<svg width="160" height="150" viewBox="0 0 160 150">
      <defs><linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${lv.color};stop-opacity:.3"/><stop offset="100%" style="stop-color:${lv.color};stop-opacity:1"/></linearGradient></defs>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="${sw}"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#gg)" stroke-width="${sw}" stroke-dasharray="${circ}" stroke-dashoffset="${off}" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})" style="transition:stroke-dashoffset 1.5s ease"/>
      <text x="${cx}" y="${cy-5}" text-anchor="middle" fill="#fff" font-size="22" font-weight="bold">${value}</text>
      <text x="${cx}" y="${cy+12}" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10">综合评分</text>
      <text x="${cx}" y="${cy+30}" text-anchor="middle" fill="${lv.color}" font-size="14" font-weight="bold">${lv.grade}</text></svg>`;
  },

  // Rule Engine Panel
  showEng(){
    const s=DATA.state;const tc=Object.keys(DATA.cards).length;
    const cr=Math.round(s.collectedCards.length/tc*100);
    const rr=Math.round(s.crackedRules.length/DATA.chapters.length*100);
    const ar=Math.round(s.arScanned.length/AR_MARKS.length*100);
    const qt=s.quizCorrect+s.quizWrong;const qr=qt>0?Math.round(s.quizCorrect/qt*100):0;
    const chr=Math.min(100,Math.round((s.aiChats||0)/10*100));
    const arch=this.getArch(cr,rr,ar,qr,chr);
    const rules=RE.state.dynamicRules;

    let html=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:.8rem">
      <div style="padding:.6rem;background:rgba(171,71,188,.08);border:1px solid rgba(171,71,188,.2);border-radius:6px">
        <div style="color:var(--gray);font-size:.72rem">学习画像</div><div style="color:#ab47bc;font-weight:700">${arch.icon} ${arch.name}</div></div>
      <div style="padding:.6rem;background:rgba(171,71,188,.08);border:1px solid rgba(171,71,188,.2);border-radius:6px">
        <div style="color:var(--gray);font-size:.72rem">风险偏好</div><div style="color:#ab47bc;font-weight:700">${RE.state.playerProfile.riskTolerance>=0.7?'激进型':RE.state.playerProfile.riskTolerance>=0.4?'平衡型':'保守型'}</div></div></div>`;

    html+=`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem;margin-bottom:.8rem">
      <div style="text-align:center;padding:.5rem;background:rgba(66,165,245,.1);border-radius:6px"><div style="font-size:1.2rem;color:#42a5f5">${s.collectedCards.length}</div><div style="font-size:.68rem;color:var(--gray)">线索</div></div>
      <div style="text-align:center;padding:.5rem;background:rgba(102,187,106,.1);border-radius:6px"><div style="font-size:1.2rem;color:#66bb6a">${s.crackedRules.length}</div><div style="font-size:.68rem;color:var(--gray)">规则</div></div>
      <div style="text-align:center;padding:.5rem;background:rgba(171,71,188,.1);border-radius:6px"><div style="font-size:1.2rem;color:#ab47bc">${s.arScanned.length}</div><div style="font-size:.68rem;color:var(--gray)">AR</div></div>
      <div style="text-align:center;padding:.5rem;background:rgba(255,167,38,.1);border-radius:6px"><div style="font-size:1.2rem;color:#ffa726">${qr}%</div><div style="font-size:.68rem;color:var(--gray)">正确率</div></div></div>`;

    if(rules.length>0){
      html+=`<div style="color:#ab47bc;font-weight:700;margin-bottom:.4rem">✨ 动态规则 (${rules.length})</div>`;
      rules.forEach(r=>{html+=`<div style="background:rgba(255,215,0,.08);border:1px solid rgba(255,215,0,.2);border-radius:6px;padding:.6rem;margin-bottom:.4rem"><div style="color:#ffd700;font-weight:700;font-size:.82rem">📜 ${r.text}</div></div>`;});
    }else{
      html+=`<div style="text-align:center;color:var(--gray);padding:1rem;font-size:.85rem">还没有触发动态规则，继续探索游戏吧！</div>`;
    }

    html+=`<div style="margin-top:.8rem;padding:.6rem;background:rgba(66,165,245,.08);border:1px solid rgba(66,165,245,.2);border-radius:6px">
      <div style="color:#42a5f5;font-weight:700;margin-bottom:.3rem;font-size:.82rem">🎲 规则触发条件</div>
      <ul style="color:var(--paper);font-size:.78rem;margin:0;padding-left:1rem;line-height:1.8">
        <li>收集3张钻井相关卡片 → AI生成规则</li><li>收集3张铁人相关卡片 → AI生成规则</li>
        <li>收集3张会战相关卡片 → AI生成规则</li><li>答题正确率>80% → AI生成规则</li>
        <li>收集>80%线索 → AI生成规则</li></ul></div>`;

    $('enb').innerHTML=html;$('ov-en').classList.add('open');
  },

  // AR Link - 同步码模式
  showLink(){
    let html=`<div style="text-align:center;padding:.8rem">
      <div style="font-size:2.5rem;margin-bottom:.6rem">📱</div>
      <div style="color:var(--gold);font-weight:700;margin-bottom:.4rem">AR实景联动</div>
      <div style="color:var(--gray);font-size:.82rem;margin-bottom:.8rem;line-height:1.6">用手机扫描AR卡片，获取同步码输入到电脑端即可触发AR剧情</div>
      <div style="background:rgba(255,255,255,.05);border-radius:8px;padding:.8rem;margin-bottom:.6rem;text-align:left">
        <div style="color:var(--paper);font-size:.82rem;margin-bottom:.5rem;font-weight:600">📋 使用步骤：</div>
        <div style="color:var(--gray);font-size:.78rem;line-height:1.8">
          1. 手机浏览器打开本站 ar_scan.html 页面<br>
          2. 对准AR卡片扫描，获取同步码<br>
          3. 在下方输入同步码，点击确认
        </div>
      </div>
      <div style="background:rgba(255,255,255,.05);border-radius:8px;padding:.8rem;margin-bottom:.6rem">
        <div style="color:var(--paper);font-size:.82rem;margin-bottom:.5rem">🔑 输入同步码</div>
        <div style="display:flex;gap:.4rem">
          <input id="sync-code-input" style="flex:1;background:#000;border:2px solid var(--gold);border-radius:6px;color:#0f0;font-family:monospace;font-size:.9rem;padding:.5rem .7rem;letter-spacing:.15rem" placeholder="输入手机端获取的同步码" onkeypress="if(event.key==='Enter')G.inputSync()">
          <button class="btn btn-p" style="white-space:nowrap" onclick="G.inputSync()">确认</button>
        </div>
      </div>
      <div style="margin-top:.6rem">
        <div style="color:var(--gray);font-size:.75rem">已扫描：${DATA.state.arScanned.length}/${AR_MARKS.length}</div>
        <div style="display:flex;gap:.3rem;flex-wrap:wrap;margin-top:.4rem">`;
    AR_MARKS.forEach(m=>{
      const done=DATA.state.arScanned.includes(m.id);
      html+=`<span class="ar-badge" style="${done?'border-color:#4caf50;color:#81c784':''}">${done?'✓':''}${m.name}</span>`;
    });
    html+=`</div></div></div>`;
    $('lkb').innerHTML=html;$('ov-lk').classList.add('open');
  },

  inputSync(){
    const input=document.getElementById('sync-code-input');
    if(!input)return;
    const code=input.value.trim().toUpperCase();
    if(!code){this.toast('❌ 请输入同步码');return;}
    // 解析同步码格式：AR-1-3-5 或 AR1 AR3 AR5 或 1,3,5
    let ids=[];
    if(code.startsWith('AR')){
      // 格式：AR-1-3-5 或 AR1AR3AR5
      const nums=code.replace(/AR/g,'-').split(/[-,\s]+/).filter(s=>s&&s!=='');
      nums.forEach(n=>{const i=parseInt(n);if(i>=1&&i<=AR_MARKS.length)ids.push('ar'+i);});
    }else{
      // 格式：1,3,5 或 1 3 5
      code.split(/[,,\s]+/).forEach(n=>{const i=parseInt(n);if(i>=1&&i<=AR_MARKS.length)ids.push('ar'+i);});
    }
    if(ids.length===0){this.toast('❌ 无效的同步码');return;}
    let newCount=0;
    ids.forEach(mid=>{
      if(!DATA.state.arScanned.includes(mid)){
        DATA.state.arScanned.push(mid);
        newCount++;
        const m=AR_MARKS.find(x=>x.id===mid);
        if(m)RE.onEvent('ar_scan',{markerId:mid,chapter:m.chapter});
      }
    });
    this.save();
    if(newCount>0){
      this.toast(`📷 成功同步 ${newCount} 个AR标记！`);
      this.closeOv('ov-lk');
      // 显示最后一个新扫描的标记详情
      const lastId=ids[ids.length-1];
      const m=AR_MARKS.find(x=>x.id===lastId);
      if(m)this.showOv(`📷 ${m.name}`,`<div style="margin-bottom:.6rem">${m.desc}</div><div class="ar-badge">${m.clue}</div>`);
      this.showLink();// 刷新面板
    }else{
      this.toast('这些AR标记已经扫描过了');
    }
  }
};

// ========== RULE ENGINE ==========
const RE={
  state:{playerProfile:{archetype:'explorer',riskTolerance:0.5,engagement:0},dynamicRules:[],branchHistory:[],lastAction:null},

  onEvent(type,data){
    this.state.lastAction={type,time:Date.now(),data};this.state.branchHistory.push(this.state.lastAction);
    if(type==='card_collect')this.onCardCollect(data);
    else if(type==='quiz_answer')this.onQuizAnswer(data);
    else if(type==='ar_scan')this.onArScan(data);
    else if(type==='npc_talk'){DATA.state.aiChats=(DATA.state.aiChats||0)+1;}
    this.updateProfile();G.save();
  },

  onCardCollect(d){
    const c=DATA.state.collectedCards.length;
    if(c===3){G.toast('🎯 动态规则：收集3张线索卡！解锁隐藏线索');this.addRule('geology_bonus','地质爱好者加成：地质相关题目得分+20%');}
    if(c===6){G.toast('🔀 剧情分支：深度调查者路线！');this.state.playerProfile.archetype='investigator';}
  },

  onQuizAnswer(d){
    const total=DATA.state.quizCorrect+DATA.state.quizWrong;const rate=total>0?DATA.state.quizCorrect/total:0;
    if(d.correct&&this.consecCorrect()>=3){G.toast('🏆 连击奖励：连续答对3题！');this.addRule('streak_bonus','连击加成：连续正确答题奖励翻倍');}
    if(total>=5&&rate<0.4){G.toast('💡 难度调整：已降低部分题目难度');this.addRule('easy_mode','学习辅助：增加背景提示');}
    if(total>=5&&rate>0.8){G.toast('⚡ 挑战解锁：已解锁专家模式');this.addRule('expert_mode','专家挑战：解锁高难度隐藏题目');}
  },

  onArScan(d){
    const c=DATA.state.arScanned.length;
    if(c===2){G.toast('🔗 虚实联动：扫描2个实物！触发联动剧情');this.addRule('ar_link','AR联动：扫描实物可解锁组合剧情');}
    if(c===AR_MARKS.length){G.toast('🌟 终极解锁：扫描全部实物！');this.addRule('master_ar','AR大师：所有AR扫描奖励翻倍');}
  },

  consecCorrect(){let c=0;for(let i=this.state.branchHistory.length-1;i>=0;i--){const h=this.state.branchHistory[i];if(h.type==='quiz_answer'&&h.data.correct)c++;else if(h.type==='quiz_answer')break;}return c;},

  addRule(id,text){if(!this.state.dynamicRules.find(r=>r.id===id))this.state.dynamicRules.push({id,text,created:Date.now()});},

  updateProfile(){const s=DATA.state;const t=s.quizCorrect+s.quizWrong;
    if(t>0)this.state.playerProfile.engagement=Math.min(1,(s.collectedCards.length/15+s.crackedRules.length/4+s.arScanned.length/6+t/10)/4);},

  // Dynamic Rule Check (DeepSeek API)
  async checkDynamic(){
    const conds={
      drill_cards:{cards:['c_drill','c_core','c_telegram'],desc:'收集钻井相关线索'},
      ironman_cards:{cards:['c_blowout','c_mud','c_honor'],desc:'收集铁人相关线索'},
      battle_cards:{cards:['c_gandalai','c_carry','c_battle'],desc:'收集会战相关线索'},
      quiz_master:{cond:()=>{const t=DATA.state.quizCorrect+DATA.state.quizWrong;return t>=3&&(DATA.state.quizCorrect/t)>0.8;},desc:'答题正确率超过80%'},
      collect_all:{cond:()=>DATA.state.collectedCards.length>=Object.keys(DATA.cards).length*0.8,desc:'收集80%以上线索'}
    };
    for(const[key,cond]of Object.entries(conds)){
      if(DATA.state.dynamicRules.includes(key))continue;
      let triggered=false;
      if(cond.cards){triggered=cond.cards.every(cid=>DATA.state.collectedCards.includes(cid));}
      else if(cond.cond){try{triggered=cond.cond();}catch(e){}}
      if(triggered){
        DATA.state.dynamicRules.push(key);G.save();
        try{
          const chTitles=['序章','第一章','第二章','第三章','第四章'];
          const prompt=`你是一个规则怪谈游戏的规则生成器。玩家进度：章节${chTitles[DATA.state.currentChapter]}，收集线索${DATA.state.collectedCards.length}，答题正确${DATA.state.quizCorrect}，已破解规则${DATA.state.crackedRules.length}，触发条件：${cond.desc}。请生成一条规则怪谈风格的规则，格式：【规则名称】具体规则内容，结合大庆油田历史，有紧张感和神秘感，20-50字，只返回规则本身。`;
          const res=await fetch(AB+'/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+AK},
            body:JSON.stringify({model:'deepseek-chat',messages:[{role:'user',content:prompt}],temperature:0.9,max_tokens:100})});
          if(res.ok){const data=await res.json();let rule=data.choices[0].message.content.trim();rule=rule.replace(/^[`"']+/,'').replace(/[`"']+$/,'');
            this.addRule(key,rule);G.toast('⚡ 动态规则触发：'+rule);}
          else throw new Error('API error');
        }catch(e){
          const fb={drill_cards:'【油田迷雾规则】你必须在限定时间内破解谜题。',ironman_cards:'【铁人精神规则】勇敢面对挑战，决心决定结果。',battle_cards:'【会战挑战规则】团队协作，共同前进。',quiz_master:'【知识大师规则】隐藏剧情已解锁！',collect_all:'【终极探索规则】真相已触手可及！'};
          this.addRule(key,fb[key]||fb.drill_cards);G.toast('⚡ 动态规则触发：'+(fb[key]||fb.drill_cards));
        }
      }
    }
  }
};

// ========== KEYBOARD ==========
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){G.closeOv();G.endDlg();G.closeAI();
    ['ov-ch','ov-dn','ov-ed','ov-ar','ov-da','ov-en','ov-lk'].forEach(id=>$(id).classList.remove('open'));
    $('iv').classList.remove('open');}
});

// ========== INIT ON LOAD ==========
window.addEventListener('load',()=>G.init());
