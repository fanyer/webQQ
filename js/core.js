
/**
 * 核心模块
 */

Object.prototype.setOption = function( options ) {
    if ( options && typeof options == 'object' ) {
        for (var attr in this) {
            if ( this.hasOwnProperty( attr ) && options[attr] != undefined ) {
                this[attr] = options[attr];
            }
        }
    }
}

Object.prototype.extends = function(child, parent) {
    parent.call( child );
    for ( var attr in parent.prototype ) {
        this.prototype[attr] = parent.prototype[attr];
    }
}

function E() {
    this.events = {};
}
E.prototype.on = function(evname, callback) {
    if ( this.events[evname] && this.events[evname] instanceof Array) {
        this.events[evname].push( callback );
    }
}
E.prototype.emit = function(evname, ev) {
    for (var i=0; i<this.events[evname].length; i++) {
        var fn = this.events[evname][i];
        fn.call(this, ev);
    }
}