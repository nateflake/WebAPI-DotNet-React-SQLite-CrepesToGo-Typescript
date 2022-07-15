## STRIPE SETUP
> at stripe.com
  - set up account
  > In developers section
    > In API Keys section
      - copy publishable key
        > In appsettings.json (blocked from view b/c in .gitignore)
          - store key
      - do same for private key 

## STRIPE PACKAGE for VSCODE
> In Nuget Gallery
  - search and install Stripe.Net

## UPDATE DB WITH STRIPE KEY COLS
> In terminal:
  - quit dotnet
  - dotnet ef migrations add PaymentIntentadded

## ADD STRIPE API
> On web page: https://stripe.com/docs/stripe-js/react:
  Copy command in "Setup section" for pasting in terminal
  > In Terminal (main):
    cd into <react app folder> ("client") 
      npm install --save @stripe/react-stripe-js @stripe/stripe-js

## ADD STRIPE CLI
> On web page "Install Stripe CLI"
  - find download option (e.g., "homebrew")
  - Log in via Terminal:
          stripe login
    - note resulting pairing code
    - press enter to open login page in browser (pairing code should appear)
    - confirm in browser

## ADD STRIPE SIGNING SECRET
  > In Terminal (main):
      stripe listen
      - Copy resulting signing secret
  > In appsettings.Development.json
    > In "StripeSettings"
      - add new key called "WhSecret" and set as copied signing secret
  > Once set up, in Terminal:
    - quit stripe listen (control + c)
    - restart, but with forwarding ...
        stripe listen -f http://localhost:5000/api/payments/webhook -e charge.succeeded

      
## PREPARE FOR LIVE VERSION
> In stripe.com > Developers > Webhooks  
  - select "add an endpoint" (button near bottom center of page) and login
    - copy live url for main page (https://crepes-to-go.herokuapp.com/)
    - paste into stripe.com "Endpoint URL" field WITH ... api/payments/webhook
        ** correct if controller is named "payments" and crud operation (post) is called "webhook" **
    - click " + Select events" button
    - select ...
      charge > charge.succeeded
        ** the only one needed **
    - click "add events"
    - click "add endpoint"
