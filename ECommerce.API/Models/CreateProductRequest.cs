namespace ECommerce.API.Models
{
  public class CreateProductRequest
  {
    public string Name { get; set; }
    public double Price { get; set; }
    public IFormFile Image { get; set; }
  }
}
