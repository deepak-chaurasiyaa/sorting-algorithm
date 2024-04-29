/**
 * Stack is a linear data structure that follows Last In First Out (LIFO).
 * principle meaning that the last item inserted into the stack will be the first item to be removed.
 * In other word the stack is a list of element that are accessable only from the one end of the list, called the top of the Stack (ToS).
 */
class Stack {
	constructor() {
		this.data = [];
		this.top = 0;
	}
	/**
	 * Inserts item in the stack
	 * @param {number} item - item to be pushed in the stack
	 */
	push(item) {
		this.data[this.top] = item;
		this.top += 1;
	}

	/**
	 *
	 * @returns -  Removes the last inserted element from the stack..
	 */
	pop() {
		if (this.top === 0) throw new Error('Stack Underflow');

		this.top -= 1;
		return this.data.pop();
	}

	/**
	 * Provides the top elements from the stack
	 * @returns {number} - returns the top element from the stack.
	 */
	peek() {
		return this.data[this.top];
	}
	/**
	 * If stack is empty then it will return true otherwise returns false.
	 * @returns {boolean} -True/False
	 */
	isEmpty() {
		return this.top === 0;
	}
	/**
	 * Returns size of the stack.
	 * @returns {number} - Size of the stack.
	 */
	size() {
		return this.top;
	}
}

const stack = new Stack();
stack.push(5);
stack.push(5);
stack.push(5);

stack.pop();

console.log({ first: stack.data });
