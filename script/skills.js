fetch('static/skill.json') // Replace with the correct path to your skills.json
  .then(response => response.json())
  .then(data => {
    const skillsSection = document.getElementById('skills-section');

    // Loop through each category in the data
    Object.entries(data).forEach(([category, skills]) => {
      let categoryDiv = document.createElement('div');
      categoryDiv.classList.add('skills-category');
      
      let categoryTitle = document.createElement('h4');
      categoryTitle.textContent = category;
      categoryDiv.appendChild(categoryTitle);
      
      let skillsGrid = document.createElement('div');
      skillsGrid.classList.add('skills-grid');

      // Loop through each skill in the category
      skills.forEach(skill => {
        let skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        
        let skillImage = document.createElement('img');
        skillImage.src = skill.logo; // Make sure the path to the image is correct
        skillImage.alt = skill.name;
        
        let skillName = document.createElement('span');
        skillName.textContent = skill.name;
        
        skillItem.appendChild(skillImage);
        skillItem.appendChild(skillName);
        skillsGrid.appendChild(skillItem);
      });

      categoryDiv.appendChild(skillsGrid);
      skillsSection.appendChild(categoryDiv);
    });
  })
  .catch(error => {
    console.error('Error loading skills:', error);
  });
