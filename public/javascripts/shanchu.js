/**
 * Created by TT on 2017/1/14.
 */
$(function () {
  $('.del').click(function (e) {
    let target = $(e.target);
    let id = target.data('shanchu');
    let zone = $('#zone'+id);
    $.ajax({
      type:'delete',
      url:'/users?id'+id,

    }).done(function(results){
      if(results.success==1){
        if(zone.length > 0 ){
          zone.remove();
        }
      }
    })
  })
})