using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkynetInvestor.Code.DTL
{
    public class TransactionDetailsItemDTO
    {
        public String Acronym { get; set; }
        public String BuySellCode { get; set; }
        public int Count { get; set; }
        public Decimal Amount { get; set; }
    }
}