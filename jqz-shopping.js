;(function($){
	$.jqz_shopping = function(arr){
		var init = {
			//条目对象
			cell:'.li',
			//单价对象，同步,输出对象
			unit:['.unit',false],
			//数量对象
			age:'.age',
			//选中对象
			check:"input[type='checkbox']",
			//进位
			fixed:1,
			total:'.total',
		};
		
		//初始化
		if (arr) $.extend(init,arr);
		var obj = this,
			$li = $(init.cell),
			total = 0,
			unit = [];		
		//当没有输出对象默认单价对象为输出对象
		if(typeof init.unit == 'object'){
			unit.unit = init.unit['0'];
			unit.syn = init.unit['1'];
			unit.log = init.unit['2']?init.unit['2']:init.unit['0'];
		}
		
		//1进行单项计算
		function js_unit($this){
			var 
				un = $this.find(unit.unit).attr('data-unit')||$this.find(unit.unit).text(),
				age = $this.find(init.age).val()||$this.find(init.age).text()||1,
				money = un*age;
				return money;			
		}
		
		//2，计算个条目的价格
		function cell_money(){
			total = 0;//清0
			for(var i=0;i<$li.size();i++)
			{
				var $this = $li.eq(i),
					money = js_unit($this).toFixed(init.fixed);
				//单项价格
				if(unit.syn)$this.find(unit.log).text(money);
				//选中项
				if(init.check){
					if($this.find(init.check).prop('checked')){
					total+= Number(money);
					total_log();	
					}
					
				}else{
					total+= Number(money);
					total_log();
				}
			}		
		}
			
		cell_money()
		//3,附加项计算
		
		
		//4,输出总价
		function total_log(){
			var m = total.toFixed(init.fixed);
			if(typeof init.total == 'object')
			{
				for(var i=0;i<init.total.length;i++)
				{
					//多个总价对象输出
					var str = init.total[i];
					$(str).text(m);
				}
			}else{
				//单个
				$(init.total).text(m);
			}
		}
		//5触发重新计算
		$(init.age).on('input propertychange',function(){
				var $this =	$(this).parents(init.cell);
				//计算总价
				if(!init.check||$this.find(init.check).prop('checked') == true)
				{
					cell_money();
				}else{
					//计算单项
					var m = js_unit($this).toFixed(init.fixed);
					$this.find(unit.log).text(m)
				}
			})
		//扩展事件
	}
})(window.Zepto||window.jQuery)
