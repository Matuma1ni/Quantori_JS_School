import { App } from './components/lists/App';
import { AppHeader } from './components/header/Header';
import { Item } from './models/Item';

let state: Item[] = undefined;
let searchString: string = undefined;

export function useState(initialValue: Item[]): [Item[], (items: Item[]) => void]  {
    state = state || initialValue;
    function setValue(newValue: Item[]) {
        state = newValue;
        renderApp();    
    }
    return [state, setValue];
}

export function useSearchString(initialValue: string): [string, (string: string) => void] {
    searchString = searchString || initialValue;

    function setValue(newValue: string) {
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