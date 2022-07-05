using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class ProductsController : BaseApiCcontroller
  {
    private readonly StoreContext _context;

    public ProductsController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams
      )
    {
      var query = _context.Products
        .Sort(productParams.OrderBy)
        .Search(productParams.SearchTerm)
        .Filter(productParams.Brands, productParams.Types)
        .AsQueryable();

      var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

      Response.AddPaginationHeader(products.MetaData);

      return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);

      if (product == null) return NotFound();

      return product;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int id, Product product)
    {
      product.Id = id;

      _context.Entry(product).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ProductExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
      _context.Products.Add(product);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetProduct", new { id = product.Id }, product);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Product>> DeleteProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);
      if (product == null)
      {
        return NotFound();
      }

      _context.Products.Remove(product);
      await _context.SaveChangesAsync();

      return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
      var brands = await _context.Products.Select(P => P.Brand).Distinct().ToListAsync();
      var types = await _context.Products.Select(P => P.Type).Distinct().ToListAsync();
      return Ok(new { brands, types });
    }

    private bool ProductExists(int id)
    {
      return _context.Products.Any(e => e.Id == id);
    }

  }
}