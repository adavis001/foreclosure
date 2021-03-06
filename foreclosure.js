'use strict';

var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan(){
	var account = {
		borrowed: 550000,
		balance: 286000,
		monthlyPayment: 1700,
		defaulted: 0,
		defaultsToForeclose: 5,
		foreclosed: false
	};

	function missPayment(){
		account.defaulted++;
		
		if(account.defaulted >= account.defaultsToForeclose){
			account.foreclosed = true;
		}
		console.log("Default #" + account.defaulted);
	}

	function getBalance(){
		return account.balance;
	}

	function receivePayment(ammount){
		if(ammount<account.monthlyPayment){
			missPayment();
		}
		account.balance -= ammount;
	}

	function getMonthlyPayment(){
		return account.monthlyPayment;
	}

	function isForeclosed(){
		return account.foreclosed;
	}

	return {
		getBalance: getBalance,
		receivePayment: receivePayment,
		getMonthlyPayment: getMonthlyPayment,
		isForeclosed: isForeclosed,
	};
}

function borrower(loan){
	var account = {
		monthlyIncome: 1350,
		funds: 2800,
		loan: loan
	};

	function getFunds(){
		return account.funds;
	}

	function makePayment(){
		if(account.funds > loan.getMonthlyPayment()){
			account.funds -= loan.getMonthlyPayment();
			loan.receivePayment(loan.getMonthlyPayment());
		} else {
			loan.receivePayment(account.funds);
			account.funds = 0;
		}
	}

	function payDay(){
		account.funds += account.monthlyIncome;
	}
	return {
		getFunds: getFunds,
		makePayment: makePayment,
		payDay: payDay,
	};
}

stevesLoan = loan();
steve = borrower(stevesLoan);

while(stevesLoan.isForeclosed() === false){
	steve.payDay();
	steve.makePayment();
	month++;
console.log("month" + month);
console.log("Funds = $" + steve.getFunds());
//console.log(stevesLoan.missPayment);
}
monthsUntilEvicted = month;