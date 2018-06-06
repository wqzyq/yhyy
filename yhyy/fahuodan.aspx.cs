using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace yhyy
{
    public partial class fahuodan : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (!string.IsNullOrEmpty(Request.QueryString["id"].ToString()))
            //{
            //    string ID = Request.QueryString["id"].ToString();
            //}
            txtDateTime.Text = DateTime.Now.ToString("yyyy-MM-dd");
            if (!IsPostBack)
            {

            }
        }

        protected void btnkehu_Click(object sender, EventArgs e)
        {
            //string khnr = txtkehu.Text;
            string khnr = "";
            string danju_no1 = danju_no.Text;
            txtwuliao.Text = "";
            if (!string.IsNullOrEmpty(khnr) || !string.IsNullOrEmpty(danju_no1))
            {
                string strSql = string.Format(@"SELECT top 1 orgn.FNumber,orgn.FName,orgn.FPhone,
                orgn.FTypeID,sube.FName as suFName,emp.FName as empFName FROM t_Organization orgn 
                LEFT JOIN dbo.t_SubMessage sube ON orgn.FTypeID=sube.FInterID 
                LEFT JOIN dbo.t_EMP emp on orgn.F_103=emp.Fitemid
                WHERE orgn.FName LIKE '%{0}%'OR orgn.FPhone LIKE '%{0}%'", khnr);
                DataTable dt = SqlHelper1.getTable(strSql, null);
                //Repeater1.DataSource = dt;
                //Repeater1.DataBind();
            }
            else
            {
                Response.Write("<script>alert('请点击新增单据按钮或者填写客户信息！');location='javascript:history.go(-1);'</script>");
            }

        }

        protected void btnwuliao_Click(object sender, EventArgs e)
        {
            //txtkehu.Text = "";
            string wuliao = txtwuliao.Text;
            string djdm = txtdjdm.Text;
            string wldengji = txtwuliaodj.Text;
            string FModel = txtFModel.Text;
            if (!string.IsNullOrEmpty(wuliao))
            {
                //物料代码、商品名称、规格、等级、数量（获取初始表格内容）
                string sql = string.Format(@"SELECT top 20 icitem.FNumber,icitem.FName,icitem.F_103 as wldj,icitem.FModel,iciy.FBatchNo,
                Sube.fname as suFName,icitem.FNote,
                iciy.FQty,icpy.FPrice,stock.FName as ckFName FROM dbo.ICInventory iciy 
                left join dbo.ICPrcPlyEntry icpy  ON iciy.FItemID=icpy.FItemID
                LEFT JOIN dbo.t_ICItem ICitem ON iciy.FItemID=ICitem.FItemID
                LEFT JOIN dbo.t_SubMessage Sube ON icpy.FRelatedID=Sube.FInterID
                LEFT JOIN t_Stock stock ON iciy.FStockID=stock.FItemID
                WHERE iciy.fqty>0    
                AND LEFT(icitem.FNumber,2)='CP'  
                AND icpy.FRelatedID='{3}'    
                AND  icitem.fname LIKE '%{0}%'
                AND  icitem.F_103 LIKE '%{1}%'
                AND icitem.FModel LIKE '%{2}%'", wuliao, wldengji, FModel, djdm);
                DataTable dt = SqlHelper1.getTable(sql, null);
                //重新加工表格（主要是价格等级）
                DataTable dt2 = new DataTable();
                DataColumnCollection cols2 = dt2.Columns;
                cols2.Add("FNumber", typeof(string));
                cols2.Add("FName", typeof(string));
                cols2.Add("wldj", typeof(string));
                cols2.Add("FModel", typeof(string));
                cols2.Add("FBatchNo", typeof(string));
                cols2.Add("suFName", typeof(string));
                cols2.Add("FNote", typeof(string));
                cols2.Add("FQty", typeof(decimal));
                cols2.Add("FPrice", typeof(decimal));
                cols2.Add("ckFName", typeof(string));
                cols2.Add("djjg1", typeof(decimal));
                cols2.Add("djjg2", typeof(decimal));
                cols2.Add("djjg3", typeof(decimal));
                cols2.Add("djjg4", typeof(decimal));
                cols2.Add("djjg5", typeof(decimal));
                if (dt.Rows.Count > 0)
                {
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        DataRow dr = dt2.NewRow();
                        string FNumber = dt.Rows[i]["FNumber"].ToString();
                        dr["FNumber"] = FNumber;
                        dr["FName"] = dt.Rows[i]["FName"].ToString();
                        dr["wldj"] = dt.Rows[i]["wldj"].ToString();
                        dr["FModel"] = dt.Rows[i]["FModel"].ToString();
                        dr["FBatchNo"] = dt.Rows[i]["FBatchNo"].ToString();
                        dr["suFName"] = dt.Rows[i]["suFName"].ToString();
                        dr["FNote"] = dt.Rows[i]["FNote"].ToString();
                        dr["FQty"] = Convert.ToDecimal(dt.Rows[i]["FQty"]);
                        dr["FPrice"] = Convert.ToDecimal(dt.Rows[i]["FPrice"]);
                        dr["ckFName"] = dt.Rows[i]["ckFName"].ToString();
                        //获取5个等级的价格
                        int[] mySigArray = new int[5];
                        mySigArray[0] = 20011;
                        mySigArray[1] = 20012;
                        mySigArray[2] = 83558;
                        mySigArray[3] = 83559;
                        mySigArray[4] = 83560;
                        decimal[] mydjjg = new decimal[5];
                        for (int j = 0; j < 5; j++)
                        {
                            sql = string.Format(@"SELECT ISNULL(FPrice,0) FROM dbo.ICPrcPlyEntry icey
                            LEFT JOIN dbo.t_Item item ON icey.FItemID=item.FItemID
                            WHERE item.FNumber='{0}' AND  FRelatedID={1}", FNumber, mySigArray[j]);
                            DataTable dt3 = SqlHelper1.getTable(sql, null);
                            int icount = dt3.Rows.Count;
                            if (icount == 0)
                            {
                                mydjjg[j] = 0;
                            }
                            else
                            {
                                mydjjg[j] = Convert.ToDecimal(dt3.Rows[0][0]);
                            }
                        }
                        dr["djjg1"] = mydjjg[0];
                        dr["djjg2"] = mydjjg[1];
                        dr["djjg3"] = mydjjg[2];
                        dr["djjg4"] = mydjjg[3];
                        dr["djjg5"] = mydjjg[4];
                        dt2.Rows.Add(dr);
                    }
                }
                Repeater2.DataSource = dt2;
                Repeater2.DataBind();
            }
            else
            {
                Response.Write("请输入物料信息!");
            }
        }

        protected void txtAmount_xx_TextChanged(object sender, EventArgs e)
        {
            try
            {
                decimal DAmount = Convert.ToDecimal(txtAmount_xx.Text);
                if (DAmount > 0)
                {
                    txtTotal_xx.Text = Convert.ToString(Convert.ToDecimal(txtPrice_xx.Text) * DAmount);
                    btnAdd.Focus();
                }
            }
            catch { }

        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            txtwuliao.Text = "";
            txtFModel.Text = "";
            string FNumber = txtFNumber_xx.Text;
            string FName = txtFName_xx.Text;
            string FModel = txtFModel_xx.Text;
            decimal Amount = string.IsNullOrEmpty(txtAmount_xx.Text) ? 0 : Convert.ToDecimal(txtAmount_xx.Text);
            decimal Price = Convert.ToDecimal(txtPrice_xx.Text);
            decimal Total = string.IsNullOrEmpty(txtTotal_xx.Text) ? 0 : Convert.ToDecimal(txtTotal_xx.Text);
            int FInterID = Convert.ToInt32(danju_no.Text);
            if (Total > 0)
            {
                //新增物料
                string sql = string.Format(@"insert into fahuodan_wl(FNumber,FName,FModel,Amount,Price,Total,FInterID) 
                VALUES('{0}','{1}','{2}',{3},{4},{5},{6})", FNumber, FName, FModel, Amount, Price, Total, FInterID);
                SqlHelper1.ExecteNonQueryText(sql, null);
                //Response.Write("<script>alert('物料添加成功！');location='javascript:history.go(-1);'</script>");
                txtwuliao.Focus();
                //查询物料显示在表3
                sql = string.Format(@"select FName,FModel,Amount,Price,Total from fahuodan_wl where FInterID={0} order by Id desc", FInterID);
                DataTable dt = SqlHelper1.getTable(sql, null);
                Repeater3.DataSource = dt;
                Repeater3.DataBind();
            }
            else
            {
                Response.Write("<script>alert('金额为零，请点击金额计算按钮！');location='javascript:history.go(-1);'</script>");

            }
        }

        protected void btnJis_Click(object sender, EventArgs e)
        {
            txtTotal_xx.Text = Convert.ToString(Convert.ToDecimal(txtPrice_xx.Text) * Convert.ToDecimal(txtAmount_xx.Text));
            btnAdd.Focus();
        }

        protected void txtkehu_TextChanged(object sender, EventArgs e)
        {
            //btnkehu.Focus();
        }

        protected void danju_new_Click(object sender, EventArgs e)
        {
           
                DataTable FahdNumMax = SqlHelper1.ExecuteDataSetText(CommandType.StoredProcedure, "proc_get_nummax_fahd", null).Tables[0];
                danju_no.Text = FahdNumMax.Rows[0][0].ToString();
                //客户信息清空
                txtkehuFNumber.Text = "";
                txtkehuName.Text = "";
                txtkehuPhone.Text = "";
                txtkehuDengji.Text = "";
                txtdjdm.Text = "";
                txtywy.Text = "";
                //Repeater1.DataSource = "";
                //Repeater1.DataBind();
                //txtkehu.Focus();
            
        }

        protected void txtwuliao_TextChanged(object sender, EventArgs e)
        {
            txtwuliaodj.Focus();
        }

        protected void txtFModel_TextChanged(object sender, EventArgs e)
        {
            //btnwuliao.Focus();
        }

        protected void txtwuliaodj_TextChanged(object sender, EventArgs e)
        {
            txtFModel.Focus();
        }

        protected void K3danju_new_Click(object sender, EventArgs e)
        {

            //获取表体FInterID
            DataTable FahtzdNumMax = SqlHelper1.ExecuteDataSetText(CommandType.StoredProcedure, "proc_get_nummax_fahtzd", null).Tables[0];
            string FInterID = FahtzdNumMax.Rows[0][0].ToString();
            //获取新增物料的表格
            //int fad_wl = Convert.ToInt32(danju_no.Text);
            int fad_wl = 1;
            string sql = string.Format(@"select * from fahuodan_wl where FInterID={0}", fad_wl);
            DataTable fahuodan = SqlHelper1.getTable(sql, null);
            int fhdcount = fahuodan.Rows.Count;
            if (fhdcount > 0)
            {

                 //查询购货单位
                sql = string.Format(@"select fitemid from t_Organization where fnumber='{0}'", txtkehuFNumber.Text);
                int FCustID = Convert.ToInt32(SqlHelper1.getTable(sql, null).Rows[0][0]);
                string datetimebt = txtDateTime.Text;
                //查询业务员ID
                sql = string.Format(@"select fitemid from t_emp where fname='{0}'", txtywy.Text);
                int FEmpID = Convert.ToInt32(SqlHelper1.getTable(sql, null).Rows[0][0]);
                //查询制单人ID
                sql = string.Format(@"select FUserID from t_User where fname='{0}'",txtzhidan.Text);
                int FbUserID = Convert.ToInt32(SqlHelper1.getTable(sql, null).Rows[0][0]);

                //发货通知单表体生成
                for (int i = 0; i < fhdcount; i++)
                {
                    //获取FItemID和FUnitID
                    string FNumber = fahuodan.Rows[i]["FNumber"].ToString();
                    sql = string.Format(@"select FItemID,FUnitID from t_icitem where FNumber='{0}'", FNumber);
                    DataTable dt = SqlHelper1.getTable(sql, null);
                    int FItemID = Convert.ToInt32(dt.Rows[0][0]);
                    int FUnitID = Convert.ToInt32(dt.Rows[0][1]);
                    decimal FQty = Convert.ToDecimal(fahuodan.Rows[i]["Amount"]);
                    decimal FPrice = Convert.ToDecimal(fahuodan.Rows[i]["Price"]);
                    decimal Famount = Convert.ToDecimal(fahuodan.Rows[i]["Total"]);
                    //SQL插入语句                   
                    sql = string.Format(@"INSERT INTO SEOutStockEntry (FInterID,FEntryID,
                    FBrNo,FMapNumber,FMapName,FItemID,Fauxqty,Fauxprice,Famount,FUnitID,FBatchNo,
                    FAuxPropID,FQty,FSecCoefficient,FSecQty,Fnote,FSourceBillNo,FSourceTranType,
                    FSourceInterId,FSourceEntryID,FContractBillNo,FContractInterID,
                    FContractEntryID,FOrderBillNo,FOrderInterID,FOrderEntryID,FAuxInvoiceQty,
                    FInvoiceQty,FFetchDate,FStockID,FStdAmount,FPlanMode,FMTONo,FClientEntryID,
                    FClientOrderNo) values({0},{1},'0','','',{2},{3},{4},{5},{6},'',0,{3},0,0,'','',0,0,0,'',0,0,'',0,0,{3},{3},
                    '{7}',0,{5},14036,'','','')", FInterID, i + 1, FItemID, FQty, FPrice, Famount, FUnitID, txtDateTime.Text);
                    SqlHelper1.ExecteNonQueryText(sql, null);
                }
                //发货通知单表头生成              
                //获取单据号码(流水号)
                DataTable FdjNO = SqlHelper1.ExecuteDataSetText(CommandType.StoredProcedure, "proc_get_nummax_fhdjhm", null).Tables[0];
                int FBlsh = Convert.ToInt32(FdjNO.Rows[0][0]);              
                string djt = "SEOUT";
                string rjyear = txtDateTime.Text.Substring(2, 2);
                string rjmonth = txtDateTime.Text.Substring(5, 2);
                string lsh;
                if (FBlsh >= 10000000)
                {
                    lsh = FBlsh.ToString();
                }
                else if (FBlsh >= 1000000)
                {
                    lsh = "0";
                }
                else if (FBlsh >= 100000)
                {
                    lsh = "00";
                }
                else 
                {
                    lsh = "000";
                }
               
                string FBillNo = djt + rjyear + rjmonth + lsh + FBlsh;
                /*(FInterID,FBillNo,FStatus,Fdate,FCustID,FCheckDate,FManagerID,FEmpID,
               * FBillerID,FExplanation,FHeadSelfS0238,FHeadSelfS0239,FHeadSelfS0240)*/
                sql = string.Format(@"INSERT INTO SEOutStock(FInterID,FBillNo,FBrNo,
                FTranType,FCancellation,FStatus,Fdate,FCurrencyID,
                FCustID,FSalType,FCheckDate,FManagerID,FDeptID,FEmpID,FBillerID,
                FSettleID,FExchangeRateType,FExchangeRate,FMultiCheckDate1,
                FMultiCheckDate2,FMultiCheckDate3,FMultiCheckDate4,
                FMultiCheckDate5,FMultiCheckDate6,FRelateBrID,FSelTranType,
                FFetchAdd,FExplanation,FAreaPS,FManageType,FPrintCount,
                FHeadSelfS0238,FHeadSelfS0239,FHeadSelfS0240) values({0},'{1}',
                '0',83,0,{2},'{3}',1,{4},101,'{3}',15495,14053,{5},{6},
                0,1,1,Null,Null,Null,Null,Null,Null,0,81,'','{7}',20302,0,0,{5},{5},'{8}')",
                FInterID, FBillNo, 0, datetimebt, FCustID, FEmpID, FbUserID, txtbz.Text, txtkehuDengji.Text);
                SqlHelper1.ExecteNonQueryText(sql, null);
            }
        }


    }
}