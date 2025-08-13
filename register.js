async function handleRegister(event) {
  event.preventDefault();

  // Step 1: Collect form data
  const name = event.target.name.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value;
  const confirm = event.target.confirm.value;

  // Step 2: Basic client-side validation
  if (!name || !email || !password || !confirm) {
    alert("Please fill in all fields.");
    return false;
  }

  if (password !== confirm) {
    alert("Passwords do not match!");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  try {
    // Step 3: Send data to backend
    const response = await fetch("https://yoza.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();

    // Step 4: Handle response
    if (response.ok) {
      alert("Registration successful!");
      window.location.href = "login.html"; // or your login page
    } else {
      alert(result.message || "Registration failed.");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Something went wrong. Please try again later.");
  }

  return false;
}
