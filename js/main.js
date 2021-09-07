$(function () {
    if ($(document).scrollTop() > 100) $('#backToTop').fadeIn();
    /* Scroll to top when arrow up clicked BEGIN */
    $(window).on("scroll", function() {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });
    $("#backToTop").on("click", function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    /* خصائص وحركات السلايدرات */
    $('#primSlider').carousel({
        interval: 10000,
    })
    $('#subSlider1').carousel({
        interval: 7000,
    })
    $('#subSlider2').carousel({
        interval: 9000
    })
    $('#subSlider3').carousel({
        interval: 11000
    })
    $('#subSlider4').carousel({
        interval: 20000
    })

    /* تكبير الصورة البارزة عد النقر على الأيقونة */
    $(".figure-img .icon i").on("click", function() {
        $(".figure-img").addClass("full");
        $(this).parentsUntil("figure").find("img").hide().fadeIn(500);

        $("body").css("overflow","hidden");
        
        $("body").on("mousedown", function(x) {
            if (x.target.tagName != "IMG") {
                // console.log(x.target.tagname);
                $(".figure-img").removeClass("full");
                $("body").css("overflow","");
            }
        })
    })

    /* تكبير أي صورة داخل المشاركة */
    $(".post article img:not(.img-fluid, .picture-profile img)").on("click", function(e) {
        $(this).css({
            "height": "unset",
            "width": "unset",
            "max-height": "90%",
            "max-width": "90%",
            "margin": "auto",
            "position": "fixed",
            "top": 0,
            "bottom": 0,
            "right": 0,
            "left": 0,
            "margin": "auto",
            "z-index": 1111,
            "cursor": "auto"
        });
        
        $("body").css("overflow","hidden");
        
        $("body").on("mousedown", function(x) {
            
            if (x.target.tagName != "IMG") {
                // console.log(x.target.tagname);
                $(".post article img:not(.img-fluid, .picture-profile img)").css({
                    "max-height": "unset",
                    "max-width": "unset",
                    "position": "relative",
                    "max-width": "75%",
                    "margin-left": "10px",
                    "margin-right": "10px",
                    "z-index": "auto",
                    "cursor": "pointer"
                })
                $("body").css("overflow","");
            }
        })
    })

    /////////////////////////// تحديد عناصر تصنيفات البحث
    function showChecked(name, check){
        var selectAll = document.querySelectorAll(".cate-all input");
        selectAll.forEach( x => {
            x.onchange = function() {
                if ($(this).is("#checkAll") || $(check).length === $(name).length) {
                    $(".cate-all :checkbox").prop("checked", $(this).prop("checked"));
                    $("#checkAll").prop("indeterminate", false);
                }
                else if ($(check).length > 0 && $(check).length < $(name).length) {
                    $("#checkAll").prop("indeterminate", true);
                    $("#checkAll").prop("checked", false);
                }
                else {
                    $("#checkAll").prop("indeterminate", false);
                    $("#checkAll").prop("checked", false);
                }
                
                if ($(check).length <= 0) {
                    $("#searchAll span").text("يرجى اختيار قسم واحد على الأقل").css("color", "red");
                }
                else if ($(check).length !== $(name).length) {
                    $("#searchAll span").text("البحث في أقسام محددة").css("color", "");
                }
                else {
                    $("#searchAll span").text("البحث في جميع الأقسام").css("color", "");
                }
            }
        });
    }

    /* تحديد عناصر تصنيفات البحث */
    $("#searchPlace input:checkbox").on("click", function() {
        showChecked("input[name='postCate[]']", "input[name='postCate[]']:checked");
    });
    
    /////////////////////////// أيقونة مسح كلمات البحث
    $(".page #searchWords ~ .search-clear").on("click", function() {
        $(this).parent().find("#searchWords").val("").focus();
    })
    $(".page #searchWords").on("focus keyup", function() {
        if ($(this).val() == "") {
            $(this).parent().find(".search-clear").hide();
        }
        else {
            $(this).parent().find(".search-clear").show();
        }
    })

    /////////////////////////// بوكس عارض الصور lightbox --> modal
    $(".cardImg .icon").on("click", function() {
        $(this).attr({
            "data-toggle": "modal",
            "data-target":"#imgModal"
        });
        var img = $(this).parentsUntil(".card").parent().find(".cardImg");
        if (img.children('img').is('img')) {
            var img_url = img.children('img').attr('src');
        }
        else {
            var img_url = img.css("background-image").replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        }
        title = $(this).parentsUntil('.card').parent().find('h5').text();
        var modalHtml = 
        '<div class="modal fade" id="imgModal" tabindex="-1" role="dialog" aria-labelledby="imgModalTitle" aria-hidden="true">\
            <div class="modal-dialog modal-xl" role="document">\
                <div class="modal-content">\
                    <div class="modal-body d-flex justify-content-center">\
                        <div class="modal-header">\
                            <h5 class="modal-title" id="imgModalTitle">'+title+'</h5>\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                            </button>\
                        </div>\
                        <img>\
                    </div>\
                </div>\
            </div>\
        </div>';
        $("main").before(modalHtml);

        $("#imgModal").on("show.bs.modal", function(e) {
            $(this).find("img").attr({
                "src": img_url,
                "alt": title
            });
        })

        $("#imgModal").on("hidden.bs.modal", function(e) {
            $(this).remove();
        })
    })

    /////////////////////////// عمل أنيمشن ظهور لأقسام وبوكسات الصفحة الرئيسية
    function fadeSection(item) {
        let scrTop = $(window).scrollTop();
        let winHei = $(window).height();
        if ((scrTop + winHei) > ($(item).offset().top + ($(item).height()/2)) && scrTop < ($(item).offset().top + $(item).height() - ($(item).height()/3))) {
            // console.log($(window).scrollTop());
            
            $(item).animate({
                "opacity": 1,
            }, 700).removeClass("animate");
        }
    }
    $(".animate").each(function(index, item) {
        $(".animate").css("opacity", "0");
        fadeSection(item);
        $(window).on("scroll", function() {
            if ($(".animate").length > 0)
                fadeSection(item);
            else
                $(this).off();
        })
    })

    /////////////////////////// Nice Scroll Properties
    /* $("body").niceScroll({
        // cursorwidth:"16px",
        cursorcolor: "#c28f50",
        background: "rgba(217,185,146, 0.7)",
        cursorborder:"0",
        // zindex: 1030,
    }); */
});