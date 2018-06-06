/// <reference path="_references.js" />
///本页面主要功能是新增编号和获取客户资料
$(function () {
    var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
    var resLength = 5;  //这个变量是为了存li的长度
    /*-------------------------------------接收客户数据-----------------------------------------------------*/
    function getdata() {
        if ($('#FbillNo_dj').val() != "") {
            var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
            var resLength = 0;  //这个变量是为了存li的长度
            $("#txtkehu").keyup(function (event) {
                if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {    //每按一次上下键都会发送一次请求，所以要先
                    return;                                          //清除一边请求
                }
                var kehuName = $.trim($("#txtkehu").val());
                if (kehuName == "") {
                    $("#kehu_neirong").hide();
                } else {
                    if ($('#txtkehu').val() != '') {  //当输入框的值不为空的时候才能发送请求                   
                        $.post("../SEOutStock.ashx", { "kehuName": kehuName, "content": "kehu" }, function (data) {
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
                                    str += '<td width="5%" align="center">' + i + 1 + '</td>';
                                    str += '<td width="15%" align="center">' + obj[i].FNumber + '</td>';//数据表的主键值
                                    str += '<td width="15%" align="center">' + obj[i].FName + '</td>';//对应数组表的字段值
                                    str += '<td width="15%" align="center">' + obj[i].FPhone + '</td>';
                                    str += '<td width="15%" align="center">' + obj[i].FTypeID + '</td>';
                                    str += '<td width="15%" align="center">' + obj[i].suFName + '</td>';
                                    str += '<td width="15%" align="center">' + obj[i].empFName + '</td>';
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
        } else {
            layer.alert('请按新增编号!', { icon: 2 });

        }
    }
    function khdata(now) {
        $("#tb_kh_nr tr").eq(now).addClass("current").siblings().removeClass("current");
        var kehuFNumber = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(1).text();
        $("#txtkehuFNumber").val(kehuFNumber);
        var kehuName = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(2).text();
        $("#txtkehuName").val(kehuName);
        var kehuPhone = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(3).text();
        $("#txtkehuPhone").val(kehuPhone);
        var kehudjrm = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(4).text();
        $("#txtkehudjrm").val(kehudjrm);
        var kehuDengji = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(5).text();
        $("#txtkehuDengji").val(kehuDengji);
        var kehuywy = $("#tb_kh_nr").find("tr").eq(now).find("td").eq(6).text();
        $("#txtywy").val(kehuywy)
    }
    //在输入框中按上下键的时候对应的每一条数据的样式要有改变，这里使用了keydown这个事件足够了
    $('#txtkehu').keydown(function (ev) {
        switch (ev.keyCode) {
            case 13:
                //当按下回车的时候，应该开始查询具体的结果了，所以这里用的是百度查询的接口  
                $('#txtwuliao').focus();
                $("#kehu_neirong").hide();
                break;
            case 37://按向左键,now应该变小                   
                if (now > 0) {
                    now--;
                };
                khdata(now);
                break;
            case 38://按向上键,now应该变小                       
                if (now > 0) {
                    now--;
                };
                khdata(now);
                break;
            case 39://按向右键,now应该变大               
                if (now < resLength - 1) {
                    now++;
                }
                khdata(now);
                break;
            case 40://按下键时，now应该变大
                if (now < resLength - 1) {
                    now++;
                }
                khdata(now);
                break;
            default:
                getdata();
                break;
        }
    });
    //保存生成K3单据
    $("#btnk3bc").click(function () {
        var fad_ph = $('#FbillNo_dj').val();
        //单据编号不为空时执行K3单据操作
        if (fad_ph != "") {
            var kehuFNumber = $('#txtkehuFNumber').val();
            var ywy = $('#txtywy').val();
            var zhidan = $('#txtzhidan').val();
            var bz = $('#txtbz').val();
            var kehuDengji = $('#txtkehuDengji').val();
            $.post("../SEOutStock.ashx", {
                "fad_ph": fad_ph,
                "kehuFNumber": kehuFNumber,
                "ywy": ywy,
                "zhidan": zhidan,
                "bz": bz,
                "kehuDengji": kehuDengji,
                "content": "k3bc"
            }, function (data) {
                if (data == 1) {
                    $('#FbillNo_dj').val('');
                    layer.msg('K3单据保存成功!', { icon: 1 });
                } else {
                    layer.msg('K3单据保存失败!', { icon: 2 });
                }
            });
        } else {
            layer.alert("请点击单据新增!");
        }
    });
    //获取新增编号
    $("#btndj").click(function () {
        $('#txtkehu').val('');
        $('#txtkehuFNumber').val('');
        $('#txtkehuName').val('');
        $('#txtkehuPhone').val('');
        $('#txtkehudjrm').val('');
        $('#txtkehuDengji').val('');
        $('#txtywy').val('');
        $('#txtwuliao').val('');
        $('#txtFNumber_xx').val('');
        $('#txtFName_xx').val('');
        $('#txtFModel_xx').val('');
        $('#txtAmount_xx').val('');
        $('#txtPrice_xx').val('');
        $('#txtTotal_xx').val('');
        $('#wuliao_neirong').hide();
        $('#main_xjneirong').hide();
        $('#main_jgneirong').hide();
        $('#txtkehu').focus();
        $.post("../SEOutStock.ashx", { "content": "djhm" }, function (data) {
            if (data != "") {
                $("#FbillNo_dj").val(data);
            }
        });
    });

});