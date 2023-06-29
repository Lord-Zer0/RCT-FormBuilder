const HOST_NAME = "http://192.168.1.117:8000"

function post(request_body) {
    fetch(HOST_NAME + "/api/", {
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
    fetch(HOST_NAME + "/api/search", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
    })
        .then((response) => { 
            console.log(response)
            return response;
        })
        .then((json) => console.log(json))
        .catch((err) => {
            console.log(err);
            return err;
        });
}

function search(limit, query, sortby, ascending) {
    fetch(HOST_NAME + "/api/search", {
        method: "POST",
        body: {
            "limit": (limit != null) ? limit : "",
            "search": (query != null) ? query : "",
            "order_table": (sortby != null) ? sortby : "",
            "ascending": (ascending != null) ? ascending : "",
        },
    })
        .then((json) => console.log(json))
        .catch((err) => {
            console.log(err);
            return err;
        });
}