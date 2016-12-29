namespace AngularStuding.Domain.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<Infrastructure.Data.Context>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "AngularStuding.Domain.Infrastructure.Data.Context";
        }

        protected override void Seed(Infrastructure.Data.Context context)
        {

        }
    }
}
