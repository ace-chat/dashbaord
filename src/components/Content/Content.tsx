import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { pxToVw } from '@/utils'

//components
import { AdsComp } from './Ads'
import { ToneComp } from './Tone'
import { SummarizeComp } from './Summarize'
import { ParaphraseComp } from './Paraphrase'
import { AudienceComp } from './Audience'
import { EmailComp } from './Email'
import { IntroOutlineComp } from './IntroOutline'
import { EntireComp } from './Entire'

import axios from 'axios'
import { base_url } from '@/utils/constants'
import { RootState } from '@/store';

type Prop = {
  title: string;
  flow?: string;
  subTitle: string;
  tag: string;
}

const Content = (props: Prop) => {
  const { t } = useTranslation()
  const { token } = useSelector((state: RootState) => state.token)
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [brandVoices, setBrandVoices] = useState([
    { value: 'none', label: t('None') },
    { value: 'new', label: t('Create New') }
  ]);

  async function getAllRegions(){
    try {
      const response = await axios.get(`${base_url}/common/regions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if(response.data.code == 200){ //request success
        const formattedData = response.data.data.map((item: any) => ({
          label: item.country,
          value: item.id,
        }));
        setCountries(formattedData);
      }
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error:', error);
    }
  };

  async function getAllVoices(){
    try {
      const response = await axios.get(`${base_url}/common/voices`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if(response.data.code == 200){ //request success
        const formattedData = response.data.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setBrandVoices([...brandVoices, ...formattedData]);
      }
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    Promise.all([
      getAllRegions(),
      getAllVoices()
    ])
  },[]);

  const [platformMapping]: any = useState({
    media: [
      { value: 1, label: t('Facebook') },
      { value: 2, label: t('Instagram') },
      { value: 3, label: t('X') },
      { value: 4, label: t('LinkedIn') }
    ],
    engine : [
      { value: 5, label: t('Google Ads') }
    ]
  });

  const [platforms] = useState(platformMapping[props.tag] || []);

  const [tones] = useState([
    { value: 1, label: t('Luxury') },
    { value: 2, label: t('Persuasive') },
    { value: 3, label: t('Professional') },
    { value: 4, label: t('Funny') },
    { value: 5, label: t('Narrative') },
    { value: 6, label: t('Conversational') }
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

  const [types] = useState([
    { value: 'news', label: t('News-based') },
    { value: 'opinion', label: t('Opinion Piece') },
    { value: 'storytelling', label: t('Storytelling') },
    { value: 'interactive', label: t('Interactive') },
  ]);

  const [genders] = useState([
    { value: 1, label: t('Male') },
    { value: 2, label: t('Female') },
    { value: 3, label: t('Other') }
  ]);

  const [languages] = useState([
    { value: 1, label: t('English') },
    { value: 2, label: t('French') },
    { value: 3, label: t('German') },
    { value: 4, label: t('Arabic') },
    { value: 5, label: t('Chineese') },
    { value: 6, label: t('Dutch') },
    { value: 7, label: t('Italian') },
    { value: 8, label: t('Portuguese') },
    { value: 9, label: t('Spanish') },
    { value: 10, label: t('Russian') }
  ]);

  //sample generated text
  const sampleText =`
  Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpismolsa estie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.${"\n"}Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.${"\n"}Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh.${"\n"}Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.${"\n"}Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus.${"\n"}Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales m ligula.
  `;

  //generated text
  const [generatedText, setGeneratedText] = useState("");

  //state variables
  const [platform, setPlatform]: any = useState();
  const [brandName, setBrandName]: any = useState();
  const [productName, setProductName]: any = useState();
  const [productDesc, setProdDesc]: any = useState();
  const [tone, setTone]: any = useState();
  const [brandVoice, setBrandVoice]: any = useState();
  const [country, setCountry]: any = useState();
  const [gender, setGender]: any = useState();
  const [minAge, setMinAge]: any = useState();
  const [maxAge, setMaxAge]: any = useState();
  const [language, setLanguage]: any = useState(1);
  const [text, setText]: any = useState();
  const [wordCount, setWordCount]: any = useState();
  const [details, setDetails]: any = useState();
  const [type, setType]: any = useState();

  function canGenerate(){
    //social media ads & search engine validation
    if (props.tag == 'engine' || props.tag == 'media') {
      if (platform && brandName && productName && productDesc && tone && language) {
        return false;
      } else {
        return true;
      }
    }
    //optimized content change tone, freestyle email, intro and outline blog validation
    if(props.tag ==  "tone"|| props.tag == "freestyle" || props.tag == "intro" || props.tag == "outline"){
      if(text && tone && language){
        return false;
      } else {
        return true;
      }
    }
    //optimized content match brand voice , paraphrase and target audience validation
    if(props.tag ==  "brandvoice" || props.tag == "paraphrase" || props.tag == "audience"){
      if(text && language){
        return false;
      } else {
        return true;
      }
    }
    //optimized content summarize validation
    if(props.tag == "summarize"){
      if(text && wordCount && language){
        return false;
      } else {
        return true;
      }
    }
    //cold marketing, welcome and odds email validation
    if(props.tag == "marketing" || props.tag == "welcome" || props.tag == "odds"){
      if(brandName && productName && productDesc && tone && language){
        return false;
      } else {
        return true;
      }
    }
    //entire bog validation
    if(props.tag == "entire"){
      if(text && tone && wordCount && details && type){
        return false;
      } else {
        return true;
      }
    }
  };

  async function generateText(){
    const formData = new URLSearchParams();
    if(props.tag == "media"){ // /content/media/generator
      try {
        setLoading(true);
        formData.append('platform', platform);
        formData.append('brand_name', brandName);
        formData.append('service_name', productName);
        formData.append('service_desc', productDesc);
        formData.append('tones', tone);
        formData.append('brand_voice', brandVoice);
        formData.append('region', country);
        formData.append('gender', gender);
        formData.append('min_age', minAge);
        formData.append('max_age', maxAge);
        formData.append('language', language);

        const response = await axios.post(`${base_url}/content/media/generator`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
  
        if(response.data.code == 200){ //request success
          setLoading(false);
          console.log(response.data.data.text, "--text")
          setGeneratedText(response.data.data.text);
        }
      } catch (error) {
        // Handle errors (e.g., show an error message)
        setLoading(false);
        console.error('Error:', error);
      }
    }
  };

  return <>
    <div className={`flex flex-col`}>
      <div className='flex flex-row mt-14' style={{ marginLeft: pxToVw(29) }}>
        {props?.flow &&
          <div className={`text-[#545B65]`} style={{ fontFamily: "PingFang SC Regular", fontSize: pxToVw(18)}}>{t(props.flow)}&nbsp;&gt;&nbsp;</div>
        }
        <div className={`text-black`} style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(18)}}>{ t(props.title) }</div>
      </div>
      <div className={`text-[#545B65] mt-4`} style={{ marginLeft: pxToVw(29), fontFamily: "PingFang SC Light", fontSize: pxToVw(14) }}>{ t(props.subTitle) }</div>
    </div>
    <div className={`bg-white rounded-8 mt-14`} style={{ width: pxToVw(1389), marginLeft: pxToVw(29), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
      <div className={`flex justify-around`}>
        <div className={`w-300 p-24`} style={{ fontFamily: "PingFang SC Regular" }}>

          {(props.tag == "engine" || props.tag == "media") && 
            <AdsComp t={t} platforms={platforms} tones={tones} genders={genders} languages={languages} 
              platform={platform} 
              countries={countries}
              setPlatform={setPlatform}
              brandName={brandName}
              setBrandName={setBrandName} 
              productName={productName}
              setProductName={setProductName}
              productDesc={productDesc} 
              setProdDesc={setProdDesc}
              tone={tone}
              setTone={setTone} 
              brandVoices={brandVoices}
              brandVoice={brandVoice}
              setBrandVoice={setBrandVoice}
              country={country}
              setCountry={setCountry} 
              gender={gender} 
              setGender={setGender}
              minAge={minAge} 
              setMinAge={setMinAge}
              maxAge={maxAge} 
              setMaxAge={setMaxAge}
              language={language} 
              setLanguage={setLanguage}
            />
          }
          {(props.tag == "tone" || props.tag == "brandvoice") && 
            <ToneComp 
                t={t} tag={props.tag} tones={tones} brandVoices={brandVoices} languages={languages} 
                text={text}
                setText={setText} 
                tone={tone} 
                setTone={setTone} 
                brandVoice={brandVoice} 
                setBrandVoice={setBrandVoice}
                language={language} 
                setLanguage={setLanguage}
            />
          }
          {props.tag == "summarize" && 
            <SummarizeComp 
                t={t} languages={languages} 
                text={text}
                setText={setText}
                wordCount={wordCount}
                setWordCount={setWordCount}
                language={language} 
                setLanguage={setLanguage}
            />
          }
          {props.tag == "paraphrase" && 
            <ParaphraseComp 
                t={t} languages={languages} 
                text={text}
                setText={setText}
                language={language} 
                setLanguage={setLanguage}
          />}
          {props.tag == "audience" && 
            <AudienceComp t={t} genders={genders} languages={languages} 
                text={text}
                countries={countries}
                setText={setText}
                country={country}
                setCountry={setCountry} 
                gender={gender} 
                setGender={setGender}
                minAge={minAge} 
                setMinAge={setMinAge}
                maxAge={maxAge} 
                setMaxAge={setMaxAge}
                language={language} 
                setLanguage={setLanguage}
          />}
          {(props.tag == "freestyle" || props.tag == "marketing" || props.tag == "welcome" || props.tag == "odds") &&
            <EmailComp t={t} tag={props.tag} tones={tones} genders={genders} languages={languages} 
              text={text}
              countries={countries}
              setText={setText}
              brandName={brandName}
              setBrandName={setBrandName} 
              productName={productName}
              setProductName={setProductName}
              productDesc={productDesc} 
              setProdDesc={setProdDesc}
              tone={tone}
              setTone={setTone} 
              brandVoices={brandVoices}
              brandVoice={brandVoice}
              setBrandVoice={setBrandVoice}
              country={country}
              setCountry={setCountry} 
              gender={gender} 
              setGender={setGender}
              minAge={minAge} 
              setMinAge={setMinAge}
              maxAge={maxAge} 
              setMaxAge={setMaxAge}
              language={language} 
              setLanguage={setLanguage}
            />
          }
          
          {(props.tag == "intro" || props.tag == "outline") && 
            <IntroOutlineComp t={t} tones={tones} languages={languages} 
              text={text}
              setText={setText}
              tone={tone}
              setTone={setTone} 
              brandVoices={brandVoices}
              brandVoice={brandVoice}
              setBrandVoice={setBrandVoice}
              minAge={minAge} 
              setMinAge={setMinAge}
              maxAge={maxAge} 
              setMaxAge={setMaxAge}
              language={language} 
              setLanguage={setLanguage}
            />
          }

          {props.tag == "entire" && 
            <EntireComp t={t} tones={tones} languages={languages} 
              text={text}
              setText={setText}
              tone={tone}
              setTone={setTone} 
              brandVoices={brandVoices}
              brandVoice={brandVoice}
              setBrandVoice={setBrandVoice}
              minAge={minAge} 
              setMinAge={setMinAge}
              maxAge={maxAge} 
              setMaxAge={setMaxAge}
              wordCount={wordCount}
              setWordCount={setWordCount}
              details={details}
              setDetails={setDetails}
              language={language} 
              setLanguage={setLanguage}
              types={types}
              type={type}
              setType={setType}
            />
          }

          <div className={`mt-24`}>
            <Button
              type="default"
              loading={loading}
              disabled={canGenerate()}
              onClick={() => generateText()}
              className={`w-251 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
            >
              <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Generate')}</div>
            </Button>
          </div>

        </div>
          
        {generatedText.length == 0 ? 
          <div>
            <div style={{ 'width': pxToVw(682), 'height': pxToVw(750), display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
              <Icon name={'generate'} style={{ 'width': pxToVw(62), 'height': pxToVw(40) }} />
              <p className="text-18 text-[#C4C4C4] mt-14" style={{ fontFamily: "PingFang SC Light" }}>{t("Let's Get Started!")}</p>
              <p className="text-12 text-[#C4C4C4] font-light mt-10" style={{ fontFamily: "PingFang SC Light" }}>{t("Choose the service to generate content")}</p>
            </div>
          </div>
        :
        <div>
          <div className={`items-start justify-between rounded-10 mt-14 p-14`} style={{ backgroundColor: "#F6F7F8", 'width': pxToVw(682), 'height': pxToVw(750), display: 'flex', flexDirection: 'column' }}>
            <div className="scrollable-content" style={{ flex: 1, maxHeight: "100%", overflowY: "auto"}}>
              <div className='pl-4'>
                {generatedText.split('\n').map((paragraph, index) => {
                  return(
                    <p key={index} className={`leading-normal text-12 pr-16 mt-16`} style={{ fontFamily: "PingFang SC Regular" }}>
                    {paragraph}
                  </p>
                  )
                })}
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
      }


        <div className={`w-289 p-24 h-821`}>
          <div className={`text-12`} style={{ fontFamily: "PingFang SC Bold" }} >{ t('History') }</div>
          <div className={`mt-24`}>
            {
              history.map(item => {
                return <div key={item.key} className={`mb-30`}>
                  <div className={`text-10 text-[#787878]`} style={{ fontFamily: "PingFang SC Light" }}>{ t(item.time) }</div>
                  <div className={`cursor-pointer`}>
                    {
                      item.children.map(it => {
                        return <div key={it.key} className={`flex items-center mt-18`}>
                          <Icon name={'history'} style={{ 'width': pxToVw(12), 'height': pxToVw(14) }} />
                          <span className={`text-12 text-black ml-8 truncate`} style={{ fontFamily: "PingFang SC Medium" }}>{ t(it.text) }</span>
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