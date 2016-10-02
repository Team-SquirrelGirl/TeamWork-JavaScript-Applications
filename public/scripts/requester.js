/* globals $ */

let requester = {
    get(url) {
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: "GET",
                success: function(response) {
                    resolve(response);
                },
                fail: function (response) {
                    reject(response);
                }
            });
        });

        return promise;
    },

    putJSON(url, body, options = {}) {
        let promise = new Promise((resolve, reject) => {
            var headers = options.headers || {};
            $.ajax({
                url,
                headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
                complete: function(response) {
                    console.log(response);
                    resolve(response);
                },
                fail: function (response) {
                    console.log(response);
                    reject(response);
                }
            });
        });

        return promise;
    },

    postJSON(url, body, options = {}) {
        let promise = new Promise((resolve, reject) => {
            var headers = options.headers || {};
            $.ajax({
                url,
                headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                complete: function(response) {
                    resolve(response);
                }
            });
        });

        return promise;
    },

    getJSON(url) {
        let promise = new Promise((resolve, reject) => {
            $.getJSON(url)
                .done(resolve)
                .fail(reject);
        });

        return promise;
    }
};

export { requester };