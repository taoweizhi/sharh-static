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

const defaultAction = (action) => (data) => {
  if (data.status === 302)
    location.href = data.location;
  else
    action(data);
};
const showToast = (msg) => {
  if(result)
      Materialize.toast(msg, 3000);
};
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
  if(result)
      Materialize.toast(result, 3000);
};
const manageMsgFormHandler = (result) => {
};
const activityFormHandler = (result) => {
  if(result)
      Materialize.toast(result, 3000);
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
    defaultAction(showToast)
  )
};

const leaveGroup = (groupId) => {
  $.post(
    `/group/leave_group%3Fgroup%3D${groupId}`,
    defaultAction(showToast)
  )
};

const kickOut = (groupId, targetId) => {
    $.post(
        `/group/kick_out%3Fgroup%3D${groupId}%3Ftarget%3D${targetId}`,
        defaultAction(showToast)
    )
};

const switchRole = (groupId, targetId, role) => {
    $.post(
        `/group/switch_role%3Fgroup%3D${groupId}%3Ftarget%3D${targetId}%3Frole%3D${role}`,
        defaultAction(showToast)
    )
};

const clearMsg = (channel) => {
  const groupId = getId();
  $.get(`/group/clear_msg%3Fgroup%3D${groupId}%3Fchannel%3D${channel}`,
      defaultAction(showToast)
  )
}