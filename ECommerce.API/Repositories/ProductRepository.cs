using ECommerce.API.Repositories.Interfaces;
using ECommerce.DAL;
using ECommerce.DAL.Entities;

namespace ECommerce.API.Repositories
{
  public class ProductRepository : IProductRepository
  {
    private ECommerceContext _context;

    public ProductRepository(ECommerceContext context)
    {
      _context = context;
    }

    public Product GetProductById(int id)
    {
      return _context.Products.FirstOrDefault(p => p.Id == id);
    }

    public IEnumerable<Product> GetAllProducts()
    {
      return _context.Products;
    }

    public async Task<Product> CreateProduct(string name, double price)
    {
      var product = await _context.Products.AddAsync(new Product()
      {
        Name = name,
        Price = price,
      });

      await _context.SaveChangesAsync();

      return product.Entity;
    }
  }
}
