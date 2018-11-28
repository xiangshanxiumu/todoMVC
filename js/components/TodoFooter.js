(function(window) {
     const template = `
     <footer class="footer">
     <!-- This should be 0 items left by default -->
     <span class="todo-count"><strong>{{msg}}</strong> item left</span>
     <!-- Remove this if you don't implement routing -->
     <ul class="filters">
         <li>
             <a href="#/all" :class = "{selected:isAll}" @click = "handleAll">All</a>
         </li>
         <li>
             <a href="#/active" :class = "{selected:isActive}" @click = "handleActive">Active</a>
         </li>
         <li>
             <a href="#/completed" :class = "{selected:isCompleted}" @click = "handleCompleted">Completed</a>
         </li>
     </ul>
     <!-- Hidden if no completed items are left ↓ -->
     <button class="clear-completed" @click="toDosClearCompleted">Clear completed</button>
 </footer>
     `;
     window.TodoFooter = {
         props:["msg"],
         template,
         data(){
           return {
               isAll: true,
               isActive: false,
               isCompleted: false   
           }
         },
         methods:{
             //All选择处理
             handleAll () {
               this.isAll = true;
               this.isActive = false;
               this.isCompleted = false;
               this.$emit("all");
             },
             //Active选择处理
             handleActive () {
              this.isActive = true;
              this.isAll = false;
              this.isCompleted = false;
              this.$emit("active");
             },
             //Completed选择处理
             handleCompleted () {
               this.isCompleted = true;
               this.isAll = false;
               this.isActive = false;
               this.$emit("completed");
             },
             //ClearCompleted点击处理
             toDosClearCompleted(){
                this.$emit("clearCompleted");
             },
         }   
     }
})(window)