function summarizeNumbers(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return {
            count: 0,
            sum: 0,
            evenCount: 0,
            max: undefined,
            category: "empty"
        };
    }

    let sum = 0;
    let evenCount = 0;
    let max = numbers[0];

    for (let num of numbers) {
        sum += num;
        if (num % 2 === 0) evenCount++;
        if (num > max) max = num;
    }

    const category = sum > 0 ? "positive" : "non-positive";

    return {
        count: numbers.length,
        sum: sum,
        evenCount: evenCount,
        max: max,
        category: category
    };
}

// Тести
console.log('Task1: ', summarizeNumbers([4, 7, 2, 9]));
console.log('Task1: ', summarizeNumbers([]));