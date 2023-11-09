import { useState } from 'react'
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

  //sample generated text
  const sampleText =`
  Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpismolsa estie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.${"\n"}Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.${"\n"}Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh.${"\n"}Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.${"\n"}Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus.${"\n"}Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales m ligula.
  `;

  //generated text
  const [generatedText, setGeneratedText] = useState("");

  //state variables
  const [platform, setPlatform]: any = useState([]);
  const [brandName, setBrandName]: any = useState();
  const [productName, setProductName]: any = useState();
  const [productDesc, setProdDesc]: any = useState();
  const [tone, setTone]: any = useState();
  const [brandVoice, setBrandVoice]: any = useState();
  const [country, setCountry]: any = useState();
  const [gender, setGender]: any = useState();
  const [minAge, setMinAge]: any = useState();
  const [maxAge, setMaxAge]: any = useState();
  const [language, setLanguage]: any = useState("English");
  const [text, setText]: any = useState();
  const [wordCount, setWordCount]: any = useState();
  const [details, setDetails]: any = useState();

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
      if(text && tone && wordCount && details){
        return false;
      } else {
        return true;
      }
    }
  };

  return <>
    <div className={`bg-white rounded-8 mt-40`} style={{ boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
      <div className={`flex items-center flex-col`}>
        <div className={`text-20 text-black mt-30`}>{ props.title }</div>
        <div className={`text-12 text-[#545B65] mt-12 pb-12`}>{ props.subTitle }</div>
      </div>
      <div className={`flex justify-around`}>
        <div className={`w-300 p-24`}>

          {(props.tag == "engine" || props.tag == "media") && 
            <AdsComp t={t} platforms={platforms} tones={tones} genders={genders} languages={languages} 
              platform={platform} 
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
            />
          }

          <div className={`mt-24`}>
            <Button
              type="default"
              disabled={canGenerate()}
              //sample on click function
              onClick={() => setGeneratedText(sampleText)}
              className={`w-251 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
            >
              {t('Generate')}
            </Button>
          </div>

        </div>
          
        {generatedText.length == 0 ? 
          <div>
            <div style={{ 'width': pxToVw(682), 'height': pxToVw(750), display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
              <Icon name={'generate'} style={{ 'width': pxToVw(62), 'height': pxToVw(40) }} />
              <p className="text-18 text-[#C4C4C4] mt-14">Let's Get Started</p>
              <p className="text-12 text-[#C4C4C4] font-light mt-10">Choose the service to generate content</p>
            </div>
          </div>
        :
        <div>
          <div className={`items-start justify-between rounded-10 mt-14 p-14`} style={{ backgroundColor: "#F6F7F8", 'width': pxToVw(682), 'height': pxToVw(750), display: 'flex', flexDirection: 'column' }}>
            <div className="scrollable-content" style={{ flex: 1, maxHeight: "100%", overflowY: "auto"}}>
              <div className='pl-4'>
                {generatedText.split('\n').map((paragraph, index) => {
                  return(
                    <p key={index} className={`leading-normal text-12 pr-16 mt-16`}>
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