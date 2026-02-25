$(document).ready(function() {
    
    // 0. Sidebar Toggle Logic for Mobile
    $('#sidebarToggleBtn').on('click', function(e) {
        e.preventDefault();
        $('#sidebarMenu').addClass('show');
        $('#sidebarOverlay').addClass('show');
        $('body').css('overflow', 'hidden'); // Disable body scroll
    });

    $('#sidebarOverlay').on('click', function() {
        $('#sidebarMenu').removeClass('show');
        $('#sidebarOverlay').removeClass('show');
        $('body').css('overflow', ''); // Enable body scroll
    });

    // 1. Initialize Bootstrap Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 2. Sidebar Navigation Interactivity
    $('.menu-link').on('click', function(e) {
        if($(this).attr('href') === '#') {
            e.preventDefault();
        }
        $('.menu-link').removeClass('active text-secondary').addClass('text-secondary');
        $(this).removeClass('text-secondary').addClass('active');
    });

    // 3. Date Validation Logic
    $('#eventDate').on('change', function() {
        const selectedDate = new Date($(this).val());
        const today = new Date();
        
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
        
        const diffTime = selectedDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        const warningElement = $(this).siblings('.warning-text');
        
        if(diffDays < 15 && !isNaN(diffDays)) {
            warningElement.fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
            $(this).css('border-color', '#d97706'); 
        } else {
            $(this).css('border-color', '#d1d5db'); 
        }
    });

    // 4. Save Draft Button Interaction
    $('.btn-save-draft').on('click', function(e) {
        e.preventDefault();
        const $btn = $(this);
        const originalHtml = $btn.html();
        
        $btn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin text-secondary me-2"></i> Saving...');
        
        setTimeout(function() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            $('.draft-info .text-cyan').text(timeString);
            
            $btn.html('<i class="fa-solid fa-check text-success me-2"></i> Saved');
            
            setTimeout(() => {
                $btn.prop('disabled', false).html(originalHtml);
            }, 2000);
            
        }, 800);
    });

    // 5. Next Step Button Click
    $('.next-btn').on('click', function(e) {
    e.preventDefault();
    window.location.href = "upload_doc.html";
});

    // 6. Discard Button
    $('.discard-btn').on('click', function(e) {
        e.preventDefault();
        if(confirm("Are you sure you want to discard this draft? All progress will be lost.")) {
            $('#activityForm')[0].reset();
        }
    });

});