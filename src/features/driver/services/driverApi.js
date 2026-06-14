const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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
      data: data.data,
    };
  }

  return data;
}

function getToken() {
  return localStorage.getItem("token") || localStorage.getItem("access_token");
}

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const EGYPT_GOVERNORATES = [
  "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira",
  "Fayoum", "Gharbiya", "Ismailia", "Menofia", "Minya", "Qaliubiya",
  "New Valley", "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said",
  "Damietta", "Sharkia", "South Sinai", "Kafr El Sheikh", "Matrouh",
  "Luxor", "Qena", "North Sinai", "Sohag",
];

export async function getGovernorates() {
  try {
    const res = await fetch(`${API_BASE}/driver/service-areas/governorates`);
    const data = await handleResponse(res);
    if (data.success) return data.data;
  } catch (_) {}
  return EGYPT_GOVERNORATES;
}

export async function listMyAreas() {
  try {
    const res = await fetch(`${API_BASE}/driver/service-areas`, { headers: authHeaders() });
    return handleResponse(res);
  } catch (_) {
    return { success: false, message: `Cannot connect to the backend. Make sure it is running on ${API_BASE}` };
  }
}

export async function createArea(governorate) {
  try {
    const res = await fetch(`${API_BASE}/driver/service-areas`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ governorate }),
    });
    return handleResponse(res);
  } catch (_) {
    return { success: false, message: `Cannot connect to the backend. Make sure it is running on ${API_BASE}` };
  }
}

export async function updateArea(id, data) {
  try {
    const res = await fetch(`${API_BASE}/driver/service-areas/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  } catch (_) {
    return { success: false, message: `Cannot connect to the backend. Make sure it is running on ${API_BASE}` };
  }
}

export async function deleteArea(id) {
  try {
    const res = await fetch(`${API_BASE}/driver/service-areas/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    return handleResponse(res);
  } catch (_) {
    return { success: false, message: `Cannot connect to the backend. Make sure it is running on ${API_BASE}` };
  }
}

export async function searchDriversByGovernorate(governorate) {
  try {
    const res = await fetch(
      `${API_BASE}/driver/service-areas/search?governorate=${encodeURIComponent(governorate)}`
    );
    return handleResponse(res);
  } catch (_) {
    return { success: false, message: `Cannot connect to the backend. Make sure it is running on ${API_BASE}` };
  }
}

export async function saveDriverProfile(formData) {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE}/driver/profile`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    return handleResponse(res);
  } catch (_) {
    return { success: false, message: `Cannot connect to the backend. Make sure it is running on ${API_BASE}` };
  }
}

export async function getDriverProfile() {
  try {
    const res = await fetch(`${API_BASE}/driver/profile`, { headers: authHeaders() });
    return handleResponse(res);
  } catch (_) {
    return { success: false, message: `Cannot connect to the backend. Make sure it is running on ${API_BASE}` };
  }
}
