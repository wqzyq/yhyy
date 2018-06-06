using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace yhyy
{
    /// <summary>
    /// Handler1 的摘要说明
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string html = "";
            //在这里，参数获取方式为context.Request.Params["methodType"].ToString()  
            switch (context.Request.Params["methodType"].ToString())
            {
                case "code":
                    //html = CodeHandler(context.Request.Params["code"].ToString());
                    break;
                case "user":
                    break;
            }
            context.Response.Write(html);
            context.Response.End();  
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        //public string CodeHandler(string code)
        //{
        //    ////List<string> list = ProjectManager.GetProjectByCode(code);//请将此处理解为：向数据库请求和以当前参数开头的所有数据，返回为字符串列表  
            
        //    //string html = "<ul>";
        //    //foreach (string temp in list)
        //    //{
        //    //    html = html + "<li>" + temp + "</li>";
        //    //}
        //    //html = html + "</ul>";
        //    return html;
        //}  
    }
}