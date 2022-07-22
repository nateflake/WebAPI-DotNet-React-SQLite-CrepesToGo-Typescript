## CREATE REACT APP
> In terminal:
    npx create-react-app react-app

## START REACT APP
> In ANOTHER terminal session:
    cd react-app
    npm start

## ADD ROBOTO FONT
> In browser:
    - find roboto in fonts.google.com
    - click "Select this style" next to desired font
> In resulting menu that appears:
    - select (•) Import option
    - copy text inside <style> tabs (style tabs NOT included)
> In react-app folder:
    > In src folder:
        > In index.css
            paste copied text at very top of file

## INSTALL REDUX COMPONENTS
> Components:
    redux
    react-redux
    redux-thunk
> In terminal:
    npm i -s redux react-redux redux-thunk
> In react-app folder:
    > In src folder:
        create folder called "actions"
        > In actions folder:
            create file called "store.js"
            create store in store.js (see file)
        > In App.js:
            replace boilerplate return value with a <Provider> (see file)
        create folder called "components"
        > In components folder:
            add file called "Products"
            add file called "ProductForm"
> In Extensions:
    search for and install:
        ES7+ React/Redux/React-Native snippets
        [you can now use abbreviations to generate snippets (boilerplate, generic code blocks)]
    
> In react-app folder:
    > In src folder:
        create folder called "reducers"
        > In reducers folder:
            create file called "product.js"

## ADD AXIOS FOR HTTP REQUESTS
> In Terminal:
    npm i -s axios
