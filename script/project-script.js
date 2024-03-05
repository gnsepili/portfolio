function createProjectCards() {
    const projectsContainer = document.getElementById('projects-container');

    Object.values(projects).forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');

        const descriptionTrimmed = project.description.length > 120 
            ? project.description.substring(0, 117) + '...' 
            : project.description;

        projectCard.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${descriptionTrimmed}</p>
                <div class="project-links">
                    <a href="${project.github}" class="project-link">Read more →</a>
                </div>
            </div>
            <div class="project-image">
                <img src="${project.image}" alt="${project.title} Image" style="max-width: 100%; height: auto;">
            </div>
        `;

        projectsContainer.appendChild(projectCard);
    });
}

// Call the function when the window loads
window.onload = createProjectCards;
