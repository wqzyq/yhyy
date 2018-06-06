using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace yhyy
{
    /// <summary>
    /// HelpComplete 的摘要说明
    /// </summary>
    public class HelpComplete : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {

             context.Response.ContentType = "text/plain";
            List<CompleteTest> tList = new List<CompleteTest>()
            {
                #region MyRegion
                new CompleteTest(){ CompleteText="http"},
                new CompleteTest(){ CompleteText="auto"},
                new CompleteTest(){ CompleteText="morning"},
                new CompleteTest(){ CompleteText="afternoon"},
                new CompleteTest(){ CompleteText="context"},
                new CompleteTest(){ CompleteText="text"},
                new CompleteTest(){ CompleteText="plain"},
                new CompleteTest(){ CompleteText="hello"},
                new CompleteTest(){ CompleteText="word"},
                new CompleteTest(){ CompleteText="handler"},
                new CompleteTest(){ CompleteText="config"},
                new CompleteTest(){ CompleteText="response"},
                new CompleteTest(){ CompleteText="write"},
                new CompleteTest(){ CompleteText="request"},
                new CompleteTest(){ CompleteText="class"},
                new CompleteTest(){ CompleteText="public"},
                new CompleteTest(){ CompleteText="protect"},
                new CompleteTest(){ CompleteText="void"},
                new CompleteTest(){ CompleteText="summary"},
                new CompleteTest(){ CompleteText="get"},
                new CompleteTest(){ CompleteText="post"},
                new CompleteTest(){ CompleteText="ajax"},
                new CompleteTest(){ CompleteText="help"},
                new CompleteTest(){ CompleteText="dbhelp"},
                new CompleteTest(){ CompleteText="car"},
                new CompleteTest(){ CompleteText="dictionary"},
                #endregion
            };
            string action = context.Request["action"];
            if (action != "")
            {
                var v = (from c in tList
                         where c.CompleteText.StartsWith(action.ToLower())
                         select c).Select(p => p);
                JavaScriptSerializer jss = new JavaScriptSerializer();
                //将list集合转换成JSON字符串，并返回
                string result = jss.Serialize(v.ToList());
                context.Response.Write(result);
            }
        }
 
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
        class CompleteTest
        {
            public string CompleteText { get; set; }
        }
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
        

        //public bool IsReusable
        //{
        //    get
        //    {
        //        return false;
        //    }
        //}
    }
}