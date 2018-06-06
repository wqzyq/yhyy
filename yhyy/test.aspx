﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test.aspx.cs" Inherits="yhyy.test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>ajax_test</title>
    <script src="1JS/jquery.min.js"></script>
    <style>
        ul, li {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        li {
            line-height: 30px;
            font-size: 16px;
            padding: 5px 10px;
        }

            li.current {
                background: #CCCCCC;
                color: #0000FF;
                cursor: pointer;
            }

            /*li:hover {
                background: #CCCCCC;
                color: #0000FF;
                cursor: pointer;
            }*/
    </style>
    <script>
        $(function () {
            $('#txt').val('');
            var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
            var resLength = 0;  //这个变量是为了存li的长度
            $('#txt').keyup(function (event) {
                if (event.keyCode == 38 || event.keyCode == 40) {    //每按一次上下键都会发送一次请求，所以要先
                    return;                                  //清除一边请求
                };
                console.log(event.which)
                var dat = {
                    wd: $('#txt').val()
                };

                if ($('#txt').val() != '') {  //当输入框的值不为空的时候才能发送请求
                    $.ajax({
                        type: "get",
                        url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                        async: true,
                        data: dat,
                        dataType: 'jsonp',       //已经跨域了
                        jsonp: 'cb',               //百度的回调函数
                        success: function (res) {
                            console.log(res.s);
                            for (var i = 0; i < res.s.length; i++) {
                                resLength = res.s.length;
                                oli_i = $('<li>' + res.s[i] + '</li>');
                                console.log(oli_i)
                                $('#box ul').append(oli_i);
                                //要实现点击某一条词的时候也能让输入框中出现
                                //点击的这条词，所以要在success里面设置
                                $('#box ul li').eq(i).click(function () {
                                    $('#txt').val($(this).text());
                                    $(this).addClass('current').siblings().removeClass('current')
                                })
                            };

                        },
                        error: function (res) {
                            console.log(res)
                        }
                    });
                } else {
                    $('#box ul').html('')    //如果输入框的词都删除了，
                    //把获取的数据结果也清空，因为已经获取到数据了，
                    //即使阻止再次发送请求也不会把已经获得的数据清除，
                    //所以这里直接用了最简单的办法，直接清空数据
                };
            });

            //在输入框中按上下键的时候对应的每一条数据的样式要有改变，
            //这里使用了keydown这个事件足够了
            $('#txt').keydown(function (ev) {
                if (ev.keyCode == 40) {         //按下键时，now应该变大
                    now++;
                    $('#box ul li').eq(now).addClass('current').siblings().removeClass('current')
                    $('#txt').val($('#box ul li').eq(now).text())
                    //resLength表示的是长度，now表示的是序号，所以要用resLength-1
                    if (now == resLength - 1) {
                        now = -1;    //当选择的数据已经到了最底部的时候，
                        //就要从顶部开始重新循环，所以now又回到 - 1
                    }
                };
                if (ev.keyCode == 38) {
                    now--;      //按上键的时候，光标往上走，所以now减小  
                    $('#box ul li').eq(now).addClass('current').siblings().removeClass('current');
                    $('#txt').val($('#box ul li').eq(now).text())
                    if (now < -1) {
                        now = resLength - 1 //当光标走到最上面的时候，再循环到底部重新往上走
                    }

                };
                if (ev.keyCode == 13) {   //当按下回车的时候，应该开始查询具体的结果了，所以这里用的是百度查询的接口
                    //if ($('#txt').val() != '') {
                    $('#box ul li').eq(now).addClass('current').siblings().removeClass('current');
                    $('#txt').val($('#box ul li').eq(now).text())
                    //var a = $('#txt').val();
                    //$('#box ul').html('');
                    //$('#txt').val() = a;
                    //}
                    //window.open('https://www.baidu.com/s?wd=' + $('#txt').val())
                    //$('#txt').val('');
                    //$('#box ul').html('')
                }
            })


            //点击百度一下这个按钮的时候也要实现跳转页面
            $('#btn').click(function () {
                if ($('#txt').val() != '') {
                    $('#txt').val($(this).text());
                    $(this).addClass('current').siblings().removeClass('current')
                    //window.location.href = 'https://www.baidu.com/s?wd=' + $('#txt').val()
                    //$('#txt').val('');
                    $('#box ul').html('')
                };
            })
        });



    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <input type="text" id="txt" />
            <input type="button" id="btn" value="百度一下" />
            <div class="box" id="box">
                <ul>
                </ul>
            </div>
            <div>
                <%--<asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>--%>
            </div>
        </div>
    </form>
</body>
</html>
