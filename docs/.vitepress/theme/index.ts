// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick, h, ref } from 'vue';
import mediumZoom from 'medium-zoom';//图片预览
import giscusTalk from 'vitepress-plugin-comment-with-giscus';//支持giscus评论系统的UI
import { useData, useRoute } from 'vitepress';
import Layout from "./components/Layout.vue";
import Video from './components/Video.vue'
import "./style.css"
import "./style/var.css"

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册全局组件
        // app.component('Layout' , Layout)
        app.component('Video', Video);
    },
    // https://vitepress.dev/zh/reference/default-theme-layout#custom-layout
    Layout: () => {
        const props: Record<string, any> = {}
        // 获取 frontmatter
        const { frontmatter } = useData()

        /* 添加自定义 class */
        if (frontmatter.value?.layoutClass) {
            props.class = frontmatter.value.layoutClass
        }

        return h(DefaultTheme.Layout, props)
    },
    setup() {
        const { frontmatter } = useData();
        const route = useRoute();
        console.log("meta", import.meta);
        // giscus配置
        giscusTalk({
            repo: 'QLing-yes/record', //仓库
            repoId: 'R_kgDOLoKudA', //仓库ID
            category: 'Announcements', // 讨论分类
            categoryId: 'DIC_kwDOLoKudM4CeXuN', //讨论分类ID
            mapping: 'pathname',
            inputPosition: 'bottom',
            lang: 'zh-CN',
        }, {
            frontmatter, route
        },
            //默认值为true，表示已启用，此参数可以忽略；
            //如果为false，则表示未启用
            //您可以使用“comment:true”序言在页面上单独启用它
            true
        );
        //图片预览
        const initZoom = () => {
            // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
            mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
    },

}