import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
import os
import smtplib
from email.message import EmailMessage

router = APIRouter(prefix="/api", tags=["feedback"])
logger = logging.getLogger("uvicorn.error")


class FeedbackPayload(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    message: str


@router.post("/feedback")
async def send_feedback(payload: FeedbackPayload):
    # Validate message
    if not payload.message or not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")

    # Load configuration from environment
    FEEDBACK_TO = os.getenv("FEEDBACK_TO", "mwaleedahmed256@gmail.com")
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587")) if os.getenv("SMTP_PORT") else None
    SMTP_USER = os.getenv("SMTP_USER")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
    SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER or "no-reply@pdf-master")

    if not SMTP_HOST or not SMTP_PORT or not SMTP_USER or not SMTP_PASSWORD:
        raise HTTPException(status_code=500, detail="SMTP is not configured on the server. Please set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASSWORD.")

    # Build the email
    msg = EmailMessage()
    subject = f"PDF Master Feedback" if not payload.name else f"PDF Master Feedback from {payload.name}"
    msg["Subject"] = subject
    msg["From"] = SMTP_FROM
    msg["To"] = FEEDBACK_TO

    body_lines = [f"Message:\n{payload.message}", "", f"Sender email: {payload.email or 'Anonymous'}"]
    msg.set_content("\n".join(body_lines))

    # Send via SMTP
    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10)
        server.ehlo()
        if SMTP_PORT == 587:
            server.starttls()
            server.ehlo()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception:
        logger.exception("Failed to send feedback email")
        raise HTTPException(status_code=500, detail="Failed to send feedback")

    return {"status": "ok", "message": "Feedback sent"}