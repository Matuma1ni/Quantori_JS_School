import { App } from './components/lists/App.js';
import { AppHeader } from './components/header/Header.js'
import './main.css'

(function () {



    /**
     * Render the app.
     * On change whole app is re-rendered.
     */
    async function renderHeader(){
        const appContainer = document.getElementById("functional-header");
        appContainer.innerHTML = "";
        appContainer.append(await AppHeader());
    }
    async function renderApp() {
        const appContainer = document.getElementById("functional-example");
        appContainer.innerHTML = "";
        appContainer.append(await App());
    }

    // initial render
    renderHeader();
    renderApp();
})();