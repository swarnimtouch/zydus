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

    $('.menu-link').on('click', function(e) {
        if($(this).attr('href') === '#') {
            e.preventDefault();
        }
        $('.menu-link').removeClass('active text-secondary').addClass('text-secondary');
        $(this).removeClass('text-secondary').addClass('active');
    });

    $('#adminTable').DataTable({
        responsive: true,
        paging: true,
        pageLength: 10,
        lengthChange: false,
        info: true,      
        searching: false, 
        language: {
            info: "SHOWING _START_-_END_ OF _TOTAL_ ACTIVITIES",
            paginate: {
                previous: "<i class='fa-solid fa-chevron-left'></i>",
                next: "<i class='fa-solid fa-chevron-right'></i>"
            }
        },
        columnDefs: [
            { responsivePriority: 1, targets: 1 }, 
            { responsivePriority: 2, targets: -1 }, 
            { orderable: false, targets: [0, -1] } 
        ],
        dom: '<"top">rt<"bottom d-flex justify-content-between align-items-center p-3 border-top border-light-subtle text-muted fs-8 fw-bold text-uppercase"ip><"clear">'
    });

    $('.admin-checkbox').on('change', function() {
        if($(this).is(':checked')) {
            $(this).closest('tr').addClass('table-row-selected');
        } else {
            $(this).closest('tr').removeClass('table-row-selected');
        }
    });

    $('.bulk-action-btn').on('click', function(e) {
    e.preventDefault();
    window.location.href = "approval_review.html";
});

});