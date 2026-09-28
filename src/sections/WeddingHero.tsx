import React, { FC } from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const WeddingHero: FC = () => {
  return (
    <section id="home" className="hero-poster">
      <img
        src={`${basePath}/images/invitation_poster.png`}
        alt="Wedding invitation"
        className="hero-poster__image"
      />
    </section>
  )
}

export default WeddingHero