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
  code: {
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
      code: code,
    },
    url: '/profile/validate_phone',
  },
  profileForm: {
    content: {
      nickname: field.username,
      sex: field.require,
      email: field.email,
      password: field.password,
      confimPassword: field.confimPassword,
    },
    url: '/post_test',
  },
  attendanceForm: {
    content: {
      code: field.code,
    },
    url: 'attendance/validate',
  },
  reAttendanceForm: {
    content: {
      account: field.username,
    },
    url: 'attendance/resign',
  },
};


const Input = (id, name, type, value) => {
  return `<label for="${id}">${value}</label><input id="${id}" type="${type}" name="${name}"/>`
};

const errorPlacement = (error, elem) => {
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

$.afterPOST = (action = (result) => {}) => (url) => (form) => {
  $.post(url, $(form).serializeArray(), defaultAction(action))
};

$(document).ready(
  function () {
    $('#signinForm').validate({
      rules: Form.signinForm.content,
      errorPlacement: errorPlacement,
      submitHandler:$.afterPOST()(Form.signinForm.url),
    });
    $('#loginForm').validate({
      rules: Form.loginForm.content,
      errorPlacement: errorPlacement,
      submitHandler: $.afterPOST()(Form.loginForm.url),
    });
    $('#phoneForm').validate({
      rules: Form.phoneForm.content,
      errorPlacement: errorPlacement,
      submitHandler: $.afterPOST()(Form.phoneForm.url),
    });
    $('#profileForm').validate({
      rules: Form.profileForm.content,
      errorPlacement: errorPlacement,
      submitHandler: $.afterPOST()(Form.profileForm.url)
    });
    $('#attendanceForm').validate({
      rules: Form.attendanceForm.content,
      errorPlacement: errorPlacement,
      submitHandler: $.afterPOST()(Form.attendanceForm.url)
    });
    $('#reAttendanceForm').validate({
      rules: Form.reAttendanceForm.content,
      errorPlacement: errorPlacement,
      submitHandler: $.afterPOST()(Form.attendanceForm.url)
    });
    $("title").append(style);
  }
);
