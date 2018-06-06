<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="yhyy.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="1JS/jquery-1.10.2.min.js"></script>
    <script>
        $(document).ready(function () {
            //必须要采用Live方法，因为代码是后来通过别的方法添加入页面的，不能触发预先写好的方法  

            //li点击时，将文本框内容改为li的内容  
            $("li").live("click", function () {
                $("#txtCode").val($(this).text());
            })
            //hover效果，因为live是不能绑定hover方法的，变相实现  
            $("li").live({
                mouseenter: function () {
                    $(this).css("background-color", "#39C0FA");//鼠标移入事件  
                },
                mouseleave: function () {
                    $(this).css("background-color", "white");//鼠标移出事件  
                }
            });
        });
        //Ajax请求  
        function SelectTip() {
            var temp = $("#txtCode").val();
            $.ajax({
                type: "post",//请求方式：post，get  
                url: "AJAX/Handler1.ashx",//请求的页面  
                data: { code: temp, methodType: "code" },//请求参数  
                //请求成功执行的方法，function内参数名随意，不影响  
                success: function (result) {
                    //将Div内原有值清空，将新值赋予DIV内  
                    $(divShowText).html("");
                    $(divShowText).html(result);
                },
                //请求执行异常执行的方法  
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $(divShowText).html("");
                    $(divShowText).html("<lable color='red'>异常，请关闭页面重试，或联系管理员</lable>");
                }
            });
        }

    </script>
    <style>
        li {
            text-decoration: none;
            display: block;
            border: 1px solid #000;
            border-bottom: 0.5px solid #000;
            list-style: none;
            cursor: pointer;
            padding: 0px;
            margin: 0px;
        }

        ul {
            border-bottom: 1px solid #000;
            display: block;
            list-style: none;
            margin: 0px;
            padding: 0px;
        }

        #txtCode {
            padding: 0px;
            margin: 0px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <asp:TextBox ID="txtCode" Width="148px" onkeyup="SelectTip()" runat="server"></asp:TextBox><br />

        <div id="divShowText" style="width: 150px;">
        </div>
        <div>
            <asp:GridView ID="GridView1" runat="server">
               
            </asp:GridView>
        </div>
    </form>
</body>
</html>
