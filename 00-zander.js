/*
 * zander
 * data: 2017.06.05
 */
(function () {
    //将window对象缓存给root
    var root = this;
    // 将zander添加到window对象下
    var zanderRoot = root.zander;
    // 为zander对象创建一个安全的引用
    var zander = function (obj) {
        if (obj instanceof zander) return obj;
        if (!(this instanceof zander)) return new zander(obj);
        this._wrapped = obj;
    };
    // 在浏览器中将zander添加为全局对象,并向后兼容node.js的 'require()API'
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = zander;
        }
        exports.zander = zander;
    } else {
        root.zander = zander;
    }
    /*
     * 简单封装typeof可以识别Object和function
     */
    zander.type = function (obj) {
        // if (obj == null) {
        //     return obj + "";
        // }
        // return typeof obj === "object" || typeof obj === "function" ? {}[toString.call(obj)] || "object" :
        //     typeof obj;
    }
    /*
     * 判断是否是函数类型
     */
    zander.isFunction = function (obj) {
        // return zander.type(obj) === 'function';
    }


    /*
     * 阻止事件冒泡
     */
    zander.stopBubble = function (event){
        window.event ? window.event.cancelBubble = false : event.stopPropagation();
    }

    /*
     * 阻止默认行为
     */
    zander.stopDefault = function (event){
        window.event ? window.event.returnValue = false : event.preventDefault();
    }

    /*
     * 获取事件对象
     */
    zander.getTarget = function (event){
        return window.event ? window.event.srcElement : event.target;
    }

    /*
     * 判断一个变量是否是数组数据类型
     */
    zander.isArray = Array.isArray || function (obj){
        return {}.toString.call(obj) == '[object Array]';
    }
}).call(this)