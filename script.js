document.addEventListener("DOMContentLoaded", () => {
  const formPage = document.getElementById("blogForm");
  const postsPage = document.getElementById("postsContainer");
  const errorMessage = document.getElementById("errorMessage");
  const toggleModeButton = document.getElementById("toggleMode");
  const backButton = document.getElementById("backButton");

  if (formPage) {
    formPage.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const title = document.getElementById("title").value.trim();
      const content = document.getElementById("content").value.trim();

      if (!username || !title || !content) {
        errorMessage.textContent = "Please complete the form.";
        return;
      }

      const blogPost = {
        username,
        title,
        content,
      };

      const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
      posts.push(blogPost);
      localStorage.setItem("blogPosts", JSON.stringify(posts));

      window.location.href = "posts.html";
    });
  }

  if (postsPage) {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    storedPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <small>By: ${post.username}</small>
            `;
      postsPage.appendChild(postElement);
    });

    toggleModeButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggleModeButton.textContent = document.body.classList.contains(
        "dark-mode"
      )
        ? "Light Mode"
        : "Dark Mode";
    });

    backButton.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
});
