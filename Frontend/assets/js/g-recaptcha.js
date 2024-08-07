grecaptcha.ready(function() {
    var forms = document.querySelectorAll('.awcf-form-wrapper');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            grecaptcha.execute(envData.site_key, {action: 'submit'}).then(function(token) {
                var recaptchaResponse = form.querySelector('.g-recaptcha-response');
                recaptchaResponse.value = token;
                form.submit();
            });
        });
    });
});