using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OpusMagus.WizardManager
{
    public class RadioButtonOption : QuestionOption
    {
        public String Title { get; set; }
        public String Value { get; set; }
        public bool Checked { get; set; }
    }
}
