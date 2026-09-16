import React, { FormEvent, useState } from 'react'
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import LanguageToggle from '@/components/language-toggle'
import { useLocale } from '@/context/locale-context'
//import adminConfig from '@/config/admin.config'
import weddingConfig from '@/config/wedding.config'
import { ThesisEmblem } from '@/components/home'

const formatContent = (text: string): React.ReactNode => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }
    return part
  })
}

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

  const RSVP_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeqdrEvyJqORdq3EqIWna6fEGRfB3mDN2ag-TPrvM8fASZSnQ/viewform?usp=dialog'

  const submitRsvp = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    window.open(RSVP_FORM_URL, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  return (
    <Box className="thesis-page">
      <Box component="nav" className="thesis-nav" aria-label={t('menu')}>
        <Typography className="thesis-nav__mark">D × I</Typography>
        <Box className="thesis-nav__links">
          {navItems.map(([label, id]) => <a href={`#${id}`} key={id}>{t(label)}</a>)}
        </Box>
        <LanguageToggle />
      </Box>

      <Box component="header" className="thesis-hero">
        <Box className="floral-corner floral-corner--tl" aria-hidden="true">
          <span className="flower flower--large" />
          <span className="flower flower--small" />
          <span className="leaf leaf--one" />
          <span className="leaf leaf--two" />
          <span className="leaf leaf--three" />
        </Box>
        <Box className="floral-corner floral-corner--tr" aria-hidden="true">
          <span className="flower flower--large" />
          <span className="flower flower--small" />
          <span className="leaf leaf--one" />
          <span className="leaf leaf--two" />
          <span className="leaf leaf--three" />
        </Box>
        <Box className="floral-corner floral-corner--bl" aria-hidden="true">
          <span className="flower flower--large" />
          <span className="flower flower--small" />
          <span className="leaf leaf--one" />
          <span className="leaf leaf--two" />
          <span className="leaf leaf--three" />
        </Box>
        <Box className="floral-corner floral-corner--br" aria-hidden="true">
          <span className="flower flower--large" />
          <span className="flower flower--small" />
          <span className="leaf leaf--one" />
          <span className="leaf leaf--two" />
          <span className="leaf leaf--three" />
        </Box>
        <Container maxWidth="md" className="thesis-hero__content">
          <Typography component="p" className="academy-title">{t('academy')}</Typography>
          <Typography component="p" className="department-name">{t('department')}</Typography>
          <Box className="thesis-emblem-wrapper" aria-label="Wedding emblem">
            <ThesisEmblem />
          </Box>
          <Typography component="h1" className="thesis-title">{t('thesis')}</Typography>
          <Typography component="p" className="thesis-subtitle">{t('doctoralJourney')}</Typography>
          <Typography component="p" className="thesis-values">{t('loveValues')}</Typography>
          <Box className="thesis-authors-block">
            <Typography component="p" className="thesis-label">{t('authors')}</Typography>
            <Typography component="p" className="thesis-names">
              {weddingConfig.people.bride.firstName} <span className="ampersand">&</span> {weddingConfig.people.groom.firstName}
            </Typography>
          </Box>
          <Box className="thesis-defense-block">
            <Typography component="p" className="thesis-label">{t('finalDefense')}</Typography>
            <Typography component="p" className="thesis-date">{t('ceremonyDate')}</Typography>
            <Typography component="p" className="thesis-detail"><span className="thesis-time-label">{t('timeLabel')}</span> {weddingConfig.date.ceremonyTime}</Typography>
            <Typography component="p" className="thesis-detail"><span className="thesis-location-label">{t('locationLabel')}</span> {weddingConfig.location.address}</Typography>
          </Box>
          <Box className="thesis-supervisor-block">
            <Typography component="p" className="thesis-label">{t('supervisor')}</Typography>
            <Typography component="p" className="thesis-officiant">GOD</Typography>
          </Box>
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
            <Paper><strong>{t('whiteWedding')}</strong><span>{t('whiteWeddingDate')}</span><span>{t('ceremonyLocation')}</span></Paper>
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
            <Paper><strong>{t('giftsTitle')}</strong><span>{formatContent(t('giftsText'))}</span></Paper>
            <Paper><strong>{t('contactTitle')}</strong><span>{formatContent(t('contactText'))}</span></Paper>
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
