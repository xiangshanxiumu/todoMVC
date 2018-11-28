(function(Vue,App) {
    // 找到入口节点 启动组件系统
    new Vue({
        el: "#app",
        template: "<App></App>",
        components: {App}
    });
})(Vue,App); 