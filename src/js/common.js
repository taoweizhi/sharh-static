$(document).ready(function () {
    let scrollTop = 0;
    let scrollHeight = 0;
    $(window).scroll(function () {
        scrollTop = $(window).scrollTop();
        scrollHeight = $(document).height();
        $('.counter').html(scrollTop);

        if (scrollTop + windowHeight > scrollHeight - 80) {
            $(footer).addClass('scrolled-footer');
        } else if (scrollTop + windowHeight <= scrollHeight - 80) {
            $(footer).removeClass('scrolled-footer');
        }

        if (scrollTop >= 100) {
            $('#global-nav').addClass('scrolled-nav');
            $('.page-content').addClass('scrolled-content');
        } else if (scrollTop < 100) {
            $('#global-nav').removeClass('scrolled-nav');
            $('.page-content').addClass('scrolled-content');
        }
    });

});

const signinFormHandler = (result) =
>
{
}
;
const loginFormHandler = (result) =
>
{
}
;
const phoneFormHandler = (result) =
>
{
}
;
const profileFormHandler = (result) =
>
{
}
;
const attendanceFormHandler = (result) =
>
{
}
;
const reAttendanceFormHandler = (result) =
>
{
}
;
const infoFormHandler = (result) =
>
{
}
;
const codeSubmitFormHandler = (result) =
>
{
}
;
const groupFormHandler = (result) =
>
{
}
;
