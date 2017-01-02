using AngularStuding.Core;
using AngularStuding.Domain.Infrastructure.Data;
using System;
using System.Web;
using System.Web.Mvc;

namespace AngularStuding.Controllers
{
    public class HobbitController : Controller
    {
        UnitOfWork db;

        public HobbitController()
        {
            db = new UnitOfWork();
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

        public string GetHobbits()
        {
            return db.Hobbits.GetItems().ToJson();
        }

        public string AddHobbit(string Name, int Age, string Photo, int WeaponId, string Info, string Password, HttpPostedFileBase PhotoFile)
        {
            try
            {
                if (PhotoFile != null)
                {
                    Photo = new ImageHelper()
                        .SaveUploadedImage(PhotoFile, PhotoFile.FileName.Substring(0, PhotoFile.FileName.Length - 4), this.Server);
                }
                else
                    if (Photo != null)
                {
                    Photo = new ImageHelper().SaveImageFromLink(Photo);
                }
                if (Photo == null) throw new Exception("Photo must be selected.");

                db.Hobbits.Create(new Domain.Core.Hobbit()
                {
                    Name = Name,
                    Age = Age,
                    Info = Info,
                    Photo = Photo,
                    WeaponId = WeaponId,
                    Password = Password
                });
                db.Save();

                return new Answer(AnswerCode.HobbitCreated).ToJson();
            }
            catch (Exception ex)
            {
                return new Answer(AnswerCode.Failed, ex.Message).ToJson();
            }
        }

        public string RemoveHobbit(int? id, string photo, string password)
        {
            try
            {
                bool result = false;
                if (id != null)
                {
                    if (db.Hobbits.Get((int)id).Password != password)
                        return new Answer(AnswerCode.HobbitWrongPassword, "Wrong password.").ToJson();
                    result = db.Hobbits.Remove((int)id);
                    db.Save();
                    new ImageHelper().RemoveImage(photo);
                }
                if (result)
                    return new Answer(AnswerCode.HobbitRemoved).ToJson();
                else
                    return new Answer(AnswerCode.HobbitNotFound, "No hobbit with id = " + id.ToString()).ToJson();
            }
            catch (Exception ex)
            {
                return new Answer(AnswerCode.Failed, ex.Message).ToJson();
            }
        }

        public string EditHobbit(int Id, string Name, int Age, string Photo, int WeaponId, string Info, string Password, HttpPostedFileBase PhotoFile)
        {
            try
            {
                if (db.Hobbits.Get((int)Id).Password != Password)
                    return new Answer(AnswerCode.HobbitWrongPassword, "Wrong password.").ToJson();

                if (PhotoFile != null)
                {
                    Photo = new ImageHelper()
                        .SaveUploadedImage(PhotoFile, PhotoFile.FileName.Substring(0, PhotoFile.FileName.Length - 4), this.Server);
                }
                else
                    if (Photo != null)
                {
                    Photo = new ImageHelper().SaveImageFromLink(Photo);
                }

                string oldPhoto = db.Hobbits.Update(new Domain.Core.Hobbit()
                {
                    Id = Id,
                    Name = Name,
                    Age = Age,
                    Info = Info,
                    Photo = Photo,
                    WeaponId = WeaponId
                });
                db.Save();
                new ImageHelper().RemoveImage(oldPhoto);
                return new Answer(AnswerCode.HobbitUpdated).ToJson();
            }
            catch (Exception ex)
            {
                return new Answer(AnswerCode.Failed, ex.Message).ToJson();
            }
        }
    }
}