using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AngularStuding.Domain.Core
{
    [Table("Weapon")]
    public class Weapon
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
        [JsonIgnore]
        [MaxLength(50)]
        public string Password { get; set; }

        [JsonIgnore]
        public ICollection<Hobbit> Hobbits { get; set; }
    }
}