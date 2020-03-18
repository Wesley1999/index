$(function () {

    // 设置target相关
    let openInNewTab = getCookie("new_tab");
    if (openInNewTab === "true") {
        $("#switch").attr("checked", "checked");
        $("a").attr("target", "_blank");
    } else {
        $("#switch").removeAttr("checked", "");
        $("a").removeAttr("target");
    }
    layui.form.render();
    $("#setting").click(function () {
        let display = $("#setting_content").css("display");
        if (display === "none") {
            $("#setting_content").css("display", "inline");
        } else {
            $("#setting_content").css("display", "none");
        }
    });
    //监听指定开关
    let form = layui.form;
    form.on('switch(switchTest)', function(data){
        let checked = this.checked;
        if (checked) {
            setCookie("new_tab", true);
            $("a").attr("target", "_blank");
        } else {
            setCookie("new_tab", false);
            $("a").removeAttr("target");
        }
    });
});

layui.use(['element', 'layer', 'form']);
$(".layui-btn").click(function () {
    location.href = $(this).next().html();
});

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