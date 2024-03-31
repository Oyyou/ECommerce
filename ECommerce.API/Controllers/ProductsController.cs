using ECommerce.API.Models;
using ECommerce.API.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers
{
  [ApiController]
  [Route("api/products")]
  public class ProductsController : ControllerBase
  {
    private readonly IWebHostEnvironment _env;
    private readonly IProductRepository _productRepository;

    public ProductsController(IWebHostEnvironment env, IProductRepository productRepository)
    {
      _env = env;
      _productRepository = productRepository;
    }


    [HttpGet]
    public IActionResult GetProducts()
    {
      var products = _productRepository.GetAllProducts();
      return Ok(products);
    }


    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var product = _productRepository.GetProductById(id);
      if (product == null)
      {
        return NotFound("Product not found");
      }

      return Ok(product);
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<IActionResult> CreateProduct([FromForm] CreateProductRequest request)
    {
      if (string.IsNullOrEmpty(request.Name))
      {
        return BadRequest("Product requires name");
      }

      if (request.Price <= 0)
      {
        return BadRequest("Product requires price");
      }

      if(request.Image == null)
      {
        return BadRequest("Product requires image");
      }

      try
      {
        var product = await _productRepository.CreateProduct(request.Name, request.Price);

        if (request.Image != null && request.Image.Length > 0)
        {
          var fileName = Path.GetFileName($"{product.Id}_Preview.jpg");
          var filePath = Path.Combine(_env.ContentRootPath, "Images", fileName);

          using (var stream = new FileStream(filePath, FileMode.Create))
          {
            await request.Image.CopyToAsync(stream);
          }
        }

        return Ok(product);
      }
      catch
      {
        return StatusCode(500, "Internal server error");
      }
    }
  }
}
