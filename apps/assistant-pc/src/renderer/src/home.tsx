import { AssistantLogoSVG } from '@assets/branding/assistant/assistant.logo.svg'
import ConnectionPage from '@cs-magic/assistant-frontend-common/pages/connection/page'
import Image from 'next/image'
import { useState } from 'react'

export default function HomePage() {
  console.log('[HomePage] loaded')

  const [versions] = useState(window?.electron?.process?.versions)

  return (
    <div className={'w-screen h-screen overflow-hidden flex flex-col items-center p-4 gap-4'}>
      {/*<AssistantLogoSVG className={'inset-0'} />*/}
      <Image src={AssistantLogoSVG} alt={'logo'} width={32} height={32} />

      <div className="text">
        <span className="gradient-1">Neurora</span>：Your AI Knowledge Companion
      </div>

      <div className={'grow overflow-hidden w-full'}>
        <ConnectionPage />
      </div>

      <div className={'flex items-center flex-col gap-4 p-4 mt-auto'}>
        {/*<p className="tip">*/}
        {/*  <code>V0.4.0</code> 支持你本地化地登录<span>Web端</span>微信，并导出自己的通讯录*/}
        {/*</p>*/}

        {versions && (
          <div className="creator !text-xs">
            Powered by electron-vite (Electron v{versions.electron}, Chromium v{versions.chrome},
            Node v{versions.node})
          </div>
        )}
      </div>
    </div>
  )
}
