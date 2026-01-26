function calculateBMI(weight, height) {
    let bmi = weight / (height * height)
    if (bmi < 18.5) {
        console.log(`bmi: '${bmi.toFixed(2)}' , category: 'ผอม' `);
    }
    else if (18.5 <= bmi && bmi < 25) {
        console.log(`bmi: '${bmi.toFixed(2)}' , category: 'ปกติ'` );
    }
    else if (25 <= bmi && bmi < 30) {
        console.log(`bmi: '${bmi.toFixed(2)}' , category: 'อ้วน'` );
    }
    else {
        console.log(`bmi: '${bmi.toFixed(2)}' , category: 'อ้วนมาก'` );
    }
}

calculateBMI(70,1.75)
calculateBMI(50,1.60)
calculateBMI(90,1.70)