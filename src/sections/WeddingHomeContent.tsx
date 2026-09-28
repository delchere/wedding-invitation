import React from 'react'
import SiteFooter from '@/components/SiteFooter'
import SiteNav from '@/components/SiteNav'
import CountdownSection from '@/sections/CountdownSection'
import DressCodeSection from '@/sections/DressCodeSection'
import InvitationSection from '@/sections/InvitationSection'
import ProgramSection from '@/sections/ProgramSection'
import ReserveSection from '@/sections/ReserveSection'
import StorySection from '@/sections/StorySection'
import WeddingHero from '@/sections/WeddingHero'

const WeddingHomeContent: React.FC = () => {
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

export default WeddingHomeContent
