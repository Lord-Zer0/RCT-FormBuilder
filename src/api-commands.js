
function post(request_body) {
    fetch("/api/", {
        method: "POST",
        body: JSON.stringify(request_body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((json) => console.log(json))
        .catch((err) => {
            console.log(err);
            return err;
        });
}

function get_db() {
    fetch("/api/search", {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          'limit': '2',
          'ascending': 'false',
          'order_table': 'assemblydate'
        })
    })
    .then(response => response.json())
    .then(text => console.log(text))
    .catch(error => console.error(error));
}

async function search(limit, query, sortby, ascending) {
    try{
    const response = await fetch("/api/search", {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
            "limit": (limit != null) ? limit : "",
            "search": (query != null) ? query : "",
            "order_table": (sortby != null) ? sortby : "",
            "ascending": (ascending != null) ? ascending : "",
        }),
    })
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}