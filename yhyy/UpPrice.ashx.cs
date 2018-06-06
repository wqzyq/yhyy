using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Text;

namespace yhyy
{
    /// <summary>
    /// UpPrice 的摘要说明
    /// </summary>
    public class UpPrice : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            StringBuilder sp = new StringBuilder();
            string sw = context.Request.Form["content"];
            string jsonString = string.Empty;
            switch (sw)
            {
                case "wuliao"://物料查询
                    string FName = context.Request.Form["wuliaoName"];
                    string dengji = context.Request.Form["dengji"];
                    string chadeng = context.Request.Form["wuliaochadeng"];
                    if (string.IsNullOrEmpty(chadeng))
                    {
                        DataTable dt = getWuLiao(FName, dengji);
                        jsonString = JsonConvert.SerializeObject(dt);
                        context.Response.Write(jsonString);
                    }
                    else
                    {
                        DataTable dt = getWuLiaocd(FName, chadeng, dengji);
                        jsonString = JsonConvert.SerializeObject(dt);
                        context.Response.Write(jsonString);
                    }

                    break;
                case "djxz"://得到价格单据最大号
                    string Number = getNumber();
                    context.Response.Write(Number);
                    break;
                case "jgxz"://新增价格修改项目
                    string djhm = context.Request.Form["djhm"];
                    int nm = Convert.ToInt32(context.Request.Form["nm"]);
                    string mc = context.Request.Form["mc"];
                    string ggxh = context.Request.Form["ggxh"];
                    string dj = context.Request.Form["dj"];
                    xzjgwl(context, sp, djhm, nm, mc, ggxh, dj);
                    break;
                case "selrn"://返回选择修改物料
                    int FbillNo = Convert.ToInt32(context.Request.Form["FbillNo"]);
                    string sql = string.Format(@"select * from z_jggl where djhm={0}", FbillNo);
                    DataTable dtSel = SqlHelper1.getTable(sql, null);
                    jsonString = JsonConvert.SerializeObject(dtSel);
                    context.Response.Write(jsonString);
                    break;
                case "del"://删除物料
                    int FbillNo_Del = Convert.ToInt32(context.Request.Form["FbillNo"]);
                    int nm_Del = Convert.ToInt32(context.Request.Form["nm"]);
                    DataTable dt_del = del(FbillNo_Del, nm_Del);
                    jsonString = JsonConvert.SerializeObject(dt_del);
                    context.Response.Write(jsonString);
                    break;
                case "wuliao_price"://价格修改
                    int djhm_jg = Convert.ToInt32(context.Request.Form["djhm"]);
                    decimal Price = Convert.ToDecimal(context.Request.Form["Price"]);
                    bool bl = UpdatePrice(djhm_jg, Price);
                    if (bl)
                    {
                        int hc = 1;
                        context.Response.Write(hc);
                    }
                    else
                    {
                        int hc0 = 0;
                        context.Response.Write(hc0);
                    }
                    break;
                default:
                    break;
            }

        }

        private static DataTable del(int FbillNo_Del, int nm_Del)
        {
            string sql;
            sql = string.Format(@"delete z_jggl where djhm={0} and nm={1}", FbillNo_Del, nm_Del);
            SqlHelper1.ExecteNonQueryText(sql, null);
            sql = string.Format(@"select * from z_jggl where djhm={0}", FbillNo_Del);
            DataTable dt_del = SqlHelper1.getTable(sql, null);
            return dt_del;
        }

        private static void xzjgwl(HttpContext context, StringBuilder sp, string djhm, int nm, string mc, string ggxh, string dj)
        {
            string sql = string.Format(@"select * from z_jggl where nm={0} and djhm={1} ", nm, djhm);
            int icount = SqlHelper1.getTable(sql, null).Rows.Count;
            if (icount > 0)
            {
                context.Response.Write(0);//已经有记录返回整型数字0
            }
            else
            {
                //新增记录
                sp.Append("insert into z_jggl ");
                sp.Append("(djhm,nm,mc,ggxh,dj) ");
                sp.Append("values({0},{1},'{2}','{3}','{4}')");
                sql = sp.ToString();
                sql = string.Format(sql, djhm, nm, mc, ggxh, dj);
                SqlHelper1.ExecteNonQueryText(sql, null);
                context.Response.Write(1);//更新成功返回成功标记
            }
        }
        private static string getNumber()
        {
            DataTable FahdNumMax = SqlHelper1.ExecuteDataSetText(CommandType.StoredProcedure, "proc_get_nummax_jggl", null).Tables[0];
            string Number = FahdNumMax.Rows[0][0].ToString();
            return Number;
        }
        private static DataTable getWuLiao(string wuliaoName, string dengji)
        {
            //物料代码、商品名称、规格、等级、数量（获取初始表格内容）
            string sql = string.Format(@"SELECT top 100 icitem.FNumber,icitem.fitemid,icitem.FName,icitem.F_103 as wldj,icitem.FModel,
            Sube.fname as suFName,icitem.FNote,tmu.FName as tmuFName,icpy.FPrice 
            FROM dbo.t_ICItem ICitem 
            left join dbo.ICPrcPlyEntry icpy  ON ICitem.FItemID=icpy.FItemID
            LEFT JOIN dbo.t_MeasureUnit tmu ON ICitem.FSaleUnitID=tmu.FMeasureUnitID  
            LEFT JOIN dbo.t_SubMessage Sube ON icpy.FRelatedID=Sube.FInterID
            WHERE LEFT(icitem.FNumber,2)='CP' 
            AND  icitem.fname LIKE '%{0}%'
            and sube.FName='{1}'", wuliaoName, dengji);
            DataTable dt = SqlHelper1.getTable(sql, null);
            return dt;
        }

        private static DataTable getWuLiaocd(string wuliaoName, string chadeng, string dengji)
        {
            //物料代码、商品名称、规格、等级、数量（获取初始表格内容）
            string sql = string.Format(@"SELECT top 100 icitem.FNumber,icitem.fitemid,icitem.FName,icitem.F_103 as wldj,icitem.FModel,
            Sube.fname as suFName,icitem.FNote,tmu.FName as tmuFName,icpy.FPrice 
            FROM dbo.t_ICItem ICitem 
            left join dbo.ICPrcPlyEntry icpy  ON ICitem.FItemID=icpy.FItemID
            LEFT JOIN dbo.t_MeasureUnit tmu ON ICitem.FSaleUnitID=tmu.FMeasureUnitID  
            LEFT JOIN dbo.t_SubMessage Sube ON icpy.FRelatedID=Sube.FInterID
            WHERE LEFT(icitem.FNumber,2)='CP' 
            AND  icitem.fname LIKE '%{0}%'
            and icitem.F_103='{1}'
            and sube.FName='{2}'", wuliaoName, chadeng, dengji);
            DataTable dt = SqlHelper1.getTable(sql, null);
            return dt;
        }
        private static bool UpdatePrice(int _djhm, decimal _price)
        {
            bool bl = false;
            string sql = string.Format(@"select * from z_jggl where djhm={0}", _djhm);
            DataTable dt = SqlHelper1.getTable(sql, null);
            int rows = dt.Rows.Count;
            if (rows > 0)
            {
                for (int i = 0; i < rows; i++)
                {
                    int _FRelatedID = 0;
                    int _FItemID = Convert.ToInt32(dt.Rows[i]["nm"]);
                    string _jiedeng = dt.Rows[i]["dj"].ToString();
                    switch (_jiedeng)
                    {
                        case "一级":
                            _FRelatedID = 20011;
                            break;
                        case "二级":
                            _FRelatedID = 20012;
                            break;
                        case "三级":
                            _FRelatedID = 83558;
                            break;
                        case "四级":
                            _FRelatedID = 83559;
                            break;
                        default://五级
                            _FRelatedID = 83560;
                            break;
                    }
                    sql = string.Format(@"update ICPrcPlyEntry set FPrice={0}
            where FItemID='{1}' and FRelatedID={2}", _price, _FItemID, _FRelatedID);
                    SqlHelper1.ExecteNonQueryText(sql, null);
                }
            }

            bl = true;
            return bl;
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