const style = "<style>label.error{color: red; font-size: 15px}</style>";


const field = {
  username: {
    required: true,
    minlength: 1,
    maxlength: 30,
  },
  password: {
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  confimPassword: {
    required: true,
    minlength: 5,
    maxlength: 30,
    equalTo: '#password',
  },
  date: {
    required: true,
    dateISO:true
  },
  text: {
    required: false,
    maxlength: 500,
  },
  email: {
    maxlength: 30,
    required: false,
    email: true,
  },
  phoneNumber: {
    required: true,
    digits: true,
    minlength: 11,
    maxlength: 11,
  },
  number: {
    required: true,
    digits: true
  },
  require: {
    required: true,
  },
};


const Form = {
  signinForm: {
    content: {
      account: field.username,
      permission: field.require,
      password: field.password,
      confimPassword: field.confimPassword,
    },
    url: '/authentication/signin',
  },
  loginForm: {
    content: {
      account: field.username,
      password: field.password,
    },
    url: '/authentication/login',
  },
  phoneForm: {
    content: {
      phoneNumber: field.phoneNumber,
      code: field.number,
    },
    url: '/profile/validate_phone',
  },
  profileForm: {
    content: {
      nickname: field.username,
      sex: field.require,
      email: field.email,
      birthday: field.date,
      password: field.password,
      confimPassword: field.confimPassword,
    },
    url: '/post_test',
  },
  infoForm: {
    content: {
      info: field.text,
    },
    url: '/profile/change_info'
  },
  codeSubmitForm: {
    content: {
      codeSubmit: field.number,
    },
    url: '/attendance/register'
  },
  attendanceForm: {
    content: {
      code: field.number,
    },
    url: '/attendance/validate',
  },
  reAttendanceForm: {
    content: {
      account: field.username,
    },
    url: '/attendance/resign',
  },
  groupForm: {
    content: {
      groupName: field.username,
      groupOption: field.require,
      groupInfo: field.text,
      groupClass: field.require,
    },
    url: '/group/regidter'
  },
};


const Input = (id, name, type, value) => {
  return `<label for="${id}">${value}</label><input id="${id}" type="${type}" name="${name}"/>`
};

const defaultErrorPlacement = (error, elem) => {
  if (elem.parent().next().attr('id') === `${elem.id}-wrapper`)
    error.appendTo(elem.parent().next());
  else {
    elem.parent().after(`<div id="${elem.id}-wrapper" class="row"></div>`);
    error.appendTo(elem.parent().next());
  }
};

const defaultAction = (action) => (data) => {
  if (data.status === 302)
    location.href = data.location;
  else
    action(data);
};


$.fn.serializeJSON = function () {
  const obj = {};
  const array = this.serializeArray();
  $.each(array, function () {
    if (obj[this.name] !== undefined) {
      if (!obj[this.name].push) {
        obj[this.name] = [obj[this.name]];
      }
      obj[this.name].push(this.value || '');
    } else {
      obj[this.name] = this.value || '';
    }
  });
  return JSON.stringify(obj);
};

$.afterPOST = (action) => (url) => (form) => {
  alert(form);
  $.post(url, $(form).serializeArray(), defaultAction(action))
};

$(document).ready(
  function () {
    $('#signinForm').validate({
      rules: Form.signinForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler:$.afterPOST(signinFormHandler)(Form.signinForm.url),
    });
    $('#loginForm').validate({
      rules: Form.loginForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(loginFormHandler)(Form.loginForm.url),
    });
    $('#phoneForm').validate({
      rules: Form.phoneForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(phoneFormHandler)(Form.phoneForm.url),
    });
    $('#profileForm').validate({
      rules: Form.profileForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(profileFormHandler)(Form.profileForm.url)
    });
    $('#attendanceForm').validate({
      rules: Form.attendanceForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(attendanceFormHandler)(Form.attendanceForm.url)
    });
    $('#reAttendanceForm').validate({
      rules: Form.reAttendanceForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(reAttendanceFormHandler)(Form.attendanceForm.url)
    });
    $('#infoForm').validate({
      rules: Form.infoForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(infoFormHandler)(Form.infoForm.url)
    });
    $('#codeSubmitForm').validate({
      rules: Form.codeSubmitForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(codeSubmitFormHandler)(Form.codeSubmitForm.url)
    });
    $('#groupForm').validate({
      rules: Form.groupForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(groupFormHandler)(Form.groupForm.url)
    });
    $("title").append(style);
  }
);
