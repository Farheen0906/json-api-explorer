/*
Deliverables:
● A working fetch call that loads and displays posts
● A functional form that submits data via POST
● Error handling and user feedback (e.g., loading spinner or error messages)
● Clean and well-commented JavaScript code

💡 Extensions
● Allow users to delete posts using a DELETE request
● Allow users to filter posts by keyword using an input field
○ Use async/await instead of .then()
*/




/*

Tasks

1: Fetch and Display Posts
● Use fetch() to retrieve a list of posts from https://jsonplaceholder.typicode.com/posts
● Convert the response to JSON
● Dynamically render the post titles and bodies inside the #postList div

3. Add Loading and Error States
● Show a “Loading…” message while the fetch is in progress
● Display an error message if the fetch fails

*/



//caching DOM elements
const fetchBtn = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const errorDiv = document.getElementById("error");

//Adding eventlistner to fetch button
fetchBtn.addEventListener("click", function () {

  // Show the loading message
  postList.innerHTML = "<p>Loading...</p>";
  errorDiv.textContent = "";

  // Make the GET request
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      return response.json();
    })
    .then(function (json) {
      console.log(json); //Array of posts
      postList.innerHTML = "";//clears previous values

      // Looping through first 10 posts
      ////The <hr> element is displayed as a horizontal rule that is used to separate content 
      json.slice(0, 10).forEach(function (post) {
        postList.innerHTML += `
          <ul>
            <li><strong>ID:</strong> ${post.id}</li>
            <li><strong>Title:</strong> ${post.title}</li>
            <li><strong>Body:</strong> ${post.body}</li>
          </ul>
          <hr>
        `;
      });
    })
    .catch(function (error) { // Error handling and User feedback
      postList.innerHTML = "";
      errorDiv.textContent = "Error loading posts. Please try again.";
      console.error("Fetch error:", error);
    });
});


/* 
2. Create and Send a New Post
● Add a form with title and body fields
● Use fetch() with the POST method to send the data as JSON to the API
● Show a confirmation message with the response data

*/
//caching DOM Elements
const postForm = document.getElementById("postForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

//Adding EventListner for post button
postForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Getting form values
  const title = document.getElementById("titleInput").value;
  const body = document.getElementById("bodyInput").value;

  // Resetting messages
  formError.textContent = "";
  formSuccess.textContent = "Loading...";

  // Making the POST request
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      body: body,
      userId: 1
    })
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to submit post");
      }
      return response.json();
    })
    .then(function (json) {
      console.log(json); // Response data

      // Showing confirmation message
      formSuccess.innerHTML = `
        <p>Post created successfully!</p>
        <p><strong>ID:</strong> ${json.id}</p>
        <p><strong>Title:</strong> ${json.title}</p>
        <p><strong>Body:</strong> ${json.body}</p>
      `;

      // Clears the form
      postForm.reset();
    })
    .catch(function (error) { // Error handling and User feedback
      formSuccess.textContent = "";
      formError.textContent = "Error submitting post. Please try again.";
      console.error("POST error:", error);
    });
});
