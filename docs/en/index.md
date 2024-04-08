---
layout: home

hero:
  name: "Record"
  text: "MD笔记"
  tagline: "基于vitepress"
  image:
    src: /vitepress.webp
    alt: "vitepress"
  actions:
    - theme: brand
      text: 浏览
      link: /msg
    - theme: alt
      text: GitHub
      link: https://github.com/QLing-yes/record
features:
  - icon: 📝
    title: 个人笔记站点
    details: 使用 VitePress 创建文档网站
  - icon:
      dark: /vitepress.webp
      light: /vitepress.webp
    title: 由 Vite 和 Vue 驱动的静态站点生成器
    details: 将 Markdown 变成优雅的文档，只需几分钟。
    link: https://vitepress.dev
    linkText: VitePress
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(50px);
}

</style>