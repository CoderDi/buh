$(document).ready(function() {
  $("#calc-system").on("input", function(){
    $(this).parents(".calc__section").find(".calc__section_shtrih-item").removeClass("calc__section_shtrih--active");
    $(this).parents(".calc__section").find(".calc__section_shtrih-item:nth-child("+$(this).val()+")").addClass("calc__section_shtrih--active");
        
  });

  $('#workers').change(function() {
    $('.workersSlider').slider('value', $(this).val());
  });

  $('.workers-input--neg').click(function(){
    if ($('#workers').val() > 1) {
      $('#workers').val(parseInt($('#workers').val()) - 1);
      $('#workers').change();
    }
  });
  $('.workers-input--pos').click(function(){
    if ($('#workers').val() < 100) {
      $('#workers').val(1 + parseInt($('#workers').val()));
      $('#workers').change();
    }
  });
});