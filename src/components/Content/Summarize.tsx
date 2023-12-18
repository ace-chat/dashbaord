import Icon from '@/components/Icon/Icon.tsx'
import { Select, Input, InputNumber } from 'antd'
import { pxToVw } from '@/utils'

export const SummarizeComp = ({t, text, setText, wordCount, setWordCount, languages, language, setLanguage}: any) => {
    return(
        <>
        <div>
            <div className={`flex items-center`}>
              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Text') }</span>
              <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
            </div>
            <div className={`mt-12`}>
              <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type Here')} value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
          </div>
          
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Word Count') }</span>
              <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
            </div>
            <div className={`mt-12`}>
              <div>
                <InputNumber
                  className='w-240 text-10 items-center'
                  style={{ paddingTop: 5, paddingBottom: 5 }}
                  min={0}
                  placeholder={t('Word Count')}
                  controls={true}
                  value={wordCount}
                  onChange={(value) => setWordCount(value)}
                />
              </div>
            </div>
          </div>
          
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Language ') }</span>
              <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
            </div>
            <div className={`mt-12`}>
              <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} value={language} onSelect={(value) => setLanguage(value)} />
            </div>
          </div>
        </>
    )
};