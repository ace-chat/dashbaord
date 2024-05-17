import { BusinessMerchantChatBoxInformation } from '@/types'
import { pxToVw } from '@/utils'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { copied } from '@/utils'

type Props = {
  infos: BusinessMerchantChatBoxInformation
}

const InformationDetail: FC<Props> = (props) => {
  const { t } = useTranslation()

  const infos = useMemo(() => props.infos, [props.infos])

  const onClickCopyAll = () => {
    const platformTxt = infos.platform.map(item => {
        if (item.status) {
            return item.name
        }
    })
    copied(infos.company_name + "," + infos.links + "," + infos.company_introduction + "," + platformTxt + infos.phone_number + "," + infos.tone_name)
  }

  return (
    <div>
      <div
        style={{
          fontSize: pxToVw(22),
        }}
      >
        {t('Information of merchant’s chatbot input')}
      </div>

      <div style={{ marginTop: 40 }}>
        <div style={{ fontWeight: 400, fontSize: 14 }}>
          {t('Company Name')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.company_name}
        </div>
        <div style={{ fontWeight: 400, fontSize: 14, marginTop: 15 }}>
          {t('Add Websites Links')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.links.length > 0 &&
            infos.links.map((item, key) => {
              return (
                <span key={key} style={{ marginRight: 10 }}>
                  {item}
                </span>
              )
            })}
        </div>
        <div style={{ fontWeight: 400, fontSize: 14, marginTop: 15 }}>
          {t('Company Introduction')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.company_introduction}
        </div>
        <div style={{ fontWeight: 400, fontSize: 14, marginTop: 15 }}>
          {t('Platform & phone number')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.platform.length > 0 &&
            infos.platform.map((item, key) => {
              if (!item.status) {
                return <></>
              } else {
                return (
                  <span key={key}>
                    {item.name} {infos.phone_number}
                  </span>
                )
              }
            })}
        </div>
        <div style={{ fontWeight: 400, fontSize: 14, marginTop: 15 }}>
          {t('Tone')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.tone_name}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <a onClick={onClickCopyAll}>{t('Copy all')}</a>
      </div>
    </div>
  )
}

export default InformationDetail
