import React, { FormEvent, useState } from 'react'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import LanguageToggle from '@/components/language-toggle'
import { useLocale } from '@/context/locale-context'
import adminConfig from '@/config/admin.config'
import weddingConfig from '@/config/wedding.config'

const navItems = [
  ['story', 'story'],
  ['wedding', 'wedding'],
  ['dress', 'dress-code'],
  ['gifts', 'gifts-contact'],
  ['rsvp', 'rsvp'],
]

const Home: NextPage = () => {
  const { t } = useLocale()
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState('yes')
  const [submitted, setSubmitted] = useState(false)
  const [storyExpanded, setStoryExpanded] = useState(false)

  const submitRsvp = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const subject = `${t('rsvp')} - ${weddingConfig.people.bride.firstName} & ${weddingConfig.people.groom.firstName}`
    const body = `${t('name')}: ${name}\n${t('rsvp')}: ${attendance === 'yes' ? t('attending') : t('notAttending')}`
    window.location.href = `mailto:${adminConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <Box className="thesis-page">
      <Box component="nav" className="thesis-nav" aria-label={t('menu')}>
        <Typography className="thesis-nav__mark">DL × IC</Typography>
        <Box className="thesis-nav__links">
          {navItems.map(([label, id]) => <a href={`#${id}`} key={id}>{t(label)}</a>)}
        </Box>
        <LanguageToggle />
      </Box>

      <Box component="header" className="thesis-hero">
        <Box className="floral-corner floral-corner--left" aria-hidden="true">
          <span className="flower flower--large" />
          <span className="flower flower--small" />
          <span className="leaf leaf--one" />
          <span className="leaf leaf--two" />
        </Box>
        <Box className="floral-corner floral-corner--right" aria-hidden="true">
          <span className="flower flower--large" />
          <span className="flower flower--small" />
          <span className="leaf leaf--one" />
          <span className="leaf leaf--two" />
        </Box>
        <Container maxWidth="md" className="thesis-hero__content">
          <Box className="wedding-rings" aria-hidden="true"><span /><span /></Box>
          <Typography component="p" className="eyebrow">{t('academy')}</Typography>
          <Typography component="h1" className="thesis-title">{t('thesis')}</Typography>
          <Typography component="p" className="thesis-subtitle">{t('invitation')}</Typography>
          <Typography component="p" className="thesis-names">
            {weddingConfig.people.bride.firstName} <span>&</span> {weddingConfig.people.groom.firstName} {weddingConfig.people.groom.lastName}
          </Typography>
          <Typography component="p" className="thesis-subtitle">{t('ceremony')}</Typography>
          <Button href="#rsvp" className="thesis-button">{t('rsvp')}</Button>
        </Container>
      </Box>

      <Container maxWidth="md" className="thesis-content">
        <section id="story" className="thesis-section thesis-section--intro">
          <Box className="section-copy"><Box className="section-ornament" aria-hidden="true"><span className="ornament-line" /><span className="ornament-flower">✿</span><span className="ornament-line" /></Box><Typography component="p" className="eyebrow">01 / {t('story')}</Typography><Typography component="h2">{t('story')}</Typography><Typography component="p" className={`story-text${storyExpanded ? ' story-text--expanded' : ''}`} sx={{ whiteSpace: 'pre-line' }}>{t('storyText')}</Typography><Button type="button" className="story-toggle" onClick={() => setStoryExpanded(!storyExpanded)} aria-expanded={storyExpanded}>{storyExpanded ? t('readLess') : t('readMore')}</Button></Box>
          <Box className="floral-bouquet floral-bouquet--story" aria-hidden="true"><span className="stem stem--one" /><span className="stem stem--two" /><span className="stem stem--three" /><span className="botanical-flower botanical-flower--rose" /><span className="botanical-flower botanical-flower--sage" /><span className="botanical-flower botanical-flower--gold" /><span className="botanical-leaf botanical-leaf--one" /><span className="botanical-leaf botanical-leaf--two" /><span className="botanical-leaf botanical-leaf--three" /></Box>
        </section>
        <section id="wedding" className="thesis-section">
          <Box className="floral-sprig floral-sprig--right" aria-hidden="true"><span /><span /><span /></Box>
          <Typography component="p" className="eyebrow">02 / {t('wedding')}</Typography><Typography component="h2">{t('wedding')}</Typography><Typography component="p">{t('weddingText')}</Typography>
          <Box className="detail-grid">
            <Paper><strong>{t('whiteWedding')}</strong><span>{t('ceremonyDate')}</span><span>{t('ceremonyLocation')}</span></Paper>
            <Paper><strong>{t('reception')}</strong><span>{t('receptionDate')}</span><span>{t('receptionLocation')}</span></Paper>
          </Box>
        </section>
        <section id="dress-code" className="thesis-section thesis-section--sage">
          <Typography component="p" className="eyebrow">03 / {t('dress')}</Typography><Typography component="h2">{t('dress')}</Typography><Typography component="p" sx={{ whiteSpace: 'pre-line' }}>{t('dressText')}</Typography>
          <Box className="swatches"><span className="swatch swatch--ivory">Ivory</span><span className="swatch swatch--gold">Champagne Gold</span><span className="swatch swatch--sage">Sage Green</span></Box>
        </section>
        <section id="gifts-contact" className="thesis-section">
          <Box className="floral-sprig floral-sprig--left" aria-hidden="true"><span /><span /><span /></Box>
          <Typography component="p" className="eyebrow">04 / {t('gifts')}</Typography><Typography component="h2">{t('gifts')}</Typography>
          <Box className="detail-grid">
            <Paper><strong>{t('giftsTitle')}</strong><span>{t('giftsText')}</span></Paper>
            <Paper><strong>{t('contactTitle')}</strong><span>{t('contactText')}</span></Paper>
          </Box>
        </section>
        <section id="rsvp" className="thesis-section thesis-section--rsvp">
          <Box className="floral-sprig floral-sprig--bottom" aria-hidden="true"><span /><span /><span /></Box>
          <Typography component="p" className="eyebrow">05 / {t('rsvp')}</Typography><Typography component="h2">{t('rsvp')}</Typography><Typography component="p">{t('rsvpText')}</Typography>
          <Box component="form" onSubmit={submitRsvp} className="rsvp-form">
            <TextField required label={t('name')} value={name} onChange={(event) => setName(event.target.value)} />
            <label><input type="radio" name="attendance" value="yes" checked={attendance === 'yes'} onChange={() => setAttendance('yes')} /> {t('attending')}</label>
            <label><input type="radio" name="attendance" value="no" checked={attendance === 'no'} onChange={() => setAttendance('no')} /> {t('notAttending')}</label>
            <Button type="submit" className="thesis-button">{t('submit')}</Button>
            {submitted && <Typography role="status" className="rsvp-success">{t('submitted')}</Typography>}
          </Box>
        </section>
      </Container>
    </Box>
  )
}

export default Home
