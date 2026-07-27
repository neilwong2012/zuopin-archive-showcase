"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  name: string;
  version: string;
  category: string;
  eyebrow: string;
  summary: string;
  accent: string;
  soft: string;
  dark: string;
  metrics: [string, string][];
  tags: string[];
  tabs: string[];
  sourceNote: string;
  template?: "property" | "education" | "travel" | "business" | "community" | "service" | "commerce";
  hero?: string;
  heroSub?: string;
  asset?: string;
  menu?: [string, string, string, string];
  items?: [string, string, string];
};

const projects: Project[] = [
  {
    id: "hej",
    name: "禾匠商城",
    version: "v4.4.45",
    category: "电商零售",
    eyebrow: "多端商城解决方案",
    summary: "依据源码中的 DIY 首页、商品流、优惠券和购物车组件，恢复一套可浏览的商城首页。",
    accent: "#ff4544",
    soft: "#fff0ef",
    dark: "#2b1111",
    metrics: [["5 套", "历史版本合并"], ["商城", "核心形态"], ["真实", "源码组件结构"]],
    tags: ["DIY 首页", "商品瀑布流", "营销组件"],
    tabs: ["首页", "分类", "购物车"],
    sourceNote: "pages/index + app-index 商品组件",
  },
  {
    id: "wmall",
    name: "啦啦外卖",
    version: "v19.9.0",
    category: "餐饮外卖",
    eyebrow: "本地餐饮与即时配送",
    summary: "保留源码的红色品牌栏、定位搜索、营销入口、商家列表与四栏底部导航。",
    accent: "#ff2d4b",
    soft: "#fff0f3",
    dark: "#2e1015",
    metrics: [["3 套", "旧版本合并"], ["4 栏", "源码底部导航"], ["19.9", "保留版本"]],
    tags: ["附近餐厅", "跑腿入口", "订单状态"],
    tabs: ["首页", "订单", "跑腿", "我的"],
    sourceNote: "pages/home/index + DIY 模板",
  },
  {
    id: "jobs",
    name: "求职招聘",
    version: "v4.1.89",
    category: "企业品牌",
    eyebrow: "人才与机会匹配平台",
    summary: "依照源码的城市搜索、双入口、人才横滑和职位列表，使用假数据恢复招聘首页。",
    accent: "#0180cf",
    soft: "#eaf5fc",
    dark: "#09263a",
    metrics: [["4 套", "历史版本合并"], ["2 种", "首页模板"], ["双角色", "企业与人才"]],
    tags: ["城市搜索", "人才推荐", "职位列表"],
    tabs: ["首页", "找工作", "找人才", "我的"],
    sourceNote: "index_0 / index_1 双模板",
  },
  {
    id: "live",
    name: "小智微直播",
    version: "v3.9.5",
    category: "文娱内容",
    eyebrow: "直播内容与频道运营",
    summary: "复刻源码的紫灰导航、搜索、频道横滑、直播封面和实时观看状态。",
    accent: "#8484b7",
    soft: "#efeff8",
    dark: "#202039",
    metrics: [["3.9.5", "最新版本"], ["频道", "横向筛选"], ["实时", "互动反馈"]],
    tags: ["频道发现", "直播封面", "实时人数"],
    tabs: ["直播", "频道", "收藏"],
    sourceNote: "movieIndex 直播频道首页",
  },
  {
    id: "travel",
    name: "景区旅游",
    version: "v5.5.6",
    category: "旅游出行",
    eyebrow: "景区票务与会员服务",
    summary: "依据源码的绿色导航、轮播、四宫格菜单、热卖双列和票务底栏重建。",
    accent: "#1fa98f",
    soft: "#e8f7f3",
    dark: "#0b3029",
    metrics: [["5.5.6", "保留版本"], ["4 栏", "源码票务导航"], ["双列", "热卖商品流"]],
    tags: ["景区菜单", "门票热卖", "订单会员"],
    tabs: ["首页", "购物车", "我的订单", "会员中心"],
    sourceNote: "hawk_scenic/pages/index",
  },
  {
    id: "health",
    name: "医疗小程序",
    version: "v6.0.0",
    category: "生活服务",
    eyebrow: "在线问诊与健康管理",
    summary: "按源码首页的轮播、服务保障、问诊卡、帮你解决和推荐专家区重新组织。",
    accent: "#16c95e",
    soft: "#eaf9f0",
    dark: "#113323",
    metrics: [["6.0.0", "最新版本"], ["多服务", "源码首页入口"], ["专家", "预约与问诊"]],
    tags: ["在线问诊", "体检预约", "专家推荐"],
    tabs: ["首页", "问诊", "体检", "我的"],
    sourceNote: "hyb_yl/index 首页服务流",
  },
  {
    id: "estate",
    name: "掌门智慧房产",
    version: "v1.3.27",
    category: "房产家居",
    eyebrow: "新房、二手房与经纪服务",
    summary: "沿用源码首页的房源入口、区域筛选、经纪人和热门楼盘信息流，补充可操作的预约看房路径。",
    accent: "#1aae91",
    soft: "#e8f8f4",
    dark: "#10362f",
    metrics: [["1.3.27", "保留最新版"], ["房源", "多条件筛选"], ["预约", "看房业务流"]],
    tags: ["热门楼盘", "地图找房", "预约看房"],
    tabs: ["首页", "找房", "经纪人", "我的"],
    sourceNote: "zm_house/pages/index/index + 原模块预览图",
    template: "property",
    hero: "好房不等人",
    heroSub: "全城 1,286 套真实房源",
    asset: "/source-assets/archive/estate.webp",
    menu: ["新房", "二手房", "租房", "地图找房"],
    items: ["云栖湖畔 · 三居", "软件园品质公寓", "鹭岛中央大宅"],
  },
  {
    id: "renovation",
    name: "麦芒装饰装修 DIY",
    version: "v3.2.59",
    category: "房产家居",
    eyebrow: "装修灵感与在线设计",
    summary: "根据源码绿色主题、装修计算器、案例和 VR 入口，还原一套从找灵感到预约设计的首页。",
    accent: "#00cc99",
    soft: "#e6faf5",
    dark: "#073c31",
    metrics: [["3.2.59", "保留最新版"], ["VR", "源码功能入口"], ["DIY", "装修方案"]],
    tags: ["装修案例", "VR 看房", "在线报价"],
    tabs: ["首页", "效果图", "计算器", "我的"],
    sourceNote: "pages/index/index WXSS + public/diyimages/vr.png",
    template: "property",
    hero: "把理想家装进现实",
    heroSub: "上传户型，免费获取 3 套方案",
    asset: "/source-assets/archive/renovation.webp",
    menu: ["效果图", "找设计师", "装修报价", "VR 全景"],
    items: ["原木治愈两居", "轻法式主卧", "极简通透客厅"],
  },
  {
    id: "course",
    name: "知识付费在线课程",
    version: "v7.1.2",
    category: "教育知识",
    eyebrow: "音视频与图文课程平台",
    summary: "保留源码蓝紫主色、公告、分类、导师、免费课和音视频课程结构，重建学习操作。",
    accent: "#6686e4",
    soft: "#eef1ff",
    dark: "#1d2852",
    metrics: [["7.1.2", "保留最新版"], ["4 栏", "原始底部导航"], ["多媒体", "课程内容"]],
    tags: ["音频课程", "视频课程", "导师主页"],
    tabs: ["首页", "音频", "视频", "我的"],
    sourceNote: "kuowan_video/pages/index + 原 banner.jpg",
    template: "education",
    hero: "今天学点新东西",
    heroSub: "68 门体系课正在更新",
    asset: "/source-assets/archive/course.webp",
    menu: ["热门", "导师", "免费", "精美图文"],
    items: ["设计思维入门", "零基础短视频课", "高效表达训练营"],
  },
  {
    id: "answer",
    name: "知乎答题王",
    version: "v2.1.6",
    category: "教育知识",
    eyebrow: "竞技答题与段位成长",
    summary: "依据源码紫色竞技界面、等级、每日奖励和赛季结算元素，模拟匹配、答题与领奖。",
    accent: "#7d37e3",
    soft: "#f2eaff",
    dark: "#261044",
    metrics: [["2.1.6", "保留最新版"], ["赛季", "段位体系"], ["即时", "匹配反馈"]],
    tags: ["随机匹配", "段位奖励", "每日挑战"],
    tabs: ["答题", "排行", "题库", "我的"],
    sourceNote: "hc_answer/pages/index + #7d37e3 主题 WXSS",
    template: "education",
    hero: "知识王者挑战赛",
    heroSub: "本赛季已有 12,408 人参赛",
    asset: "/source-assets/archive/answer.webp",
    menu: ["快速匹配", "好友对战", "每日一题", "赛季奖励"],
    items: ["文学常识挑战", "生活百科 100 题", "科技前沿擂台"],
  },
  {
    id: "school",
    name: "微教育",
    version: "v2.42.8",
    category: "教育知识",
    eyebrow: "校园通知与家校服务",
    summary: "从源码的学校首页、课程、报名、成绩和周计划模块提炼出家校服务手机界面。",
    accent: "#14a247",
    soft: "#eaf8ef",
    dark: "#0d3820",
    metrics: [["2.42.8", "保留最新版"], ["家校", "双向信息"], ["课程", "报名管理"]],
    tags: ["校园通知", "课程报名", "成绩查询"],
    tabs: ["校园", "课程", "消息", "我的"],
    sourceNote: "fm_jiaoyu/pages/home + public/mobile/img/enroll.png",
    template: "education",
    hero: "鹭岛实验学校",
    heroSub: "让每一次成长都有记录",
    asset: "/source-assets/archive/school.webp",
    menu: ["校园通知", "在线报名", "课程表", "查成绩"],
    items: ["暑期兴趣班报名", "本周校园开放日", "二年级课程提醒"],
  },
  {
    id: "auto",
    name: "4S 汽车城",
    version: "v7.1.0",
    category: "旅游出行",
    eyebrow: "车型导购与到店预约",
    summary: "使用源码蓝色导航、车型展示、指导价、销售咨询和到店预约结构恢复汽车城首页。",
    accent: "#1296db",
    soft: "#e8f5fc",
    dark: "#0a3045",
    metrics: [["7.1.0", "保留最新版"], ["车型", "价格导购"], ["到店", "试驾预约"]],
    tags: ["车型图库", "询底价", "预约试驾"],
    tabs: ["首页", "车型", "活动", "我的"],
    sourceNote: "pages/index/index + images/tgc_01.jpg",
    template: "travel",
    hero: "驾驭你的下一程",
    heroSub: "本月购车补贴最高 ¥12,000",
    asset: "/source-assets/archive/auto.webp",
    menu: ["热销车型", "询底价", "预约试驾", "门店导航"],
    items: ["星越 L 智擎版", "极氪 007 后驱版", "领克 08 EM-P"],
  },
  {
    id: "warriors",
    name: "兵马俑实时导览",
    version: "合集最新版",
    category: "旅游出行",
    eyebrow: "语音画册与景区导览",
    summary: "按照原包截图和源码的水墨语音画册、导览地图、展品详情与播放控件进行交互还原。",
    accent: "#8f2028",
    soft: "#f7eeee",
    dark: "#281719",
    metrics: [["2 栏", "原始主导航"], ["语音", "展品讲解"], ["实时", "路线导览"]],
    tags: ["语音画册", "展品故事", "实时导览"],
    tabs: ["语音画册", "实时导览"],
    sourceNote: "pages/index + pages/guide + src/scene5.png",
    template: "travel",
    hero: "秦始皇帝陵博物院",
    heroSub: "水墨画册 · 边走边听",
    asset: "/source-assets/archive/warriors.webp",
    menu: ["一号坑", "二号坑", "文物陈列", "秦陵导览"],
    items: ["高级军吏俑", "跪射武士俑", "彩绘铜车马"],
  },
  {
    id: "visa",
    name: "熊猫签证",
    version: "合集最新版",
    category: "旅游出行",
    eyebrow: "目的地签证办理服务",
    summary: "严格参考原包截图的大图目的地卡片、粉色底栏和订单流程，模拟签证材料提交。",
    accent: "#f47f8a",
    soft: "#fff0f2",
    dark: "#462126",
    metrics: [["3 国", "首页目的地"], ["材料", "在线提交"], ["订单", "进度跟踪"]],
    tags: ["商务签", "旅游签", "材料清单"],
    tabs: ["签证", "订单"],
    sourceNote: "pandaVisa pages/index + 原包展示截图",
    template: "travel",
    hero: "说走就走，材料少跑",
    heroSub: "热门国家最快 5 个工作日",
    asset: "/source-assets/archive/visa.webp",
    menu: ["日本", "新加坡", "澳大利亚", "全部国家"],
    items: ["日本单次旅游签", "新加坡商务签", "澳大利亚访客签"],
  },
  {
    id: "card",
    name: "超人名片",
    version: "v2.9.11",
    category: "企业品牌",
    eyebrow: "智能名片与客户经营",
    summary: "依据最新版内层前端包的名片、动态、雷达和客户库模块，重建销售名片首页。",
    accent: "#2a9df4",
    soft: "#eaf5fe",
    dark: "#0f3048",
    metrics: [["2.9.11", "保留最新版"], ["雷达", "访客追踪"], ["名片", "一键交换"]],
    tags: ["个人名片", "访客雷达", "客户库"],
    tabs: ["名片", "动态", "雷达", "我的"],
    sourceNote: "super_card/pages/home + resource/icon/cardbook",
    template: "business",
    hero: "让每次认识更有价值",
    heroSub: "今日名片被查看 36 次",
    asset: "/source-assets/archive/card.webp",
    menu: ["交换名片", "拨打电话", "企业官网", "保存通讯录"],
    items: ["AI 产品解决方案", "企业数字化案例", "本周客户动态"],
  },
  {
    id: "lawyer",
    name: "柚子律师",
    version: "v1.7.0",
    category: "企业品牌",
    eyebrow: "律师咨询与案件服务",
    summary: "沿用源码黑白红视觉、在线服务、业务范围、律师列表和咨询预约业务流。",
    accent: "#ce0000",
    soft: "#fbecec",
    dark: "#321010",
    metrics: [["1.7.0", "保留最新版"], ["律师", "专业领域"], ["咨询", "预约服务"]],
    tags: ["付费咨询", "律师团队", "案例库"],
    tabs: ["首页", "律师", "案例", "我的"],
    sourceNote: "zhls_sun/pages/shouye/index + first/fenxiang.jpg",
    template: "business",
    hero: "专业法律服务",
    heroSub: "已有 8,642 次咨询得到回复",
    asset: "/source-assets/archive/lawyer.webp",
    menu: ["在线预约", "付费咨询", "电话预约", "业务范围"],
    items: ["劳动争议怎么处理", "合同风险快速审查", "婚姻家事咨询"],
  },
  {
    id: "wedding",
    name: "婚庆服务",
    version: "v1.3.5",
    category: "企业品牌",
    eyebrow: "婚礼灵感与商家预约",
    summary: "按源码粉色主题、婚纱分类、档期日历、案例和商家入驻模块实现婚庆展示。",
    accent: "#f54264",
    soft: "#fff0f3",
    dark: "#43131d",
    metrics: [["1.3.5", "保留最新版"], ["档期", "在线管理"], ["案例", "商家展示"]],
    tags: ["婚礼案例", "婚纱礼服", "档期预约"],
    tabs: ["灵感", "商家", "档期", "我的"],
    sourceNote: "kundian_wedding/pages/index + img/enter_banner.jpg",
    template: "business",
    hero: "把喜欢写进婚礼",
    heroSub: "2026 秋季热门档期开放预约",
    asset: "/source-assets/archive/wedding.webp",
    menu: ["婚礼策划", "婚纱礼服", "摄影跟拍", "婚宴酒店"],
    items: ["海岛白色婚礼", "新中式园林宴", "落日草坪仪式"],
  },
  {
    id: "city",
    name: "米花同城社区",
    version: "v7.8.3",
    category: "社交社区",
    eyebrow: "本地资讯与生活圈",
    summary: "保留源码橙色导航、同城信息、商家、发布和个人中心结构，加入点赞与详情互动。",
    accent: "#fb5100",
    soft: "#fff0e8",
    dark: "#49200c",
    metrics: [["7.8.3", "保留最新版"], ["4 栏", "源码底部导航"], ["同城", "信息发布"]],
    tags: ["同城动态", "附近商家", "便民信息"],
    tabs: ["首页", "商家", "发布", "我的"],
    sourceNote: "yc_youliao/page/index + tabBar #fb5100",
    template: "community",
    hero: "今天，同城有什么新鲜事",
    heroSub: "厦门 · 3.2 万人在这里生活",
    asset: "/source-assets/archive/city.webp",
    menu: ["招聘求职", "房屋租售", "二手闲置", "拼车出行"],
    items: ["周末海边市集开摊啦", "软件园附近求合租", "出一台九成新咖啡机"],
  },
  {
    id: "flea",
    name: "超人二手跳蚤市场",
    version: "v5.4.10",
    category: "社交社区",
    eyebrow: "社区闲置物品交易",
    summary: "依据源码橙色标记、城市、发布、距离和积分价格结构，恢复附近二手市场。",
    accent: "#ff6600",
    soft: "#fff1e6",
    dark: "#47220b",
    metrics: [["5.4.10", "保留最新版"], ["附近", "距离排序"], ["交易", "闲置发布"]],
    tags: ["附近闲置", "发布物品", "收藏议价"],
    tabs: ["市场", "分类", "发布", "我的"],
    sourceNote: "pages/home/index WXSS + libs/images/poster.jpg",
    template: "community",
    hero: "让闲置流动起来",
    heroSub: "附近 5 公里有 268 件好物",
    asset: "/source-assets/archive/flea.webp",
    menu: ["数码", "家居", "服饰", "免费送"],
    items: ["九成新机械键盘", "搬家出宜家边桌", "复古胶片相机"],
  },
  {
    id: "match",
    name: "同城智慧红娘",
    version: "v1.0.36",
    category: "社交社区",
    eyebrow: "同城相亲与红娘服务",
    summary: "沿用源码粉色启动页、缘分推荐、招呼、礼物和资料认证元素，构建轻量互动。",
    accent: "#ff677d",
    soft: "#fff0f3",
    dark: "#481921",
    metrics: [["1.0.36", "保留最新版"], ["同城", "缘分推荐"], ["认证", "资料体系"]],
    tags: ["缘分推荐", "在线招呼", "红娘牵线"],
    tabs: ["缘分", "动态", "消息", "我的"],
    sourceNote: "pages/start + ss48_match/images/love_broadcast_bg2.png",
    template: "community",
    hero: "开启你的同城缘分",
    heroSub: "今日已有 128 对互相喜欢",
    asset: "/source-assets/archive/match.webp",
    menu: ["今日推荐", "附近的人", "红娘牵线", "实名认证"],
    items: ["爱旅行的产品经理", "周末常去看展", "喜欢小动物的设计师"],
  },
  {
    id: "o2o",
    name: "上门预约服务",
    version: "v4.10.9",
    category: "生活服务",
    eyebrow: "到家服务与人员预约",
    summary: "按源码红色主题、优惠专区、服务分类、人员选择、立即购买和预约业务流还原。",
    accent: "#ff0036",
    soft: "#ffeaf0",
    dark: "#43000f",
    metrics: [["4.10.9", "保留最新版"], ["上门", "预约服务"], ["人员", "可选技师"]],
    tags: ["服务分类", "预约时间", "上门人员"],
    tabs: ["首页", "分类", "订单", "我的"],
    sourceNote: "xg_o2o/index/index + #ff0036 主题 WXSS",
    template: "service",
    hero: "家务事，交给专业的人",
    heroSub: "最快 30 分钟响应",
    asset: "/source-assets/archive/o2o.webp",
    menu: ["家电清洗", "日常保洁", "上门维修", "收纳整理"],
    items: ["空调深度清洗", "全屋日常保洁", "水电上门检修"],
  },
  {
    id: "beauty",
    name: "美容美发营销版",
    version: "v3.4.6",
    category: "生活服务",
    eyebrow: "门店项目与技师预约",
    summary: "结合源码黑色导航、服务项目、会员、优惠券和门店展示资源，重建预约首页。",
    accent: "#b08a5a",
    soft: "#f6f0e8",
    dark: "#30251a",
    metrics: [["3.4.6", "保留最新版"], ["门店", "会员营销"], ["预约", "服务时段"]],
    tags: ["门店项目", "技师预约", "会员权益"],
    tabs: ["首页", "服务", "预约", "我的"],
    sourceNote: "xc_beauty/pages/index + resource/images/display.jpg",
    template: "service",
    hero: "为今天的自己焕新",
    heroSub: "新客到店体验 ¥68 起",
    asset: "/source-assets/archive/beauty.webp",
    menu: ["剪发造型", "染烫护理", "美容护理", "预约技师"],
    items: ["高级设计师剪发", "头皮深层护理", "日系透明感染发"],
  },
  {
    id: "recycle",
    name: "手机回收",
    version: "v4.0.6",
    category: "生活服务",
    eyebrow: "旧机估价、回收与维修",
    summary: "沿用源码黑黄配色、热门型号、故障选择、估价订单和维修四栏导航。",
    accent: "#d8b839",
    soft: "#fff9df",
    dark: "#332d10",
    metrics: [["4.0.6", "保留最新版"], ["4 栏", "原始业务导航"], ["估价", "回收流程"]],
    tags: ["热门机型", "在线估价", "回收订单"],
    tabs: ["我要回收", "我要维修", "订单", "我的"],
    sourceNote: "pages/index/recycle + resource/images/banner.png",
    template: "service",
    hero: "旧手机，换个好价钱",
    heroSub: "顺丰包邮 · 隐私清除 · 极速打款",
    asset: "/source-assets/archive/recycle.webp",
    menu: ["苹果", "华为", "小米", "全部机型"],
    items: ["iPhone 15 Pro", "Mate 60 Pro", "小米 14"],
  },
  {
    id: "step",
    name: "步数宝",
    version: "v9.6.3",
    category: "生活服务",
    eyebrow: "步数兑换与运动激励",
    summary: "依据源码紫色渐变、今日步数、金币领取、签到和换购商品结构构建运动首页。",
    accent: "#9f64f8",
    soft: "#f3ecff",
    dark: "#2d164b",
    metrics: [["9.6.3", "保留最新版"], ["步数", "每日清零"], ["换购", "金币商城"]],
    tags: ["微信步数", "每日签到", "步数换购"],
    tabs: ["步数", "换购", "活动", "我的"],
    sourceNote: "hc_step/pages/index + #9f64f8 主题 WXSS",
    template: "service",
    hero: "8,642",
    heroSub: "今日步数 · 再走 1,358 步达标",
    asset: "/source-assets/archive/step.webp",
    menu: ["领取金币", "每日签到", "邀请好友", "步数排行"],
    items: ["运动水杯 8,000 步", "轻量跳绳 12,000 步", "会员月卡 20,000 步"],
  },
  {
    id: "points",
    name: "超人积分商城",
    version: "v6.3.23",
    category: "电商零售",
    eyebrow: "会员积分兑换商城",
    summary: "参考源码 DIY 首页、兑换、购物车、热卖组件和积分价格，模拟兑换与结算。",
    accent: "#ff5a36",
    soft: "#fff0ec",
    dark: "#44180e",
    metrics: [["6.3.23", "保留最新版"], ["积分", "兑换价格"], ["DIY", "商城首页"]],
    tags: ["积分兑换", "热卖商品", "兑换记录"],
    tabs: ["首页", "分类", "兑换车", "我的"],
    sourceNote: "pages/index + style2/diy/img/hotimg.png",
    template: "commerce",
    hero: "积分也能买好物",
    heroSub: "会员日兑换低至 5 折",
    asset: "/source-assets/archive/points.webp",
    menu: ["数码好物", "居家生活", "优惠券", "积分抽奖"],
    items: ["便携随行杯", "品牌数据线", "视频会员月卡"],
  },
  {
    id: "hotel",
    name: "志汇酒店营销",
    version: "v8.5.8",
    category: "餐饮外卖",
    eyebrow: "酒店查询、预订与会员",
    summary: "使用最新叮咚酒店源码的深蓝色日期查询、房型列表、积分、充值与预订路径进行还原。",
    accent: "#172a97",
    soft: "#eceefe",
    dark: "#111b52",
    metrics: [["8.5.8", "合并后最新版"], ["日期", "入住查询"], ["会员", "积分营销"]],
    tags: ["日期查询", "房型预订", "会员积分"],
    tabs: ["预订", "酒店", "订单", "我的"],
    sourceNote: "zh_jdgjb/pages/index/index + #172A97 主题 WXSS",
    template: "travel",
    hero: "今晚住得更好一点",
    heroSub: "厦门 · 7 月 25 日至 26 日",
    asset: "/source-assets/archive/hotel.webp",
    menu: ["钟点房", "亲子酒店", "海景房", "会员专区"],
    items: ["环岛路海景大床房", "城市中心行政套房", "亲子主题双床房"],
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function StatusBar() {
  return (
    <div className="source-status">
      <span>9:41</span>
      <span>● ◒</span>
    </div>
  );
}

type ActionKind = "detail" | "toast" | "cart" | "favorite" | "live";
type DemoAction = (label: string, kind?: ActionKind) => void;
type DemoProps = {
  query: string;
  setQuery: (value: string) => void;
  act: DemoAction;
  go: (index: number) => void;
  cartCount: number;
  liked: boolean;
  playing: boolean;
};

function SourceNav({
  project,
  activeTab,
  onTabChange,
}: {
  project: Project;
  activeTab: number;
  onTabChange?: (index: number) => void;
}) {
  const iconSets: Partial<Record<Project["id"], string[]>> = {
    wmall: ["icon-1", "icon-3", "icon-15", "icon-5"],
    travel: ["nav_homepage", "nav_cart", "nav_order", "nav_member"],
  };
  const textIcons = ["⌂", "▤", "◫", "●"];

  return (
    <div
      className="source-nav"
      style={{ gridTemplateColumns: `repeat(${project.tabs.length}, 1fr)` }}
    >
      {project.tabs.map((tab, index) => {
        const base = iconSets[project.id]?.[index];
        const src =
          project.id === "wmall" && base
            ? `/source-assets/wmall/${base}${index === activeTab ? "-active" : ""}.png`
            : project.id === "travel" && base
              ? `/source-assets/travel/${base}_${index === activeTab ? "green" : "gray"}.png`
              : null;
        return (
          <button
            className={index === activeTab ? "is-active" : ""}
            key={tab}
            onClick={() => onTabChange?.(index)}
            aria-label={`打开${tab}`}
          >
            {src ? <img src={src} alt="" /> : <i>{textIcons[index]}</i>}
            {tab}
          </button>
        );
      })}
    </div>
  );
}

const sectionContent: Partial<Record<Project["id"], string[][]>> = {
  hej: [
    ["精选好物", "今日上新 28 件", "会员专享券"],
    ["居家生活", "数码电器", "服装配饰"],
    ["购物车 3 件", "已优惠 ¥42", "去结算"],
  ],
  wmall: [
    ["附近好店", "满减专区", "准时达"],
    ["待付款", "配送中", "全部订单"],
    ["帮我买", "帮我送", "万能服务"],
    ["红包 5 个", "收藏商家", "我的地址"],
  ],
  jobs: [
    ["最新职位", "推荐人才", "名企招聘"],
    ["产品设计师", "前端工程师", "内容策划"],
    ["优秀人才", "在线简历", "立即沟通"],
    ["我的简历", "投递记录", "企业中心"],
  ],
  live: [
    ["热门直播", "运动频道", "8,426 人在线"],
    ["体育", "音乐", "生活方式"],
    ["已收藏 12 场", "稍后观看", "历史回放"],
  ],
  travel: [
    ["景区门票", "热卖推荐", "今日可订"],
    ["购物车 2 件", "优惠 ¥30", "去结算"],
    ["待付款", "待使用", "全部订单"],
    ["我的游客", "收藏景区", "会员权益"],
  ],
  health: [
    ["快速问诊", "推荐专家", "患者案例"],
    ["图文咨询", "电话问诊", "我的提问"],
    ["体检套餐", "预约记录", "查看报告"],
    ["健康档案", "我的预约", "关注医生"],
  ],
};

function SecondaryScreen({
  project,
  activeTab,
  act,
}: {
  project: Project;
  activeTab: number;
  act: DemoAction;
}) {
  const genericRows = [
    project.items ?? ["精选内容", "热门推荐", "最近浏览"],
    project.menu ? [...project.menu.slice(0, 3)] : ["全部分类", "热门排行", "专属推荐"],
    ["待处理记录", "最近完成", "全部记录"],
    ["个人资料", "收藏内容", "服务与帮助"],
  ];
  const sourceRows = sectionContent[project.id];
  const rows = sourceRows?.[activeTab] ?? sourceRows?.[0] ?? genericRows[activeTab] ?? genericRows[0];
  return (
    <div className={`source-body secondary secondary--${project.id}`}>
      <div className="secondary__title">
        <small>{project.name}</small>
        <strong>{project.tabs[activeTab]}</strong>
      </div>
      <div className="secondary__summary">
        <span>前端演示数据</span>
        <b>{activeTab * 3 + 5}</b>
        <small>条可交互记录</small>
      </div>
      <div className="secondary__rows">
        {rows.map((row, index) => (
          <button key={row} onClick={() => act(row, "detail")}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{row}</strong>
            <i>›</i>
          </button>
        ))}
      </div>
      <p>此页沿用原项目导航与配色，数据由前端模拟。</p>
    </div>
  );
}

function HejHome({ query, setQuery, act, go, cartCount }: DemoProps) {
  return (
    <div className="source-body hej-home">
      <label className="hej-search">
        <img src="/source-assets/hej/search.png" alt="" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索商品" aria-label="搜索商城商品" />
      </label>
      <button className="hej-hero" onClick={() => act("秋日生活提案", "detail")}>
        <small>新品首发 · MEMBER DAY</small>
        <strong>秋日生活提案</strong>
        <span>满 299 减 40</span>
      </button>
      <button className="hej-notice" onClick={() => act("已设置 20:00 秒杀提醒", "toast")}>
        <img src="/source-assets/hej/announcement.png" alt="" />
        今日 20:00 限时秒杀开场
      </button>
      <div className="mini-menu">
        {[
          ["cats.png", "全部分类"],
          ["", "领券中心"],
          ["", "限时秒杀"],
          ["cart.png", "购物车"],
        ].map(([icon, label], index) => (
          <button
            key={label}
            onClick={() => index === 0 ? go(1) : index === 3 ? go(2) : act(index === 1 ? "已领取会员优惠券" : "已进入限时秒杀", "toast")}
          >
            {icon ? <img src={`/source-assets/hej/${icon}`} alt="" /> : <i>{index === 1 ? "券" : "秒"}</i>}
            {label}{index === 3 && cartCount > 0 ? <b>{cartCount}</b> : null}
          </button>
        ))}
      </div>
      <div className="source-section-title"><strong>猜你喜欢</strong><span>更多 ›</span></div>
      <div className="hej-products">
        {[
          ["#f0d6c3", "柔软家居毯", "¥129"],
          ["#d8e1e7", "轻量通勤包", "¥239"],
        ].map(([color, name, price]) => (
          <article key={name}>
            <button onClick={() => act(name, "detail")} aria-label={`查看${name}`}>
              <i style={{ background: color }} />
              <strong>{name}</strong>
            </button>
            <span>{price}<button onClick={() => act(name, "cart")} aria-label={`将${name}加入购物车`}>＋</button></span>
          </article>
        ))}
      </div>
    </div>
  );
}

function WmallHome({ query, setQuery, act }: DemoProps) {
  return (
    <div className="source-body wmall-home">
      <div className="wmall-head">
        <button onClick={() => act("配送地址：软件园二期", "detail")}>⌖ 软件园二期</button>
        <span>天气 26°</span>
        <label><img src="/source-assets/wmall/icon_search.png" alt="" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索商家或商品" aria-label="搜索外卖商家或商品" /></label>
      </div>
      <div className="wmall-promo">
        <small>新人专享</small>
        <strong>外卖红包天天领</strong>
        <button onClick={() => act("已领取 ¥8 新人红包", "toast")}>立即领取</button>
      </div>
      <div className="mini-menu wmall-menu">
        {[
          ["newMember_b.png", "美食外卖"],
          ["discount_b.png", "优惠专区"],
          ["seckill.png", "限时抢购"],
          ["store1.png", "到店自取"],
        ].map(([icon, label], index) => (
          <button key={label} onClick={() => index === 0 ? act("美食外卖", "detail") : index === 3 ? act("到店自取门店", "detail") : act(`已筛选：${label}`, "toast")}><img src={`/source-assets/wmall/${icon}`} alt="" />{label}</button>
        ))}
      </div>
      <div className="source-section-title"><strong>附近商家</strong><span>综合排序⌄</span></div>
      <div className="shop-list">
        {[
          ["川味小馆", "月售 1260", "满30减8", "28 分钟"],
          ["一碗好面", "月售 842", "新客立减", "22 分钟"],
        ].map(([name, sales, offer, time], index) => (
          <button key={name} onClick={() => act(`${name} · ${offer}`, "detail")}>
            <i className={`food food--${index}`} />
            <span><strong>{name}</strong><small>★ 4.{9 - index} · {sales}</small><em>{offer}</em></span>
            <b>{time}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

function JobsHome({ query, setQuery, act, go }: DemoProps) {
  return (
    <div className="source-body jobs-home">
      <div className="jobs-search"><button onClick={() => act("当前城市：厦门", "detail")}>厦门⌄</button><label>⌕ <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索职位或企业" aria-label="搜索职位或企业" /></label></div>
      <button className="jobs-banner" onClick={() => act("2026 夏季招聘专场", "detail")}>
        <small>2026 夏季招聘</small>
        <strong>找到真正适合你的工作</strong>
        <span>已有 3,286 家企业入驻</span>
      </button>
      <div className="jobs-entry">
        <button onClick={() => go(1)}><img src="/source-assets/jobs/findjob.png" alt="" /><span><strong>我要找工作</strong><small>好职位一手掌握</small></span></button>
        <button onClick={() => go(2)}><img src="/source-assets/jobs/findwork.png" alt="" /><span><strong>企业招人才</strong><small>免费发布职位</small></span></button>
      </div>
      <div className="source-section-title"><strong>最新人才</strong><span>完善求职信息</span></div>
      <div className="talent-row">
        {["陈同学", "周设计", "林工程师"].map((name) => (
          <button key={name} onClick={() => act(`${name}的在线简历`, "detail")}><img src="/source-assets/jobs/male0.png" alt="" /><small>{name}</small></button>
        ))}
      </div>
      <div className="source-section-title jobs-title"><strong>最新职位</strong><span>更多职位 ›</span></div>
      <button className="job-row" onClick={() => act("高级产品设计师", "detail")}><strong>高级产品设计师</strong><span>25–40K</span><small>创意科技 · 五险一金</small></button>
    </div>
  );
}

function LiveHome({ query, setQuery, act, liked, playing }: DemoProps) {
  return (
    <div className="source-body live-home">
      <label className="live-search"><img src="/source-assets/live/search.png" alt="" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索话题、频道或商品名称" aria-label="搜索直播内容" /></label>
      <div className="live-cats">{["推荐", "体育", "音乐", "旅行", "生活"].map((x, i) => <button className={i === 0 ? "active" : ""} onClick={() => act(`已切换到${x}频道`, "toast")} key={x}>{x}</button>)}</div>
      <button className={`live-card ${playing ? "is-playing" : ""}`} onClick={() => act("城市篮球挑战赛", "live")}>
        <img src="/source-assets/live/cover.jpg" alt="篮球运动直播封面" />
        <span className="live-badge">{playing ? "播放中" : "直播中"}</span>
        <i className="live-play">{playing ? "Ⅱ" : "▶"}</i>
        <span className="live-watch">8,426 人</span>
        <strong>城市篮球挑战赛 · 决赛现场</strong>
        <small>体育频道</small>
      </button>
      <div className="live-actions">
        <button onClick={() => act("今日直播节目单", "detail")}><img src="/source-assets/live/cards.png" alt="" />节目单</button>
        <button className={liked ? "is-liked" : ""} onClick={() => act("城市篮球挑战赛", "favorite")}><img src="/source-assets/live/share.png" alt="" />{liked ? "已收藏" : "收藏直播"}</button>
      </div>
      <div className="source-section-title"><strong>接下来直播</strong><span>查看更多 ›</span></div>
      <div className="live-next"><i /><span><strong>独立音乐现场</strong><small>20:30 开始 · 已预约 1,204 人</small></span></div>
    </div>
  );
}

function TravelHome({ act, go, cartCount }: DemoProps) {
  return (
    <div className="source-body travel-home">
      <div className="travel-bar"><img src="/source-assets/travel/logo.jpg" alt="" /><strong>国家级旅游景区</strong><span>•••</span></div>
      <div className="travel-hero"><small>山水之间 · 自在出发</small><strong>清凉避暑季</strong><button onClick={() => act("已选择今日入园", "toast")}>预约入园</button></div>
      <div className="mini-menu travel-menu">
        {["景区门票", "游玩攻略", "地图导览", "扫码入园"].map((x, i) => <button key={x} onClick={() => act(x, "detail")}><i>{["票", "游", "图", "码"][i]}</i>{x}</button>)}
      </div>
      <div className="source-section-title travel-title"><strong><img src="/source-assets/travel/icon_fire.png" alt="" />热卖推荐</strong><span>更多 ›</span></div>
      <div className="travel-products">
        {[
          ["travel-pic--one", "云顶景区成人票", "¥98", "已售 2860"],
          ["travel-pic--two", "森林索道往返票", "¥68", "已售 1542"],
        ].map(([className, name, price, sold]) => (
          <article key={name}><button onClick={() => act(name, "detail")}><i className={className} /><strong>{name}</strong></button><span><b>{price}</b><button onClick={() => act(name, "cart")}>加入</button><small>{sold}</small></span></article>
        ))}
      </div>
      {cartCount > 0 ? <button className="travel-cart-float" onClick={() => go(1)}>购物车 {cartCount}</button> : null}
    </div>
  );
}

function HealthHome({ act, go }: DemoProps) {
  return (
    <div className="source-body health-home">
      <div className="health-hero"><small>专业医疗服务平台</small><strong>今天，想咨询什么？</strong><span>7 × 24 小时在线服务</span></div>
      <div className="mini-menu health-menu">
        {[
          ["zixun.png", "在线问诊"],
          ["yiyuan.png", "预约挂号"],
          ["tijiannew.png", "体检预约"],
          ["wenda.png", "咨询客服"],
        ].map(([icon, label], index) => <button key={label} onClick={() => index === 0 ? go(1) : index === 2 ? go(2) : act(label, "detail")}><img src={`/source-assets/health/${icon}`} alt="" />{label}</button>)}
      </div>
      <div className="source-section-title health-title"><strong>医疗服务</strong><span>最新预约：陈女士</span></div>
      <div className="health-services">
        <button onClick={() => go(1)}><span><strong>快速问诊</strong><small>平均 3 分钟接诊</small></span><i>问</i></button>
        <button onClick={() => act("平台客服", "detail")}><span><strong>咨询客服</strong><small>免费咨询平台客服</small></span><img src="/source-assets/health/wenda.png" alt="" /></button>
      </div>
      <div className="health-help"><strong>帮你解决</strong><div>{["皮肤问题", "儿童发热", "睡眠健康"].map((x) => <button onClick={() => act(x, "detail")} key={x}>{x}</button>)}</div></div>
      <div className="source-section-title"><strong>推荐专家</strong><span>更多 ›</span></div>
      <button className="doctor" onClick={() => act("刘医生 · 主任医师", "detail")}><i>医</i><span><strong>刘医生 <small>主任医师</small></strong><p>全科医学 · 已服务 2,408 人</p></span><b>可预约</b></button>
    </div>
  );
}

function ArchiveHome({ project, ...demo }: { project: Project } & DemoProps) {
  const menu = project.menu ?? ["精选", "分类", "活动", "我的"];
  const items = project.items ?? ["精选内容", "热门推荐", "最近上新"];
  const showSearch = !["answer", "step", "warriors"].includes(project.id);
  const template = project.template ?? "business";
  const itemAction: ActionKind = template === "commerce" ? "cart" : "detail";

  return (
    <div className={`source-body archive-home archive-home--${template} archive-home--${project.id}`}>
      <div className="archive-topbar">
        <strong>{project.name}</strong>
        <span>•••</span>
      </div>
      {showSearch ? (
        <label className="archive-search">
          <span>⌕</span>
          <input
            value={demo.query}
            onChange={(event) => demo.setQuery(event.target.value)}
            placeholder={`搜索${project.tabs[0]}内容`}
            aria-label={`搜索${project.name}`}
          />
        </label>
      ) : null}
      <button className="archive-hero" onClick={() => demo.act(project.hero ?? project.name, "detail")}>
        {project.asset ? <img src={project.asset} alt="" /> : null}
        <span className="archive-hero__shade" />
        <span className="archive-hero__copy">
          <small>{project.heroSub}</small>
          <strong>{project.hero}</strong>
          <i>{template === "community" ? "立即加入" : template === "education" ? "开始体验" : "查看详情"} ›</i>
        </span>
      </button>
      <div className="archive-menu">
        {menu.map((label, index) => (
          <button
            key={label}
            onClick={() => index > 0 && index < project.tabs.length ? demo.go(index) : demo.act(label, index === 0 ? "detail" : "toast")}
          >
            <i>{label.slice(0, 1)}</i>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="archive-section-title">
        <strong>{template === "community" ? "同城正在发生" : template === "education" ? "继续学习" : template === "property" ? "为你精选" : "热门推荐"}</strong>
        <button onClick={() => demo.act("全部内容", "detail")}>全部 ›</button>
      </div>
      <div className="archive-items">
        {items.map((item, index) => (
          <article key={item}>
            <button className="archive-item__main" onClick={() => demo.act(item, "detail")}>
              <i style={{ background: `color-mix(in srgb, ${project.accent} ${28 + index * 9}%, #f2eee7)` }}>
                {project.asset && index === 0 ? <img src={project.asset} alt="" /> : <span>{String(index + 1).padStart(2, "0")}</span>}
              </i>
              <span>
                <strong>{item}</strong>
                <small>
                  {template === "community" ? `${index + 2}.${index + 3}km · ${28 + index * 17} 条互动` :
                    template === "education" ? `${index + 8} 课时 · ${86 + index * 4}% 好评` :
                      template === "service" ? `最快今日可约 · 已服务 ${168 + index * 91}` :
                        template === "travel" ? `今日可订 · ${320 + index * 184} 人选择` :
                          `精选推荐 · ${98 + index * 76} 人关注`}
                </small>
              </span>
            </button>
            <button
              className="archive-item__action"
              onClick={() => demo.act(item, itemAction)}
              aria-label={`${template === "commerce" ? "兑换" : "打开"}${item}`}
            >
              {template === "commerce" ? "＋" : "›"}
            </button>
          </article>
        ))}
      </div>
      {["service", "property", "business"].includes(template) ? (
        <button className="archive-quick" onClick={() => demo.act(template === "property" ? "已提交看房需求" : "预约申请已提交", "toast")}>
          <span>{template === "property" ? "专属顾问在线" : "现在可以预约"}</span>
          <strong>{template === "property" ? "帮我找房" : "立即预约"}</strong>
        </button>
      ) : null}
    </div>
  );
}

function PhonePreview({
  project,
  activeTab = 0,
  compact = false,
  onTabChange,
}: {
  project: Project;
  activeTab?: number;
  compact?: boolean;
  onTabChange?: (index: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [requestLabel, setRequestLabel] = useState("");
  const [searchPending, setSearchPending] = useState(false);
  const requestTimer = useRef<number | null>(null);
  const searchTimer = useRef<number | null>(null);
  const interactive = Boolean(onTabChange) && !compact;

  useEffect(() => () => {
    if (requestTimer.current) window.clearTimeout(requestTimer.current);
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const runRequest = (label: string, complete: () => void) => {
    if (requestTimer.current) window.clearTimeout(requestTimer.current);
    setRequestLabel(label);
    const delay = 190 + project.id.length * 18;
    requestTimer.current = window.setTimeout(() => {
      setRequestLabel("");
      complete();
      requestTimer.current = null;
    }, delay);
  };

  const handleQuery = (value: string) => {
    setQuery(value);
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    if (!value.trim()) {
      setSearchPending(false);
      return;
    }
    setSearchPending(true);
    searchTimer.current = window.setTimeout(() => {
      setSearchPending(false);
      searchTimer.current = null;
    }, 240);
  };

  const act: DemoAction = (label, kind = "detail") => {
    const requestText =
      kind === "cart" ? "正在更新购物车" :
        kind === "favorite" ? "正在同步收藏状态" :
          kind === "live" ? "正在连接直播流" :
            kind === "toast" ? "正在提交请求" : "正在读取详情";
    runRequest(requestText, () => {
      if (kind === "cart") {
        setCartCount((count) => count + 1);
        setToast(`${label}已加入`);
      } else if (kind === "favorite") {
        setLiked((value) => !value);
        setToast(liked ? "已取消收藏" : "收藏成功");
      } else if (kind === "live") {
        setPlaying((value) => !value);
        setToast(playing ? "直播已暂停" : "正在播放直播");
      } else if (kind === "toast") {
        setToast(label);
      } else {
        setDetail(label);
      }
    });
  };

  const go = (index: number) => {
    if (index === activeTab) return;
    runRequest(`正在加载${project.tabs[index]}`, () => {
      setDetail(null);
      setQuery("");
      setSearchPending(false);
      onTabChange?.(index);
    });
  };

  const demoProps: DemoProps = { query, setQuery: handleQuery, act, go, cartCount, liked, playing };
  const homeById: Partial<Record<string, React.ReactNode>> = {
    hej: <HejHome {...demoProps} />,
    wmall: <WmallHome {...demoProps} />,
    jobs: <JobsHome {...demoProps} />,
    live: <LiveHome {...demoProps} />,
    travel: <TravelHome {...demoProps} />,
    health: <HealthHome {...demoProps} />,
  };

  const primaryAction =
    project.id === "jobs" ? "投递简历" :
      project.id === "health" ? "确认预约" :
        project.id === "live" ? "收藏直播" :
          project.id === "travel" ? "加入购票车" :
            project.template === "commerce" ? "确认兑换" :
              ["service", "property", "business"].includes(project.template ?? "") ? "立即预约" :
                project.template === "community" ? "发起互动" : "查看下一步";

  const confirmDetail = () => {
    if (!detail) return;
    runRequest("正在提交并等待服务器确认", () => {
      if (project.id === "jobs" || project.id === "health" || ["service", "property", "business"].includes(project.template ?? "")) {
        setToast(project.id === "jobs" ? "简历投递成功" : "预约申请已提交");
      } else if (project.id === "live") {
        setLiked(true);
        setToast("收藏成功");
      } else if (project.template === "community" || project.template === "education" || project.template === "travel") {
        setToast(project.template === "community" ? "互动请求已发送" : "已进入下一步");
      } else {
        setCartCount((count) => count + 1);
        setToast(`${detail}已加入`);
      }
      setDetail(null);
    });
  };

  const openSearchResult = (result: string) => {
    setRequestLabel("正在读取详情");
    window.setTimeout(() => {
      setRequestLabel("");
      setDetail(result);
    }, 225);
  };

  return (
    <div
      className={`source-phone source-phone--${project.id} ${compact ? "source-phone--compact is-static" : ""}`}
      style={{ "--source-accent": project.accent, "--source-soft": project.soft } as React.CSSProperties}
    >
      <StatusBar />
      {activeTab === 0 ? homeById[project.id] ?? <ArchiveHome project={project} {...demoProps} /> : <SecondaryScreen project={project} activeTab={activeTab} act={act} />}
      {interactive && query ? (
        <div className="phone-search-results">
          <div><strong>“{query}”的结果</strong><button onClick={() => handleQuery("")}>×</button></div>
          {searchPending ? (
            <div className="phone-search-pending"><i /><span>正在向服务器查询…</span></div>
          ) : (
            [`${query} · 精选结果`, `${query} · 热门推荐`, `${query} · 最近浏览`].map((result, index) => (
              <button key={result} onClick={() => openSearchResult(result)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{result}</strong><i>›</i></button>
            ))
          )}
        </div>
      ) : null}
      {interactive && detail ? (
        <div className="phone-detail">
          <button className="phone-detail__back" onClick={() => setDetail(null)}>‹ 返回</button>
          <small>INTERACTIVE DEMO</small>
          <div className="phone-detail__art"><span>{project.name.slice(0, 1)}</span></div>
          <h3>{detail}</h3>
          <p>这是由前端假数据驱动的可操作详情页，沿用原项目的配色、导航与业务路径。</p>
          <div><span><b>4.9</b> 用户评分</span><span><b>即时</b> 状态反馈</span></div>
          <button className="phone-detail__primary" onClick={confirmDetail}>{primaryAction}</button>
        </div>
      ) : null}
      {interactive && requestLabel ? (
        <div className="phone-request-loading" role="status" aria-live="polite">
          <i />
          <strong>{requestLabel}</strong>
          <span>模拟服务器响应</span>
        </div>
      ) : null}
      {interactive && toast ? <div className="phone-toast" role="status">✓ {toast}</div> : null}
      <SourceNav project={project} activeTab={activeTab} onTabChange={interactive ? go : undefined} />
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("全部");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const categories = ["全部", ...new Set(projects.map((project) => project.category))];
  const visibleProjects = useMemo(
    () => filter === "全部" ? projects : projects.filter((project) => project.category === filter),
    [filter],
  );
  const selected = projects.find((project) => project.id === selectedId) ?? null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setSelectedId(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openProject = (id: string) => {
    setSelectedId(id);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到顶部"><span>作</span><strong>作品档案</strong></a>
        <nav aria-label="主导航"><a href="#works">精选作品</a><a href="#method">还原方式</a></nav>
        <a className="header-count" href="#works">26 / 743</a>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="kicker"><span />SOURCE ARCHIVE · 2026</p>
          <h1>让旧源码<br /><em>按原样重现。</em></h1>
          <p className="hero__intro">
            从 12GB、743 个真实项目中，先完成 26 个代表作品。展示保留各自源码的颜色、首页结构与图标，
            仅把失效后台替换成可交互的前端假数据。
          </p>
          <div className="hero__actions">
            <a className="button button--dark" href="#works">浏览源码还原作品 <ArrowIcon /></a>
            <span>原始视觉 · 假数据交互 · 响应式展示</span>
          </div>
        </div>
        <div className="hero__visual" aria-label="源码还原作品预览">
          <div className="orb orb--one" /><div className="orb orb--two" />
          <div className="hero__phone hero__phone--back"><PhonePreview project={projects[1]} compact /></div>
          <div className="hero__phone hero__phone--front"><PhonePreview project={projects[0]} compact /></div>
          <span className="hero__note">SOURCE-DERIVED<br />INTERFACES</span>
        </div>
      </section>

      <section className="statement" id="method">
        <p>不是统一套壳</p>
        <h2>每个作品都保留<br /><span>自己的源码样式。</span></h2>
        <div className="statement__stats">
          <div><strong>743</strong><span>整理后的作品总数</span></div>
          <div><strong>10</strong><span>一级行业类目</span></div>
          <div><strong>26</strong><span>已完成源码还原案例</span></div>
        </div>
      </section>

      <section className="works" id="works">
        <div className="section-heading">
          <div><p>SELECTED SOURCE WORKS</p><h2>26 个作品展示</h2></div>
          <div className="filters" role="group" aria-label="按类目筛选">
            {categories.map((category) => (
              <button className={filter === category ? "is-active" : ""} key={category} onClick={() => setFilter(category)}>{category}</button>
            ))}
          </div>
        </div>
        <div className="work-grid">
          {visibleProjects.map((project, index) => (
            <article className="work-card" key={project.id} style={{ "--accent": project.accent, "--soft": project.soft, "--ink": project.dark } as React.CSSProperties}>
              <div className="work-card__visual">
                <span className="work-card__number">{String(index + 1).padStart(2, "0")}</span>
                <span className="work-card__source">SOURCE UI</span>
                <div className="work-card__phone"><PhonePreview project={project} compact /></div>
                <button className="work-card__open" onClick={() => openProject(project.id)} aria-label={`打开 ${project.name} 交互展示`}>打开体验 <ArrowIcon /></button>
              </div>
              <div className="work-card__meta">
                <div><p>{project.eyebrow}</p><h3>{project.name}</h3><small>{project.sourceNote}</small></div>
                <div className="work-card__labels"><span>{project.category}</span><span>{project.version}</span></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process">
        <p>从源码到作品</p>
        <div className="process__steps">
          {[
            ["01", "读取原界面", "核对 app.json、WXML、WXSS 和原始图标，确认真实首页结构。"],
            ["02", "替换旧后台", "保留视觉与交互路径，用前端假数据代替已经失效的接口。"],
            ["03", "响应式呈现", "手机端保持小程序观感，电脑端整理成完整作品案例。"],
          ].map(([number, title, copy]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </section>

      <footer>
        <div className="brand brand--footer"><span>作</span><strong>作品档案</strong></div>
        <p>已完成 26 个源码还原作品 · 持续整理中</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>

      {selected && (
        <div className="project-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} 交互展示`}>
          <button className="project-modal__backdrop" onClick={() => setSelectedId(null)} aria-label="关闭展示" />
          <div className="project-modal__panel" style={{ "--accent": selected.accent, "--soft": selected.soft, "--ink": selected.dark } as React.CSSProperties}>
            <button className="project-modal__close" onClick={() => setSelectedId(null)} aria-label="关闭">×</button>
            <div className="project-modal__copy">
              <p className="kicker"><span />{selected.category} · {selected.version}</p>
              <h2>{selected.name}</h2>
              <p className="project-modal__source">源码依据：{selected.sourceNote}</p>
              <p className="project-modal__summary">{selected.summary}</p>
              <div className="project-modal__metrics">
                {selected.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
              </div>
              <div className="project-modal__tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-modal__switcher">
                <p>此作品从独立目录加载，拥有自己的入口、样式、路由状态和本地资源。</p>
                <a href={`/works/${selected.id}/`} target="_blank" rel="noreferrer">单独打开完整作品 <ArrowIcon /></a>
              </div>
            </div>
            <div className="project-modal__device">
              <div className="standalone-phone">
                <iframe
                  key={selected.id}
                  src={`/works/${selected.id}/`}
                  title={`${selected.name} 独立交互作品`}
                  loading="eager"
                />
              </div>
              <span className="project-modal__hint">独立作品目录 · 可操作全部底部导航与核心业务页面</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
