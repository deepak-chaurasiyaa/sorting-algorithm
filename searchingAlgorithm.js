class Search {
	constructor(array, target) {
		this.array = array;
		this.target = target;
	}
	linerSearch() {
		const { array, target } = this;
		for (let i = 0; i < array.length; i++) {
			if (array[i] === target) {
				return i;
			}
		}
		return -1;
	}
	binarySearch() {
		const { array, target } = this;
		let left = 0;
		let right = array.length - 1;
		while (left < right) {
			let mid = Math.floor((left + right) / 2);
			if (array[mid] === target) {
				return mid;
			} else if (array[mid] < target) {
				left = mid + 1;
			} else {
				right = mid - 1;
			}
		}
		return -1;
	}
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const search = new Search(array, 5);
console.log({ linerSearch: search.linerSearch() });
console.log({ binarySearch: search.binarySearch() });
