namespace AngularStuding.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Hobbit",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                        Age = c.Int(nullable: false),
                        WeaponId = c.Int(nullable: false),
                        Photo = c.String(),
                        Info = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Weapon", t => t.WeaponId, cascadeDelete: true)
                .Index(t => t.WeaponId);
            
            CreateTable(
                "dbo.Weapon",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Picture = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Hobbit", "WeaponId", "dbo.Weapon");
            DropIndex("dbo.Hobbit", new[] { "WeaponId" });
            DropTable("dbo.Weapon");
            DropTable("dbo.Hobbit");
        }
    }
}
