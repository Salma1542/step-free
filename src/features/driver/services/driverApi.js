const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function handleResponse(res) {
  let data;

  try {
    data = await res.json();
  } catch (_) {
    data = { success: false, message: "Invalid server response" };
  }

  if (!res.ok) {
    return {
      success: false,
      message: data.message || `Request failed with status ${res.status}`,
    };
  }

  return data;
}

function authHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const CAIRO_CITIES = [
  "Nasr City",
  "Heliopolis",
  "New Cairo",
  "Maadi",
  "Zamalek",
  "Downtown Cairo",
  "Garden City",
  "Shubra",
  "Ain Shams",
  "El Marg",
  "Mokattam",
  "Abbassia",
  "Sayeda Zeinab",
  "El Rehab",
  "Madinaty",
  "Badr City",
  "Helwan",
  "Dar El Salam",
  "El Basatin",
  "15 May City",
];

export async function getCairoCities() {
  return CAIRO_CITIES;
}

export async function listMyAreas() {
  try {
    const res = await fetch(`${BASE}/driver/service-areas`, {
      headers: authHeaders(),
    });

    return handleResponse(res);
  } catch (_) {
    return {
      success: false,
      message:
        "Cannot connect to the backend. Make sure it is running on http://localhost:3000",
    };
  }
}

export async function createArea(city) {
  try {
    const res = await fetch(`${BASE}/driver/service-areas`, {
      method: "POST",
      headers: authHeaders(),

      // الباك عندك لسه مستني governorate
      // لكن احنا بنعرضها في الفرونت كمدن القاهرة
      body: JSON.stringify({ governorate: city }),
    });

    return handleResponse(res);
  } catch (_) {
    return {
      success: false,
      message:
        "Cannot connect to the backend. Make sure it is running on http://localhost:3000",
    };
  }
}

export async function updateArea(id, data) {
  try {
    const res = await fetch(`${BASE}/driver/service-areas/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  } catch (_) {
    return {
      success: false,
      message:
        "Cannot connect to the backend. Make sure it is running on http://localhost:3000",
    };
  }
}

export async function deleteArea(id) {
  try {
    const res = await fetch(`${BASE}/driver/service-areas/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  } catch (_) {
    return {
      success: false,
      message:
        "Cannot connect to the backend. Make sure it is running on http://localhost:3000",
    };
  }
}

export async function searchDriversByCity(city) {
  try {
    const res = await fetch(
      `${BASE}/driver/service-areas/search?governorate=${encodeURIComponent(
        city
      )}`
    );

    return handleResponse(res);
  } catch (_) {
    return {
      success: false,
      message:
        "Cannot connect to the backend. Make sure it is running on http://localhost:3000",
    };
  }
}