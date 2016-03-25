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
	if( type === 'function' )window.onload = v;
	return v;
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

function getStyle( obj ,attr ){ //获取当前的属性值
	if( obj.currentStyle ){
		return parseFloat( obj.currentStyle[attr] );
	}
	return parseFloat( getComputedStyle(obj)[attr] );
}

function view(){ //获取可视区的宽度和高度
	return {
		w: document.documentElement.clientWidth,
		h: document.documentElement.clientHeight
	}
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