import { checkUser } from '@/test/user'
import type { Metadata } from 'next'
import '../../styles/main.css'
import '../globals.css'
import { redirect } from 'next/navigation'
import { UserProfile } from '@/types/types'
import Header from '@/containers/header'
import RecoilRootWrapper from '@/containers/recoilRootWrapper'
import { KAKAO_MAP_KEY } from '@/constants/contant'
import { MSWComponent } from '@/app/_component/MSWComponent'
import AuthSession from '@/app/_component/AuthSession'
export const metadata: Metadata = {
  title: 'USports',
  description: 'usports',
}

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const res: UserProfile = await checkUser()
  if (!res) {
    redirect('/login')
  }
  return (
    <RecoilRootWrapper>
      <html data-theme="light">
        <body>
          <MSWComponent />
          <AuthSession>
            <div id="wrap">
              <Header />
              <main id="main">{children}</main>
              {modal}
              <script
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&autoload=false`}
                type="text/javascript"
              />
            </div>
          </AuthSession>
        </body>
      </html>
    </RecoilRootWrapper>
  )
}
