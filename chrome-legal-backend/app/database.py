from app.configs.globalVariables import engine
from app.base import Base

def create_tables():
    Base.metadata.create_all(engine)