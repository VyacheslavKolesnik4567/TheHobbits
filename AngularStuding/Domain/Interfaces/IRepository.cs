using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularStuding.Domain.Interfaces
{
    interface IRepository<T> where T: class
    {
        IEnumerable<T> GetItems(Func<T, bool> func = null);
        T Get(int id);
        void Create(T item);
        string Update(T item);
        bool Remove(int id);
    }
}
