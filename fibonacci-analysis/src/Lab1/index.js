// Fibonacci Algorithm Implementations

// 1. Recursive Implementation - O(2^n)
function fibRecursive(n) {
    if (n <= 1) return n;
    return fibRecursive(n - 1) + fibRecursive(n - 2);
}

// 2. Dynamic Programming Implementation - O(n)
function fibDP(n) {
    if (n <= 1) return n;
    let dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// 3. Space-Optimized Iterative Implementation - O(n)
function fibIterative(n) {
    if (n <= 1) return n;
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        let current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}

// 4. Matrix Exponentiation Implementation - O(log n)
function multiplyMatrix(a, b) {
    return [
        [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
        [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
    ];
}

function matrixPower(matrix, n) {
    if (n === 0) return [[1, 0], [0, 1]];
    if (n === 1) return matrix;
    
    const half = Math.floor(n / 2);
    const halfPower = matrixPower(matrix, half);
    const result = multiplyMatrix(halfPower, halfPower);
    
    return n % 2 === 0 ? result : multiplyMatrix(result, matrix);
}

function fibMatrix(n) {
    if (n <= 1) return n;
    const baseMatrix = [[1, 1], [1, 0]];
    const resultMatrix = matrixPower(baseMatrix, n - 1);
    return resultMatrix[0][0];
}

// Performance Analysis Functions
function measurePerformance(func, n) {
    const startMemory = process.memoryUsage().heapUsed;
    const start = performance.now();
    const result = func(n);
    const end = performance.now();
    const endMemory = process.memoryUsage().heapUsed;
    
    return {
        time: end - start,
        memoryUsed: endMemory - startMemory,
        result: result
    };
}

function runAnalysis(maxN) {
    const results = {
        recursive: [],
        dp: [],
        iterative: [],
        matrix: []
    };
    
    // Test cases from 0 to maxN
    for (let n = 0; n <= maxN; n++) {
        // Skip larger values for recursive due to exponential growth
        if (n <= 35) {
            const recursiveResult = measurePerformance(() => fibRecursive(n), n);
            results.recursive.push({
                n,
                ...recursiveResult
            });
        }
        
        const dpResult = measurePerformance(() => fibDP(n), n);
        results.dp.push({
            n,
            ...dpResult
        });
        
        const iterativeResult = measurePerformance(() => fibIterative(n), n);
        results.iterative.push({
            n,
            ...iterativeResult
        });
        
        const matrixResult = measurePerformance(() => fibMatrix(n), n);
        results.matrix.push({
            n,
            ...matrixResult
        });
    }
    
    return results;
}

// Statistical Analysis
function calculateStatistics(data) {
    const times = data.map(d => d.time);
    const memory = data.map(d => d.memoryUsed);
    
    return {
        time: {
            mean: times.reduce((a, b) => a + b, 0) / times.length,
            median: times.sort((a, b) => a - b)[Math.floor(times.length / 2)],
            std: Math.sqrt(times.reduce((sq, n) => sq + Math.pow(n - (times.reduce((a, b) => a + b, 0) / times.length), 2), 0) / (times.length - 1)),
            min: Math.min(...times),
            max: Math.max(...times)
        },
        memory: {
            mean: memory.reduce((a, b) => a + b, 0) / memory.length,
            median: memory.sort((a, b) => a - b)[Math.floor(memory.length / 2)],
            std: Math.sqrt(memory.reduce((sq, n) => sq + Math.pow(n - (memory.reduce((a, b) => a + b, 0) / memory.length), 2), 0) / (memory.length - 1)),
            min: Math.min(...memory),
            max: Math.max(...memory)
        }
    };
}

// Run analysis
const analysisResults = runAnalysis(45);
const statistics = {};
for (const [method, data] of Object.entries(analysisResults)) {
    statistics[method] = calculateStatistics(data);
}

console.log('Statistics:', statistics);