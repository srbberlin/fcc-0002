$(window).resize(function () {
  $("header,.section").css("padding-top", $("#Nav").height());
});

$(window).on("load", function () {
  var h = $("#Nav").height();
  $("#MAIN, .section").css({"padding-top": h, "margin-top": 30});
  $("#PRES").css("margin-top", h);
});
