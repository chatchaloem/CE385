let sumEven = 0;
let productOdd = 1;
let i = 0;
let j = 1;
while ( i<=50) {
    sumEven += i
    i += 2;
    while (j <= 9) {
        productOdd *= j
        j += 2;
    }
};

console.log(`ผลรวมเลขคู่ 2-50 =  ${sumEven}`);
console.log(`ผลคูณเลขคี่ 1-10 =  ${productOdd}`);