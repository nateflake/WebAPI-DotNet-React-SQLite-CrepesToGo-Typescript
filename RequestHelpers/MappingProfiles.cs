using API.Entities;
using AutoMapper;
using WEB_API.DTOs;

namespace WEB_API.RequestHelpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<CreateProductDto, Product>();
      CreateMap<UpdateProductDto, Product>();
    }
  }
}