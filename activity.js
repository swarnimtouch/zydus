$(document).ready(function() {
    
    // 1. Sidebar Toggle Logic for Mobile
    $('#sidebarToggleBtn').on('click', function(e) {
        e.preventDefault();
        $('#sidebarMenu').addClass('show');
        $('#sidebarOverlay').addClass('show');
        // Prevent background scrolling while sidebar is open
        $('body').css('overflow', 'hidden'); 
    });

    // Close sidebar when clicking on the dark overlay
    $('#sidebarOverlay').on('click', function() {
        $('#sidebarMenu').removeClass('show');
        $('#sidebarOverlay').removeClass('show');
        $('body').css('overflow', ''); 
    });

    // 2. Initialize jQuery DataTables with Responsive Extension
    $('#activitiesTable').DataTable({
        responsive: true,
        paging: false,    // Disables pagination since your design doesn't use it
        info: false,      // Hides "Showing 1 to N of N entries"
        searching: false, // Hides the default DataTable search box
        columnDefs: [
            // Target specific columns to never hide (Activity ID and Actions)
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 }
        ]
    });

    // 3. Filter Tag Removal
    $('.remove-tag').on('click', function() {
        $(this).closest('.filter-tag').fadeOut(200, function() {
            $(this).remove();
        });
    });

    // 4. View Toggle Interaction
    $('.view-toggle').on('click', function() {
        $('.view-toggle').removeClass('active text-primary').addClass('text-muted');
        $(this).removeClass('text-muted').addClass('active text-primary');
    });

    // 5. Sidebar Menu Interaction (Active State)
    $('.menu-link').on('click', function(e) {
        if($(this).attr('href') === '#') {
            e.preventDefault();
        }
        $('.menu-link').removeClass('active text-secondary').addClass('text-secondary');
        $(this).removeClass('text-secondary').addClass('active');
        $('.menu-link:not(.active) .menu-icon').css('color', ''); 
    });

    // 6. Action Button Hovers
    $('.action-btn').on('mouseenter', function() {
        $(this).css('transform', 'scale(1.1)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'scale(1)');
    });

});