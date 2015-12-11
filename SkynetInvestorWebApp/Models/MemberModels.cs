using SkynetInvestorDAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SkynetInvestor.Code.DTL;

namespace SkynetInvestor.Models
{
    public class MemberModel
    {
        public SkynetUser SkynetUser { get; set; }
    }

    public class TransactionDetailsControlModel
    {
        public List<TransactionDetailsItemDTO> TransactionDetailItems { get; set; }
    }
}