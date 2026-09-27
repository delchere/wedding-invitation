import React, { FC } from 'react'
import { useLocale } from '@/context/locale-context'
import SectionTitle from './SectionTitle'
import { ChurchIllustration, ReceptionIllustration } from './illustrations'

const mapLink = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

type LocationCardProps = {
  venue: string
  address: string
  mapQuery: string
  illustration: React.ReactNode
  viewMapLabel: string
}

const LocationCard: FC<LocationCardProps> = ({ venue, address, mapQuery, illustration, viewMapLabel }) => (
  <article className="wedding-day__location-card">
    <div className="wedding-day__location-details">
      <div className="wedding-day__location-pin" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21C12 21 5 14.5 5 9.5C5 6.5 7.5 4 12 4C16.5 4 19 6.5 19 9.5C19 14.5 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className="wedding-day__location-text">
        <p className="wedding-day__location-venue">{venue}</p>
        <p className="wedding-day__location-address">{address}</p>
        <a
          href={mapLink(mapQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="wedding-day__map-btn"
        >
          {viewMapLabel}
        </a>
      </div>
    </div>
    <div className="wedding-day__location-art">{illustration}</div>
  </article>
)

const WeddingDayLocations: FC = () => {
  const { t } = useLocale()

  const locations = [
    {
      venue: t('weddingCeremonyVenue'),
      address: t('weddingCeremonyAddress'),
      mapQuery: t('ceremonyLocation'),
      illustration: <ChurchIllustration />,
    },
    {
      venue: t('weddingReceptionVenue'),
      address: t('weddingReceptionAddress'),
      mapQuery: t('receptionLocation'),
      illustration: <ReceptionIllustration />,
    },
  ]

  return (
    <div className="wedding-day__block wedding-day__block--locations">
      <SectionTitle>{t('weddingLocationTitle')}</SectionTitle>
      <div className="wedding-day__locations-grid">
        {locations.map((location) => (
          <LocationCard key={location.venue} {...location} viewMapLabel={t('viewMap')} />
        ))}
      </div>
    </div>
  )
}

export default WeddingDayLocations
