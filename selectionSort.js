class SortingAlgorithm {
	constructor(array) {
		if (!this.#isAnArray(array)) throw new Error('Please provide a valid array.');
		this.array = array;
	}

	#swapElement(index1, index2) {
		[this.array[index1], this.array[index2]] = [this.array[index2], this.array[index1]];
	}

	#isAnArray(data) {
		return Array.isArray(data);
	}

	selectionSort() {
		for (let i = 0; i < this.array.length; i++) {
			let minIndex = i;
			for (let j = i + 1; j < this.array.length; j++) {
				if (this.array[j] < this.array[minIndex]) {
					minIndex = j;
				}
			}
			this.#swapElement(minIndex, i);
		}
		return this.array;
	}

	bubbleSort() {
		for (let i = 0; i < this.array.length; i++) {
			for (let j = i + 1; j < this.array.length; j++) {
				if (this.array[i] > this.array[j]) {
					this.#swapElement(i, j);
				}
			}
		}
		return this.array;
	}

	insertionSort() {
		for (let i = 1; i < this.array.length; i++) {
			for (let j = i - 1; j >= 0 && this.array[j + 1] < this.array[j]; j--) {
				this.#swapElement(j, j + 1);
			}
		}
		return this.array;
	}

	_quickSort(data) {
		if (data.length <= 1) return data;

		const pivot = data[0];
		const leftArray = [];
		const rightArray = [];

		for (let i = 1; i < data.length; i++) {
			if (data[i] < pivot) {
				leftArray.push(data[i]);
			} else {
				rightArray.push(data[i]);
			}
		}

		return [...this._quickSort(leftArray), pivot, ...this._quickSort(rightArray)];
	}

	quickSort() {
		return this._quickSort(this.array);
	}
	#merge(leftArray, rightArray) {
		let resultArray = [];
		let leftIndex = 0;
		let rightIndex = 0;
		while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
			if (leftArray[leftIndex] < rightArray[rightIndex]) {
				resultArray.push(leftArray[leftIndex]);
				leftIndex++;
			} else {
				resultArray.push(rightArray[rightIndex]);
				rightIndex++;
			}
		}
		return resultArray.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex));
	}
	mergeSort() {
		if (this.array.length === 1) return array;

		const middle = Math.floor(this.array.length / 2);
		const leftArray = this.array.slice(0, middle);
		const rightArray = this.array.slice(middle);
		return this.#merge(leftArray, rightArray);
	}
}

try {
	const array = [1, 4, 3, 6, 4, 5, 2, 0, 1, 0, 2];
	const sort = new SortingAlgorithm(array);

	console.log({ selectionSort: sort.selectionSort() });
	console.log({ bubbleSort: sort.bubbleSort() });
	console.log({ insertionSort: sort.insertionSort() });
	console.log({ quickSort: sort.quickSort() });
	console.log({ mergeSort: sort.mergeSort() });
} catch (error) {
	console.log({ error: error.message });
}
