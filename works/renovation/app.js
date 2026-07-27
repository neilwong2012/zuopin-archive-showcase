const PROJECT = {
  "slug": "renovation",
  "workId": "WORK-0276",
  "name": "麦芒装饰装修 DIY",
  "version": "v3.2.59",
  "category": "房产家居",
  "accent": "#00cc99",
  "soft": "#e6faf5",
  "ink": "#073c31",
  "flavor": "design",
  "hero": "把理想家装进现实",
  "sub": "上传户型，免费获取 3 套方案",
  "source": "pages/index + zero + calculator + building_details",
  "menu": [
    "效果图",
    "找设计师",
    "装修报价",
    "VR 全景"
  ],
  "featured": [
    {
      "title": "原木治愈两居",
      "meta": "89㎡ · 全屋设计",
      "badge": "热门",
      "price": ""
    },
    {
      "title": "轻法式主卧",
      "meta": "奶油色系 · 软装清单",
      "badge": "收藏 328",
      "price": ""
    },
    {
      "title": "极简通透客厅",
      "meta": "小户型显大方案",
      "badge": "VR",
      "price": ""
    }
  ],
  "routes": [
    {
      "id": "home",
      "label": "首页",
      "kind": "home",
      "title": "装修灵感",
      "items": [],
      "subtitle": ""
    },
    {
      "id": "gallery",
      "label": "效果图",
      "kind": "gallery",
      "title": "设计案例",
      "items": [
        {
          "title": "原木治愈两居",
          "meta": "89㎡ · 原木风",
          "badge": "720°全景",
          "price": ""
        },
        {
          "title": "轻法式主卧",
          "meta": "112㎡ · 轻法式",
          "badge": "新品",
          "price": ""
        },
        {
          "title": "极简通透客厅",
          "meta": "68㎡ · 现代简约",
          "badge": "热门",
          "price": ""
        }
      ],
      "subtitle": ""
    },
    {
      "id": "calculator",
      "label": "计算器",
      "kind": "calculator",
      "title": "装修报价",
      "items": [
        {
          "title": "建筑面积",
          "meta": "请输入房屋面积",
          "badge": "",
          "price": ""
        },
        {
          "title": "装修档次",
          "meta": "舒适型",
          "badge": "",
          "price": ""
        },
        {
          "title": "所在城市",
          "meta": "厦门",
          "badge": "",
          "price": ""
        }
      ],
      "subtitle": ""
    },
    {
      "id": "profile",
      "label": "我的",
      "kind": "profile",
      "title": "装修档案",
      "items": [
        {
          "title": "我的户型",
          "meta": "2 个方案",
          "badge": "",
          "price": ""
        },
        {
          "title": "预约设计",
          "meta": "1 个待确认",
          "badge": "",
          "price": ""
        },
        {
          "title": "收藏案例",
          "meta": "16 套",
          "badge": "",
          "price": ""
        },
        {
          "title": "报价记录",
          "meta": "最近 3 次",
          "badge": "",
          "price": ""
        }
      ],
      "subtitle": ""
    }
  ],
  "hasAsset": true,
  "primaryKind": "message",
  "primaryAction": "立即预约"
};

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
    (PROJECT.hasAsset ? '<img src="./zuopin-archive-showcase/assets/hero.webp" alt="">' : '') +
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
    (PROJECT.hasAsset ? '<img src="./zuopin-archive-showcase/assets/hero.webp" alt="直播封面">' : '') +
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
    '<div class="detail-art">' + (PROJECT.hasAsset ? '<img src="./zuopin-archive-showcase/assets/hero.webp" alt="">' : '<span>' + esc(PROJECT.name.slice(0, 1)) + '</span>') + '</div>' +
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
