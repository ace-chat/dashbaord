import Icon from '@/components/Icon/Icon.tsx'
import { Select, Input, InputNumber } from 'antd'
import { pxToVw } from '@/utils'

export const EntireComp=({t, text, setText, tones, tone, setTone, brandVoices, brandVoice, setBrandVoice, minAge, setMinAge, maxAge, setMaxAge, wordCount, setWordCount, 
    details, setDetails, languages, language, setLanguage}: any) => {
    return(
        <>
        <div>
            <div className={`flex items-center`}>
                <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`}>{ t('Topic') }</span>
                <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
              </div>
              <div className={`mt-12`}>
                <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(80), fontSize: pxToVw(10) } }} placeholder={t('Type here')} value={text} onChange={(e) => setText(e.target.value)} />
              </div>
            </div>
  
            <div className={`mt-24`}>
              <div className={`flex items-center`}>
                <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`}>{ t('Style') }</span>
                <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
              </div>
              <div className={`mt-12`}>
                <div>
                  <Select placeholder={t('Tones')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} value={tone} onSelect={(value) => setTone(value)} />
                </div>
                <div className={`mt-12`}>
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
                </div>
              </div>
            </div>
  
            <div className={`mt-24`}>
              <div className={`flex items-center`}>
                <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`}>{ t('Audience') }</span>
              </div>
              <div className={`mt-12`}>
                <div className={`flex items-center justify-between`}>
                  <InputNumber
                    className='w-120 text-10 items-center'
                    style={{ paddingTop: 3, paddingBottom: 3 }}
                    min={12} // Minimum age
                    max={100} // Maximum age
                    placeholder={t('Min Age (Optional)')}
                    controls={true}
                    value={minAge}
                    onChange={(value) => setMinAge(value)}
                  />
                  <InputNumber
                    className='w-120 text-10 items-center'
                    style={{ paddingTop: 3, paddingBottom: 3 }}
                    min={12} // Minimum age
                    max={100} // Maximum age
                    placeholder={t('Max Age (Optional)')}
                    controls={true}
                    value={maxAge}
                    onChange={(value) => setMaxAge(value)}
                  />
                </div>
              </div>
            </div>

            <div className={`mt-24`}>
                <div className={`flex items-center`}>
                    <Icon name={'fourth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`}>{ t('Word Count') }</span>
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
                        <Icon name={'fifth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                        <span className={`ml-8 text-12`}>{ t('Other Details') }</span>
                        <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                    </div>
                    <div className={`mt-12`}>
                        <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(80), fontSize: pxToVw(10) } }} placeholder={t('Type here')} value={details} onChange={(e) => setDetails(e.target.value)} />
                </div>
            </div>

  
            <div className={`mt-24`}>
              <div className={`flex items-center`}>
                <Icon name={'sixth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`}>{ t('Language ') }</span>
                <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
              </div>
              <div className={`mt-12`}>
                <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} value={language} onSelect={(value) => setLanguage(value)} />
              </div>
            </div>
        </>
    )
};