// JavaScript Document
/* S desk */
function Desk() {
    this.oDesk = $('#desk');
    this.oTopnav = $('#topnav'); //头部导航
    this.oLeft_sideBar = $('#left_sideBar'); // 左导航
    this.oDesk_use = $('#desk_use');
    this.oTask = getByClass('task')[0];//任务栏
    this.oContextmenu = $('#contextmenu');//桌面右键
    this.oMenu = $('#menu');//图标右键
    this.oThemeSet = $('#themeSet');//主题设置按钮
    this.oTheme_settings = $('#theme_settings');//主题组
    this.len = 5;//桌面个数
    this.aDesk = [];//放桌面
    this.aDesk_use = [];
    this.desk_app = [[],[],[],[],[]];//放应用图标
    this.arrange = 'col';//图标排列方式'row'：横向，'col'：纵向，
    this.up_distance = 60; //图标桌面上边距
    this.left_distance = 120;//图标桌面左边距
    this.row_distance = 45;//横向两个图标间的距离
    this.col_distance = 30;//纵向两个图标间的距离
    this.init();
}

Desk.prototype = {
    constructor : Desk,
    init : function() {          //初始化
        this.createUseDesk();
        this.topNav();
        this.leftBar();
        this.event();
    } ,
    createUseDesk : function() { //创建桌面及应用图标
        var that = this;
        var fragment = document.createDocumentFragment();
        for(var i=0; i<this.len; i++) {
            var oUseGroud = $('<div>');
            var oUl = $('<ul>');

            oUseGroud.id = 'use_group_' + (i+1);
            oUseGroud.className = 'use_group';
            oUseGroud.index = i;

            oUl.className = 'desk' + (i+1) + ' use_icon clear';
            oUl.index = i;

            for(var j=0; j<desk_icon[i].length; j++) {
                var oLi = $('<li>');
                var oDiv = $('<div>');
                var oImg = $('<img>');
                var oP = $('<p>');
                var oSpan = $('<span>');
                var oEm = $('<em>');
                oLi.index = j;

                oLi.setAttribute('isOpen',desk_icon[i][j].isOpen);
                oLi.setAttribute('isClick', 'false');
                oLi.setAttribute('isDesk', 'yes');
                oLi.setAttribute('index', j);
                oLi.setAttribute('orderIndex', j);
                oDiv.className = 'appButton_appIcon';
                oDiv.title = desk_icon[i][j].title;
                oImg.src = desk_icon[i][j].src;
                oSpan.innerHTML = desk_icon[i][j].title;

                oDiv.appendChild(oImg);
                oP.appendChild(oSpan);
                oP.appendChild(oEm);
                oLi.appendChild(oDiv);
                oLi.appendChild(oP);
                this.desk_app[i].push(oLi);
                oUl.appendChild(oLi);
            }
            this.aDesk_use.push(oUl);
            oUseGroud.appendChild(oUl);
            this.aDesk.push(oUseGroud);
            fragment.appendChild(oUseGroud);
        }

        for(var i=0; i<this.aDesk.length; i++) {
            if(i == desk_icur-1) {
                this.aDesk[i].style.opacity = 1;
                this.aDesk[i].style.filter = 'alpha(opacity=100)';
            }else {
                this.aDesk[i].style.opacity = 0;
                this.aDesk[i].style.filter = 'alpha(opacity=0)';
            }
        }

        this.oDesk_use.appendChild(fragment);
        this.setSize();
        this.arrangeIcon(this.arrange);
    },
    setSize : function() {//设置尺寸
        this.oDesk_use.style.width = view().w  + 'px';
        this.oDesk_use.style.height = view().h  + 'px';
        for(var i=0; i<this.len; i++){
            this.aDesk[i].style.width = view().w  + 'px';
            this.aDesk[i].style.height = view().h - 50  + 'px';
            this.aDesk_use[i].style.width = view().w  + 'px';
            this.aDesk_use[i].style.height = view().h - 50  + 'px';
            if(i < desk_icur-1) {
                this.aDesk[i].style.left = -view().w + 'px';
            }
            if(i == desk_icur-1) {
                this.aDesk[i].style.left = 0 + 'px';
            }
            if(i> desk_icur-1) {
                this.aDesk[i].style.left = view().w + 'px';
            }
        }
    },
    arrangeIcon : function() {//排列图标
        var that = this;
        var dis_width = this.desk_app[0][0].offsetWidth + this.row_distance;
        var dis_height = this.desk_app[0][0].offsetHeight + this.col_distance;

        for(var i=0; i<this.aDesk.length; i++){
            if(this.arrange === 'row') {
                var row_icon = parseInt(this.aDesk_use[0].offsetWidth/dis_width);//一行最多可以放几个图标
                //var row_count = Math.ceil(this.desk_app[i].length/row_icon);//每一个桌面需要多少行
                for(var j=0; j<this.desk_app[i].length; j++) {
                    doMove(this.desk_app[i][j], {
                        left : this.left_distance + (j%row_icon)*dis_width,
                        top : this.up_distance + parseInt(j/row_icon)*dis_height,
                        opacity : 100
                    }, 1000, 'easeInStrong')
                }
            }
            if(this.arrange === 'col') {
                var col_icon = parseInt(this.aDesk_use[0].offsetHeight/dis_height);//一列最多可以放几个图标
                //var col_count = Math.ceil(this.desk_app[i].length/col_icon);//每一个桌面需要多少列
                for(var j=0; j<this.desk_app[i].length; j++) {
                    doMove(this.desk_app[i][j], {
                        left : this.left_distance + parseInt(j/col_icon)*dis_width,
                        top : this.up_distance + (j%col_icon)*dis_height,
                        opacity : 100
                    }, 1000, 'easeInStrong')
                }
            }
        }

    },
    deskMove : function(num) {//桌面运动
        var that = this;
        var oTopnav_tab = getByClass('topnav_tab');
        var aLi = $('li',oTopnav_tab[0]);
        for(var i = 0; i<aLi.length; i++) {
            aLi[i].className = '';
            if(i>num-1){
                doMove(that.aDesk[i], {
                    left : view().w,
                    opacity : 0
                }, 1000, 'easeOut')
            }
            if(i<num-1){
                doMove(that.aDesk[i], {
                    left : -view().w,
                    opacity : 0
                }, 1000, 'easeOut')
            }
        }

        doMove(that.aDesk[num-1], {
            left : 0,
            opacity : 100
        }, 1000, 'easeOut')
        desk_icur = num;
        aLi[num-1].className = 'active';

    },
    leftBar : function() {//左侧导航
        var that = this;
        /*var left_Bar = new drag( this.oLeft_sideBar,{
            isLimit : true
        });*/
        this.aSideBar_use = $('#sideBar_use');
        this.aSide_li = $('li',this.aSideBar_use);
        this.aSide_li_arr = [];
        var x = 0;
        var y =0;
        for(var i=0; i<this.aSide_li.length; i++) {
            this.aSide_li[i].setAttribute('isClick', 'false');
            this.aSide_li[i].setAttribute('isDesk', 'no');
            this.aSide_li[i].index = i;
            x = this.aSide_li[i].offsetLeft;
            y = this.aSide_li[i].offsetTop;
            this.aSide_li[i].style.left = x + 'px';
            this.aSide_li[i].style.top = y + 'px';
            this.aSide_li[i].pos = {
                x : x,
                y : y
            };

        }

        for(var i=0; i<this.aSide_li.length; i++) {
            this.aSide_li[i].style.margin = 0;
            this.aSide_li[i].style.position = 'absolute' ;
            this.aSide_li_arr.push(new drag(this.aSide_li[i]));

            this.aSide_li_arr[i].on('start', function() {
                this.obj.style.zIndex = ZIndex++;
            });

            this.aSide_li_arr[i].on('exchange', function() {
                var arr1 = [];
                for(var i=0; i<that.aSide_li.length; i++) {
                    if(that.aSide_li[i] != this.obj) {
                        arr1.push(that.aSide_li[i]);
                    }
                }

                var obj = CrashTest.test(this.obj, arr1);
                if (obj) {
                    doMove(this.obj, {
                        left : obj.pos.x,
                        top : obj.pos.y
                    }, 1000, 'bounceOut');

                    var j = this.obj.pos;

                    this.obj.pos = {
                        x : obj.pos.x,
                        y : obj.pos.y
                    }

                    doMove(obj, {
                        left : j.x,
                        top : j.y
                    }, 1000, 'bounceOut');

                    obj.pos = {
                        x : j.x,
                        y : j.y
                    }

                } else {
                    doMove(this.obj, {
                        left : this.obj.pos.x,
                        top : this.obj.pos.y
                    }, 1000, 'bounceOut');
                }

            });


            // 弹窗
            this.aSide_li_arr[i].on('windowP', function(ev) {
                if(ev.X == 0 && ev.Y == 0) {
                    this.obj.onclick = function() {
                        that.openWindow(this);
                    };
                }else {
                    this.obj.onclick = null;
                }
            });
        }
    },
    openWindow : function(obj,PaIndex,sIndex) {
        if(obj.getAttribute('isClick') == 'false') {
            obj.setAttribute('isClick','true');
            new PopWindow(obj);//点击弹窗窗口
        }else {
            if(obj.getAttribute('isDesk') == 'yes') {
                var oWindow = $('#window_pop_' + PaIndex + '_' + sIndex);
            }else {
                var oWindow = $('#window_pop_' + obj.index);
            }
            oWindow.style.zIndex = ZIndex++;
            var aWebbrowserMask = getByClass('webbrowserMask');
            if(aWebbrowserMask.length) {
                for(var i=0; i<aWebbrowserMask.length; i++) {
                    aWebbrowserMask[i].style.display = 'block';
                }
            }
            oWindow.children[1].children[0].style.display = 'none';
            var aA = $('a',this.oTask);
            for(var i=0; i< aA.length; i++) {
                if(aA[i].getAttribute('index') == oWindow.getAttribute('index')) {
                    aA[i].className = 'active';
                }else {
                    aA[i].className = '';
                }
            }
        }
    },
    appRigthEvent : function(obj) {
        var that = this;
        var aLi = this.oMenu.children[0].children;
        var aMoveTo = $('li',aLi[1]);
        var PaIndex = obj.parentNode.index;
        var sIndex = obj.index;
        aLi[0].onclick = function() {//打开应用
            that.openWindow(obj,PaIndex,sIndex);
        };
        aLi[2].onclick = function() {//删除应用
            if(obj.getAttribute('isClick') == 'true') {
                var index = obj.getAttribute('index');
                var oWindow = $('#window_pop_' + PaIndex + '_' + index);
                obj.setAttribute('isClick','false');
                var aA = $('a',that.oTask);
                for(var i=0; i< aA.length; i++) {
                    if(aA[i].getAttribute('index') == oWindow.getAttribute('index')) {
                        that.oTask.removeChild(aA[i].parentNode);
                    }
                }
                obj.parentNode.parentNode.removeChild(oWindow);
                strong();
            }
            obj.parentNode.removeChild(obj);
            that.desk_app[PaIndex].splice(sIndex,1);
            that.arrangeIcon();
            desk_icon[PaIndex].splice(sIndex,1);
            for(var i=0; i<that.desk_app[PaIndex].length; i++) {
                that.desk_app[PaIndex][i].index = i;
                that.desk_app[PaIndex][i].setAttribute('orderIndex',i);
                if(that.desk_app[PaIndex][i].getAttribute('isClick') != 'true' ) {
                    that.desk_app[PaIndex][i].setAttribute('index',i);
                }
            }

        };
        for(var i=0; i<aMoveTo.length; i++) {
            aMoveTo[i].index = i;
            aMoveTo[i].className = '';
            if(aMoveTo[i].index != desk_icur-1 ) {
                aMoveTo[i].onclick = function() {
                    moveApp(this);
                };
            }
        }

        aMoveTo[desk_icur-1].className = 'active';
        function moveApp(aMoveTo) {
            if(obj.getAttribute('isClick') == 'true') {
                var index = obj.getAttribute('index');
                var oWindow = $('#window_pop_' + PaIndex + '_' + index);
                obj.setAttribute('isClick','false');
                var aA = $('a',that.oTask);
                for(var i=0; i< aA.length; i++) {
                    if(aA[i].getAttribute('index') == oWindow.getAttribute('index')) {
                        that.oTask.removeChild(aA[i].parentNode);
                    }
                }
                obj.parentNode.parentNode.removeChild(oWindow);
                strong();
            }
            var num = aMoveTo.index;
            var aUseIcon = getByClass('use_icon');
            var replace = [];
            aUseIcon[num].insertBefore(obj,aUseIcon[num].children[aUseIcon[num].children.length-1]);
            that.desk_app[PaIndex].splice(sIndex,1);
            that.desk_app[num].splice(that.desk_app[num].length-1,0,obj);
            replace = desk_icon[PaIndex].splice(sIndex,1);
            desk_icon[num].splice(desk_icon[num].length-1,0,replace[0]);
            that.arrangeIcon();
            for(var i=0; i<that.desk_app[PaIndex].length; i++) {
                that.desk_app[PaIndex][i].index = i;
                that.desk_app[PaIndex][i].setAttribute('orderIndex',i);
                if(that.desk_app[PaIndex][i].getAttribute('isClick') != 'true' ) {
                    that.desk_app[PaIndex][i].setAttribute('index',i);
                }
            }
            for(var i=0; i<that.desk_app[num].length; i++) {
                that.desk_app[num][i].index = i;
                that.desk_app[num][i].setAttribute('orderIndex',i);
                if(that.desk_app[num][i].getAttribute('isClick') != 'true' ) {
                    that.desk_app[num][i].setAttribute('index',i);
                }
            }

        }

        function strong() {
            var aWindow_pop_wrap = getByClass('window_pop_wrap');
            var dArr = [];
            if(aWindow_pop_wrap.length) {
                for(var i=0; i<aWindow_pop_wrap.length; i++) {
                    dArr.push(aWindow_pop_wrap[i]);
                }
                dArr.sort(function(a,b) {
                    return getStyle(b,'zIndex') - getStyle(a,'zIndex');
                });
                currentTask(dArr[0]);
            }else {
                that.oTask.style.display = 'none';
            }
        }

        function currentTask(obj) {
            var aA = $('a',that.oTask);
            for(var i=0; i< aA.length; i++) {
                aA[i].className = '';
            }
            var aWebbrowserMask = getByClass('webbrowserMask');
            if(aWebbrowserMask.length) {
                for(var i=0; i<aWebbrowserMask.length; i++) {
                    aWebbrowserMask[i].style.display = 'block';
                }
            }

            if(obj) {
                for(var i=0; i<aA.length; i++) {
                    if(aA[i].getAttribute('index')==obj.getAttribute('index')) {
                        aA[i].className = 'active';
                        break;
                    }
                }
                obj.children[1].children[0].style.display = 'none';
            }
        }
    },
    topNav : function() {//顶部导航
        var that = this;
        var p = new drag( this.oTopnav,{
            isLimit : true
        });
        var oTopnav_tab = getByClass('topnav_tab');
        var aLi = $('li',oTopnav_tab[0]);
        for(var i=0; i<aLi.length; i++) {
            aLi[i].index = i;
            aLi[i].onclick = function() {
                that.deskMove(this.index+1);
            };
        }

    },
    docRight: function() {
        var that = this;

        var aDocLi = this.oContextmenu.children[0].children;

        var aList_1 = $('li',aDocLi[0]);
        var aList_2 = $('li',aDocLi[1]);
        var arrList1 = [
            [58,32,2,'images/appbutton_mouseover_bg4.png'],
            [86,48,6,'images/appbutton_mouseover_bg3.png']
        ];
        var arrList2 = ['row','col']; //图标排列方式'row'：横向，'col'：纵向，

        aDocLi[2].onclick = function() {//刷新
            that.refresh();
            bigSmall(aList_1[1],arrList1[1]);
            rowCol(aList_2[1],arrList2[1]);

        };

        aDocLi[3].onclick = function() {//显示桌面
            that.showRrightDdesk();
        };

        for( var i=0; i<aList_1.length; i++) {
            aList1(aList_1[i],arrList1[i]);//更改图标大小
            aList2(aList_2[i],arrList2[i]);//排列图标
        }
        function aList1(obj,arr1) {
            obj.onclick = function() {
                bigSmall(this,arr1);
            };
        }
        function bigSmall(obj,arr) {
            for(var i=0; i<aList_1.length; i++) {
                aList_1[i].className = '';
            }
            obj.className = 'active';
            that.changeSize(arr);
        }

        function aList2(obj,str) {
            obj.onclick = function() {
                rowCol(this,str);
            };
        }

        function rowCol(obj,str) {
            for(var i=0; i<aList_2.length; i++) {
                aList_2[i].className = '';
            }
            obj.className = 'active';
            that.arrange = str;
            that.arrangeIcon();
        }

        aDocLi[4].onclick = function() {//主题设置
            that.oTheme_settings.style.display = 'block';
        };
    },
    iconContextShow : function(obj,parent) {
        var that = this;
        var aLi = $('li',parent);
        obj.oncontextmenu = function(ev) {
            var ev = ev || event;
            parent.style.left = ev.clientX + 'px';
            parent.style.top = ev.clientY + 'px';
            parent.style.display = 'block';
            if( obj != document ) {
                that.appRigthEvent(obj);
            }else {
                that.docRight();
            }
            ev.cancelBubble = true;
            return false;
        };

        for(var i=0; i<aLi.length; i++) {

            aLi[i].onmouseover = function() {
                var oH2 = this.children[0];
                //var oSpan = oH2.children[0];
                var oUl = next(oH2);
                addClass(this,'show');
                if( oUl ){
                    oUl.style.display = 'block';
                }
            };

            aLi[i].onmouseout = function() {
                var oH2 = this.children[0];
                //var oSpan = oH2.children[0];
                var oUl = next(oH2);
                removeClass(this,'show');
                if( oUl ){
                    oUl.style.display = 'none';
                }
            };
        }
    },
    themeEvent : function() {
        var that = this;
        var oTheme_close = $('#theme_close');
        var aImg = $('img',this.oTheme_settings);
        var theme = new drag( this.oTheme_settings,{
            isPlace : true,
            isLimit : true
        });
        var oSkin = $('#skin');
        oTheme_close.onclick = function() {
            that.oTheme_settings.style.display = 'none';
        };
        for(var i=0; i<aImg.length; i++) {

            aImg[i].onclick = function() {
                var aBgMove = getByClass('bgMove');
                if(aBgMove.length) {
                    for(var i=0; i<aBgMove.length; i++) {
                        aBgMove[i].style.display = 'none';
                    }
                }
                if(this.parentNode == $('#cloud')) {
                    $('#cloud_content').style.display = 'block';
                    fnCloud();
                }
                oSkin.src = this.getAttribute('src');
            };
        }
    },
    dAppEvent : function() {//桌面图标事件
        var that = this;
        var arrDrag = [[],[],[],[],[]];

        for(var i=0; i<this.desk_app.length; i++) {
            for(var j=0; j<this.desk_app[i].length; j++) {
                //if(desk_icon[i][j].isOpen === 'yes' ){
                if(this.desk_app[i][j].getAttribute('isOpen') == 'yes' ){

                    this.iconContextShow(this.desk_app[i][j],this.oMenu);//右键


                    arrDrag[i].push(new drag(this.desk_app[i][j]));//桌面图标拖拽和碰撞

                    arrDrag[i][j].on('start', function() {

                        var aLi = this.obj.parentNode.children;
                        this.obj.style.zIndex = ZIndex++;

                        //记录下当前这一桌面上多有图标的位置
                        for(var i=0; i<aLi.length; i++) {
                            aLi[i].pos = {
                                x : aLi[i].offsetLeft,
                                y : aLi[i].offsetTop
                            };
                        }

                    });

                    arrDrag[i][j].on('exchange', function() {
                        var arr1 = [];
                        var aLi = this.obj.parentNode.children;

                        for(var i=0; i<aLi.length; i++) {
                            if(aLi[i] != this.obj  ) {
                                if(aLi[i].getAttribute('isOpen') === 'yes') {
                                    arr1.push(aLi[i]);
                                }
                            }
                        }

                        var obj = CrashTest.test(this.obj, arr1);
                        var pIndex = this.obj.parentNode.index;
                        var bIndex = this.obj.index;

                        if (obj) {

                            var sIndex = obj.index;

                            doMove(this.obj, {
                                left : obj.pos.x,
                                top : obj.pos.y
                            }, 1000, 'bounceOut');

                            var j = this.obj.pos;

                            this.obj.pos = {
                                x : obj.pos.x,
                                y : obj.pos.y
                            }

                            doMove(obj, {
                                left : j.x,
                                top : j.y
                            }, 1000, 'bounceOut');

                            obj.pos = {
                                x : j.x,
                                y : j.y
                            }

                        } else {
                            doMove(this.obj, {
                                left : this.obj.pos.x,
                                top : this.obj.pos.y
                            }, 1000, 'bounceOut');
                        }
                    });


                    // 弹窗

                    arrDrag[i][j].on('windowP', function(ev) {
                        var PaIndex = this.obj.parentNode.index;
                        var sIndex = this.obj.index;
                        if(ev.X == 0 && ev.Y == 0) {
                            this.obj.onclick = function() {
                                that.openWindow(this,PaIndex,sIndex);
                            };
                        }else {
                            this.obj.onclick = null;
                        }
                    });
                }
            }
        }

    },
    refresh : function() {//刷新
        var that = this;
        var aWindow_pop_wrap = getByClass('window_pop_wrap');
        var aTaskGroup = getByClass('taskGroup');
        var orderIndex = 0;
        var re = /\d/g;
        for(var i=0; i<this.desk_app[desk_icur-1].length; i++) {

            fnMove(this.desk_app[desk_icur-1][i]);
        }
        function fnMove(obj) {
            obj.style.opacity = 0;
        }
        this.oTheme_settings.style.display = 'none';
        this.oDesk.style.zIndex = '';
        this.oDesk_use.style.zIndex = '';
        if(aWindow_pop_wrap.length==0) return;


        for(var i=0; i<aWindow_pop_wrap.length; i++) {
            var arr = aWindow_pop_wrap[i].id.match(re);

            aWindow_pop_wrap[i].parentNode.removeChild(aWindow_pop_wrap[i]);
            if(arr.length == 2) {
                orderIndex = this.desk_app[arr[0]][arr[1]].getAttribute('orderIndex');
                this.desk_app[arr[0]][arr[1]].setAttribute('index',orderIndex);
                this.desk_app[arr[0]][arr[1]].setAttribute('isClick','false');
            }else {
                this.aSide_li[arr[0]].setAttribute('isClick','false');
            }
        }

        for(var i=0; i<aTaskGroup.length; i++) {
            this.oTask.removeChild(aTaskGroup[i]);
        }
        this.oTask.style.display = 'none';
    },
    showRrightDdesk : function() {//显示桌面
        var that = this;
        var aWindow_pop_wrap = getByClass('window_pop_wrap');
        var aTaskGroup = getByClass('taskGroup');
        this.oTheme_settings.style.display = 'none';

        if(aWindow_pop_wrap.length==0) return;

        for(var i=0; i<aWindow_pop_wrap.length; i++) {
            aTaskGroup[i].setAttribute('onOff','true');

            aWindow_pop_wrap[i].setAttribute('iWidth',aWindow_pop_wrap[i].offsetWidth);
            aWindow_pop_wrap[i].setAttribute('iHeight',aWindow_pop_wrap[i].offsetHeight);
            aWindow_pop_wrap[i].setAttribute('iTop',aWindow_pop_wrap[i].offsetTop);
            aWindow_pop_wrap[i].setAttribute('iLeft',aWindow_pop_wrap[i].offsetLeft);
            doMove(aWindow_pop_wrap[i], {
                'top' : view().h + 20,
                'height' : 0,
                'opacity' : 0
            }, 1000,'easeIn', windowDesk(aWindow_pop_wrap[i]));
        }
        function windowDesk(obj){
            obj.style.display = 'none';
            that.oDesk.style.zIndex = '';
            that.oDesk_use.style.zIndex = '';
        }
    },
    changeSize : function(arr) {//查看大图标小图标
        for(var i=0; i<this.desk_app.length; i++) {
            for(var j=0; j<this.desk_app[i].length; j++) {
                this.desk_app[i][j].children[0].style.width = arr[1] + 'px';
                this.desk_app[i][j].children[0].style.height = arr[1] + 'px';
                this.desk_app[i][j].style.width = arr[0] + 'px';
                this.desk_app[i][j].style.height = arr[0] + 'px';
                this.desk_app[i][j].children[0].style.margin = arr[2] + 'px auto';
                this.desk_app[i][j].onmouseover = function() {
                    this.style.background = 'url('+arr[3] +')';
                };
                this.desk_app[i][j].onmouseout = function() {
                    this.style.background = '';
                };
            }
        }
        this.arrangeIcon();
    },
    event : function() {// 事件
        var that = this;

        /* S 窗口事件--窗口发生改变的时候重新设置尺寸和排列图标 */
        bind(window,'resize',function() {
            that.setSize();
            that.arrangeIcon(that.arrange);
        })
        /* E 窗口事件 */

        /* S 滚轮事件 */
        var t = desk_icur;
        /*document.onmousewheel = mouseScroll;
        if( document.addEventListener ){
            document.addEventListener('DOMMouseScroll',mouseScroll,false);
        }*/
        function mouseScroll(ev){
            var ev = ev || event;
            var bDown = false;// false 向上滚动  true 向下滚动
            if( ev.detail ){
                bDown = ev.detail > 0 ? true : false;
            }else{
                bDown = ev.wheelDelta > 0 ? false : true;
            }
            if( bDown ){//向下
                t ++;
                if( t > that.len ) {
                    t = that.len;
                }
            }else{//向上
                t --;
                if( t < 1 ) {
                    t = 1;
                }
            }
            desk_icur = t;
            that.deskMove(t);
            if( ev.preventDefault )
                ev.preventDefault();
            return false;
        }
        /* E 滚轮事件 */

        /* S 图标事件 */
        this.dAppEvent();
        /* E 图标事件 */

        /* S 桌面右键事件 */
        this.iconContextShow(document,this.oContextmenu);
        document.onclick = function() {
            that.oContextmenu.style.display = that.oMenu.style.display = 'none';
        };
        /* E 桌面右键事件 */

        /* S 主题设置 */
        this.oThemeSet.onclick = function() {
            that.oTheme_settings.style.display = 'block';
        };
        this.themeEvent();
        /* E 主题设置 */
    }
};
/* E desk */

/* S 拖拽 */
function drag(obj,options) {

    this.obj = obj;
    this.disX = 0;
    this.disY = 0;
    this.X = 0;
    this.Y = 0;
    this.dl = 0;
    this.dt = false;
    drag.extends( this, E );//继承E身上的属性和方法
    this.events = {//事件初始化
        'start' : [],
        'exchange' : [],
        'windowP' : [],
        'show' : [],
        'hide' : []
    };
    this.opt = {//组件默认参数
        isLimit : false,
        isPlace : false,
        ispull : false,
        isLimit2 : false,
        isdragP : false
    }

    this.opt.setOption( options );//继承配置参数

    this.init();
}

drag.prototype = {
    constructor : drag,
    init : function() {
        this.fnDown();
    },
    fnDown : function() {
        var that = this;
        this.obj.onmousedown = function(ev) {
            var ev = ev || event;
            that.emit('start');
            if(that.opt.isPlace) {
                if(ev.clientY > that.obj.offsetTop + 25 ) return;
            }
            if(that.opt.isdragP) {
                if(ev.clientY > that.obj.offsetTop -25 && ev.clientY < that.obj.offsetTop && ev.clientX > that.obj.offsetLeft + 10 && ev.clientX < that.obj.offsetLeft + that.obj.offsetWidth -10 ) {
                    that.dt = true;
                }else {
                    that.dt = false;
                }
            }
            that.X = ev.clientX;
            that.Y = ev.clientY;
            that.disX = ev.clientX - that.obj.offsetLeft;
            that.disY = ev.clientY - that.obj.offsetTop;


            if(that.opt.ispull) {

                that.iLeft = that.obj.offsetLeft;
                that.iWidth = that.obj.offsetWidth;
                that.iTop = that.obj.offsetTop;
                that.iHeight = that.obj.offsetHeight;
                that.l = that.X < that.iLeft + 5;
                that.r = that.X > that.iLeft +  that.iWidth - 5;
                that.t = that.Y < that.iTop -27;
                that.b = that.Y > that.iTop +  that.iHeight -5;
            }

            if ( that.obj.setCapture ) {
                that.obj.setCapture();
            }
            that.fnMove();
            that.fnUp();
            ev.cancelBubble = true;
            return false;
        };
    },
    fnMove : function (){
        var that = this;
        document.onmousemove = function(ev) {
            var ev = ev || event;
            that.emit('show');
            var L = ev.clientX - that.disX;
            var T = ev.clientY - that.disY;
            if(that.opt.isLimit) {
                if( L < -that.obj.offsetWidth + 100 ) {
                    L = -that.obj.offsetWidth + 100;
                }else if(L > view().w - 50 ) {
                    L = view().w - 50;
                }

                if( T < 0 ) {
                    T = 0;
                }else if(T > view().h - 50 ) {
                    T = view().h - 50;
                }
            }
            if(that.opt.isLimit2) {
                if( L < -that.obj.offsetWidth + 100 ) {
                    L = -that.obj.offsetWidth + 100;
                }else if(L > view().w -50) {
                    L = view().w - 50;
                }

                if( T < 27) {
                    T = 27;
                }else if( T > view().h -50 ) {
                    T = view().h - 50;
                }
            }


            if(that.opt.ispull) {
                if(that.l||that.r||that.t||that.b){
                    var iW = ev.clientX - that.X;
                    var iH = ev.clientY - that.Y;
                    var w = that.l ? that.iWidth - iW : that.iWidth + iW;
                    var h = that.t ? that.iHeight - iH : that.iHeight + iH;
                    var iL = that.iLeft + iW;
                    var iT = that.iTop + iH;

                    if( iL < 0 && that.l) {
                        iL = 0;
                        w = that.iWidth + that.iLeft;
                    }
                    if(iT < 33 && that.t ) {
                        iT = 33;
                        h = that.iTop + that.iHeight - 33;
                    }
                    if( w < 200 ){
                        w = 200;
                        iL = that.iLeft + that.iWidth - 200;
                    }
                    if( h < 150 ){
                        h = 150;
                        iT = that.iTop + that.iHeight - 150;
                    }
                    if( that.l ){
                        that.obj.style.width = w + 'px';
                        that.obj.style.left = iL + 'px';
                    }
                    if( that.r ){
                        that.obj.style.width = w + 'px';
                    }
                    if( that.t ){
                        that.obj.style.height = h + 'px';
                        that.obj.style.top = iT + 'px';
                    }
                    if( that.b ){
                        that.obj.style.height = h + 'px';
                    }
                    return;
                }
            }
            if(that.obj.getAttribute('window_contr')) {
                if(that.obj.getAttribute('window_contr') == 'max') {
                    L = 0;
                    T = 27;
                }
            }
            if(that.opt.isdragP) {
                if(that.dt) {
                    that.obj.style.left = L + 'px';
                    that.obj.style.top = T + 'px';
                }
            }else {
                that.obj.style.left = L + 'px';
                that.obj.style.top = T + 'px';
            }
        };
    },
    fnUp : function() {
        var that = this;
        document.onmouseup = function(ev) {
            var ev = ev || event;
            var X = ev.clientX - that.X;
            var Y = ev.clientY - that.Y;
            document.onmousemove = document.onmouseup = null;
            if ( that.obj.releaseCapture ) {
                that.obj.releaseCapture();
            }
            that.emit('exchange');

            that.emit('windowP', {
                X : X,
                Y : Y
            });
            that.emit('hide');
        }
    }
};
/* E 拖拽 */

/*  S 弹出窗口 */
function PopWindow(obj) {
    this.obj = obj;
    if(this.obj.getAttribute('isDesk') == 'yes') {
        this.PaIndex = obj.parentNode.index;
        this.sIndex = obj.index;
    }
    this.oTask = getByClass('task')[0];
    this.init();
}

PopWindow.prototype = {
    constructor : PopWindow,
    init : function() {
        this.createNewWindow();
        this.createTask();
        this.show();
        this.event();
    },
    createNewWindow : function() {

        var fragment = document.createDocumentFragment();
        this.oWindow_pop_wrap = $('<div>');
        this.oPopup_title = $('<div>');
        var oH2 = $('<h2>');
        var oControl_window = $('<div>');
        var titles = ['最小化','最大化','关闭'];
        var classes = ['window_min','window_max','window_close'];
        this.control = [];
        for(var i=0; i<3; i++) {
            var oA = $('<a>');
            oA.className = classes[i];
            oA.title = titles[i];
            oA.href = 'javascript:;';
            oControl_window.appendChild(oA);
            this.control.push(oA);
        }
        this.oPopup_content_wrap = $('<div>');
        this.oWebbrowserMask = $('<div>');
        this.oIframe = $('<iframe>');

        this.oWindow_pop_wrap.className = 'window_pop_wrap';
        this.oWindow_pop_wrap.setAttribute('iWidth',0);
        this.oWindow_pop_wrap.setAttribute('iHeight',0);
        this.oWindow_pop_wrap.setAttribute('iLeft',0);
        this.oWindow_pop_wrap.setAttribute('iTop',0);
        this.oWindow_pop_wrap.setAttribute('window_contr','mid');
        this.oWindow_pop_wrap.setAttribute('index',++windowIndex);
        if(this.obj.getAttribute('isDesk') == 'yes') {
            this.oWindow_pop_wrap.id = 'window_pop_' + this.PaIndex + '_' + this.sIndex;
        }else {
            this.oWindow_pop_wrap.id = 'window_pop_' + this.obj.index;
        }

        this.oPopup_title.className = 'popup_title';
        oControl_window.className = 'control_window clear';
        this.oPopup_content_wrap.className = 'popup_content_wrap';
        this.oWebbrowserMask.className = 'webbrowserMask';
        if(this.obj.getAttribute('isDesk') == 'yes'){
            oH2.innerHTML = desk_icon[this.PaIndex][this.sIndex].title;
            this.oIframe.src = desk_icon[this.PaIndex][this.sIndex].webSrc;
        }else {
            oH2.innerHTML = left_sideBar_icon[this.obj.index].title;
            this.oIframe.src = left_sideBar_icon[this.obj.index].webSrc;
        }
        this.oPopup_title.appendChild(oH2);
        this.oPopup_title.appendChild(oControl_window);
        this.oPopup_content_wrap.appendChild(this.oWebbrowserMask);
        this.oPopup_content_wrap.appendChild(this.oIframe);
        this.oWindow_pop_wrap.appendChild(this.oPopup_title);
        this.oWindow_pop_wrap.appendChild(this.oPopup_content_wrap);

        var resize = ['window_resize_t','window_resize_r','window_resize_b','window_resize_l','window_resize_rt','window_resize_rb','window_resize_lb','window_resize_lt'];
        for(var i=0; i<resize.length; i++) {
            var oResize = $('<div>');
            oResize.className = resize[i] + ' resize';
            this.oWindow_pop_wrap.appendChild(oResize);
        }

        fragment.appendChild(this.oWindow_pop_wrap);
        this.oUse_group = getByClass('use_group')[desk_icur-1];
        this.oUse_group.appendChild(fragment);

    },
    createTask : function() {
        var that = this;
        this.oTask.style.display = 'block';
        var fragment = document.createDocumentFragment();
        this.oTask_content = $('<div>');
        this.oA = $('<a>');
        var oImg = $('<img>');
        var oSpan = $('<span>');

        this.oA.href = 'javascript:;';
        this.oA.setAttribute('index',windowIndex);

        if(this.obj.getAttribute('isDesk') == 'yes'){
            oImg.src = desk_icon[this.PaIndex][this.sIndex].src;
            oSpan.innerHTML = desk_icon[this.PaIndex][this.sIndex].title;
            this.oTask_content.id = 'taskGroup_' + this.PaIndex + '_' + this.sIndex ;
        }else {
            oImg.src = left_sideBar_icon[this.obj.index].src;
            oSpan.innerHTML = left_sideBar_icon[this.obj.index].title;
            this.oTask_content.id = 'taskGroup_' + this.obj.index ;
        }

        this.oTask_content.setAttribute('isPlace',desk_icur);
        //isPlace记录当前窗口创建那个那个桌面
        this.oTask_content.className = 'taskGroup';
        this.oTask_content.setAttribute('onOff','false');//作用在最小化


        this.oTask_content.style.display = 'none';

        this.oA.appendChild(oImg);
        this.oA.appendChild(oSpan);
        this.oTask_content.appendChild(this.oA);
        fragment.appendChild(this.oTask_content);
        this.oTask.appendChild(fragment);

        this.currentTask();

    },
    show : function() {//让窗口显示出来，层级是最高的，同时任务栏也显示出来
        var that = this;
        this.oWindow_pop_wrap.style.zIndex = ZIndex++;
        windowNum ++; //作用是使弹出的窗口分开显示
        this.oWindow_pop_wrap.style.left = 200 + (windowNum%3)*50 + 'px';
        this.oWindow_pop_wrap.style.top = 50 + (windowNum%3)*50 + 'px';
        doMove(this.oWindow_pop_wrap,{
            opacity : 100
        },1000,'easeBoth',function() {
            that.oTask_content.style.display = 'block';
        });

        /* 以下代码的作用是，让出了当前这个窗口以为的弹出窗口的遮罩层显示出来，当前的隐藏*/
        var aWebbrowserMask = getByClass('webbrowserMask');
        if(aWebbrowserMask.length) {
            for(var i=0; i<aWebbrowserMask.length; i++) {
                aWebbrowserMask[i].style.display = 'block';
            }
        }
        this.oWindow_pop_wrap.children[1].children[0].style.display = 'none';

    },
    currentTask : function(obj) {
        var aA = $('a',this.oTask);
        for(var i=0; i< aA.length; i++) {
            aA[i].className = '';
        }
        var aWebbrowserMask = getByClass('webbrowserMask');
        if(aWebbrowserMask.length) {
            for(var i=0; i<aWebbrowserMask.length; i++) {
                aWebbrowserMask[i].style.display = 'block';
            }
        }

        if(obj) {
            for(var i=0; i<aA.length; i++) {
                if(aA[i].getAttribute('index')==obj.getAttribute('index')) {
                    aA[i].className = 'active';
                    break;
                }
            }
            obj.children[1].children[0].style.display = 'none';
        }else {
            this.oA.className = 'active';
            this.oWindow_pop_wrap.children[1].children[0].style.display = 'none';

        }

    },
    drag : function() {
        var that = this;
        var oDrag = new drag(this.oWindow_pop_wrap,{
            ispull : true,
            isLimit2 : true,
            isdragP : true
        });
        oDrag.on('start', function() {
            this.obj.style.zIndex = ZIndex++;
            var aWebbrowserMask = getByClass('webbrowserMask');
            if(aWebbrowserMask.length) {
                for(var i=0; i<aWebbrowserMask.length; i++) {
                    aWebbrowserMask[i].style.display = 'block';
                }
            }
            this.obj.children[1].children[0].style.display = 'none';
            that.currentTask();
        });
        oDrag.on('show',function() {
            that.oWebbrowserMask.style.display = 'block';
        });
        oDrag.on('hide',function() {
            that.oWebbrowserMask.style.display = 'none';
            this.obj.children[1].children[1].blur();
        });
    },
    tier : function() {
        var aWindow_pop_wrap = getByClass('window_pop_wrap');
        var dArr = [];

        if(aWindow_pop_wrap.length) {
            for(var i=0; i<aWindow_pop_wrap.length; i++) {
                dArr.push(aWindow_pop_wrap[i]);
            }
            dArr.sort(function(a,b) {
                return getStyle(b,'zIndex') - getStyle(a,'zIndex');
            });
            this.currentTask(dArr[0]);
        }else {
            this.oTask.style.display = 'none';
        }
    },
    resize_max : function() {//最大化的时候层级是所有层级最高的
        this.oWindow_pop_wrap.style.display = 'block';
        var oDesk = $('#desk');
        var oDesk_use = $('#desk_use');
        oDesk.style.zIndex = 100001;
        oDesk_use.style.zIndex = 100001;
        doMove(this.oWindow_pop_wrap, {
            'width' : view().w-2,
            'height' : view().h-28,
            'left' : 0,
            'top': 27,
            'opacity' : 100
        }, 1000, 'easeOutStrong');

    },
    resize_mid : function() {
        var that = this;
        doMove(this.oWindow_pop_wrap, {
            'width' : 600,
            'height' : 500,
            'left' : 250,
            'top': 80
        }, 1000, 'easeBoth',function() {
            var oDesk = $('#desk');
            var oDesk_use = $('#desk_use');
            oDesk.style.zIndex = '';
            oDesk_use.style.zIndex = '';
        });
    },
    resize_min : function() {//最小化

        var that = this;
        this.oTask_content.setAttribute('onOff','true');
        if(this.oWindow_pop_wrap.getAttribute('window_contr') == 'mid'){
            this.oWindow_pop_wrap.setAttribute('iWidth',this.oWindow_pop_wrap.offsetWidth);
            this.oWindow_pop_wrap.setAttribute('iHeight',this.oWindow_pop_wrap.offsetHeight);
            this.oWindow_pop_wrap.setAttribute('iTop',this.oWindow_pop_wrap.offsetTop);
            this.oWindow_pop_wrap.setAttribute('iLeft',this.oWindow_pop_wrap.offsetLeft);
        }
        doMove(this.oWindow_pop_wrap, {
            'top' : view().h + 20,
            'height' : 0,
            'opacity' : 0
        }, 500,'easeIn', function() {
            that.oWindow_pop_wrap.style.display = 'none';
            var oDesk = $('#desk');
            var oDesk_use = $('#desk_use');
            oDesk.style.zIndex = '';
            oDesk_use.style.zIndex = '';
        });

    },
    resize_close : function() {
        var that = this;
        var orderIndex = this.obj.getAttribute('orderIndex');
        this.obj.setAttribute('index',orderIndex);
        this.obj.setAttribute('isClick','false');

        doMove(this.oWindow_pop_wrap, {
            'width' : 0,
            'height' : 0,
            'left' : view().w/2,
            'top' : view().h/2,
            'opacity': 0
        }, 1000, 'easeBothStrong', function() {
            var aDesk = getByClass('use_group');
            var place = that.oTask_content.getAttribute('isPlace');
            aDesk[place-1].removeChild(that.oWindow_pop_wrap);
            that.oTask.removeChild(that.oTask_content);
            var oDesk = $('#desk');
            var oDesk_use = $('#desk_use');
            oDesk.style.zIndex = '';
            oDesk_use.style.zIndex = '';
            that.tier();
        });

    },

    event : function() {//窗口事件
        var that = this;
        this.drag();//拖拽

        bind(window,'resize',function() {
            if(that.oWindow_pop_wrap.getAttribute('window_contr') == 'max') {
                that.oWindow_pop_wrap.style.cssText ='opacity:1;filter:alpha(opacity=100);display:block;left:0px;top:28px;width:'+(view().w-2) +'px;height:'+(view().h-28)+'px;';
                var oDesk = $('#desk');
                var oDesk_use = $('#desk_use');
                oDesk.style.zIndex = 100001;
                oDesk_use.style.zIndex = 100001;
            }
        })

        this.control[0].onclick = function() {//最小化
            that.resize_min()
        };
        this.control[1].onclick = function() {//最大化
            if(that.oWindow_pop_wrap.getAttribute('window_contr') == 'mid') {
                that.oWindow_pop_wrap.setAttribute('window_contr','max');
                that.resize_max();
            }else if(that.oWindow_pop_wrap.getAttribute('window_contr') == 'max') {
                that.oWindow_pop_wrap.setAttribute('window_contr','mid');
                that.resize_mid();
            }
        };
        this.control[2].onclick = function() {//关闭
            that.resize_close();
        };

        this.oPopup_title.ondblclick = function() {//双击窗口标题栏
            if(that.oWindow_pop_wrap.getAttribute('window_contr') == 'mid') {
                that.oWindow_pop_wrap.setAttribute('window_contr','max');
                that.resize_max();
            }else if(that.oWindow_pop_wrap.getAttribute('window_contr') == 'max') {
                that.oWindow_pop_wrap.setAttribute('window_contr','mid');
                that.resize_mid();
            }
        };

        this.oTask_content.onclick = function() {//任务栏
            var _this = this;
            var aDesk = getByClass('use_group');
            var place = this.getAttribute('isPlace');
            var oTopnav_tab = getByClass('topnav_tab')[0];
            var aLi = $('li',oTopnav_tab);
            that.currentTask();
            function show() {
                _this.setAttribute('onOff','false');
                that.oWindow_pop_wrap.style.zIndex = ZIndex++;
                that.oWindow_pop_wrap.style.display = 'block';

                if( that.oWindow_pop_wrap.getAttribute('window_contr') == 'mid') {
                    doMove(that.oWindow_pop_wrap, {
                        'width' : that.oWindow_pop_wrap.getAttribute('iWidth'),
                        'height' : that.oWindow_pop_wrap.getAttribute('iHeight'),
                        'left' : that.oWindow_pop_wrap.getAttribute('iLeft'),
                        'top': that.oWindow_pop_wrap.getAttribute('iTop'),
                        'opacity' : 100
                    }, 1000, 'linear');
                } else {
                    that.resize_max();
                }
            }

            if(this.getAttribute('isPlace') == desk_icur) {
                if(this.getAttribute('onOff') == 'true') {//为真时 显示出来
                    show();
                }else {//为假时隐藏
                    that.resize_min();
                }
            }else {
                if(this.getAttribute('onOff') == 'true') {//为真时 显示出来
                    show();
                }
                move();
            }

            function move() {
                for(var i = 0; i<aDesk.length; i++) {
                    aLi[i].className = '';
                    if(i>place-1){
                        doMove(aDesk[i], {
                            left : view().w,
                            opacity : 0
                        }, 1000, 'easeOut')
                    }
                    if(i<place-1){
                        doMove(aDesk[i], {
                            left : -view().w,
                            opacity : 0
                        }, 1000, 'easeOut')
                    }
                }
                doMove(aDesk[place-1], {
                    left : 0,
                    opacity : 100
                }, 1000, 'easeOut')

                aLi[place-1].className = 'active';
                desk_icur = place;
            }
        };
    }
};

/*  E 弹出窗口 */

/* S 桌面背景运动效果 */
/*    云   */

function fnCloud() {
    var oCloud_content = $('#cloud_content');
    var oScene_cloud = getByClass('scene_cloud',oCloud_content)[0];
    fnMove();
    function fnMove() {
        if(oCloud_content.style.display == 'none') return;
        doMove(oScene_cloud, {
            'left' : view().w
        }, 150000, 'linear', function() {
            oScene_cloud.style.left = -580 + 'px';
            fnMove();
        })
    }


}
/* E 桌面背景运动效果 */

