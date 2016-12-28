using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularStuding.Domain.Infrastructure.Data
{
    public class UnitOfWork: IDisposable
    {
        Context db;
        bool disposed = false;
        HobbitRepository hobbitRepository;
        WeaponRepository weaponRepository;

        public UnitOfWork()
        {
            db = new Context();
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public WeaponRepository Weapons
        {
            get
            {
                if (weaponRepository == null)
                    weaponRepository = new WeaponRepository(db);
                return weaponRepository;
            }
        }

        public HobbitRepository Hobbits {
            get
            {
                if (hobbitRepository == null)
                    hobbitRepository = new HobbitRepository(db);
                return hobbitRepository;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                disposed = true;
            }
        }
    }
}