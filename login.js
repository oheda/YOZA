const API_BASE = "https://yoza.onrender.com/api";

// Auto logout (front-end timer backup to 3 days)
(function restoreRemembered() {
  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("rememberMe").checked = true;
  }

  const loginTime = localStorage.getItem("loginTime");
  if (loginTime) {
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    if (Date.now() - Number(loginTime) > threeDays) {
      localStorage.removeItem("loginTime");
      localStorage.removeItem("token");
      alert("Session expired. Please login again.");
      window.location.href = "login.html";
    }
  }
})();

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
      credentials: "include", // allow cookie from Render
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    if (rememberMe) localStorage.setItem("rememberedEmail", email);
    else localStorage.removeItem("rememberedEmail");

    // optional backup if you want to use Authorization header later
    if (data.token) localStorage.setItem("token", data.token);

    localStorage.setItem("loginTime", String(Date.now()));
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error("Login error:", err);
    alert("Something went wrong. Please try again.");
  }
});
