using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkynetInvestorDAL
{
    public class SkynetUser
    {
        public Portfolio Portfolio{ get; set; }
        public int MifidScore { get; set; }

        public int NumberOfETFs { get; set; }
    }

}
