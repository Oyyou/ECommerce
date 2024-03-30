namespace ECommerce.DAL.Entities
{
  public class User : IEntity
  {
    public int Id { get; set; }
    public string Email { get; set; }
    public required string PasswordHash { get; set; }
  }
}
