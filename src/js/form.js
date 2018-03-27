const style = "<style>label.error{color: red; font-size: 15px; position: relative; padding-bottom: 5px;}</style>";
const applyInGroup =
    "<form id='applyInGroup'>" +
    " <div class='row'>" +
    "   <div class='input-field col s12'>" +
    "     <input id='applyInGroupContent' type='text' class='validate' name='apply_in_text'>\n" +
    "     <label for='applyInGroupContent'>请求内容</label>" +
    "   </div>" +
    " </div>" +
    " <div class='row'>" +
    "   <a class=\"btn waves-effect waves-light right\" onclick='subGroupHandler()'>发送\n" +
    "    <i class=\"material-icons right\">send</i>\n" +
    "   </a>" +
    " </div> " +
    "</form>";


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
    dateISO: true
  },
  title: {
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  text: {
    required: true,
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
    url: '/profile/change_info',
  },
  infoForm: {
    content: {
      info: field.text,
    },
    url: '/profile/'
  },
  codeSubmitForm: {
    content: {
      sign_code: field.number,
    },
    url: '/attendance/register'
  },
  attendanceForm: {
    content: {
      sign_code: field.number,
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
      groupClass: field.require,
      groupInfo: field.text,
    },
    url: '/group/register'
  },
  mutateGroupForm: {
    content: {
      groupName: field.username,
      groupClass: field.require,
      groupInfo: field.text,
    },
    url: '/group/mutate_group',
  },
  subscribeGroupForm: {
    content: {
      groupNumber: field.require,
    },
    url: '/group/search'
  },
  sendAnnoForm: {
    content: {
      annoTitle: field.title,
      annoContent: field.text,
    },
    url: '/group/send',
  },
  sendMsgForm: {
    content: {
      msgTitle: field.title,
      mdgContent: field.text,
    },
    url: '/group/send',
  },
  manageMsgForm: {
    content: {
      manageMsgID: field.number,
      manageMsgTitle: field.title,
      manageMsgContent: field.text,
    },
    url: '/group/update_msg',
  },
  activityForm: {
    content: {
      activityName: field.title,
      activityContent: field.text,
      activityStartDate: field.require,
      activityStartTime: field.require,
      activityEndDate: field.require,
      activityEndTime: field.require,
    },
    url: '/group/register_activity'
  },
    activityChangeForm: {
    content: {
      activityChangeName: field.title,
      activityChangeContent: field.text,
      activityChangeStartDate: field.require,
      activityChangeStartTime: field.require,
      activityChangeEndDate: field.require,
      activityChangeEndTime: field.require,
    },
    url: '/group/mutate_activity'
  }
};

const defaultErrorPlacement = (error, elem) => {
  if (elem.next().next().attr('id') === `${elem.id}-wrapper`)
    error.appendTo(elem.parent().next());
  else {
    elem.next().after(`<div id="${elem.id}-wrapper" class="row" style="margin-bottom: 4px"></div>`);
    error.appendTo(elem.next().next());
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
  $.post(url, $(form).serializeArray(), defaultAction(action))
};

$(document).ready(
  function () {
    $('#signinForm').validate({
      rules: Form.signinForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(signinFormHandler)(Form.signinForm.url),
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
      submitHandler: (form) => {
        $.post(`/attendance/validate%3Fsign_name%3D${currentSignName}`, $(form).serializeArray(),
          defaultAction(attendanceFormHandler));
      },
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
      submitHandler: (form) => {
        $.post(`/attendance/register%3Fclass%3D${currentAttdCls}%3Fid%3D${currentAttdID}%3Fqrcode%3D0`, $(form).serializeArray(),
          defaultAction(codeSubmitFormHandler));
      }
    });
    $('#manageMsgForm').validate({
        rules: Form.manageMsgForm.content,
        errorPlacement: defaultErrorPlacement,
        submitHandler: (form) => {
          const groupId = getId();
          const index = $('#manageMsgID').val();
          let channel = '';
          if($('#public-body').hasClass('active'))
            channel = 'board';
          else if($('#chat-body').hasClass('active'))
            channel = 'public';
          $.post(`${Form.manageMsgForm.url}%3Fgroup%3D${groupId}%3Fchannel%3D${channel}%3Findex%3D${index}`, $(form).serializeArray(),
            defaultAction(manageMsgFormHandler));
      }
    });
    $('#groupForm').validate({
      rules: Form.groupForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: $.afterPOST(groupFormHandler)(Form.groupForm.url)
    });
    $('#mutateGroupForm').validate({
      rules: Form.mutateGroupForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: (form) => {
        const groupId = getId();
        $.post(`${Form.mutateGroupForm.url}%3Fgroup%3d${groupId}`, $(form).serializeArray(),
          defaultAction(changeGroupFormHandler))
      }
    });
    $('#subscribeGroup').validate({
      rules: Form.subscribeGroupForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: (form) => {
        $.post(Form.subscribeGroupForm.url, $(form).serializeArray(), (result) => {
          const gen = (x) => {
            return $(`<li class="collection-item" style="opacity: 0;"><div>${x}<a href="#" onclick="insertAIGForm()" class="secondary-content">申请入群<i class="material-icons right">send</i></a></div></li>`);
          };
          const insertBar = $('#exist');
          if (insertBar) insertBar.remove();
          const searchBar = $('<ul id="exist" class="collection"></ul>');
          if (result.found) {
            const groupIDs = result.groups;
            groupIDs.map(gen).forEach(x => searchBar.append(x));
          } else {
            searchBar.append($('<li class="collection-item red-text"><i class="material-icons left">close</i>没有找到</li>'));
          }
          $('#insert').after(searchBar);
          Materialize.showStaggeredList('#exist');

        })
      }
    });
    $('#sendAnno').validate({
      rules: Form.sendAnnoForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: (form) => {
        const groupId = getId();
        $.post(`${Form.sendAnnoForm.url}%3Fgroup%3D${groupId}%3Fchannel%3Dboard`, $(form).serializeArray(),
          defaultAction(sendAnnoFormHandler));
      },
    });
    $('#sendMsg').validate({
      rules: Form.sendMsgForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: (form) => {
        const groupId = getId();
        $.post(`${Form.sendMsgForm.url}%3Fgroup%3D${groupId}%3Fchannel%3Dpublic`, $(form).serializeArray(),
          defaultAction(sendAnnoFormHandler));
      },
    });
    $('#activityForm').validate({
      rules: Form.activityForm.content,
      errorPlacement: defaultErrorPlacement,
      submitHandler: (form) => {
        const groupId = getId();
        $.post(`${Form.activityForm.url}%3Fgroup%3D${groupId}`, $(form).serializeArray(),
          defaultAction(activityFormHandler));
      },
    });
    $('#activityChangeForm').validate({
       rules: Form.activityChangeForm.content,
       errorPlacement: defaultErrorPlacement,
      submitHandler: (form) => {
        const groupId = getId();
        $.post(`${Form.activityChangeForm.url}%3Fgroup%3D${groupId}%3Factivity%3D${$('#activityID').val()}`, $(form).serializeArray(),
          defaultAction(activityFormHandler));
      },
    });
    $("title").append(style);

  }
);
