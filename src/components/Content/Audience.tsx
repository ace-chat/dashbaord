import Icon from '@/components/Icon/Icon.tsx'
import { Select, Input, InputNumber } from 'antd'
import { pxToVw } from '@/utils'

export const AudienceComp = ({t, text, countries, setText, country, setCountry, genders, gender, setGender, minAge, setMinAge, maxAge, setMaxAge, languages, language, setLanguage}: any) => {
    return(
        <>
           <div>
              <div className={`flex items-center`}>
                <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Text') }</span>
                <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
              </div>
              <div className={`mt-12`}>
                <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type Here')} value={text} onChange={(e) => setText(e.target.value)} />
              </div>
            </div>
            
            <div className={`mt-24`}>
              <div className={`flex items-center`}>
                <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Audience') }</span>
              </div>
              <div className={`mt-12`}>
                <div>
                  <Select placeholder={t('Region (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={countries} value={country} onSelect={(value) => setCountry(value)} />
                </div>
                <div className={`mt-12`}>
                  <Select placeholder={t('Gender (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={genders} value={gender} onSelect={(value) => setGender(value)} />
                </div>
                <div className={`flex items-center justify-between mt-12`}>
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
                <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Language ') }</span>
                <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
              </div>
              <div className={`mt-12`}>
                <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} value={language} onSelect={(value) => setLanguage(value)}/>
              </div>
            </div>
        </>
    )
};