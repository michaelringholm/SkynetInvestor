using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace OpusMagus.WizardManager
{
    [XmlInclude(typeof(DropDownQuestion))]
    [XmlInclude(typeof(RadioButtonQuestion))]
    [XmlInclude(typeof(MultipleChoiceQuestion))]
    public abstract class Question
    {
        public short Id { get; set; }
        public String Description { get; set; }
        public Double Score { get; set; }
    }
}
