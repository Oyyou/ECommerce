using ECommerce.DAL.Entities;

namespace ECommerce.API.Interfaces
{
  public interface IJwtService
  {
    public string GenerateToken(User user);
  }
}
