from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    nickname = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)


class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    company = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    deals = relationship("Deal", back_populates="client")
    tasks = relationship("Task", back_populates="client")


class Deal(Base):
    __tablename__ = "deals"

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    title = Column(String, nullable=False)
    address = Column(String, nullable=True)
    amount = Column(Float, nullable=False)
    status = Column(String, default="new")
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client", back_populates="deals")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey("clients.id"))
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    due_date = Column(DateTime)
    status = Column(String, default="pending")  # pending, completed, overdue
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client", back_populates="tasks")


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    content = Column(JSON)
