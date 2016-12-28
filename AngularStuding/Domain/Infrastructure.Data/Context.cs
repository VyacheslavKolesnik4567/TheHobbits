using AngularStuding.Domain.Core;
using System.Data.Entity;

namespace AngularStuding.Domain.Infrastructure.Data
{
    public class Context: DbContext
    {
        public Context()
        { }

        public DbSet<Hobbit> Hobbits { get; set; }
        public DbSet<Weapon> Weapons { get; set; }
    }
}