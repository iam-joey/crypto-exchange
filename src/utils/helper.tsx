export const getTimer = (timestampMs: number) => {
  const dateUtc = new Date(timestampMs);
  const dateIst = new Date(dateUtc.getTime() + 5.5 * 60 * 60 * 1000);
  const hours = dateIst.getUTCHours().toString().padStart(2, "0");
  const minutes = dateIst.getUTCMinutes().toString().padStart(2, "0");
  const seconds = dateIst.getUTCSeconds().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};
