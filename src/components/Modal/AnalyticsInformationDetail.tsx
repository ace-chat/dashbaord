import { DeepAnalyticsToolInfo } from '@/types'
import { pxToVw } from '@/utils'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { copied } from '@/utils'

type Props = {
  infos: DeepAnalyticsToolInfo
}

const AnalyticsInformationDetail: FC<Props> = (props) => {
  const { t } = useTranslation()

  const infos = useMemo(() => props.infos, [props.infos])

  const onClickCopyAll = () => {
    copied(
      infos.business_desc +
        ',' +
        infos.product_desc +
        ',' +
        infos.data_desc +
        ',' +
        infos.service_name
    )
  }

  return (
    <div>
      <div
        style={{
          fontSize: pxToVw(22),
        }}
      >
        {t('Deep Analytics Tool to Knowledge Base')}
      </div>

      <div style={{ marginTop: 40 }}>
        <div style={{ fontWeight: 400, fontSize: 14 }}>
          {t('Business description')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.business_desc}
        </div>
        <div style={{ fontWeight: 400, fontSize: 14, marginTop: 15 }}>
          {t('Product description')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.product_desc}
        </div>
        <div style={{ fontWeight: 400, fontSize: 14, marginTop: 15 }}>
          {t('Data description')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.data_desc}
        </div>
        <div style={{ fontWeight: 400, fontSize: 14, marginTop: 15 }}>
          {t('Selected Service')}:
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 16,
            color: '#8E8E8E',
            marginTop: 10,
          }}
        >
          {infos.service_name}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <a onClick={onClickCopyAll}>{t('Copy all')}</a>
      </div>
    </div>
  )
}

export default AnalyticsInformationDetail
