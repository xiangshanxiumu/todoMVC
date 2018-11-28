(function(window,AppFooter,TodoHeader,TodoList,TodoFooter) {
    // 把整个应用当成一个组件
const template = `
<div>
<section class="todoapp" id="todoapp">
<TodoHeader @addTask="handleAddTodo"></TodoHeader>
<!-- This section should be hidden by default and shown when there are todos -->
<section class="main">
	<input id="toggle-all" v-bind:checked="getToggleAllStatus()" @click="handleToggleAll" class="toggle-all" type="checkbox">
	<label for="toggle-all">Mark all as complete</label>
	<TodoList v-bind:list="todos" @remove="removeTodo"></TodoList>	
	<TodoFooter v-bind:msg="getCount" @clearCompleted="clearAllDone" @all="handleStatusAll" @active="handleStatusActive" @completed="handleStatusCompleted"></TodoFooter>
</section>
</section>
<AppFooter></AppFooter>
</div>
`;
window.App = {
      data() {
          return {
				//本地localStorage拿数据
				todos:JSON.parse(window.localStorage.getItem("todos")||'[]'),
				active:'block'
		 }   
	  },
	  watch:{
       	    todos:{
       		handler:function(){
       		//实现本地localStorage存储
			   window.localStorage.setItem("todos",JSON.stringify(this.todos));
		    },
       	    deep:true
           }
       },
	  template,
	  //计算属性获取所有未完成任务数
      computed:{
          getCount:function(){
       		  let count = 0;
       		  this.todos.forEach(item=>{
       	      if(item.done==false){
       		     count++;
       		  }
              //console.log(count);
              //return count; 这个位置无法返回值
       		 });
             return count;
		}
      },
	  methods: {
          handleAddTodo(e) {
          	//判断todos最后一个item是否存在
       		const lastTodo = this.todos[this.todos.length-1];
            lastTodoId =lastTodo?this.todos.length+1:1;
            //排除空格
       		if(e.target.value.trim().legth!=0){
       		//任务加入数组
              this.todos.push({
				  id:lastTodoId,
				  title:e.target.value,
				  done: false,
				  isShow: true // 后续用于条件筛选单项显示或隐藏
			});
			}
       		//清空文本框
       		e.target.value="";
		},
		//切换所有任务的完成状态
       	handleToggleAll:function(e){
       		const checked = e.target.checked;
       		this.todos.forEach(item=>{
               item.done = checked;
       		});
       	},
       	//任务的完成状态
       	getToggleAllStatus:function(){
       		//console.log(this);
       		let status = true;
       		this.todos.forEach(item=>{
               if(item.done===false){
               	status = false;
               }
       		});
       		return status;
       	},
        //单项点击"X"删除处理
       	removeTodo:function(index){
            this.todos.splice(index,1);
       	},
	     //"Clear Completed"点击处理，删除已完成的任务
       	clearAllDone(){
       		for(let i=0;i<this.todos.length;i++){
       			const item = this.todos[i];
       			 if(item.done){
                	this.todos.splice(i,1);
                	i--;
                }
       		}
		   },
        //All 选择处理, 全部都显示
		handleStatusAll () {
			this.todos.forEach(item=>{
				item.isShow = true;
			});
		},
		//Active选择处理，筛选显示未checked选项
        handleStatusActive () {
			this.todos.forEach(item=>{
				if(item.done == false){
					item.isShow = true
				}else{
					item.isShow = false
				}
			});
		},
		//Completed选择处理， 筛选显示完成chicked选项
		handleStatusCompleted () {
            this.todos.forEach(item=>{
				if(item.done == true){
					item.isShow = true
				}else{
					item.isShow = false
				}
			});
		}
	  },
	  //子组件申明
	  components: {
		  AppFooter,
		  TodoHeader,
		  TodoList,
		  TodoFooter
	  }
}
})(window,AppFooter,TodoHeader,TodoList,TodoFooter)

