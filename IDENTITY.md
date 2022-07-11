## SET UP ASP.NET IDENTITY
> In NuGet Gallery:
  - Search for and select...
      Microsoft.AspNetCore.Authentication.JwtBearer
  - Search for and select...
      Microsoft.AspNetCore.Identity.EntityFrameworkCore

## MIGRATE
> after setting up migration files...
  > In terminal (main folder)
    dotnet ef migrations add IdentityAdded

## FORM MANAGEMENT - REACT HOOK FORM
> in terminal
  cd into <react app folder> ("client")
    npm install react-hook-form

## REBUILDING DB AFTER SWITCHING TO ROLE AND INT ID'S
> in terminal (main)
  dotnet ef migrations add OrderEntityAdded -o Data/Migrations

## ADDING YUP FOR FORM VALIDATION
> in terminal
  cd into <react app folder> ("client")
    npm install @hookform/resolvers yup
