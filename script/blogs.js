function createBlogCards() {
    const blogsContainer = document.getElementById('blogs-container');

    blogsData.forEach(blog => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        const descriptionTrimmed = blog.description.length > 120 
            ? blog.description.substring(0, 117) + '...' 
            : blog.description;

        blogCard.innerHTML = `
            <div class="blog-date">${blog.date}</div>
            <div>
                <div class="blog-title">${blog.title}</div>
                <div class="blog-description">${descriptionTrimmed}</div>
                <a href="${blog.link}" class="blog-read-more">Read more →</a>
            </div>
        `;

        blogsContainer.appendChild(blogCard);
    });
}

window.onload = createBlogCards;


function searchArticles() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        let title = card.querySelector('.blog-title').textContent.toLowerCase();
        let description = card.querySelector('.blog-description').textContent.toLowerCase();

        if (title.includes(input) || description.includes(input)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
