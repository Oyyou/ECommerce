using ECommerce.DAL.Entities;

namespace ECommerce.API.Repositories.Interfaces
{
  public interface IProductRepository
  {
    Product? GetProductById(int id);
    IEnumerable<Product> GetAllProducts();
    Task<Product> CreateProduct(string name, double price);
  }
}
