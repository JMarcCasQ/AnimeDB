// src/requestQueue.js

const queue = [];
let isProcessing = false;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processQueue() {
    if (isProcessing) return;
    isProcessing = true;

    while (queue.length > 0) {
        const { fn, resolve, reject } = queue.shift();
        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        }
        // Wait 350ms between requests (approx 3 req/sec)
        await delay(350);
    }

    isProcessing = false;
}

export function enqueueRequest(fn) {
    return new Promise((resolve, reject) => {
        queue.push({ fn, resolve, reject });
        processQueue();
    });
}
