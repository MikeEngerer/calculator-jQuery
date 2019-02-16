const data = { 
	currentOp: null,
	currentNum: 'numOne',
	numOne: '',
	numTwo: '',
	hasDecimal: false,
	result: null
};

const add = (numOne, numTwo) => {
	return (numOne + numTwo);
}

const subtract = (numOne, numTwo) => {
	return (numOne - numTwo);
}

const multiply = (numOne, numTwo) => {
	return (numOne * numTwo);
}

const divide = (numOne, numTwo) => {
	return (numOne / numTwo);
}


const appendVal = () => {
	$('.calc-btn-num').click((e) => {
		let num = e.target.innerText;
		$('#result')[0].value += num;
		data[data.currentNum] += num;
		return
	});
}

const appendDecimal = () => {
	$('#decimal').click((e) => {
		if (!data.hasDecimal) {
			$('#result')[0].value += '.';
			data[data.currentNum] += '.';
			data.hasDecimal = true;
		} else {
			return
		}
	})
}

const applyOp = () => {
	$('.calc-btn-op').click((e) => {
		clearResult();
		changeNum();
		data.hasDecimal = false;
		data.currentOp = e.target.id;
	});
}

const changeNum = () => {
	data.currentNum == 'numOne' ? data.currentNum = 'numTwo' : data.currentNum = 'numOne';
}

const outputResult = (result) => {
	$('#result')[0].value = result;
}

const evaluate = () => {
	$('#calc-btn-eval').click((e) => {
		let numOne = parseFloat(data.numOne);
		let numTwo = parseFloat(data.numTwo);

		switch (data.currentOp) {
			case 'add':
				data.result = add(numOne, numTwo);
				break;
			case 'subtract':
				data.result = subtract(numOne, numTwo);
				break;
			case 'multiply':
				data.result = multiply(numOne, numTwo);
				break;
			case 'divide':
				data.result = divide(numOne, numTwo);
				break;
		}

		outputResult(data.result);
		fetchTrivia(data.result);
		clearData();
	})
}

const fetchTrivia = (result) => {
	$.ajax({
		url: `http://numbersapi.com/${Math.floor(result)}`
	}).done((res) => {
		console.log(res)
	});
}

const clearOutput = () => {
	$('#calc-btn-clear').click((e) => {
		clearData();
		clearResult();
	})
}

const clearData = () => {
	data.numOne = '';
	data.numTwo = '';
	data.currentNum = 'numOne';
	data.currentOp = null;
}

const clearResult = () => {
	$('#result')[0].value = '';
}

$(document).ready(function() {
	appendVal();
	applyOp();
	evaluate();
	appendDecimal();
	clearOutput();
});