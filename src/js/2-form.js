document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".feedback-form");
    const STORAGE_KEY = "feedback-form-state";
    let formData = { email: "", message: "" };

    // Проверяем, есть ли сохраненные данные в localStorage
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        formData = JSON.parse(savedData);
        form.email.value = formData.email;
        form.message.value = formData.message;
    }

    // Слушатель на изменения в форме
    form.addEventListener("input", (event) => {
        formData[event.target.name] = event.target.value.trim();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    });

    // Слушатель на отправку формы
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Проверка на заполненность всех полей
        if (!form.email.value || !form.message.value) {
            alert("Fill please all fields");
            return;
        }

        console.log(formData);
        localStorage.removeItem(STORAGE_KEY);  // Убираем сохраненные данные
        form.reset();  // Очищаем форму
        formData = { email: "", message: "" };  // Сброс данных
    });
});

