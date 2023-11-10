import Icon from '@/components/Icon/Icon.tsx'
import { Select, Input } from 'antd'
import { pxToVw } from '@/utils'

export const ToneComp = ({t, tag, text, setText, tones, tone, setTone, brandVoices, brandVoice, setBrandVoice, languages, language, setLanguage}: any) => {
    return(
        <>
            <div>
              <div className={`flex items-center`}>
                <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`}>{ t('Text') }</span>
                <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
              </div>
              <div className={`mt-12`}>
                <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type here')} value={text} onChange={(e) => setText(e.target.value)} />
              </div>
            </div>
            
            <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Style') }</span>
              {tag !== "brandvoice" &&
                <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
              }
            </div>
            <div className={`mt-12`}>
              {tag == "brandvoice" ?
                <Select placeholder={t('Brand Voice (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={brandVoices}
                value={brandVoice} onSelect={(value) => setBrandVoice(value)}
                optionRender={(node) => {
                  return (
                    <div className={`flex items-center justify-between`}>
                      <span>{node.label}</span>
                      {node.value !== "none" &&
                        <Icon name={node.value == "new" ? 'add' : 'trash'} style={{ 'width': pxToVw(8), 'height': pxToVw(8) }} />
                      }
                    </div>
                  );
                }}
                />
              :
                <div>
                  <Select placeholder={t('Tones')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} value={tone} onChange={(value) => setTone(value)} />
                </div>
              }
            </div>
          </div>
  
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Language ') }</span>
              <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
            </div>
            <div className={`mt-12`}>
              <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} value={language} onChange={(value) => setLanguage(value)} />
            </div>
          </div>
        </>
      )
};