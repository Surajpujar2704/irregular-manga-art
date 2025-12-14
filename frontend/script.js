const backendURL = "https://irregular-manga-art.onrender.com";

function comingSoon(){
  document.getElementById("modal").style.display = "grid";
}
function closeModal(){
  document.getElementById("modal").style.display = "none";
}

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const status = document.getElementById("statusMessage");

  status.textContent = "Sending...";
  status.style.color = "#9aa0b4";

  try {
    const res = await fetch(`${backendURL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (data.ok) {
      status.textContent = "Message sent successfully!";
      status.style.color = "#6cf2c2";
      e.target.reset();
    } else {
      status.textContent = "Server error.";
      status.style.color = "red";
    }
  } catch (err) {
    status.textContent = "Backend not reachable.";
    status.style.color = "red";
  }
});
