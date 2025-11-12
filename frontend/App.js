export const API_BASE_URL = "https://tohlal72se.execute-api.us-east-1.amazonaws.com";

export const saveHealthData = async (payload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/saveHealthData`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.error("Save error:", error);
    throw error;
  }
};

export const getHealthData = async (userId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/getHealthData?userId=${userId}`);
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
