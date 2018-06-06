/// <reference path="_references.js" />
$(function () {
    var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
    var resLength = 0;  //这个变量是为了存li的长度
    function getdata() {
        var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
        var resLength = 0;  //这个变量是为了存li的长度
        $("#txtTitle").keyup(function (event) {
            if (event.keyCode == 38 || event.keyCode == 40) {    //每按一次上下键都会发送一次请求，所以要先
                return;                                  //清除一边请求
            }
            var title = $.trim($("#txtTitle").val());

            if (title == "") {
                $("#dtitles").hide();
            } else {
                if ($('#txtTitle').val() != '') {  //当输入框的值不为空的时候才能发送请求
                    //var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
                    //var resLength = 0;  //这个变量是为了存li的长度
                    $.post("../Handler2.ashx", { "title": title ,"pid":"p1"}, function (data) {
                        $("#dtitles").show().html("");
                        if (data == "") {
                            $("#dtitles").html("没有相关数据");
                        } else {
                            $("#dtitles").append(data);
                        }
                    })
                }
            }
        });
    }

    //在输入框中按上下键的时候对应的每一条数据的样式要有改变，这里使用了keydown这个事件足够了
    $('#txtTitle').keydown(function (ev) {
        if (ev.keyCode != 40 && ev.keyCode != 38 && ev.keyCode != 13) {
            getdata();
        }
        if (ev.keyCode == 40) {         //按下键时，now应该变大
            now++;
            $('#dtitles ul li').eq(now).addClass('current').siblings().removeClass('current')
            $('#txtTitle').val($('#dtitles ul li').eq(now).text());
            //resLength表示的是长度，now表示的是序号，所以要用resLength-1
            if (now == resLength - 1) {
                now = -1;    //当选择的数据已经到了最底部的时候，就要从顶部开始重新循环，所以now又回到-1
            }
        };
        if (ev.keyCode == 38) {
            now--;      //按上键的时候，光标往上走，所以now减小
            $('#dtitles ul li').eq(now).addClass('current').siblings().removeClass('current');
            $('#txtTitle').val($('#dtitles ul li').eq(now).text());
            if (now < -1) {
                now = resLength - 1 //当光标走到最上面的时候，再循环到底部重新往上走
            };

        };
        if (ev.keyCode == 13) {   //当按下回车的时候，应该开始查询具体的结果了，所以这里用的是百度查询的接口
            //window.open('https://www.baidu.com/s?wd=' + $('#txtTitle').val())
            //$('#txtTitle').val('');
            //$('#dtitles ul').html('');
            //$('#txtTitle').focus();
            //$('#txtTitle').val($('#dtitles ul li').eq(now).text());
            $('#txt1').focus();
        }
    })

});