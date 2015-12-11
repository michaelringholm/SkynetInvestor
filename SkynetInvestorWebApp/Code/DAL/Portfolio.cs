using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkynetInvestorDAL
{
    public class Portfolio
    {
        public List<Asset> Assets { get; set; }
        public DateTime TradeDate { get; set; }
    }
}
