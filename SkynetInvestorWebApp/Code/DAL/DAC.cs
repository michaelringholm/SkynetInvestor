using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace SkynetInvestorDAL
{
    public static class DAC
    {
        private static Object m_lock = new Object();

        public static void Main(String[] args)
        {
            Debug.WriteLine("**** Started *****");

            var assets = new List<Asset>();
            var asset = new Asset{ Acronym = "JKD"};
            assets.Add(asset);
            asset = new Asset{ Acronym = "AKK"};
            assets.Add(asset);
            var portfolio = new Portfolio{ Assets = assets };
            var user = new SkynetUser{ Portfolio = portfolio, MifidScore = 55 };

            StoreUser(@"C:\Data\Subversion\Google\SkynetInvestor\user_100500.xml", user);
            var restoredUser = RestoreUser(@"C:\Data\Subversion\Google\SkynetInvestor\user_100500.xml");

            Debug.WriteLine("**** Ended *****");
        }

        public static SkynetUser RestoreUser(String filePath)
        {
            lock (m_lock)
            {
                if (!(File.Exists(filePath)))
                    return null;

                var xmlSerializer = new XmlSerializer(typeof(SkynetUser));
                var fileStream = new FileStream(filePath, FileMode.Open);
                SkynetUser user = (SkynetUser)xmlSerializer.Deserialize(fileStream);
                fileStream.Close();

                return user;
            }            
        }

        public static void StoreUser(String filePath, SkynetUser user)
        {
            lock (m_lock)
            {
                var xmlSerializer = new XmlSerializer(typeof(SkynetUser));
                var fileStream = new FileStream(filePath, FileMode.Create);
                xmlSerializer.Serialize(fileStream, user);
                fileStream.Close();
            }
        }

        public static SkynetUser RestoreUser(string fileURI, string username)
        {
            throw new NotImplementedException();
        }
    }
}
