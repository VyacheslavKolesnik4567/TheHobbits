namespace AngularStuding.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPasword : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Hobbit", "Password", c => c.String(maxLength: 50));
            AddColumn("dbo.Weapon", "Password", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Weapon", "Password");
            DropColumn("dbo.Hobbit", "Password");
        }
    }
}
