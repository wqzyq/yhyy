using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;


namespace yhyy
{
    /// <summary>
    /// Handler3 的摘要说明
    /// </summary>
    public class Handler3 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {

            string title = context.Request.Form["title"];
            string strSql = string.Format("SELECT top 5 fname FROM t_user");
            DataTable dt = SqlHelper1.getTable(strSql, null);
            StringBuilder sb = new StringBuilder();
            if (dt.Rows.Count > 0)
            {
                sb.Append("<ul>");
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    sb.Append(string.Format(dt.Rows[i][0].ToString()));
                }
                sb.Append("</ul>");
            }
            context.Response.Write(sb.ToString());
            //JavaScriptSerializer ser = new JavaScriptSerializer();

            //context.Response.Write(ser.Serialize(sb.ToString()));
            //List<realSchoolInfoViewModel> schoolInfo = iRegister.QueryAllSchoolInfo(schoolname);
            //List<string> results = new List<string>();
            ////定义数组，添加返回的集合中的学校名称字段  
            //for (int i = 0; i < schoolInfo.Count; i++)
            //{
            //    string allName = schoolInfo[i].schoolName.ToString();
            //    results.Add(allName);
            //}
            //返回json串  
            //return Json(results, JsonRequestBehavior.AllowGet);  
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
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