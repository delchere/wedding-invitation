import React, { FC } from 'react'
import Image from 'next/image'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const DressCodeMannequins: FC = () => (
  <div className="dress-code-figures">
    <Image
      src={`${basePath}/images/dress-code/mannequins.png`}
      alt=""
      width={427}
      height={585}
      className="dress-code-figures__img"
      priority={false}
      aria-hidden="true"
    />
  </div>
)

export default DressCodeMannequins
