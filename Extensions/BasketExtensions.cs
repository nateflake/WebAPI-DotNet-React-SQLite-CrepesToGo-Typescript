using System.Linq;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
  public static class BasketExtensions
  {

    public static BasketDto MapBasketToDto(this Basket basket)
    {
      return new BasketDto
      {
        Id = basket.Id,
        BuyerId = basket.BuyerId,
        Items = basket.Items.Select(item => new BasketItemDto
        {
          ProductId = item.ProductId,
          Name = item.Product.Name,
          Price = item.Product.Price,
          PictureUrl = item.Product.PictureUrl,
          Type = item.Product.Type,
          Brand = item.Product.Brand,
          Quantity = item.Quantity
        }).ToList()
      };
    }

    public static BasketDto MapTwoBasketsToSingleDto(this Basket basket1, Basket basket2)
    {
      if (basket1 == null) return basket2?.MapBasketToDto();
      if (basket2 == null) return basket1?.MapBasketToDto();

      foreach (var item in basket2.Items)
      {
        basket1.AddItem(item.Product, item.Quantity);
      }

      return basket1.MapBasketToDto();
    }

    public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
    {
      return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(b => b.BuyerId == buyerId);
    }
  }
}