$(document).ready(function () {
    $(document).keydown(function (e) {
        e = e || window.event;
        var keycode = e.which ? e.which : e.keyCode;
        if (keycode == 38) {
            if (jQuery.trim($("#append").html()) == "") {
                return;
            }
            movePrev();
        } else if (keycode == 40) {
            if (jQuery.trim($("#append").html()) == "") {
                return;
            }
            $("#schoolName").blur();
            if ($(".item").hasClass("addbg")) {
                moveNext();
            } else {
                $(".item").removeClass('addbg').eq(0).addClass('addbg');
            }

        } else if (keycode == 13) {
            dojob();
        }
    });
    // 鼠标向上  
    var movePrev = function () {
        $("#schoolName").blur();
        var index = $(".addbg").prevAll().length;
        if (index == 0) {
            $(".item").removeClass('addbg').eq($(".item").length - 1).addClass('addbg');
        } else {
            $(".item").removeClass('addbg').eq(index - 1).addClass('addbg');
        }
    }
    //鼠标向下  
    var moveNext = function () {
        var index = $(".addbg").prevAll().length;
        if (index == $(".item").length - 1) {
            $(".item").removeClass('addbg').eq(0).addClass('addbg');
        } else {
            $(".item").removeClass('addbg').eq(index + 1).addClass('addbg');
        }

    }

    var dojob = function () {
        $("#schoolName").blur();
        var value = $(".addbg").text();
        $("#schoolName").val(value);
        $("#append").hide().html("");
    }
});
//输入学校名称，按下键盘触发事件  
function getContent(obj) {
    var schoolName = jQuery.trim($(obj).val());
    if (schoolName == "") {
        document.getElementById("accDiv").innerHTML = "请输入学校名称！";
        cor1.style.display = "none";
        $("#append").hide().html("");
        return false;
    }
    var html = "";
    var jsonData;
    $.ajax(
            {
                type: "post",
                url: "/Handler3.ashx",
                data: { 'strlike': schoolName },
                dataType: "json",
                success: function (data) {
                    jsonData = data;
                    //alert(jsonData);   
                    for (var i = 0; i < jsonData.length; i++) {
                        if (jsonData.length >= 0) {
                            html = html + "<div class='item' onmouseenter='getFocus(this)' onClick='getCon(this);'>" + jsonData[i] + "</div>"
                        }
                    }
                    if (html != "") {
                        $("#append").removeClass("appendtext");
                        $("#append").show().html(html);
                    } else {
                        cor1.style.display = "none";
                        var append1 = document.getElementById('append');
                        append1.style.display = "block";
                        $("#append").addClass("appendtext");
                        append1.innerHTML = "该学校尚未在教育部注册，请核实后再输入！";
                        schoolName.getFocus();
                    }
                },
                error: function (msg) {
                    window.alert("无");
                }
            });
}
//鼠标移入触发事件  
function getFocus(obj) {
    cor1.style.display = "none";
    $(".item").removeClass("addbg");
    $(obj).addClass("addbg");
}
//鼠标单击触发事件  
function getCon(obj) {
    cor1.style.display = "none";
    var value = $(obj).text();
    $("#schoolName").val(value);
    $("#append").hide().html("");
    CheckSchool();
}