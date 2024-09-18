export const formatToday = (format = "YYYY-mm-dd") => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};
