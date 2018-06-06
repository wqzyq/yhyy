/// <reference path="_references.js" />
$(function () {
    var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
    var resLength = 0;  //这个变量是为了存li的长度

    /*-------------------------------------接收客户数据-----------------------------------------------------*/
    function getdata() {
        var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
        var resLength = 0;  //这个变量是为了存li的长度
        $("#txtkehu").keyup(function (event) {
            if (event.keyCode == 38 || event.keyCode == 40) {    //每按一次上下键都会发送一次请求，所以要先
                return;                                          //清除一边请求
            }
            var kehuName = $.trim($("#txtkehu").val());
            if (kehuName == "") {
                $("#kehu_neirong").hide();
            } else {
                if ($('#txtkehu').val() != '') {  //当输入框的值不为空的时候才能发送请求                   
                    $.post("../fahuodan.ashx", { "kehuName": kehuName, "pcontent": "kehu" }, function (data) {
                        $("#kehu_neirong").show().html("");
                        if (data == "") {
                            $("#kehu_neirong").html("没有相关数据");
                        } else {
                            //$("#kehu_neirong").append(data);
                            var obj = JSON.parse(data);//解析json字符串为json对象形式
                            var str = '';//动态拼接table                       
                            str = '<table id="tb_kh_nr" class="table table-bordered">';                            
                            for (var i = 0; i < obj.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
                                str += '<tr>';//拼接处规范的表格形式
                                str += '<td width="15%" >' + obj[i].FNumber + '</td>';//数据表的主键值
                                str += '<td width="15%">' + obj[i].FName + '</td>';//对应数组表的字段值
                                str += '<td width="15%">' + obj[i].FPhone + '</td>';
                                str += '<td width="15%">' + obj[i].FTypeID + '</td>';
                                str += '<td width="15%">' + obj[i].suFName + '</td>';
                                str += '<td width="15%">' + obj[i].empFName + '</td>';
                                /*经典之处，要将主键对应的值以json的形式进行传递，才能在后台使用*/
                                //trStr += "<td><a href='#'style='text-decoration:none' onclick='Delete(\"" + obj[i].NVFID + "\")'>删除</a><td>";
                                str += '</tr>';
                            }
                            str += '<table>';

                            $("#kehu_neirong").html(str);//运用html方法将拼接的table添加到tbody中return;

                        }
                    })
                }
            }
        });
    }
    function khdata(now){
        $("#tb_kh_nr tr").eq(now).addClass("current").siblings().removeClass("current");      
        var kehuFNumber = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(0).text();
        $("#txtkehuFNumber").val(kehuFNumber);
        var kehuName = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(1).text();
        $("#txtkehuName").val(kehuName);
        var kehuPhone = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(2).text();
        $("#txtkehuPhone").val(kehuPhone);
        var kehuDengji = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(3).text();
        $("#txtkehuDengji").val(kehuDengji);
        var kehuDjdm = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(4).text();
        $("#txtdjdm").val(kehuDjdm)
        var kehuywy = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(5).text();
    }
    //在输入框中按上下键的时候对应的每一条数据的样式要有改变，这里使用了keydown这个事件足够了
    $('#txtkehu').keydown(function (ev) {
        if (ev.keyCode != 40 && ev.keyCode != 38 && ev.keyCode != 13) {
            getdata();
        }
        if (ev.keyCode == 40) {         //按下键时，now应该变大
            now++;
            khdata(now);

            //resLength表示的是长度，now表示的是序号，所以要用resLength-1
            if (now == resLength - 1) {
                now = -1;    //当选择的数据已经到了最底部的时候，就要从顶部开始重新循环，所以now又回到-1
            }
        };
        if (ev.keyCode == 38) {
            khdata(now);
            if (now < -1) {
                now = resLength - 1 //当光标走到最上面的时候，再循环到底部重新往上走
            };

        };
        if (ev.keyCode == 13) {   //当按下回车的时候，应该开始查询具体的结果了，所以这里用的是百度查询的接口           
            //khdata(now);
        }
    })


    $("#tb_kh_nr td").click(function () {
        var trSeq = $(this).parent().parent().find("tr").index($(this).parent()[0]);//行
        var tdSeq = $(this).parent().find("td").index($(this)[0]);           //列
        var kehuFNumber = $("#tb_kh_nr").find("tr").eq(trSeq).find("td").eq(0).text();
        $("#txtkehuFNumber").val(kehuFNumber);
        var kehuName = $("#tb_kh_nr").find("tr").eq(trSeq).find("td").eq(1).text();
        $("#txtkehuName").val(kehuName);
        var kehuPhone = $("#tb_kh_nr").find("tr").eq(trSeq).find("td").eq(2).text();
        $("#txtkehuPhone").val(kehuPhone);
        var kehuDengji = $("#tb_kh_nr").find("tr").eq(trSeq).find("td").eq(3).text();
        $("#txtkehuDengji").val(kehuDengji);
        var kehuDjdm = $("#tb_kh_nr").find("tr").eq(trSeq).find("td").eq(4).text();
        $("#txtdjdm").val(kehuDjdm)
        var kehuywy = $("#tb_kh_nr").find("tr").eq(trSeq).find("td").eq(5).text();
        $("#txtywy").val(kehuywy)
        $("#txtwuliao").focus();
    });


    $("#wlchaxu td").click(function () {
        var trSeq = $(this).parent().parent().find("tr").index($(this).parent()[0]);//行
        var tdSeq = $(this).parent().find("td").index($(this)[0]);           //列
        var wlFNumber = $("#wlchaxu").find("tr").eq(trSeq).find("td").eq(0).text();
        $("#txtFNumber_xx").val(wlFNumber)
        var wlName = $("#wlchaxu").find("tr").eq(trSeq).find("td").eq(1).text();
        $("#txtFName_xx").val(wlName);
        var wlFModel = $("#wlchaxu").find("tr").eq(trSeq).find("td").eq(3).text();
        $("#txtFModel_xx").val(wlFModel);
        var wlPrice = $("#wlchaxu").find("tr").eq(trSeq).find("td").eq(4).text();
        $("#txtPrice_xx").val(wlPrice);
        var wlempty = "";
        $("#txtAmount_xx").val(wlempty);
        $("#txtTotal_xx").val(wlempty);
        $("#txtAmount_xx").focus();

    });
    //获取单据号码
    $("#btndj").click(function () {
        alert("111");
    });
    //function djhm() {
    //    alert(111);
    //    //$.post("../fahuodan.ashx", {"pcontent": "djhm" }, function (data) {
    //    //    if (data != "") {
    //    //        $("#danju_no").val(data);
    //    //    }
    //    //});
    //}

});








