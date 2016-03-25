// JavaScript Document
var up = 0;
var ZIndex = 1;
var windowNum = -1;//作用是使弹出的窗口分开显示
var windowIndex = -1;
var desk_icur = 3;//当前显示的是那个桌面
var desk_icon = [
	[
		{src:'./images/app1.png',title:'斗地主',webSrc:'http://web.3366.com/ddz/',isOpen:'yes'},
		{src:'./images/app2.png',title:'3366',webSrc:'http://mgp.qq.com/webqqindex.html',isOpen:'yes'},
		{src:'./images/app3.png',title:'QQ宝贝',webSrc:'http://qqbaby.qq.com/baby.html',isOpen:'yes'},
		{src:'./images/add.png',title:'添加',isOpen:'no'}
	],
	[
		{src:'./images/app4.png',title:'芒果旅游',webSrc:'http://www.mangocity.com/webqq/bookFlight.html',isOpen:'yes'},
		{src:'./images/app5.png',title:'快递查询',webSrc:'http://kuaidi100.com/frame/app/index.html',isOpen:'yes'},
		{src:'./images/app6.png',title:'团购地图',webSrc:'http://web.qq.com/app/tuangoumap/index.html',isOpen:'yes'},
		{src:'./images/app7.png',title:'有道笔记',webSrc:'http://note.youdao.com/index.html',isOpen:'yes'},
		{src:'./images/add.png',title:'添加',isOpen:'no'}
	],
	[
		{src:'./images/app8.png',title:'金山快盘',webSrc:'http://www.kuaipan.cn/',isOpen:'yes'},
		{src:'./images/app9.png',title:'搜搜地图',webSrc:'http://map.soso.com/?ADTAG=n.web.app.btn',isOpen:'yes'},
		{src:'./images/app10.png',title:'浏览网页',webSrc:'http://hao.qq.com/index_webqq.html',isOpen:'yes'},
		{src:'./images/app11.png',title:'豆瓣FM',webSrc:'http://douban.fm/partner/qq_plus',isOpen:'yes'},
		{src:'./images/app12.png',title:'花瓣网',webSrc:'http://huaban.com/',isOpen:'yes'},
        {src:'./images/app20.png',title:'2048游戏',webSrc:'./work/2048/2048.html'/*tpa=http://wen.oeeee.com/fanyer/2048/2048.html*/,isOpen:'yes'},
        {src:'./images/app20.png',title:'小游戏',webSrc:'http://www.miaov.com/student/SuLingWebQQ/WebQQ/js/work/QQGame/index.html',isOpen:'yes'},
        {src:'./images/app20.png',title:'无缝滚动',webSrc:'./work/imagesRoll/index.html',isOpen:'yes'},
        {src:'./images/app20.png',title:'招聘信息',webSrc:'./work/recruitingWebsite/index.html',isOpen:'yes'},
        {src:'./images/app20.png',title:'文档说明',webSrc:'http://www.miaov.com/student/SuLingWebQQ/WebQQ/js/work/documentSpecification/index.html',isOpen:'yes'},
		{src:'./images/add.png',title:'添加',isOpen:'no'}
	],
	[
		{src:'./images/app13.png',title:'起点中文',webSrc:'http://webqq.qidian.com/',isOpen:'yes'},
		{src:'./images/app14.png',title:'乐视网',webSrc:'http://www.letv.com/cooperation/qq.html',isOpen:'yes'},
		{src:'./images/app15.png',title:'QQ阅读',webSrc:'http://qqreader.qq.com/',isOpen:'yes'},
        {src:'./images/app21.png',title:'音悦台',webSrc:'http://www.yinyuetai.com/',isOpen:'yes'},
		{src:'./images/app16.png',title:'腾讯视频',webSrc:'http://ptlogin2.tenpay.com/tenvideo',isOpen:'yes'},
		{src:'./images/add.png',title:'添加',isOpen:'no'}
	],
	[
		{src:'./images/app17.png',title:'慕课网',webSrc:'http://www.imooc.com/',isOpen:'yes'},
        {src:'./images/app18.png',title:'好友管理',webSrc:'http://id.qq.com/index.html',isOpen:'yes'},
        {src:'./images/app19.png',title:'网易课堂',webSrc:'http://study.163.com/',isOpen:'yes'},
        {src:'./images/add.png',title:'添加',isOpen:'no'}
	]
];

var left_sideBar_icon = [
	{title:'应用市场',src:'./images/icon1-1.png',webSrc:'http://web.qq.com/module/appmarket/appmarket.html'},
	{title:'我的网盘',src:'./images/icon2-1.png',webSrc:'http://www.weiyun.com/index.html'},
	{title:'QQ',src:'./images/icon3-1.png',webSrc:'http://w.qq.com/'},
	{title:'QQ音乐',src:'./images/icon4-1.png',webSrc:'http://y.qq.com/#type=index'},
	{title:'QQ邮箱',src:'./images/icon5-1.png',webSrc:'https://mail.qq.com/cgi-bin/loginpage'},
	{title:'腾讯微博',src:'./images/icon6-1.png',webSrc:'http://dev.t.qq.com/'}
];


