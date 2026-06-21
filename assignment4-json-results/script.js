// JSON string from the assignment
let schoolData = '{"classA":[{"name":"Amara","LAG-CSC103":72,"LAG-CSC104":55,"LAG-CSC106":68},{"name":"Chidi","LAG-CSC103":40,"LAG-CSC104":48,"LAG-CSC106":35},{"name":"Ngozi","LAG-CSC103":85,"LAG-CSC104":90,"LAG-CSC106":78},{"name":"Emeka","LAG-CSC103":60,"LAG-CSC104":52,"LAG-CSC106":44}],"classB":[{"name":"Fatima","LAG-CSC103":91,"LAG-CSC104":88,"LAG-CSC106":95},{"name":"Tunde","LAG-CSC103":30,"LAG-CSC104":45,"LAG-CSC106":50},{"name":"Blessing","LAG-CSC103":77,"LAG-CSC104":63,"LAG-CSC106":70},{"name":"Seun","LAG-CSC103":55,"LAG-CSC104":49,"LAG-CSC106":58}]}';

// Parse JSON string
let data = JSON.parse(schoolData);

// Function to calculate average
function getAverage(student) {
  let total = student["LAG-CSC103"] + student["LAG-CSC104"] + student["LAG-CSC106"];
  let average = total / 3;
  return average.toFixed(1);
}

// Function to get status
function getStatus(average) {
  if (average >= 50) {
    return "Pass";
  } else {
    return "Fail";
  }
}

// Function to display a class
function displayClass(students, bodyId) {
  let tbody = document.getElementById(bodyId);
  tbody.innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    let student = students[i];
    let average = getAverage(student);
    let status = getStatus(average);

    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student["LAG-CSC103"]}</td>
      <td>${student["LAG-CSC104"]}</td>
      <td>${student["LAG-CSC106"]}</td>
      <td>${average}</td>
      <td class="${status === 'Pass' ? 'pass' : 'fail'}">${status}</td>
    `;

    tbody.appendChild(row);
  }
}

// Display both classes
displayClass(data.classA, "bodyA");
displayClass(data.classB, "bodyB");