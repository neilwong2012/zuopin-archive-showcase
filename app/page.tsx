"use client";

import { useEffect, useMemo, useState } from "react";

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
  hero: string;
  items: { title: string; meta: string; value: string }[];
};

const projects: Project[] = [
  {
    id: "hej",
    name: "禾匠商城",
    version: "v4.4.45",
    category: "电商零售",
    eyebrow: "多端商城解决方案",
    summary: "把商品、营销、会员与履约能力收进一套清晰、可信的移动购物体验。",
    accent: "#ff5d3d",
    soft: "#fff0eb",
    dark: "#30120c",
    metrics: [
      ["5 套", "历史版本合并"],
      ["商城", "核心形态"],
      ["移动端", "重点适配"],
    ],
    tags: ["商品瀑布流", "会员体系", "营销组件"],
    tabs: ["精选", "分类", "购物车"],
    hero: "今日上新",
    items: [
      { title: "手作玻璃杯", meta: "限时直降", value: "¥ 89" },
      { title: "轻量通勤包", meta: "会员包邮", value: "¥ 239" },
      { title: "柔软家居毯", meta: "本周热卖", value: "¥ 129" },
    ],
  },
  {
    id: "wmall",
    name: "啦啦外卖",
    version: "v19.9.0",
    category: "餐饮外卖",
    eyebrow: "本地餐饮与即时配送",
    summary: "用更短的决策路径连接餐厅、优惠与配送进度，突出下单效率。",
    accent: "#ffb000",
    soft: "#fff6d8",
    dark: "#2b1d00",
    metrics: [
      ["3 套", "旧版本合并"],
      ["3 端", "角色协同"],
      ["19.9", "保留版本"],
    ],
    tags: ["附近餐厅", "优惠凑单", "配送追踪"],
    tabs: ["附近", "订单", "我的"],
    hero: "30 分钟送达",
    items: [
      { title: "山野小炒", meta: "月售 1260", value: "28 min" },
      { title: "一碗好面", meta: "满 30 减 8", value: "22 min" },
      { title: "谷物研究所", meta: "轻食热卖榜", value: "35 min" },
    ],
  },
  {
    id: "jobs",
    name: "求职招聘",
    version: "v4.1.89",
    category: "企业品牌",
    eyebrow: "人才与机会匹配平台",
    summary: "面向求职者重新组织职位信息，让薪资、距离与匹配度一眼可见。",
    accent: "#7357ff",
    soft: "#f0edff",
    dark: "#17102f",
    metrics: [
      ["4 套", "历史版本合并"],
      ["89%", "模拟匹配度"],
      ["双角色", "企业与人才"],
    ],
    tags: ["职位推荐", "企业主页", "即时沟通"],
    tabs: ["职位", "公司", "消息"],
    hero: "更合适的机会",
    items: [
      { title: "高级产品设计师", meta: "AI 创意工具", value: "25–40K" },
      { title: "前端工程师", meta: "消费科技", value: "22–35K" },
      { title: "品牌内容策划", meta: "生活方式", value: "18–28K" },
    ],
  },
  {
    id: "live",
    name: "小智微直播",
    version: "v3.9.5",
    category: "文娱内容",
    eyebrow: "直播内容与频道运营",
    summary: "用沉浸画面承载直播内容，以轻量互动维持观看节奏与参与感。",
    accent: "#ff3f8d",
    soft: "#ffe8f2",
    dark: "#2c0718",
    metrics: [
      ["3.9.5", "最新版本"],
      ["直播", "核心场景"],
      ["实时", "互动反馈"],
    ],
    tags: ["频道发现", "实时评论", "关注订阅"],
    tabs: ["直播", "频道", "关注"],
    hero: "正在发生",
    items: [
      { title: "独立音乐现场", meta: "1.8 万人正在看", value: "LIVE" },
      { title: "城市夜游记", meta: "8,420 人正在看", value: "LIVE" },
      { title: "设计师的桌面", meta: "5,116 人正在看", value: "回放" },
    ],
  },
  {
    id: "travel",
    name: "景区旅游",
    version: "v5.5.6",
    category: "旅游出行",
    eyebrow: "目的地发现与行程服务",
    summary: "从灵感、门票到路线，把分散的旅行信息整理成轻松的出发体验。",
    accent: "#13a77b",
    soft: "#e3f8f0",
    dark: "#082b22",
    metrics: [
      ["5.5.6", "保留版本"],
      ["全流程", "行前服务"],
      ["地图", "路线联动"],
    ],
    tags: ["目的地推荐", "门票预订", "行程地图"],
    tabs: ["发现", "行程", "票夹"],
    hero: "周末去哪里",
    items: [
      { title: "雾岭森林线", meta: "徒步 · 2 日", value: "4.9" },
      { title: "海边慢行计划", meta: "度假 · 3 日", value: "4.8" },
      { title: "古城夜游地图", meta: "人文 · 1 日", value: "4.7" },
    ],
  },
  {
    id: "health",
    name: "医疗小程序",
    version: "v6.0.0",
    category: "生活服务",
    eyebrow: "在线问诊与健康管理",
    summary: "以清晰、克制的界面降低就诊焦虑，突出医生信息与服务可达性。",
    accent: "#1787ff",
    soft: "#e6f2ff",
    dark: "#071d35",
    metrics: [
      ["6.0.0", "最新版本"],
      ["在线", "问诊服务"],
      ["7×24", "模拟响应"],
    ],
    tags: ["在线问诊", "科室导航", "健康档案"],
    tabs: ["问诊", "科室", "健康"],
    hero: "今天感觉如何",
    items: [
      { title: "全科快速问诊", meta: "平均 3 分钟接诊", value: "可预约" },
      { title: "儿科医生团队", meta: "今日 12 位在线", value: "在线" },
      { title: "睡眠健康计划", meta: "7 天轻量指导", value: "进行中" },
    ],
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
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
  const items =
    activeTab === 0
      ? project.items
      : project.items.map((item, index) => ({
          ...item,
          title:
            activeTab === 1
              ? `${project.tabs[1]} · ${item.title}`
              : index === 0
                ? `最近浏览 · ${item.title}`
                : `为你保留 · ${item.title}`,
          meta:
            activeTab === 1
              ? `热门${project.tabs[1]}推荐`
              : `更新于 ${index + 1} 小时前`,
        }));

  return (
    <div
      className={`phone ${compact ? "phone--compact" : ""}`}
      style={
        {
          "--accent": project.accent,
          "--soft": project.soft,
          "--ink": project.dark,
        } as React.CSSProperties
      }
    >
      <div className="phone__top">
        <span>9:41</span>
        <span className="phone__status">● ◒</span>
      </div>
      <div className="phone__content">
        <div className="phone__brand">
          <span className="phone__logo">{project.name.slice(0, 1)}</span>
          <div>
            <small>{project.eyebrow}</small>
            <strong>{project.name}</strong>
          </div>
          <button aria-label="更多选项">•••</button>
        </div>
        <div className="phone__hero">
          <span>FEATURED</span>
          <h3>{activeTab === 0 ? project.hero : project.tabs[activeTab]}</h3>
          <p>{project.summary.slice(0, compact ? 22 : 32)}…</p>
          <button>{activeTab === 2 ? "查看记录" : "立即探索"}</button>
        </div>
        <div className="phone__section-title">
          <strong>{project.tabs[activeTab]}</strong>
          <span>查看全部</span>
        </div>
        <div className="phone__list">
          {items.slice(0, compact ? 2 : 3).map((item, index) => (
            <div className="phone__item" key={`${item.title}-${index}`}>
              <span className="phone__thumb">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.meta}</small>
              </div>
              <b>{item.value}</b>
            </div>
          ))}
        </div>
      </div>
      <div className="phone__nav">
        {project.tabs.map((tab, index) => (
          <span className={index === activeTab ? "is-active" : ""} key={tab}>
            <i>{["⌂", "◫", "◉"][index]}</i>
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("全部");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const categories = ["全部", ...new Set(projects.map((project) => project.category))];
  const visibleProjects = useMemo(
    () =>
      filter === "全部"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );
  const selected = projects.find((project) => project.id === selectedId) ?? null;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const openProject = (id: string) => {
    setSelectedId(id);
    setActiveTab(0);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到顶部">
          <span>作</span>
          <strong>作品档案</strong>
        </a>
        <nav aria-label="主导航">
          <a href="#works">精选作品</a>
          <a href="#method">展示方式</a>
        </nav>
        <a className="header-count" href="#works">
          6 / 743
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <p className="kicker">
            <span />
            SOURCE ARCHIVE · 2026
          </p>
          <h1>
            让旧源码
            <br />
            <em>重新被看见。</em>
          </h1>
          <p className="hero__intro">
            从 12GB、743 个真实项目中，先完成 6 个代表作品。每个案例都保留原始产品方向，
            并重构成可以点击、切换和感受的当代前端体验。
          </p>
          <div className="hero__actions">
            <a className="button button--dark" href="#works">
              浏览精选作品 <ArrowIcon />
            </a>
            <span>移动端优先 · 桌面端适配</span>
          </div>
        </div>
        <div className="hero__visual" aria-label="六个作品预览">
          <div className="orb orb--one" />
          <div className="orb orb--two" />
          <div className="hero__phone hero__phone--back">
            <PhonePreview project={projects[1]} compact />
          </div>
          <div className="hero__phone hero__phone--front">
            <PhonePreview project={projects[0]} compact />
          </div>
          <span className="hero__note">INTERACTIVE<br />PROTOTYPES</span>
        </div>
      </section>

      <section className="statement" id="method">
        <p>不是静态截图墙</p>
        <h2>
          每个作品都可以
          <br />
          <span>进入、切换、体验。</span>
        </h2>
        <div className="statement__stats">
          <div>
            <strong>743</strong>
            <span>整理后的作品总数</span>
          </div>
          <div>
            <strong>10</strong>
            <span>一级行业类目</span>
          </div>
          <div>
            <strong>6</strong>
            <span>首批可交互案例</span>
          </div>
        </div>
      </section>

      <section className="works" id="works">
        <div className="section-heading">
          <div>
            <p>SELECTED WORKS</p>
            <h2>首批作品展示</h2>
          </div>
          <div className="filters" role="group" aria-label="按类目筛选">
            {categories.map((category) => (
              <button
                className={filter === category ? "is-active" : ""}
                key={category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="work-grid">
          {visibleProjects.map((project, index) => (
            <article
              className="work-card"
              key={project.id}
              style={
                {
                  "--accent": project.accent,
                  "--soft": project.soft,
                  "--ink": project.dark,
                } as React.CSSProperties
              }
            >
              <div className="work-card__visual">
                <span className="work-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="work-card__phone">
                  <PhonePreview project={project} compact />
                </div>
                <button
                  className="work-card__open"
                  onClick={() => openProject(project.id)}
                  aria-label={`打开 ${project.name} 交互展示`}
                >
                  打开体验 <ArrowIcon />
                </button>
              </div>
              <div className="work-card__meta">
                <div>
                  <p>{project.eyebrow}</p>
                  <h3>{project.name}</h3>
                </div>
                <div className="work-card__labels">
                  <span>{project.category}</span>
                  <span>{project.version}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process">
        <p>从源码到作品</p>
        <div className="process__steps">
          {[
            ["01", "识别产品", "按模块与版本号合并，保留可追溯的最新源码。"],
            ["02", "重构体验", "使用前端假数据恢复核心场景与交互路径。"],
            ["03", "响应式呈现", "手机端像产品，电脑端像一份完整案例。"],
          ].map(([number, title, copy]) => (
            <div key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div className="brand brand--footer">
          <span>作</span>
          <strong>作品档案</strong>
        </div>
        <p>首批 6 个作品 · 持续整理中</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>

      {selected && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} 交互展示`}
        >
          <button
            className="project-modal__backdrop"
            onClick={() => setSelectedId(null)}
            aria-label="关闭展示"
          />
          <div
            className="project-modal__panel"
            style={
              {
                "--accent": selected.accent,
                "--soft": selected.soft,
                "--ink": selected.dark,
              } as React.CSSProperties
            }
          >
            <button
              className="project-modal__close"
              onClick={() => setSelectedId(null)}
              aria-label="关闭"
            >
              ×
            </button>
            <div className="project-modal__copy">
              <p className="kicker">
                <span />
                {selected.category} · {selected.version}
              </p>
              <h2>{selected.name}</h2>
              <p className="project-modal__summary">{selected.summary}</p>
              <div className="project-modal__metrics">
                {selected.metrics.map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="project-modal__tags">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-modal__switcher">
                <p>切换模拟页面</p>
                <div>
                  {selected.tabs.map((tab, index) => (
                    <button
                      className={activeTab === index ? "is-active" : ""}
                      onClick={() => setActiveTab(index)}
                      key={tab}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="project-modal__device">
              <PhonePreview project={selected} activeTab={activeTab} />
              <span className="project-modal__hint">点击左侧标签切换页面</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
