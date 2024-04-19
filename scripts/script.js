 document.getElementById("link").addEventListener('click', function(event) {
  event.preventDefault();
  document.getElementById('Form').style.display = 'block';
});

document.getElementById("StudentListLink").addEventListener('click', function(event) {
  event.preventDefault();
  fetchStudentData();
});

document.getElementById('enrollmentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});

function cancelForm() {
  var form = document.getElementById('enrollmentForm');
  form.reset();
}

function submitForm() {
  event.preventDefault();
  
  // Get form data
  var formData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      projectName: document.getElementById("projectName").value,
      skills: [],
      result: document.querySelector('input[name="result"]:checked').value
  };
  
  // Get selected skills
  var skillsCheckboxes = document.querySelectorAll('input[name="skills"]:checked');
  skillsCheckboxes.forEach(function(skill) {
      formData.skills.push(skill.value);
  });
  
  // Send form data to JSONPlaceholder
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log('Form data submitted successfully:', data);
      // Optionally, display a success message or redirect to another page
  })
  .catch(error => {
      console.error('Error submitting form data:', error);
      // Optionally, display an error message to the user
  });
}

function fetchStudentData() {
  // Fetch student data from JSONPlaceholder
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      // Display student data in a table format
      var studentListDiv = document.getElementById("studentList");
      studentListDiv.innerHTML = "<h2>Student List</h2>";
      var tableHtml = "<table border='1'><tr><th>First Name</th><th>Last Name</th><th>Project Name</th><th>Skills</th><th>Result</th></tr>";
      data.forEach(function(student) {
          var skills = student.skills ? student.skills.join(", ") : ""; // Check if 'skills' property exists
          tableHtml += "<tr><td>" + student.firstName + "</td><td>" + student.lastName + "</td><td>" + student.projectName + "</td><td>" + skills + "</td><td>" + student.result + "</td></tr>";
      });
      tableHtml += "</table>";
      studentListDiv.innerHTML += tableHtml;
  })
  .catch(error => {
      console.error('Error fetching student data:', error);
      // Optionally, display an error message to the user
  });
}