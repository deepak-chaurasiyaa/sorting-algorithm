class Queue {
	constructor() {
		this.items = [];
		this.head = 0;
		this.tail = 0;
	}
	enqueue(element) {
		this.items[this.tail] = element; // [3,4,5,]
		this.tail += 1;
	}
	dequeue() {
		const removeItem = this.items[this.head];
        
	}
	peek() {
		return this.items[0];
	}
	isEmpty() {
		this.items.length === 0;
	}
	size() {
		return this.items.length;
	}
}

const queue = new Queue();
queue.enqueue(5);
queue.enqueue(15);
queue.enqueue(51);
queue.dequeue();

console.log({ first: queue.items });
