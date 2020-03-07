layui.use(['element', 'layer']);
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