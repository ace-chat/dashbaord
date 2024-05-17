import { SalesAndPitches } from '@/types'
import { pxToVw } from '@/utils'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { copied } from '@/utils'

type Props = {
  sps: Array<SalesAndPitches>
}

const SalesPitchDetail: FC<Props> = (props) => {
  const { t } = useTranslation()

  const sps = useMemo(() => props.sps, [props.sps])

  const onClickCopyAll = () => {
    if (sps.length === 0) {
      copied('')
      return
    }
    const text = sps.map((element) => `${element.topic}: ${element.input}`)
    copied(text.join(','))
  }

  return (
    <div>
      <div
        style={{
          fontSize: pxToVw(22),
        }}
      >
        {t('Merchant Chatbot Sales Pitches to Knowledge Base')}
      </div>

      <div style={{ marginTop: 40 }}>
        {sps.map((item, key) => {
          return (
            <div key={key} className={`w-full`} style={{ marginBottom: 30 }}>
              <div className={`w-full`}>
                <div style={{ fontSize: 14, fontWeight: 400 }}>
                  {t('Topic(Keyword)')}: {item.topic}
                </div>
                <div
                  style={{
                    marginTop: 5,
                    color: '#8E8E8E',
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  {item.input}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <a onClick={onClickCopyAll}>{t('Copy all')}</a>
      </div>
    </div>
  )
}

export default SalesPitchDetail
