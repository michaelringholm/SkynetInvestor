using SkynetInvestor.Code.DTL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkynetInvestorDAL
{
    public class SkynetUser
    {
        public SkynetUser()
        {
            Budget = 100000;
            Portfolio = new Portfolio();
            PersonalInfo = new PersonalInfoDTO();
        }

        public Portfolio Portfolio{ get; set; }
        public int MifidScore { get; set; }
        public int NumberOfETFs { get; set; }
        public int Budget { get; set; }

        public PersonalInfoDTO PersonalInfo { get; set; }
    }

}
