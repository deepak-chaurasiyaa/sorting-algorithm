class SortingAlgorithm {
	constructor(array) {
		if (!Array.isArray(array)) throw new Error('Please provide a valid array.');
		this.array = array;
	}

	#swapElement(index1, index2) {
		[this.array[index1], this.array[index2]] = [this.array[index2], this.array[index1]];
	}

	bubbleSort() {
		const { array } = this;
		const len = array.length;

		for (let i = 0; i < len; i++) {
			let swapped = false;

			for (let j = 0; j < len - 1 - i; j++) {
				if (array[j] > array[j + 1]) {
					this.#swapElement(j, j + 1);
					swapped = true;
				}
			}

			if (!swapped) break;
		}

		return array;
	}

	selectionSort() {
		const { array } = this;
		const len = array.length;

		for (let i = 0; i < len - 1; i++) {
			let minIndex = i;

			for (let j = i + 1; j < len; j++) {
				if (array[j] < array[minIndex]) {
					minIndex = j;
				}
			}

			if (minIndex !== i) {
				this.#swapElement(minIndex, i);
			}
		}

		return array;
	}

	insertionSort() {
		const { array } = this;
		const len = array.length;

		for (let i = 1; i < len; i++) {
			let currentValue = array[i];
			let j = i - 1;

			while (j >= 0 && array[j] > currentValue) {
				array[j + 1] = array[j];
				j--;
			}

			array[j + 1] = currentValue;
		}

		return array;
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
		return this._quickSort([...this.array]);
	}

	#merge(leftArray, rightArray) {
		let [leftIndex, rightIndex, resultArray] = [0, 0, []];

		while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
			if (leftArray[leftIndex] < rightArray[rightIndex]) {
				resultArray.push(leftArray[leftIndex]);
				leftIndex++;
			} else {
				resultArray.push(rightArray[rightIndex]);
				rightIndex++;
			}
		}

		return resultArray.concat(leftArray.slice(leftIndex), rightArray.slice(rightIndex));
	}

	mergeSort() {
		const { array } = this;
		const len = array.length;

		if (len <= 1) return array;

		const middle = Math.floor(len / 2);
		const leftArray = array.slice(0, middle);
		const rightArray = array.slice(middle);

		return this.#merge(
			new SortingAlgorithm(leftArray).mergeSort(),
			new SortingAlgorithm(rightArray).mergeSort()
		);
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
