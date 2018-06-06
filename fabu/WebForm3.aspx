<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm3.aspx.cs" Inherits="yhyy.WebForm3" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>jQuery百度搜索提示框效果代码</title>
    <link href="1CSS/jquery.bigautocomplete.css" rel="stylesheet" />
    <script src="1JS/jquery-1.7.2.min.js"></script>
    <script src="1JS/jquery.bigautocomplete.js"></script>
    <script>
    $(function(){

	$("#tt").bigAutocomplete({
		width:543,
		data:[{title:"中国好声音",result:{ff:"qq"}},
		{title:"中国移动网上营业厅"},
		{title:"中国银行"},
		{title:"中国移动"},
		{title:"中国好声音第三期"},
		{title:"中国好声音 第一期"},
		{title:"中国电信网上营业厅"},
		{title:"中国工商银行"},
		{title:"中国好声音第二期"},
		{title:"中国地图"}],
		callback:function(data){
			alert(data.title);	
		}
	});

})
</script>
    <style>
        * {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        a, img {
            border: 0;
        }

        .demo {
            width: 720px;
            margin: 30px auto;
        }

            .demo h2 {
                font-size: 16px;
                color: #3366cc;
                height: 30px;
            }

            .demo li {
                float: left;
            }

        .text, .button {
            background: url(img/spis_031ddf34.png) no-repeat;
        }

        .text {
            width: 529px;
            height: 22px;
            padding: 4px 7px;
            padding: 6px 7px 2px\9;
            font: 16px arial;
            border: 1px solid #cdcdcd;
            border-color: #9a9a9a #cdcdcd #cdcdcd #9a9a9a;
            vertical-align: top;
            outline: none;
            margin: 0 5px 0 0;
        }

        .button {
            width: 95px;
            height: 32px;
            padding: 0;
            padding-top: 2px\9;
            border: 0;
            background-position: 0 -35px;
            background-color: #ddd;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div class="demo">
        <h2>jQuery百度搜索提示框效果代码</h2>
        <form action="#" method="post" name="searchform" id="searchform" class="searchinfo" runat="server">
            <ul>
                <li>
                    <input type="text" id="tt" value="" class="text" /></li>
                <li>
                    <input type="submit" value="搜索" class="button" /></li>
            </ul>
        </form>
    </div>
</body>
</html>
