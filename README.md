# jqz-shopping

<p>基于jquery,zepto框架的购物车计算js，目的是作一个泛用性的购物车计算插件，集合了常用的功能。</p>
<small>zepto是一款比jquery更小的js框架，拥有jquery几乎同样的语法，更适合手机场景和简单的应用。</small>
<ul>
	<li>单项自动计算
	<li>单项附加额外事件
	<li>添加选中项
	<li>向多个对象输出总数
	<li>总数额外附加事件
	<li>可扩展事件：全选，重新计算
</ul>
<h5>Code</h5>
<code>
	&lt;script&gt;new $.jqz_shopping()&lt;/script&gt;
</code>
<h5>基本参数</h5>
<ol>
	<li>单项目标：cell
	<li>单项中的数量目标:age最小为1
	<li>单价目标集合：unit：[单价对象，是否同步，输出到单项总额]，<small>默认获得第一个对象的data-unin或其text,当不存在第三个对象时默认输出到第一个对象上，建议用data-unit设置价格</small>
	<li>单项选中项:check，无默认全选
	<li>进位：fixed默认1位
	<li>总额输出对象：total可以是一个数组
	<li>单项附加事件：single单项计算时将执行返回当前对象和现总额，用return返回给shopping.js
	<li>总额附加事件：fun返回一个计算后的总额，用return返回给shopping.js
</ol>
<h5>扩展事件</h5>
<ul>
	<li>全选this.prop(str),默认全选check的参数，str为一个对象的字符串，将被全部选中
	<li>重新计算，this.again();当有其他的事件改变总额的值的时候，可以用这个事件重新计算
</ul>	