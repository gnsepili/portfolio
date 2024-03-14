function createProjectCards() {
    const projectsContainer = document.getElementById('projects-container');

    Object.values(projects).forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        const descriptionTrimmed = project.description.length > 120 
            ? project.description.substring(0, 117) + '...' 
            : project.description;
        
        // Create tags HTML
        let tagsHtml = '';
        if (project.tags && project.tags.length) {
            tagsHtml = `<div class="project-tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>`;
        }

        projectCard.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${descriptionTrimmed}</p>
                ${tagsHtml} <!-- Insert tags here -->
                <div class="project-links">
                    <a href="${project.link}" class="project-link">Read more →</a>
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
