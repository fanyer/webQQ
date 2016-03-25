// JavaScript Document
function $( v,oParent ){   //通过id、标签名获取和创建元素
	var type = typeof v, str , s;
	if( type === 'string' ){
		str = v.charAt() , s = v.substring(1);
		if( str == '#' )
			return (oParent||document).getElementById( s );
		if( str == '<' )
			return (oParent||document).createElement( v.slice(1,-1) );
		return (oParent||document).getElementsByTagName( v );
	}
	if( type === 'function' ) window.onload = v;
	return v;
}

function css(obj,attr) {//获取计算后的属性值，没有处理单位
    if(obj.currentStyle) {
        return obj.currentStyle[attr];
    }else {
        return getComputedStyle(obj,false)[attr];
    }
}

function getStyle( obj ,attr ){ //获取计算后的属性值，处理了单位
    if( obj.currentStyle ){
        return parseFloat( obj.currentStyle[attr] ) || 0;
    }
    return parseFloat( getComputedStyle(obj,false)[attr] ) || 0;
}

function doMove(obj,attr,dir,target,endFn) {//运动函数
    dir = parseFloat( css(obj,attr) ) < target ? Math.abs(dir) : -Math.abs(dir);
    clearInterval(obj.doMove);
    obj.doMove = setInterval(function() {
        var speed = parseFloat( css(obj,attr) ) + dir;
        if(dir>0&&speed>=target || dir<0&&speed<=target) {
            speed = target;//目的是不让speed的值超过或小于目标点的值
        }
        obj.style[attr] = speed + 'px';
        if(speed==target) {
            clearInterval(obj.doMove);
            typeof(endFn) === 'function' && endFn();
        }
    },30);
}

function shake(obj,attr,endFn) {//抖动函数
    if(obj.onOff) return;
    obj.onOff = true;
    var num = 0;
    var pos = parseFloat( css(obj,attr) );
    var arr = [];
    for(var i=18; i>0; i-=2) {
        arr.push(i,-i);
    }
    arr.push(0);
    clearInterval(obj.shake);
    obj.shake = setInterval(function() {
        obj.style[attr] = pos + arr[num] + 'px';
        num ++;
        if(num == arr.length) {
            clearInterval(obj.shake);
            obj.onOff = false;
            typeof(endFn) === 'function' && endFn();
        }
    },30);
}

function opacity(obj,dir,target,endFn) {//透明的函数
    dir = parseInt(css(obj,'opacity')*100) < target ? Math.abs(dir) : -Math.abs(dir);
    clearInterval(obj.opacity);
    obj.opacity = setInterval(function() {
        var speed = parseInt(css(obj,'opacity')*100) + dir;
        if ( speed > target && dir > 0 || speed < target && dir < 0 ) {
            speed = target;
        }
        obj.style.filter = 'alpha(opacity=' + speed + ')';
        obj.style.opacity = speed/100;
        if(speed == target) {
            clearInterval(obj.opacity);
            typeof(endFn) === 'function' && endFn();
        }
    },30);
}

function getPrev(obj) {//获取上一个兄弟节点
    if(!obj||!obj.previousSibling)return null;
    return obj.previousSibling.nodeType === 1 ? obj.previousSibling : getPrev( obj.previousSibling );
}
function getNext(obj) {//获取下一个兄弟节点
    if(!obj||!obj.nextSibling)return null;
    return obj.nextSibling.nodeType === 1 ? obj.nextSibling : getNext( obj.nextSibling );
}

function getFirst(obj) {//获取第一个子节点
    if(!obj||!obj.firstChild)return null;
    return obj.firstChild.nodeType === 1 ? obj.firstChild : getNext( obj.firstChild );
}

function getLast(obj) {//获取最后一个字节点
    if(!obj||!obj.lastChild)return null;
    return obj.lastChild.nodeType === 1 ? obj.lastChild : getPrev( obj.lastChild );//递归
}

function getByClass( sClass , parent ){  // 同过class获取元素
	var aEles = (parent || document).getElementsByTagName('*');
	var arr = [];
	for(var i=0; i<aEles.length; i++){
		var aClass = aEles[i].className.split(' ');
		for(var j=0; j<aClass.length; j++){
			if( aClass[j] == sClass ){
				arr.push( aEles[i] );
				break;
			}
		}
	}
	return arr;
}

function addClass(obj,sClass){ //增加 class名
	var aClass = obj.className.split(' ');
	if( !obj.className ){
		obj.className = sClass;
		return;
	}
	for(var i=0; i<aClass.length; i++){
		if( aClass[i] == sClass ) return;
	}
	obj.className += ' ' + sClass;
}

function removeClass( obj,sClass ){ //移除class名

	var aClass = obj.className.split(' ');
	if( !obj.className )return;
	for(var i=0; i<aClass.length; i++){
		if( aClass[i] == sClass ){
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
			return;
		}
	}
}

function bind(obj,evt,fn){  //事件绑定
 if( obj.addEventListener ){
  obj.addEventListener(evt,fn,false);
 }else{
  obj.attachEvent('on' + evt,function(){
   fn.call(obj);
  });
 }
}

function delEvent(obj,sEv,fn){//移除事件;
    if(obj.detachEvent){
        obj.detachEvent('on'+sEv,fn);
        return;
    }
    obj.removeEventListener(sEv,fn,false);
}

function getPos( obj ){
    var aPos = {l: 0, t: 0};
    while( obj ){
        aPos.l += obj.offsetLeft;
        aPos.t += obj.offsetTop;
        obj = obj.offsetParent;
        if(obj && !isLowIe( obj ) ){
            aPos.l += getStyle(obj,'borderLeftWidth');
            aPos.t += getStyle(obj,'borderTopWidth');
        }
    }
    return aPos;
}

function isLowIe( obj ){ //判断是不是ie6/7
    /*
     判断浏览器品牌或版本的思路：
     1，判断是否有某些版本才有特定的属性或方法。
     2，查找浏览器信息中的品牌信息（js5下）。
     */
    while(obj){
        obj = obj.offsetParent;
        if( obj == document.documentElement )return true;
    }
    return false;
}

function isLowIe6_7() {//判断是不是ie6/7
    var info = window.navigator.useAgent;
    if(info.indexOf('MSIE 6') != -1 || info.indexOf('MSIE 7') !=-1) return true;
    return false;
}

function browInfo(){//判断浏览器类型
    var info = navigator.userAgent;
    if(info.indexOf('MSIE 8') != -1){
        return 'IE8';
    }
    if(info.indexOf('MSIE 7') != -1){
        return 'IE7';
    }
    if(info.indexOf('MSIE 6') != -1){
        return 'IE6';
    }else{
        return 'nace';
    }
}

function view(){ //获取可视区的宽度和高度
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	}
}

function scrollH(){//内容高度
    return document.body.scrollHeight;
}

function offsetH(){//文档的高度
    return document.body.offsetHeight;
}
function scrollX(){//滚动条滚动的横向距离
    return window.pageXOffset || document.documentElement.scrollLeft;
}
function scrollY(){//滚动条滚动的纵向距离
    return window.pageYOffset || document.documentElement.scrollTop;
}

function getPos( obj ){//获取到可视区的距离
    var aPos = {l: 0, t: 0};
    while( obj ){
        aPos.l += obj.offsetLeft;
        aPos.t += obj.offsetTop;
        obj = obj.offsetParent;
        if(obj && !isLowIe( obj ) ){
            aPos.l += getStyle(obj,'borderLeftWidth');
            aPos.t += getStyle(obj,'borderTopWidth');
        }
    }
    return aPos;
}


function isLowIe( obj ){ //判断是不是ie6/7
    while(obj){
        obj = obj.offsetParent;
        if( obj == document.documentElement )return true;
    }
    return false;
}



var CrashTest = {//碰撞检测
    test : function(obj, arr) {
        var result = [];
        for (var i=0; i<arr.length; i++) {
            if ( this.compare(obj, arr[i]) ) {
                result.push(arr[i]);
            }
        }

        if (result.length) {
            return this.getShort(obj, result);
        }
    },
    compare : function(obj1, obj2) {
        var L1 = obj1.offsetLeft;
        var T1 = obj1.offsetTop;
        var R1 = L1 + obj1.offsetWidth;
        var B1 = T1 + obj1.offsetHeight;

        var L2 = obj2.offsetLeft;
        var T2 = obj2.offsetTop;
        var R2 = L2 + obj2.offsetWidth;
        var B2 = T2 + obj2.offsetHeight;

       return R1 >= L2 && L1 <= R2 && B1 >= T2 && T1 <= B2;

    },
    getShort : function(obj, arr) {
        var rs = [];
        for ( var i=0; i<arr.length; i++ ) {
            var a = obj.offsetLeft - arr[i].offsetLeft;
            var b = obj.offsetTop - arr[i].offsetTop;
            rs.push( Math.sqrt(a * a + b * b) );
        }

        var v = 999999;
        var index = -1;
        for (var i=0; i<rs.length; i++) {
            if ( rs[i] < v ) {
                v = rs[i];
                index = i;
            }
        }
        return arr[index];
    }
}

function next(obj){//下一个兄弟节点
    if(!obj||!obj.nextSibling)return null;

    return obj.nextSibling.nodeType === 1 ? obj.nextSibling : next(obj.nextSibling);
}