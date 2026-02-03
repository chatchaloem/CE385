const eventloop = (callback) => {
    console.log("Begin");
    setTimeout(() =>{
        const result = callback("First");
        console.log(result);
    }, 2000);
    setTimeout(() =>{
        const result = callback("Second");
        console.log(result);
    }, 1000);
    setTimeout(() =>{
        const result = callback("Third");
        console.log(result);
    }, 0);
    console.log("End");
}
eventloop((message) => {
    return message;
});
