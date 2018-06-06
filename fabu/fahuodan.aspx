<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="fahuodan.aspx.cs" Inherits="yhyy.fahuodan" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>广东绿恒发货通知单</title>
    <link href="1CSS/fahuodan.css" rel="stylesheet" />
    <link href="1JS/bootstrap-3.3.5/bootstrap-3.3.5/dist/css/bootstrap.min.css" rel="stylesheet" />
    <script src="1JS/jquery-1.10.2.min.js"></script>
    <script src="1JS/My97DatePicker/WdatePicker.js"></script>
    <script src="1JS/bootstrap-3.3.5/bootstrap-3.3.5/dist/js/bootstrap.min.js"></script>
    <script src="1JS/layer/layer.js"></script>
    <script src="1JS/fahuodan.js"></script>
    
</head>
<body>
    <form id="form1" runat="server">
        <div id="dakuang">
            <div id="danju">
                <input id="btndj" class="btn btn-primary" type="button" value="单据新增" />
                <ul>
                    <li>
                        <%--<asp:Button ID="danju_new" class="btn btn-primary" runat="server" Text="单据新增" OnClick="danju_new_Click" />--%></li>
                    
                    <li>
                        <%--<asp:Button ID="K3danju_new" class="btn btn-success" runat="server" Text="生成K3单据" OnClick="K3danju_new_Click"/>--%></li>
                    <li>单据编号:<asp:TextBox ID="danju_no" onfocus="this.blur()" BackColor="#ebebe4" runat="server" Width="40px"  ></asp:TextBox></li>
                    <li>K3单据编号:<asp:TextBox ID="K3danju_no" runat="server" onfocus="this.blur()" BackColor="#ebebe4" Width="60px"></asp:TextBox></li>
                <li>单据日期:<asp:TextBox ID="txtDateTime" runat="server" class="wdate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})"></asp:TextBox></li>
                    <li>
                    备注：<asp:TextBox ID="txtbz" runat="server" Width="60px"></asp:TextBox></li>
                </ul>

            </div>
            <div id="ziliao1">
                <ul>
                    <li>客户代码：<asp:TextBox ID="txtkehuFNumber" class="txtbox" runat="server" Width="120px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox></li>
                    <li>客户名称:<asp:TextBox ID="txtkehuName" class="txtbox" runat="server" Width="120px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox></li>
                    <li>客户电话:<asp:TextBox ID="txtkehuPhone" class="txtbox" runat="server" Width="80px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox></li>
                    <li>客户等级:<asp:TextBox ID="txtkehuDengji" class="txtbox" runat="server" Width="40px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox></li>
                    <li>等级代码<asp:TextBox ID="txtdjdm" runat="server" class="txtbox" Width="40px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox></li>
                    <li>业务员:<asp:TextBox ID="txtywy" runat="server" class="txtbox" Width="40px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox></li>
                    <li>制单:<asp:TextBox ID="txtzhidan" Text="李桂梅" class="txtbox" runat="server" Width="60px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox></li>
                </ul>
            </div>
            <div id="kehu">
                <div id="kehuchaxu">
                    <div id="kehuchaxu_xinxi">
                        &nbsp;  &nbsp;  &nbsp;               
                        客户：<%--<asp:TextBox ID="txtkehu" runat="server" Width="60px"  OnTextChanged="txtkehu_TextChanged" AutoPostBack="true" ></asp:TextBox>--%>
                        <%--<asp:TextBox ID="txtkehu" Width="60px"   runat ="server" AutoPostBack="True" AutoCompleteType="Disabled" autocomplet= "off "></asp:TextBox>--%>
                        <input type="text" id="txtkehu"  autocomplete="off"/>
                         <%--<asp:Button ID="btnkehu" runat="server" class="btn btn-primary" Text="查询" OnClick="btnkehu_Click" Width="60px"/>--%>
                        &nbsp;  &nbsp;  &nbsp;                      
                         物料:<asp:TextBox ID="txtwuliao" runat="server" Width="60px" OnTextChanged="txtwuliao_TextChanged" AutoPostBack="true"></asp:TextBox>
                        等级：<asp:TextBox ID="txtwuliaodj" runat="server" Width="60px" OnTextChanged="txtwuliaodj_TextChanged" AutoPostBack="true"></asp:TextBox>
                        规格：<asp:TextBox ID="txtFModel" runat="server" Width="60px" OnTextChanged="txtFModel_TextChanged" AutoPostBack="true"></asp:TextBox>
                        <%--<asp:Button ID="btnwuliao" runat="server" class="btn btn-success" Text="查询" OnClick="btnwuliao_Click" Width="60px"/>--%>

                    </div>
                    <div id="kehu_neirong">

                    </div>
                  <%--  <div id="kehuchaxu_neirong" class="khcx_neirong">
                       <%-- <table id="table_kh_neirong" class="table table-striped table table-bordered">
                            <asp:Repeater ID="Repeater1" runat="server">
                                <HeaderTemplate>
                                    <tr>
                                        <th class="th1">客户ID</th>
                                        <th class="th1">客户名称</th>
                                        <th class="th1">客户电话</th>
                                        <th class="th1">客户等级</th>
                                        <th class="th1">等级代码</th>
                                        <th class="th1">业务员</th>
                                    </tr>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <tr>
                                        <td><%#Eval ("FNumber") %></td>
                                        <td><%#Eval ("fName") %></td>
                                        <td><%#Eval ("FPhone") %></td>
                                        <td><%#Eval ("SuFName") %></td>
                                        <td><%#Eval ("FTypeID") %></td>
                                        <td><%#Eval ("empFName") %></td>
                                    </tr>
                                </ItemTemplate>
                                <FooterTemplate>
                                </FooterTemplate>
                            </asp:Repeater>
                        </table>--%>

                    </div>
                    <div id="wlchaxu_neirong">
                        <table id="wlchaxu" class="table table-hover table table-bordered">
                            <asp:Repeater ID="Repeater2" runat="server">
                                <HeaderTemplate>
                                    <tr>
                                        <th class="th1" >代码</th>
                                        <th class="th1">名称</th>
                                        <th class="th1">等级</th>
                                        <th class="th1">规格</th>
                                        <th class="th1">价格</th>
                                        <th class="th1">产地</th>
                                        <th class="th1">批号</th>
                                        <th class="th1">库存</th>
                                        <th class="th1">仓库</th>
                                        <th class="th1" >价一</th>
                                        <th class="th1">价二</th>
                                        <th class="th1">价三</th>
                                        <th class="th1">价四</th>
                                        <th class="th1">价五</th>
                                    </tr>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <tr>
                                        <td><%#Eval("FNumber") %></td>
                                        <td><%#Eval("FName") %></td>
                                        <td><%#Eval("wldj") %></td>
                                        <td><%#Eval("FModel") %></td>
                                        <td><%#Eval("FPrice","{0:N2}") %></td>
                                        <td><%#Eval("FNote") %></td>
                                        <td><%#Eval("FBatchNo") %></td>
                                        <td><%#Eval("FQty","{0:N2}") %></td>
                                        <td><%#Eval("ckFName") %></td>
                                        <td><%#Eval("djjg1","{0:N2}") %></td>
                                        <td><%#Eval("djjg2","{0:N2}") %></td>
                                        <td><%#Eval("djjg3","{0:N2}") %></td>
                                        <td><%#Eval("djjg4","{0:N2}") %></td>
                                        <td><%#Eval("djjg5","{0:N2}") %></td>
                                    </tr>

                                </ItemTemplate>
                            </asp:Repeater>
                        </table>
                    </div>
                </div>
                <div id="wuliaoxinxi">
                    数量：<asp:TextBox ID="txtAmount_xx" class="txtbox" runat="server" Width="50px" OnTextChanged="txtAmount_xx_TextChanged" AutoPostBack="true"></asp:TextBox>
                    单价：<asp:TextBox ID="txtPrice_xx" class="txtbox" runat="server" Width="50px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox><br />
                    <br />
                    金额：<asp:TextBox ID="txtTotal_xx" class="txtbox" runat="server" Width="80px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox>
                    名称：<asp:TextBox ID="txtFName_xx" class="txtbox" runat="server" Width="80px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox><br />
                    <br />
                    规格：<asp:TextBox ID="txtFModel_xx" class="txtbox" runat="server" Width="80px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox>
                    代码：<asp:TextBox ID="txtFNumber_xx" class="txtbox" runat="server" Width="100px" onfocus="this.blur()" BackColor="#ebebe4"></asp:TextBox><br />
                    <br />
                    &nbsp;&nbsp;&nbsp;
                    <asp:Button ID="btnJis" runat="server" Text="金额计算" class="btn btn-primary" Width="100px" OnClick="btnJis_Click" />&nbsp;&nbsp;&nbsp;
                    <asp:Button ID="btnAdd" runat="server" Text="新增物料" class="btn btn-success" Width="100px" OnClick="btnAdd_Click" />
                </div>
                <div id="wuliaojilu">
                    <table id="wljulu" class="table table-striped table table-bordered">
                        <asp:Repeater ID="Repeater3" runat="server">
                            <HeaderTemplate>
                                <tr>
                                    <th class="th1">名称</th>
                                    <th class="th1">规格</th>
                                    <th class="th1">单价</th>
                                    <th class="th1">数量</th>
                                    <th class="th1">金额</th>
                                     <th class="th1">操作</th>
                                
                                </tr>
                            </HeaderTemplate>
                            <ItemTemplate>
                                <tr>
                                    <td><%#Eval("FName") %></td>
                                    <td><%#Eval("FModel") %></td>
                                    <td><%#Eval("Amount","{0:N2}") %></td>
                                    <td><%#Eval("Price","{0:N2}") %></td>
                                    <td><%#Eval("Total","{0:N2}") %></td>
                                   <td><%--<a href="fahuodan.aspx?id=<%#Eval("Price","{0:N2}") %>">删除</a>--%></td>
                                <td>
                                  
                                </tr>
                            </ItemTemplate>
                        </asp:Repeater>
                    </table>
                </div>

            </div>
        </div>
    </form>
</body>
</html>
