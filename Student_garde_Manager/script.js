let students = [];

// Add Student
function addStudent() {
    let name = document.getElementById("name").value.trim();
    let rollNo = parseInt(document.getElementById("rollNo").value);
    let marks = parseFloat(document.getElementById("marks").value);

    if (!name || isNaN(rollNo) || isNaN(marks)) {
        alert("Please enter valid details!");
        return;
    }

    students.push({ name, rollNo, marks });
    displayStudents();
    clearInputs();
}

// Display Students
function displayStudents() {
    let tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";
    students.forEach(s => {
        let row = `<tr>
            <td>${s.name}</td>
            <td>${s.rollNo}</td>
            <td>${s.marks}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

// Clear Input Fields
function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("rollNo").value = "";
    document.getElementById("marks").value = "";
}

// Merge Sort by Name
function sortByName() {
    students = mergeSort(students, "name");
    displayStudents();
}

// Quick Sort by Marks
function sortByMarks() {
    quickSort(students, 0, students.length - 1, "marks");
    displayStudents();
}

// Merge Sort Implementation
function mergeSort(arr, key) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid), key);
    const right = mergeSort(arr.slice(mid), key);
    return merge(left, right, key);
}

function merge(left, right, key) {
    let sorted = [];
    while (left.length && right.length) {
        if (left[0][key].toString().localeCompare(right[0][key].toString()) <= 0) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }
    return [...sorted, ...left, ...right];
}

// Quick Sort Implementation
function quickSort(arr, low, high, key) {
    if (low < high) {
        let pi = partition(arr, low, high, key);
        quickSort(arr, low, pi - 1, key);
        quickSort(arr, pi + 1, high, key);
    }
}

function partition(arr, low, high, key) {
    let pivot = arr[high][key];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j][key] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Binary Search by Roll No
function searchStudent() {
    let rollNo = parseInt(document.getElementById("searchRoll").value);
    if (isNaN(rollNo)) {
        alert("Enter a valid Roll No!");
        return;
    }
    // Sort before binary search
    students.sort((a, b) => a.rollNo - b.rollNo);
    let result = binarySearch(students, rollNo);
    if (result !== -1) {
        alert(`Found: ${students[result].name} - Marks: ${students[result].marks}`);
    } else {
        alert("Student not found!");
    }
}

function binarySearch(arr, rollNo) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid].rollNo === rollNo) return mid;
        else if (arr[mid].rollNo < rollNo) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
