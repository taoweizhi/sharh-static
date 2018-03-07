$(document).ready(function(){
  let scrollTop = 0;
  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();
     $('.counter').html(scrollTop);

    if (scrollTop >= 100) {
      $('#global-nav').addClass('scrolled-nav');
    } else if (scrollTop < 100) {
      $('#global-nav').removeClass('scrolled-nav');
    }
  });
});

const signinFormHandler = (result) => {};
const loginFormHandler  = (result) => {};
const phoneFormHandler = (result) => {};
const profileFormHandler = (result) => {};
const attendanceFormHandler = (result) => {};
const reAttendanceFormHandler = (result) => {};
const infoFormHandler = (result) => {};
const codeSubmitFormHandler = (result) => {};
const groupFormHandler = (result) => {};
