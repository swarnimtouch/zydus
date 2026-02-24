$(document).ready(function() {
    
    // 1. Toggle Password Visibility
    $('.toggle-password').on('click', function() {
        // Toggle the eye / eye-slash icon class
        $(this).toggleClass('fa-eye fa-eye-slash');
        
        // Find the corresponding input field
        var inputSelector = $(this).attr('toggle');
        var inputElement = $(inputSelector);
        
        // Toggle the input type attribute
        if (inputElement.attr('type') === 'password') {
            inputElement.attr('type', 'text');
        } else {
            inputElement.attr('type', 'password');
        }
    });

    // 2. Form Validation & Submission Interception
    $('#loginForm').on('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        let isValid = true;
        const employeeId = $('#employeeId');
        const password = $('#password');
        
        // Reset previous errors
        $('.custom-input-group').removeClass('is-invalid');
        $('.invalid-feedback').hide();
        
        // Validate ID/Email
        if ($.trim(employeeId.val()) === '') {
            employeeId.closest('.custom-input-group').addClass('is-invalid');
            employeeId.closest('.mb-4').find('.invalid-feedback').show();
            isValid = false;
        }
        
        // Validate Password
        if ($.trim(password.val()) === '') {
            password.closest('.custom-input-group').addClass('is-invalid');
            password.closest('.mb-4').find('.invalid-feedback').show();
            isValid = false;
        }
        
        // Proceed if valid
        if (isValid) {
            // Change button state to simulate loading
            const btn = $('#submitBtn');
            const originalText = btn.text();
            
            btn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin me-2"></i> Authenticating...');
            
            // Simulate API request timeout
            setTimeout(function() {
                btn.prop('disabled', false).text(originalText);
                
                // Login form ko hide karna aur OTP form ko show karna
                $('#loginSection').addClass('d-none');
                $('#otpSection').removeClass('d-none');
                
                // NAYA CODE: Jaise hi OTP form show ho, pehle box par focus le aao
                $('.otp-input').first().focus();
            }, 1500);
        }
    });

    // Remove validation errors on typing
    $('input.form-control').on('input', function() {
        $(this).closest('.custom-input-group').removeClass('is-invalid');
        $(this).closest('.mb-4').find('.invalid-feedback').hide();
    });

    $('#backToLogin').on('click', function(e) {
        e.preventDefault();
        $('#otpSection').addClass('d-none');
        $('#loginSection').removeClass('d-none');
    });

    // ---- NAYA CODE START: OTP Auto-advance & Arrow Navigation ----
    $('.otp-input').on('keyup', function(e) {
        const key = e.which || e.keyCode;

        // 1. Agar Left Arrow (Key Code 37) press kiya to pichle box par jaye
        if (key === 37) {
            $(this).prev('.otp-input').focus();
        }
        // 2. Agar Right Arrow (Key Code 39) press kiya to agle box par jaye
        else if (key === 39) {
            $(this).next('.otp-input').focus();
        }
        // 3. Agar Backspace (Key Code 8) press kiya to pichle box par jaye
        else if (key === 8) {
            $(this).prev('.otp-input').focus();
        }
        // 4. Agar koi digit enter kiya gaya hai (box me 1 character aa gaya)
        else if ($(this).val().length === 1) {
            // Check karna ki type kiya gaya character sirf number (0-9) hi ho
            if (!/^\d+$/.test($(this).val())) {
                $(this).val(''); // Agar text/alphabet hai to box ko wapas khali kar do
                return;
            }
            // Agar number hai, to next box par focus bhej do
            $(this).next('.otp-input').focus();
        }
    });

    $('.verify-btn').on('click', function(e) {
        e.preventDefault();
        
        let isComplete = true;
        
        // Loop chalakar check karna ki koi OTP box khali (empty) toh nahi hai
        $('.otp-input').each(function() {
            if ($.trim($(this).val()) === '') {
                isComplete = false;
            }
        });
        
        // Agar saare 6 boxes me value daal di gayi hai
        if (isComplete) {
            // Button ka text change karke thoda loading effect dikhana (Optional, for good UI)
            $(this).html('<i class="fa-solid fa-spinner fa-spin"></i> Verifying...');
            
            // activity.html page par redirect karna (Thoda delay diya hai taki loading animation dikhe)
            setTimeout(function() {
                window.location.href = 'activity.html';
            }, 500); // 500 milliseconds (आधा सेकंड) ka delay
        } else {
            // Agar code poora nahi hai toh error message dikhana
            alert('Please enter the complete 6-digit OTP code.');
            // Jo box khali hai uspar wapas focus lana (Shake effect bhi daal sakte hain CSS se)
            $('.otp-input').filter(function() { return $(this).val() == ""; }).first().focus();
        }
    });

});