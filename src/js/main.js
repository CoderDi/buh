$(document).ready(function() {
  $(".js-getcall").click(function(){
    $("#popup-form").addClass("popup--show");
  });
  $(".js-getsale").click(function(){
    $("#popup-sale").addClass("popup--show");
  });
  $(".popup__bg").click(function(){
    $(this).parents(".popup").removeClass("popup--show");
  });
  $(".popup__close").click(function(){
    $(this).parents(".popup").removeClass("popup--show");
  });



  $(window).scroll(function() {
    if ($(this).scrollTop() > 247){  
      $('.header__menu').addClass("glide--top");
    }
    else{
      $('.header__menu').removeClass("glide--top");
    }
    if ($(this).scrollTop() > 300){  
      $('.header__menu').addClass("glide");
    }
    else{
      $('.header__menu').removeClass("glide");
    }
  });









  //calculator
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