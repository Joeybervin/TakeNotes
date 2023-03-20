let searchTimer;

document.getElementById("search").addEventListener("keyup", () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
                document.getElementById("searchForm").submit()
        }, 1200);
        
})

let searchInput = document.getElementById("search");

searchInput.selectionStart = searchInput.value.length;
searchInput.selectionEnd = searchInput.value.length;
searchInput.focus();