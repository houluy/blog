from modules.mongo_client import SingleMongoClient
import logging

#------------------------Get articles from Database-------------------------
client = SingleMongoClient()
article_list = client.MainDBase.ArticleList
logger = logging.getLogger('mainLogger')
   

