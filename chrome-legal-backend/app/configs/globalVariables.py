from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# Suppose you have an array with credentials in the order: [USER, PASSWORD, HOST, PORT, DATABASE]
local_credentials = {
    'POSTGRESUSER': 'name',
    'PASSWORD': 'pass',
    'HOST': 'localhost',
    'PORT': '5433',
    'DATABASE': 'gpulab'
}


# Unpack the array into the database URL
database_url = f"postgresql://{local_credentials['POSTGRESUSER']}:{local_credentials['PASSWORD']}@{local_credentials['HOST']}:{local_credentials['PORT']}/{local_credentials['DATABASE']}"

# Create an engine
engine = create_engine(database_url, pool_size=10, max_overflow=20)

# Create a session
Session = sessionmaker(bind=engine)