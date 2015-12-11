using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace OpusMagus.WizardManager
{    
    public class DropDownQuestion : Question
    {
        public List<DropDownOption>  Options { get; set; }
    }
}
