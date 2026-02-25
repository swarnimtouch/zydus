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

    // Version History DataTable Initialization
    $('#versionTable').DataTable({
        responsive: true,
        paging: false,
        info: false,
        searching: false,
        ordering: false,
        columnDefs: [
            { responsivePriority: 1, targets: 0 },
            { responsivePriority: 2, targets: -1 }
        ]
    });

    // Adjust DataTable on Accordion toggle
    $('#collapseOne').on('shown.bs.collapse', function () {
        $('#versionTable').DataTable().columns.adjust().responsive.recalc();
    });

    $('.approve-btn').on('click', function(e) {
    e.preventDefault();
    window.location.href = "agreement_preview.html";
});

});