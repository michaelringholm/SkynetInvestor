using SkynetInvestorDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkynetInvestor.Models
{
    public class GraphsModel
    {
        public SkynetUser SkynetUser { get; set; }
    }

    public class TradedPortfoliosModel
    {
        public SkynetUser SkynetUser { get; set; }
    }
    
    public class PortfolioModel
    {

    }

    public class FinancialAccountModel
    {

    }
    
    public class TradeModel
    {

    }

    public class DemoModel
    {
        public SkynetUser SkynetUser { get; set; }

        public ProfileModel ProfileModel { get; set; }

        public int ActiveStep { get; set; }
    }
}