import { formatDate } from "@/lib/i18n";
import { type CellContext } from "@tanstack/react-table";

export type GenericCellContext<T> = CellContext<T, unknown>;

/**
 * Renders a datetime cell.
 */
export function DateTimeCell<T>({ getValue }: GenericCellContext<T>) {
  const date = getValue<Date>();
  return formatDate(date);
}
