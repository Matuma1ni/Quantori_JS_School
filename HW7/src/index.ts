import { renderHeader } from './renders';
import { renderApp } from './renders';
import './main.css';

(function (): void { 
    // initial render
    renderHeader();
    renderApp();
})();