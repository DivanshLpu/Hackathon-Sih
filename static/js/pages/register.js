document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const roleSelect = document.getElementById("role");
  const studentFields = document.getElementById("student-fields");
  const companyFields = document.getElementById("company-fields");
  const errorBox = document.getElementById("form-error");

  const params = new URLSearchParams(window.location.search);
  if (params.get("role") === "company") roleSelect.value = "company";

  function updateRoleFields() {
    const company = roleSelect.value === "company";
    studentFields.classList.toggle("d-none", company);
    companyFields.classList.toggle("d-none", !company);
  }
  roleSelect.addEventListener("change", updateRoleFields);
  updateRoleFields();

  form.addEventListener("submit", async event => {
    event.preventDefault();
    errorBox.classList.add("d-none");

    const role = roleSelect.value;
    const body = {
      role,
      email: form.email.value.trim(),
      password: form.password.value,
      confirm_password: form.confirm_password.value
    };

    if (role === "student") {
      body.first_name = form.first_name.value.trim();
      body.last_name = form.last_name.value.trim();
    } else {
      body.company_name = form.company_name.value.trim();
    }

    const submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    submit.textContent = "Creating account...";

    try {
      await API.post("/api/auth/register", body);
      window.location.href = "login.html";
    } catch (error) {
      errorBox.textContent = error.message;
      errorBox.classList.remove("d-none");
      submit.disabled = false;
      submit.textContent = "Create account";
    }
  });
});
