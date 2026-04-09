// ----- Mobile toggle -----
const toggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  
if(nav.classList.contains("active")) {
    toggle.innerHTML = "&times;"; // Change to 'X' when active
  } else {
    toggle.innerHTML = "&#9776;"; // Change back to hamburger when inactive
  }

});

// Close menu when link clicked (mobile)
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if(nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  });
});

// ----- Active scroll section -----
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Prevent actual submit for demo

// -----contact form submmission with show toast notification-----

const form = document.getElementById("contact-form");
const button = form.querySelector("button");

// Toast setup
let toastContainer = document.getElementById("toast-container");
if (!toastContainer) {
  toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  toastContainer.style.position = "fixed";
  toastContainer.style.top = "20px";
  toastContainer.style.right = "20px";
  toastContainer.style.zIndex = "9999";
  document.body.appendChild(toastContainer);
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.padding = "12px 20px";
  toast.style.marginTop = "10px";
  toast.style.borderRadius = "8px";
  toast.style.color = "#fff";
  toast.style.minWidth = "200px";
  toast.style.fontWeight = "bold";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";
  toast.style.backgroundColor = type === "success" ? "#4CAF50" : "#F44336";

  toastContainer.appendChild(toast);

  setTimeout(() => { toast.style.opacity = "1"; }, 50);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  if (!data.name || !data.email || !data.message) {
    showToast("All fields are required.", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Sending...";

  try {
    // Always use the live backend on Render (even when testing frontend locally)
    const backendUrl = "https://myportfolio-backendready.onrender.com/api/contact";

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      showToast("Message sent successfully ✅", "success");
      form.reset();
    } else {
      showToast(result.error || "Something went wrong.", "error");
    }
  } catch (err) {
    showToast("Server error. Please try again later.", "error");
    console.error("Form submission error:", err);
  } finally {
    button.disabled = false;
    button.textContent = "Send";
  }
});

// Create a toast container if it doesn't exist

// ----- Scroll Animation Observer -----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-section");
    } else {
      // Optional: Remove class to animate repeatedly if they scroll back up
      // entry.target.classList.remove("show-section");
    }
  });
}, {
  threshold: 0.15 // Triggers when 15% of the section is visible
});

// Add the hidden class to all sections and observe them
const allSections = document.querySelectorAll("section");
allSections.forEach((el) => {
  el.classList.add("hidden-section");
  observer.observe(el);
});
