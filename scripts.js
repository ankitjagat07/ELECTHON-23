document.getElementById('voterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    console.log('Form Data Submitted:', formObject);

    alert('Form submitted successfully!');
});
