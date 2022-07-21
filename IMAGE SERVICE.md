## INCORPORATE CLOUDINARY
> At cloudinary.com
  - create an account
  - go to dashboard
  - view:
    • Cloud name
    • API key
    • User Secret
  - add those 3 items to appsettings.json
      ** this file is not in .gitignore so shielded from public view
> In Terminal (project folder)
  - go to API folder
      cd API
  - register cloud name
    dotnet user-secrets set "Cloudinary:CloudName" <cloud name>
  - register api key
    dotnet user-secrets set "Cloudinary:ApiKey" <api key>    
  - register user secret
    dotnet user-secrets set "Cloudinary:ApiSecret" <user secret>

## ## migration (b/c PublicId (cloudinary) field added to Product.cs)
> In Terminal (project folder)
  - first STOP dotnet
  - migrate
    dotnet ef migrations add PublicIdAdded
