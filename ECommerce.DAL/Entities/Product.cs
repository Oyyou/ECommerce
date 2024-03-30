using System.ComponentModel.DataAnnotations;

namespace ECommerce.DAL.Entities
{
  public class Product : IEntity
  {
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
  }
}
