export default function formatDueDate(isoString: string) {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${month} ${day}${getOrdinal(day)}`;
}
