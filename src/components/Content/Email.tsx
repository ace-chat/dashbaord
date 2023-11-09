import Icon from '@/components/Icon/Icon.tsx'
import { Select, Input, InputNumber } from 'antd'
import { pxToVw } from '@/utils'
import { countries } from '@/utils/constants';

export const EmailComp = ({t, tag, text, setText, brandName, setBrandName, productName, setProductName, productDesc, setProdDesc, tones, tone, setTone, brandVoices, brandVoice, setBrandVoice, 
    country, setCountry, genders, gender, setGender, minAge, setMinAge, maxAge, setMaxAge, languages, language, setLanguage}: any) => {
    return(
        <>
          <div>
              <div className={`flex items-center`}>
                <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`}>{ t('Details') }</span>
              </div>
  
              <div className={`mt-12`}>
                  {tag == "freestyle" ?
                  <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type here')} value={text} onChange={(e) => setText(e.target.value)}/>
                :
                  <>
                    <div>
                      <Input styles={{ input: { width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type brand name')} value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                    </div>
                    <div className={`my-12`}>
                      <Input styles={{ input: { width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type service/product name')} value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div>
                      <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(63), fontSize: pxToVw(10) } }} placeholder={t('Description about service/product')} 
                        value={productDesc} onChange={(e) => setProdDesc(e.target.value)} />
                    </div>
                  </>
                  }
              </div>
            </div>
  
            <div className={`mt-24`}>
              <div className={`flex items-center`}>
                <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`}>{ t('Style') }</span>
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
                <div>
                  <Select placeholder={t('Region (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={countries} value={country} onSelect={(value) => setCountry(value)} />
                </div>
                <div className={`my-12`}>
                  <Select placeholder={t('Gender (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={genders} value={gender} onSelect={(value) => setGender(value)} />
                </div>
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
                <span className={`ml-8 text-12`}>{ t('Language ') }</span>
              </div>
              <div className={`mt-12`}>
                <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} value={language} onSelect={(value) => setLanguage(value)} />
              </div>
            </div>
        </>
      )
};