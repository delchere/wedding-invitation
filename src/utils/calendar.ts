import weddingConfig from '@/config/wedding.config'
import { WeddingConfigType } from '@/interfaces/config'

const WAT_OFFSET_HOURS = 1

const formatUtcFromWat = (date: string, time: string): string => {
  const [year, month, day] = date.split('-').map(Number)
  const [hours, minutes] = time.split(':').map(Number)
  const utc = new Date(Date.UTC(year, month - 1, day, hours - WAT_OFFSET_HOURS, minutes))
  return utc.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

export const buildGoogleCalendarUrl = (config: WeddingConfigType = weddingConfig): string => {
  if (config.calendar?.url) {
    return config.calendar.url
  }

  const { bride, groom } = config.people
  const title = encodeURIComponent(`${bride.firstName} & ${groom.firstName} — Wedding`)
  const location = encodeURIComponent(config.calendar?.location || config.location.address)
  const details = encodeURIComponent(config.calendar?.details || 'Wedding ceremony and reception')
  const startTime = config.date.time || '11:30'
  const start = formatUtcFromWat(config.date.date, startTime)
  const end = formatUtcFromWat(config.date.date, config.calendar?.endTime || '15:00')

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`
}

export const getCalendarUrl = (): string => buildGoogleCalendarUrl()
