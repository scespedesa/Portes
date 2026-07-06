from fastapi import APIRouter, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="templates")


# usuario demo (luego viene de DB)
USER = {
    "username": "admin",
    "password": "1234"
}


@router.get("/debug-jinja")
def debug_jinja():
    print("templates =", templates)
    print("loader =", templates.env.loader)
    print("cache =", templates.env.cache)

    return {"ok": True}

@router.get("/login", response_class=HTMLResponse)
def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


@router.post("/login")
def login(username: str = Form(...), password: str = Form(...)):

    if username == USER["username"] and password == USER["password"]:
        response = RedirectResponse(url="/dashboard", status_code=302)
        response.set_cookie(key="auth", value="ok")
        return response

    return RedirectResponse(url="/login", status_code=302)
