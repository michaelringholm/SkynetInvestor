using SkynetInvestor.Code.DTL;
using SkynetInvestor.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace SkynetInvestor.Controllers
{
    [Authorize]
    public class MembersController : Controller
    {
        public ActionResult Home()
        {
            Logger.LogInfo("Members home called.");
            //EventLog.WriteEntry("SKYNET", "Members home called.", EventLogEntryType.Information);
            var user = DACWebFacade.RestoreUser(User.Identity.Name);
            
            if (user != null && user.MifidScore > 0)
                return View("HomeView", new MemberModel { SkynetUser = user });
            else
                return Redirect("/Home/BetaDisclaimer");
        }

        public ActionResult SummaryControl()
        {
            var user = DACWebFacade.RestoreUser(User.Identity.Name);                        
            return PartialView("SummaryControl", new MemberModel{ SkynetUser = user });
        }

        public ActionResult DocumentsControl()
        {
            return PartialView("DocumentsControl");
        }

        public ActionResult PersonalInfoControl()
        {
            var user = DACWebFacade.RestoreUser(User.Identity.Name);

            return PartialView("PersonalInfoControl", new MemberModel { SkynetUser = user });
        }

        public ActionResult TransactionsControl()
        {
            return PartialView("TransactionsControl");
        }

        public JsonResult DocumentText(int id)
        {
            String text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.";
            return Json(new { DocumentText = "<span style=\"font-weight: bold;\">Document " + id + "</span><p>" + text + "</p>" }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult TransactionText(int id)
        {
            var items = new List<TransactionDetailsItemDTO>();
            items.Add(new TransactionDetailsItemDTO{ Acronym = "BGA", Amount = 13000, BuySellCode = "Sell", Count = 4 });
            items.Add(new TransactionDetailsItemDTO { Acronym = "ZWH", Amount = 25000, BuySellCode = "Sell", Count = 2 });
            items.Add(new TransactionDetailsItemDTO { Acronym = "TRA", Amount = 19000, BuySellCode = "Buy", Count = 5 });
            items.Add(new TransactionDetailsItemDTO { Acronym = "UTF", Amount = 4000, BuySellCode = "Buy", Count = 2 });
            items.Add(new TransactionDetailsItemDTO { Acronym = "OPS", Amount = 5000, BuySellCode = "Buy", Count = 1 });

            return PartialView("TransactionDetailsControl", new TransactionDetailsControlModel { TransactionDetailItems =  items });
        }

        public JsonResult EmailText(int id)
        {
            String text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.";
            return Json(new { EmailText = "<span style=\"font-weight: bold;\">Email " + id + "</span><p>" + text + "</p>" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SavePersonalInfo(String data)
        {
            var personalInfoDTO = new JavaScriptSerializer().Deserialize<PersonalInfoDTO>(data);
            var username = User.Identity.Name;
            var user = DACWebFacade.RestoreUser(username);
            user.PersonalInfo = personalInfoDTO;
            DACWebFacade.StoreUser(user, username);
            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        }        
	}
}