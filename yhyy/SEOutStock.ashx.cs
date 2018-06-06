using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace yhyy
{
    /// <summary>
    /// SEOutStock 的摘要说明
    /// </summary>
    public class SEOutStock : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                string sw = context.Request.Form["content"];
                string jsonString = string.Empty;
                switch (sw)
                {
                    case "djhm"://生成单据号
                        string djhm = getdjhm();
                        context.Response.Write(djhm);
                        break;
                    case "kehu"://查找客户
                        string kehuName = context.Request.Form["kehuName"];
                        DataTable dt_kehu = getKeHu(kehuName);
                        jsonString = JsonConvert.SerializeObject(dt_kehu);
                        context.Response.Write(jsonString);
                        break;
                    case "wuliao"://查找物料
                        string wuliaoName = context.Request.Form["wuliaoName"];
                        string dengji = context.Request.Form["dengji"];
                        DataTable dt_wuliao = getWuLiao(wuliaoName, dengji);
                        jsonString = JsonConvert.SerializeObject(dt_wuliao);
                        context.Response.Write(jsonString);
                        break;
                    case "wuliao_new"://生成物料表
                        string FNumber = context.Request.Form["FNumber"];
                        string FName = context.Request.Form["FName"];
                        string FModel = context.Request.Form["FModel"];
                        decimal Amount = Convert.ToDecimal(context.Request.Form["Amount"]);
                        decimal Price = Convert.ToDecimal(context.Request.Form["Price"]);
                        decimal Total = Convert.ToDecimal(context.Request.Form["Total"]);
                        string sdengji = context.Request.Form["dengji"];
                        string sdanwei = context.Request.Form["danwei"];
                        string spihao = context.Request.Form["pihao"];
                        string schandi = context.Request.Form["chandi"];
                        int FInterID = Convert.ToInt32(context.Request.Form["FInterID"]);
                        DataTable dt_wlnew = getWuLiao_zs(FNumber, FName, FModel, Amount, Price, Total, FInterID, sdengji, sdanwei, spihao, schandi);
                        jsonString = JsonConvert.SerializeObject(dt_wlnew);
                        context.Response.Write(jsonString);
                        break;
                    case "del":
                        string FNumber_del = context.Request.Form["FNumber"];
                        string FName_del = context.Request.Form["FName"];
                        string pihao_del = context.Request.Form["pihao"];
                        int FInterID_del = Convert.ToInt32(context.Request.Form["FInterID"]);
                        DataTable dt_wldel = getWuLiao_DEL(FNumber_del, pihao_del, FInterID_del);
                        jsonString = JsonConvert.SerializeObject(dt_wldel);
                        context.Response.Write(jsonString);
                        break;
                    case "k3bc":
                        string fad_ph = context.Request.Form["fad_ph"];
                        string kehuFNumber = context.Request.Form["kehuFNumber"];
                        string ywy = context.Request.Form["ywy"];
                        string zhidan = context.Request.Form["zhidan"];
                        string bz = context.Request.Form["bz"];
                        string kehuDengji = context.Request.Form["kehuDengji"];
                        bool k3b = k3bc(fad_ph, kehuFNumber, ywy, zhidan, bz, kehuDengji);
                        int zt = 0;
                        if (k3b)
                        {
                            zt = 1;
                            context.Response.Write(zt);
                        }
                        else
                        {
                            context.Response.Write(zt);
                        }
                        break;

                    default:
                        break;
                }
            }
            catch
            {
                context.Response.Write("<Script>layer.alert('系统异常,请检查填写资料！')</Script>");
            }

        }
        private static DataTable getWuLiao_zs(string FNumber, string FName, string FModel, decimal Amount, decimal Price, decimal Total, int FInterID, string dengji, string danwei, string pihao, string chandi)
        {
            //新增物料
            string sql = string.Format(@"insert into fahuodan_wl(FNumber,FName,FModel,Amount,Price,Total,FInterID,dengji,danwei,pihao,chandi) 
                VALUES('{0}','{1}','{2}',{3},{4},{5},{6},'{7}','{8}','{9}','{10}')", FNumber, FName, FModel, Amount, Price, Total, FInterID, dengji, danwei, pihao, chandi);
            SqlHelper1.ExecteNonQueryText(sql, null);
            //查询物料显示在表3
            sql = string.Format(@"select FNumber,FInterID,FName,FModel,Amount,Price,Total,dengji,danwei,pihao,chandi from fahuodan_wl where FInterID={0} order by Id desc", FInterID);
            DataTable dt = SqlHelper1.getTable(sql, null);
            return dt;
        }

        private static DataTable getWuLiao_DEL(string FNumber, string pihao, int FInterID)
        {
            //新增物料
            string sql = string.Format(@"delete fahuodan_wl where FNumber='{0}' and pihao='{1}' and FInterID={2}", FNumber, pihao, FInterID);
            SqlHelper1.ExecteNonQueryText(sql, null);
            //查询物料显示在表3
            sql = string.Format(@"select FNumber,FInterID,FName,FModel,Amount,Price,Total,dengji,danwei,pihao,chandi from fahuodan_wl where FInterID={0} order by Id desc", FInterID);
            DataTable dt = SqlHelper1.getTable(sql, null);
            return dt;
        }
        private static DataTable getWuLiao(string wuliaoName, string dengji)
        {

            //物料代码、商品名称、规格、等级、数量（获取初始表格内容）
            string sql = string.Format(@"SELECT top 20 icitem.FNumber,icitem.FName,icitem.F_103 as wldj,icitem.FModel,iciy.FBatchNo,
                Sube.fname as suFName,icitem.FNote,tmu.FName as tmuFName,iciy.FQty,icpy.FPrice,stock.FName as ckFName FROM dbo.ICInventory iciy 
                left join dbo.ICPrcPlyEntry icpy  ON iciy.FItemID=icpy.FItemID
                LEFT JOIN dbo.t_ICItem ICitem ON iciy.FItemID=ICitem.FItemID
                LEFT JOIN dbo.t_MeasureUnit tmu ON ICitem.FSaleUnitID=tmu.FMeasureUnitID                                                                  
                LEFT JOIN dbo.t_SubMessage Sube ON icpy.FRelatedID=Sube.FInterID
                LEFT JOIN t_Stock stock ON iciy.FStockID=stock.FItemID
                WHERE iciy.fqty>0    
                AND LEFT(icitem.FNumber,2)='CP'       
                AND  Sube.fname='{1}'      
                AND  icitem.fname LIKE '%{0}%'", wuliaoName, dengji);
            DataTable dt = SqlHelper1.getTable(sql, null);         
            return dt;
        }
        private static DataTable getKeHu(string kehuName)
        {
            string strSql = string.Format(@"SELECT top 5 orgn.FNumber,orgn.FName,orgn.FPhone,
            orgn.FTypeID,sube.FName as suFName,emp.FName as empFName FROM t_Organization orgn 
            LEFT JOIN dbo.t_SubMessage sube ON orgn.FTypeID=sube.FInterID 
            LEFT JOIN dbo.t_EMP emp on orgn.F_103=emp.Fitemid
            WHERE orgn.FName LIKE '%{0}%'OR orgn.FPhone LIKE '%{0}%'", kehuName);
            DataTable dt = SqlHelper1.getTable(strSql, null);
            return dt;
        }
        private static string getdjhm()
        {
            DataTable FahdNumMax = SqlHelper1.ExecuteDataSetText(CommandType.StoredProcedure, "proc_get_nummax_fahd", null).Tables[0];
            string djhm = FahdNumMax.Rows[0][0].ToString();
            return djhm;
        }

        private static bool k3bc(string fad_ph, string kehuFNumber, string ywy, string zhidan, string bz, string kehuDengji)
        {
            bool djbc = false;
            string DtNow = DateTime.Now.ToString("yyyy-MM-dd");
             //获取表体FInterID(最大号)          
            DataTable FahtzdNumMax = SqlHelper1.ExecuteDataSetText(CommandType.StoredProcedure, "proc_get_nummax_fahtzd", null).Tables[0];
            string FInterID = FahtzdNumMax.Rows[0][0].ToString();
            //获取新增物料的表格
            string sql = string.Format(@"select * from fahuodan_wl where FInterID='{0}'", fad_ph);
            DataTable fahuodan = SqlHelper1.getTable(sql, null);
            int fhdcount = fahuodan.Rows.Count;
            if (fhdcount > 0)
            {
                 //查询购货单位
                sql = string.Format(@"select fitemid from t_Organization where fnumber='{0}'", kehuFNumber);
                int FCustID = Convert.ToInt32(SqlHelper1.getTable(sql, null).Rows[0][0]);
               
                //查询业务员ID
                sql = string.Format(@"select fitemid from t_emp where fname='{0}'", ywy);
                int FEmpID = Convert.ToInt32(SqlHelper1.getTable(sql, null).Rows[0][0]);
                //查询制单人ID
                sql = string.Format(@"select FUserID from t_User where fname='{0}'",zhidan);
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
                    '{7}',0,{5},14036,'','','')", FInterID, i + 1, FItemID, FQty, FPrice, Famount, FUnitID,DtNow);
                    SqlHelper1.ExecteNonQueryText(sql, null);
                }
                //发货通知单表头生成              
                //获取单据号码(流水号)
                DataTable FdjNO = SqlHelper1.ExecuteDataSetText(CommandType.StoredProcedure, "proc_get_nummax_fhdjhm", null).Tables[0];
                int FBlsh = Convert.ToInt32(FdjNO.Rows[0][0]);              
                string djt = "SEOUT";
                string rjyear = DtNow.Substring(2, 2);
                string rjmonth = DtNow.Substring(5, 2);
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
                FInterID, FBillNo, 0, DtNow, FCustID, FEmpID, FbUserID, bz, kehuDengji);
                SqlHelper1.ExecteNonQueryText(sql, null);
                djbc = true;
            }
            return djbc;
        }
        

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}