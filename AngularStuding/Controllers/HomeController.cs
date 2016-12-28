using AngularStuding.Core;
using System;
using System.Net;
using System.Web.Mvc;
using AngularStuding.Domain.Infrastructure.Data;
using System.Web;

namespace AngularStuding.Controllers
{
    public class HomeController : Controller
    {  
        public ActionResult Index()
        {
            return View();
        }               
    }
}