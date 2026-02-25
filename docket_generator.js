$(document).ready(function() {
    
    // Sidebar logic
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

    // Menu logic
    $('.menu-link').on('click', function(e) {
        if($(this).attr('href') === '#') {
            e.preventDefault();
        }
        $('.menu-link').removeClass('active text-secondary').addClass('text-secondary');
        $(this).removeClass('text-secondary').addClass('active');
    });

    // Include All Button Logic
    $('#includeAllBtn').on('click', function(e) {
        e.preventDefault();
        
        // Check all un-checked required checkboxes
        $('.req-checkbox:not(:checked)').prop('checked', true).trigger('change');
        
        // Change button state to show success
        const $btn = $(this);
        $btn.removeClass('btn-outline-cyan').addClass('btn-cyan text-white').html('<i class="fa-solid fa-check me-2"></i> All Included');
        
        setTimeout(() => {
            $btn.removeClass('btn-cyan text-white').addClass('btn-outline-cyan').html('Include All Required');
        }, 2000);
    });

    // Checkbox Change Event to manage background color warning
    $('.custom-checkbox').on('change', function() {
        const $item = $(this).closest('.doc-item');
        const isRequired = $item.find('.badge-required').length > 0;
        
        if (isRequired && !$(this).is(':checked')) {
            $item.addClass('bg-warning-custom-subtle');
        } else {
            $item.removeClass('bg-warning-custom-subtle');
        }
    });

});