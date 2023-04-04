const inputs = document.querySelectorAll('.input-container input');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentNode.querySelector('label').classList.add('active');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentNode.querySelector('label').classList.remove('active');
        }
    });
});