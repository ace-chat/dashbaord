import { useState, useRef, useEffect } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { Button, message, Select } from 'antd'
import { pxToVw } from '@/utils'
import { upload, generatorAnalytics, getAnalyticsHistory, getAnalyticsById } from '@/request'

import { AnalyticsHistory, AnalyticsHistoryChildren, Option } from "@/types"
import moment from "moment-timezone";

import Plot from 'react-plotly.js';

const Simple = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false);

  const [generatedContent, setGeneratedContent] = useState<any>();
  const [options, setOptions] = useState<Array<Option>>([]);
  const [positiveOptions, setPositiveOptions] = useState<Array<Option>>([]);
  const [negativeOptions, setNegativeOptions] = useState<Array<Option>>([]);
  const [mainChartsData, setMainChartsData] = useState<any[]>([]);
  const [mainChartsLayout, setMainChartsLayout] = useState<any>({});
  const [negativeChartsData, setNegativeChartsData] = useState<any[]>([]);
  const [negativeChartsLayout, setNegativeChartsLayout] = useState<any>({});
  const [positiveChartsData, setPositiveChartsData] = useState<any[]>([]);
  const [positiveChartsLayout, setPositiveChartsLayout] = useState<any>({});

  const [history, setHistory] = useState<Array<AnalyticsHistory>>([]);

  const fileInput: any = useRef();
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [contentStatus, setContentStatus] = useState<boolean>(false);

  const handleFileInputChange = (e: any) => {
    const chosenFile = e.target.files[0];
    if (chosenFile) {
      setSelectedFile(chosenFile);
    }
  };

  const generate = async() => {
    const formData = new FormData();
    formData.append('file', selectedFile as any);

    try {
      setLoading(true);
      const res = await upload(formData);
      await getReport(res);
    } catch (error: any) {
      setLoading(false);
      message.error(error.message)
    }
  };

  const getReport = async (file_name: any) => {
    try {
      const res = await generatorAnalytics(file_name);

      setLoading(false);
      setContentStatus(true);
      dealWithDataCharts(JSON.parse(res.content));
      setGeneratedContent(JSON.parse(res.content));
    } catch (error: any) {
      setLoading(false);
      message.error(error.message)
    }
  };

  const getHistory = async () => {
    let res: Array<AnalyticsHistoryChildren> = await getAnalyticsHistory();

    let arr: Map<string, Array<AnalyticsHistoryChildren>> = new Map();
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

    let a: Array<AnalyticsHistory> = [];
    arr.forEach((value, key) => {
      a.push({
        time: key,
        children: value,
      })
    })

    setHistory(a.reverse());
  }

  const getHistoryContent = async (id: number) => {
    setLoading(true);
    let res = await getAnalyticsById(id);
    setGeneratedContent(JSON.parse(res.content));
    dealWithDataCharts(JSON.parse(res.content));
    console.log(JSON.parse(res.content));
    setLoading(false);
    setContentStatus(true);
  }

  // ToDo: avoid repitition in functions
  const handleChangeCharts = (value: number) => {
    dealWithDataCharts(generatedContent, value);
  }
  const handleChangePositive = (value: number) => {
    dealWithDataPositive(generatedContent, value);
  }
  const handleChangeNegative = (value: number) => {
    dealWithDataNegative(generatedContent, value);
  }

  const dealWithDataCharts = (data: any, i = 0) => {
    let options: Option[] = [];
    let positiveOptions: Option[] = [];
    let negativeOptions: Option[] = [];

    data.charts.forEach((item: any, index: number) => {
      options.push({
        label: item.layout.title.text,
        value: index,
      });
    }
    );

    data.negative_scatter.forEach((item: any, index: number) => {
      negativeOptions.push({
        label: item.layout.title.text,
        value: index,
      });
    });

    data.positive_scatter.forEach((item: any, index: number) => {
      positiveOptions.push({
        label: item.layout.title.text,
        value: index,
      });
    });

    setOptions(options);
    setPositiveOptions(positiveOptions);
    setNegativeOptions(negativeOptions);


    let dataChartsData: any = undefined;
    let dataChartsLayout: any = undefined;
    data.charts.forEach((item: any, index: number) => {
      if(index === i) {
        dataChartsData = item.data;
        dataChartsLayout = item.layout;
      }
    });
    setMainChartsData(dataChartsData);
    setMainChartsLayout(dataChartsLayout);

    let positiveChartsData: any = undefined;
    let positiveChartsLayout: any = undefined;
    data.positive_scatter.forEach((item: any, index: number) => {
      if(index === i) {
        positiveChartsData = item.data;
        positiveChartsLayout = item.layout;
      }
    });
    setPositiveChartsData(positiveChartsData);
    setPositiveChartsLayout(positiveChartsLayout);

    let negativeChartsData: any = undefined;
    let negativeChartsLayout: any = undefined;
    data.negative_scatter.forEach((item: any, index: number) => {
      if(index === i) {
        negativeChartsData = item.data;
        negativeChartsLayout = item.layout;
      }
    });
    setNegativeChartsData(negativeChartsData);
    setNegativeChartsLayout(negativeChartsLayout);
  }
  
  // ToDo: avoid repitition in functions
  const dealWithDataPositive = (data: any, i = 0) => {
    let positiveOptions: Option[] = [];

    data.positive_scatter.forEach((item: any, index: number) => {
      positiveOptions.push({
        label: item.layout.title.text,
        value: index,
      });
    });

    setPositiveOptions(positiveOptions);

    let positiveChartsData: any = undefined;
    let positiveChartsLayout: any = undefined;
    data.positive_scatter.forEach((item: any, index: number) => {
      if(index === i) {
        positiveChartsData = item.data;
        positiveChartsLayout = item.layout;
      }
    });
    setPositiveChartsData(positiveChartsData);
    setPositiveChartsLayout(positiveChartsLayout);
  }

  const dealWithDataNegative = (data: any, i = 0) => {
    let negativeOptions: Option[] = [];

    data.negative_scatter.forEach((item: any, index: number) => {
      negativeOptions.push({
        label: item.layout.title.text,
        value: index,
      });
    });

    setNegativeOptions(negativeOptions);

    let negativeChartsData: any = undefined;
    let negativeChartsLayout: any = undefined;
    data.negative_scatter.forEach((item: any, index: number) => {
      if(index === i) {
        negativeChartsData = item.data;
        negativeChartsLayout = item.layout;
      }
    });
    setNegativeChartsData(negativeChartsData);
    setNegativeChartsLayout(negativeChartsLayout);
  }


  useEffect(() => {
    setContentStatus(false);
    Promise.all([
      getHistory(),
    ]).then()
  }, []);

  return <>
    <div className={`flex flex-col`}>
      <div className='flex flex-row mt-14' style={{ marginLeft: pxToVw(29) }}>
        <div className={`text-black text-18`} style={{ fontFamily: "PingFang SC Medium" }}>{ t("Simple Analytics Tool") }</div>
      </div>
      <div className={`text-[#545B65] mt-4 ml-29 text-14`} style={{ fontFamily: "PingFang SC Light" }}>{ t("Get your data all set with our simple analytics tool. Just a click away.") }</div>
    </div>
    {
      !loading ? <>
        <div className={`bg-white rounded-8 mt-14 w-1389 ml-29`}
             style={{boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
          {
            !contentStatus ? <div className={`flex justify-between items-start`}>
              <div className={`w-300 p-24`} style={{fontFamily: "PingFang SC Regular"}}>
                <div>
                  <div className={`flex items-center`}>
                    <Icon name={'first'} style={{'width': pxToVw(22), 'height': pxToVw(22)}}/>
                    <span className={`ml-8 text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('Browse')}</span>
                    <Icon name={'require'}
                          style={{'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px"}}/>
                  </div>
                  <div className={`mt-12`}>
                    <div
                      className='w-252 h-144 flex flex-col rounded-8 mt-16 justify-center items-center bg-[#F4F6FA] cursor-pointer'
                      style={{border: "1px dashed #8B8B8B"}}
                      onClick={() => fileInput.current.click()}>
                      {
                        selectedFile ? <>
                          <Icon name={'pdf'} style={{'width': pxToVw(30), 'height': pxToVw(30)}}/>
                          <span className={`text-12 text-[#555555] mt-12`}>{selectedFile.name}</span>
                        </> : <>
                          <input
                            type="file"
                            id="fileInput"
                            accept=".csv"
                            ref={fileInput}
                            onChange={handleFileInputChange}
                            style={{display: "none"}}
                          />
                          <Icon name={'upload'}
                                style={{'width': pxToVw(22), 'height': pxToVw(22), 'marginTop': pxToVw(5)}}/>
                          <div className={`mt-2`} style={{
                            color: "#000",
                            opacity: 0.6,
                            fontSize: pxToVw(10),
                            fontFamily: "PingFang SC Bold"
                          }}>{t("Upload a CSV file here")}</div>
                        </>
                      }
                    </div>
                  </div>
                </div>


                <div className={`mt-24`}>
                  <Button
                    type="default"
                    disabled={!selectedFile}
                    onClick={generate}
                    className={`w-251 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
                  >
                    <div style={{fontFamily: "PingFang SC Regular"}}>{t('Generate')}</div>
                  </Button>
                </div>
              </div>

              <div className={`h-821 overflow-y-auto`}>
                <div className={`w-682 h-750 flex flex-col items-center justify-center`}>
                  <Icon name={'generate'} style={{'width': pxToVw(62), 'height': pxToVw(40)}}/>
                  <p className="text-18 text-[#C4C4C4] mt-14"
                     style={{fontFamily: "PingFang SC Light"}}>{t("Let's Get Started!")}</p>
                  <p className="text-12 text-[#C4C4C4] font-light mt-10" style={{
                    fontFamily: "PingFang SC Light",
                    textAlign: "center",
                    width: pxToVw(573)
                  }}>{t("Upload your sales or user data (preferably a .csv file) of your business and generate aggregation charts, correlation analysis charts and interpretations.")}</p>
                </div>
              </div>

              <div className={`w-289 p-24 h-821 overflow-y-auto`}>
                <div className={`text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('History')}</div>
                <div className={`mt-24 scrollable-content`}>
                  {
                    history.map(item => {
                      return <div key={item.time} className={`mb-30`}>
                        <div className={`text-10 text-[#787878]`}
                             style={{fontFamily: "PingFang SC Light"}}>{item.time}</div>
                        <div className={`cursor-pointer`}>
                          {
                            item.children.map(it => {
                              return <div key={it.id} className={`flex items-center mt-18`} onClick={() => {
                                getHistoryContent(it.id).then()
                              }}>
                                <Icon name={'history'} style={{'width': pxToVw(12), 'height': pxToVw(14)}}/>
                                <span className={`text-12 text-black ml-8 truncate`}
                                      style={{fontFamily: "PingFang SC Medium"}}>{it.title}</span>
                              </div>
                            })
                          }
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div> : <div className={`py-44`}>
              <div className={`px-69`}>
                <Select defaultValue={options[0].value} options={options} onChange={handleChangeCharts}></Select>
              </div>
              <div className={`pl-30`}>
                <div>
                  <Plot data={mainChartsData} layout={mainChartsLayout}/>
                </div>

                <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                <div className={`px-69`}
                     dangerouslySetInnerHTML={{__html: generatedContent.positive_report}}> 
                  </div>
                  
                <div className={`px-69 pt-40`}>
                <Select defaultValue={positiveOptions[0].value} options={positiveOptions} onChange={handleChangePositive}></Select>
              </div>
                <div>
                  <Plot data={positiveChartsData} layout={positiveChartsLayout}/>
                </div>

                <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                <div className={`px-69`}
                     dangerouslySetInnerHTML={{__html: generatedContent.negative_report}}></div>
                    
                <div className={`px-69 pt-40`}>
                <Select defaultValue={negativeOptions[0].value} options={negativeOptions} onChange={handleChangeNegative}></Select>
              </div>
                <div>
                  <Plot data={negativeChartsData} layout={negativeChartsLayout}/>
                </div>
              </div>
            </div>
          }
        </div>
      </> : <>
        <div className={`w-1372 h-809 bg-white rounded-8 mt-28 flex items-center justify-center`}>
          <div className={`flex flex-col items-center`}>
            <div className={``}>
              <Icon name={"logo"} style={{ "width": pxToVw(119), "height": pxToVw(119) }} />
            </div>
            <div></div>
            <div className={`text-[#7B7B7B] text-21 text-center mb-10`}>{ t("Simple Analysis In Progress") }</div>
            <div className={`text-14 text-[#C4C4C4] w-432 text-center leading-16`}>{ t("Thank you for your patience. Our AI-bot is preparing a simple analytics report for you based on the data you provided.") }</div>
            <div className={`text-14 text-[#C4C4C4] w-432 text-center leading-16`}>{ t("Please wait for a few minutes. Do not refresh the page.") }</div>
          </div>
        </div>
      </>
    }
  </>
}

export default Simple