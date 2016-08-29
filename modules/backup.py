from pymongo import MongoClient
import time

backup_dir = '../backup/'
backup_file = ''.join([backup_dir, "backup", time.strftime("_%Y_%m_%d"), ".bac"])

def database_backup(col=None, use_pickle=False):
    if use_pickle:
        import pickle as se
        file_mode = 'wb'
    else:
        import json as se
        file_mode = 'w'
    client = MongoClient()
    db = client.MainDBase
    all_col = db.collection_names(False) if col == None else db[col] #Show all collections without system ones
    with open(backup_file, file_mode) as f:
        for collection in all_col:
            se.dump({'_collection': collection}.__str__(), f)
            for doc in db[collection].find():
                se.dump(doc.__str__(), f)

def database_restore(col=None, use_pickle=False):
    client = MongoClient()
    db = client.MainDBase
    if use_pickle:
        import pickle as se
        file_mode = 'rb'
    else:
        import json as se
        file_mode = 'r'
    with open(backup_file, file_mode) as f:
        print(se.load(f))
    

if __name__ == '__main__':
    database_restore()
