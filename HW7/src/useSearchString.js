export function useSearchString(initialValue) {
    searchString = searchString || initialValue;

    function setValue(newValue) {
        searchString = newValue;
        renderApp();
    }
    return [searchString, setValue];
}