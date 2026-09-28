import React from 'react'
import { NextPage } from 'next'
import SiteFooter from '@/components/SiteFooter'
import SiteNav from '@/components/SiteNav'
import WeddingHero from '@/sections/WeddingHero'
import InvitationSection from '@/sections/InvitationSection'
import StorySection from '@/sections/StorySection'
import CountdownSection from '@/sections/CountdownSection'
import ProgramSection from '@/sections/ProgramSection'
import DressCodeSection from '@/sections/DressCodeSection'
import ReserveSection from '@/sections/ReserveSection'

const Home: NextPage = () => {
  return (
    <div className="site">
      <SiteNav />
      <main>
        <WeddingHero />
        <InvitationSection />
        <StorySection />
        <CountdownSection />
        <ProgramSection />
        <DressCodeSection />
        <ReserveSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default Home
