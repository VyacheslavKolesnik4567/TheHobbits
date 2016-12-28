using AngularStuding.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularStuding.Domain.Infrastructure.Data
{
    public class WeaponRepository
    {
        Context db;

        public WeaponRepository(Context db)
        {
            this.db = db;
        }

        public void Create(Weapon item)
        {
            try
            {
                db.Weapons.Add(item);
            }
            catch
            {
                throw;
            }
        }

        public Weapon Get(int id)
        {
            try
            {
                return db.Weapons.Find(id);
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<Weapon> GetItems(Func<Weapon, bool> func = null)
        {
            try
            {
                if (func != null)
                    return db.Weapons.Where(func).ToList();
                return db.Weapons.ToList();
            }
            catch
            {
                throw;
            }
        }

        public bool Remove(int id)
        {
            try
            {
                var weapon = db.Weapons.Find(id);
                if (weapon != null)
                {
                    db.Weapons.Remove(weapon);
                    return true;
                }

                return false;
            }
            catch
            {
                throw;
            }
        }

        public string Update(Weapon item)
        {
            try
            {
                var weapon = db.Weapons.Find(item.Id);
                string oldPhoto = weapon.Picture;
                weapon.Name = item.Name;
                weapon.Picture = item.Picture;

                return oldPhoto;
            }
            catch
            {
                throw;
            }
        }
    }
}