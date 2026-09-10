document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorBox = document.getElementById("form-error");

  form.addEventListener("submit", async event => {
    event.preventDefault();
    errorBox.classList.add("d-none");

    const submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    submit.textContent = "Signing in...";

    try {
      const result = await API.post("/api/auth/login", {
        email: form.email.value.trim(),
        password: form.password.value,
        role: form.role.value
      });

      const me = await API.get("/api/auth/me");
      const role = me.data?.user?.role || result.data?.user?.role;

      if (role === "student") window.location.href = "../student/dashboard.html";
      else if (role === "company") window.location.href = "../company/dashboard.html";
      else window.location.href = "../../index.html";
    } catch (error) {
      errorBox.textContent = error.message;
      errorBox.classList.remove("d-none");
      submit.disabled = false;
      submit.textContent = "Login";
    }
  });
});
