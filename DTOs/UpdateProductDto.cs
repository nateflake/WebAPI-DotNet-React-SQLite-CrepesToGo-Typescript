using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace WEB_API.DTOs
{
  public class UpdateProductDto
  {
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    [Range(1, Double.PositiveInfinity)]
    public long Price { get; set; }

    public IFormFile File { get; set; }

    [Required]
    public string Type { get; set; }

    [Required]
    public string Brand { get; set; }

    [Required]
    [Range(0, Double.PositiveInfinity)]
    public int QuantityInStock { get; set; }
  }
}