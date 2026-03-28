export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function generateDeviceId(): string {
  const key = "ss_device_id";
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    if (stored) return stored;
    
    const newId = generateUUID();
    localStorage.setItem(key, newId);
    return newId;
  }
  return generateUUID();
}

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  const stored = localStorage.getItem("ss_device_id");
  if (stored) return stored;
  return generateDeviceId();
}
