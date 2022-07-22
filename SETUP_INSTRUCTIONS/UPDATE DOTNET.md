> in terminal
  - check version:
    dotnet --info

> in browser:
  https://docs.microsoft.com/en-us/aspnet/core/migration/50-to-60?view=aspnetcore-6.0&tabs=visual-studio

  > in "Update the target framework" section
    - note internal code diff (outer tags copied should include "<PropertyGroup>")
    ** this should just be net6.0 instead of net5.0
  
  > in .csproj file
    - change net5.0 to net6.0
    - find and change version numbers in all other items in .csproj file:
      if they start with 5.#.., change to 6.0.0
  > in terminal:
    - stop everything
    - run:
      dotnet restore
      - look for errors
    - run:
      dotnet build
    - look for errors
    - run:
      dotnet watch run
    - address warnings

> in outer project folder:
  - create file: "GlobalUsings.cs"
  - take usings from all controllers and paste into this file, prefixing with ...
    global 
    ** (space after, (before using...)**
  - delete using statements from all controllers, but check for errors/conflicts. keep as needed.

## in future projects only
> in .csproj file
  - add nullable line after dotnet version line (<TargetFramework>net6.0</TargetFramework>)...
    <Nullable>enable</Nullable>
  - add "?" after all var declarations that have triggered warnings

