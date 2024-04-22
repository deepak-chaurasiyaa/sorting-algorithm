class SortingAlgorithm {
	// Constructor function to initialize the SortingAlgorithm instance with an array
	constructor(array) {
		// Check if the provided argument is an array
		if (!Array.isArray(array)) {
			throw new Error('Please provide a valid array.');
		}
		// Store the array in the instance property
		this.array = array;
	}

	// Private method to swap two elements in the array
	#swapElement(index1, index2) {
		// Using destructuring assignment to swap elements at index1 and index2
		[this.array[index1], this.array[index2]] = [this.array[index2], this.array[index1]];
	}

	// Bubble Sort algorithm
	bubbleSort() {
		// Get a reference to the array and its length
		const { array } = this;
		const len = array.length;

		// Outer loop for iterating through all elements
		for (let i = 0; i < len; i++) {
			let swapped = false;

			// Inner loop for comparing adjacent elements and swapping if necessary
			for (let j = 0; j < len - 1 - i; j++) {
				if (array[j] > array[j + 1]) {
					this.#swapElement(j, j + 1);
					swapped = true;
				}
			}

			// If no swaps are made in a pass, the array is already sorted
			if (!swapped) {
				break; // Break out of the loop
			}
		}

		// Return the sorted array
		return array;
	}

	// Selection Sort algorithm
	selectionSort() {
		const { array } = this;
		const len = array.length;

		for (let i = 0; i < len - 1; i++) {
			let minIndex = i;

			// Find the index of the minimum element in the unsorted portion of the array
			for (let j = i + 1; j < len; j++) {
				if (array[j] < array[minIndex]) {
					minIndex = j;
				}
			}

			// Swap the minimum element with the current element
			if (minIndex !== i) {
				this.#swapElement(minIndex, i);
			}
		}

		// Return the sorted array
		return array;
	}

	// Insertion Sort algorithm
	insertionSort() {
		const { array } = this;
		const len = array.length;

		for (let i = 1; i < len; i++) {
			let currentValue = array[i];
			let j = i - 1;

			// Move elements of array[0..i-1], that are greater than currentValue, to one position ahead of their current position
			while (j >= 0 && array[j] > currentValue) {
				array[j + 1] = array[j];
				j--;
			}

			// Insert the current value at its correct position
			array[j + 1] = currentValue;
		}

		// Return the sorted array
		return array;
	}

	// Quick Sort algorithm
	_quickSort(data) {
		// Base case: if the array has 0 or 1 elements, it is already sorted
		if (data.length <= 1) {
			return data;
		}

		// Choose the first element as the pivot
		const pivot = data[0];
		const leftArray = [];
		const rightArray = [];

		// Partition the array into two sub-arrays: elements less than pivot and elements greater than pivot
		for (let i = 1; i < data.length; i++) {
			if (data[i] < pivot) {
				leftArray.push(data[i]);
			} else {
				rightArray.push(data[i]);
			}
		}

		// Recursively sort the left and right sub-arrays and concatenate them around the pivot
		return [...this._quickSort(leftArray), pivot, ...this._quickSort(rightArray)];
	}

	quickSort() {
		// Sorting a copy of the original array to avoid mutation
		return this._quickSort([...this.array]);
	}

	// Merge Sort algorithm
	#merge(leftArray, rightArray) {
		let [leftIndex, rightIndex, resultArray] = [0, 0, []];

		// Merge the two sorted arrays into a single sorted array
		while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
			if (leftArray[leftIndex] < rightArray[rightIndex]) {
				resultArray.push(leftArray[leftIndex]);
				leftIndex++;
			} else {
				resultArray.push(rightArray[rightIndex]);
				rightIndex++;
			}
		}

		// Concatenate the remaining elements of left and right arrays (if any) to the result array
		return resultArray.concat(leftArray.slice(leftIndex), rightArray.slice(rightIndex));
	}

	mergeSort() {
		const { array } = this;
		const len = array.length;

		// Base case: if the array has 0 or 1 elements, it is already sorted
		if (len <= 1) {
			return array;
		}

		// Split the array into two halves and recursively sort each half
		const middle = Math.floor(len / 2);
		const leftArray = array.slice(0, middle);
		const rightArray = array.slice(middle);

		// Merge the sorted halves
		return this.#merge(
			new SortingAlgorithm(leftArray).mergeSort(),
			new SortingAlgorithm(rightArray).mergeSort()
		);
	}
}

try {
	const array = [1, 4, 3, 6, 4, 5, 2, 0, 1, 0, 2];
	const sort = new SortingAlgorithm(array);

	// Test and print sorted arrays for each sorting algorithm
	console.log({ selectionSort: sort.selectionSort() });
	console.log({ bubbleSort: sort.bubbleSort() });
	console.log({ insertionSort: sort.insertionSort() });
	console.log({ quickSort: sort.quickSort() });
	console.log({ mergeSort: sort.mergeSort() });
} catch (error) {
	// Handle any errors that occur during sorting
	console.log({ error: error.message });
}
