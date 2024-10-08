//1. ADD A FOOTER ELEMENT 
// Create the footer element
const footer = document.createElement('footer');
const body = document.querySelector('body')
body.appendChild(footer);

//2. INSERT COPYRIGHT TEXT IN FOOTER:
// Create a new date object and extract the current year
const today = new Date();
const thisYear = today.getFullYear();

// Create a copyright paragraph element
const copyright = document.createElement('p');

// Set the inner HTML with the copyright symbol, your name, and the current year
copyright.innerHTML = ` <span> Natalia Sirtak </span> <span>&#169</span><span>${thisYear}</span/>`;

// Append the copyright element to the footer
footer.appendChild(copyright);

//3. ADD SKILLS DINAMICALLY IN JS
// Create an array of skills
const skills = ["JavaScript", "HTML", "CSS", "GitHub"];

// Select the skills section and the <ul> element within it
const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

// Loop through the array and create <li> elements for each skill
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}
// Select the form
const messageForm = document.forms.leave_message;
// Add an event listener to handle the form submission
messageForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Retrieve the form field values
    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;
  
    console.log(userName, userEmail, userMessage); // Log the values to the console
  // Select the messages section and list
  const messageSection = document.getElementById('messages');
  const messageList = messageSection.querySelector('ul');

  // Create a new list item for the message
  const newMessage = document.createElement('li');
  newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a> <span>${userMessage}</span>`;

  // Create and append a remove button to the message
  const removeButton = document.createElement('button');
  removeButton.textContent = 'remove';
  removeButton.type = 'button';

  // Add an event listener to remove the message when the button is clicked
  removeButton.addEventListener('click', function() {
    const entry = removeButton.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  // Clear the form fields
  messageForm.reset();
});

(function(window, document, undefined) {
  window.onload = init;
  async function init() {
    let repos = await getGitRepos();
    if (repos && repos.length > 0) {
      console.log(`We've got data...`);
      let projectSection = document.getElementById("Projects");  
      console.log(projectSection);
      let projectList = projectSection.getElementsByTagName("ol")[0];
      for (let i = 0; i < repos.length; i++) {
        let project = document.createElement("li");  // Declare 'let' to avoid scoping issues
        project.innerHTML = repos[i]["name"];
        projectList.appendChild(project);
      }
    }
  }

  async function getGitRepos() {
    try {
      const repositories = await fetch('https://api.github.com/users/nataliasirt/repos')
        .then((rs) => {
          if (!rs.ok) {
            throw new Error('Request failed');
          }
          return rs.json();
        });
      console.log(repositories);
      return repositories;
    } catch(err) {
      console.log(`Encountered error when attempting to fetch Git repos: ${err}`);
      return [];  // Return an empty array or null if there is an error
    }
  }

})(window, document, undefined);
