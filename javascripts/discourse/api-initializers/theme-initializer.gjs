import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  // Your code here
    api.onPageChange(() => {
        const floatingSearch = document.querySelector(".floating-search-input-wrapper");

        // only proceed if floating-search-input-wrapper exists
        if(!floatingSearch) {
            return undefined;
        }

        if(document.location.pathname === "/") {
            floatingSearch.style.display = "none";
        } else {
            floatingSearch.style.display = "flex";
        }
    })
});
