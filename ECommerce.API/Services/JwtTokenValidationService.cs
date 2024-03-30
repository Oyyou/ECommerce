using ECommerce.API.Interfaces;
using ECommerce.API.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerce.API.Services
{
  public class JwtTokenValidationService : ITokenValidationService
  {
    private readonly AppSettings _appSettings;

    public JwtTokenValidationService(IOptions<AppSettings> appSettings)
    {
      _appSettings = appSettings.Value;
    }

    public ClaimsPrincipal ValidateToken(string token)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var validationParameters = GetValidationParameters();

      return tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
    }

    private TokenValidationParameters GetValidationParameters()
    {
      var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

      return new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
      };
    }
  }
}
