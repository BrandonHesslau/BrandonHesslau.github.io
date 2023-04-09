$(document).ready(function() {
    $('.project').click(function() {
      var $details = $(this).find('.details');
      $('.details').not($details).removeClass('open').css('max-height', '0');
      $details.addClass('open').css('max-height', $details[0].scrollHeight + 'px');
      $('.project').removeClass('open'); // remove the open class from all projects
      $(this).addClass('open'); // add the open class to the clicked project
    });
  });
  