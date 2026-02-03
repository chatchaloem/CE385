const fetchDataFromServer1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data from Server 1");
        }, 2000);
    });
};

const fetchDataFromServer2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Error from Server 2");
        }, 1000);
    });
};

const fetchDataFromServer3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data from Server 3");
        }, 3000);
    });
};

const fetchFirstResponse = async () => {
    try {
        const result = await Promise.all([
            fetchDataFromServer1(),
            fetchDataFromServer2(),
            fetchDataFromServer3()
        ]);
        console.log("First successful response:", result);
    } catch (error) {
        console.error("First error:", error);
    }
};

const fetchAllResults = async () => {
    try {
        const results = await Promise.allSettled([
            fetchDataFromServer1(),
            fetchDataFromServer2(),
            fetchDataFromServer3()
        ]);

        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                console.log(`Server ${index + 1} success:`, result.value);
            } else {
                console.error(`Server ${index + 1} failed:`, result.reason);
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
    }
};


fetchFirstResponse();
fetchAllResults();