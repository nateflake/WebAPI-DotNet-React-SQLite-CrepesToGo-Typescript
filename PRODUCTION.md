## REPLACE LOCALHOST
> in client folder
  - create file:
    .env.development
    - create variable:
      REACT_APP_API_URL=http://localhost:5000/api/
  - create file:
    .env.production    
    - create variable:
      REACT_APP_API_URL=/api/
> in agent.ts
  - replace url:
    baseURL = process.env.REACT_APP_API_URL;

## PREVENT SLEEP IN PRODUCTION
> in agent.ts
  - replace await sleep() line:
    if (process.env.NODE_ENV === 'development') await sleep();

## CREATE PRODUCTION FOLDER
  > in package.json
    > in "scripts"
      - edit "build":
        "build": "BUILD_PATH='../<main folder name>/wwwroot' react-scripts build",
          ** we used API as main folder name - could be anything **
          ** this will cause folder with files to be generated when the following is run in terminal (below)
  > In terminal (main folder)
    - stop npm
    - stop dotnet
    - cd into <react app folder> ("client")
    - run ...
          npm run build

## DB - PostGreSQL
  > Open Docker (download if needed)
  > In terminal (main folder)
    docker run --name dev -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest
      ** keep username and password very simple here for testing **
      ** docker port is by default 5432 (one for OS, one for docker, hence 2x)**
  > In docker
    > in Containers
      - click tiny text under postgres image title that says "dev" => shows logs | inspect | stats, etc.
  > In appsetting.development.json
    - Change "DefaultConnection" as follows:
      "DefaultConnection": "Server=localhost;Port=5432;User Id=appuser;Password=secret;Database=store",
  > In NuGet gallery 
    - find and install Npgsql.EntityFrameworkCore.PostgreSQL
      ** try choosing version with same major numbering or runtime, if not working **
  > In Startup.cs
    - replace services.AddDbContext<StoreContext>...
      FROM:
        opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
      TO:
        opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
  > In Data folder
    - delete Migrations folder
      ** currently for sqlite **
  > In Terminal (main)
    - stop API server
    - recreate migrations
      dotnet ef migrations add PostGresInitial -o Data/Migrations
  > In Extensions
    - install
      PostgreSQL by Chris Kolkman
        ** no db visible til api run (next step)
  > In Terminal (main)
    - restart API server
      dotnet watch run
        ** necessary to generate db **
  > In PostGres explorer (in side menu)
    - add a connection
      hostname:localhost
      user to authenticate as:appuser
      password:secret
      port:5432
      connection:Standard Connection
      db:store
      display name:store
    - [=> db will now appear in PostGres explorer]
    - right click on table and select "Run Select Top 1000" to see records

## Heroku (hosting)
  > At heroku.com
    - set up account
      - once logged in,
        > IN HEROKU DASHBOARD
          - create new app
            > top right of screen
              - click on "New"
              - select "Create New app"
                App name: crepes-to-go
                  ** optional - leave blank, and a random name is generated **
              - create app
          - Deployment method: Heroku Git
          -Install the Heroku CLI:
            > In terminal
              brew tap heroku/brew && brew install heroku
            - Log In
              > In terminal (main)
                heroku login
                [any key to login through browser]
                > In resulting brower
                  - log in
          > (back in heroku dashboard)
            > In section "Create a new Git repository"
              - copy last line " heroku git:remote -a crepes-to-go"
            > In terminal (main)
               heroku git:remote -a crepes-to-go
          > In "Resources tab" (top-ish horizontal menu)
            > In Add-ons section (middle of page)
              - search for "postgres"
              - select "Heroku Postgres"
                > In popup
                  - keep default "Hobby dev"
                  - click "submit order form" button
          > In "Settings tab" (top-ish horizontal menu)
            - click "reveal config vars" button (bottom of page)
            > In Config Vars section
              - note DATABASE_URL var
                ** will use later to set up config **
            > In "Buildpacks" section (left-hand side)
              - right-click on link "Find new buildpacks on Heroku Elements"
                > in resulting page
                  > in search bar: 
                    search for "dotnetcore"
                    > from results
                      - select 
                        dotnetcore-buildpack (by jincod)
                        > In resulting page
                          - copy .NET Core latest stable code:
                            heroku buildpacks:set jincod/dotnetcore
                        > In terminal (main)
                          - run pasted command:
                            heroku buildpacks:set jincod/dotnetcore

## ADD ENVIRONMENT VARS TO HEROKU
  > In Settings tab of Heroku
    - go to "Config Vars" section (get ready to create keys)
  > In appsetting.json
    - find "StripeSettings"
    - create string with sub-item WhSecret as follows:
      StripeSetting:WhSecret
    - paste into KEY col of Config Vars in Heroku settings page (left col)
    - paste actual WhSecret secret string (no quotes) into VALUE col (right col)
    - do same for other keys in StripeSettings
    - for JWTSettings:TokenKey, generate a token from a random generator (must be at least 13 chars, but 32 is better??)
  > In Startup.cs
    - replace AddDbContext block with (very long) Heroku version (see file)
  > In Heroku Config Vars
    - add one more key pair
      ASPNETCORE_ENVIRONMENT => Production

## COMMIT TO HEROKU
- commit all changes
> in Terminal (main)
  - commit to GitHub
    git push orgin main
  - commit to Heroku
    git push heroku main
