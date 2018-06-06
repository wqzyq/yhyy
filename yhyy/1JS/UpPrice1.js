/// <reference path="_references.js" />
$(function () {
    //查询要修改的物料
    $("#txtwuliao").bind("keyup", function () {
        var timer;
        clearTimeout(timer);
        flag = true;
        if (flag) {
            timer = setTimeout(function () {
                flag = false;
                var wuliaoName = $('#txtwuliao').val();
                var wuliaochadeng = $('#txtchadeng').val();
                if (wuliaoName != '') {  //当输入框的值不为空的时候才能发送请求 
                    $.post("../UpPrice1.ashx", {
                        "wuliaoName": wuliaoName,
                        "wuliaochadeng": wuliaochadeng,
                        "content": "wuliao"
                    }, function (data) {
                        $("#main_cxnr").show().html("");
                        if (data == "[]") {
                            $("#main_cxnr").html("没有相关数据");
                        } else {
                            var obj = JSON.parse(data);//解析json字符串为json对象形式
                            var str = '';//动态拼接table    
                            str = '<table id="tb_wl_nr" class="table table-bordered" align="center">';
                            str += '<tr style="background-color:#ebd447;">';
                            str += '<td widtd="3%" >编号</td>';
                            str += '<td widtd="3%" >选择</td>';
                            str += '<td widtd="8%">代码</td>';                         
                            str += '<td widtd="10%">名称</td>';
                            str += '<td widtd="5%" >等级</td>';
                            str += '<td widtd="5%" >规格</td>';
                            str += '<td widtd="5%" >单价</td>';                         
                            str += '<td widtd="5%" >单位</td>';
                            str += '<td widtd="5%" >产地</td>';                          
                            str += '<td widtd="8%">内码</td>';
                            str += '</tr>';
                            for (var i = 0; i < obj.length; i++) {//循环遍历出json对象中的每一个数据并显示在对应的td中
                                var j = i + 1;
                                str += '<tr>';//拼接处规范的表格形式
                                str += '<td >' + j + '</td>';//编号
                                str += '<td><input type="checkbox" class="cb"></td>'//选择
                                str += '<td >' + obj[i].FNumber + '</td>';//代码 
                                str += '<td >' + obj[i].FName + '</td>';//名称
                                str += '<td >' + obj[i].wldj + '</td>';//等级
                                str += '<td >' + obj[i].FModel + '</td>';//规格
                                str += '<td >' + obj[i].FPrice + '</td>';//单价                               
                                str += '<td >' + obj[i].tmuFName + '</td>';//单位
                                str += '<td >' + obj[i].FNote + '</td>';//产地                                
                                str += '<td >' + obj[i].fitemid + '</td>';//内码
                                str += '</tr>';
                            }
                            str += '</table>';
                            $("#main_cxnr").html(str);//运用html方法将拼接的table添加到tbody中return;
                        }
                    });
                }
            }, 1000);
        }
    });


    //价格修改    
    $('#btnxg').click(function () {
        //循环读取表格内容
        var arrNM = new Array();
        var arrJG = new Array();
        $("#tb_wl_nr").find("tr").each(function () {
            var tdArr = $(this).children();
            var sel = tdArr.eq(1).find("input[type='checkbox']").is(':checked');
            var fitemid = tdArr.eq(9).text();
            if (sel) {
                arrNM.push(fitemid);
            }
        });
        //要修改的价格
        arrJG[0] = $('#txtjia1').val();
        arrJG[1] = $('#txtjia2').val();
        arrJG[2] = $('#txtjia3').val();
        arrJG[3] = $('#txtjia4').val();
        arrJG[4] = $('#txtjia5').val();
        var sJG = arrJG.join(',');
        if (arrNM.length > 0) {
            var sNM = arrNM.join(',');
            $.post("../UpPrice1.ashx", {
                "sNM": sNM,
                "sJG": sJG,
                "content": "xgnm"
            }, function (data) {
                if (data == 1) {
                    layer.alert("物料价格修改成功!", { icon: 1 });
                } else {
                    layer.alert("物料价格修改失败!", { icon: 2 });
                }
            });
        } else {
            layer.alert("您没有选中要修改的物料，请检查！", { icon: 2 });
        }
    });

    //清空内容
    $('#btnqk').click(function () {
        $('#txtjia1').val('');
        $('#txtjia2').val('');
        $('#txtjia3').val('');
        $('#txtjia4').val('');
        $('#txtjia5').val('');
        $('#txtwuliao').val('');
        $('#txtchadeng').val('');
        $('#txtwuliao').focus();
        $('#main_cxnr').hide();
    });
    
});