import smtplib
from email.mime.text import MIMEText
from email.header import Header
import logging

smtp_server = "smtp.sina.com"
default_smtp_port = 25
username = 'houlu8674'
password = 'hICq1tw?k>&OFHqq'
logger = logging.getLogger('mainLogger')

def send_email(email_addr, subject, content, from_email="houlu8674@sina.com", file_type='html', encoding='utf-8'):
    '''
    Send email
    @params:
        email_addr  : Destination email address
        subject
        content     : Can be a filename(recommanded) or a string 
        logger      : Logger object
        from_email   
        file_type   : Default is html, can be ignored if content is string
        encoding    : Default is utf-8
    '''
    try:
        with open(content) as f:
            msg = MIMEText(f.read(), file_type, encoding)
    except FileNotFoundError:
        msg = MIMEText(content)
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = email_addr

    s = smtplib.SMTP(smtp_server, default_smtp_port)
    try:
        s.login(username, password)
        logger.info("[INFO]: Login successfully to the SMTP server")
        s.send_message(msg)
        logger.info("[INFO]: Sending Email successfully")
    except:
        logger.exception("[EXCEPTION]: Error on sending email")
        raise smtplib.SMTPException
    finally:
        s.quit()

