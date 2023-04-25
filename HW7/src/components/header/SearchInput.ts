export function SearchInput({searchString, placeholder, changeSearchString}: 
    {searchString: string, placeholder: string, changeSearchString: ()=>void}) {
    const searchInput: HTMLInputElement = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.placeholder = placeholder;
    searchInput.value = searchString;
    searchInput.addEventListener("input", () => changeSearchString());
    return searchInput;
}