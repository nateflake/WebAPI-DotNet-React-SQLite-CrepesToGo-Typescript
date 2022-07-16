using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class BasketController : BaseApiCcontroller
  {
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
      var basket = await RetrieveBasket(GetBuyerId());

      if (basket == null) return NotFound();
      return basket.MapBasketToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
      var basket = await RetrieveBasket(GetBuyerId());
      if (basket == null) basket = CreateBasket();

      var product = await _context.Products.FindAsync(productId);
      if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

      basket.AddItem(product, quantity);

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

      return BadRequest(new ProblemDetails { Title = "Problem saving item to basket." });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
      var basket = await RetrieveBasket(GetBuyerId());
      if (basket == null) basket = CreateBasket();

      basket.RemoveItem(productId, quantity);

      var result = await _context.SaveChangesAsync() > 0;
      if (result) return Ok();

      return BadRequest(new ProblemDetails { Title = "Problem removing item from basket." });
    }

    // #### ENDPOINT ONLY ####
    [HttpGet("GetAndDeleteAllBaskets")]
    public async Task<ActionResult<List<Basket>>> GetAndDeleteAllBaskets()
    {
      var baskets = await _context.Baskets.ToListAsync();
      foreach (var basket in baskets)
      {
        var basketDto = basket.MapBasketToDto();
        var basketId = basketDto.Id;
        await RemoveBasket(basketId);
      }
      return Ok();
    }

    // #### ENDPOINT ONLY ####
    [HttpDelete("RemoveBasket")]
    public async Task<ActionResult<Basket>> RemoveBasket(int basketId)
    {
      var basket = await _context.Baskets.FindAsync(basketId);
      if (basket == null)
      {
        return NotFound();
      }

      _context.Baskets.Remove(basket);
      await _context.SaveChangesAsync();

      return basket;
    }

    private async Task<Basket> RetrieveBasket(string buyerId)
    {
      if (string.IsNullOrEmpty(buyerId))
      {
        Response.Cookies.Delete("buyerId");
        return null;
      }

      return await _context.Baskets
      .Include(i => i.Items)
      .ThenInclude(p => p.Product)
      .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
    }

    private string GetBuyerId()
    {
      return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }

    private Basket CreateBasket()
    {
      var buyerId = User.Identity?.Name;
      if (string.IsNullOrEmpty(buyerId))
      {
        buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
          IsEssential = true,
          Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);
      }
      var basket = new Basket { BuyerId = buyerId };
      _context.Baskets.Add(basket);
      return basket;
    }
  }
}