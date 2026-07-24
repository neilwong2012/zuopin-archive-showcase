"use client";

import { useEffect, useMemo, useState } from "react";

type Project = {
  id: "hej" | "wmall" | "jobs" | "live" | "travel" | "health";
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

function SourceNav({
  project,
  activeTab,
}: {
  project: Project;
  activeTab: number;
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
          <span className={index === activeTab ? "is-active" : ""} key={tab}>
            {src ? <img src={src} alt="" /> : <i>{textIcons[index]}</i>}
            {tab}
          </span>
        );
      })}
    </div>
  );
}

const sectionContent: Record<Project["id"], string[][]> = {
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
}: {
  project: Project;
  activeTab: number;
}) {
  const rows = sectionContent[project.id][activeTab] ?? sectionContent[project.id][0];
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
          <button key={row}>
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

function HejHome() {
  return (
    <div className="source-body hej-home">
      <div className="hej-search">
        <img src="/source-assets/hej/search.png" alt="" />
        搜索商品
      </div>
      <div className="hej-hero">
        <small>新品首发 · MEMBER DAY</small>
        <strong>秋日生活提案</strong>
        <span>满 299 减 40</span>
      </div>
      <div className="hej-notice">
        <img src="/source-assets/hej/announcement.png" alt="" />
        今日 20:00 限时秒杀开场
      </div>
      <div className="mini-menu">
        {[
          ["cats.png", "全部分类"],
          ["", "领券中心"],
          ["", "限时秒杀"],
          ["cart.png", "购物车"],
        ].map(([icon, label], index) => (
          <span key={label}>
            {icon ? <img src={`/source-assets/hej/${icon}`} alt="" /> : <i>{index === 1 ? "券" : "秒"}</i>}
            {label}
          </span>
        ))}
      </div>
      <div className="source-section-title"><strong>猜你喜欢</strong><span>更多 ›</span></div>
      <div className="hej-products">
        {[
          ["#f0d6c3", "柔软家居毯", "¥129"],
          ["#d8e1e7", "轻量通勤包", "¥239"],
        ].map(([color, name, price]) => (
          <button key={name}>
            <i style={{ background: color }} />
            <strong>{name}</strong>
            <span>{price}<b>＋</b></span>
          </button>
        ))}
      </div>
    </div>
  );
}

function WmallHome() {
  return (
    <div className="source-body wmall-home">
      <div className="wmall-head">
        <strong>⌖ 软件园二期</strong>
        <span>天气 26°</span>
        <div><img src="/source-assets/wmall/icon_search.png" alt="" />搜索商家或商品</div>
      </div>
      <div className="wmall-promo">
        <small>新人专享</small>
        <strong>外卖红包天天领</strong>
        <button>立即领取</button>
      </div>
      <div className="mini-menu wmall-menu">
        {[
          ["newMember_b.png", "美食外卖"],
          ["discount_b.png", "优惠专区"],
          ["seckill.png", "限时抢购"],
          ["store1.png", "到店自取"],
        ].map(([icon, label]) => (
          <span key={label}><img src={`/source-assets/wmall/${icon}`} alt="" />{label}</span>
        ))}
      </div>
      <div className="source-section-title"><strong>附近商家</strong><span>综合排序⌄</span></div>
      <div className="shop-list">
        {[
          ["川味小馆", "月售 1260", "满30减8", "28 分钟"],
          ["一碗好面", "月售 842", "新客立减", "22 分钟"],
        ].map(([name, sales, offer, time], index) => (
          <button key={name}>
            <i className={`food food--${index}`} />
            <span><strong>{name}</strong><small>★ 4.{9 - index} · {sales}</small><em>{offer}</em></span>
            <b>{time}</b>
          </button>
        ))}
      </div>
    </div>
  );
}

function JobsHome() {
  return (
    <div className="source-body jobs-home">
      <div className="jobs-search"><strong>厦门⌄</strong><span>⌕ 搜索职位或企业</span></div>
      <div className="jobs-banner">
        <small>2026 夏季招聘</small>
        <strong>找到真正适合你的工作</strong>
        <span>已有 3,286 家企业入驻</span>
      </div>
      <div className="jobs-entry">
        <button><img src="/source-assets/jobs/findjob.png" alt="" /><span><strong>我要找工作</strong><small>好职位一手掌握</small></span></button>
        <button><img src="/source-assets/jobs/findwork.png" alt="" /><span><strong>企业招人才</strong><small>免费发布职位</small></span></button>
      </div>
      <div className="source-section-title"><strong>最新人才</strong><span>完善求职信息</span></div>
      <div className="talent-row">
        {["陈同学", "周设计", "林工程师"].map((name) => (
          <span key={name}><img src="/source-assets/jobs/male0.png" alt="" /><small>{name}</small></span>
        ))}
      </div>
      <div className="source-section-title jobs-title"><strong>最新职位</strong><span>更多职位 ›</span></div>
      <div className="job-row"><strong>高级产品设计师</strong><span>25–40K</span><small>创意科技 · 五险一金</small></div>
    </div>
  );
}

function LiveHome() {
  return (
    <div className="source-body live-home">
      <div className="live-search"><img src="/source-assets/live/search.png" alt="" />搜索话题、频道或商品名称</div>
      <div className="live-cats">{["推荐", "体育", "音乐", "旅行", "生活"].map((x, i) => <span className={i === 0 ? "active" : ""} key={x}>{x}</span>)}</div>
      <button className="live-card">
        <img src="/source-assets/live/cover.jpg" alt="篮球运动直播封面" />
        <span className="live-badge">直播中</span>
        <span className="live-watch">8,426 人</span>
        <strong>城市篮球挑战赛 · 决赛现场</strong>
        <small>体育频道</small>
      </button>
      <div className="live-actions">
        <button><img src="/source-assets/live/cards.png" alt="" />节目单</button>
        <button><img src="/source-assets/live/share.png" alt="" />分享直播</button>
      </div>
      <div className="source-section-title"><strong>接下来直播</strong><span>查看更多 ›</span></div>
      <div className="live-next"><i /><span><strong>独立音乐现场</strong><small>20:30 开始 · 已预约 1,204 人</small></span></div>
    </div>
  );
}

function TravelHome() {
  return (
    <div className="source-body travel-home">
      <div className="travel-bar"><img src="/source-assets/travel/logo.jpg" alt="" /><strong>国家级旅游景区</strong><span>•••</span></div>
      <div className="travel-hero"><small>山水之间 · 自在出发</small><strong>清凉避暑季</strong><button>预约入园</button></div>
      <div className="mini-menu travel-menu">
        {["景区门票", "游玩攻略", "地图导览", "扫码入园"].map((x, i) => <span key={x}><i>{["票", "游", "图", "码"][i]}</i>{x}</span>)}
      </div>
      <div className="source-section-title travel-title"><strong><img src="/source-assets/travel/icon_fire.png" alt="" />热卖推荐</strong><span>更多 ›</span></div>
      <div className="travel-products">
        {[
          ["travel-pic--one", "云顶景区成人票", "¥98", "已售 2860"],
          ["travel-pic--two", "森林索道往返票", "¥68", "已售 1542"],
        ].map(([className, name, price, sold]) => (
          <button key={name}><i className={className} /><strong>{name}</strong><span><b>{price}</b><small>{sold}</small></span></button>
        ))}
      </div>
    </div>
  );
}

function HealthHome() {
  return (
    <div className="source-body health-home">
      <div className="health-hero"><small>专业医疗服务平台</small><strong>今天，想咨询什么？</strong><span>7 × 24 小时在线服务</span></div>
      <div className="mini-menu health-menu">
        {[
          ["zixun.png", "在线问诊"],
          ["yiyuan.png", "预约挂号"],
          ["tijiannew.png", "体检预约"],
          ["wenda.png", "咨询客服"],
        ].map(([icon, label]) => <span key={label}><img src={`/source-assets/health/${icon}`} alt="" />{label}</span>)}
      </div>
      <div className="source-section-title health-title"><strong>医疗服务</strong><span>最新预约：陈女士</span></div>
      <div className="health-services">
        <button><span><strong>快速问诊</strong><small>平均 3 分钟接诊</small></span><i>问</i></button>
        <button><span><strong>咨询客服</strong><small>免费咨询平台客服</small></span><img src="/source-assets/health/wenda.png" alt="" /></button>
      </div>
      <div className="health-help"><strong>帮你解决</strong><div>{["皮肤问题", "儿童发热", "睡眠健康"].map((x) => <button key={x}>{x}</button>)}</div></div>
      <div className="source-section-title"><strong>推荐专家</strong><span>更多 ›</span></div>
      <div className="doctor"><i>医</i><span><strong>刘医生 <small>主任医师</small></strong><p>全科医学 · 已服务 2,408 人</p></span><b>可预约</b></div>
    </div>
  );
}

function PhonePreview({
  project,
  activeTab = 0,
  compact = false,
}: {
  project: Project;
  activeTab?: number;
  compact?: boolean;
}) {
  const homeById = {
    hej: <HejHome />,
    wmall: <WmallHome />,
    jobs: <JobsHome />,
    live: <LiveHome />,
    travel: <TravelHome />,
    health: <HealthHome />,
  };
  return (
    <div
      className={`source-phone source-phone--${project.id} ${compact ? "source-phone--compact" : ""}`}
      style={{ "--source-accent": project.accent, "--source-soft": project.soft } as React.CSSProperties}
    >
      <StatusBar />
      {activeTab === 0 ? homeById[project.id] : <SecondaryScreen project={project} activeTab={activeTab} />}
      <SourceNav project={project} activeTab={activeTab} />
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("全部");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
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

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const openProject = (id: string) => {
    setSelectedId(id);
    setActiveTab(0);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到顶部"><span>作</span><strong>作品档案</strong></a>
        <nav aria-label="主导航"><a href="#works">精选作品</a><a href="#method">还原方式</a></nav>
        <a className="header-count" href="#works">6 / 743</a>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="kicker"><span />SOURCE ARCHIVE · 2026</p>
          <h1>让旧源码<br /><em>按原样重现。</em></h1>
          <p className="hero__intro">
            从 12GB、743 个真实项目中，先完成 6 个代表作品。展示保留各自源码的颜色、首页结构与图标，
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
          <div><strong>6</strong><span>首批源码还原案例</span></div>
        </div>
      </section>

      <section className="works" id="works">
        <div className="section-heading">
          <div><p>SELECTED SOURCE WORKS</p><h2>首批作品展示</h2></div>
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
        <p>首批 6 个源码还原作品 · 持续整理中</p>
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
                <p>切换模拟页面</p>
                <div>{selected.tabs.map((tab, index) => <button className={activeTab === index ? "is-active" : ""} onClick={() => setActiveTab(index)} key={tab}>{tab}</button>)}</div>
              </div>
            </div>
            <div className="project-modal__device">
              <PhonePreview project={selected} activeTab={activeTab} />
              <span className="project-modal__hint">原始样式 + 前端演示数据</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
