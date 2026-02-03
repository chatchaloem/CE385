const fetchDataWithCallback = (callback) => {
    setTimeout(() => {
        const data = { id : 1, name : 'bas' , email: 'bas@example' }
        callback(data);
    }, 2000);
};

const fetchDataWithPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id : 2, name : 'john' , email: 'john@example' };
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
