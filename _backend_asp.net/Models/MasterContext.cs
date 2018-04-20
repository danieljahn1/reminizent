using Microsoft.EntityFrameworkCore;

namespace reminizent_backend
{
    public class MasterContext : DbContext
    {
        public MasterContext(DbContextOptions<MasterContext> options) : base(options)
        {

        }
        public DbSet<Admin> Admins { get; set; }
    }
}
