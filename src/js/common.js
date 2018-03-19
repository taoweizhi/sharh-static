$(document).ready(function () {
  let scrollTop = 0;
  let scrollHeight = 0;
  let windowHeight = 0;
  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();
    scrollHeight = $(document).height();
    windowHeight = $(window).height();
    $('.counter').html(scrollTop);

    if ($(window).width() < 992) {
      $('footer').addClass('scrolled-footer');
    } else if (scrollTop + windowHeight > scrollHeight -80) {
      $('footer').addClass('scrolled-footer');
    } else if (scrollTop + windowHeight <= scrollHeight-80) {
      $('footer').removeClass('scrolled-footer');
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

const signinFormHandler = (result) => {
};
const loginFormHandler = (result) => {
};
const phoneFormHandler = (result) => {
};
const profileFormHandler = (result) => {
};
const attendanceFormHandler = (result) => {
};
const reAttendanceFormHandler = (result) => {
};
const infoFormHandler = (result) => {
};
const codeSubmitFormHandler = (result) => {
};
const groupFormHandler = (result) => {
};
const changeGroupFormHandler = (result) => {
};
const sendAnnoFormHandler = (result) => {
};
const manageMsgFormHandler = (result) => {
};
const sendSms = () => {
  const section = $('#section1');
  const f = $('<form></form>');
  const newForm = section.clone();
  f.append(newForm);
  $.afterPOST((result) => {
    $('#sendSms').text(result.message)
  })('/profile/send_sms')(f)
};

const deleteMsg = (msgIndex) => {
  const groupId=getId();
  $.post(
      '/group/delete_msg%3Fgroup%3D'+groupId.toString()+'%3Fchannel%3Dboard%3Findex%3D'+msgIndex.toString(),
      function (result) {
          
      }
  )
};