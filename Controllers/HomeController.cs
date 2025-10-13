using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FE.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult TRANGCHU()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult DANGNHAP()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult GIOHANG()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult PRODUCTDETAIL()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult ThongTinDonHang()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult PHANCAMON()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}