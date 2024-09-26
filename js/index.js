// Add the footer and copyright as before
const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement('p');
copyright.innerHTML = `<span>Natalia Sirtak</span> <span>&#169;</span><span>${thisYear}</span>`;
footer.appendChild(copyright);

// Add skills dynamically
const skills = ["JavaScript", "HTML", "CSS", "GitHub"];
const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

// Clear any existing skills if the function is re-run
skillsList.innerHTML = "";

// Loop through the array and create <li> elements for each skill
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement('li');
  skill.textContent = skills[i];
  skillsList.appendChild(skill);
}

// Fetch GitHub repositories and add them dynamically
(function(window, document, undefined) {
  window.onload = init;

  async function init() {
    let repos = await getGitRepos();
    if (repos && repos.length > 0) {
      console.log(`We've got data...`);
      let projectList = document.getElementById("project_list");

      // Clear any existing projects if the function is re-run
      projectList.innerHTML = "";

      // Loop through the fetched repos and add each one as a clickable link
      for (let i = 0; i < repos.length; i++) {
        let project = document.createElement("li");
        
        let projectLink = document.createElement("a");
        projectLink.href = repos[i]["html_url"]; // Set the href to the GitHub repository URL
        projectLink.target = "_blank"; // Open the link in a new tab
        projectLink.textContent = repos[i]["name"]; // Set the anchor text to the repository name
        
        project.appendChild(projectLink);
        projectList.appendChild(project);
      }
    }
  }

  // Fetch the list of repositories from the GitHub API
  async function getGitRepos() {
    try {
      const repositories = await fetch('https://api.github.com/users/nataliasirt/repos')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Request failed');
          }
          return response.json();
        });
      console.log(repositories);
      return repositories;
    } catch(err) {
      console.log(`Error fetching Git repos: ${err}`);
      return [];
    }
  }

})(window, document, undefined);

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
