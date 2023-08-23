$(document).ready(function() {
    
    $(".dropdown-toggle").on("click", function() {
      $(".dropdown-menu").toggle();
    });

    $(document).on("click", function(event) {
      if (!$(event.target).closest(".dropdown").length) {
        $(".dropdown-menu").hide();
      }
    });
});