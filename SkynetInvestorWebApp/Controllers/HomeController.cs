using OpusMagus.WizardManager;
using SkynetInvestor.Code.DTL;
using SkynetInvestor.Models;
using SkynetInvestorDAL;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace SkynetInvestor.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Logger.LogInfo("SessionID = [" + Session.SessionID + "]");
            return View("Index");
        }

        public ActionResult Finish()
        {
            return View("Finish");
        }

        public ActionResult Mifid()
        {            
            var user = DACWebFacade.RestoreUser(User.Identity.Name);
            if (user != null)
                return Graphs(user.MifidScore, user.NumberOfETFs);
            return View("Mifid");
        }

        public ActionResult BetaDisclaimer()
        {
            return View("BetaDisclaimer");
        }

        public ActionResult RedoMifid()
        {
            var profileModel = ProfileModelFactory.CreateProfileModel();
            return Demo();
        }

        public ActionResult ValueCases()
        {
            return View("ValueCases");
        }

        public ActionResult Demo()
        {
            Logger.LogInfo("Demo entered!");
            SkynetUser user = null;
            int activeStep = 1;

            if (User.Identity.IsAuthenticated)
            {
                user = DACWebFacade.RestoreUser(User.Identity.Name);
                if (user != null)
                {
                    if (user.MifidScore > 0 && user.NumberOfETFs > 0)
                        activeStep = 2; // MIFID completed
                }
                else
                    user = new SkynetUser { MifidScore=150, Budget=100000, NumberOfETFs=5  }; // User is authenticated but was never stored.
            }
            else
                user = new SkynetUser { MifidScore = 150, Budget = 100000, NumberOfETFs = 5 };

            var profileModel = ProfileModelFactory.CreateProfileModel();

            return View("Demo", new DemoModel { SkynetUser = user, ProfileModel = profileModel, ActiveStep = activeStep });    
        }

        public ActionResult Graphs(int? mifidScore, int? numberOfETFs)
        {
            /*var portfolio = new Portfolio{ MifidScore = id, Title = "My Portfolio", UserId = 1};
            var context = new SkynetDataClassesDataContext();
            context.Portfolios.InsertOnSubmit(portfolio);
            context.SubmitChanges();*/
            //var assets = new List<Asset>();
            /*var asset = new Asset { Acronym = "JKD" };
            assets.Add(asset);
            asset = new Asset { Acronym = "AKK" };
            assets.Add(asset);*/

            SkynetUser user = null;
            user = DACWebFacade.RestoreUser(User.Identity.Name);

            if (user == null)
            {
                if (mifidScore.HasValue && numberOfETFs.HasValue)
                {
                    user = new SkynetUser { MifidScore = mifidScore.Value, NumberOfETFs = numberOfETFs.Value };
                    List<Asset> assets = new List<Asset>();
                    user.Portfolio = new Portfolio { Assets = assets, TradeDate = DateTime.Now };
                    DACWebFacade.StoreUser(user, User.Identity.Name);
                }
                else
                    return View("Mifid");
            }
            else
            {
                if (mifidScore.HasValue && numberOfETFs.HasValue)
                {
                    user.MifidScore = mifidScore.Value;
                    user.NumberOfETFs = numberOfETFs.Value;
                    DACWebFacade.StoreUser(user, User.Identity.Name);
                }
            }
            
            return View("Graphs", new GraphsModel { SkynetUser = user });
        }

        public ActionResult TradedPortfolios()
        {
            var user = DACWebFacade.RestoreUser(User.Identity.Name);
            if (user != null)
                return View("TradedPortfoliosView", new TradedPortfoliosModel { SkynetUser = user });
            return View("Mifid");            
        }

        public JsonResult TradePortfolio(String[] portfolio)
        {            
            List<Asset> assets = new List<Asset>();
            Portfolio newPortfolio = new Portfolio { Assets = assets, TradeDate = DateTime.Now };

            foreach(String portfolioItem in portfolio)
            {
                String[] values = portfolioItem.Split(',');
                String name = values[0];
                double percentage = Double.Parse(values[1]);
                assets.Add(new Asset { Acronym = name, Percentage = percentage });
            }

            DACWebFacade.TradePortfolio(User.Identity.Name, newPortfolio);

            return Json(new { Status = "Success" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveETFCount(int etfCount)
        {
            DACWebFacade.SaveETFCount(User.Identity.Name, etfCount);

            return Json(new { Status = "Success" });
        }

        public JsonResult SaveDemoInput(int mifidScore, int etfCount, int budget)
        {
            SkynetUser user = null;
            user = DACWebFacade.RestoreUser(User.Identity.Name);

            if (user == null)
            {
                user = new SkynetUser { MifidScore = mifidScore, NumberOfETFs = etfCount, Budget = budget };
                /*List<Asset> assets = new List<Asset>();
                user.Portfolio = new Portfolio { Assets = assets, TradeDate = DateTime.Now };
                DACWebFacade.StoreUser(user, User.Identity.Name);*/
                HttpContext.Application[Session.SessionID + "SkynetUser"] = user;
            }
            else // User does not exist
            {
                user.MifidScore = mifidScore;
                user.NumberOfETFs = etfCount;
                DACWebFacade.StoreUser(user, User.Identity.Name);
            }

            return Json(new { Status = "Success" });
        }

        public JsonResult CachePersonalInfo(String data)
        {
            var personalInfoDTO = new JavaScriptSerializer().Deserialize<PersonalInfoDTO>(data);
            HttpContext.Application[Session.SessionID + "PersonalInfo"] = personalInfoDTO;

            return Json(new { Result = data }, JsonRequestBehavior.AllowGet);
        } 

        public JsonResult SubmitFeedback(String feedback)
        {
            //DACWebFacade.SaveETFCount(User.Identity.Name, etfCount);
            /*MailMessage mail = new MailMessage("robot@betterwealthsolutions.com", "michaelringholm@gmail.com");
            SmtpClient client = new SmtpClient();
            client.Port = 25;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Host = "smtp.google.com";
            mail.Subject = "Feedback submitted";
            mail.Body = feedback;
            client.Send(mail);*/
            SendMail(feedback.Replace("*newline*", "\n"));

            return Json(new { Status = "Success" });
        }

        private void SendMail(String feedback)
        {
            MailMessage message = new System.Net.Mail.MailMessage();
            string fromEmail = "betterwealthsolutions.robot@gmail.com";
            string fromPW = "BetterWealthS0luti0ns";
            string toEmail = "michaelringholm@gmail.com";
            message.From = new MailAddress(fromEmail);
            message.To.Add(toEmail);
            message.To.Add("marjanirasmussen@gmail.com");
            message.To.Add("stig.and@hotmail.com");
            message.Subject = "Feedback Submitted";
            message.Body = feedback;
            message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.EnableSsl = true;
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(fromEmail, fromPW);

            smtpClient.Send(message.From.ToString(), message.To.ToString(), message.Subject, message.Body); 
        }
        
        public ActionResult Methodology()
        {
            return View("Methodology");
        }

        public ActionResult About()
        {
            return View("About");
        }

        public ActionResult Contact()
        {
             return View("Contact");
        }

        public ActionResult FAQ()
        {
            return View("FAQ");
        }

       /* public ActionResult RegisterAndSignUp(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                //DACWebFacade.StoreUser(
                var user = new ApplicationUser() { UserName = model.UserName };
                user.
                var result = UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    SignInAsync(user, isPersistent: false);
                    return RedirectToAction("Members", "Home");
                }
                else
                {
                    AddErrors(result);
                }
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }*/

        public JsonResult CreateUser(String username, String password, String email)
        {
            MembershipUser newUser = Membership.CreateUser(username, password, email);
            return Json(new { Success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}