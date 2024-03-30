using ECommerce.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.DAL
{
  public class ECommerceContext : DbContext
  {
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }

    public ECommerceContext(DbContextOptions<ECommerceContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // Call the base class implementation
      base.OnModelCreating(modelBuilder);
    }
  }
}
