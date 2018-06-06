using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using Newtonsoft.Json;


namespace yhyy
{
    /// <summary>
    /// fahuodan1 的摘要说明
    /// </summary>
    public class fahuodan1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string pcontent = context.Request.Form["pcontent"];
            switch (pcontent)
            {
                case "kehu"://客户资料
                    string kehuName = context.Request.Form["kehuName"];
                    DataTable dt = getKeHu(kehuName);
                    string jsonString = string.Empty;
                    jsonString = JsonConvert.SerializeObject(dt);
                    context.Response.Write(jsonString);
                    break;
                case "djhm"://单据号码
                    DataTable FahdNumMax = SqlHelper1.ExecuteDataSetText(CommandType.StoredProcedure, "proc_get_nummax_fahd", null).Tables[0];
                    string danju_no = FahdNumMax.Rows[0][0].ToString();
                    context.Response.Write(danju_no);
                    break;
                case "wuliao"://物料
                    break;
                default:
                    break;
            }

            //string kehuName = context.Request.Form["kehuName"];
            //string strSql = string.Format("SELECT top 5 fname FROM t_user");
            //DataTable dt = SqlHelper1.getTable(strSql, null);
            //StringBuilder sb = new StringBuilder();
            //if (dt.Rows.Count > 0)
            //{
            //    sb.Append("<table id=\"kehutable\" border=1>");
            //    sb.Append("<tr><th>客户ID</th><th>客户名称</th><th>客户电话</th><th>等级</th></tr>");

            //    for (int i = 0; i < dt.Rows.Count; i++)
            //    {
            //        sb.Append("<tr>");
            //        sb.Append(string.Format("<td>{0}</td>", dt.Rows[i][0].ToString()));
            //        sb.Append(string.Format("<td>{0}</td>", dt.Rows[i][0].ToString()));
            //        sb.Append(string.Format("<td>{0}</td>", dt.Rows[i][0].ToString()));
            //        sb.Append(string.Format("<td>{0}</td>", dt.Rows[i][0].ToString()));
            //        sb.Append("</tr>");
            //    }

            //    sb.Append("</table>");
            //}
            //sb.Append("111");
            //context.Response.Write(sb.ToString());
        }

        private static DataTable getKeHu(string kehuName)
        {
            string strSql = string.Format(@"SELECT top 2 orgn.FNumber,orgn.FName,orgn.FPhone,
                    orgn.FTypeID,sube.FName as suFName,emp.FName as empFName FROM t_Organization orgn 
                    LEFT JOIN dbo.t_SubMessage sube ON orgn.FTypeID=sube.FInterID 
                    LEFT JOIN dbo.t_EMP emp on orgn.F_103=emp.Fitemid
                    WHERE orgn.FName LIKE '%{0}%'OR orgn.FPhone LIKE '%{0}%'", kehuName);
            DataTable dt = SqlHelper1.getTable(strSql, null);
            return dt;
            //string aa="11";
            //JavaScriptSerializer jss = new JavaScriptSerializer();
            //cont
            //context.Response.Write(jss.Serialize(aa));

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