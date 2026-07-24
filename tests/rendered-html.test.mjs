import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the source-derived portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>作品档案｜743 个网站与小程序源码展示<\/title>/);
  assert.match(html, /让旧源码/);
  assert.match(html, /按原样重现/);
  assert.match(html, /禾匠商城/);
  assert.match(html, /啦啦外卖/);
  assert.match(html, /求职招聘/);
  assert.match(html, /小智微直播/);
  assert.match(html, /景区旅游/);
  assert.match(html, /医疗小程序/);
  assert.match(html, /26 \/ 743/);
  for (const name of [
    "掌门智慧房产",
    "麦芒装饰装修 DIY",
    "知识付费在线课程",
    "知乎答题王",
    "微教育",
    "4S 汽车城",
    "兵马俑实时导览",
    "熊猫签证",
    "超人名片",
    "柚子律师",
    "婚庆服务",
    "米花同城社区",
    "超人二手跳蚤市场",
    "同城智慧红娘",
    "上门预约服务",
    "美容美发营销版",
    "手机回收",
    "步数宝",
    "超人积分商城",
    "志汇酒店营销",
  ]) {
    assert.match(html, new RegExp(name));
  }
  assert.match(html, /\/source-assets\/live\/cover\.jpg/);
  assert.match(html, /\/source-assets\/archive\/course\.webp/);
});

test("publishes valid social metadata and local source assets", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /property="og:image" content="https:\/\/zuopin-archive-neil\.neil-wong2012\.chatgpt\.site\/og\.png"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);

  const [page, layout, og, archiveAsset] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../public/source-assets/archive/warriors.webp", import.meta.url)),
  ]);

  assert.match(page, /SOURCE UI/);
  assert.match(page, /前端演示数据/);
  assert.match(page, /onTabChange/);
  assert.match(page, /phone-search-results/);
  assert.match(page, /setCartCount/);
  assert.match(page, /简历投递成功/);
  assert.match(page, /模拟服务器响应/);
  assert.match(page, /window\.setTimeout/);
  assert.match(page, /正在加载/);
  assert.match(page, /ArchiveHome/);
  assert.match(page, /source-assets\/archive\/hotel\.webp/);
  assert.match(page, /wmall: \["icon-1"/);
  assert.match(page, /source-assets\/travel\/logo\.jpg/);
  assert.match(layout, /metadataBase/);
  assert.equal(og, undefined);
  assert.equal(archiveAsset, undefined);
});
