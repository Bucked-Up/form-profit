const handleForm = ({ formId, klaviyoA, klaviyoG }) => {
  const form = document.querySelector(`#${formId}`);
  // const urlParams = new URLSearchParams(window.location.search);

  const createInvalid = (text) => {
    return `<p class="error-text">${text}</p>`;
  };

  // const getTopLevelDomain = () => {
  //   const fullDomain = window.location.hostname;
  //   const domainRegex = /\.([a-z]{2,})\.([a-z]{2,})$/;
  //   const match = fullDomain.match(domainRegex);
  //   if (match) {
  //     return `.${match[1]}.${match[2]}`;
  //   } else {
  //     return fullDomain;
  //   }
  // };
  // const cookieConfig = `path=/; domain=${getTopLevelDomain()};max-age=3600`;
  // const iti = window.intlTelInput(document.querySelector("#phone"), {
  //   utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.3.2/build/js/utils.js",
  //   autoPlaceholder: "aggressive",
  //   initialCountry: "auto",
  //   geoIpLookup: async (success, failure) => {
  //     try {
  //       const cookieCountry = document.cookie.split("user_country=")[1]?.split(";")[0];
  //       if (cookieCountry) {
  //         success(cookieCountry);
  //         return;
  //       }
  //       const response = await fetch("https://get.geojs.io/v1/ip/country.json");
  //       const data = await response.json();
  //       if (response.ok) {
  //         document.cookie = `user_country=${data.country};${cookieConfig}`;
  //         success(data.country);
  //       } else throw new Error("Error Fetching Ip", response, data);
  //     } catch (e) {
  //       console.warn(e);
  //       failure();
  //     }
  //   },
  // });

  // const handleKlaviyo = async () => {
  //   const formData = new FormData();
  //   formData.set("first_name", document.querySelector("#first-name").value);
  //   formData.set("last_name", document.querySelector("#last-name").value);
  //   formData.set("email", document.querySelector("#email").value);
  //   formData.set("phone_number", iti.getNumber());
  //   formData.set("state", document.querySelector("#state").value);
  //   formData.set("city", document.querySelector("#city").value);
  //   formData.set("industry", document.querySelector("#industry").value);
  //   const utms = Object.fromEntries(urlParams.entries());
  //   Object.keys(utms).forEach((key) => {
  //     formData.set(key, utms[key]);
  //   });
  //   formData.set("$fields", ["state", "city", "industry", ...Object.keys(utms)]);
  //   const response = await fetch(`https://manage.kmail-lists.com/ajax/subscriptions/subscribe?a=${klaviyoA}&g=${klaviyoG}`, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   if (!response.ok) {
  //     return Promise.reject("Klaviyo Network response was not ok: " + response.statusText);
  //   }
  //   const data = await response.json();
  //   if (!data.success) return Promise.reject("Error sending to klaviyo: " + data.errors);
  // };

  const checkInput = (input) => {
    // if (input.isIti && !input.isIti.isValidNumber()) {
    //   input.isIti.a.classList.add("error");
    //   input.isIti.a.insertAdjacentHTML("afterend", createInvalid("Invalid!"));
    //   return false;
    // }
    // if (input.isIti) {
    //   input.isIti.a.classList.remove("error");
    //   if (input.isIti.a.nextElementSibling?.classList.contains("error-text")) input.isIti.a.nextElementSibling.remove();
    //   return true;
    // }
    const regex = input.getAttribute("regex");
    const reg = new RegExp(`${regex}`);
    const match = document.getElementById(input.getAttribute("match"));
    const matcher = document.querySelector(`[match="${input.id}"]`);

    const valueIsNotValid = () => {
      return !input.checkValidity() || (regex && !reg.test(input.value)) || (match && input.value !== match.value) || (matcher && input.value !== matcher.value && matcher.value.length !== 0);
    };

    if (input.value.trim().length === 0 || valueIsNotValid()) {
      input.classList.add("error");
      if (valueIsNotValid() && input.value.trim().length > 0 && !input.nextElementSibling?.classList.contains("error-text")) {
        input.insertAdjacentHTML("afterend", createInvalid("Invalid!"));
      }
      return false;
    }
    input.classList.remove("error");
    matcher?.classList.remove("error");
    match?.classList.remove("error");
    if (input.nextElementSibling?.classList.contains("error-text")) input.nextElementSibling.remove();
    if (matcher?.nextElementSibling?.classList.contains("error-text")) matcher?.nextElementSibling.remove();
    if (match?.nextElementSibling?.classList.contains("error-text")) match?.nextElementSibling.remove();
    return true;
  };

  const addListener = (input) => {
    let actualInput = input.isIti ? input.isIti.a : input;
    const listeners = ["focusout"];
    listeners.forEach((ev) => {
      actualInput.addEventListener(ev, () => {
        checkInput(input);
      });
    });
  };

  const inputsToValidate = [document.querySelector("#email"), document.querySelector("#email-confirm"), document.querySelector("#phone")];

  inputsToValidate.forEach((input) => {
    addListener(input);
  });

  const stateSelect = document.querySelector("#state");
  stateSelect.innerHTML =
    '<option value="">Select Your State</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AS">American Samoa</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="UM-81">Baker Island</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="GU">Guam</option><option value="HI">Hawaii</option><option value="UM-84">Howland Island</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="UM-86">Jarvis Island</option><option value="UM-67">Johnston Atoll</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="UM-89">Kingman Reef</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="UM-71">Midway Atoll</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="UM-76">Navassa Island</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="MP">Northern Mariana Islands</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="UM-95">Palmyra Atoll</option><option value="PA">Pennsylvania</option><option value="PR">Puerto Rico</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UM">United States Minor Outlying Islands</option><option value="VI">United States Virgin Islands</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="UM-79">Wake Island</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option>';

  const validateForm = () => {
    let isValid = true;
    inputsToValidate.forEach((input) => {
      if (!checkInput(input)) {
        isValid = false;
        input.isIti ? input.isIti.a.classList.add("error") : input.classList.add("error");
      }
    });
    if (isValid) return true;
    return false;
  };

  const getValues = () => {
    const formFields = {};
    formFields.first_name = document.querySelector("#first-name").value;
    formFields.last_name = document.querySelector("#last-name").value;
    formFields.email = document.querySelector("#email").value;
    formFields.phone = document.querySelector("#phone").value;
    formFields.industry = document.querySelector("#industry").value;
    formFields.address = {};
    formFields.address.city = document.querySelector("#city").value;
    formFields.address.country_code = "US";
    formFields.address.state = document.querySelector("#state").value;
    return formFields;
  };

  const apiErrorField = document.querySelector(".api-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateForm() || !form.checkValidity()) {
      alert("Required field missing or invalid.");
      button.toggleAttribute("disabled");
      spinner.classList.toggle("active");
      return;
    }
    const button = document.querySelector('button[type = "submit"]');
    const spinner = document.querySelector(".lds-dual-ring");
    button.toggleAttribute("disabled");
    spinner.classList.toggle("active");
    const industryValue = document.querySelector("#industry").value;
    if (industryValue === "Individual" || industryValue === "Amazon") {
      const urlParams = new URLSearchParams();
      urlParams.set("first-name", document.querySelector("#first-name").value);
      urlParams.set("last-name", document.querySelector("#last-name").value);
      urlParams.set("email", document.querySelector("#email").value);
      urlParams.set("phone", document.querySelector("#phone").value);
      urlParams.set("state", document.querySelector("#state").value);
      urlParams.set("city", document.querySelector("#city").value);
      window.location.href = redirectUrls[industryValue] + `?${urlParams}`;
      return;
    }
    const body = getValues();
    body["customer_group"] = "wholesale_pending";
    const response = await fetch("https://webhook-processor-production-4aa3.up.railway.app/webhook/7b3da2dc-5dc9-434a-bee4-403388d1e323", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const responseLog = await response.json();
      apiErrorField.classList.add("active");
      apiErrorField.innerHTML = responseLog.error_message;
      button.toggleAttribute("disabled");
      spinner.classList.toggle("active");
      return;
    }
    // try {
    //   await handleKlaviyo();
    // } catch (e) {
    //   console.error(e);
    // }
    const modal = document.querySelector(".thank-you-modal-whole");
    if (modal) modal.style.display = "flex";
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead-captured",
    });
    setTimeout(() => {
      window.location.href = "https://buckedup.com";
    }, 5000);
  });
};
