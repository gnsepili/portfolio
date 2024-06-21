// skill-fetch.js

document.querySelector('[data-collapse-toggle]').addEventListener('click', function() {
    const target = document.getElementById(this.getAttribute('aria-controls'));
    target.classList.toggle('hidden');
});

fetch('../static/data/skill.json')
    .then(response => response.json())
    .then(data => {
        const skillsContainer = document.getElementById('skills-container');

        Object.keys(data).forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-div', 'mb-6');

            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category;
            categoryTitle.classList.add('text-xl', 'font-semibold', 'mb-4', 'text-gray-900', 'dark:text-white');
            categoryDiv.appendChild(categoryTitle);

            const categoryGrid = document.createElement('div');
            categoryGrid.classList.add('grid', 'grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-11', 'gap-2'); // Further reduced gap

            data[category].forEach(skill => {
                const skillDiv = document.createElement('div');
                skillDiv.classList.add('custom-skill-card', 'flex', 'flex-col', 'items-center', 'bg-white', 'dark:bg-gray-800', 'p-2', 'rounded-lg', 'shadow-md', 'hover:shadow-lg', 'transition', 'transform', 'duration-300', 'hover:-translate-y-2');

                const img = document.createElement('img');
                img.src = skill.logo;
                img.alt = skill.name;
                img.classList.add('w-10', 'h-10', 'mb-1', 'object-contain'); // Adjusted size and vertical margin

                console.log('Loading image:', skill.logo); // Debugging log

                const span = document.createElement('span');
                span.textContent = skill.name;
                span.classList.add('text-center', 'text-gray-900', 'dark:text-white', 'text-sm'); // Adjusted vertical margin

                skillDiv.appendChild(img);
                skillDiv.appendChild(span);

                categoryGrid.appendChild(skillDiv);
            });

            categoryDiv.appendChild(categoryGrid);
            skillsContainer.appendChild(categoryDiv);
        });
    })
    .catch(error => console.error('Error loading skills:', error));
