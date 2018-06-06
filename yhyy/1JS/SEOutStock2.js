/// <reference path="_references.js" />
//本页面主要控制物料的资料
$(function () {
    var now = 0;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
    var resLength = 20;  //这个变量是为了存li的长度
    /*-------------------------------------接收客户数据-----------------------------------------------------*/
    function getdata() {
        var now = 0;       //声明一个变量值为-1，是为了在使用上下键的时候记录li的序号
        var resLength = 0;  //这个变量是为了存li的长度    
        var flag = false;
        var timer;
        $("#txtwuliao").bind("keyup", function (event) {
            if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) {    //每按一次上下键都会发送一次请求，所以要先
                return;                                          //清除一边请求
            }
            clearTimeout(timer);
            flag = true;
            timer = setTimeout(function () {
                flag = false;
                var wuliaoName = $.trim($("#txtwuliao").val());
                var dengji = $.trim($("#txtkehuDengji").val());
                if (wuliaoName == "") {
                    $("#wuliao_neirong").hide();
                    $('#main_xjreirong').show();
                    now = 0;
                } else {
                    if ($('#txtwuliao').val() != "") {  //当输入框的值不为空的时候才能发送请求                   
                        $.post("../SEOutStock.ashx", {
                            "wuliaoName": wuliaoName,
                            "dengji": dengji,
                            "content": "wuliao"
                        },
                            function (data) {
                                $("#wuliao_neirong").show().html("");
                                if (data == "") {
                                    $("#wuliao_neirong").html("没有相关数据");
                                } else {
                                    var obj = JSON.parse(data);//解析json字符串为json对象形式
                                    var str = '';//动态拼接table                       
                                    str = '<table id="tb_wl_nr" class="table table-bordered">';
                                    str += '<tr style="background-color:#ebd447;">';
                                    str += '<td width="5%" align="center" >编号</td>';
                                    str += '<td width="10%" align="center">内码</td>';//数据表的主键值
                                    str += '<td width="10%" align="center">名称</td>';
                                    str += '<td width="5%" align="center">等级</td>';
                                    str += '<td width="5%" align="center">规格</td>';
                                    str += '<td width="5%" align="center">批号</td>';
                                    str += '<td width="5%" align="center">价等</td>';
                                    str += '<td width="5%" align="center">产地</td>';
                                    str += '<td width="5%" align="center">单位</td>';
                                    str += '<td width="5%" align="center">数量</td>';
                                    str += '<td width="5%" align="center">单价</td>';
                                    str += '<td width="5%" align="center">仓库</td>';
                                    str += '</tr>';
                                    for (var i = 0; i < obj.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
                                        var j = i + 1;
                                        str += '<tr>';//拼接处规范的表格形式
                                        str += '<td width="5%" align="center">' + j + '</td>';
                                        str += '<td width="10%" align="center">' + obj[i].FNumber + '</td>';//数据表的主键值
                                        str += '<td width="10%" align="center">' + obj[i].FName + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].wldj + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].FModel + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].FBatchNo + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].suFName + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].FNote + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].tmuFName + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].FQty + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].FPrice + '</td>';
                                        str += '<td width="5%" align="center">' + obj[i].ckFName + '</td>';
                                        //trStr += "<td><a href='#'style='text-decoration:none' onclick='Delete(\"" + obj[i].NVFID + "\")'>删除</a><td>";
                                        str += '</tr>';
                                    }
                                    str += '</table>';
                                    $('#main_xjreirong').hide();
                                    now = 0;
                                    $("#wuliao_neirong").html(str);//运用html方法将拼接的table添加到tbody中return;
                                }
                            })
                    }
                }
            }, 1000)
        });
    }
    function wuliaoNew(data) {
        var obj = JSON.parse(data);//解析json字符串为json对象形式
        var str = '';//动态拼接table    
        str = '<table id="tb_wl_nr1" class="table table-bordered" align="center">';
        str += '<tr style="background-color:#f7fbec;">';
        str += '<td widtd="7%" >' + "编号" + '</td>';
        //str += '<td widtd="10%" align="center">单据编号</td>';
        str += '<td widtd="10%" >内码</td>';
        str += '<td widtd="10%">名称</td>';
        str += '<td widtd="8%" >规格</td>';
        str += '<td widtd="7%" >等级</td>';
        str += '<td widtd="7%" >单位</td>';
        str += '<td widtd="10%">批号</td>';
        str += '<td widtd="10%" >产地</td>';
        str += '<td widtd="8%">数量</td>';
        str += '<td widtd="8%" >单价</td>';
        str += '<td widtd="10%" >金额</td>';
        str += '<td widtd="8%" >操作</td>';
        str += '</tr>';
        var shuliang = 0;
        var heji = 0;
        for (var i = 0; i < obj.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
            var j = i + 1;
            shuliang = shuliang + Number(obj[i].Amount);
            heji = heji + Number(obj[i].Total);
            str += '<tr>';//拼接处规范的表格形式
            str += '<td  >' + j + '</td>';
            //str += '<td width="10%" align="center">' + obj[i].FInterID + '</td>';
            str += '<td>' + obj[i].FNumber + '</td>';
            str += '<td>' + obj[i].FName + '</td>';
            str += '<td>' + obj[i].FModel, + '</td>';
            str += '<td>' + obj[i].dengji, + '</td>';
            str += '<td>' + obj[i].danwei, + '</td>';
            str += '<td>' + obj[i].pihao, + '</td>';
            str += '<td>' + obj[i].chandi, + '</td>';
            str += '<td>' + obj[i].Amount + '</td>';
            str += '<td>' + obj[i].Price + '</td>';
            str += '<td>' + obj[i].Total + '</td>';
            str += '<td><a href="javascript:void(0)" onclick="del(\'' + obj[i].FNumber + '\',\'' + obj[i].pihao + '\',\'' + obj[i].FName + '\')" style="text-decoration:none">删除</a></td>"'
            str += '</tr>';
        }
        str += '<tr style="background-color:#f7fbec;">';
        str += '<td>' + "合计" + '</td>';
        str += '<td></td>';
        str += '<td></td>';
        str += '<td></td>';
        str += '<td></td>';
        str += '<td></td>';
        str += '<td></td>';
        str += '<td></td>';
        str += '<td>' + shuliang + '</td>';
        str += '<td></td>';
        str += '<td>' + heji + '</td>';
        str += '<td></td>';
        str += '</tr>';
        str += '</table>';
        $('#wuliao_neirong').hide();
        $("#main_xjneirong").show();
        now = 0;
        $("#main_xjneirong").html(str);//运用html方法将拼接的table添加到tbody中return;
    }

    //点击删除按钮
    del = function (FNumber, pihao, FName) {
        layer.confirm('您确认要删除该批号\'' + pihao + '\'的\'' + FName + '\'吗？', {
            btn: ['删除', '不删除'] //按钮
        }, function () {
            var FInterID = $('#FbillNo_dj').val();
            $.post("../SEOutStock.ashx", {
                "FNumber": FNumber,
                "FName": FName,
                "pihao": pihao,
                "FInterID": FInterID,
                "content": "del"
            }, function (data) {
                $("#main_xjneirong").show().html("");
                if (data == "") {
                    $("#main_xjneirong").html("没有相关数据");
                } else {
                    layer.msg('该物料删除成功!', { icon: 1 });
                    wuliaoNew(data);
                }
            });

        }, function () {
            layer.msg('该物料还是客户需要的!', { icon: 2 });
        });
    }

    function khdata(now) {
        $("#tb_wl_nr tr").eq(now).addClass("current").siblings().removeClass("current");
        var txtFNumber_xx = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(1).text();
        $("#txtFNumber_xx").val(txtFNumber_xx);
        var txtFName_xx = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(2).text();
        $("#txtFName_xx").val(txtFName_xx);
        var txtFModel_xx = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(4).text();
        $("#txtFModel_xx").val(txtFModel_xx);
        var txtPrice_xx = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(10).text();
        $("#txtPrice_xx").val(txtPrice_xx);
        var txtdengji_xx = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(3).text();
        $("#txtdengji_xx").val(txtdengji_xx);
        var txtdanwei_xx = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(8).text();
        $("#txtdanwei_xx").val(txtdanwei_xx);
        var txtpihao_xx = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(5).text();
        $("#txtpihao_xx").val(txtpihao_xx);
        var txtchandi_xx = $("#tb_wl_nr").find("tr").eq(now).find("td").eq(7).text();
        $("#txtchandi_xx").val(txtchandi_xx);

    }
    $("#txtAmount_xx").change(function () {
        var FNumber = $('#txtFNumber_xx').val();
        var FName = $('#txtFName_xx').val();
        var FModel = $('#txtFModel_xx').val();
        var Amount = $('#txtAmount_xx').val();
        var Price = $('#txtPrice_xx').val();
        var dengji = $('#txtdengji_xx').val();
        var danwei = $('#txtdanwei_xx').val();
        var pihao = $('#txtpihao_xx').val();
        var chandi = $('#txtchandi_xx').val();
        var Total = Amount * Price;
        var FInterID = $('#FbillNo_dj').val();
        var txtkehuName = $('#txtkehuName').val();
        $('#txtwuliao').val('');
        $('#txtTotal_xx').val(Total);
        //添加物料
        if (Total != "" && FInterID != "" && txtkehuName != "") {
            $.post("../SEOutStock.ashx", {
                "content": "wuliao_new",
                "FNumber": FNumber,
                "FName": FName,
                "FModel": FModel,
                "Amount": Amount,
                "Price": Price,
                "Total": Total,
                "dengji": dengji,
                "danwei": danwei,
                "pihao": pihao,
                "chandi": chandi,
                "FInterID": FInterID
            }, function (data) {
                $("#main_xjneirong").show().html("");
                if (data == "") {
                    $("#main_xjneirong").html("没有相关数据");
                } else {
                    wuliaoNew(data);
                }
            })
        } else {
            layer.alert("请检查客户资料、金额和单据编号是否正确!");
        }
        $('#txtwuliao').focus();
    });

  

    //在输入框中按上下键的时候对应的每一条数据的样式要有改变，这里使用了keydown这个事件足够了
    $('#txtwuliao').keydown(function (ev) {
        switch (ev.keyCode) {
            case 13:
                $('#txtAmount_xx').val('');
                $('#txtTotal_xx').val('');
                $('#txtAmount_xx').focus();

                //当按下回车的时候，应该开始查询具体的结果了  
                now = 0;
                $("#wuliao_neirong").hide();
                $('#main_xjreirong').show();
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
});