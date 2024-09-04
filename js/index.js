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
const skills = ["JavaScript", "HTML", "CSS", "GitHub", "Adobe Photoshop"];

// Select the skills section and the <ul> element within it
const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

// Loop through the array and create <li> elements for each skill
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}
