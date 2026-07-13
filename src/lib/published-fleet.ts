import { publishableYachts, type YachtRecord } from "@/data/yachts";

const values = (select: (yacht: YachtRecord) => number) => publishableYachts.map(select);

const range = (items: readonly number[]) => ({
  minimum: Math.min(...items),
  maximum: Math.max(...items),
});

if (publishableYachts.length === 0) {
  throw new Error("Published fleet summaries require at least one verified yacht record.");
}

export const publishedFleetSummary = {
  yachtCount: publishableYachts.length,
  lengthFt: range(values((yacht) => yacht.lengthFt)),
  guestCapacity: range(values((yacht) => yacht.guestCapacity)),
  pricePerHour: range(values((yacht) => yacht.pricePerHour)),
  minimumDuration: range(values((yacht) => yacht.minimumDuration)),
} as const;

export const formatAed = (value: number) => `AED ${value.toLocaleString("en-US")}`;

export const publishedYachtsById = (...ids: string[]) => ids.map((id) => {
  const yacht = publishableYachts.find((record) => record.id === id);
  if (!yacht) throw new Error(`Published yacht selection references an unavailable record: ${id}`);
  return yacht;
});

