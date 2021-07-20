$(function() {
    // 点击 "去注册账号" 链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击 "去登录" 链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 表单验证
    var form = layui.form
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }

    });
    let layer = layui.layer;
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 阻止默认的提交行为
        e.preventDefault();
        // 发起 AJAX的 POST 请求
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                // 模拟点击 切换到登录页面
                $('#link_login').click();
            })
    });

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速拿到表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }

                layer.msg('登录成功！');
                // 将登录成功得到的 token 字符串 保存到 localStorage中
                localStorage.setItem('token', res.token);

                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})