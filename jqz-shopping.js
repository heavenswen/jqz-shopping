;
(function($) {
	$.jqz_shopping = function(arr) {
		var init = {
			//条目对象,和单项附加事件
			cell: ['.li'],
			//单价对象，同步,输出对象
			unit: ['.unit', false],
			//数量对象
			age: '.age',
			//选中对象
			check: "input[type='checkbox']",
			//进位
			fixed: 1,
			//输出总额的对象，可以是多个
			total: '.total',
			//一个附加在总额上的事件
			fun: '',
		};

		//初始化
		if (arr) $.extend(init, arr);
		var obj = this,
			cell = typeof init.cell == 'object' ? init.cell['0'] : init.cell,
			total = 0,
			unit = [];
		//当没有输出对象默认单价对象为输出对象
		if (typeof init.unit == 'object') {
			unit.unit = init.unit['0'];
			unit.syn = init.unit['1'];
			unit.log = init.unit['2'] ? init.unit['2'] : init.unit['0'];
		}
		//1进行单项计算
		function js_unit($this) {
			var
				un = $this.find(unit.unit).attr('data-unit') || $this.find(unit.unit).text(),
				age = $this.find(init.age).val() || $this.find(init.age).text() || 1,
				money = parseFloat(un) * parseFloat(age);

			money = tofixed(money);
			//进行单项附加项事件
			if (typeof init.cell == 'object' && typeof init.cell['1'] == 'function') {
				console.log(init.cell['1'])
				money = init.cell['1']($this, money);
			}

			//单项价格
			if (unit.syn) $this.find(unit.log).text(tofixed(money));
			return money;
		}

		//2，计算个条目的价格
		function cell_money() {
			total = 0; //清0
			var $cell = $(cell);
			//遍历计算
			for (var i = 0; i < $cell.size(); i++) {
				var $this = $cell.eq(i),
					money = js_unit($this);

				//选中项
				if (init.check) {
					if ($this.find(init.check).prop('checked')) {
						total += Number(money);
					}

				} else {
					total += Number(money);
				}
			}

			return total_log();
		}

		cell_money();
		//3,输出总价
		function total_log() {
			var m = tofixed(total);
			if (typeof init.fun == 'function') m = tofixed(init.fun(m));

			if (typeof init.total == 'object') {
				for (var i = 0; i < init.total.length; i++) {
					//多个总价对象输出
					var str = init.total[i];
					$(str).text(m);
				}
			} else {
				//单个
				$(init.total).text(m);
			}
			return m;
		}
		//4触发重新计算
		$('body').on('input propertychange', init.age, function() {
				var $this = $(this).parents(init.cell);

				//计算总价
				if (!init.check || $this.find(init.check).prop('checked') == true) {
					cell_money();
				} else {
					//计算单项
					var m = js_unit($this);
				}
			})
			//进位计算
		function tofixed(num) {
			num = parseFloat(num);
			if (typeof num != 'number') console.log('运算中出现非数字字符');
			return num.toFixed(init.fixed);

		}
		//选中触发
		if (init.check) {
			$('body').on('change', init.check, function() {
				cell_money()
			});
		}
		//扩展事件
		//全部选中

		this.checked = function() {

				var $input = $(init.check),
					checked = true; //全选

				for (var i = 0; i < $input.size(); i++) {
					if ($input.eq(i).prop('checked') == false) {
						checked = false;
						break;
					}
				}

				$input.prop('checked', !checked);
				cell_money();
			}
			//重新计算
		this.again = function() {
			return cell_money();
		}
	}
})(window.Zepto || window.jQuery)