layui.use(['element', 'layer']);
$(".layui-btn").click(function () {
    location.href = $(this).next().html();
})