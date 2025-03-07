using Microsoft.EntityFrameworkCore;

namespace DynamicFormAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Form> Forms { get; set; }
        public DbSet<FormResponse> FormResponses { get; set; }
    }
}
