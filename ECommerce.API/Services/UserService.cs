using ECommerce.API.Interfaces;
using ECommerce.API.Models;
using ECommerce.DAL;
using ECommerce.DAL.Entities;

namespace ECommerce.API.Services
{
  public class UserService : IUserService
  {
    private readonly ECommerceContext _context;

    public UserService(ECommerceContext context)
    {
      _context = context;
    }

    public User Authenticate(LoginRequest request)
    {
      var user = _context.Users.SingleOrDefault(u => u.Email == request.Email);

      if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
      {
        return null;
      }

      return user;
    }

    public User Register(RegisterRequest request)
    {
      var newUser = new User()
      {
        Email = request.Email,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
      };

      _context.Users.Add(newUser);
      _context.SaveChanges();

      return newUser;
    }

    public User GetUserById(int id) => _context.Users
      .SingleOrDefault(u => u.Id == id);

    public bool EmailExists(string email)
    {
      return _context.Users.Any(u => u.Email == email);
    }
  }
}
