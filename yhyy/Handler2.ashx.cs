using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Data;

namespace yhyy
{
    /// <summary>
    /// Handler2 的摘要说明
    /// </summary>
    public class Handler2 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            
            string pid = context.Request.Form["pid"];
            string title = context.Request.Form["title"];
            string strSql = string.Format("SELECT top 5 fname FROM t_user");
            DataTable dt = SqlHelper1.getTable(strSql, null);
            StringBuilder sb = new StringBuilder();
            if (dt.Rows.Count > 0)
            {
                sb.Append("<ul>");
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    sb.Append(string.Format("<li>{0}</li>", dt.Rows[i][0].ToString()));
                }
                sb.Append("</ul>");
            }
            context.Response.Write(sb.ToString());
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