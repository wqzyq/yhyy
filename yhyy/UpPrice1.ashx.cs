using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Data;
using Newtonsoft.Json;

namespace yhyy
{
    /// <summary>
    /// UpPrice1 的摘要说明
    /// </summary>
    public class UpPrice1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
            string sw = context.Request.Form["content"];
            string jsonString = string.Empty;
            switch (sw)
            {
                case "wuliao"://查找物料
                    string FName = context.Request.Form["wuliaoName"];
                    string chadeng = context.Request.Form["wuliaochadeng"];
                    if (string.IsNullOrEmpty(chadeng))
                    {
                        DataTable dt = getWuLiao(FName);
                        jsonString = JsonConvert.SerializeObject(dt);
                        context.Response.Write(jsonString);
                    }
                    else
                    {
                        DataTable dt = getWuLiaocd(FName, chadeng);
                        jsonString = JsonConvert.SerializeObject(dt);
                        context.Response.Write(jsonString);
                    }
                    break;
                case "xgnm"://修改价格
                    string sNM = context.Request.Form["sNM"];
                    string[] arrNM = sNM.Split(',');
                    string sJG = context.Request.Form["sJG"];
                    string[] arrJG = sJG.Split(',');
                    bool bl = UpdateFun(arrNM, arrJG);
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

        private static bool UpdateFun(string[] arrNM, string[] arrJG)
        {
            bool bl = false;
            //循环读取选中物料内码
            for (int i = 0; i < arrNM.Length; i++)
            {
                //获取内码
                int NM = Convert.ToInt32(arrNM[i]);
                if (NM > 0)
                {
                    for (int j = 0; j < arrJG.Length; j++)
                    {
                        string JG0 = arrJG[j];
                        if (!string.IsNullOrEmpty(JG0))
                        {
                            bl = true;
                            decimal JG = Convert.ToDecimal(arrJG[j]);
                            switch (j)
                            {
                                case 0://一级价格修改                                       
                                    UpdatePrice(JG, NM, 20011);
                                    break;
                                case 1:
                                    UpdatePrice(JG, NM, 20012);
                                    break;
                                case 2:
                                    UpdatePrice(JG, NM, 83558);
                                    break;
                                case 3:
                                    UpdatePrice(JG, NM, 83559);
                                    break;
                                case 4:
                                    UpdatePrice(JG, NM, 83560);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
            return bl;
        }

        private static void UpdatePrice(decimal _FPrice, int _FItemID, int _FRelatedID)
        {
            string upDatetime = DateTime.Now.ToString();            // 2018-3-16 10:02:10
            int whrID = 16394;
            string sql = string.Format(@"update ICPrcPlyEntry set FPrice={0},FmaintDate='{3}',fmainterID={4} 
                    where FItemID='{1}' and FRelatedID={2}", _FPrice, _FItemID, _FRelatedID, upDatetime, whrID);
            SqlHelper1.ExecteNonQueryText(sql, null);
        }
        private static DataTable getWuLiao(string wuliaoName)
        {
            //物料代码、商品名称、规格、等级、数量（获取初始表格内容）
            string sql = string.Format(@"SELECT icitem.FNumber,icitem.fitemid,icitem.FName,icitem.F_103 as wldj,icitem.FModel,
            Sube.fname as suFName,icitem.FNote,tmu.FName as tmuFName,icpy.FPrice 
            FROM dbo.t_ICItem ICitem 
            left join dbo.ICPrcPlyEntry icpy  ON ICitem.FItemID=icpy.FItemID
            LEFT JOIN dbo.t_MeasureUnit tmu ON ICitem.FSaleUnitID=tmu.FMeasureUnitID  
            LEFT JOIN dbo.t_SubMessage Sube ON icpy.FRelatedID=Sube.FInterID
            WHERE LEFT(icitem.FNumber,2)='CP' 
            AND FRelatedID=83560 
            AND  icitem.fname LIKE '%{0}%'", wuliaoName);
            DataTable dt = SqlHelper1.getTable(sql, null);
            return dt;
        }

        private static DataTable getWuLiaocd(string wuliaoName, string chadeng)
        {
            //物料代码、商品名称、规格、等级、数量（获取初始表格内容）
            string sql = string.Format(@"SELECT icitem.FNumber,icitem.fitemid,icitem.FName,icitem.F_103 as wldj,icitem.FModel,
            Sube.fname as suFName,icitem.FNote,tmu.FName as tmuFName,icpy.FPrice 
            FROM dbo.t_ICItem ICitem 
            left join dbo.ICPrcPlyEntry icpy  ON ICitem.FItemID=icpy.FItemID
            LEFT JOIN dbo.t_MeasureUnit tmu ON ICitem.FSaleUnitID=tmu.FMeasureUnitID  
            LEFT JOIN dbo.t_SubMessage Sube ON icpy.FRelatedID=Sube.FInterID
            WHERE LEFT(icitem.FNumber,2)='CP' 
            AND FRelatedID=83560 
            AND  icitem.fname LIKE '%{0}%'
            and icitem.F_103='{1}'", wuliaoName, chadeng);
            DataTable dt = SqlHelper1.getTable(sql, null);
            return dt;
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