using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Diagnostics;

namespace ServiceLayer
{
    public static class SAC
    {
        public static void GetGraphData()
        {

        }

        public static void Main(String[] args)
        {
            //String jsonString = \"[ [ MTK, EWI ] , [ SPDR Morgan Stanley Technology (ETF) (the Fund), formerly Morgan Stanley Technology ETF, seeks to replicate as closely as possible the performance of the Morgan Stanley Technology Index (the Index). The Fund utilizes a passive or indexing approach and attempts to approximate the investment performance of its benchmark Index, by investing in a portfolio of stocks intended to replicate the index. The Fund's industry breakdown includes communications equipment, software, computers and peripherals, semiconductors and semiconductor equipment, information technology (IT) services, Internet software and services, Internet and catalog retail, and electronic equipment and instruments. The Fund's portfolio includes AMAZON.COM, INC, FIRST DATA CORP., JUNIPER NETWORKS, INC., APPLE, INC. and EMC CORP., iShares MSCI Italy Index Fund (the Fund) seeks to provide investment results that correspond generally to the price and yield performance of publicly traded securities in the aggregate in the Italian market, as measured by the MSCI Italy Index (the Index). The Index seeks to measure the performance of the Italian equity market. The Index is a capitalization-weighted index that aims to capture 85% of the (publicly available) total market capitalization. Component companies are adjusted for available float and must meet objective criteria for inclusion in the Index. The Index is reviewed quarterly.The Fund invests in a representative sample of securities included in the Index that collectively has an investment profile similar to the Index. The Fund's investment advisor is Barclays Global Fund Advisors. ] , [ 1, 0.98929396178451 ] , [ 0.097765769093033, 5.83539984993561 ] ]\";
            String jsonString = "[[\"MTK\",\"EWI\"],[\"SPDR Morgan Stanley Technology (ETF) (the Fund), formerly Morgan Stanley Technology ETF, seeks to replicate as closely as possible the performance of the Morgan Stanley Technology Index (the Index). The Fund utilizes a passive or indexing approach and attempts to approximate the investment performance of its benchmark Index, by investing in a portfolio of stocks intended to replicate the index. The Fund's industry breakdown includes communications equipment, software, computers and peripherals, semiconductors and semiconductor equipment, information technology (IT) services, Internet software and services, Internet and catalog retail, and electronic equipment and instruments. The Fund's portfolio includes AMAZON.COM, INC, FIRST DATA CORP., JUNIPER NETWORKS, INC., APPLE, INC. and EMC CORP., iShares MSCI Italy Index Fund (the Fund) seeks to provide investment results that correspond generally to the price and yield performance of publicly traded securities in the aggregate in the Italian market, as measured by the MSCI Italy Index (the Index). The Index seeks to measure the performance of the Italian equity market. The Index is a capitalization-weighted index that aims to capture 85% of the (publicly available) total market capitalization. Component companies are adjusted for available float and must meet objective criteria for inclusion in the Index. The Index is reviewed quarterly.The Fund invests in a representative sample of securities included in the Index that collectively has an investment profile similar to the Index. The Fund's investment advisor is Barclays Global Fund Advisors.\"],[\"1\",\"0.98929396178451\"],[\"0.097765769093033\",\"5.83539984993561\"]]";
            Debug.WriteLine(jsonString);
            //String jsonString = "[[\"vector1_val1\",\"vector1_val2\",\"vector1_val3\"],[\"vector2_val1\",\"vector2_val2\"],[\"vector3_val1\",\"vector3_val2\",\"vector3_val3\",\"vector3_val4\"],[\"vector4_val1\",\"vector4_val2\"]]";
            List<Object[]> data = JsonConvert.DeserializeObject<List<Object[]>>(jsonString);
            Object[] values = data[0];
            //dynamic dyn = JsonConvert.DeserializeObject(jsonString);
            Console.WriteLine("Done parsing.");
            /*Object facebookFriends = new JavaScriptSerializer().Deserialize<Object>(jsonString);

            foreach (var item in facebookFriends.data)
            {
                Console.WriteLine(\"id: {0}, name: {1}\", item.id, item.name);


            }

            //string value = client.DownloadString(\"https://api.instagram.com/v1/users/000000000/media/recent/?client_id=clientId\");

            // Write values.
            //res = value;
            dynamic dyn = JsonConvert.DeserializeObject(jsonString);*/
        }
    }
}
