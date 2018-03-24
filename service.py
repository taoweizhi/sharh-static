import sys
sys.path.append('..')
from init import init
from rx_sharh.states.config import Config
from dateutil.parser import parse

conf_spec = dict(
    debug=True,
    testing=False,
    csrf_enabled=True,
    admins=['sdl.office.1997@gmail.com',  # 沈东来
            '1196494388@qq.com',  # 李高正
            '591486669@qq.com',  # 骆云鹏
            'xiaoqi990112@hotmail.com'],  # 安啸琪
    term_start_date=parse('2018/2/26'),
    database_connect_options={},
    secret_key=r'7\xe6\xad%\x9e3\xe6\x93#\x1cD}\xf3\xef\xb6\x83s\x86b\x81rX\xf2\x1f\xd4',
    logging_path='sharh.log',
    database_url='mysql+pymysql://root:njlgd@2017$#@localhost/dev?charset=utf8',
    access_key_id="LTAI2t84jhtJ69vY",
    access_key_secret="aC8rOMSLMxIU8lDwYhjblF7tCYlGZy",
    sign_name="智慧校园",
    template_code="SMS_117521047",
    wechat_appid="wx34e35d6c38fed4b2",
    wechat_secret="f17ed42c555e6872c01fd09489095c8d",
    logging_fmt=("message type:       %(levelname)s\n"
                 "Location:           %(pathname)s:%(lineno)d\n"
                 "Module:             %(module)s\n"
                 "Function:           %(funcName)s\n"
                 "Time:               %(asctime)s\n"
                 "message:            %(message)s\n"),

    course_spec=list(zip(
        ["8:00", "8:50", "9:40", "10:40", "11:30",
         "14:00", "14:50", "15:50", "16:40", "17:30",
         "19:00", "19:50", "20:40"],
        ["8:50", "9:40", "10:25", "11:30", "12:15",
         "14:50", "15:35", "16:40", "17:30", "18:15",
         "19:50", "20:40", "21:25"]
    )))

init(**conf_spec)
app = Config.app
app.debug = True

from rx_sharh.states.message.ref import Group
# Group.clear(group_id=all, channels=all)
app.run(host='0.0.0.0', port=5050)
