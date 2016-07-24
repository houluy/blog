from bottle import post, route, run, static_file, request, BaseResponse 
from modules.mongo_client import SingleMongoClient
from modules.email import send_email
import re
import logging
import argparse
import json

#------------------------------CONSTANTS------------------------------
HOST_ADDR = "121.42.179.177"
HOST_PORT = 80
LOGGER = 'mailLogger'

#-----------------------Command Line Arguments------------------------
parser = argparse.ArgumentParser(description="Python Bottle server for LuCima's BloG")
parser.add_argument('--log-level', help="Log level, default 'WARNING'", default="DEBUG", dest="log_level")
parser.add_argument('--log-file', help="Log file, default 'bottle.log'", default="bottle.log", dest="log_file")
parser.add_argument('--log-level-to-screen', help="Log level that output to file, default 'DEBUG'", default="WARNING", dest="log_screen_level")

args = parser.parse_args()

#------------------------------MongoDB--------------------------------
client = SingleMongoClient()
mail_list = client.MainDBase.MailList
admin_account = client.MainDBase.AdminAccount
black_list = client.MainDBase.BlackList

#------------------------------Logger---------------------------------
log_dict = {
    'ERROR': logging.ERROR,
    'WARNING': logging.WARNING,
    'DEBUG': logging.DEBUG,
    'INFO': logging.INFO,
    'CRITICAL': logging.CRITICAL,
    'NOTSET': logging.NOTSET
}

logger_format = '[%(levelname)s]:\t%(asctime)-5s %(filename)s %(lineno)d  \n\t%(message)s'
logger = logging.getLogger(LOGGER)
logging.basicConfig(format=logger_format, 
                    datefmt="%d %b. %Y %H:%M:%S",
                    filename=args.log_file, 
                    filemode='a',
                    level=log_dict[args.log_level])
#------Logging to console--------
console = logging.StreamHandler()
logging.getLogger(LOGGER).addHandler(console)
console.setLevel(args.log_screen_level)
formatter = logging.Formatter('%(name)s: %(level)s: %(message)s')
console.setFormatter(formatter)

#---------------------------Tool Functions---------------------------
subscribe_file = "words/sub_email.html"

def get_name(mail_addr):
    'Get username from an email address'
    name_reg = re.compile('[^\._-][\w\._-]+@')
    match = name_reg.match(mail_addr)
    return mail_addr[:match.end() - 1]#Eliminate the @

#---------------------------Bottle Route------------------------------
@route('/')
def index():
    return static_file('index.html', root='blog')

@route('/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='blog')

@post('/subscribe')
def subscribe():
    mail_addr = request.forms.get('mail')
    name = get_name(mail_addr)
    if mail_list.find_one({'mail':mail_addr}) == None:
        try:
            send_email(mail_addr, subject="Welcome to subscribe to LuCima's BloG", content="subscribe_file")
        except:
            return json.dumps({"msg": "Server Error!", "type": "repeat"}) 
        else:
            mail_doc = {'name':name, 'mail':mail_addr}
            mail_list.insert(mail_doc)
            return json.dumps({"msg": "Subscribe successfully", "type": "success"})
    else:
        return json.dumps({"msg": "This email has subscribed", "type": "repeat"}) 
    
@post('/unsubscribe')
def unsubscribe():
    logger.info("")
    mail_addr = request.forms.get('mail')
    name = get_name(mail_addr)
    mail_doc = {'mail': mail_addr}
    if mail_list.find_one(mail_doc) == None:
        return json.dumps({"msg": "This email DID NOT subscribe!", "type": "error"})
    else:
        mail_list.delete_one(mail_doc)
        return json.dumps({"msg": "You have successfully unsubscibed!", "type": "success"})

run(host=HOST_ADDR, port=HOST_PORT)
