let defer = Promise.resolve();
let queue = [];
let running;

let maxFps = 1000 / 60;

function clearQueue(resolve, deep) {
    let time = performance.now();

    let length = queue.length;
    let current = queue;

    queue = [];

    while (length--) {
        if (deep > 20 || performance.now() - time < maxFps) {
            current[length]();
        } else {
            queue.unshift(current[length]);
        }
    }

    if (queue.length) {
        requestAnimationFrame(() => clearQueue(resolve, deep + 1));
        return;
    }
    running = false;
    resolve();
}
/**
 * add a task to the queue
 * @param {Function} callback
 * @returns {Promise} Generate a promise that show  if the queue is complete
 */
export function addQueue(callback) {
    if (!running) {
        let rootResolve;
        defer.then(() => clearQueue(rootResolve, 0));
        defer = new Promise(resolve => (rootResolve = resolve));
    }
    if (!queue.includes(callback)) queue.push(callback);
}

export function endQueue(callback) {
    defer.then(callback);
}
