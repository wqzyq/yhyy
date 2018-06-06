<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="yhyy.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link href="1CSS/WebForm2.css" rel="stylesheet" />
    <script src="1JS/jquery-1.10.2.min.js".0></script>
    <script src="1JS/WebForm2.js"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="Searchbox">
            <div>
                <input type="text" id="txtTitle"  autocomplete="off" /></div>
            <div id="btnSel"><a href="javascript:;">百度一下</a></div>
            <asp:TextBox ID="txt1" runat="server"></asp:TextBox>
        </div>
        <div id="dtitles"></div>
    </form>
</body>
</html>
