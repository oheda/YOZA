const API_BASE = "https://yoza.onrender.com/api";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    if (rememberMe) localStorage.setItem("rememberedEmail", email);
    else localStorage.removeItem("rememberedEmail");

    localStorage.setItem("token", data.token);
    localStorage.setItem("loginTime", String(Date.now()));

    alert("Login successful!");
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
});
