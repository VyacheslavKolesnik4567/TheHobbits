using AngularStuding.Domain.Core;
using AngularStuding.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AngularStuding.Domain.Infrastructure.Data
{
    public class HobbitRepository : IRepository<Hobbit>
    {
        Context db;

        public HobbitRepository(Context db)
        {
            this.db = db;
        }

        public void Create(Hobbit item)
        {
            try
            {
                db.Hobbits.Add(item);
            }
            catch
            {
                throw;
            }
        }

        public Hobbit Get(int id)
        {
            try
            {
                return db.Hobbits.FirstOrDefault(x=>x.Id == id);
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<Hobbit> GetItems(Func<Hobbit, bool> func = null)
        {
            try
            {
                if (func != null)
                    return db.Hobbits.Where(func).ToList();
                return db.Hobbits.ToList();
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
                var hobbit = db.Hobbits.Find(id);
                if (hobbit != null)
                {
                    db.Hobbits.Remove(hobbit);
                    return true;
                }

                return false;
            }
            catch
            {
                throw;
            }
        }

        public string Update(Hobbit item)
        {
            try
            {
                string oldPhoto = null;
                var hobbit = db.Hobbits.Find(item.Id);
                hobbit.Age = item.Age;
                hobbit.Info = item.Info;
                hobbit.WeaponId = item.WeaponId;
                hobbit.Name = item.Name;
                if (item.Photo != null)
                {
                    oldPhoto = hobbit.Photo;
                    hobbit.Photo = item.Photo;
                }

                return oldPhoto;
            }
            catch
            {
                throw;
            }
        }
    }
}