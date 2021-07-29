$(function() {
    let layer = layui.layer;
    // 调用获取用户信息
    getUserInfo();
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 请求头配置对象
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        // // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function(res) {
        //     console.log(res);
        //     // 在 complete中 可以使用 res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空 token
        //         localStorage.removeItem('token');
        //         // 强制跳转到 登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
};
// 渲染用户头像
function renderAvatar(user) {
    // 获取用户名称
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
};
// 退出功能
$('#btnLoginout').on('click', function() {
    // 询问用户是否退出
    layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 清空本地存储中的token
        localStorage.removeItem('token');
        // 跳转到登录页
        location.href = './login.html';
        // 关闭询问框
        layer.close(index);
    });
});