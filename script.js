
AOS.init({
  duration: 800,
  once: true,
});


document.getElementById("contactBtn").addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});


const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

const themeToggle = document.getElementById('themeToggle');

function getPreferredTheme() {
  return localStorage.getItem('theme') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
});

// on load
applyTheme(getPreferredTheme());


menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


(function () {
  emailjs.init("Qg9E1mSpUy81qTJiq"); 
})();


document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const contact = document.getElementById("number").value.trim();

  if (!name || !email || !message || !contact) {
    alert("Please fill all fields.");
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Invalid email format.");
    return;
  }

  const phonePattern = /^98\d{8}$/;
if (!phonePattern.test(contact)) {
  alert("Contact number must be 10 digits and start with 98.");
  return;
}

  emailjs
    .send("Lucifer_","template_i66ddmd", {
      from_name: name,
      from_email: email,
      message: message,
      contact_number: contact,
    })

    .then(() => {
      alert("Message sent successfully!");
      document.getElementById("contact-form").reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Message failed. Try again later.");
    });
});


const searchEl = document.getElementById("projectSearch");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

function filterProjects() {
  const query = (searchEl.value || "").toLowerCase();
  const activeFilter = document.querySelector("[data-filter].active").dataset.filter;

  projectCards.forEach(card => {
    const tech = (card.dataset.tech || "").toLowerCase();
    const text = card.textContent.toLowerCase();
    const matchesSearch = text.includes(query) || tech.includes(query);
    const matchesFilter = activeFilter === "all" || tech.includes(activeFilter);
    card.style.display = matchesSearch && matchesFilter ? "" : "none";
  });
}

searchEl?.addEventListener("input", filterProjects);
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterProjects();
  });
});


// Modal for Project Details
document.addEventListener("DOMContentLoaded", () => {
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalDemo = document.getElementById("modalDemo");
const modalRepo = document.getElementById("modalRepo");
const closeModalBtn = document.querySelector(".modal-close");

function openModal(card) {
  modalTitle.textContent = card.querySelector("h3").textContent;
  modalDesc.textContent = card.querySelector("p")?.textContent || "No description available.";
  modalTech.textContent = card.dataset.tech || "Not specified";
  modalDemo.href = card.querySelector("a[href*='http']")?.href || "#";
  modalRepo.href = card.querySelector("a[href*='github']")?.href || "#";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", e => {
  const card = e.target.closest(".project-card");
  if (card) openModal(card);
});

closeModalBtn.addEventListener("click", closeModal);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});
});
