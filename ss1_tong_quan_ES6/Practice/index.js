// Mảng ban đầu
let arr = [1, 3, 5, 6, 8, 86];
let result1 = arr.filter(num => num > 5);
console.log("Mảng gồm các phần tử lớn hơn 5 : " + result1);

let result2 = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Tổng các phần tử trong mảng : " + result2);

let result3 = arr.includes(8) ? 8 :"không tìm thấy";
console.log(result3);

