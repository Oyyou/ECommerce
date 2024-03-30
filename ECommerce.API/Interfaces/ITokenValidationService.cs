using System.Security.Claims;

namespace ECommerce.API.Interfaces
{
  public interface ITokenValidationService
  {
    ClaimsPrincipal ValidateToken(string token);
  }
}
