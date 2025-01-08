export const getPaginatiedData = ({
  data,
  page,
  perPage,
}: {
  data: unknown;
  page?: string | null;
  perPage?: string | null;
}) => {
  if (!Array.isArray(data)) {
    return [];
  }
  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  const entries = data.slice(start, end);
  return entries;
};
