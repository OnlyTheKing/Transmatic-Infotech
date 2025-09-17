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
