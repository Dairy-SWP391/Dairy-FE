export const numberToVND = (number: number) =>
  number.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
