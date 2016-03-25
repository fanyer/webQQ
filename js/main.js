// JavaScript Document
window.onload = function() {
	var deskUse = new Desk();


    /* S 桌面背景 */
    var oSkin_peeder = $('#skin_peeder');
    var oSkin_peeder_img = $('img',oSkin_peeder)[0];
    var oCloud_content = $('#cloud_content');
    skin_peeder();
    fnCloud();
    bind(window,'resize',skin_peeder);

    function skin_peeder() {
        var iH = Math.max( view().h, scrollH(), offsetH());

        oSkin_peeder.style.height = iH + 'px';
        oSkin_peeder_img.style.height = iH + 'px';
        oCloud_content.style.height = iH + 'px';
    }

    function offsetH() {
        return document.body.offsetHeight;
    }

    function scrollH() {
        return document.body.scrollHeight;
    }
    /* E 桌面背景 */

    /* S 时钟 日期*/
    clock();
    function clock() {
        var oClock = $('#clock');
        var oUl = $('ul',oClock)[0];
        var oHour = $('#hour');
        var oMin = $('#min');
        var oSec = $('#sec');
        var oNowDate = $('#date');
        var clock = new drag(oClock,{isLimit : true,});
        var str = '';
        for(var i=0; i<12; i++) {
            str += '<li style="-webkit-transform:rotate(' +(30*i)+ 'deg);-moz-transform:rotate(' +(30*i)+ 'deg);-ms-transform:rotate(' +(30*i)+ 'deg);-o-transform:rotate(' +(30*i)+ 'deg);"></li>';
        }
        oUl.innerHTML = str;

        toTime();
        setInterval(toTime,1000);
        function toTime()
        {
            var oDate=new Date();
            var iYear = oDate.getFullYear();
            var iMonth = oDate.getMonth();
            var iDate = oDate.getDate()+1;
            var iDay = oDate.getDay();
            var iSec=oDate.getSeconds();
            var iMin=oDate.getMinutes()+iSec/60;
            var iHour=oDate.getHours()+iMin/60;
            var arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            oNowDate.innerHTML = iYear + '年' + iMonth + '月' + iDate + '日' + '  ' + arr[iDay];
            oSec.style.WebkitTransform="rotate("+iSec*6+"deg)";
            oSec.style.MozTransform="rotate("+iSec*6+"deg)";
            oSec.style.msTransform="rotate("+iSec*6+"deg)";
            oSec.style.oTransform="rotate("+iSec*6+"deg)";
            oMin.style.WebkitTransform="rotate("+iMin*6+"deg)";
            oMin.style.MozTransform="rotate("+iMin*6+"deg)";
            oMin.style.msTransform="rotate("+iMin*6+"deg)";
            oMin.style.oTransform="rotate("+iMin*6+"deg)";
            oHour.style.WebkitTransform="rotate("+iHour*30+"deg)";
            oHour.style.MozTransform="rotate("+iHour*30+"deg)";
            oHour.style.msTransform="rotate("+iHour*30+"deg)";
            oHour.style.oTransform="rotate("+iHour*30+"deg)";
        };

    }



    /* E 时钟与日期 */
}