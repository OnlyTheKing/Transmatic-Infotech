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
}

// Support form


function handleFormSubmission(formId, statusId) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    status.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "✅ Thank you! Your message has been sent.";
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        status.textContent = data && data.error
          ? "❌ " + data.error
          : "❌ Submission failed. Please try again.";
      }
    } catch (err) {
      status.textContent = "❌ Network error. Please try again.";
    }
  });
}

// Attach handlers
handleFormSubmission("contactForm", "contactStatus");
handleFormSubmission("supportForm", "supportStatus");

