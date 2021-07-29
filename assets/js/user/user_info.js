let form = layui.form;
let layer = layui.layer;
$(function() {

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个长度之间！'
            }
        }
    });
    // 调用 获取用户基本信息
    initUserInfo();
});
// 初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！');
            }
            form.val('formUserInfo', res.data);
        }
    })
};
// 重置表单
$('#btnReset').on('click', function(e) {
    // 阻止重置按钮的默认行为
    e.preventDefault();
    // 调用 获取用户基本信息
    initUserInfo();
});
// 监听表单的提交事件
$('.layui-form').on('submit', function(e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    // 发起更新数据请求
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('修改用户信息失败！');
            }
            layer.msg('修改用户信息成功！');
            // 调用 父页面中的方法，重新渲染用户的头像和用户信息
            window.parent.getUserInfo();
        }
    })
})