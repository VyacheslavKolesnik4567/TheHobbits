using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AngularStuding.Domain.Core
{
    [Table("Hobbit")]
    public class Hobbit
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        public int Age { get; set; }
        public int WeaponId { get; set; }
        public string Photo { get; set; }
        public string Info { get; set; }
        [JsonIgnore]
        [MaxLength(50)]
        public string Password { get; set; }

        [JsonIgnore]
        public Weapon Weapon { get; set; }
    }
}