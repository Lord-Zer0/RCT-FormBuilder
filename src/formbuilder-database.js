const HOST = "http://192.168.1.62:8000"

const netload = document.querySelector("#loadDB");
netload.addEventListener("Click", load_db);

function init() {
    // Load the table from db and populate rows
}

function search_query() {

}

function load_db() {
    fetch(HOST + "/api/search", {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          
        })
    })
    .then(response => response.json())
    .then(text => console.log(text))
    .catch(error => console.error(error));
}