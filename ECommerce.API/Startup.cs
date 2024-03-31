using ECommerce.API.Interfaces;
using ECommerce.API.Models;
using ECommerce.API.Repositories;
using ECommerce.API.Repositories.Interfaces;
using ECommerce.API.Services;
using ECommerce.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using Serilog;
using System.Text;

namespace ECommerce.API
{
  public class Startup
  {
    private readonly IWebHostEnvironment _env;
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment env)
    {
      Configuration = configuration;
      _env = env;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      var connectionString = Configuration.GetConnectionString("PostgreSqlConnection");

      var npgBuilder = new NpgsqlConnectionStringBuilder(connectionString);

      // Add the DbContext and call the seed method
      services.AddDbContext<ECommerceContext>(options => options.UseNpgsql(npgBuilder.ConnectionString, b => b.MigrationsAssembly("ECommerce.DAL")));

      AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
      AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

      services.AddControllers();
      services.AddEndpointsApiExplorer();
      services.AddSwaggerGen();

      Log.Logger = new LoggerConfiguration()
          .ReadFrom.Configuration(Configuration)
          .WriteTo.File(GetLogFileName(), rollingInterval: RollingInterval.Day)
          .CreateLogger();

      services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
      services.Configure<ConnectionStrings>(Configuration.GetSection("ConnectionStrings"));

      var appSettings = Configuration.GetSection("AppSettings").Get<AppSettings>();
      var key = Encoding.ASCII.GetBytes(appSettings.Secret);

      services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(options =>
      {
        options.TokenValidationParameters = new TokenValidationParameters
        {
          ValidIssuer = appSettings.Issuer,
          ValidAudience = appSettings.Audience,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = false,
          ValidateIssuerSigningKey = true,
          ClockSkew = TimeSpan.Zero
        };
      });

      services.AddAuthorization(options =>
      {
        options.DefaultPolicy = new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
            .RequireAuthenticatedUser()
            .Build();
      });

      var connectionStrings = Configuration.GetSection("ConnectionStrings").Get<ConnectionStrings>();

      if (connectionStrings != null)
      {
        services.AddSingleton(connectionStrings);
      }

      services.AddScoped<IJwtService, JwtService>();
      services.AddScoped<IUserService, UserService>();
      services.AddScoped<ITokenValidationService, JwtTokenValidationService>();

      services.AddScoped<IProductRepository, ProductRepository>();
      services.AddLogging(loggingBuilder =>
      {
        loggingBuilder.AddSerilog();
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app)
    {
      if (_env.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }

      app.UseHttpsRedirection();

      app.UseStaticFiles(new StaticFileOptions
      {
          FileProvider = new PhysicalFileProvider(Path.Combine(_env.ContentRootPath, "Images")),
          RequestPath = "/content"
      });

      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseCors(x => x
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }

    private static string GetLogFileName()
    {
      string directory = "Logs"; // Specify the directory for log files
      string fileName = $"log-{DateTime.Now:yyyy-MM-dd}.txt"; // Dynamic file name with date timestamp
      return Path.Combine(directory, fileName);
    }
  }
}
