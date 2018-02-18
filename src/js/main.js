$(document).ready(function() {
  $("#calc-system").on("input", function(){
    $(this).parents(".calc__section").find(".calc__section_shtrih-item").removeClass("calc__section_shtrih--active");
    $(this).parents(".calc__section").find(".calc__section_shtrih-item:nth-child("+$(this).val()+")").addClass("calc__section_shtrih--active");
    
  });
});