document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".feedback-form");
    const STORAGE_KEY = "feedback-form-state";
    let formData = { email: "", message: "" };

    
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        formData = JSON.parse(savedData);
        form.email.value = formData.email;
        form.message.value = formData.message;
    }

    
    form.addEventListener("input", (event) => {
        formData[event.target.name] = event.target.value.trim();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    });

   
    form.addEventListener("submit", (event) => {
        event.preventDefault();

       
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!email || !message) {
            alert("Fill please all fields");
            return;
        }

        console.log({ email, message });
        localStorage.removeItem(STORAGE_KEY);  
        form.reset();  
        formData = { email: "", message: "" };  
    });
});

