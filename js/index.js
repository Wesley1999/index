layui.use(['element', 'layer']);

function chromeLinkClick(target) {
    let url = $(target).attr("href");
    if (copyText(url)) {
        toast("已复制URL，请手动打开");
    }
}

function toast(msg, time=2000, parse=false) {
    if (!parse) {
        msg = msg.replaceAll("&", "&amp;");
        msg = msg.replaceAll(">", "&gt;");
        msg = msg.replaceAll("<", "&lt;")
    }
    msg = msg.replaceAll("\n", "<br>");
    layer.msg(msg, {
        time: time
        // btn: ['明白了', '知道了', '哦']
    });
}

function copyText(text) {
    let flag = false;
    let textarea = document.createElement("input");
    let currentFocus = document.activeElement;
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.focus();
    if (textarea.setSelectionRange)
        textarea.setSelectionRange(0, textarea.value.length);
    else
        textarea.select();
    try {
        flag = document.execCommand("copy");
    } catch (eo) {}
    document.body.removeChild(textarea);
    currentFocus.focus();
    return flag;
}

String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
};

function setCookie(key, value, maxAge=365*24*60*60*1000) {
    var d = new Date();
    d.setTime(d.getTime()+(maxAge));
    var expires = "expires="+d.toGMTString();
    document.cookie = key + "=" + value + "; " + expires;
}

function getCookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}