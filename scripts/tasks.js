// 1) Написать функцию getFieldValues, которая будет принимать на вход массив объектов, 
// а возвращать будет массив значений одного из полей (отсортированных в порядке возрастания):

function getFieldValues(user, pole){
	var count = 0;
	// Считает кол-во объектов
	for(let prs in user)
	{
		if(user.hasOwnProperty(prs)) count++;
	}
	var mass = [];
	// Запихивает в массив значение нужного поля
	for(let i =0; i<count;i++){
		mass[i] = user[i][pole];
	}
	// Сортирует по глупому
	for(let i =0; i<count-1;i++){
		if (mass[i]>mass[i+1]){
			let s = mass[i];
			mass[i] = mass[i+1];
			mass[i+1] = s;
		}
	}
	return mass;
}

var usersData = [
{ 'user' : 'Alex', 'password' : 'MyNameIsAlex' },
{ 'user' : 'Bob', 'password' : 'MyNAmeIsBob' }
];
console.log(getFieldValues(usersData, 'user')); // --> ['Alex', 'Bob']

// 2) Написать функцию, фильтрующую массив с использованием предиката:
function filter(mass, func){
	var massOut = [];
	var j = 0;
	// Никогда не видел чтобы в функцию передавалась функция...
	for(let i =0; i< mass.length; i++){
		if(func(mass[i])){
			massOut[j] = mass[i];
			j++;
		}
	}
	return massOut;
}

var numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55];
function isEven(x) { return x%2 == 0}
console.log(filter(numbers, isEven)); // --> [2, 8, 34]

// 3) Даны 2 строки со словами (без знаков препинания), 
// вывести те слова (по одному разу), которые встречаются в обоих строках
function findSimilarWords(lin1, lin2){
	var word, mass = "";
	var k, pos = 0;
	for(let i =0; i< lin1.length; i++){
		// Выделение слова в первой строке
		if(lin1[i] == " " || lin1[i] == '\0'){
			word = lin1.substring(pos,i);
			pos = i+1;
			// Поиск вхождения этого слова во второй строке
			if (~lin2.indexOf(word)){
				// Проверка на совпадение с предыдущими словами
				if(mass.indexOf(word)){
					mass = mass + word + " ";
				}
			}
		}
	}
	return mass;
}

var firstLongString = 'Load up on guns and bring your friends it\'s fun to lose and to pretend';
var secondLongString = 'She\'s over bored and self assured oh no I know a dirty word';
console.log(findSimilarWords(firstLongString, secondLongString)); // --> ['and'];

// 4) Дан IP-адрес (строка) и маска подсети (десятичное число). Написать функцию, которая будет валидировать
// IP-адрес (4 октета, <= 255), а затем выводить сетевой и широковещательный адреса:
function generateBroadcastAndNetworsAddresses(ip, mask){
	var pattern = /^(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])){3}$/;
	// Щас буит мясо)))
	if(pattern.test(ip)){
		var n = mask/8;
		// Разбиваю ip на октеты и перевожу в числовой формат ( можно было так 4 задачу решить...)
		var ip_p = ip.split(".");
		var a = [];
		for (let i = 0; i < ip_p.length; ++i){
			a.push(Number(ip_p[i]));
		}
		// Забиваю октеты маски равные 255
		var m = [];
		for (let i = 0; i < n-1; i++){
			m.push(255);
		}
		// Если не все октеты равны 255, то вычисляю значение последнего значащего
		if(n!=4){
			var f = 0;
			for(let j = 7; j > n;j--){
				f+=Math.pow(2,j);
			}
			m.push(f);
			// Добиваю остальные октеты 0
			for(let i = n+1; i < 4; i++){
				m.push(0);
			}
		}
		// Вычисление сетевого адреса
		var Net = [];
		for(let i = 0; i<4;i++){
			Net[i] = a[i] & m[i];
		}
		// Вычисление широковещательного
		var Broad = [];
		for(let i = 0; i < 3; i++){
			Broad[i] = Net[i];
		}
		Broad[3] = 256 - f - 1;

		var Data = { 'Broadcast - ' : Broad, 'Network - ' : Net };
		return Data;
	}
	else return "Неверный ip";
}

var IpAddress = '10.226.98.2';
var subnetMask = 28;
console.log(generateBroadcastAndNetworsAddresses(IpAddress, subnetMask)); // Broadcast - 10.223.98.15, Network - 10.223.98.0

// 5) Соединить все массивы в один, не допуская повторения элементов (порядок не важен):
// P. S. 1 == '1' (строковое и числовое представление number'ов считать идентичными)
function makeItClean(mass){
	// Как я понял, повторяющиеся элементы нужно включать лишь один раз
	var massOut = [];
	for(let i =0; i< mass.length; i++){
		// Получаем из массива массив
		let massFLevel = mass[i];
		// Для каждого элемента полученного массива проверяем наличие в выходном массиве этого элемента
		for(let k = 0; k< massFLevel.length; k++){
			if(!~massOut.indexOf(massFLevel[k])){
				if(typeof(massFLevel[k]) == 'string'){
					if(!~massOut.indexOf(Number(massFLevel[k]))){
						massOut.push(massFLevel[k]);
					}
				}
				else massOut.push(massFLevel[k]);
			}}
		}
		return massOut;

	}

	var totalMessArray = [['a', 1, true], [true, 99, 'aa', undefined], ['1']];

console.log(makeItClean(totalMessArray)); // --> ['a', 'aa', 1, undefined, true];

