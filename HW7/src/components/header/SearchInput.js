export function SearchInput({searchString, placeholder, changeSearchString}) {
    const searchInput = document.createElement("INPUT");
    searchInput.setAttribute("type", "text");
    searchInput.placeholder = placeholder;
    searchInput.value = searchString;
    searchInput.addEventListener("input", () => changeSearchString());
    return searchInput;
}