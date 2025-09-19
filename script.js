function openForm() {
  document.getElementById("supportModal").style.display = "block";
}

function closeForm() {
  document.getElementById("supportModal").style.display = "none";
}

window.onclick = function(event) {
  let modal = document.getElementById("supportModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// 🔹 Helper to show validation popup
function showValidationPopup(message) {
  // Remove existing popup
  const existingPopup = document.querySelector(".validation-popup");
  if (existingPopup) existingPopup.remove();

  // Create popup element
  const popup = document.createElement("div");
  popup.className = "validation-popup";
  popup.innerHTML = `
    ${message}
    <span class="close-btn">&times;</span>
  `;

  document.body.appendChild(popup);

  // Close on ✖
  popup.querySelector(".close-btn").addEventListener("click", () => popup.remove());

  // Close when clicking outside
  setTimeout(() => {
    window.addEventListener("click", function handler(event) {
      if (!popup.contains(event.target)) {
        popup.remove();
        window.removeEventListener("click", handler);
      }
    });
  }, 100);
}

// 🔹 Generic form handler
function handleFormSubmission(formId, statusId) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);

  if (!form) return;

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    // ✅ Check if form is valid before sending
    if (!form.checkValidity()) {
      showValidationPopup("⚠️ Please fill all required fields correctly.");
      return;
    }

    status.textContent = "Sending...";
    status.style.color = "white";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "✅ Thank you! Your message has been sent.";
        status.style.color = "lightgreen";
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        status.textContent = data && data.error
          ? "❌ " + data.error
          : "❌ Submission failed. Please try again.";
        status.style.color = "red";
      }
    } catch (err) {
      status.textContent = "❌ Network error. Please try again.";
      status.style.color = "red";
    }
  });
}

// Attach handlers
handleFormSubmission("contactForm", "contactStatus");
handleFormSubmission("supportForm", "supportStatus");
