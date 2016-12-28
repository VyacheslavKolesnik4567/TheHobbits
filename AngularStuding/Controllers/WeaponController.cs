using AngularStuding.Core;
using AngularStuding.Domain.Infrastructure.Data;
using System.Web.Mvc;

namespace AngularStuding.Controllers
{
    public class WeaponController : Controller
    {
        UnitOfWork db;

        public WeaponController()
        {
            db = new UnitOfWork();
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

        public string GetWeapons()
        {
            return db.Weapons.GetItems().ToJson();
        }
    }
}