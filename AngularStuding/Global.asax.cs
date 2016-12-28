using AngularStuding.Domain.Infrastructure.Data;
using System.Data.Entity;
using System.Web.Mvc;
using System.Web.Routing;

namespace AngularStuding
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            //Database.SetInitializer(new DropCreateDatabaseIfModelChanges<Context>());
            //using (Context db = new Domain.Infrastructure.Data.Context())
            //{
            //    db.Weapons.Add(new Domain.Core.Weapon() { Id = 0 });
            //}
        }
    }
}
