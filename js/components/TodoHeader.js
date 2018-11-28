(function(window) {
     const template = `
     <header class="header">
        <h1>todos</h1>
        <input v-on:keyup.enter="handleAddToDo" class="new-todo" placeholder="What needs to be done?" autofocus>
    </header>
     `;
     window.TodoHeader = {
         template,
         methods: {
            // 添加数据处理
            handleAddToDo(e) {
                // 拿到文本框的数据
                // 把数据添加到todos数组中
                // 发布自定义事件
                this.$emit("addTask",e);
            }
         }
     }

})(window)