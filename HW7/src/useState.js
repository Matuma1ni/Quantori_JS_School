/**
 * Global application state
 * @template T
 * @param {T} initialValue
 * @returns {[T, function(T): void]}
 */
export function useState(initialValue) {
    state = state || initialValue;
    function setValue(newValue) {
        state = newValue;
        renderApp();
    
    }
    return [state, setValue];
}