import { pxToVw } from '@/utils'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DownloadFile } from '@/types'
import FileSvg from '@/assets/file.svg'

type Props = {
  files: DownloadFile[]
}

const FileDetail: FC<Props> = (props) => {
  const { t } = useTranslation()

  const files = useMemo(() => props.files, [props.files])

  const onClickDownloadAll = () => {
    files.forEach((item) => {
      const link = document.createElement('a')
      link.href = item.download_url
      link.download = ''
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })

    // const platformTxt = infos.platform.map(item => {
    //     if (item.status) {
    //         return item.name
    //     }
    // })
  }

  return (
    <div>
      <div
        style={{
          fontSize: pxToVw(22),
        }}
      >
        {t('Files of merchant’s chatbot')}
      </div>

      <div style={{ marginTop: 40, display: 'flex' }}>
        {files &&
          files.map((item, key) => {
            return (
              <a
                key={key}
                style={{ marginRight: 10, textAlign: 'center' }}
                href={item.download_url}
                target="_blank"
              >
                <img
                  src={FileSvg}
                  alt="File"
                  style={{
                    width: pxToVw(90),
                    height: pxToVw(62),
                  }}
                />
                <div style={{ color: '#818181', marginTop: 10 }}>
                  {item.name}
                </div>
              </a>
            )
          })}
      </div>
      {files.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <a onClick={onClickDownloadAll}>{t('Download all')}</a>
        </div>
      ) : (
        <div>{t('Empty')}</div>
      )}
    </div>
  )
}

export default FileDetail
