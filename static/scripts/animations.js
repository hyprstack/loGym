$(document).ready(function(){
  console.log("Doc ready");
    $('.mainList').hide();

    $(window).load(function(){
      $('.mainList').slideDown(300);
    });

});
