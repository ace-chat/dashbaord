import {useState } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { Select, Input, InputNumber } from 'antd'
import { pxToVw } from '@/utils'
import { countries } from '@/utils/constants';

type Prop = {
  title: string;
  subTitle: string;
  tag: string;
}

const Content = (props: Prop) => {
  const { t } = useTranslation()

  const [platformMapping]: any = useState({
    media: [
      { value: 'facebook', label: t('Facebook') },
      { value: 'instagram', label: t('Instagram') },
      { value: 'X', label: t('X') },
      { value: 'linkedin', label: t('LinkedIn') }
    ],
    engine : [
      { value: 'googleads', label: t('Google Ads') }
    ]
  });

  const [platforms] = useState(platformMapping[props.tag] || []);

  const [tones] = useState([
    { value: 'luxury', label: t('Luxury') },
    { value: 'persuasive', label: t('Persuasive') },
    { value: 'professional', label: t('Professional') },
    { value: 'funny', label: t('Funny') },
    { value: 'narrative', label: t('Narrative') },
    { value: 'conversational', label: t('Conversational') }
  ])

  const [history] = useState([
    { key: '1', time: 'Today', children: [
        { key: '1-1', text: 'Borem ipsum dolordict ImahBorem ipsum d' },
        { key: '1-2', text: 'Borem ipsum dolordict ImahBorem ipsum d' }
      ] },
    { key: '2', time: 'Oct, 10st', children: [
        { key: '2-1', text: 'Borem ipsum dolordict ImahBorem ipsum d' },
        { key: '2-2', text: 'Borem ipsum dolordict ImahBorem ipsum d' }
      ] }
  ]);

  const [brandVoices] = useState([
    { value: 'none', label: t('None') },
    { value: 'new', label: t('Create New') },
    { value: 'example1', label: t('Example 1') },
    { value: 'example2', label: t('Example 2') },
  ]);

  const [genders] = useState([
    { value: 'male', label: t('Male') },
    { value: 'female', label: t('Female') },
    { value: 'other', label: t('Other') }
  ]);

  const [languages] = useState([
    { value: 'english', label: t('English') },
    { value: 'french', label: t('French') },
    { value: 'german', label: t('German') },
    { value: 'arabic', label: t('Arabic') },
    { value: 'chineese', label: t('Chineese') },
    { value: 'dutch', label: t('Dutch') },
    { value: 'italian', label: t('Italian') },
    { value: 'portuguese', label: t('Portuguese') },
    { value: 'spanish', label: t('Spanish') },
    { value: 'russian', label: t('Russian') }
  ]);

  const ContentComp = () => {
    return(
      <>
      <div>
            <div className={`flex items-center`}>
              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Platform') }</span>
            </div>
            <div className={`mt-12`}>
              <Select mode="multiple" style={{ width: pxToVw(252), height: pxToVw(36) }} options={platforms} />
            </div>
          </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Details') }</span>
            </div>
            <div className={`mt-12`}>
              <div>
                <Input styles={{ input: { width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type brand name')} />
              </div>
              <div className={`my-12`}>
                <Input styles={{ input: { width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type service/product name')} />
              </div>
              <div>
                <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(63), fontSize: pxToVw(10) } }} placeholder={t('Description about service/product')} />
              </div>
            </div>
          </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Style') }</span>
            </div>
            <div className={`mt-12`}>
              <div>
                <Select placeholder={t('Tones')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} />
              </div>
              <div className={`mt-12`}>
                <Select placeholder={t('Brand Voice (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={brandVoices}
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
              <Icon name={'fourth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Audience') }</span>
            </div>
            <div className={`mt-12`}>
              <div>
                <Select placeholder={t('Region (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={countries} />
              </div>
              <div className={`my-12`}>
                <Select placeholder={t('Gender (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={genders} />
              </div>
              <div className={`flex items-center justify-between`}>
                <InputNumber
                  className='w-120 text-10 items-center'
                  style={{ paddingTop: 3, paddingBottom: 3 }}
                  min={12} // Minimum age
                  max={100} // Maximum age
                  placeholder={t('Min Age (Optional)')}
                  controls={true}
                />
                <InputNumber
                  className='w-120 text-10 items-center'
                  style={{ paddingTop: 3, paddingBottom: 3 }}
                  min={12} // Minimum age
                  max={100} // Maximum age
                  placeholder={t('Max Age (Optional)')}
                  controls={true}
                />
              </div>
            </div>
          </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'fifth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Language ') }</span>
            </div>
            <div className={`mt-12`}>
              <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} />
            </div>
          </div>
      </>
    )
  };

  const ToneComp = () => {
    return(
      <>
          <div>
            <div className={`flex items-center`}>
              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Text') }</span>
            </div>
            <div className={`mt-12`}>
              <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type here')} />
            </div>
          </div>
          
          <div className={`mt-24`}>
          <div className={`flex items-center`}>
            <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
            <span className={`ml-8 text-12`}>{ t('Style') }</span>
          </div>
          <div className={`mt-12`}>
            {props.tag == "brandvoice" ?
              <Select placeholder={t('Brand Voice (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={brandVoices}
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
                <Select placeholder={t('Tones')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} />
              </div>
            }
          </div>
        </div>

        <div className={`mt-24`}>
          <div className={`flex items-center`}>
            <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
            <span className={`ml-8 text-12`}>{ t('Language ') }</span>
          </div>
          <div className={`mt-12`}>
            <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} />
          </div>
        </div>
      </>
    )
  };

  const SummarizeComp = () => {
   return(
      <>
      <div>
          <div className={`flex items-center`}>
            <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
            <span className={`ml-8 text-12`}>{ t('Text') }</span>
          </div>
          <div className={`mt-12`}>
            <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type here')} />
          </div>
        </div>
        
        <div className={`mt-24`}>
          <div className={`flex items-center`}>
            <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
            <span className={`ml-8 text-12`}>{ t('Word Count') }</span>
          </div>
          <div className={`mt-12`}>
            <div>
              <InputNumber
                className='w-240 text-10 items-center'
                style={{ paddingTop: 5, paddingBottom: 5 }}
                min={0}
                placeholder={t('Word Count')}
                controls={true}
              />
            </div>
          </div>
        </div>
        
        <div className={`mt-24`}>
          <div className={`flex items-center`}>
            <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
            <span className={`ml-8 text-12`}>{ t('Language ') }</span>
          </div>
          <div className={`mt-12`}>
            <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} />
          </div>
        </div>
      </>
    )
  };

  const ParaphraseComp = () => {
    return(
      <>
      <div>
         <div className={`flex items-center`}>
           <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
           <span className={`ml-8 text-12`}>{ t('Text') }</span>
         </div>
         <div className={`mt-12`}>
           <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type here')} />
         </div>
       </div>
       
       <div className={`mt-24`}>
         <div className={`flex items-center`}>
           <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
           <span className={`ml-8 text-12`}>{ t('Language ') }</span>
         </div>
         <div className={`mt-12`}>
           <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} />
         </div>
       </div>
   </>
    )
  };

  const AudienceComp = () => {
    return(
      <>
         <div>
            <div className={`flex items-center`}>
              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Text') }</span>
            </div>
            <div className={`mt-12`}>
              <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type here')} />
            </div>
          </div>
          
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Audience') }</span>
            </div>
            <div className={`mt-12`}>
              <div>
                <Select placeholder={t('Region (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={countries} />
              </div>
              <div className={`my-12`}>
                <Select placeholder={t('Gender (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={genders} />
              </div>
              <div className={`flex items-center justify-between`}>
                <InputNumber
                  className='w-120 text-10 items-center'
                  style={{ paddingTop: 3, paddingBottom: 3 }}
                  min={12} // Minimum age
                  max={100} // Maximum age
                  placeholder={t('Min Age (Optional)')}
                  controls={true}
                />
                <InputNumber
                  className='w-120 text-10 items-center'
                  style={{ paddingTop: 3, paddingBottom: 3 }}
                  min={12} // Minimum age
                  max={100} // Maximum age
                  placeholder={t('Max Age (Optional)')}
                  controls={true}
                />
              </div>
            </div>
          </div>
          
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Language ') }</span>
            </div>
            <div className={`mt-12`}>
              <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} />
            </div>
          </div>
      </>
    )
  };

  const EmailComp = () => {
    return(
      <>
        <div>
            <div className={`flex items-center`}>
              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Details') }</span>
            </div>

            <div className={`mt-12`}>
                {props.tag == "freestyle" ?
                <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(120), fontSize: pxToVw(10) } }} placeholder={t('Type here')} />
              :
                <>
                  <div>
                    <Input styles={{ input: { width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type brand name')} />
                  </div>
                  <div className={`my-12`}>
                    <Input styles={{ input: { width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) } }} placeholder={t('Type service/product name')} />
                  </div>
                  <div>
                    <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(63), fontSize: pxToVw(10) } }} placeholder={t('Description about service/product')} />
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
                <Select placeholder={t('Tones')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} />
              </div>
              <div className={`mt-12`}>
                <Select placeholder={t('Brand Voice (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={brandVoices}
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
                <Select placeholder={t('Region (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={countries} />
              </div>
              <div className={`my-12`}>
                <Select placeholder={t('Gender (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={genders} />
              </div>
              <div className={`flex items-center justify-between`}>
                <InputNumber
                  className='w-120 text-10 items-center'
                  style={{ paddingTop: 3, paddingBottom: 3 }}
                  min={12} // Minimum age
                  max={100} // Maximum age
                  placeholder={t('Min Age (Optional)')}
                  controls={true}
                />
                <InputNumber
                  className='w-120 text-10 items-center'
                  style={{ paddingTop: 3, paddingBottom: 3 }}
                  min={12} // Minimum age
                  max={100} // Maximum age
                  placeholder={t('Max Age (Optional)')}
                  controls={true}
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
              <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} />
            </div>
          </div>
      </>
    )
  };

  const IntroOutlineComp = () => {
    return(
      <>
      <div>
          <div className={`flex items-center`}>
              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Topic') }</span>
            </div>
            <div className={`mt-12`}>
              <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(80), fontSize: pxToVw(10) } }} placeholder={t('Type here')} />
            </div>
          </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Style') }</span>
            </div>
            <div className={`mt-12`}>
              <div>
                <Select placeholder={t('Tones')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} />
              </div>
              <div className={`mt-12`}>
                <Select placeholder={t('Brand Voice (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={brandVoices}
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
                />
                <InputNumber
                  className='w-120 text-10 items-center'
                  style={{ paddingTop: 3, paddingBottom: 3 }}
                  min={12} // Minimum age
                  max={100} // Maximum age
                  placeholder={t('Max Age (Optional)')}
                  controls={true}
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
              <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} />
            </div>
          </div>
      </>
    )
  };

  const EntireComp = () => {
    return(
      <>
      <div>
          <div className={`flex items-center`}>
              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Topic') }</span>
            </div>
            <div className={`mt-12`}>
              <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(80), fontSize: pxToVw(10) } }} placeholder={t('Type here')} />
            </div>
          </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Style') }</span>
            </div>
            <div className={`mt-12`}>
              <div>
                <Select placeholder={t('Tones')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={tones} />
              </div>
              <div className={`mt-12`}>
                <Select placeholder={t('Brand Voice (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={brandVoices}
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
                />
                <InputNumber
                  className='w-120 text-10 items-center'
                  style={{ paddingTop: 3, paddingBottom: 3 }}
                  min={12} // Minimum age
                  max={100} // Maximum age
                  placeholder={t('Max Age (Optional)')}
                  controls={true}
                />
              </div>
            </div>
          </div>

          <div className={`mt-24`}>
          <div className={`flex items-center`}>
            <Icon name={'fourth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
            <span className={`ml-8 text-12`}>{ t('Word Count') }</span>
          </div>
          <div className={`mt-12`}>
            <div>
              <InputNumber
                className='w-240 text-10 items-center'
                style={{ paddingTop: 5, paddingBottom: 5 }}
                min={0}
                placeholder={t('Word Count')}
                controls={true}
              />
            </div>
          </div>
        </div>

        <div className={`mt-24`}>
          <div className={`flex items-center`}>
                <Icon name={'fifth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`}>{ t('Other Details') }</span>
              </div>
              <div className={`mt-12`}>
                <Input.TextArea styles={{ textarea: { width: pxToVw(252), height: pxToVw(80), fontSize: pxToVw(10) } }} placeholder={t('Type here')} />
          </div>
        </div>

          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'sixth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-12`}>{ t('Language ') }</span>
            </div>
            <div className={`mt-12`}>
              <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={languages} />
            </div>
          </div>
      </>
    )
  };

  return <>
    <div className={`bg-white rounded-8 mt-40`} style={{ boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
      <div className={`flex items-center flex-col`}>
        <div className={`text-20 text-black mt-30`}>{ props.title }</div>
        <div className={`text-12 text-[#545B65] mt-12 pb-12`}>{ props.subTitle }</div>
      </div>
      <div className={`flex justify-around`}>
        <div className={`w-300 p-24`}>

          {props.tag == "engine" && <ContentComp />}
          {props.tag == "media" && <ContentComp />}
          {props.tag == "tone" && <ToneComp />}
          {props.tag == "summarize" && <SummarizeComp />}
          {props.tag == "paraphrase" && <ParaphraseComp />}
          {props.tag == "brandvoice" && <ToneComp />}
          {props.tag == "audience" && <AudienceComp />}
          {props.tag == "freestyle" && <EmailComp />}
          {props.tag == "marketing" && <EmailComp />}
          {props.tag == "welcome" && <EmailComp />}
          {props.tag == "odds" && <EmailComp />}
          {props.tag == "intro" && <IntroOutlineComp />}
          {props.tag == "outline" && <IntroOutlineComp />}
          {props.tag == "entire" && <EntireComp />}

          <div className={`mt-24`}>
            <div className={`w-251 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}>{ t('Generate') }</div>
          </div>
        </div>
    
        <div>
          <div className={`items-start justify-between rounded-10 mt-14 p-14`} style={{ backgroundColor: "#F6F7F8", 'width': pxToVw(682), 'height': pxToVw(750), display: 'flex', flexDirection: 'column' }}>
            <div className="scrollable-content" style={{ flex: 1, maxHeight: "100%", overflowY: "auto"}}>
              <div className='p-12 pl-4'>
                <p className={`leading-normal text-12 pr-16`}>Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpismolsa estie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
                <p className={`mt-24 leading-normal text-12 pr-16`}>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.</p>
                <p className={`mt-24 leading-normal text-12 pr-16`}>Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales m ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, vestibulum </p>
                <p className={`mt-24 leading-normal text-12 pr-16`}>Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales m ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, vestibulum </p>
              </div>
            </div>
            <div className={`flex items-center justify-end mt-24 self-end`}>
              <div className={`w-78 flex items-center justify-between`}>
                <div className={`cursor-pointer`}>
                  <Icon name={'copied'} style={{ 'width': pxToVw(15), 'height': pxToVw(15) }} />
                </div>
                <div className={`cursor-pointer`}>
                  <Icon name={'good'} style={{ 'width': pxToVw(15), 'height': pxToVw(15) }} />
                </div>
                <div className={`cursor-pointer`}>
                  <Icon name={'poor'} style={{ 'width': pxToVw(15), 'height': pxToVw(15) }} />
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className={`w-289 p-24 h-821`}>
          <div className={`text-12`}>{ t('History') }</div>
          <div className={`mt-24`}>
            {
              history.map(item => {
                return <div key={item.key} className={`mb-30`}>
                  <div className={`text-10 text-[#787878]`}>{ t(item.time) }</div>
                  <div className={`cursor-pointer`}>
                    {
                      item.children.map(it => {
                        return <div key={it.key} className={`flex items-center mt-18`}>
                          <Icon name={'history'} style={{ 'width': pxToVw(12), 'height': pxToVw(14) }} />
                          <span className={`text-12 text-black ml-8 truncate`}>{ t(it.text) }</span>
                        </div>
                      })
                    }
                  </div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Content