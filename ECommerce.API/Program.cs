
namespace ECommerce.API
{
  public class Program
  {
    private static IConfigurationRoot? configuration;

    public static void Main(string[] args)
    {
      try
      {
        SetupConfig();
        CreateHostBuilder(args).Build().Run();
      }
      catch
      {
        throw;
      }
    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
      return Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
          webBuilder
            .UseIIS()
            .ConfigureAppConfiguration((_, config) =>
            {
              config.SetBasePath(AppContext.BaseDirectory);
              config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
              config.AddEnvironmentVariables();
            })
            .UseStartup<Startup>();
        })
        .ConfigureServices((context, services) =>
        {
          services.AddSingleton(context.HostingEnvironment);
        });
    }

    private static void SetupConfig()
    {
      configuration = new ConfigurationBuilder()
        .SetBasePath(AppContext.BaseDirectory)
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .Build();
    }
  }
}
