from fastapi import APIRouter , Request
from fastapi.responses import HTMLReponse
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/report", response_class=HTMLReponse)
def report_form(request: Request , porte: str):
    return templates.TemplateResponse(
        "report.html",
        {
            "request" : request,
            "porte": porte
        }
    )