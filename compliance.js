$(document).ready(function() {
    
    $('#sidebarToggleBtn').on('click', function(e) {
        e.preventDefault();
        $('#sidebarMenu').addClass('show');
        $('#sidebarOverlay').addClass('show');
        $('body').css('overflow', 'hidden'); 
    });

    $('#sidebarOverlay').on('click', function() {
        $('#sidebarMenu').removeClass('show');
        $('#sidebarOverlay').removeClass('show');
        $('body').css('overflow', ''); 
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    $('.menu-link').on('click', function(e) {
        if($(this).attr('href') === '#') {
            e.preventDefault();
        }
        $('.menu-link').removeClass('active text-secondary').addClass('text-secondary');
        $(this).removeClass('text-secondary').addClass('active');
    });

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

    $('.discard-btn').on('click', function(e) {
        e.preventDefault();
        if(confirm("Are you sure you want to discard this draft? All progress will be lost.")) {
            window.location.href = "activity.html";
        }
    });

    $('.next-btn').on('click', function(e) {
    e.preventDefault();
    window.location.href = "review.html";
});

});