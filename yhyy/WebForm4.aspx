<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm4.aspx.cs" Inherits="yhyy.WebForm4" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>使用Get方式模拟自动完成的效果</title>
    <style>
        .highLight { background: #ccc; }
    </style>
    <script src="1JS/jquery-1.10.2.min.js"></script>
    <script>
        var selectedItem = null;
        $(function ()
        {
            var dv = $("#dvComplete");
            $("#txtInput").keyup(function (event)
            {
                var code = event.keyCode;
                if (code <= 40 && code != 8) { //event.keyCode在40(包含40)以下的，均为特殊字符.
                    if (code == 38 && selectedItem != null) {
                        //用户按上键
                        setSelectedItem(selectedItem - 1);
                        event.preventDefault();
                        return;
                    }
                    else if (code == 40 && selectedItem != null) {
                        //用户按下键
                        setSelectedItem(selectedItem + 1);
                        event.preventDefault();
                        return;
                    }
                    else if (code == 27 && selectedItem != null) {
                        //用户摁下Esc键.
                        setSelectedItem(null);
                    }                   
                    else { event.preventDefault(); return; }
                }
                dv.show();
                var ff = $(this).val();
                var com = $("#dvComplete");
                $.get("HelpComplete.ashx", { "action": ff }, function (responseText, responseStatu)
                {
                    var date = $.parseJSON(responseText);
                    var complete = $("#dvComplete");
                    complete.empty();
                    if (date.length) {
                        $.each(date, function (index, v)
                        {
                            var v = date[index].CompleteText;
                            $("").text(v).appendTo(com).mouseover(function ()
                        {
                                setSelectedItem(index);
                        }).attr({ "style": "cursor:pointer; width:200px;" }).click(function (eve)
                        {
                            $("#txtInput").val($(this).text());
                            eve.preventDefault();
                            dv.hide();
                        });
                    });
                    setSelectedItem(0);
                } else {
                        setSelectedItem(null);
            }
            });
        }).keypress(function (eve)
        {
            //摁下回车后，将选中的文本传递到文本框中.
            if (eve.keyCode == 13 && selectedItem != null) {
                //用户摁下回车
                var value = dv.find("li").eq(selectedItem).text();
                $("#txtInput").val(value);
                setSelectedItem(null);
                eve.preventDefault();
                dv.hide();
                return;
            }
        });
        });
 
        //自动匹配的推荐项样式.
        function setSelectedItem(item)
        {
            selectedItem = item;
            var dv = $("#dvComplete");
            if (selectedItem == null) {
                dv.hide();
                return;
            }
            selectedItem = isNaN(selectedItem) ? 0 : selectedItem;
            if (selectedItem < 0) {
                selectedItem = 0;
            }
            var maxItemIndex = dv.find("li").length;
            if (selectedItem >= maxItemIndex) {
                selectedItem = maxItemIndex - 1;
            }
            //alert(selectedItem);
            dv.find("li").removeClass("highLight").eq(selectedItem).addClass("highLight");
            dv.show();
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
      <div>
        输入内容自动匹配模式：<br />
        <asp:TextBox  runat="server"></asp:TextBox>
    </div>
    <div>
    </div>
    </form>
</body>
</html>
