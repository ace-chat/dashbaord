import { useState, useEffect, useMemo } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { Button, Input, InputNumber, message, Select, Divider } from 'antd'
import { pxToVw } from '@/utils'
import moment from 'moment-timezone'

//components
import { CreateBrandVoice } from '../Modal/CreateBrandVoice';
import DeleteVoice from '../Modal/DeleteVoice';

import { getAllRegions, getAllVoices, generator, getHistory, getDetailById, getAllTone, getAllPlatform, getAllLanguage, getAllGender, getAllType, deleteVoice } from "@/request";
import type { ContentHistoryChildren, ContentHistory, Prop, Tone, Platform, Language, Region, Gender, Option, Voice, Type } from "@/types";

const Content = (props: Prop) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false);

  // modal for creating brand voice 
  const [open, setOpen] = useState(false);

  // modal for confirm delete brand voice
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [id, setId] = useState(0);

  const openBrandVoice = () => {
    setOpen(true);
  };
  
  const confirmBrandVoice = async (id: number) => {
    await getVoices();
    setBrandVoice(id);
    setOpen(false);
  }

  const cancelBrandVoice = () => {
    setOpen(false);
  }

  const [countries, setCountries] = useState<Array<Option>>([]);
  const [brandVoices, setBrandVoices] = useState<Array<Option>>([]);
  const [platforms, setPlatforms] = useState<Array<Option>>([]);
  const [tones, setTones] = useState<Array<Option>>([]);
  const [languages, setLanguages] = useState<Array<Option>>([]);
  const [genders, setGenders] = useState<Array<Option>>([]);
  const [types, setTypes] = useState<Array<Option>>([]);
  const [history, setHistory] = useState<Array<ContentHistory>>([]);

  const getTones = async () => {
    let res: Array<Tone> = await getAllTone(1);
    let arr: Array<Option> = [];
    res.forEach(item => {
      arr.push({
        label: item.name,
        value: item.id,
      })
    })
    setTones(arr);
  }

  const getPlatforms = async () => {
    let res: Array<Platform> = await getAllPlatform(props.tag === "media" ? 1 : props.tag === "engine" ? 2 : 0);
    let arr: Array<Option> = [];
    res.forEach(item => {
      arr.push({
        label: item.name,
        value: item.id,
      })
    })
    setPlatforms(arr);
  }

  const getLanguages = async () => {
    let res: Array<Language> = await getAllLanguage();
    let arr: Array<Option> = [];
    res.forEach((item) => {
      arr.push({
        label: item.name,
        value: item.id,
      })
    });
    setLanguages(arr);
  }

  const getRegions = async() =>{
    const res: Array<Region> = await getAllRegions();

    let arr: Array<Option> = [];
    res.forEach(item => {
      arr.push({
        label: item.country,
        value: item.id,
      })
    });
    setCountries(arr);
  };

  const getVoices = async() => {
    const res: Array<Voice> = await getAllVoices()

    let arr: Array<Option> = [];
    res.forEach(item => {
      arr.push({
        label: item.name,
        value: item.id,
      })
    });
    arr.unshift({ value: undefined, label: t('None') },
      { value: 'new', label: t('Create New') });
    setBrandVoices(arr);
  }

  const getGenders = async () => {
    const res: Array<Gender> = await getAllGender();

    let arr: Array<Option> = [];
    res.forEach(item => {
      arr.push({
        label: item.name,
        value: item.id,
      })
    });
    setGenders(arr);
  }

  const handleDelete = async (id: number) => {
    if(id){
      setId(id);
      setShowDeleteModal(true);
    }
  }

  const onConfirm = async () => {
    try {
      await deleteVoice(id);
       let arr = brandVoices.filter(item => Number(item.value) !== id);
      setBrandVoices(arr)
      setBrandVoice(undefined)
     setShowDeleteModal(false);
     } catch (error: any) {
       setLoading(false);
       message.error(error.message);
     }
  }

  const onCancel = async () => {
    setShowDeleteModal(false)
  }
  
  const getTypes = async () => {
    const res: Array<Type> = await getAllType();

    let arr: Array<Option> = [];
    res.forEach(item => {
      arr.push({
        label: item.name,
        value: item.id,
      })
    });
    setTypes(arr);
  }

  const getAllHistory = async () => {
    let res: Array<ContentHistoryChildren> = await getHistory(props.url.history);

    let arr: Map<string, Array<ContentHistoryChildren>> = new Map();
    res.forEach(item => {
      let time = moment(item.created_at).local().format("MMMM Do YYYY");

      if(arr.has(time)){
        let a = arr.get(time) || [];
        a.push(item);
        arr.set(time, a);
      }else{
        arr.set(time, [item])
      }
    })

    let a: Array<ContentHistory> = [];
    arr.forEach((value, key) => {
      a.push({
        time: key,
        children: value,
      })
    })

    setHistory(a.reverse());
  }

  useEffect(() => {
    switch (props.tag) {
      case "media": case "engine":
        Promise.all([
          getRegions(),
          getVoices(),
          getTones(),
          getPlatforms(),
          getGenders(),
          getAllHistory(),
        ]).then()
        break;
      case "tone":
        Promise.all([
          getTones(),
        ]).then()
        break;
      case "voice":
        Promise.all([
          getVoices(),
        ]).then()
        break;
      case "audience":
        Promise.all([
          getRegions(),
          getGenders(),
        ]).then()
        break;
      case "freestyle": case "marketing": case "welcome": case "odds":
        Promise.all([
          getTones(),
          getRegions(),
          getGenders(),
          getVoices(),
        ]).then()
        break;
      case "intro": case "outline":
        Promise.all([
          getTones(),
          getVoices(),
        ]).then()
        break;
      case "entire":
        Promise.all([
          getTypes(),
          getTones(),
          getVoices(),
        ]).then();
    }
    getLanguages().then()
  },[]);

  //generated text
  const [generatedText, setGeneratedText] = useState("");

  //state variables
  const [text, setText] = useState<string>();
  const [wordCount, setWordCount] = useState<number>();
  const [platform, setPlatform] = useState<number>();
  const [brandName, setBrandName] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productDesc, setProdDesc] = useState<string>("");
  const [brandDesc, setBrandDesc] = useState<string>("");
  const [tone, setTone] = useState<number>();
  const [brandVoice, setBrandVoice] = useState<number>();
  const [country, setCountry] = useState<number>();
  const [gender, setGender] = useState<number>();
  const [minAge, setMinAge] = useState<number>();
  const [maxAge, setMaxAge] = useState<number>();
  const [language, setLanguage] = useState<number>();
  const [type, setType] = useState<number>();
  const [keyword, setKeyword] = useState<string>();
  const [details, setDetails] = useState<string>();

  // local vars
  const countingNames = [ 'sixth', 'fifth', 'fourth', 'third', 'second', 'first' ]

  const canGenerate = useMemo(() => {
    let status = true;
    switch(props.tag){
      case "media":
        if(!!platform && !!brandName && !!productName && !!productDesc && !!tone && !!language){
          status = false;
          break;
        }
        break
      case "engine":
        if(!!platform && !!brandName && !!productName && !!productDesc && !!tone && !!language){
          status = false;
          break;
        }
        break
      case "tone":
        if(!!text && !!tone && !!language){
          status = false;
          break;
        }
        break
      case "summarize":
        if(!!text && !!wordCount && !!language){
          status = false;
          break;
        }
        break
      case "paraphrase":
        if(!!text && !!language){
          status = false;
          break;
        }
        break
      case "voice":
        if(!!text && !!brandVoice && !!language){
          status = false;
          break;
        }
        break
      case "audience":
        if(!!text && !!language){
          status = false;
          break;
        }
        break
      case "freestyle":
        if(!!text && !!tone && !!language){
          status = false;
          break;
        }
        break
      case "marketing": case "welcome": case "odds":
        if(!!brandName && !!tone && !!language){
          status = false;
          break;
        }
        break
      case "intro": case "outline":
        if(!!text && !!tone && !!language){
          status = false;
          break;
        }
        break;
      case "entire":
        if(!!text && !!tone && !!type && !!wordCount && !!language){
          status = false;
          break;
        }
        break;
      default:
        break;
    }
    return status;
  }, [platform, brandName, productName, productDesc, tone, language])

  const createFormData = () => {
    let form: Record<string, any> = {};
    switch (props.tag) {
      case "media":
        form = {
          platform: platform,
          brand_name: brandName,
          service_name: productName,
          service_desc: productDesc,
          tones: tone,
          brand_voice: brandVoice ? null : brandVoice,
          region: country,
          gender: gender,
          min_age: minAge,
          max_age: maxAge,
          language: language,
        }
        break
      case "engine":
        form = {
          platform: platform,
          brand_name: brandName,
          service_name: productName,
          service_desc: productDesc,
          tones: tone,
          brand_voice: brandVoice ? null : brandVoice,
          region: country,
          gender: gender,
          min_age: minAge,
          max_age: maxAge,
          language: language,
        }
        break
      case "tone":
        form = {
          text: text,
          tones: tone,
          language: language,
        }
        break;
      case "summarize":
        form = {
          text: text,
          word_count: wordCount,
          language: language,
        }
        break;
      case "paraphrase":
        form = {
          text: text,
          language: language
        }
        break;
      case "voice":
        form = {
          text: text,
          brand_voice: brandVoice ? null : brandVoice,
          language: language
        }
        break;
      case "audience":
        form = {
          text: text,
          region: country,
          gender: gender,
          max_age: maxAge,
          min_age: minAge,
          language: language,
        }
        break;
      case "freestyle":
        form = {
          detail: text,
          tones: tone,
          brand_voice: brandVoice ? null : brandVoice,
          region: country,
          gender: gender,
          max_age: maxAge,
          min_age: minAge,
          language: language,
        }
        break;
      case "marketing": case "welcome": case "odds":
        form = {
          brand_name: brandName,
          brand_desc: brandDesc,
          service_name: productName,
          service_desc: productDesc,
          tones: tone,
          brand_voice: brandVoice ? null : brandVoice,
          region: country,
          gender: gender,
          max_age: maxAge,
          min_age: minAge,
          language: language,
        }
        break;
      case "intro": case "outline":
        form = {
          topic: text,
          tones: tone,
          brand_voice: brandVoice ? null : brandVoice,
          max_age: maxAge,
          min_age: minAge,
          language: language,
        }
        break;
      case "entire":
        form = {
          topic: text,
          tones: tone,
          type: type,
          brand_voice: brandVoice ? null : brandVoice,
          keyword: keyword,
          max_age: maxAge,
          min_age: minAge,
          word_count: wordCount,
          other_details: details,
          language: language,
        }
        break;
      default:
        break;
    }
    return form;
  }

  const generateText = async () => {
    const formData = createFormData();

    try {
      setLoading(true);
      const res = await generator(props.url.generator, formData)

      setGeneratedText(res.text);
      await getAllHistory();
      setLoading(false);
    } catch (error: any) {
      // Handle errors (e.g., show an error message)
      setLoading(false);
      console.error('Error:', error);
      message.error(error.message);
    }
  };

  const getHistoryById = async (id: number) => {
    setLoading(true);
    const res = await getDetailById(props.url.content, id);
    setGeneratedText(res.content);
    setLoading(false);
  }

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
        <div className={`w-300 p-24`} style={{fontFamily: "PingFang SC Regular"}}>
          {/* Topic start */}
          {
            props.optional?.topic && <div>
                  <div className={`flex items-center`}>
                      <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                      <div className='hidden'>
                      {countingNames.pop()}
                      </div>
                      <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Topic')}</span>
                      <Icon name={'require'}
                            style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/>
                  </div>
                  <div className={`mt-12`}>
                      <Input.TextArea styles={{textarea: {width: pxToVw(252), height: pxToVw(80)}}}
                                      placeholder={t('Type Here')} value={text} onChange={(e) => setText(e.target.value)}/>
                  </div>
              </div>
          }
          {/* Topic end */}

          {/* Text start */}
          {
            props.optional?.text && <div>
                  <div className={`flex items-center`}>                    
                      <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                      <div className='hidden'>
                      {countingNames.pop()}
                      </div>
                      <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Text')}</span>
                      <Icon name={'require'}
                            style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/>
                  </div>
                  <div className={`mt-12`}>
                      <Input.TextArea styles={{textarea: {width: pxToVw(252), height: pxToVw(120)}}}
                                      placeholder={t('Type Here')} value={text} onChange={(e) => setText(e.target.value)}/>
                  </div>
              </div>
          }
          {/* Text end */}

          {/* WordCount start */}
          {
            props.optional?.word_count && <div className={`mt-24`}>
                  <div className={`flex items-center`}>
                      <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                      <div className='hidden'>
                      {countingNames.pop()}
                      </div>
                      <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Word Count')}</span>
                      <Icon name={'require'}
                            style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/>
                  </div>
                  <div className={`mt-12`}>
                      <div>
                          <InputNumber
                              className='w-240 text-10 items-center'
                              style={{paddingTop: 5, paddingBottom: 5}}
                              min={0}
                              placeholder={t('Word Count')}
                              controls={true}
                              value={wordCount}
                              onChange={(value) => setWordCount(value || 0)}
                          />
                      </div>
                  </div>
              </div>
          }
          {/* WordCount end */}

          {/* Platform start */}
          {
            props.optional?.platform && <div>
                  <div className={`flex items-center`}>
                      <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                      <div className='hidden'>
                      {countingNames.pop()}
                      </div>
                      <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Platform')}</span>
                      <Icon name={'require'}
                            style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/>
                  </div>
                  <div className={`mt-12`}>
                      <Select style={{width: pxToVw(252), height: pxToVw(36)}} options={platforms}
                              placeholder={t("Platform")}
                              value={platform} onSelect={(value) => setPlatform(value)}/>
                  </div>
              </div>
          }
          {/* Platform end */}

          {/* Details start */}
          {
            props.optional?.details && <div className={`mt-24`}>
                  <div className={`flex items-center`}>
                      <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                      <div className='hidden'>
                      {countingNames.pop()}
                      </div>
                      <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Details')}</span>
                      <Icon name={'require'}
                            style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/>
                  </div>
                  <div className={`mt-12`}>
                    {/* brand name start */}
                    {
                      props.optional?.details.brand_name && <div>
                            <Input styles={{input: {width: pxToVw(252), height: pxToVw(36)}}}
                                   placeholder={t('Type Brand Name')} value={brandName}
                                   onChange={(e) => setBrandName(e.target.value)}/>
                        </div>
                    }
                    {/* brand name end */}

                    {/* brand desc start */}
                    {
                      props.optional?.details.brand_name && <div className={`mt-12`}>
                        <Input.TextArea
                          styles={{textarea: {width: pxToVw(252), height: pxToVw(63)}}}
                          placeholder={t('Brand Description')}
                          value={brandDesc} onChange={(e) => setBrandDesc(e.target.value)}/>
                      </div>
                    }
                    {/* brand desc end */}

                    {/* service/product name start */}
                    {
                      props.optional?.details.service_name && <div className={`mt-12`}>
                            <Input styles={{input: {width: pxToVw(252), height: pxToVw(36)}}}
                                   placeholder={t('Type Service/Product Name')} value={productName}
                               onChange={(e) => setProductName(e.target.value)}/>
                      </div>
                    }
                    {/* service/product name end */}

                    {/* service/product desc end */}
                    {
                      props.optional?.details.service_desc && <div className={`mt-12`}>
                            <Input.TextArea
                                styles={{textarea: {width: pxToVw(252), height: pxToVw(63)}}}
                          placeholder={t('Service/Product Description')}
                          value={productDesc} onChange={(e) => setProdDesc(e.target.value)}
                        />
                      </div>
                    }
                    {/* service/product desc end */}
                  </div>
              </div>
          }
          {/* Details end */}

           {/* Detail text start */}
           {
            props.optional?.details?.text && <div className={`mt-12`}>
                <Input.TextArea styles={{textarea: {width: pxToVw(252), height: pxToVw(120)}}}
                                placeholder={t('Type Here')} value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
          }
          {/* Detail text end */}

          {/* Style start */}
          {
            props.optional?.style && <div className={`mt-24`}>
                  <div className={`flex items-center`}>
                      <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                      <div className='hidden'>
                      {countingNames.pop()}
                      </div>
                    <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Style')}</span>
                      <Icon name={'require'}
                            style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/>
                  </div>
                  <div className={`mt-12`}>
                    {/* tone start */}
                    {
                      props.optional?.style.tones && <div>
                            <Select placeholder={t('Tones')}
                                    style={{width: pxToVw(252), height: pxToVw(36)}} options={tones}
                                    value={tone} onSelect={(value) => setTone(value)}/>
                        </div>
                    }
                    {/* tone end */}

                    {/* voice start */}
                    {
                      props.optional?.style.voice && <div className={`mt-12`}>
                            <Select
                                placeholder={props.title === 'Match Brand Voice' ?  t('Brand Voice') : t('Brand Voice (Optional)')}
                                style={{width: pxToVw(252), height: pxToVw(36)}}
                                options={brandVoices}
                                value={brandVoice} onSelect={(value) => setBrandVoice(value)}
                                dropdownRender={(menu) => (
                                  <>
                                    <div>
                                      <Button type={'text'} style={{ width: '100%', height: 32 }} onClick={openBrandVoice}>
                                        <div className={`flex items-center justify-between`}>
                                          <span style={{fontSize: pxToVw(10)}}>{t('Create New')}</span>
                                          <div>
                                            <Icon name={'add'}
                                                  style={{'width': pxToVw(8), 'height': pxToVw(8)}}/>
                                          </div>
                                        </div>
                                      </Button>
                                    </div>
                                    <Divider style={{marginTop: pxToVw(12), marginBottom: pxToVw(12)}}/>
                                    {menu}
                                  </>
                                )}
                                optionRender={(option) => {
                                  return <>
                                    <div className={`w-full h-full flex items-center justify-between`}>
                                      <span>{option.label}</span>
                                      <div onClick={() => handleDelete(Number(option.value))}>
                                        <Icon name={'trash'}
                                              style={{'width': pxToVw(8), 'height': pxToVw(8)}}/>
                                      </div>
                                    </div>
                                  </>;
                                }}
                            />
                        </div>
                    }
                    {/* voice end */}

                    {/* type start */}
                    {
                      props.optional.style.type && <div className={`mt-12`}>
                            <Select placeholder={t('Type')}
                                    style={{width: pxToVw(252), height: pxToVw(36)}} options={types}
                                    value={type} onSelect={(value) => setType(value)}/>
                        </div>
                    }
                    {/* type end */}

                    {/* keyword start */}
                    {
                      props.optional.style.keyword && <div className={`mt-12`}>
                            <Input placeholder={t('Keyword (Optional)')}
                                    style={{width: pxToVw(252), height: pxToVw(36)}}
                                    value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                        </div>
                    }
                    {/* keyword end */}
                  </div>
              </div>
          }
          {/* Style end */}

          {/* Audience start */}
          {
            props.optional?.audience && <div className={`mt-24`}>
                  <div className={`flex items-center`}>
                      <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                      <div className='hidden'>
                      {countingNames.pop()}
                      </div>
                <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Audience')}</span>
              </div>
              <div className={`mt-12`}>
                {/* region start */}
                {
                  props.optional.audience.region && <div>
                        <Select placeholder={t('Region (Optional)')} style={{width: pxToVw(252), height: pxToVw(36)}}
                              options={countries} value={country} onSelect={(value) => setCountry(value)}/>
                  </div>
                }
                {/* region end */}

                {/* gender start */}
                {
                  props.optional.audience.region && <div className={`mt-12`}>
                    <Select placeholder={t('Gender (Optional)')} style={{width: pxToVw(252), height: pxToVw(36)}}
                            options={genders} value={gender} onSelect={(value) => setGender(value)}/>
                  </div>
                }
                {/* gender end */}

                {/* age start */}
                {
                  props.optional.audience.age && <div className={`flex items-center justify-between mt-12`}>
                    <InputNumber
                        className='w-120 text-10 items-center'
                        style={{paddingTop: 3, paddingBottom: 3}}
                        min={12} // Minimum age
                        max={100} // Maximum age
                        placeholder={t('Min Age (Optional)')}
                        controls={true}
                        value={minAge}
                        onChange={(value) => setMinAge(value || 0)}
                    />
                    <InputNumber
                        className='w-120 text-10 items-center'
                        style={{paddingTop: 3, paddingBottom: 3}}
                        min={12} // Minimum age
                        max={100} // Maximum age
                        placeholder={t('Max Age (Optional)')}
                        controls={true}
                        value={maxAge}
                        onChange={(value) => setMaxAge(value || 0)}
                    />
                  </div>
                }
                {/* age end */}
              </div>
              </div>
          }
          {/* Audience end */}
          
          {/* Other Details start */}
          {
            props.optional?.other_detail && <div className={`mt-24`}>
                  <div className={`flex items-center`}>
                      <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                      <div className='hidden'>
                      {countingNames.pop()}
                      </div>
                      <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Other Details')}</span>
                      {/* <Icon name={'require'}
                            style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/> */}
                  </div>
                  <div className={`mt-12`}>
                      <Input.TextArea styles={{textarea: {width: pxToVw(252), height: pxToVw(80)}}}
                                      placeholder={t('Type Here (Optional)')} value={details}
                                      onChange={(e) => setDetails(e.target.value)}/>
                  </div>
              </div>
          }
          {/* Other Details end */}

          {/* Language start */}
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={`${countingNames[countingNames.length - 1]}`} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
              <div className='hidden'>
                      {countingNames.pop()}
                      </div>
              <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Language')}</span>
              <Icon name={'require'}
                    style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/>
            </div>
            <div className={`mt-12`}>
              <Select placeholder={t('Select the language')} style={{width: pxToVw(252), height: pxToVw(36)}}
                      options={languages} value={language} onSelect={(value) => setLanguage(value)}/>
            </div>
          </div>
          {/* Language end */}

          <div className={`mt-24`}>
            <Button
              type="default"
              loading={loading}
              disabled={canGenerate}
              onClick={generateText}
              className={`w-251 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
            >
              <div style={{fontFamily: "PingFang SC Regular"}}>{t('Generate')}</div>
            </Button>
          </div>

        </div>

        {generatedText.length == 0 ?
          <div>
            <div style={{
              'width': pxToVw(682),
              'height': pxToVw(750),
              display: "flex",
              flexDirection: "column",
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name={'generate'} style={{'width': pxToVw(62), 'height': pxToVw(40)}}/>
              <p className="text-18 text-[#C4C4C4] mt-14"
                 style={{fontFamily: "PingFang SC Light"}}>{t("Let's Get Started!")}</p>
              <p className="text-12 text-[#C4C4C4] font-light mt-10"
                 style={{fontFamily: "PingFang SC Light"}}>{t("Choose the service to generate content")}</p>
            </div>
          </div>
          :
          <div>
            <div className={`items-start justify-between rounded-10 mt-14 p-14`} style={{
              backgroundColor: "#F6F7F8",
              'width': pxToVw(682),
              'height': pxToVw(750),
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div className="scrollable-content" style={{flex: 1, maxHeight: "100%", overflowY: "auto"}}>
                <div className={'pl-4 text-14 leading-28'} dangerouslySetInnerHTML={{ __html: generatedText }}></div>
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

        <div className={`w-289 p-24 h-680 overflow-y-auto`}>
          <div className={`text-12`} style={{ fontFamily: "PingFang SC Bold" }} >{ t('History') }</div>
          <div className={`mt-24 scrollable-content`}>
            {
              history.map(item => {
                return <div key={item.time} className={`mb-30`}>
                  <div className={`text-10 text-[#787878]`} style={{ fontFamily: "PingFang SC Light" }}>{ item.time }</div>
                  <div className={`cursor-pointer`}>
                    {
                      item.children.map(it => {
                        return <div key={it.created_at} className={`flex items-center mt-18 cursor-pointer`} onClick={() => { getHistoryById(it.id).then() }}>
                          <Icon name={'history'} style={{ 'width': pxToVw(12), 'height': pxToVw(14) }} />
                          <div className={`text-12 text-black ml-8 truncate`} style={{ fontFamily: "PingFang SC Medium" }}>{ it.text }</div>
                        </div>
                      })
                    }
                  </div>
                </div>
              })
            }
          </div>
        </div>

        <CreateBrandVoice open={open} confirm={confirmBrandVoice} cancel={cancelBrandVoice} />
        <DeleteVoice onConfirm={onConfirm} onCancel={onCancel} showDeleteModal={showDeleteModal} />
      </div>
    </div>
  </>
}

export default Content