using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OpusMagus.WizardManager
{
    public class RadioButtonQuestion : Question
    {
        public List<RadioButtonOption> Options { get; set; }
        public String GroupName { get; set; }
    }
}
