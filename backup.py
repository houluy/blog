from pymonge import MongoClient

def database_backup(col=None):
    client = MongoClient()
    db = client.MainDBase
    if col == None:
        #Dump all collections
        
    else:
        collection = db[col]

