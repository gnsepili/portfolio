// Navbar Hamburger Menu toggle
document.querySelector('[data-collapse-toggle]').addEventListener('click', function() {
    const target = document.getElementById(this.getAttribute('aria-controls'));
    target.classList.toggle('hidden');
});

async function fetchProjects() {
    const response = await fetch('../static/data/projects.json');
    const projects = await response.json();
    return projects;
}

function createProjectElement(project) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('w-full', 'max-w-sm', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700', 'p-4', 'flex', 'flex-col', 'items-start');

    const buttons = project.buttons.map(button => {
        let btnClass = "btn";
        let btnStyle = "";
        if (button.icon === "fa-brands fa-github") {
            btnClass += " btn-github";
            btnStyle = "text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2";
        } else {
            btnClass += " btn-demo";
            btnStyle = "text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2";
        }
        return `<a href="${button.link}" target="_blank" class="${btnStyle}"><i class="fa ${button.icon} mr-2"></i> ${button.text}</a>`;
    }).join(' ');

    const tags = project.tags.map(tag => `<span class="tag tag-btn" data-tag="${tag}">${tag}</span>`).join(' ');

    projectElement.innerHTML = `
        <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">${project.title}</h2>
        <p class="text-gray-700 dark:text-gray-400 mb-4">${project.description}</p>
        <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover rounded-lg mb-4">
        <div class="flex flex-wrap gap-2 mb-4">${tags}</div>
        <div class="flex justify-between mt-auto w-full">
            ${buttons}
        </div>
    `;
    return projectElement;
}

function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects');
    projectsContainer.innerHTML = '';
    projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);
    });
    addTagClickEvent();
}

function addTagClickEvent() {
    const tagButtons = document.querySelectorAll('.tag-btn');
    tagButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tag = e.target.getAttribute('data-tag');
            toggleTagFilter(tag);
        });
    });
}

function toggleTagFilter(tag) {
    const selectedTags = document.getElementById('selected-tags');
    const existingTagElement = selectedTags.querySelector(`[data-tag="${tag}"]`);

    if (existingTagElement) {
        existingTagElement.remove();
    } else {
        const tagElement = document.createElement('span');
        tagElement.classList.add('bg-blue-600', 'text-white', 'py-1', 'px-2', 'rounded', 'flex', 'items-center', 'space-x-2');
        tagElement.setAttribute('data-tag', tag);
        tagElement.innerHTML = `${tag} <button class="remove-tag-btn ml-2"><i class="fas fa-times"></i></button>`;
        selectedTags.appendChild(tagElement);
    }

    const activeTags = Array.from(selectedTags.querySelectorAll('span')).map(el => el.getAttribute('data-tag'));
    if (activeTags.length > 0) {
        selectedTags.classList.remove('hidden');
    } else {
        selectedTags.classList.add('hidden');
    }

    filterProjectsByTags(activeTags);
    addRemoveTagEvent();
}

function addRemoveTagEvent() {
    const removeTagButtons = document.querySelectorAll('.remove-tag-btn');
    removeTagButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tag = e.target.closest('span').getAttribute('data-tag');
            toggleTagFilter(tag);
        });
    });
}

function filterProjectsByTags(tags) {
    fetchProjects().then(projects => {
        const filteredProjects = projects.filter(project => tags.every(tag => project.tags.includes(tag)));
        displayProjects(filteredProjects);
    });
}

async function main() {
    const projects = await fetchProjects();
    displayProjects(projects);

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProjects = projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) || 
            project.description.toLowerCase().includes(searchTerm)
        );
        displayProjects(filteredProjects);
    });
}

main();
