using System;
using System.Web;
using System.Net;
using System.IO;

namespace AngularStuding.Core
{
    public class ImageHelper
    {
        public string SaveUploadedImage(HttpPostedFileBase PhotoFile, string localName, HttpServerUtilityBase server)
        {
            try
            {
                if (PhotoFile.ContentType != "image/png" && PhotoFile.ContentType != "image/jpeg")
                    throw new Exception("File has wrong type. (Types needed: *.png, *.jpeg)");

                if (File.Exists(server.MapPath("~/Content/Images/Hobbits/" + localName + ".png")))
                {
                    localName = localName + Guid.NewGuid().ToString() + ".png";
                }
                
                PhotoFile.SaveAs(server.MapPath("~/Content/Images/Hobbits/" + localName + ".png"));

                return "Content/Images/Hobbits/" + localName + ".png";
            }
            catch(PathTooLongException pathTooLongEx)
            {
                throw new PathTooLongException("File name is too long.", pathTooLongEx);
            }
            catch
            {
                throw;
            }
        }

        public string SaveImageFromLink(string address, string localName = "hobbitImg")
        {
            WebResponse response = null;
            try
            {
                var request = WebRequest.Create(address);
                response = request.GetResponse();
                if (response.ContentType != "image/png" && response.ContentType != "image/jpg")
                    throw new Exception("File has wrong type. (Types needed: *.png, *.jpg)");

                var guid = Guid.NewGuid().ToString();

                string localFilename = HttpRuntime.AppDomainAppPath + "/Content/Images/Hobbits/" + localName + guid + ".png";

                using (WebClient client = new WebClient())
                {
                    client.DownloadFile(address, localFilename);
                }

                return "/Content/Images/Hobbits/" + localName + guid + ".png";
            }
            catch(WebException webEx)
            {
                throw new WebException("File " + address + " not found.", webEx);
            }
            catch(UriFormatException)
            {
                throw new UriFormatException("Link has wrong format.");
            }
            catch
            {
                throw;
            }
            finally
            {
                if (response != null)
                    response.Close();
            }
        }

        public void RemoveImage(string path)
        {
            try
            {

                if (path != null && File.Exists(HttpRuntime.AppDomainAppPath + path))
                    File.Delete(HttpRuntime.AppDomainAppPath + path);
            }
            catch(Exception)
            {
                throw;
            }
        }
    }
}