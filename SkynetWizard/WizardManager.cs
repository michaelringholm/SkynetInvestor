using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace OpusMagus.WizardManager
{    
    public static class WizardManager
    {
        public static void Main(String[] args)
        {
            Debug.WriteLine("**** Started *****");
            ExportDefaultQuestions();
            ImportDefaultQuestions();

            ExportQuestions(@"C:\Data\Subversion\Google\SkynetInvestor\questions.txt", new List<QuestionSection>());
            ImportQuestions(@"C:\Data\Subversion\Google\SkynetInvestor\questions.txt");

            Debug.WriteLine("**** Ended *****");
        }

        public static List<QuestionSection> ImportQuestions(String filePath)
        {

            var xmlSerializer = new XmlSerializer(typeof(List<QuestionSection>));
            var fileStream = new FileStream(filePath, FileMode.Open);
            List<QuestionSection> sections = (List<QuestionSection>)xmlSerializer.Deserialize(fileStream);
            fileStream.Close();

            return sections;
        }

        private static void ExportQuestions(String filePath, List<QuestionSection> sections)
        {
            var xmlSerializer = new XmlSerializer(typeof(List<QuestionSection>));
            var fileStream = new FileStream(filePath, FileMode.Create);
            xmlSerializer.Serialize(fileStream, sections);
            fileStream.Close();
        }

        private static void ImportDefaultQuestions()
        {

            var xmlSerializer = new XmlSerializer(typeof(List<QuestionSection>));
            var fileStream = new FileStream(@"C:\Data\Subversion\Google\SkynetInvestor\defaultQuestions.xml", FileMode.Open);
            List<QuestionSection> sections = (List<QuestionSection>)xmlSerializer.Deserialize(fileStream);
            fileStream.Close();

            foreach(QuestionSection section in sections)
            {
                Debug.WriteLine("Found section with title [" + section.Title + "]");
            }
        }

        private static void ExportDefaultQuestions()
        {
            var sections = new List<QuestionSection>();
            short questionId = 0;
            #region Financial situation
            var questions = new List<Question>();
            var options = new List<RadioButtonOption>();
            var question = new RadioButtonQuestion { Options = options };

            var section = new QuestionSection { Title = "Financial situation", Questions = questions };

            question.Id = ++questionId;
            question.Description = "How old are you?";
            question.GroupName = "AGE";
            options.Add(new RadioButtonOption { Title = "Under 30yrs", Value = "30", Checked = true, Score = 40 });
            options.Add(new RadioButtonOption { Title = "Between 30-45yrs", Value = "30-45", Score = 30 });
            options.Add(new RadioButtonOption { Title = "Between 45-65yrs", Value = "45-60", Score = 20 });
            options.Add(new RadioButtonOption { Title = "65+", Value = "65+", Score = 10 });
            questions.Add(question);

            options = new List<RadioButtonOption>();
            question = new RadioButtonQuestion { Options = options };
            question.Id = ++questionId;
            question.Description = "How do you expect your future income to evolve over the next 5-7 years?";
            question.GroupName = "FUTURE_INCOME";
            options.Add(new RadioButtonOption { Title = "Worsen a bit", Value = "WORSEN", Checked = true, Score = 10 });
            options.Add(new RadioButtonOption { Title = "The same", Value = "SAME", Score = 20 });
            options.Add(new RadioButtonOption { Title = "Improve a little", Value = "IMPROVE_LITTLE", Score = 30 });
            options.Add(new RadioButtonOption { Title = "Improve significantly", Value = "IMPROVE_MUCH", Score = 40 });
            questions.Add(question);

            options = new List<RadioButtonOption>();
            question = new RadioButtonQuestion { Options = options };
            question.Id = ++questionId;
            question.Description = "Assets and liabilities";
            question.GroupName = "ASSETS_AND_LIABILITIES";
            options.Add(new RadioButtonOption { Title = "<10%", Value = "10", Checked = true, Score = 10 });
            options.Add(new RadioButtonOption { Title = "10-25%", Value = "10-25", Score = 20 });
            options.Add(new RadioButtonOption { Title = "25%-40%", Value = "25-40", Score = 30 });
            options.Add(new RadioButtonOption { Title = "40%-60%", Value = "40-60", Score = 40 });
            questions.Add(question);
            
            sections.Add(section);
            #endregion



            #region Section TEST
            /*questions = new List<Question>();
            options = new List<DropDownOption>();
            question = new DropDownQuestion { Options = options };
            question.Description = "Hvor længe har du handlet med aktier?";
            options.Add(new DropDownOption { Title = "10 jahre am meisten", Value = "MASTER" });
            options.Add(new DropDownOption { Title = "10 jahre am mindesten", Value = "APPRENTICE" });
            questions.Add(question);

            section = new QuestionSection { Title = "Section 2", Questions = questions };
            sections.Add(section);*/
            #endregion

            var xmlSerializer = new XmlSerializer(typeof(List<QuestionSection>));
            var fileStream = new FileStream(@"C:\Data\Subversion\Google\SkynetInvestor\defaultQuestions.xml", FileMode.Create);
            xmlSerializer.Serialize(fileStream, sections);
            fileStream.Close();
        }        
    }
}
