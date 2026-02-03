const fetchDataWithCallback = (callback) => {
    setTimeout(() => {
        const data = "Data fetched with Callback";
        callback(data);
    }, 2000);
};

const fetchDataWithPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "Data fetched with Promise";
            resolve(data);
        }, 2000);
    });
};

// Callback
fetchDataWithCallback((data) => {
    console.log(data);
});

// Promise
fetchDataWithPromise()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });
