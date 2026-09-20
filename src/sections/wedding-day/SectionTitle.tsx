import React, { FC } from 'react'

type SectionTitleProps = {
  children: React.ReactNode
}

const SectionTitle: FC<SectionTitleProps> = ({ children }) => (
  <div className="wedding-day__title-block">
    <span className="wedding-day__title-flourish wedding-day__title-flourish--left" aria-hidden="true">
      <svg viewBox="0 0 80 12" fill="none">
        <path d="M0 6H52" stroke="currentColor" strokeWidth="0.6" />
        <path d="M52 6C58 6 62 4 66 2" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <path d="M66 2C70 4 74 6 80 6" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      </svg>
    </span>
    <h3 className="wedding-day__title-script">{children}</h3>
    <span className="wedding-day__title-flourish wedding-day__title-flourish--right" aria-hidden="true">
      <svg viewBox="0 0 80 12" fill="none">
        <path d="M80 6H28" stroke="currentColor" strokeWidth="0.6" />
        <path d="M28 6C22 6 18 4 14 2" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
        <path d="M14 2C10 4 6 6 0 6" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      </svg>
    </span>
  </div>
)

export default SectionTitle
