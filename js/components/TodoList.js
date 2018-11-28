(function(window) {
   const template = `
   <ul class="todo-list">
   <!-- These are here just to show the structure of the list items -->
   <!-- List items should get the class editing when editing and completed when marked as completed -->
   <li v-bind:class="{completed:item.done}" v-for="(item,index) in list" v-if="item.isShow">
       <div class="view">
           <input class="toggle"  type="checkbox" v-model="item.done">
           <label>{{item.title}}</label>
           <button @click="handleRemoveToDo(index)" class="destroy"></button>
       </div>
       <input class="edit" value="Create a TodoMVC template">
   </li>
</ul>
   `;
   window.TodoList = {
       template,
       // 申明list
       props: ['list'],
       methods:{
          // 单项"X"点击删除事件处理
          handleRemoveToDo:function(index){
          this.$emit("remove",index);
        },
       }
   }
})(window)