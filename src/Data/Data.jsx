

export const companys = ["google", "amazon", "figma", "netflix", "meta","microsoft","pinterest","spotify","oracle","walmart"];

export function timeAgo(time) {
  const now = new Date();
  const past = new Date(time);
  const diff = Math.floor((now - past) / 1000); // difference in seconds

  if (diff < 60) {
    return `${diff} second${diff !== 1 ? 's' : ''} ago`;
  }

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}


export function formatDateTime(isoString) {
  const date = new Date(isoString);

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"  // ✅ always IST (India Standard Time)
  };

  return date.toLocaleString("en-GB", options).replace(",", "");
}