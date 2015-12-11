using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OpusMagus.WizardManager
{
    public class MultipleChoiceQuestion : Question
    {
        public List<MultipleChoiceOption> Options { get; set; }
    }
}
