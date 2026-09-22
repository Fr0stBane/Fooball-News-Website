document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  if (!form) return;

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const status = document.getElementById("form-status");
  const togglePassword = document.querySelector(".toggle-password");

  // Demo account (front-end only, for project demonstration)
  const DEMO = { email: "demo@football.com", password: "football123" };

  // --- Show / hide password ---
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const show = password.type === "password";
      password.type = show ? "text" : "password";
      togglePassword.textContent = show ? "🙈" : "👁";
      togglePassword.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  }

  // --- Validation helpers ---
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate() {
    let valid = true;

    emailError.textContent = "";
    passwordError.textContent = "";
    status.textContent = "";
    status.className = "form-status";

    if (!emailPattern.test(email.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }

    if (password.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      valid = false;
    }

    return valid;
  }

  // Clear errors while typing
  [email, password].forEach((input) =>
    input.addEventListener("input", () => {
      emailError.textContent = "";
      passwordError.textContent = "";
      status.textContent = "";
      status.className = "form-status";
    })
  );

  // --- Submit ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (
      email.value.trim().toLowerCase() === DEMO.email &&
      password.value === DEMO.password
    ) {
      status.textContent = "✅ Login successful! Redirecting...";
      status.classList.add("success");

      // Remember me (stores the logged-in email)
      const remember = document.getElementById("remember");
      if (remember?.checked) {
        localStorage.setItem("fn_user", DEMO.email);
      } else {
        sessionStorage.setItem("fn_user", DEMO.email);
      }

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    } else {
      status.textContent = "❌ Invalid email or password. Try the demo account.";
      status.classList.add("error");
    }
  });
});