const HOST = "http://192.168.1.27:8000"

const netload = document.querySelector("#loadDB");
netload.addEventListener("Click", load_DB);

function init() {
    // Load the table from db and populate rows
}

function search_query() {

}
async function load_DB(query, sortby, ascending) {
    try {
        const response = await fetch(HOST + "/api/search", {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams({
                "limit": "10",
                "search": (query != null) ? query : "",
                "order_table": (sortby != null) ? sortby : "",
                "ascending": (ascending != null) ? ascending : "",
            })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
  }
}