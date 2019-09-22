# hdacjs-authorization-ui

This project help you to understand about HdacJS-lib. <br>
This provides a visual representation of inputs and outputs for verify, rsa encrypt, rsa decrypt, double encrypt (called effect encrypt) and double decrypt (called effect decrypt). 

## Let's Start
```sh
# If you don't have npm, please install npm first.

npm install 
npm start 
```


## What is React.JS?
 React is a JavaScript library for building user interfaces.<br>
 - Declarative <br>
 React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable and easier to debug.
 <br><br>
 - Component-Based <br>
 Build encapsulated components that manage their own state. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
  <br>
## What is hdaclib-js




## File Structure
```
hdacjs-authorization-ui
├── README.md
├── tsconfig.json
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── index.js
    ├── react-app-env.ts
    ├── serviceWorker.js
    ├── effect
    │   ├── App.css
    │   ├── fadeInDown.js
    │   ├── index.css
    │   ├── jqx.css
    │   ├── styles.js
    │   └── styles.css
    ├── img
    │   └── logo.png
    └── js
        ├── App.js
        ├── Header.js
        ├── InNOut.js
        ├── KeyListNew.tsx
        ├── creawteRowData.js
        └── lib
           ├── TabContent.js
           ├── TabLink.js
           ├── Tabs.js
           └── generatedate.ts
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run-script build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
