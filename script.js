
AOS.init({
  duration: 800,
  once: true,
});


document.getElementById("contactBtn").addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});


const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

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

  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Invalid email format.");
    return;
  }

  emailjs
    .send("Lucifer_","template_i66ddmd", {
      from_name: name,
      from_email: email,
      message: message,
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
