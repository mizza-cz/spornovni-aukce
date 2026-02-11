(function () {
  const init = () => {
    const form = document.querySelector(".registration-form");
    if (!form || form.dataset.validationInit) return;
    form.dataset.validationInit = "1";

    const messages = {
      valueMissing: "Vyplňte prosím toto pole.",
      typeMismatchEmail: "Zadejte prosím platný e-mail.",
      passwordMismatch: "Hesla se neshodují.",
      checkboxMissing: "Pro pokračování je potřeba souhlasit.",
    };

    const getErrorEl = (field) => {
      const wrap = field.closest(".d-grid");
      return wrap ? wrap.querySelector(".field-error") : null;
    };

    const setInvalid = (field, text) => {
      const err = getErrorEl(field);
      field.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
      if (err) err.textContent = text || "";
    };

    const clearInvalid = (field) => {
      const err = getErrorEl(field);
      field.classList.remove("is-invalid");
      field.removeAttribute("aria-invalid");
      if (err) err.textContent = "";
    };

    const validateField = (field) => {
      if (field.type === "checkbox") {
        if (field.required && !field.checked) {
          setInvalid(field, messages.checkboxMissing);
          const label = field.closest(".custom-checkbox");
          if (label) label.classList.add("is-invalid");
          return false;
        }
        clearInvalid(field);
        const label = field.closest(".custom-checkbox");
        if (label) label.classList.remove("is-invalid");
        return true;
      }

      if (field.name === "password_confirm") {
        const pass = form.querySelector('input[name="password"]');
        if (pass && field.value && field.value !== pass.value) {
          setInvalid(field, messages.passwordMismatch);
          return false;
        }
      }

      if (!field.checkValidity()) {
        if (field.validity.valueMissing) {
          setInvalid(field, messages.valueMissing);
          return false;
        }
        if (field.validity.typeMismatch && field.type === "email") {
          setInvalid(field, messages.typeMismatchEmail);
          return false;
        }
        setInvalid(field, field.validationMessage);
        return false;
      }

      clearInvalid(field);
      return true;
    };

    form.addEventListener(
      "blur",
      (e) => {
        const field = e.target;
        if (field.matches("input, select, textarea")) validateField(field);
      },
      true
    );

    form.addEventListener("submit", (e) => {
      const fields = Array.from(
        form.querySelectorAll("input, select, textarea")
      );
      const allValid = fields.map(validateField).every(Boolean);
      if (!allValid) {
        e.preventDefault();
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
      }
    });
  };

  init();
  const obs = new MutationObserver(init);
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
