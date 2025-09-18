import { AccountValuePoint } from "@/types/api"
import { AccountValueChartDatum } from "./account-value-types"

function generateDateRange(start: Date, end: Date): string[] {
  const dates: string[] = []
  const current = new Date(start)

  while (current <= end) {
    dates.push(current.toISOString().split("T")[0])
    current.setDate(current.getDate() + 1)
  }

  return dates
}

export function toChartData(
  data: Record<string, AccountValuePoint[]>,
  startDate: Date,
  endDate: Date
): AccountValueChartDatum[] {
  const result: AccountValueChartDatum[] = []
  const lastValues: Record<string, string> = {}

  const allDates = generateDateRange(startDate, endDate)

  for (const date of allDates) {
    const row: AccountValueChartDatum = { date }

    for (const [account, points] of Object.entries(data)) {
      const match = points.find(
        (p) => new Date(p.date).toISOString().split("T")[0] === date
      )

      if (match) {
        lastValues[account] = match.value
      }

      if (lastValues[account] !== undefined) {
        row[account] = lastValues[account]
      }
    }

    result.push(row)
  }

  return result
}