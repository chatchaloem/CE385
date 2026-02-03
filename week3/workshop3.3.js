const simulateAsyncOperation = (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (timeout < 1000) {
                reject("Operation timed out");
            } else {
                resolve("Async operation completed");
            }
        }, timeout);
    });
}

const performAsyncTasks = async (timeout) => {
    try {
        const result = await simulateAsyncOperation(timeout);
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
};

performAsyncTasks(1500);
performAsyncTasks(500);