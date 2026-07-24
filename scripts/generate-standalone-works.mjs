import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = join(siteRoot, "public", "works");

if (!outputRoot.endsWith("/public/works")) {
  throw new Error(`Refusing to replace unexpected output path: ${outputRoot}`);
}

const item = (title, meta, badge = "", price = "") => ({ title, meta, badge, price });
const page = (id, label, kind, title, items, subtitle = "") => ({ id, label, kind, title, items, subtitle });

const projects = [
  {
    slug: "hej", workId: "WORK-0196", name: "禾匠商城", version: "v4.4.45", category: "电商零售",
    accent: "#ff4544", soft: "#fff0ef", ink: "#2b1111", flavor: "commerce",
    hero: "秋日生活提案", sub: "DIY 首页 · 会员日满 299 减 40",
    source: "pages/index/index + app-index 商品组件",
    asset: "/tmp/source-audit-260610/extracted/0901/后端全开源/plugins/diy/down/img/615112ec2dc3e3b0b8aaa9b0b93bd4f0.png",
    menu: ["全部分类", "领券中心", "限时秒杀", "会员中心"],
    featured: [item("柔软家居毯", "居家生活 · 4.9 分", "新品", "¥129"), item("轻量通勤包", "服装配饰 · 1,286 人喜欢", "热卖", "¥239"), item("智能香薰灯", "数码家居 · 今日上新", "会员价", "¥89")],
    routes: [
      page("home", "首页", "home", "禾匠商城", []),
      page("category", "分类", "catalog", "商品分类", [item("居家生活", "326 件商品"), item("数码电器", "218 件商品"), item("服装配饰", "642 件商品"), item("美妆个护", "185 件商品")]),
      page("cart", "购物车", "cart", "购物车", [item("柔软家居毯", "米白色 · 1 件", "", "¥129"), item("智能香薰灯", "暖光款 · 1 件", "", "¥89")]),
      page("profile", "我的", "profile", "会员中心", [item("优惠券", "5 张可用"), item("收藏夹", "12 件商品"), item("收货地址", "2 个地址"), item("售后服务", "退款与换货")]),
    ],
  },
  {
    slug: "wmall", workId: "WORK-0157", name: "啦啦外卖", version: "v19.9.0", category: "餐饮外卖",
    accent: "#ff2d4b", soft: "#fff0f3", ink: "#2e1015", flavor: "delivery",
    hero: "附近好味道，准时送到", sub: "软件园二期 · 预计 28 分钟送达",
    source: "pages/home/index + pages/order + pages/paotui",
    asset: "/tmp/source-audit-260610/extracted/0870/啦啦外卖餐饮跑腿小程序 we7_wmall 19.9.0/后端/addons/we7_wmall/static/img/purview/wxapp-store-single.png",
    menu: ["美食外卖", "优惠专区", "限时抢购", "到店自取"],
    featured: [item("川味小馆", "月售 1,260 · 28 分钟", "满30减8", "起送 ¥20"), item("一碗好面", "月售 842 · 22 分钟", "新客立减", "起送 ¥15"), item("茶不思", "评分 4.9 · 配送 ¥3", "品牌", "起送 ¥10")],
    routes: [
      page("home", "首页", "home", "附近外卖", []),
      page("orders", "订单", "orders", "我的订单", [item("川味小馆", "配送中 · 骑手距你 1.2km", "进行中", "¥42"), item("一碗好面", "已完成 · 7 月 23 日", "再来一单", "¥28")]),
      page("errand", "跑腿", "errand", "万能跑腿", [item("帮我买", "附近商超、药店都能买"), item("帮我送", "文件、鲜花、蛋糕即取即送"), item("同城急送", "平均 35 分钟送达")]),
      page("profile", "我的", "profile", "我的外卖", [item("红包", "5 个待使用"), item("收藏商家", "8 家"), item("我的地址", "软件园二期"), item("客服中心", "订单售后")]),
    ],
  },
  {
    slug: "jobs", workId: "WORK-0503", name: "求职招聘", version: "v4.1.89", category: "企业品牌",
    accent: "#0180cf", soft: "#eaf5fc", ink: "#09263a", flavor: "career",
    hero: "找到真正适合你的工作", sub: "厦门 · 已有 3,286 家企业入驻",
    source: "index_0 / index_1 + findjob + findworker",
    asset: join(siteRoot, "public/source-assets/jobs/male0.png"),
    menu: ["最新职位", "名企招聘", "附近工作", "简历诊断"],
    featured: [item("高级产品设计师", "创意科技 · 五险一金", "急聘", "25–40K"), item("前端工程师", "云海网络 · 双休", "3年经验", "20–35K"), item("内容策划", "新媒体实验室 · 地铁口", "应届可投", "10–18K")],
    routes: [
      page("home", "首页", "home", "招聘首页", []),
      page("jobs", "找工作", "jobs", "推荐职位", [item("高级产品设计师", "创意科技 · 厦门", "急聘", "25–40K"), item("前端工程师", "云海网络 · 思明区", "双休", "20–35K"), item("增长运营", "微光互动 · 湖里区", "餐补", "15–24K")]),
      page("talent", "找人才", "people", "优秀人才", [item("陈同学", "产品设计 · 3 年经验", "在线"), item("周设计", "视觉设计 · 作品集完整", "可聊"), item("林工程师", "前端开发 · 本科", "在职")]),
      page("profile", "我的", "profile", "求职中心", [item("我的简历", "完整度 86%"), item("投递记录", "12 条"), item("面试邀请", "3 个待确认"), item("企业中心", "切换招聘身份")]),
    ],
  },
  {
    slug: "live", workId: "WORK-0719", name: "小智微直播", version: "v3.9.5", category: "文娱内容",
    accent: "#8484b7", soft: "#efeff8", ink: "#202039", flavor: "media",
    hero: "城市篮球挑战赛", sub: "决赛直播中 · 8,426 人观看",
    source: "movieIndex + movie + cash-money",
    asset: join(siteRoot, "public/source-assets/live/cover.jpg"),
    menu: ["热门直播", "体育频道", "音乐现场", "节目单"],
    featured: [item("城市篮球挑战赛", "直播中 · 体育频道", "LIVE"), item("独立音乐现场", "20:30 开始 · 1,204 人预约", "预约"), item("旅行纪录片首映", "明日 19:00", "预告")],
    routes: [
      page("live", "直播", "live", "正在直播", [item("城市篮球挑战赛", "8,426 人在线", "LIVE"), item("街头音乐会", "2,105 人在线", "LIVE")]),
      page("channels", "频道", "channels", "频道发现", [item("体育", "32 场直播"), item("音乐", "18 场直播"), item("旅行", "24 场直播"), item("生活方式", "41 场直播")]),
      page("favorites", "收藏", "favorites", "我的收藏", [item("城市篮球挑战赛", "已开播", "播放"), item("独立音乐现场", "20:30 开始", "已预约")]),
      page("profile", "我的", "profile", "直播账户", [item("观看历史", "28 条"), item("我的预约", "6 场"), item("余额", "¥86.00"), item("开播中心", "申请成为主播")]),
    ],
  },
  {
    slug: "travel", workId: "WORK-0461", name: "景区旅游", version: "v5.5.6", category: "旅游出行",
    accent: "#1fa98f", soft: "#e8f7f3", ink: "#0b3029", flavor: "scenic",
    hero: "山水之间，自在出发", sub: "国家级旅游景区 · 今日可预约",
    source: "hawk_scenic/pages/index + cart + order + member",
    asset: "/tmp/source-audit-260610/extracted/0853/景区旅游行业小程序 hawk_scenic 5.5.6 安装更新一体包/前端/wxapp/hawk_scenic/resource/images/default_swiper.jpg",
    menu: ["景区门票", "游玩攻略", "地图导览", "扫码入园"],
    featured: [item("云顶景区成人票", "今日可用 · 已售 2,860", "热卖", "¥98"), item("森林索道往返票", "随买随用 · 已售 1,542", "推荐", "¥68"), item("亲子畅玩套票", "2 大 1 小", "家庭", "¥198")],
    routes: [
      page("home", "首页", "home", "景区首页", []),
      page("cart", "购物车", "cart", "购票车", [item("云顶景区成人票", "7 月 25 日 · 1 张", "", "¥98"), item("森林索道往返票", "7 月 25 日 · 1 张", "", "¥68")]),
      page("orders", "我的订单", "orders", "门票订单", [item("云顶景区成人票", "待使用 · 入园码已生成", "查看码", "¥98"), item("森林露营体验", "已完成 · 7 月 18 日", "评价", "¥168")]),
      page("profile", "会员中心", "profile", "景区会员", [item("游客信息", "2 位常用游客"), item("收藏景区", "6 个"), item("会员权益", "银卡会员"), item("在线客服", "09:00–21:00")]),
    ],
  },
  {
    slug: "health", workId: "WORK-0642", name: "医疗小程序", version: "v6.0.0", category: "生活服务",
    accent: "#16c95e", soft: "#eaf9f0", ink: "#113323", flavor: "health",
    hero: "今天，想咨询什么？", sub: "7 × 24 小时专业医疗服务",
    source: "hyb_yl/index + tijian + doctor + patient",
    asset: "/tmp/source-audit-260610/extracted/0761/医疗小程序 hyb_yl 6.0.0/后端/hyb_yl/preview-custom.jpg",
    menu: ["在线问诊", "预约挂号", "体检预约", "健康档案"],
    featured: [item("刘医生", "全科医学 · 主任医师", "可预约"), item("儿童发热咨询", "平均 3 分钟接诊", "热门"), item("入职体检套餐", "三甲医院 · 报告可查", "本周可约", "¥199")],
    routes: [
      page("home", "首页", "home", "医疗服务", []),
      page("doctors", "问诊", "doctors", "在线医生", [item("刘医生", "全科医学 · 已服务 2,408 人", "可预约"), item("陈医生", "儿科 · 已服务 1,826 人", "在线"), item("周医生", "皮肤科 · 三甲医院", "明日可约")]),
      page("checkup", "体检", "checkup", "体检预约", [item("入职基础体检", "12 项检查 · 电子报告", "本周可约", "¥199"), item("女性健康筛查", "18 项检查 · 专家解读", "推荐", "¥399")]),
      page("profile", "我的", "profile", "健康中心", [item("健康档案", "最近更新 7 月 20 日"), item("我的预约", "2 条"), item("体检报告", "1 份待查看"), item("关注医生", "4 位")]),
    ],
  },
  {
    slug: "estate", workId: "WORK-0287", name: "掌门智慧房产", version: "v1.3.27", category: "房产家居",
    accent: "#1aae91", soft: "#e8f8f4", ink: "#10362f", flavor: "property",
    hero: "好房不等人", sub: "厦门 · 全城 1,286 套房源",
    source: "zm_house/pages/index + house detail + broker",
    asset: join(siteRoot, "public/source-assets/archive/estate.webp"),
    menu: ["新房", "二手房", "租房", "地图找房"],
    featured: [item("云栖湖畔 · 三居", "湖里区 · 108㎡", "新房", "¥468万"), item("软件园品质公寓", "思明区 · 68㎡", "地铁房", "¥298万"), item("鹭岛中央大宅", "集美区 · 132㎡", "改善", "¥520万")],
    routes: [
      page("home", "首页", "home", "智慧房产", []),
      page("property", "找房", "property", "全城房源", [item("云栖湖畔 · 三居", "湖里区 · 108㎡ · 南北通透", "新房", "¥468万"), item("软件园品质公寓", "思明区 · 68㎡ · 近地铁", "二手房", "¥298万"), item("海沧湾景两居", "海沧区 · 89㎡ · 精装修", "随时看", "¥326万")]),
      page("agents", "经纪人", "agents", "置业顾问", [item("林顾问", "从业 8 年 · 熟悉思明区", "在线"), item("陈顾问", "本月成交 12 套", "金牌"), item("周顾问", "新房专家 · 响应快速", "可咨询")]),
      page("profile", "我的", "profile", "我的找房", [item("预约看房", "2 个待确认"), item("关注房源", "8 套"), item("找房需求", "总价 300–500 万"), item("浏览记录", "最近 26 套")]),
    ],
  },
  {
    slug: "renovation", workId: "WORK-0276", name: "麦芒装饰装修 DIY", version: "v3.2.59", category: "房产家居",
    accent: "#00cc99", soft: "#e6faf5", ink: "#073c31", flavor: "design",
    hero: "把理想家装进现实", sub: "上传户型，免费获取 3 套方案",
    source: "pages/index + zero + calculator + building_details",
    asset: join(siteRoot, "public/source-assets/archive/renovation.webp"),
    menu: ["效果图", "找设计师", "装修报价", "VR 全景"],
    featured: [item("原木治愈两居", "89㎡ · 全屋设计", "热门"), item("轻法式主卧", "奶油色系 · 软装清单", "收藏 328"), item("极简通透客厅", "小户型显大方案", "VR")],
    routes: [
      page("home", "首页", "home", "装修灵感", []),
      page("gallery", "效果图", "gallery", "设计案例", [item("原木治愈两居", "89㎡ · 原木风", "720°全景"), item("轻法式主卧", "112㎡ · 轻法式", "新品"), item("极简通透客厅", "68㎡ · 现代简约", "热门")]),
      page("calculator", "计算器", "calculator", "装修报价", [item("建筑面积", "请输入房屋面积"), item("装修档次", "舒适型"), item("所在城市", "厦门")]),
      page("profile", "我的", "profile", "装修档案", [item("我的户型", "2 个方案"), item("预约设计", "1 个待确认"), item("收藏案例", "16 套"), item("报价记录", "最近 3 次")]),
    ],
  },
  {
    slug: "course", workId: "WORK-0437", name: "知识付费在线课程", version: "v7.1.2", category: "教育知识",
    accent: "#6686e4", soft: "#eef1ff", ink: "#1d2852", flavor: "learning",
    hero: "今天学点新东西", sub: "68 门体系课正在更新",
    source: "kuowan_video/pages/index + audiomenu + videomenu",
    asset: join(siteRoot, "public/source-assets/archive/course.webp"),
    menu: ["热门", "导师", "免费", "精美图文"],
    featured: [item("设计思维入门", "12 课时 · 已学 36%", "继续学习"), item("零基础短视频课", "18 课时 · 4.9 分", "热门"), item("高效表达训练营", "导师直播答疑", "新课")],
    routes: [
      page("home", "首页", "home", "在线课程", []),
      page("audio", "音频", "audio", "音频课程", [item("商业洞察 30 讲", "已更新 18 期 · 12.6 万播放", "订阅"), item("睡前心理学", "每晚 10 分钟", "免费"), item("表达力训练", "24 期 · 附讲义", "热门")]),
      page("video", "视频", "video", "视频课程", [item("设计思维入门", "12 课时 · 高清视频", "继续学习"), item("零基础短视频课", "18 课时 · 作业点评", "热门"), item("个人品牌增长", "9 课时 · 案例实战", "新课")]),
      page("profile", "我的", "profile", "学习中心", [item("已购课程", "8 门"), item("学习记录", "连续学习 12 天"), item("我的收藏", "26 条"), item("下载内容", "4 个离线课程")]),
    ],
  },
  {
    slug: "answer", workId: "WORK-0435", name: "知乎答题王", version: "v2.1.6", category: "教育知识",
    accent: "#7d37e3", soft: "#f2eaff", ink: "#261044", flavor: "game",
    hero: "知识王者挑战赛", sub: "黄金 III · 本赛季 12,408 人参赛",
    source: "hc_answer/pages/index + rank + question + reward",
    asset: join(siteRoot, "public/source-assets/archive/answer.webp"),
    menu: ["快速匹配", "好友对战", "每日一题", "赛季奖励"],
    featured: [item("文学常识挑战", "10 题 · 限时 90 秒", "匹配"), item("生活百科 100 题", "正确率 82%", "继续"), item("科技前沿擂台", "本周主题赛", "奖励翻倍")],
    routes: [
      page("quiz", "答题", "quiz", "快速匹配", [item("第一题", "《兰亭集序》的作者是谁？", "12 秒"), item("第二题", "光速约为每秒多少公里？", "待答")]),
      page("leaderboard", "排行", "leaderboard", "本周排行", [item("知识旅行家", "2,860 分 · 连胜 18 场", "1"), item("云朵先生", "2,742 分 · 连胜 12 场", "2"), item("海边答题者", "2,598 分 · 连胜 9 场", "3")]),
      page("catalog", "题库", "catalog", "专题题库", [item("文学历史", "328 道题 · 正确率 78%"), item("科学技术", "256 道题 · 正确率 72%"), item("生活百科", "412 道题 · 正确率 86%")]),
      page("profile", "我的", "profile", "赛季档案", [item("当前段位", "黄金 III"), item("累计胜场", "86 场"), item("头像框", "6 个"), item("赛季奖励", "1 个待领取")]),
    ],
  },
  {
    slug: "school", workId: "WORK-0424", name: "微教育", version: "v2.42.8", category: "教育知识",
    accent: "#14a247", soft: "#eaf8ef", ink: "#0d3820", flavor: "school",
    hero: "鹭岛实验学校", sub: "让每一次成长都有记录",
    source: "fm_jiaoyu/pages/index + home + order + detail",
    asset: join(siteRoot, "public/source-assets/archive/school.webp"),
    menu: ["校园通知", "在线报名", "课程表", "查成绩"],
    featured: [item("暑期兴趣班报名", "7 月 28 日截止", "报名中"), item("本周校园开放日", "周六 09:00", "通知"), item("二年级课程提醒", "明日带美术用品", "班级")],
    routes: [
      page("home", "校园", "home", "校园首页", []),
      page("school", "课程", "school", "本周课程表", [item("周一", "语文 · 数学 · 科学 · 体育"), item("周二", "英语 · 美术 · 数学 · 音乐"), item("周三", "语文 · 信息 · 劳动 · 班会")]),
      page("messages", "消息", "messages", "家校消息", [item("班主任王老师", "明天请带好美术用品", "刚刚"), item("教务处", "暑期兴趣班开始报名", "2小时前"), item("校园服务", "午餐菜单已更新", "昨天")]),
      page("profile", "我的", "profile", "学生中心", [item("学生信息", "林小雨 · 二年 3 班"), item("成绩查询", "本学期 6 条记录"), item("报名订单", "1 个待支付"), item("请假申请", "本月 0 次")]),
    ],
  },
  {
    slug: "auto", workId: "WORK-0444", name: "4S 汽车城", version: "v7.1.0", category: "旅游出行",
    accent: "#1296db", soft: "#e8f5fc", ink: "#0a3045", flavor: "auto",
    hero: "驾驭你的下一程", sub: "本月购车补贴最高 ¥12,000",
    source: "pages/index + photo + website + activity",
    asset: join(siteRoot, "public/source-assets/archive/auto.webp"),
    menu: ["热销车型", "询底价", "预约试驾", "门店导航"],
    featured: [item("星越 L 智擎版", "2.0T · 旗舰 SUV", "热销", "指导价 16.87万"), item("极氪 007 后驱版", "纯电 688km", "补贴", "指导价 20.99万"), item("领克 08 EM-P", "插混 · 四驱", "新车", "指导价 19.58万")],
    routes: [
      page("home", "首页", "home", "汽车城", []),
      page("cars", "车型", "cars", "全部车型", [item("星越 L 智擎版", "2.0T · 旗舰 SUV", "现车", "16.87万起"), item("极氪 007 后驱版", "纯电 688km", "补贴", "20.99万起"), item("领克 08 EM-P", "插混四驱", "新车", "19.58万起")]),
      page("activities", "活动", "activities", "购车活动", [item("夏日置换补贴", "旧车置换至高补贴 12,000 元", "进行中"), item("周末试驾礼", "到店试驾送品牌露营杯", "预约"), item("金融免息季", "24 期免息方案", "本月")]),
      page("profile", "我的", "profile", "车主中心", [item("试驾预约", "1 个待确认"), item("询价记录", "3 条"), item("关注车型", "4 款"), item("门店服务", "保养与救援")]),
    ],
  },
  {
    slug: "warriors", workId: "WORK-0449", name: "兵马俑实时导览", version: "合集最新版", category: "旅游出行",
    accent: "#8f2028", soft: "#f7eeee", ink: "#281719", flavor: "museum",
    hero: "秦始皇帝陵博物院", sub: "语音画册 · 边走边听",
    source: "pages/index + pages/guide + pages/scene + pages/detail",
    asset: join(siteRoot, "public/source-assets/archive/warriors.webp"),
    menu: ["一号坑", "二号坑", "文物陈列", "秦陵导览"],
    featured: [item("高级军吏俑", "语音 03:26 · 一号坑", "播放"), item("跪射武士俑", "语音 02:48 · 二号坑", "播放"), item("彩绘铜车马", "语音 05:12 · 文物陈列厅", "推荐")],
    routes: [
      page("gallery", "语音画册", "gallery", "语音画册", [item("高级军吏俑", "一号坑 · 语音 03:26", "播放"), item("跪射武士俑", "二号坑 · 语音 02:48", "播放"), item("彩绘铜车马", "文物陈列厅 · 语音 05:12", "播放")]),
      page("map", "实时导览", "map", "馆内实时导览", [item("当前位置", "一号坑南门"), item("推荐路线", "一号坑 → 二号坑 → 铜车马馆"), item("附近展品", "前方 80 米 · 高级军吏俑")]),
    ],
  },
  {
    slug: "visa", workId: "WORK-0477", name: "熊猫签证", version: "合集最新版", category: "旅游出行",
    accent: "#f47f8a", soft: "#fff0f2", ink: "#462126", flavor: "visa",
    hero: "说走就走，材料少跑", sub: "热门国家最快 5 个工作日",
    source: "pages/index + pages/apply + pages/order",
    asset: join(siteRoot, "public/source-assets/archive/visa.webp"),
    menu: ["日本", "新加坡", "澳大利亚", "全部国家"],
    featured: [item("日本单次旅游签", "预计 7 个工作日", "热办", "¥399"), item("新加坡商务签", "预计 5 个工作日", "材料少", "¥499"), item("澳大利亚访客签", "预计 15 个工作日", "旅签", "¥899")],
    routes: [
      page("visa", "签证", "visa", "热门目的地", [item("日本", "旅游签 · 商务签", "7个工作日"), item("新加坡", "旅游签 · 商务签", "5个工作日"), item("澳大利亚", "访客签 · 探亲签", "15个工作日")]),
      page("orders", "订单", "orders", "签证订单", [item("日本单次旅游签", "材料审核中 · 3/5", "补充材料", "¥399"), item("新加坡商务签", "已出签 · 可下载电子签", "完成", "¥499")]),
    ],
  },
  {
    slug: "card", workId: "WORK-0486", name: "超人名片", version: "v2.9.11", category: "企业品牌",
    accent: "#2a9df4", soft: "#eaf5fe", ink: "#0f3048", flavor: "business",
    hero: "让每次认识更有价值", sub: "今日名片被查看 36 次",
    source: "super_card/pages/home + dynamic + radar + cardbook",
    asset: join(siteRoot, "public/source-assets/archive/card.webp"),
    menu: ["交换名片", "拨打电话", "企业官网", "保存通讯录"],
    featured: [item("AI 产品解决方案", "企业服务 · 2026 案例集", "查看"), item("企业数字化案例", "零售行业 · 提效 42%", "案例"), item("本周客户动态", "6 位客户查看了名片", "提醒")],
    routes: [
      page("card", "名片", "card", "我的智能名片", [item("Neil Wong", "产品顾问 · 数字化解决方案", "在线"), item("联系电话", "138 **** 2012"), item("所在公司", "创意科技有限公司")]),
      page("feed", "动态", "feed", "企业动态", [item("AI 产品解决方案正式发布", "2 小时前 · 28 次浏览", "置顶"), item("零售数字化案例更新", "昨天 · 16 次浏览", "案例")]),
      page("radar", "雷达", "radar", "客户雷达", [item("今日访客", "36 人 · 较昨日 +18%", "实时"), item("意向客户", "8 人 · 停留超过 30 秒"), item("转发次数", "12 次 · 新增 4 个线索")]),
      page("profile", "我的", "profile", "名片管理", [item("编辑名片", "完整度 92%"), item("客户库", "128 位客户"), item("企业资料", "6 个展示模块"), item("使用帮助", "常见问题")]),
    ],
  },
  {
    slug: "lawyer", workId: "WORK-0513", name: "柚子律师", version: "v1.7.0", category: "企业品牌",
    accent: "#ce0000", soft: "#fbecec", ink: "#321010", flavor: "law",
    hero: "专业法律服务", sub: "已有 8,642 次咨询得到回复",
    source: "zhls_sun/pages/shouye + anli + lawyer + consultation",
    asset: join(siteRoot, "public/source-assets/archive/lawyer.webp"),
    menu: ["在线预约", "付费咨询", "电话预约", "业务范围"],
    featured: [item("劳动争议怎么处理", "劳动法 · 38 条回复", "热门"), item("合同风险快速审查", "企业服务 · 30 分钟响应", "推荐"), item("婚姻家事咨询", "专业律师一对一", "可预约")],
    routes: [
      page("home", "首页", "home", "法律服务", []),
      page("people", "律师", "people", "律师团队", [item("张律师", "劳动法 · 执业 12 年", "在线"), item("林律师", "合同纠纷 · 执业 9 年", "可预约"), item("陈律师", "婚姻家事 · 执业 8 年", "金牌")]),
      page("cases", "案例", "cases", "精选案例", [item("劳动合同解除争议", "胜诉 · 获赔 18 万", "劳动法"), item("企业合同风险化解", "调解结案 · 减损 60 万", "合同"), item("婚姻财产分割", "达成调解", "家事")]),
      page("profile", "我的", "profile", "咨询中心", [item("我的咨询", "2 条进行中"), item("预约记录", "1 个待确认"), item("收藏律师", "3 位"), item("服务订单", "最近 4 条")]),
    ],
  },
  {
    slug: "wedding", workId: "WORK-0493", name: "婚庆服务", version: "v1.3.5", category: "企业品牌",
    accent: "#f54264", soft: "#fff0f3", ink: "#43131d", flavor: "wedding",
    hero: "把喜欢写进婚礼", sub: "2026 秋季热门档期开放预约",
    source: "kundian_wedding/pages/index + merchant_type + calendar",
    asset: join(siteRoot, "public/source-assets/archive/wedding.webp"),
    menu: ["婚礼策划", "婚纱礼服", "摄影跟拍", "婚宴酒店"],
    featured: [item("海岛白色婚礼", "200 人 · 户外仪式", "精选"), item("新中式园林宴", "120 人 · 中式流程", "热门"), item("落日草坪仪式", "80 人 · 轻婚礼", "档期少")],
    routes: [
      page("home", "灵感", "home", "婚礼灵感", []),
      page("merchants", "商家", "merchants", "婚礼商家", [item("白屿婚礼策划", "评分 4.9 · 328 个案例", "金牌"), item("叙事摄影工作室", "纪实跟拍 · 档期可约", "推荐"), item("云上婚纱馆", "进口婚纱 · 免费试纱", "新店")]),
      page("calendar", "档期", "calendar", "婚礼档期", [item("8 月 8 日", "周六 · 3 位策划师可约", "热门"), item("9 月 20 日", "周日 · 5 家场地可约"), item("10 月 1 日", "国庆 · 仅余 2 个时段", "紧张")]),
      page("profile", "我的", "profile", "备婚中心", [item("婚礼清单", "已完成 8/16"), item("预约商家", "3 个待确认"), item("收藏案例", "26 个"), item("预算管理", "已规划 ¥12.8万")]),
    ],
  },
  {
    slug: "city", workId: "WORK-0522", name: "米花同城社区", version: "v7.8.3", category: "社交社区",
    accent: "#fb5100", soft: "#fff0e8", ink: "#49200c", flavor: "community",
    hero: "今天，同城有什么新鲜事", sub: "厦门 · 3.2 万人在这里生活",
    source: "yc_youliao/page/index + propage + publish + myPublish",
    asset: join(siteRoot, "public/source-assets/archive/city.webp"),
    menu: ["招聘求职", "房屋租售", "二手闲置", "拼车出行"],
    featured: [item("周末海边市集开摊啦", "2.3km · 45 条互动", "同城"), item("软件园附近求合租", "1.6km · 今天入住", "租房"), item("出一台九成新咖啡机", "3.1km · 可小刀", "二手", "¥680")],
    routes: [
      page("feed", "首页", "feed", "同城动态", [item("周末海边市集开摊啦", "小鱼 · 2.3km · 45 条评论", "同城"), item("软件园附近求合租", "林同学 · 1.6km · 2 小时前", "租房"), item("环岛路今晚拼车", "阿杰 · 3 个空位", "拼车")]),
      page("merchants", "商家", "merchants", "附近商家", [item("岛屿咖啡", "评分 4.9 · 距你 860m", "团购"), item("拾光花店", "同城 2 小时送达", "新店"), item("安心家政", "已服务 2,860 单", "认证")]),
      page("publish", "发布", "publish", "发布同城信息", [item("选择分类", "招聘、房屋、二手、拼车"), item("添加图片", "最多上传 9 张"), item("所在位置", "软件园二期")]),
      page("profile", "我的", "profile", "社区账户", [item("我的发布", "8 条"), item("收到的评论", "26 条"), item("收藏信息", "12 条"), item("认证中心", "实名认证已通过")]),
    ],
  },
  {
    slug: "flea", workId: "WORK-0517", name: "超人二手跳蚤市场", version: "v5.4.10", category: "社交社区",
    accent: "#ff6600", soft: "#fff1e6", ink: "#47220b", flavor: "market",
    hero: "让闲置流动起来", sub: "附近 5 公里有 268 件好物",
    source: "pages/home + city + post + my",
    asset: join(siteRoot, "public/source-assets/archive/flea.webp"),
    menu: ["数码", "家居", "服饰", "免费送"],
    featured: [item("九成新机械键盘", "1.2km · 自提优先", "数码", "¥260"), item("搬家出宜家边桌", "2.8km · 轻微使用痕迹", "家居", "¥80"), item("复古胶片相机", "3.6km · 功能正常", "可议价", "¥680")],
    routes: [
      page("catalog", "市场", "catalog", "附近闲置", [item("九成新机械键盘", "1.2km · 2 小时前", "置顶", "¥260"), item("搬家出宜家边桌", "2.8km · 今天", "家居", "¥80"), item("复古胶片相机", "3.6km · 可议价", "数码", "¥680")]),
      page("category", "分类", "catalog", "闲置分类", [item("手机数码", "328 件"), item("家居家电", "215 件"), item("服饰鞋包", "186 件"), item("图书文具", "142 件")]),
      page("publish", "发布", "publish", "发布闲置", [item("物品照片", "最多 9 张"), item("价格与描述", "支持面议或免费送"), item("交易方式", "自提或邮寄")]),
      page("profile", "我的", "profile", "我的闲置", [item("我发布的", "6 件在售"), item("我卖出的", "12 件"), item("我的收藏", "18 件"), item("收到的留言", "4 条未读")]),
    ],
  },
  {
    slug: "match", workId: "WORK-0529", name: "同城智慧红娘", version: "v1.0.36", category: "社交社区",
    accent: "#ff677d", soft: "#fff0f3", ink: "#481921", flavor: "dating",
    hero: "开启你的同城缘分", sub: "今日已有 128 对互相喜欢",
    source: "pages/start + register + match + message",
    asset: join(siteRoot, "public/source-assets/archive/match.webp"),
    menu: ["今日推荐", "附近的人", "红娘牵线", "实名认证"],
    featured: [item("爱旅行的产品经理", "28 岁 · 思明区", "在线"), item("周末常去看展", "26 岁 · 湖里区", "同城"), item("喜欢小动物的设计师", "29 岁 · 集美区", "认证")],
    routes: [
      page("people", "缘分", "people", "今日推荐", [item("林小姐", "28 岁 · 产品经理 · 思明区", "92%匹配"), item("周先生", "30 岁 · 建筑师 · 湖里区", "88%匹配"), item("陈小姐", "26 岁 · 设计师 · 集美区", "85%匹配")]),
      page("feed", "动态", "feed", "缘分动态", [item("周末去了植物园", "林小姐 · 2 小时前", "12 赞"), item("最近开始学习做饭", "周先生 · 昨天", "8 赞")]),
      page("messages", "消息", "messages", "我的消息", [item("林小姐", "你好，也喜欢旅行吗？", "刚刚"), item("智慧红娘", "为你推荐了 3 位嘉宾", "1小时前"), item("系统通知", "实名认证已通过", "昨天")]),
      page("profile", "我的", "profile", "个人资料", [item("资料完整度", "86%"), item("实名认证", "已通过"), item("谁喜欢我", "12 人"), item("红娘服务", "剩余 2 次牵线")]),
    ],
  },
  {
    slug: "o2o", workId: "WORK-0602", name: "上门预约服务", version: "v4.10.9", category: "生活服务",
    accent: "#ff0036", soft: "#ffeaf0", ink: "#43000f", flavor: "service",
    hero: "家务事，交给专业的人", sub: "最快 30 分钟响应",
    source: "xg_o2o/index + cateitem + personnel + order",
    asset: join(siteRoot, "public/source-assets/archive/o2o.webp"),
    menu: ["家电清洗", "日常保洁", "上门维修", "收纳整理"],
    featured: [item("空调深度清洗", "挂机 1 台 · 90 分钟", "新客减20", "¥118"), item("全屋日常保洁", "3 小时 · 2 位保洁师", "可约今日", "¥199"), item("水电上门检修", "30 分钟起 · 先检测", "极速", "¥69起")],
    routes: [
      page("home", "首页", "home", "上门服务", []),
      page("service", "分类", "service", "服务分类", [item("家电清洗", "空调、油烟机、洗衣机", "26 项"), item("日常保洁", "小时工、深度保洁", "18 项"), item("上门维修", "水电、家电、门锁", "32 项")]),
      page("orders", "订单", "orders", "服务订单", [item("空调深度清洗", "师傅已接单 · 今日 15:30", "进行中", "¥118"), item("全屋日常保洁", "已完成 · 7 月 18 日", "评价", "¥199")]),
      page("profile", "我的", "profile", "服务账户", [item("常用地址", "2 个"), item("优惠券", "3 张"), item("收藏服务", "8 项"), item("客服中心", "售后与投诉")]),
    ],
  },
  {
    slug: "beauty", workId: "WORK-0593", name: "美容美发营销版", version: "v3.4.6", category: "生活服务",
    accent: "#b08a5a", soft: "#f6f0e8", ink: "#30251a", flavor: "beauty",
    hero: "为今天的自己焕新", sub: "新客到店体验 ¥68 起",
    source: "xc_beauty/pages/index + service + store_member",
    asset: join(siteRoot, "public/source-assets/archive/beauty.webp"),
    menu: ["剪发造型", "染烫护理", "美容护理", "预约技师"],
    featured: [item("高级设计师剪发", "60 分钟 · 含洗吹", "新客", "¥88"), item("头皮深层护理", "45 分钟 · 专业检测", "推荐", "¥168"), item("日系透明感染发", "180 分钟 · 含护理", "热门", "¥499起")],
    routes: [
      page("home", "首页", "home", "美业门店", []),
      page("service", "服务", "service", "服务项目", [item("高级设计师剪发", "60 分钟 · 含洗吹", "可约", "¥88"), item("头皮深层护理", "45 分钟 · 专业检测", "推荐", "¥168"), item("日系透明感染发", "180 分钟 · 含护理", "热门", "¥499起")]),
      page("booking", "预约", "booking", "预约技师", [item("Tony 老师", "擅长短发与日系造型", "今日可约"), item("Mia 老师", "擅长染发与色彩设计", "明日可约"), item("Kevin 老师", "高级总监 · 需提前预约", "金牌")]),
      page("profile", "我的", "profile", "会员中心", [item("会员等级", "金卡 · 9 折"), item("储值余额", "¥680.00"), item("预约记录", "2 个待服务"), item("优惠券", "4 张可用")]),
    ],
  },
  {
    slug: "recycle", workId: "WORK-0605", name: "手机回收", version: "v4.0.6", category: "生活服务",
    accent: "#d8b839", soft: "#fff9df", ink: "#332d10", flavor: "recycle",
    hero: "旧手机，换个好价钱", sub: "顺丰包邮 · 隐私清除 · 极速打款",
    source: "pages/index/recycle + select_phone + select_fault + order",
    asset: join(siteRoot, "public/source-assets/archive/recycle.webp"),
    menu: ["苹果", "华为", "小米", "全部机型"],
    featured: [item("iPhone 15 Pro", "最高回收价", "热门", "¥5,280"), item("Mate 60 Pro", "最高回收价", "高价", "¥4,360"), item("小米 14", "最高回收价", "推荐", "¥2,680")],
    routes: [
      page("models", "我要回收", "models", "选择回收机型", [item("iPhone 15 Pro", "最高回收价", "热门", "¥5,280"), item("Mate 60 Pro", "最高回收价", "高价", "¥4,360"), item("小米 14", "最高回收价", "推荐", "¥2,680")]),
      page("service", "我要维修", "service", "手机维修", [item("屏幕维修", "原厂品质屏 · 现场更换", "到店/邮寄", "¥299起"), item("电池更换", "容量恢复 · 质保 180 天", "热门", "¥129起"), item("主板维修", "先检测后报价", "专业", "¥199起")]),
      page("orders", "订单", "orders", "回收订单", [item("iPhone 13 Pro", "质检完成 · 等待打款", "进行中", "¥2,860"), item("iPhone X", "交易完成 · 7 月 6 日", "完成", "¥620")]),
      page("profile", "我的", "profile", "回收账户", [item("估价记录", "6 条"), item("回收地址", "2 个"), item("优惠券", "1 张加价券"), item("客服中心", "质检与打款问题")]),
    ],
  },
  {
    slug: "step", workId: "WORK-0552", name: "步数宝", version: "v9.6.3", category: "生活服务",
    accent: "#9f64f8", soft: "#f3ecff", ink: "#2d164b", flavor: "fitness",
    hero: "8,642", sub: "今日步数 · 再走 1,358 步达标",
    source: "hc_step/pages/index + convert + activity + luckdraw",
    asset: join(siteRoot, "public/source-assets/archive/step.webp"),
    menu: ["领取金币", "每日签到", "邀请好友", "步数排行"],
    featured: [item("运动水杯", "8,000 步兑换", "可兑换"), item("轻量跳绳", "12,000 步兑换", "热门"), item("视频会员月卡", "20,000 步兑换", "限量")],
    routes: [
      page("steps", "步数", "steps", "今日运动", [item("今日步数", "8,642 步 · 6.2 公里", "86%"), item("步数加成", "好友助力 +12%"), item("今日金币", "待领取 86 枚", "领取")]),
      page("points", "换购", "points", "步数换购", [item("运动水杯", "8,000 步", "可兑换"), item("轻量跳绳", "12,000 步", "热门"), item("视频会员月卡", "20,000 步", "限量")]),
      page("activities", "活动", "activities", "运动活动", [item("连续签到挑战", "已连续 6 天 · 明日奖励翻倍", "进行中"), item("好友助力赛", "邀请 3 人解锁红包", "参与"), item("周末万步挑战", "完成可得 300 金币", "报名")]),
      page("profile", "我的", "profile", "运动账户", [item("我的金币", "2,680 枚"), item("兑换记录", "8 条"), item("红包收益", "¥12.80"), item("运动排行", "好友第 6 名")]),
    ],
  },
  {
    slug: "points", workId: "WORK-0180", name: "超人积分商城", version: "v6.3.23", category: "电商零售",
    accent: "#ff5a36", soft: "#fff0ec", ink: "#44180e", flavor: "points",
    hero: "积分也能买好物", sub: "会员日兑换低至 5 折",
    source: "pages/index + style2 DIY + exchange + cart",
    asset: join(siteRoot, "public/source-assets/archive/points.webp"),
    menu: ["数码好物", "居家生活", "优惠券", "积分抽奖"],
    featured: [item("便携随行杯", "库存 86 件", "热兑", "2,680 积分"), item("品牌数据线", "库存 120 件", "新品", "1,280 积分"), item("视频会员月卡", "电子卡券 · 秒到账", "限量", "3,600 积分")],
    routes: [
      page("home", "首页", "home", "积分商城", []),
      page("category", "分类", "catalog", "兑换分类", [item("数码好物", "86 件"), item("居家生活", "128 件"), item("电子卡券", "42 件"), item("积分抽奖", "每日 3 次")]),
      page("cart", "兑换车", "cart", "积分兑换车", [item("便携随行杯", "1 件 · 库存充足", "", "2,680 积分"), item("品牌数据线", "1 件 · 白色", "", "1,280 积分")]),
      page("profile", "我的", "profile", "积分账户", [item("可用积分", "8,620"), item("兑换记录", "12 条"), item("收货地址", "2 个"), item("积分明细", "本月获得 1,860")]),
    ],
  },
  {
    slug: "hotel", workId: "WORK-0174", name: "志汇酒店营销", version: "v8.5.8", category: "餐饮外卖",
    accent: "#172a97", soft: "#eceefe", ink: "#111b52", flavor: "hotel",
    hero: "今晚住得更好一点", sub: "厦门 · 7 月 25 日至 26 日",
    source: "zh_jdgjb/pages/index + hotel_list + order + jifen",
    asset: join(siteRoot, "public/source-assets/archive/hotel.webp"),
    menu: ["钟点房", "亲子酒店", "海景房", "会员专区"],
    featured: [item("环岛路海景大床房", "含早餐 · 可免费取消", "推荐", "¥568"), item("城市中心行政套房", "高层景观 · 延迟退房", "会员价", "¥698"), item("亲子主题双床房", "含儿童早餐 · 亲子设施", "家庭", "¥628")],
    routes: [
      page("rooms", "预订", "rooms", "查询房型", [item("环岛路海景大床房", "1.8m 大床 · 含双早", "可取消", "¥568"), item("城市中心行政套房", "68㎡ · 高层景观", "会员价", "¥698"), item("亲子主题双床房", "2 张 1.35m 床", "亲子", "¥628")]),
      page("catalog", "酒店", "catalog", "附近酒店", [item("环岛路海景酒店", "评分 4.9 · 距海 80m", "豪华"), item("软件园商务酒店", "评分 4.8 · 地铁口", "商务"), item("曾厝垵设计酒店", "评分 4.7 · 文艺街区", "特色")]),
      page("orders", "订单", "orders", "酒店订单", [item("环岛路海景大床房", "待入住 · 7 月 25 日", "查看凭证", "¥568"), item("软件园商务酒店", "已完成 · 7 月 12 日", "评价", "¥398")]),
      page("profile", "我的", "profile", "酒店会员", [item("会员等级", "铂金会员"), item("积分余额", "3,860 分"), item("优惠券", "4 张可用"), item("常住人", "2 位")]),
    ],
  },
];

const indexHtml = (project) => `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="${project.accent}">
  <title>${project.name}｜独立交互演示</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body data-flavor="${project.flavor}">
  <main id="app" aria-live="polite"></main>
  <script src="./app.js"></script>
</body>
</html>
`;

const runtime = String.raw`
const app = document.querySelector("#app");
const storeKey = "work-demo:" + PROJECT.slug;
const saved = JSON.parse(localStorage.getItem(storeKey) || "{}");
const state = {
  active: PROJECT.routes[0].id,
  detail: null,
  query: "",
  loading: "",
  toast: "",
  cart: saved.cart || 0,
  favorite: saved.favorite || [],
  playing: false,
  answer: null,
};

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

function saveState() {
  localStorage.setItem(storeKey, JSON.stringify({ cart: state.cart, favorite: state.favorite }));
}

function wait(label, done) {
  state.loading = label;
  render();
  window.setTimeout(() => {
    state.loading = "";
    done?.();
    render();
  }, 210 + PROJECT.slug.length * 7);
}

function notice(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    if (state.toast === message) state.toast = "";
    render();
  }, 1350);
}

function go(routeId) {
  if (routeId === state.active) return;
  const route = PROJECT.routes.find((entry) => entry.id === routeId);
  wait("正在加载" + route.label, () => {
    state.active = routeId;
    state.detail = null;
    state.query = "";
    window.scrollTo(0, 0);
  });
}

function action(kind, title = "") {
  if (kind === "detail") {
    wait("正在读取详情", () => { state.detail = title; });
  } else if (kind === "cart") {
    wait("正在更新购物车", () => {
      state.cart += 1;
      saveState();
      notice(title + "已加入");
    });
  } else if (kind === "favorite") {
    wait("正在同步收藏", () => {
      const exists = state.favorite.includes(title);
      state.favorite = exists ? state.favorite.filter((entry) => entry !== title) : [...state.favorite, title];
      saveState();
      notice(exists ? "已取消收藏" : "收藏成功");
    });
  } else if (kind === "play") {
    wait("正在连接媒体流", () => {
      state.playing = !state.playing;
      notice(state.playing ? "正在播放" : "已暂停");
    });
  } else if (kind === "answer") {
    wait("正在提交答案", () => {
      state.answer = title;
      notice(title === "王羲之" ? "回答正确 +20 分" : "答案已提交");
    });
  } else {
    wait("正在提交请求", () => notice(title || "操作成功"));
  }
}

function header(route) {
  return '<header class="app-header">' +
    '<div class="status"><span>9:41</span><span>● ◒</span></div>' +
    '<div class="titlebar"><div><small>' + esc(PROJECT.version) + '</small><strong>' + esc(route.title) + '</strong></div><button data-action="more" aria-label="更多">•••</button></div>' +
  '</header>';
}

function search(route) {
  return '<label class="search"><span>⌕</span><input value="' + esc(state.query) + '" placeholder="搜索' + esc(route.title) + '" aria-label="搜索' + esc(route.title) + '"></label>';
}

function hero() {
  return '<button class="hero" data-detail="' + esc(PROJECT.hero) + '">' +
    (PROJECT.hasAsset ? '<img src="./assets/hero.webp" alt="">' : '') +
    '<span class="hero-shade"></span><span class="hero-copy"><small>' + esc(PROJECT.sub) + '</small><strong>' + esc(PROJECT.hero) + '</strong><i>查看详情 ›</i></span>' +
  '</button>';
}

function quickMenu() {
  return '<section class="quick-menu">' + PROJECT.menu.map((label, index) =>
    '<button data-quick="' + index + '"><i>' + esc(label.slice(0, 1)) + '</i><span>' + esc(label) + '</span></button>'
  ).join("") + '</section>';
}

function cards(items, mode = "list") {
  const query = state.query.trim().toLowerCase();
  const filtered = query ? items.filter((entry) => (entry.title + entry.meta).toLowerCase().includes(query)) : items;
  if (!filtered.length) return '<div class="empty"><b>没有找到结果</b><span>换一个关键词试试</span></div>';
  return '<section class="cards cards--' + mode + '">' + filtered.map((entry, index) =>
    '<article class="card">' +
      '<button class="card-main" data-detail="' + esc(entry.title) + '">' +
        '<span class="card-art"><b>' + String(index + 1).padStart(2, "0") + '</b></span>' +
        '<span class="card-copy"><strong>' + esc(entry.title) + '</strong><small>' + esc(entry.meta) + '</small>' +
          (entry.badge ? '<em>' + esc(entry.badge) + '</em>' : '') + (entry.price ? '<b>' + esc(entry.price) + '</b>' : '') +
        '</span>' +
      '</button>' +
      '<button class="card-action" data-favorite="' + esc(entry.title) + '" aria-label="收藏' + esc(entry.title) + '">' + (state.favorite.includes(entry.title) ? "♥" : "♡") + '</button>' +
    '</article>'
  ).join("") + '</section>';
}

function homePage(route) {
  return hero() + quickMenu() +
    '<div class="section-title"><strong>精选推荐</strong><span>源码业务数据 ›</span></div>' +
    cards(PROJECT.featured, PROJECT.flavor === "commerce" ? "grid" : "list");
}

function catalogPage(route) {
  return search(route) +
    '<div class="chips">' + ["推荐", "附近", "最新", "价格"].map((label, index) => '<button class="' + (index === 0 ? "active" : "") + '" data-message="已筛选：' + label + '">' + label + '</button>').join("") + '</div>' +
    cards(route.items, ["gallery", "cars", "models", "points", "rooms", "visa"].includes(route.kind) ? "grid" : "list");
}

function orderPage(route) {
  return '<div class="segmented"><button class="active">全部</button><button>进行中</button><button>已完成</button></div>' +
    '<section class="orders">' + route.items.map((entry) =>
      '<article><div><small>ORDER · ' + esc(PROJECT.slug.toUpperCase()) + '</small><strong>' + esc(entry.title) + '</strong><span>' + esc(entry.meta) + '</span></div>' +
      '<div><b>' + esc(entry.price || entry.badge || "查看") + '</b><button data-detail="' + esc(entry.title) + '">订单详情</button></div></article>'
    ).join("") + '</section>';
}

function cartPage(route) {
  const total = route.items.reduce((sum, entry) => {
    const numeric = Number(String(entry.price || "").replace(/[^\d.]/g, ""));
    return sum + (Number.isFinite(numeric) ? numeric : 0);
  }, 0);
  return '<section class="cart-list">' + route.items.map((entry, index) =>
    '<article><button class="cart-check active" data-message="已更新选择">✓</button><div class="cart-thumb">' + String(index + 1).padStart(2, "0") + '</div>' +
    '<div><strong>' + esc(entry.title) + '</strong><span>' + esc(entry.meta) + '</span><b>' + esc(entry.price) + '</b></div><div class="quantity"><button data-message="数量已减少">−</button><span>1</span><button data-message="数量已增加">＋</button></div></article>'
  ).join("") + '</section><section class="checkout"><div><span>已选 ' + route.items.length + ' 件</span><strong>合计：' + (PROJECT.category === "电商零售" && PROJECT.slug === "points" ? total.toLocaleString() + " 积分" : "¥" + total.toFixed(2)) + '</strong></div><button data-message="结算请求已提交">去结算</button></section>';
}

function profilePage(route) {
  return '<section class="profile-card"><div class="avatar">' + esc(PROJECT.name.slice(0, 1)) + '</div><div><strong>演示用户</strong><span>' + esc(PROJECT.name) + ' · 已登录</span></div><button data-message="资料编辑已保存">编辑</button></section>' +
    '<section class="profile-stats"><div><b>' + state.favorite.length + '</b><span>收藏</span></div><div><b>' + state.cart + '</b><span>待处理</span></div><div><b>4.9</b><span>信用</span></div></section>' +
    '<section class="menu-list">' + route.items.map((entry, index) =>
      '<button data-detail="' + esc(entry.title) + '"><i>' + String(index + 1).padStart(2, "0") + '</i><span><strong>' + esc(entry.title) + '</strong><small>' + esc(entry.meta) + '</small></span><b>›</b></button>'
    ).join("") + '</section>';
}

function peoplePage(route) {
  return search(route) + '<section class="people">' + route.items.map((entry, index) =>
    '<article><div class="portrait">' + esc(entry.title.slice(0, 1)) + '</div><div><strong>' + esc(entry.title) + '</strong><span>' + esc(entry.meta) + '</span><em>' + esc(entry.badge) + '</em></div>' +
    '<button data-message="已向' + esc(entry.title) + '发送请求">联系</button></article>'
  ).join("") + '</section>';
}

function feedPage(route) {
  return '<section class="feed">' + route.items.map((entry, index) =>
    '<article><div class="feed-user"><i>' + esc(entry.title.slice(0, 1)) + '</i><span><strong>' + esc(entry.title) + '</strong><small>' + esc(entry.meta) + '</small></span></div>' +
    '<div class="feed-photo feed-photo--' + (index % 3) + '"></div><div class="feed-actions"><button data-message="点赞成功">♡ 点赞</button><button data-detail="' + esc(entry.title) + '">▢ 评论</button><button data-message="分享面板已打开">↗ 分享</button></div></article>'
  ).join("") + '</section>';
}

function livePage(route) {
  return '<button class="live-stage ' + (state.playing ? "playing" : "") + '" data-play="1">' +
    (PROJECT.hasAsset ? '<img src="./assets/hero.webp" alt="直播封面">' : '') +
    '<span class="live-badge">' + (state.playing ? "播放中" : "LIVE") + '</span><i>' + (state.playing ? "Ⅱ" : "▶") + '</i><strong>' + esc(PROJECT.hero) + '</strong><small>' + esc(PROJECT.sub) + '</small></button>' +
    '<div class="section-title"><strong>节目列表</strong><span>实时更新</span></div>' + cards(route.items);
}

function mapPage(route) {
  return '<section class="map"><div class="road road--one"></div><div class="road road--two"></div><i class="pin pin--one">1</i><i class="pin pin--two">2</i><i class="pin pin--me">●</i><span>一号坑</span><span>二号坑</span><button data-message="定位已更新">重新定位</button></section>' +
    '<div class="section-title"><strong>导览信息</strong><span>实时</span></div>' + cards(route.items);
}

function calculatorPage(route) {
  return '<section class="calculator"><div class="calc-result"><small>装修估算总价</small><strong>¥ 168,600</strong><span>约 ¥1,860 / ㎡</span></div>' +
    route.items.map((entry, index) => '<label><span>' + esc(entry.title) + '</span><input value="' + esc(index === 0 ? "90㎡" : entry.meta) + '"></label>').join("") +
    '<button data-message="报价方案已生成">立即计算报价</button></section>';
}

function bookingPage(route) {
  return '<section class="calendar"><div class="calendar-head"><button>‹</button><strong>2026 年 7 月</strong><button>›</button></div>' +
    '<div class="calendar-grid">' + ["一","二","三","四","五","六","日",20,21,22,23,24,25,26,27,28,29,30,31,1,2].map((day) => '<button class="' + (day === 25 ? "selected" : "") + '">' + day + '</button>').join("") + '</div></section>' +
    '<div class="section-title"><strong>可预约资源</strong><span>7 月 25 日</span></div>' + cards(route.items);
}

function quizPage(route) {
  return '<section class="quiz"><small>QUESTION 01 / 10</small><strong>《兰亭集序》的作者是谁？</strong><div class="quiz-progress"><i></i></div>' +
    ["王羲之", "苏轼", "欧阳修", "王安石"].map((answer) => '<button class="' + (state.answer === answer ? "selected" : "") + '" data-answer="' + answer + '">' + answer + '</button>').join("") + '</section>' +
    '<div class="section-title"><strong>对战信息</strong><span>剩余 68 秒</span></div>' + cards(route.items);
}

function leaderboardPage(route) {
  return '<section class="podium">' + route.items.slice(0, 3).map((entry, index) =>
    '<article class="rank-' + (index + 1) + '"><i>' + (index + 1) + '</i><strong>' + esc(entry.title) + '</strong><span>' + esc(entry.meta) + '</span></article>'
  ).join("") + '</section>';
}

function stepsPage(route) {
  return '<section class="step-ring"><div><strong>8,642</strong><span>今日步数</span></div></section><section class="step-metrics"><div><b>6.2</b><span>公里</span></div><div><b>328</b><span>千卡</span></div><div><b>86%</b><span>目标</span></div></section>' +
    '<button class="primary-wide" data-message="今日 86 枚金币已领取">领取今日金币</button>' + cards(route.items);
}

function publishPage(route) {
  return '<form class="publish" onsubmit="return false"><label><span>标题</span><input placeholder="一句话说明你要发布的内容"></label><label><span>详细描述</span><textarea placeholder="补充时间、地点和具体要求"></textarea></label>' +
    '<div class="upload"><button data-message="已选择模拟图片">＋ 添加图片</button><span>最多 9 张</span></div>' +
    route.items.map((entry) => '<button class="publish-row" data-detail="' + esc(entry.title) + '"><span><strong>' + esc(entry.title) + '</strong><small>' + esc(entry.meta) + '</small></span><b>›</b></button>').join("") +
    '<button class="primary-wide" data-message="发布成功，正在等待审核">确认发布</button></form>';
}

function cardPage(route) {
  return '<section class="business-card"><small>DIGITAL BUSINESS CARD</small><div class="avatar">' + esc(PROJECT.name.slice(0, 1)) + '</div><h2>' + esc(route.items[0]?.title || PROJECT.name) + '</h2><p>' + esc(route.items[0]?.meta || PROJECT.sub) + '</p><div><button data-message="已保存到通讯录">保存通讯录</button><button data-message="已发起名片交换">交换名片</button></div></section>' +
    '<div class="section-title"><strong>名片资料</strong><span>已认证</span></div>' + cards(route.items);
}

function radarPage(route) {
  return '<section class="radar-chart"><div class="radar-total"><small>今日访客</small><strong>36</strong><span>较昨日 +18%</span></div><div class="bars">' +
    [42,68,54,82,64,92,76].map((height, index) => '<i style="height:' + height + '%"><b>' + ["一","二","三","四","五","六","日"][index] + '</b></i>').join("") +
    '</div></section>' + cards(route.items);
}

function errandPage(route) {
  return '<section class="errand-form"><div class="route-point"><i>A</i><input value="软件园二期" aria-label="取件地址"></div><div class="route-point"><i>B</i><input placeholder="填写收件地址" aria-label="收件地址"></div><div class="errand-types">' +
    route.items.map((entry) => '<button data-detail="' + esc(entry.title) + '"><i>' + esc(entry.title.slice(0, 1)) + '</i><strong>' + esc(entry.title) + '</strong><span>' + esc(entry.meta) + '</span></button>').join("") +
    '</div><button class="primary-wide" data-message="正在为你估算跑腿费用">立即估价</button></section>';
}

function renderPage(route) {
  if (route.kind === "home") return homePage(route);
  if (["catalog","category","gallery","cars","models","points","rooms","visa","service","channels","audio","video","property","merchants","activities","checkup","school"].includes(route.kind)) return catalogPage(route);
  if (route.kind === "orders") return orderPage(route);
  if (route.kind === "cart") return cartPage(route);
  if (route.kind === "profile") return profilePage(route);
  if (["people","talent","agents","doctors"].includes(route.kind)) return peoplePage(route);
  if (route.kind === "feed") return feedPage(route);
  if (route.kind === "live") return livePage(route);
  if (route.kind === "map") return mapPage(route);
  if (route.kind === "calculator") return calculatorPage(route);
  if (["booking","calendar"].includes(route.kind)) return bookingPage(route);
  if (route.kind === "quiz") return quizPage(route);
  if (route.kind === "leaderboard") return leaderboardPage(route);
  if (route.kind === "steps") return stepsPage(route);
  if (route.kind === "publish") return publishPage(route);
  if (route.kind === "card") return cardPage(route);
  if (route.kind === "radar") return radarPage(route);
  if (route.kind === "errand") return errandPage(route);
  return catalogPage(route);
}

function nav() {
  const icons = ["⌂", "▤", "◇", "●"];
  return '<nav class="tabbar" style="grid-template-columns:repeat(' + PROJECT.routes.length + ',1fr)">' + PROJECT.routes.map((route, index) =>
    '<button class="' + (route.id === state.active ? "active" : "") + '" data-route="' + route.id + '"><i>' + icons[index] + '</i><span>' + esc(route.label) + '</span>' +
    (route.kind === "cart" && state.cart ? '<b>' + state.cart + '</b>' : '') + '</button>'
  ).join("") + '</nav>';
}

function detail() {
  if (!state.detail) return "";
  return '<section class="detail"><button class="detail-back" data-close-detail="1">‹ 返回</button><small>' + esc(PROJECT.category) + ' · INTERACTIVE DEMO</small>' +
    '<div class="detail-art">' + (PROJECT.hasAsset ? '<img src="./assets/hero.webp" alt="">' : '<span>' + esc(PROJECT.name.slice(0, 1)) + '</span>') + '</div>' +
    '<h2>' + esc(state.detail) + '</h2><p>此页面使用前端假数据模拟原小程序的业务流程，提交操作会保留短暂的服务器响应等待。</p>' +
    '<div class="detail-info"><span><b>4.9</b>用户评分</span><span><b>即时</b>状态反馈</span></div>' +
    '<div class="detail-actions"><button data-favorite="' + esc(state.detail) + '">' + (state.favorite.includes(state.detail) ? "已收藏" : "收藏") + '</button><button class="primary" data-complete="' + esc(state.detail) + '">' + esc(PROJECT.primaryAction) + '</button></div></section>';
}

function overlays() {
  return (state.loading ? '<div class="loading"><i></i><strong>' + esc(state.loading) + '</strong><span>模拟服务器响应</span></div>' : '') +
    (state.toast ? '<div class="toast">✓ ' + esc(state.toast) + '</div>' : '');
}

function render() {
  const route = PROJECT.routes.find((entry) => entry.id === state.active) || PROJECT.routes[0];
  app.innerHTML = '<div class="miniapp">' + header(route) + '<div class="page page--' + esc(route.kind) + '">' + renderPage(route) + '</div>' + nav() + detail() + overlays() + '</div>';
  bind();
}

function bind() {
  app.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => go(button.dataset.route)));
  app.querySelectorAll("[data-detail]").forEach((button) => button.addEventListener("click", () => action("detail", button.dataset.detail)));
  app.querySelectorAll("[data-message]").forEach((button) => button.addEventListener("click", () => action("message", button.dataset.message)));
  app.querySelectorAll("[data-favorite]").forEach((button) => button.addEventListener("click", () => action("favorite", button.dataset.favorite)));
  app.querySelectorAll("[data-play]").forEach((button) => button.addEventListener("click", () => action("play", PROJECT.hero)));
  app.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => action("answer", button.dataset.answer)));
  app.querySelectorAll("[data-close-detail]").forEach((button) => button.addEventListener("click", () => { state.detail = null; render(); }));
  app.querySelectorAll("[data-complete]").forEach((button) => button.addEventListener("click", () => action(PROJECT.primaryKind, button.dataset.complete)));
  app.querySelectorAll("[data-quick]").forEach((button) => button.addEventListener("click", () => {
    const index = Number(button.dataset.quick);
    const route = PROJECT.routes[index] || PROJECT.routes[1];
    route ? go(route.id) : action("detail", PROJECT.menu[index]);
  }));
  const input = app.querySelector(".search input");
  if (input) input.addEventListener("input", (event) => { state.query = event.target.value; render(); requestAnimationFrame(() => { const next = app.querySelector(".search input"); next?.focus(); next?.setSelectionRange(state.query.length, state.query.length); }); });
  app.querySelectorAll(".segmented button").forEach((button) => button.addEventListener("click", () => {
    app.querySelectorAll(".segmented button").forEach((entry) => entry.classList.remove("active"));
    button.classList.add("active");
    notice("已筛选：" + button.textContent);
  }));
}

render();
`;

const styles = String.raw`
:root{--accent:PROJECT_ACCENT;--soft:PROJECT_SOFT;--ink:PROJECT_INK;--paper:#f5f5f5;--line:rgba(0,0,0,.09)}
*{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#171717;color:#292929;font-family:"PingFang SC","Microsoft YaHei",Arial,sans-serif}button,input,textarea{font:inherit}button{cursor:pointer;color:inherit}button,input,textarea{-webkit-tap-highlight-color:transparent}body{display:flex;justify-content:center}
#app{min-height:100dvh;width:100%;max-width:430px;background:#eee}
.miniapp{background:var(--paper);min-height:100dvh;overflow:hidden;padding-bottom:66px;position:relative}
.app-header{background:#fff;position:sticky;top:0;z-index:20}.status{align-items:center;display:flex;font-size:11px;font-weight:800;height:25px;justify-content:space-between;padding:0 16px}.titlebar{align-items:center;display:flex;height:49px;justify-content:center;padding:0 15px;position:relative}.titlebar>div{text-align:center}.titlebar small,.titlebar strong{display:block}.titlebar small{color:var(--accent);font-size:8px;line-height:1}.titlebar strong{font-size:15px;margin-top:4px}.titlebar>button{background:#f2f2f2;border:0;border-radius:99px;font-size:11px;letter-spacing:2px;padding:7px 11px;position:absolute;right:12px}
.page{min-height:calc(100dvh - 140px);padding-bottom:18px}.search{align-items:center;background:#fff;display:flex;padding:8px 12px}.search span{background:#f2f2f2;border-radius:18px 0 0 18px;color:#999;height:36px;line-height:36px;padding-left:13px}.search input{background:#f2f2f2;border:0;border-radius:0 18px 18px 0;height:36px;min-width:0;outline:0;padding:0 12px;width:100%}
.hero{background:linear-gradient(135deg,var(--accent),var(--ink));border:0;color:#fff;display:block;height:190px;overflow:hidden;padding:0;position:relative;text-align:left;width:100%}.hero>img{height:100%;object-fit:cover;width:100%}.hero-shade{background:linear-gradient(90deg,rgba(0,0,0,.68),rgba(0,0,0,.04));inset:0;position:absolute}.hero-copy{display:flex;flex-direction:column;inset:0;padding:25px 22px;position:absolute}.hero-copy small{font-size:11px;opacity:.86}.hero-copy strong{font-family:"Songti SC",serif;font-size:27px;line-height:1.12;margin-top:8px;max-width:78%}.hero-copy i{background:rgba(255,255,255,.94);border-radius:99px;color:#222;font-size:10px;font-style:normal;margin-top:auto;padding:7px 10px;width:max-content}
.quick-menu{background:#fff;display:grid;grid-template-columns:repeat(4,1fr);padding:17px 5px 15px}.quick-menu button{align-items:center;background:transparent;border:0;display:flex;flex-direction:column;gap:7px;padding:0 2px}.quick-menu i{align-items:center;background:var(--soft);border-radius:15px;color:var(--accent);display:flex;font-size:13px;font-style:normal;font-weight:900;height:44px;justify-content:center;width:44px}.quick-menu span{font-size:10px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.section-title{align-items:center;display:flex;justify-content:space-between;padding:17px 14px 9px}.section-title strong{font-size:15px}.section-title span{color:#999;font-size:10px}.chips{display:flex;gap:8px;overflow:auto;padding:11px 12px}.chips button{background:#fff;border:1px solid #ddd;border-radius:99px;font-size:11px;padding:8px 14px;white-space:nowrap}.chips button.active{background:var(--ink);border-color:var(--ink);color:#fff}
.cards{display:grid;gap:8px;padding:0 11px}.card{align-items:center;background:#fff;border-radius:9px;display:grid;grid-template-columns:1fr auto;min-width:0;overflow:hidden;padding:8px}.card-main{align-items:center;background:transparent;border:0;display:grid;gap:11px;grid-template-columns:68px 1fr;min-width:0;padding:0;text-align:left}.card-art{align-items:center;background:linear-gradient(135deg,var(--soft),color-mix(in srgb,var(--accent) 35%,#fff));border-radius:7px;display:flex;height:63px;justify-content:center}.card-art b{color:var(--accent);font-size:11px}.card-copy{min-width:0}.card-copy strong,.card-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.card-copy strong{font-size:13px}.card-copy small{color:#888;font-size:10px;margin-top:6px}.card-copy em{border:1px solid color-mix(in srgb,var(--accent) 35%,#fff);color:var(--accent);display:inline-block;font-size:8px;font-style:normal;margin-top:7px;padding:2px 4px}.card-copy b{color:var(--accent);display:block;font-size:12px;margin-top:6px}.card-action{background:transparent;border:0;color:var(--accent);font-size:20px;padding:12px}.cards--grid{grid-template-columns:1fr 1fr}.cards--grid .card{display:block}.cards--grid .card-main{display:block;width:100%}.cards--grid .card-art{height:105px}.cards--grid .card-copy{padding:9px 3px 5px}.cards--grid .card-action{position:absolute;right:2px;top:96px}.cards--grid .card{position:relative}
.empty{align-items:center;background:#fff;display:flex;flex-direction:column;margin:12px;padding:70px 20px}.empty b{font-size:14px}.empty span{color:#999;font-size:11px;margin-top:8px}
.tabbar{background:rgba(255,255,255,.96);border-top:1px solid #eee;bottom:0;display:grid;height:66px;left:50%;max-width:430px;position:fixed;transform:translateX(-50%);width:100%;z-index:30}.tabbar button{align-items:center;background:transparent;border:0;color:#999;display:flex;flex-direction:column;font-size:9px;gap:4px;justify-content:center;position:relative}.tabbar button.active{color:var(--accent);font-weight:800}.tabbar i{font-size:19px;font-style:normal;line-height:1}.tabbar b{align-items:center;background:#ef4242;border-radius:50%;color:#fff;display:flex;font-size:7px;height:15px;justify-content:center;position:absolute;right:24%;top:7px;width:15px}
.segmented{background:#fff;display:grid;grid-template-columns:repeat(3,1fr);padding:0 10px}.segmented button{background:transparent;border:0;border-bottom:2px solid transparent;color:#888;padding:14px 0}.segmented button.active{border-color:var(--accent);color:var(--accent);font-weight:800}.orders{display:grid;gap:10px;padding:12px}.orders article{background:#fff;border-radius:10px;padding:15px}.orders article>div:first-child{border-bottom:1px solid #eee;display:flex;flex-direction:column;padding-bottom:12px}.orders small{color:var(--accent);font-size:8px;letter-spacing:.12em}.orders strong{font-size:15px;margin-top:7px}.orders span{color:#777;font-size:11px;margin-top:6px}.orders article>div:last-child{align-items:center;display:flex;justify-content:space-between;padding-top:11px}.orders b{font-size:13px}.orders button{background:var(--accent);border:0;border-radius:99px;color:#fff;font-size:10px;padding:7px 11px}
.cart-list{display:grid;gap:8px;padding:12px}.cart-list article{align-items:center;background:#fff;border-radius:10px;display:grid;gap:9px;grid-template-columns:auto 62px 1fr auto;padding:10px}.cart-check{align-items:center;background:#fff;border:1px solid #ccc;border-radius:50%;display:flex;height:22px;justify-content:center;padding:0;width:22px}.cart-check.active{background:var(--accent);border-color:var(--accent);color:#fff}.cart-thumb{align-items:center;background:var(--soft);color:var(--accent);display:flex;font-size:9px;height:62px;justify-content:center}.cart-list strong,.cart-list span,.cart-list b{display:block}.cart-list strong{font-size:12px}.cart-list span{color:#999;font-size:9px;margin-top:5px}.cart-list b{color:var(--accent);font-size:12px;margin-top:7px}.quantity{align-items:center;border:1px solid #ddd;display:flex}.quantity button{background:#fff;border:0;padding:4px 6px}.quantity span{color:#333;margin:0}.checkout{align-items:center;background:#fff;bottom:66px;display:grid;grid-template-columns:1fr auto;left:50%;max-width:430px;padding:11px 12px;position:fixed;transform:translateX(-50%);width:100%;z-index:25}.checkout span,.checkout strong{display:block}.checkout span{color:#999;font-size:9px}.checkout strong{font-size:13px;margin-top:4px}.checkout>button{background:var(--accent);border:0;border-radius:99px;color:#fff;font-weight:800;padding:11px 18px}
.profile-card{align-items:center;background:linear-gradient(135deg,var(--ink),var(--accent));color:#fff;display:grid;gap:12px;grid-template-columns:auto 1fr auto;padding:25px 17px}.avatar,.portrait{align-items:center;background:rgba(255,255,255,.92);border-radius:50%;color:var(--accent);display:flex;font-weight:900;justify-content:center}.avatar{height:58px;width:58px}.profile-card strong,.profile-card span{display:block}.profile-card strong{font-size:17px}.profile-card span{font-size:10px;margin-top:5px;opacity:.75}.profile-card button{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.4);border-radius:99px;color:#fff;font-size:10px;padding:7px 11px}.profile-stats{background:#fff;display:grid;grid-template-columns:repeat(3,1fr);padding:16px}.profile-stats div{border-right:1px solid #eee;text-align:center}.profile-stats div:last-child{border:0}.profile-stats b,.profile-stats span{display:block}.profile-stats b{font-size:17px}.profile-stats span{color:#999;font-size:9px;margin-top:4px}.menu-list{display:grid;gap:1px;margin-top:10px}.menu-list button{align-items:center;background:#fff;border:0;display:grid;gap:11px;grid-template-columns:auto 1fr auto;padding:14px;text-align:left}.menu-list i{color:var(--accent);font-size:9px;font-style:normal}.menu-list strong,.menu-list small{display:block}.menu-list strong{font-size:13px}.menu-list small{color:#999;font-size:9px;margin-top:4px}.menu-list>b{color:#aaa}
.people{display:grid;gap:9px;padding:11px}.people article{align-items:center;background:#fff;border-radius:10px;display:grid;gap:11px;grid-template-columns:auto 1fr auto;padding:13px}.portrait{background:var(--soft);height:55px;width:55px}.people strong,.people span,.people em{display:block}.people strong{font-size:14px}.people span{color:#777;font-size:10px;margin-top:5px}.people em{color:var(--accent);font-size:9px;font-style:normal;margin-top:5px}.people button{background:var(--accent);border:0;border-radius:99px;color:#fff;font-size:10px;padding:8px 12px}
.feed{display:grid;gap:9px;padding:10px}.feed article{background:#fff;border-radius:10px;padding:12px}.feed-user{align-items:center;display:flex;gap:9px}.feed-user>i{align-items:center;background:var(--soft);border-radius:50%;color:var(--accent);display:flex;font-style:normal;font-weight:900;height:34px;justify-content:center;width:34px}.feed-user strong,.feed-user small{display:block}.feed-user strong{font-size:12px}.feed-user small{color:#999;font-size:9px;margin-top:3px}.feed-photo{background:linear-gradient(135deg,var(--soft),var(--accent));border-radius:7px;height:135px;margin-top:10px}.feed-photo--1{background:linear-gradient(135deg,#d8e6ec,#6f91a1)}.feed-photo--2{background:linear-gradient(135deg,#f0d6c3,#ac7054)}.feed-actions{border-top:1px solid #eee;display:grid;grid-template-columns:repeat(3,1fr);margin-top:10px;padding-top:8px}.feed-actions button{background:transparent;border:0;color:#777;font-size:9px}
.live-stage{background:#161621;border:0;color:#fff;display:flex;flex-direction:column;height:280px;justify-content:flex-end;overflow:hidden;padding:18px;position:relative;text-align:left;width:100%}.live-stage img{height:100%;inset:0;object-fit:cover;position:absolute;width:100%}.live-stage:after{background:linear-gradient(transparent,rgba(0,0,0,.82));content:"";inset:0;position:absolute}.live-stage>*{position:relative;z-index:1}.live-stage>i{align-items:center;align-self:center;background:rgba(0,0,0,.45);border:1px solid #fff;border-radius:50%;display:flex;font-style:normal;height:52px;justify-content:center;margin:auto;width:52px}.live-stage strong{font-size:18px}.live-stage small{font-size:10px;margin-top:6px;opacity:.75}.live-badge{background:#ef4655;font-size:9px;left:14px;padding:5px 7px;position:absolute;top:14px}.live-stage.playing .live-badge{background:#6d5ca5}
.map{background:#dfe8df;height:300px;overflow:hidden;position:relative}.road{background:#fff;border:1px solid #cdd8cd;height:18px;position:absolute;width:130%;}.road--one{left:-20%;top:42%;transform:rotate(18deg)}.road--two{left:-10%;top:63%;transform:rotate(-28deg)}.pin{align-items:center;background:var(--accent);border:4px solid #fff;border-radius:50% 50% 50% 0;color:#fff;display:flex;font-style:normal;height:38px;justify-content:center;position:absolute;transform:rotate(-45deg);width:38px}.pin--one{left:22%;top:28%}.pin--two{right:19%;top:52%}.pin--me{background:#287bea;left:48%;top:56%}.map>span{background:#fff;border-radius:4px;font-size:10px;padding:5px 7px;position:absolute}.map>span:nth-of-type(1){left:12%;top:17%}.map>span:nth-of-type(2){right:10%;top:42%}.map>button{background:#fff;border:0;border-radius:99px;bottom:14px;box-shadow:0 4px 16px rgba(0,0,0,.15);font-size:10px;padding:9px 12px;position:absolute;right:14px}
.calculator{display:grid;gap:9px;padding:12px}.calc-result{background:linear-gradient(135deg,var(--ink),var(--accent));border-radius:13px;color:#fff;padding:24px}.calc-result small,.calc-result strong,.calc-result span{display:block}.calc-result small{font-size:10px;opacity:.7}.calc-result strong{font-size:30px;margin-top:8px}.calc-result span{font-size:10px;margin-top:5px;opacity:.75}.calculator label{align-items:center;background:#fff;border-radius:8px;display:grid;grid-template-columns:100px 1fr;padding:13px}.calculator label span{font-size:12px}.calculator input{border:0;outline:0;text-align:right}.calculator>button,.primary-wide{background:var(--accent);border:0;border-radius:99px;color:#fff;font-weight:800;padding:14px;width:100%}
.calendar{background:#fff;margin:11px;padding:14px}.calendar-head{align-items:center;display:flex;justify-content:space-between}.calendar-head button{background:transparent;border:0;font-size:18px}.calendar-grid{display:grid;gap:5px;grid-template-columns:repeat(7,1fr);margin-top:14px}.calendar-grid button{background:transparent;border:0;border-radius:50%;font-size:10px;height:35px}.calendar-grid button.selected{background:var(--accent);color:#fff;font-weight:800}
.quiz{background:linear-gradient(155deg,var(--ink),var(--accent));color:#fff;display:flex;flex-direction:column;min-height:390px;padding:26px 20px}.quiz>small{font-size:10px;letter-spacing:.14em;opacity:.7}.quiz>strong{font-size:23px;line-height:1.5;margin:30px 0 18px}.quiz-progress{background:rgba(255,255,255,.18);height:4px;margin-bottom:18px}.quiz-progress i{background:#fff;display:block;height:100%;width:28%}.quiz>button{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:8px;color:#fff;margin-top:9px;padding:13px;text-align:left}.quiz>button.selected{background:#fff;color:var(--ink)}
.podium{align-items:end;background:linear-gradient(180deg,var(--accent),var(--ink));color:#fff;display:grid;gap:8px;grid-template-columns:repeat(3,1fr);height:370px;padding:35px 14px}.podium article{align-items:center;background:rgba(255,255,255,.14);border-radius:12px 12px 0 0;display:flex;flex-direction:column;padding:16px 8px;text-align:center}.podium .rank-1{grid-column:2;grid-row:1;height:245px}.podium .rank-2{grid-column:1;grid-row:1;height:190px}.podium .rank-3{grid-column:3;grid-row:1;height:165px}.podium i{align-items:center;background:#fff;border-radius:50%;color:var(--accent);display:flex;font-style:normal;font-weight:900;height:38px;justify-content:center;width:38px}.podium strong{font-size:12px;margin-top:16px}.podium span{font-size:9px;margin-top:6px;opacity:.75}
.step-ring{align-items:center;background:linear-gradient(160deg,var(--accent),var(--ink));display:flex;height:280px;justify-content:center}.step-ring>div{align-items:center;border:14px solid rgba(255,255,255,.28);border-radius:50%;color:#fff;display:flex;flex-direction:column;height:190px;justify-content:center;outline:7px solid rgba(255,255,255,.12);width:190px}.step-ring strong{font-size:38px}.step-ring span{font-size:11px;margin-top:5px}.step-metrics{background:#fff;display:grid;grid-template-columns:repeat(3,1fr);padding:15px}.step-metrics div{text-align:center}.step-metrics b,.step-metrics span{display:block}.step-metrics b{font-size:17px}.step-metrics span{color:#999;font-size:9px;margin-top:4px}.page--steps>.primary-wide{margin:12px;width:calc(100% - 24px)}
.publish{display:grid;gap:9px;padding:11px}.publish>label{background:#fff;border-radius:8px;padding:12px}.publish>label span{display:block;font-size:11px;font-weight:800}.publish input,.publish textarea{border:0;margin-top:8px;outline:0;width:100%}.publish textarea{height:90px;resize:none}.upload{align-items:center;background:#fff;display:flex;justify-content:space-between;padding:12px}.upload button{background:var(--soft);border:1px dashed var(--accent);color:var(--accent);height:70px;width:90px}.upload span{color:#999;font-size:9px}.publish-row{align-items:center;background:#fff;border:0;display:flex;justify-content:space-between;padding:12px;text-align:left}.publish-row strong,.publish-row small{display:block}.publish-row strong{font-size:12px}.publish-row small{color:#999;font-size:9px;margin-top:4px}
.business-card{background:linear-gradient(145deg,var(--ink),var(--accent));color:#fff;margin:13px;padding:25px}.business-card>small{font-size:8px;letter-spacing:.16em;opacity:.6}.business-card .avatar{margin-top:40px}.business-card h2{font-size:27px;margin:17px 0 7px}.business-card p{font-size:11px;margin:0;opacity:.75}.business-card>div:last-child{display:flex;gap:8px;margin-top:28px}.business-card>div:last-child button{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff;padding:9px 12px}.radar-chart{background:#fff;margin:11px;padding:16px}.radar-total small,.radar-total strong,.radar-total span{display:block}.radar-total small{color:#999;font-size:9px}.radar-total strong{font-size:36px;margin-top:5px}.radar-total span{color:var(--accent);font-size:10px}.bars{align-items:end;display:flex;gap:8px;height:145px;margin-top:20px}.bars i{background:linear-gradient(var(--accent),var(--soft));border-radius:5px 5px 0 0;flex:1;position:relative}.bars b{bottom:-19px;font-size:8px;font-style:normal;font-weight:400;left:50%;position:absolute;transform:translateX(-50%)}
.errand-form{display:grid;gap:1px;padding:12px}.route-point{align-items:center;background:#fff;display:grid;gap:10px;grid-template-columns:30px 1fr;padding:12px}.route-point i{align-items:center;background:var(--accent);border-radius:50%;color:#fff;display:flex;font-size:9px;font-style:normal;height:25px;justify-content:center;width:25px}.route-point input{border:0;outline:0}.errand-types{display:grid;gap:8px;grid-template-columns:repeat(3,1fr);margin:14px 0}.errand-types button{align-items:center;background:#fff;border:0;display:flex;flex-direction:column;padding:15px 7px;text-align:center}.errand-types i{align-items:center;background:var(--soft);border-radius:50%;color:var(--accent);display:flex;font-style:normal;height:42px;justify-content:center;width:42px}.errand-types strong{font-size:11px;margin-top:8px}.errand-types span{color:#999;font-size:8px;margin-top:5px}
.detail{background:#fff;bottom:0;left:0;overflow:auto;padding:18px 18px 35px;position:fixed;right:0;top:0;z-index:60}.detail-back{background:transparent;border:0;color:#666;padding:5px 0}.detail>small{color:var(--accent);display:block;font-size:8px;letter-spacing:.14em;margin-top:24px}.detail-art{align-items:center;background:linear-gradient(135deg,var(--soft),var(--accent));display:flex;height:240px;justify-content:center;margin-top:10px;overflow:hidden}.detail-art img{height:100%;object-fit:cover;width:100%}.detail-art span{align-items:center;background:rgba(255,255,255,.82);border-radius:50%;color:var(--accent);display:flex;font-size:40px;font-weight:900;height:85px;justify-content:center;width:85px}.detail h2{font-size:27px;letter-spacing:-.04em;margin:20px 0 9px}.detail p{color:#777;font-size:12px;line-height:1.7}.detail-info{border-bottom:1px solid #eee;border-top:1px solid #eee;display:grid;grid-template-columns:1fr 1fr;margin-top:18px;padding:14px 0}.detail-info span{color:#999;display:flex;flex-direction:column;font-size:9px;gap:3px}.detail-info b{color:#333;font-size:15px}.detail-actions{display:grid;gap:8px;grid-template-columns:1fr 2fr;margin-top:18px}.detail-actions button{border:1px solid #ddd;border-radius:99px;padding:13px}.detail-actions .primary{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:800}
.loading{align-items:center;background:rgba(255,255,255,.92);bottom:0;display:flex;flex-direction:column;gap:8px;justify-content:center;left:0;position:fixed;right:0;top:0;z-index:100}.loading i{animation:spin .8s linear infinite;border:4px solid rgba(0,0,0,.1);border-radius:50%;border-top-color:var(--accent);height:34px;width:34px}.loading strong{font-size:13px;margin-top:5px}.loading span{color:#999;font-size:9px}.toast{background:rgba(20,20,20,.92);border-radius:99px;bottom:82px;color:#fff;font-size:11px;left:50%;max-width:82%;padding:10px 15px;position:fixed;transform:translateX(-50%);white-space:nowrap;z-index:110}@keyframes spin{to{transform:rotate(360deg)}}
body[data-flavor="delivery"]{--paper:#f4f4f4}body[data-flavor="delivery"] .app-header{background:var(--accent);color:#fff}body[data-flavor="delivery"] .titlebar small{color:#fff}body[data-flavor="career"] .hero{border-radius:0 0 28px 0}body[data-flavor="media"] .app-header{background:var(--accent);color:#fff}body[data-flavor="media"] .titlebar small{color:#fff}body[data-flavor="scenic"] .quick-menu i{border-radius:50%}body[data-flavor="health"] .hero-copy strong{font-family:inherit}body[data-flavor="property"] .app-header{background:var(--accent);color:#fff}body[data-flavor="property"] .titlebar small{color:#fff}body[data-flavor="design"] .card{border-radius:0}body[data-flavor="learning"] .app-header{background:var(--accent);color:#fff}body[data-flavor="learning"] .titlebar small{color:#fff}body[data-flavor="game"] .app-header{background:var(--ink);color:#fff}body[data-flavor="game"] .titlebar small{color:#d5baff}body[data-flavor="museum"]{font-family:"Songti SC",serif}body[data-flavor="museum"] .app-header{background:#070707;color:#fff}body[data-flavor="museum"] .titlebar small{color:#c79791}body[data-flavor="visa"] .hero{height:250px}body[data-flavor="business"] .app-header,body[data-flavor="law"] .app-header,body[data-flavor="beauty"] .app-header{background:#111;color:#fff}body[data-flavor="law"] .titlebar small,body[data-flavor="beauty"] .titlebar small{color:#fff}body[data-flavor="wedding"] .quick-menu i,body[data-flavor="community"] .quick-menu i,body[data-flavor="dating"] .quick-menu i{border-radius:50%}body[data-flavor="community"] .feed article{border-left:3px solid var(--accent)}body[data-flavor="recycle"] .app-header{background:#111;color:#fff}body[data-flavor="recycle"] .titlebar small{color:#ffda44}body[data-flavor="hotel"] .hero-copy strong{font-family:inherit}
@media(min-width:560px){body{padding:30px}#app{border:8px solid #080808;border-radius:40px;box-shadow:0 30px 90px rgba(0,0,0,.5);height:850px;min-height:0;overflow:hidden}.miniapp{height:834px;min-height:0;overflow:auto}.tabbar{bottom:auto;margin-top:768px;position:absolute}.detail,.loading{bottom:auto;height:834px;left:50%;max-width:414px;top:38px;transform:translateX(-50%)}.toast{bottom:auto;top:780px}}@media(prefers-reduced-motion:reduce){.loading i{animation:none}}
`;

const primaryByCategory = {
  "电商零售": ["cart", "加入购物车"],
  "餐饮外卖": ["cart", "加入订单"],
  "房产家居": ["message", "立即预约"],
  "教育知识": ["message", "开始学习"],
  "旅游出行": ["message", "继续办理"],
  "企业品牌": ["message", "立即咨询"],
  "社交社区": ["message", "发起互动"],
  "生活服务": ["message", "确认预约"],
  "文娱内容": ["favorite", "收藏内容"],
};

rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });

for (const project of projects) {
  const workDir = join(outputRoot, project.slug);
  const assetDir = join(workDir, "assets");
  mkdirSync(assetDir, { recursive: true });
  const hasAsset = Boolean(project.asset && existsSync(project.asset));
  if (hasAsset) {
    const destination = join(assetDir, "hero.webp");
    if (extname(project.asset).toLowerCase() === ".webp") {
      copyFileSync(project.asset, destination);
    } else {
      execFileSync("/opt/homebrew/bin/cwebp", ["-quiet", "-q", "80", project.asset, "-o", destination]);
    }
  }

  const [primaryKind, primaryAction] = primaryByCategory[project.category] ?? ["message", "确认操作"];
  const browserProject = { ...project, hasAsset, primaryKind, primaryAction };
  delete browserProject.asset;

  writeFileSync(join(workDir, "index.html"), indexHtml(project));
  writeFileSync(join(workDir, "app.js"), `const PROJECT = ${JSON.stringify(browserProject, null, 2)};\n${runtime}`);
  writeFileSync(
    join(workDir, "styles.css"),
    styles
      .replaceAll("PROJECT_ACCENT", project.accent)
      .replaceAll("PROJECT_SOFT", project.soft)
      .replaceAll("PROJECT_INK", project.ink),
  );
  writeFileSync(
    join(workDir, "manifest.json"),
    JSON.stringify({
      workId: project.workId,
      slug: project.slug,
      name: project.name,
      version: project.version,
      category: project.category,
      sourceBasis: project.source,
      scope: "用户端主导航与核心业务链路",
      routes: project.routes.map(({ id, label, kind }) => ({ id, label, kind })),
      files: ["index.html", "app.js", "styles.css", ...(hasAsset ? ["assets/hero.webp"] : [])],
    }, null, 2),
  );
}

writeFileSync(
  join(outputRoot, "README.md"),
  [
    "# 独立作品目录",
    "",
    "每个作品目录包含独立入口、脚本、样式、清单和本地资源。作品之间不共享运行时代码。",
    "",
    ...projects.map((project) => `- \`${project.slug}/\` — ${project.name} ${project.version}（${project.routes.length} 个主导航页面）`),
    "",
  ].join("\n"),
);

console.log(`Generated ${projects.length} standalone works in ${outputRoot}`);
