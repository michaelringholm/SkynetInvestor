using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpusMagus.WizardManager;

namespace SkynetInvestor.Models
{
    public static class ProfileModelFactory
    {
        public static ProfileModel CreateProfileModel()
        {
            String fileURI = Server.MapPath(System.Configuration.ConfigurationManager.AppSettings["QuestionFileURI"]);
            var sections = WizardManager.ImportQuestions(fileURI);
            var questions = sections.SelectMany(s => s.Questions).ToList();
            var profileModel = new ProfileModel { QuestionSections = sections, AllQuestions = questions };

            return profileModel;
        }

        public static HttpServerUtility Server { get { return HttpContext.Current.Server; } }
    }

    public class ProfileModel
    {
        public List<QuestionSection> QuestionSections { get; set; }

        public List<Question> AllQuestions { get; set; }
    }

   
}