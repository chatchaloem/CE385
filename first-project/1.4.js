let username = "admin";
let password = 1238 ;
let age = 17 ;

if (username == "admin" && password == 1234 && age >= 18) {
    console.log(`Test 2: ${"เข้าสู่ระบบสำเร็จ"}`);
}else if (username != "admin" || password != 1234) {
    console.log(`Test 1: ${"ชื่อผู่ใช้หรือรหัสผ่านไม่ถูกต้อง"}`);
}else { (username == "admin" && password == 1234 && age < 18) 
    console.log(`Test 3: ${"อายุไม่ถ฿งเกณฑ์"}`);
}