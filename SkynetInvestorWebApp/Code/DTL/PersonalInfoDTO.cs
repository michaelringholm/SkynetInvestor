using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkynetInvestor.Code.DTL
{
    public class PersonalInfoDTO
    {
        public String FullName { get; set; }
        public String AddressLine { get; set; }
        public String ZipCode { get; set; }
        public String City { get; set; }
        public String Country { get; set; }
        public String Email { get; set; }
        public String PhoneNumber { get; set; }
    }
}