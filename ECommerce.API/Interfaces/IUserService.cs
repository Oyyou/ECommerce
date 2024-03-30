using ECommerce.API.Models;
using ECommerce.DAL.Entities;

namespace ECommerce.API.Interfaces
{
  public interface IUserService
  {
    User Authenticate(LoginRequest request);
    User Register(RegisterRequest request);
    User GetUserById(int id);
    bool EmailExists(string email);
  }
}
