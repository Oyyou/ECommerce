using ECommerce.API.Interfaces;
using ECommerce.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ECommerce.API.Controllers
{
  [ApiController]
  [Route("api/auth")]
  public class AuthController : ControllerBase
  {
    private readonly IUserService _userService;
    private readonly IJwtService _jwtService;
    private readonly ITokenValidationService _tokenValidationService;

    public AuthController(
      IUserService userService,
      IJwtService jwtService,
      ITokenValidationService tokenValidationService)
    {
      _userService = userService;
      _jwtService = jwtService;
      _tokenValidationService = tokenValidationService;
    }

    [HttpGet("verify")]
    public IActionResult Verify()
    {
      var tokenString = Request.Headers.Authorization.FirstOrDefault()?.Split(" ").Last();

      if (string.IsNullOrEmpty(tokenString))
      {
        return Unauthorized(new { error = "Token not provided." });
      }

      try
      {
        var principal = _tokenValidationService.ValidateToken(tokenString);

        // Token is valid, retrieve user data and return it
        var userIdClaim = principal.FindFirst(ClaimTypes.Name);
        if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
        {
          var user = _userService.GetUserById(userId);
          if (user != null)
          {
            return Ok();
          }
        }

        return Unauthorized(new { error = "Invalid token." });
      }
      catch (Exception ex)
      {
        return Unauthorized(new { error = ex.ToString() });
      }
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
      var user = _userService.Authenticate(request);

      if (user == null)
      {
        return Unauthorized(new { error = "Invalid username or password." });
      }

      var token = _jwtService.GenerateToken(user);

      Response.Cookies.Append("jwt", token, new CookieOptions
      {
        HttpOnly = true
      });

      return Ok(new { token });
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
      //if (!Helpers.IsValidEmail(request.Email))
      //{
      //  return BadRequest("Email not valid");
      //}

      if (request.Password.Length < 4)
      {
        return BadRequest("Password too short");
      }

      if (_userService.EmailExists(request.Email))
      {
        return Conflict("Email is already taken");
      }

      var user = _userService.Register(request);

      var token = _jwtService.GenerateToken(user);

      return Ok(token);
    }
  }
}
