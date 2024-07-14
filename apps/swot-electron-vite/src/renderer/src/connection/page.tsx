'use client'

import { env } from '@cs-magic/env'
import { socketStatusMap, useInit, cn } from '@cs-magic/common'
// import { useUserIsAdmin } from '@cs-magic/auth'
import {
  Button,
  buttonVariants,
  ButtonWithLoading,
  FlexContainer,
  LabelLine,
  StandardCard
} from '@cs-magic/ui'

import { columns, DataTable } from './contacts.table.js'

import {
  IWechatBotTransfer,
  botContactsAtom,
  botLoggedInAtom,
  botLoggingAtom,
  botScanningAtom,
  botScanStatusAtom,
  botScanValueAtom,
  botSocketOpenedAtom,
  botUserAtom,
  ScanStatus
} from '@cs-magic/swot-bot-core'
import { logger } from '@cs-magic/common'
import { QRCodeSVG } from 'qrcode.react'

import { CSVLink } from 'react-csv'
import { toast } from 'sonner'
import { useAtom } from 'jotai'

export default function BotPage() {
  const [botScanning, setBotScanning] = useAtom(botScanningAtom)
  const [botScanValue, setBotScanValue] = useAtom(botScanValueAtom)
  const [botScanStatus, setBotScanStatus] = useAtom(botScanStatusAtom)
  const [botUser, setBotUser] = useAtom(botUserAtom)
  const [botContacts, setBotContacts] = useAtom(botContactsAtom)
  const [botSocketOpened, setBotSocketOpened] = useAtom(botSocketOpenedAtom)
  const [botLoggedIn, setBotLoggedIn] = useAtom(botLoggedInAtom)
  const [botLogging, setBotLogging] = useAtom(botLoggingAtom)

  // const isAdmin = useUserIsAdmin()

  const socket = useInit<WebSocket>(() => {
    console.log('-- initing socket --')
    const socketUrl = env?.NEXT_PUBLIC_SOCKET_URL!
    console.log({ socketUrl })
    const socket = new WebSocket(socketUrl)

    socket.addEventListener('error', console.error)

    socket.addEventListener('open', () => {
      setBotSocketOpened(true)
    })

    socket.addEventListener('close', () => {
      setBotSocketOpened(false)
    })

    socket.addEventListener('message', (event: MessageEvent<string>) => {
      // console.log({ event });

      try {
        const data = JSON.parse(event.data) as IWechatBotTransfer

        console.log('-- data: ', data)
        switch (data.type) {
          case 'scan':
            setBotScanning(true)
            setBotScanValue(data.data.value)
            setBotScanStatus(data.data.status)
            break

          case 'login':
            setBotScanning(false)
            setBotUser(data.data)
            break

          case 'loggedIn':
            setBotLoggedIn(data.data)
            setBotLogging(false)
            break

          case 'preference':
            break

          case 'contacts':
            // console.log("contacts: ", data.data.slice(0, 5))
            setBotContacts(data.data.filter((c) => !!c.friend))
            break
        }
      } catch (e) {
        // prettyError(e);
      }
    })

    return socket
  })

  logger.info({ botUser, botContacts })

  return (
    <FlexContainer
      orientation={'vertical'}
      className={
        cn()
        // "bg-cyan-950"
      }
    >
      <StandardCard title={'Socket'}>
        {!socket ? (
          'Socket初始化中……'
        ) : (
          <>
            <LabelLine title={'readyState'}>{socketStatusMap[socket.readyState]}</LabelLine>
          </>
        )}
      </StandardCard>

      {botSocketOpened && (
        <>
          <StandardCard title={'Bot Actions'}>
            <div className={'flex items-center gap-2'}>
              <ButtonWithLoading
                loading={botLogging}
                disabled={botScanning || botLoggedIn}
                onClick={() => {
                  setBotLogging(true)
                  socket?.send('start 1')
                }}
              >
                Log In
              </ButtonWithLoading>

              <Button
                disabled={!botUser || !botLoggedIn}
                onClick={() => {
                  socket?.send('stop')
                }}
              >
                Pause
              </Button>

              {
                // isAdmin &&
                <Button
                  disabled={!botUser || !botLoggedIn}
                  onClick={() => {
                    socket?.send('logout')
                  }}
                >
                  Log Out
                </Button>
              }
            </div>
          </StandardCard>

          {botScanning && (
            <StandardCard title={'Scan'}>
              <LabelLine title={'Status'}>{ScanStatus[botScanStatus]}</LabelLine>

              <QRCodeSVG value={botScanValue} />
            </StandardCard>
          )}

          {botUser && (
            <StandardCard title={'Bot Payload'}>
              <div>id: {botUser?.id}</div>
              <div>name: {botUser?.name}</div>

              <div className={'flex gap-2'}>
                <Button
                  onClick={() => {
                    socket?.send('get-contacts')
                  }}
                >
                  Get Contacts
                </Button>

                {botContacts && (
                  <CSVLink
                    className={cn(buttonVariants({}))}
                    data={botContacts}
                    filename={'contacts.csv'}
                    onClick={() => {
                      toast.success('downloaded')
                    }}
                  >
                    Dump Contacts
                  </CSVLink>
                )}
              </div>

              {botContacts && (
                <div>
                  <div className={'max-h-[320px] overflow-auto'}>
                    <DataTable columns={columns} data={botContacts} />
                  </div>
                </div>
              )}
            </StandardCard>
          )}
        </>
      )}
    </FlexContainer>
  )
}