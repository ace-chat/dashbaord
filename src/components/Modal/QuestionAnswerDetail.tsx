import { QuestionAndAnswer } from '@/types'
import { pxToVw } from '@/utils'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { copied } from '@/utils'

type Props = {
  qas: Array<QuestionAndAnswer>
}

const QuestionAnswerDetail: FC<Props> = (props) => {
  const { t } = useTranslation()

  const qas = useMemo(() => props.qas, [props.qas])

  const onClickCopyAll = () => {
    if (qas.length === 0) {
      copied('')
      return
    }
    const text = qas.map((element) => `${element.question}: ${element.answer}`)
    copied(text.join(','))
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
        {qas && qas.map((item, key) => {
          return (
            <div key={key} className={`w-full`} style={{ marginBottom: 30 }}>
              <div className={`w-full`}>
                <div style={{ fontSize: 14, fontWeight: 400 }}>
                  {t("Question")} {key+1}: {item.question}
                </div>
                <div
                  style={{
                    marginTop: 5,
                    color: '#8E8E8E',
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  {t("Answer")} {key+1}: {item.answer}
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

export default QuestionAnswerDetail
