using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Data
{
  public static class DbInitializer
  {
    public static void Initialize(StoreContext context)
    {
      if (context.Products.Any()) return;

      var products = new List<Product>
      {
        new Product
          {
          Name = "Classic Crepe",
          Description = "Faithfully adheres to the orignial crepe recipe as developed by the Belges of yore.",
          Price = 150,
          PictureUrl = "/images/products/crepes/classic_crepe.png",
          Type = "crepe",
          Brand = "Belgique",
          QuantityInStock = 10000
        },
        new Product
          {
          Name = "American Crepe",
          Description = "Objectively disgusting, but somehow our most popular.",
          Price = 200,
          PictureUrl = "/images/products/crepes/american_crepe.png",
          Type = "crepe",
          Brand = "Creppies",
          QuantityInStock = 2500
        },
        new Product
          {
          Name = "French Crepe",
          Description = "The ultimate improvement over the Belgian classic.",
          Price = 250,
          PictureUrl = "/images/products/crepes/french_crepe.png",
          Type = "crepe",
          Brand = "Meilleurs",
          QuantityInStock = 1500
        },
        new Product
          {
          Name = "Fruit Crepe",
          Description = "Special recipe that can tolerate the extra juices of a fruit topping without getting soggy.  Note: without a fruit topping, the consistency will be overly dry and pasty.",
          Price = 250,
          PictureUrl = "/images/products/crepes/fruit_crepe.png",
          Type = "crepe",
          Brand = "FruityFlapjacks",
          QuantityInStock = 500
        },
        new Product
          {
          Name = "Mixed Berry Topping",
          Description = "Blueberries, blackberries, raspberries.",
          Price = 250,
          PictureUrl = "/images/products/crepes/toppings/mixed_berry.png",
          Type = "topping",
          Brand = "FlatToppers",
          QuantityInStock = 100
        },
        new Product
          {
          Name = "Blueberry Topping",
          Description = "Just blueberries, but very fresh.",
          Price = 250,
          PictureUrl = "/images/products/crepes/toppings/blueberry.png",
          Type = "topping",
          Brand = "FlatToppers",
          QuantityInStock = 75
        },
        new Product
          {
          Name = "Raspberry Topping",
          Description = "Just raspberries, but very fresh.",
          Price = 250,
          PictureUrl = "/images/products/crepes/toppings/raspberry.png",
          Type = "topping",
          Brand = "FlatToppers",
          QuantityInStock = 75
        },
        new Product
          {
          Name = "Blackberry Topping",
          Description = "Just blackberries, but very fresh.",
          Price = 250,
          PictureUrl = "/images/products/crepes/toppings/blackberry.png",
          Type = "topping",
          Brand = "FlatToppers",
          QuantityInStock = 25
        },
        new Product
          {
          Name = "Nutella",
          Description = "That heavenly hazelnut spread.",
          Price = 100,
          PictureUrl = "/images/products/crepes/toppings/nutella.png",
          Type = "topping",
          Brand = "FlatToppers",
          QuantityInStock = 175
        },
        new Product
          {
          Name = "Organic Hazy Spread",
          Description = "Like Nutella but all natural.",
          Price = 200,
          PictureUrl = "/images/products/crepes/toppings/organic_hazy_spread.png",
          Type = "topping",
          Brand = "Natural Spreads",
          QuantityInStock = 50
        },
        new Product
          {
          Name = "Poo's Hunny Spread",
          Description = "Yes, honey!",
          Price = 50,
          PictureUrl = "/images/products/crepes/toppings/poos_hunny_spread.png",
          Type = "topping",
          Brand = "FlatToppers",
          QuantityInStock = 75
        },
        new Product
          {
          Name = "Sucre Glace",
          Description = "Powdered Sugar",
          Price = 75,
          PictureUrl = "/images/products/crepes/toppings/powdered_sugar.png",
          Type = "topping",
          Brand = "Final Confection",
          QuantityInStock = 500
        },
        new Product
          {
          Name = "Boulle de Glace - Vanille",
          Description = "Scoop of vanilla ice cream on the side.",
          Price = 375,
          PictureUrl = "/images/products/crepes/toppings/ice_cream_vanilla.png",
          Type = "topping",
          Brand = "Glace a la Mode",
          QuantityInStock = 50
        },
        new Product
          {
          Name = "Cidre",
          Description = "Glass of cider to accompany your crepe.",
          Price =750,
          PictureUrl = "/images/products/drinks/cidre.png",
          Type = "drink",
          Brand = "BubblesOfCheer",
          QuantityInStock = 1000
        },
        new Product
          {
          Name = "Fancy Box - Petit",
          Description = "Carry your small stack of crepes safely, and present them confidently to even your snobbiest acquaintance.",
          Price = 50,
          PictureUrl = "/images/products/boxes/petit.png",
          Type = "box",
          Brand = "Prezentables",
          QuantityInStock = 1000
        },
        new Product
          {
          Name = "Fancy Box - Moyen",
          Description = "Carry your medium stack of crepes safely, and present them confidently to even your snobbiest acquaintance.",
          Price = 75,
          PictureUrl = "/images/products/boxes/moyen.png",
          Type = "box",
          Brand = "Prezentables",
          QuantityInStock = 500
        },
        new Product
          {
          Name = "Fancy Box - Grand",
          Description = "Carry your large stack of crepes safely, and present them confidently to even your snobbiest acquaintance.",
          Price = 100,
          PictureUrl = "/images/products/boxes/grand.png",
          Type = "box",
          Brand = "Prezentables",
          QuantityInStock = 100
        },
        new Product
          {
          Name = "Fancy Box - Fete",
          Description = "Carry your party-size stack of crepes safely, and present them confidently to even your snobbiest acquaintance.",
          Price = 250,
          PictureUrl = "/images/products/boxes/fete.png",
          Type = "box",
          Brand = "Prezentables",
          QuantityInStock = 25
        }
      };

      foreach (var product in products)
      {
        context.Products.Add(product);
      }

      context.SaveChanges();
    }
  }
}



