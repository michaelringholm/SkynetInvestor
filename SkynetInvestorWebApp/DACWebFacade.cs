using SkynetInvestorDAL;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;

namespace SkynetInvestor
{
    public abstract class DACWebFacade
    {
        internal static HttpRequest Request 
        {
            get { return HttpContext.Current.Request; }
        }

        internal static HttpServerUtility Server
        {
            get { return HttpContext.Current.Server; }
        }

        internal static HttpSessionState Session
        {
            get { return HttpContext.Current.Session; }
        }


        internal static void StoreUser(SkynetUser user, String username)
        {
            //if (Request.IsAuthenticated)
            if (user != null && !String.IsNullOrEmpty(username))
            {
                Logger.LogInfo("Saving user with username = [" + username + "]");
                DAC.StoreUser(Server.MapPath(@"~/Content/xml/" + username + ".xml"), user);
                //saveStatus = "Saved mifid score for user [" + username + "] at [" + DateTime.Now + "]";
            }
            else
                Logger.LogInfo("User is null and path was " + Server.MapPath(@"~/Content/xml/" + username + ".xml"));
                //EventLog.WriteEntry("SKYNET", "User is null and path was " + Server.MapPath(@"~/Content/xml/" + username + ".xml"), EventLogEntryType.Error);
        }

        internal static SkynetUser RestoreUser(String username)
        {
            if (Request.IsAuthenticated)
                return DAC.RestoreUser(Server.MapPath(@"~/Content/xml/" + username + ".xml"));
            else
                return null;
        }


        internal static void SaveETFCount(string username, int etfCount)
        {
            if (Request.IsAuthenticated)
            {
                SkynetUser user = RestoreUser(username);
                user.NumberOfETFs = etfCount;
                StoreUser(user, username);
            }
        }

        internal static void TradePortfolio(string username, Portfolio portfolio)
        {
            if (Request.IsAuthenticated)
            {
                SkynetUser user = RestoreUser(username);
                user.Portfolio = portfolio;
                StoreUser(user, username);
            }
        }
    }
}