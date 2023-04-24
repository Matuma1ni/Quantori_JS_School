import { App } from './components/lists/App.js';
import { AppHeader } from './components/header/Header.js';

let state = undefined;
let searchString = undefined;

export function useState(initialValue) {
    state = state || initialValue;
    function setValue(newValue) {
        state = newValue;
        renderApp();
    
    }
    return [state, setValue];
}

export function useSearchString(initialValue) {
    searchString = searchString || initialValue;

    function setValue(newValue) {
        searchString = newValue;
        renderApp();
    }
    return [searchString, setValue];
}/**
     * Render the app.
     * On change whole app is re-rendered.
     */
export async function renderHeader(){
    const appContainer = document.getElementById("functional-header");
    appContainer.innerHTML = "";
    appContainer.append(await AppHeader());
}
export async function renderApp() {
    const appContainer = document.getElementById("functional-example");
    appContainer.innerHTML = "";
    appContainer.append(await App());
}