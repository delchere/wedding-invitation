import React, { FC } from 'react'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const DressCodeMannequins: FC = () => (
  <div className="dress-code-figures">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={`${basePath}/images/dress-code/mannequins.png`}
      alt=""
      width={427}
      height={585}
      className="dress-code-figures__img"
      aria-hidden="true"
    />
  </div>
)

export default DressCodeMannequins
