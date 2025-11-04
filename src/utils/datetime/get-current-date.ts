import dayjs from "dayjs";

export const getFormattedCurrentDate = () => {
  // format: Monday, November 3, 2025
  return dayjs().format("dddd, MMMM D, YYYY");
};
