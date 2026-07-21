const API_URL= "http://127.0.0.1:8000/api";

export async function getCurrentUser(){
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
            Authorization : `Bearer ${token}`
        }
    });
    if (!response.ok){
        throw new Error("Unauthenticated");
    }
    return await response.json();
}

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}


