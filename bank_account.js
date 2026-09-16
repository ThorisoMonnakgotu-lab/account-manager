
const accountHolder ={
    accountNumber: 123456789,
    firstName: "Alice",
    lastName: "Bob",
    isActive: true,
    accBalance: 10589.90,
    transactions: [
        {
            type: "deposit",
            amount: 5000.00,
        },
        {
            type: "transfer",
            amount: 3780.00,

        },
        {
            type: "transfer",
            amount: 2500.00,
        },
        {
            type: "deposit",
            amount: 11869.90,
        }
    ],
    withdrawalTimestamps: []
};
//add to current balance
let userInput = prompt("Enter the amount you want to add: ");
let amountToAdd = parseFloat(userInput);
if (!isNaN(amountToAdd) && amountToAdd > 0) {
    accountHolder.accBalance += amountToAdd;

    accountHolder.transactions.push({
        type: "deposit",
        amount: amountToAdd
    });
    console.log("Success! New balance is: R" + accountHolder.accBalance.toFixed(2));
} else 
{
    console.log("No changes were made.");
};

//Withdraw money

let userInput1 = prompt(" Enter the amount you want to withdraw:");
let amountToWithdraw = parseFloat(userInput1);

if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
    console.log("Invalid amount entered. Transaction cancelled.");
} 
else if (amountToWithdraw > accountHolder.accBalance) {
    
    console.log("Transaction Declined: Insufficient funds.");
} 
else {
    accountHolder.accBalance -= amountToWithdraw;
    accountHolder.transactions.push({
        type: "withdrawal",
        amount: amountToWithdraw
    });

    console.log("Withdrawal successful!\nNew balance is: R" + accountHolder.accBalance.toFixed(2));
    console.log("Updated Account Data: R", accountHolder);
};

//withdrawals in 10 seconds
if (!accountHolder.isActive) {
    console.log("Access Denied: This account has been blocked due to suspicious activity.");
} else {
    const currentTime = Date.now();
    accountHolder.withdrawalTimestamps.push(currentTime);

    if (accountHolder.withdrawalTimestamps.length > 3) {
        accountHolder.withdrawalTimestamps.shift();
    }

    if (accountHolder.withdrawalTimestamps.length === 3) {
        const oldestAttempt = accountHolder.withdrawalTimestamps[0];
        const newestAttempt = accountHolder.withdrawalTimestamps[2];
        const timeDifference = newestAttempt - oldestAttempt; 

        if (timeDifference < 10000) {
            accountHolder.isActive = false;
            console.log("3 withdrawal attempts made in less than 10 seconds. Your account has been BLOCKED.");
        }
    }

    if (accountHolder.isActive) {
        let userInput = prompt("Enter the amount you want to withdraw: R");
        let amountToWithdraw = parseFloat(userInput);

        if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
            console.log("Invalid amount entered. Transaction cancelled.");
        } 
        else if (amountToWithdraw > accountHolder.accBalance) {
            console.log("Transaction Declined: Insufficient funds.");
        } 
        else {
            accountHolder.accBalance -= amountToWithdraw;
            accountHolder.transactions.push({
                type: "withdrawal",
                amount: amountToWithdraw
            });
            console.log("Withdrawal successful!\nNew balance is: R" + accountHolder.accBalance.toFixed(2));
        }
    }
};

//unusual spending spikes

if (!accountHolder.isActive) {
    alert("Access Denied: This account is currently blocked");
} else {
    let userInput = prompt(" Enter the amount you want to withdraw:");
    let amountToWithdraw = parseFloat(userInput);

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
        console.log("Invalid amount entered. Transaction cancelled.");
    } 
    else if (amountToWithdraw > accountHolder.accBalance) {
        console.log("Transaction Declined: Insufficient funds.");
    } 
    else {
       
        let totalAmount = 0;
        accountHolder.transactions.forEach(tx => {
            totalAmount += tx.amount;
        });
        
        let normalAverage = totalAmount / accountHolder.transactions.length;
        let suspiciousThreshold = normalAverage * 5;

        if (amountToWithdraw > suspiciousThreshold) {
            alert("TRANSACTION BLOCKED: Suspicious Activity Detected.\n" + 
                  "The requested amount "+ amountToWithdraw.toFixed(2) + "is more than 5x your normal transaction average "+ normalAverage.toFixed(2));
        } else {
            accountHolder.accBalance -= amountToWithdraw;
            accountHolder.transactions.push({
                type: "withdrawal",
                amount: amountToWithdraw
            });
            
            alert("Withdrawal successful!\nNew balance is: R" + accountHolder.accBalance.toFixed(2));
            console.log("Updated Account Data:", accountHolder);
        }
    }
};
