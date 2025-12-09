function comingSoon() {
    alert("Coming Soon!");
}
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch("http://127.0.0.1:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (data.ok) {
      alert("Message sent!");
    } else {
      alert("Server error!");
    }
  } catch (err) {
    alert("Could not connect to backend!");
    console.error(err);
  }
});
