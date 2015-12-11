using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpusMagus.WizardManager;

namespace SkynetInvestor.Models
{
    public class MifidQuestionaireViewModel
    {
        public List<QuestionSection> QuestionSections { get; set; }

        public List<Question> AllQuestions { get; set; }
    }
}