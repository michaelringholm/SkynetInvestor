using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace SkynetInvestor
{
    internal abstract class Logger
    {
        private static HttpServerUtility Server { get { return HttpContext.Current.Server; } }
        private static String _infoLoggerPath = Server.MapPath("/SKYNET.INFO.LOG");
        private static String _errorLoggerPath = Server.MapPath("/SKYNET.ERROR.LOG");

        internal static void LogInfo(string message)
        {
            File.AppendAllText(_infoLoggerPath, DateTime.Now.ToString() + " INFO: " + message + Environment.NewLine);
        }

        internal static void LogError(string message)
        {
            File.AppendAllText(_errorLoggerPath, DateTime.Now.ToString() + " ERROR: " + message + Environment.NewLine);
        }
    }
}
