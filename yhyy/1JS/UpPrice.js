/// <reference path="_references.js" />
$(function () {

    var now = -1;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
    var resLength = 100;  //这个变量是为了存li的长度
    /*-------------------------------------接收客户数据-----------------------------------------------------*/
    function getdata() {
        var flag = false;
        var timer;
        $("#txtwuliao").bind("keyup", function (event) {
            if ($('#FbillNo_dj').val() == "") {
                layer.alert("请点击单据新增按钮!", { icon: 2 });
                return;
            }
            if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {    //每按一次上下键都会发送一次请求，所以要先
                return;                                          //清除一边请求
            }
            clearTimeout(timer);
            flag = true;
            timer = setTimeout(function () {
                flag = false;
                var wuliaoName = $('#txtwuliao').val();
                var wuliaochadeng = $('#txtchadeng').val();
                var dengji = $("input[name='sel1']:checked").val();
                if (wuliaoName != '') {  //当输入框的值不为空的时候才能发送请求 
                    $.post("../UpPrice.ashx", {
                        "wuliaoName": wuliaoName,
                        "wuliaochadeng": wuliaochadeng,
                        "dengji": dengji,
                        "content": "wuliao"
                    }, function (data) {
                        $("#main_xjneirong").show().html("");
                        if (data == "[]") {
                            $("#main_xjneirong").html("没有相关数据");
                        } else {
                            var obj = JSON.parse(data);//解析json字符串为json对象形式
                            var str = '';//动态拼接table                       
                            str = '<table id="tb_wl_nr" class="table table-bordered" align="center" onclick="selrn()">';
                            str += '<tr style="background-color:#ebd447;">';
                            str += '<td widtd="5%" >编号</td>';
                            str += '<td widtd="5%" >选择</td>';
                            //str += '<td widtd="5%" >价等</td>';
                            str += '<td widtd="10%">代码</td>';
                            str += '<td widtd="10%">内码</td>';
                            str += '<td widtd="10%">名称</td>';
                            str += '<td widtd="5%" >等级</td>';
                            str += '<td widtd="5%" >规格</td>';
                            str += '<td widtd="5%" >产地</td>';
                            str += '<td widtd="5%" >单位</td>';
                            str += '<td widtd="5%" >单价</td>';
                            str += '</tr>';
                            for (var i = 0; i < obj.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
                                var j = i + 1;
                                str += '<tr>';//拼接处规范的表格形式
                                str += '<td >' + j + '</td>';
                                str+='<td><input type="checkbox"></td>'
                                //str += '<td >' + obj[i].suFName + '</td>';
                                str += '<td >' + obj[i].FNumber + '</td>';//数据表的主键值                              
                                str += '<td >' + obj[i].fitemid + '</td>';
                                str += '<td >' + obj[i].FName + '</td>';
                                str += '<td >' + obj[i].wldj + '</td>';
                                str += '<td >' + obj[i].FModel + '</td>';
                                str += '<td >' + obj[i].FNote + '</td>';
                                str += '<td >' + obj[i].tmuFName + '</td>';
                                str += '<td >' + obj[i].FPrice + '</td>';
                                str += '</tr>';
                            }
                            str += '</table>';
                            $("#main_xjneirong").html(str);//运用html方法将拼接的table添加到tbody中return;
                        }
                    })
                }
            }, 1000);
        });
    }
    $("#txtPrice").change(function () {
        var djhm = $('#FbillNo_dj').val();
        var Price = $('#txtPrice').val();
        //修改物料价格
        if (djhm != "" && Price != "") {
            $.post("../UpPrice.ashx", {
                "content": "wuliao_price",
                "djhm": djhm,
                "Price": Price
            }, function (data) {
                if (data == 1) {
                    layer.alert("物料价格修改成功!", { icon: 1 });
                } else {
                    layer.alert("物料价格修改失败!", { icon: 2 });
                }
            });
        } else {
            layer.alert("请检查物料代码,价格和等级信息是否正确!");
        }
    });

    $("#tb_wl_nr1111").click(function () {
        var trSeq = $(this).parent().parent().find("tr").index($(this).parent()[0]);//行
        var tdSeq = $(this).parent().find("td").index($(this)[0]);           //列
        $("#tb_wl_nr tr").eq(trSeq).addClass("current").siblings().removeClass("current");
        var wljiedeng = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(1).text();
        $("#txtjiedeng").val(wljiedeng);
        var wlFNumber = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(2).text();
        $("#txtFNumber").val(wlFNumber);
        var wlneima = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(3).text();
        $("#txtneima").val(wlneima);
        var wlName = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(4).text();
        $("#txtFName").val(wlName);
        var wldengji = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(5).text();
        $("#txtdengji").val(wldengji);
        var wlFModel = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(6).text();
        $("#txtFModel").val(wlFModel);

        var wlchandi = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(7).text();
        $("#txtchandi").val(wlchandi);
        var wldanwei = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(8).text();
        $("#txtdanwei").val(wldanwei);
        var wlPrice = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(9).text();
        $("#txtPrice").val(wlPrice);
        var wlPrice0 = $("#tb_wl_nr").find("tr").eq(trSeq).find("td").eq(9).text();
        $("#txtPrice0").val(wlPrice0);
        var djhm = $('#FbillNo_dj').val();
        var nm = $('#txtneima').val();
        var mc = $('#txtFName').val();
        var ggxh = $('#txtFModel').val();
        var dj = $('#txtdengji').val();
        //新增修改记录
        if (nm != "") {
            $.post("../UpPrice.ashx", {
                "content": "jgxz",
                "djhm": djhm,
                "nm": nm,
                "mc": mc,
                "ggxh": ggxh,
                "dj": dj
            }, function (data) {
                if (data > 0) {
                    //成功添加记录将按钮数字累加
                    var icount = parseInt($('#btnshow').val());
                    icount = icount + 1;
                    $('#btnshow').val(icount);

                } else {
                    //重复记录报错提示
                    //  $("#txtwuliao").focus();
                    layer.alert("物料重复或者其它原因导致失败!", { icon: 2 });
                }
            });
        }
    });

    function khdata(now) {
        $("#tb_wl_nr tr").eq(now).addClass("current").siblings().removeClass("current");
        var wljiedeng = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(1).text();
        $("#txtjiedeng").val(wljiedeng);
        var wlFNumber = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(2).text();
        $("#txtFNumber").val(wlFNumber);
        var wlneima = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(3).text();
        $("#txtneima").val(wlneima);
        var wlName = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(4).text();
        $("#txtFName").val(wlName);
        var wldengji = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(5).text();
        $("#txtdengji").val(wldengji);
        var wlFModel = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(6).text();
        $("#txtFModel").val(wlFModel);

        var wlchandi = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(7).text();
        $("#txtchandi").val(wlchandi);
        var wldanwei = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(8).text();
        $("#txtdanwei").val(wldanwei);
        var wlPrice = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(9).text();
        $("#txtPrice").val(wlPrice);
        var wlPrice0 = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(9).text();
        $("#txtPrice0").val(wlPrice0);
        var djhm = $('#FbillNo_dj').val();
        var nm = $('#txtneima').val();
        var mc = $('#txtFName').val();
        var ggxh = $('#txtFModel').val();
        var dj = $('#txtdengji').val();


    }

    //在输入框中按上下键的时候对应的每一条数据的样式要有改变，这里使用了keydown这个事件足够了
    $('#txtwuliao').keydown(function (ev) {
        switch (ev.keyCode) {
            case 13:
                //当按下回车的时候，应该开始查询具体的结果了，所以这里用的是百度查询的接口               
                $("#txtPrice").val('');
                //$('#txtPrice').focus();
                //插入记录到z_jggl表
                var djhm = $('#FbillNo_dj').val();
                var nm = $('#txtneima').val();
                var mc = $('#txtFName').val();
                var ggxh = $('#txtFModel').val();
                var dj = $('#txtdengji').val();
                if (nm != "") {
                    $.post("../UpPrice.ashx", {
                        "content": "jgxz",
                        "djhm": djhm,
                        "nm": nm,
                        "mc": mc,
                        "ggxh": ggxh,
                        "dj": dj
                    }, function (data) {
                        if (data > 0) {
                            //成功添加记录将按钮数字累加
                            var icount = parseInt($('#btnshow').val());
                            icount = icount + 1;
                            $('#btnshow').val(icount);

                        } else {
                            //重复记录报错提示
                            //  $("#txtwuliao").focus();
                            layer.alert("物料重复或者其它原因导致失败!", { icon: 2 });
                        }
                    });
                }
                //now = 0;
                // $("#main_xjneirong").hide();
                break;
            case 37://按向左键,now应该变小                   
                if (now > 1) {
                    now--;
                };
                khdata(now);
                break;
            case 38://按向上键,now应该变小              
                if (now > 1) {
                    now--;
                };
                khdata(now);
                break;
            case 39://按向右键,now应该变大               
                if (now < resLength) {
                    now++;
                }
                khdata(now);
                break;
            case 40://按下键时，now应该变大              
                if (now < resLength) {
                    now++;
                }
                khdata(now);
                break;
            default:
                getdata();
                break;
        }
    });

    //选中按钮
    $('#btnshow').click(function () {
        $('#main_xjneirong').hide();
        var FbillNo = $('#FbillNo_dj').val();
        if (FbillNo != '') {  //当输入框的值不为空的时候才能发送请求 
            $.post("../UpPrice.ashx", {
                "FbillNo": FbillNo,
                "content": "selrn"
            }, function (data) {
                var obj = JSON.parse(data);
                if (data == "[]") {
                    layer.alert("没有选择物料，请检查！");
                } else {
                    wuliaoNew(data);
                }
            });
        }
    });

    function wuliaoNew(data) {
        var obj = JSON.parse(data);//解析json字符串为json对象形式
        var str = '';//动态拼接table                       
        str = '<table id="tb_wl_nr1" class="table table-bordered" align="center" >';
        str += '<tr style="background-color:#ebd447;">';
        str += '<td widtd="5%" >编号</td>';
        str += '<td widtd="5%" >名称</td>';
        str += '<td widtd="10%">规格</td>';
        str += '<td widtd="10%">等级</td>';
        str += '<td widtd="10%">操作</td>';
        str += '</tr>';
        for (var i = 0; i < obj.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
            var j = i + 1;
            str += '<tr>';//拼接处规范的表格形式
            str += '<td >' + j + '</td>';
            str += '<td >' + obj[i].mc + '</td>';
            str += '<td >' + obj[i].ggxh + '</td>';//数据表的主键值                              
            str += '<td >' + obj[i].dj + '</td>';
            //str += '<td><a href="javascript:void(0)" onclick="del(\'' + obj[i].FNumber + '\',\'' + obj[i].pihao + '\',\'' + obj[i].FName + '\')" style="text-decoration:none">删除</a></td>"'
             str += '<td><a href="javascript:void(0)" onclick="del(\'' + obj[i].nm + '\',\'' + obj[i].mc + '\')" style="text-decoration:none">删除</a></td>"'
           //str += '<td><a href="javascript:void(0)" onclick="del(\'' + obj[i].nm + '\'，\'' + obj[i].mc + '\')" style="text-decoration:none">删除</a></td>"'
            str += '</tr>';
        }
        str += '</table>';
        $("#main_selneirong").html(str);//运用html方法将拼接的table添加到tbody中return;

    }

    //点击删除按钮
    del = function (nm,mc) {
        layer.confirm('您确认要删除' + mc + '的物料吗？', {
            btn: ['删除', '不删除'] //按钮
        }, function () {
            var FbillNo = $('#FbillNo_dj').val();
            $.post("../UpPrice.ashx", {
                "nm": nm,
                "FbillNo": FbillNo,
                "content": "del"
            }, function (data) {
                $("#main_selneirong").show().html("");
                if (data == "[]") {
                    $("#main_selneirong").html("没有相关数据");
                } else {
                    layer.msg('该物料删除成功!', { icon: 1 });
                    wuliaoNew(data);
                }
            });

        }, function () {
            layer.msg('该物料暂时保留!', { icon: 2 });
        });
    }

        $("#tb").click(function () {
            alert('111');
        });
        //单据新增按钮
        $("#btn_djxz").click(function () {
            $('#txtwuliao').val('');
            $('#txtchadeng').val('');
            $('#txtFNumber').val('');
            $('#txtneima').val('');
            $('#txtFName').val('');
            $('#txtdengji').val('');
            $('#txtFModel').val('');
            $('#txtjiedeng').val('');
            $('#txtchandi').val('');
            $('#txtdanwei').val('');
            $('#txtPrice').val('');
            $('#txtPrice0').val('');
            $('#btnshow').val('0');
            $.post("../UpPrice.ashx", { "content": "djxz" }, function (data) {
                if (data != "") {
                    $("#FbillNo_dj").val(data);
                }
            });
        });

    
    });