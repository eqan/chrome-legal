from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base
from datetime import datetime

class ScrappedSource(Base):
    __tablename__ = 'scrapped_sources'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False) # For now not making this FK because of scope of project
    document_link = Column(String, unique=True, nullable=False, index=True)
    document_content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now)