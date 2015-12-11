using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SkynetInvestor.Startup))]
namespace SkynetInvestor
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
