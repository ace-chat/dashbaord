import { useState, useRef, useEffect } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import {Button, Input, message, Select} from 'antd'
import { pxToVw } from '@/utils'
import { getAllService, upload, getDeepAnalyticsHistory, getDeepAnalyticsById, generatorDeepAnalytics } from "@/request";
import {AnalyticsHistory, AnalyticsHistoryChildren, Option} from "@/types";
import moment from "moment-timezone";
import Plot from "react-plotly.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Deep = () => {
  const { t } = useTranslation()
  const [contentStatus, setContentStatus] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);

  const [generatedResult, setGeneratedResult] = useState<any>();

  const [options, setOptions] = useState<Array<Option>>([]);
  const [mainChartsData, setMainChartsData] = useState<any[]>([]);
  const [mainChartsLayout, setMainChartsLayout] = useState<any>({});
  const [negativeChartsData, setNegativeChartsData] = useState<any[]>([]);
  const [negativeChartsLayout, setNegativeChartsLayout] = useState<any>({});
  const [positiveChartsData, setPositiveChartsData] = useState<any[]>([]);
  const [positiveChartsLayout, setPositiveChartsLayout] = useState<any>({});

  const [history, setHistory] = useState<Array<AnalyticsHistory>>([]);

  const [services, setServices] = useState<Array<Option>>([]);

  const [business, setBusiness]:any = useState();
  const [product, setProduct]:any = useState();
  const [description, setDescription]:any = useState();
  const [service, setService]:any = useState();
  const fileInput: any = useRef();
  const [selectedFile, setSelectedFile] = useState<File | null>();

  const handleFileInputChange = (e: any) => {
    const chosenFile = e.target.files[0];
    if (chosenFile) {
      setSelectedFile(chosenFile);
    }
  };

  const validate = () => {
    return !(business && product && description && service && selectedFile);
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
    setContentStatus(false);
    const d = {
      business_description: business,
      product_description: product,
      data_description: description,
      service_id: service,
      filename: file_name,
    }
    const res = await generatorDeepAnalytics(d);
    setGeneratedResult(JSON.parse(res.content));
    await getHistory();
    setLoading(false);
    setContentStatus(true);
  }

  const getServices = async () => {
    const res = await getAllService();
    let s: Option[] = [];
    res.forEach((item: any) => {
      s.push({
        label: item.name,
        value: item.id,
      })
    })

    setServices(s);
  }

  const getHistory = async () => {
    const res: Array<AnalyticsHistoryChildren> = await getDeepAnalyticsHistory();

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

  useEffect(() => {
    Promise.all([
      getServices(),
      getHistory(),
    ]).then();
  }, []);

  const handleHistory = (it: AnalyticsHistoryChildren) => {
    setBusiness(it.business_desc);
    setProduct(it.product_desc);
    setDescription(it.data_desc);
    setService(it.service_id);
    handleHistoryById(it.id);
  }

  const handleHistoryById = async (id: number) => {
    setContentStatus(false);
    setLoading(true);
    const res = await getDeepAnalyticsById(id)
    setGeneratedResult(JSON.parse(res.content));
    dealWithData(JSON.parse(res.content));
    setLoading(false);
    setContentStatus(true);
  }

  const dealWithData = (data: any, i = 0) => {
    let options: Option[] = [];
    data.negative_scatter.forEach((item: any, index: number) => {
      options.push({
        label: item.layout.title.text,
        value: index,
      });
    });
    setOptions(options);

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

  const generatorPDF = () => {
    // @ts-ignore
    let w = document.getElementById("PDF").offsetWidth;
    // @ts-ignore
    let h = document.getElementById("PDF").offsetHeight;
    // @ts-ignore
    html2canvas(document.getElementById("PDF"), {
      dpi: 300, // Set to 300 DPI
      scale: 3, // Adjusts your resolution
      onrendered: function(canvas: any) {
        var img = canvas.toDataURL("image/jpeg", 1);
        var doc = new jsPDF('l', 'px', [w, h]);
        doc.addImage(img, 'JPEG', 0, 0, w, h);
        doc.save('sample-file.pdf');
      }
    });
  }

  const handleChange = (value: number) => {
    dealWithData(generatedResult, value);
  }

  useEffect(() => {
    if(contentStatus){
      generatorPDF();
    }
  }, [contentStatus])

  return <>
    <div className={`flex flex-col`}>
      <div className='flex flex-row mt-14' style={{ marginLeft: pxToVw(29) }}>
        <div className={`text-black`} style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(18)}}>{ t("Deep Analytics Tool") }</div>
      </div>
      <div className={`text-[#545B65] mt-4`} style={{ marginLeft: pxToVw(29), fontFamily: "PingFang SC Light", fontSize: pxToVw(14) }}>{ t("Get your data all set with our deep analytics.tsx tool. Just a click away.") }</div>
    </div>
    <div className={`bg-white rounded-8 mt-14`} style={{ width: pxToVw(1389), marginLeft: pxToVw(29), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
      <div className={`flex justify-around`}>
        <div className={`w-300 p-24`} style={{ fontFamily: "PingFang SC Regular" }}>

            <div>
                <div className={`flex items-center`}>
                    <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Busniess Description') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                    <Input.TextArea styles={{ textarea: { width: pxToVw(335), height: pxToVw(72), fontSize: pxToVw(10) } }} placeholder={t('Type Here')} 
                    value={business} onChange={(e) => setBusiness(e.target.value)}
                    />
                </div>
            </div>

            <div className={`mt-24`}>
                <div className={`flex items-center`}>
                    <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Product Description') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                    <Input.TextArea styles={{ textarea: { width: pxToVw(335), height: pxToVw(72), fontSize: pxToVw(10) } }} placeholder={t('Type Here')} 
                    value={product} onChange={(e) => setProduct(e.target.value)}
                    />
                </div>
            </div>

            <div className={`mt-24`}>
                <div className={`flex items-center`}>
                    <Icon name={'third'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Data Description') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                    <Input.TextArea styles={{ textarea: { width: pxToVw(335), height: pxToVw(72), fontSize: pxToVw(10) } }} placeholder={t('Type Here')} 
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className={`mt-24`}>
                <div className={`flex items-center`}>
                    <Icon name={'fourth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Select Services') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                    <Select style={{ width: pxToVw(252), height: pxToVw(36) }} options={services} placeholder={t("Services")} value={service} onSelect={(value) => setService(value)} />
                </div>
            </div>

            <div className={`mt-24`}>
                <div className={`flex items-center`}>
                    <Icon name={'fifth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                    <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Browse') }</span>
                    <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
                </div>
                <div className={`mt-12`}>
                  <div className='flex rounded-8 mt-16 justify-center items-center'
                       style={{
                         "backgroundColor": "#F4F6FA",
                         "display": "flex",
                         "width": pxToVw(252),
                         "height": pxToVw(144),
                         border: "1px dashed #8B8B8B",
                         flexDirection: "column"
                       }}
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
              loading={loading}
              disabled={validate()}
              onClick={generate}
              className={`w-251 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
            >
              <div style={{fontFamily: "PingFang SC Regular"}}>{t('Generate')}</div>
            </Button>
          </div>

        </div>

        {!generatedResult ?
          <div>
            <div style={{
              'width': pxToVw(682),
              'height': pxToVw(750),
              display: "flex",
              flexDirection: "column",
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon name={'generate'} style={{'width': pxToVw(62), 'height': pxToVw(40)}}/>
              <p className="text-18 text-[#C4C4C4] mt-14" style={{fontFamily: "PingFang SC Light" }}>{t("Let's Get Started!")}</p>
              <p className="text-12 text-[#C4C4C4] font-light mt-10" style={{ fontFamily: "PingFang SC Light", textAlign: "center", width: pxToVw(573) }}>{t("Upload your sales or user data (preferably a .csv file) of your business and fill in other sections and we will generate a comprehensive report for you that contains appropriate charts, interpretations, and potential business actions.")}</p>
            </div>
          </div>
        :
        loading ? <>
          <div className={`h-809 flex items-center justify-center`}>
            <div className={`flex flex-col items-center`}>
              <div className={``}>
                <Icon name={"logo"} style={{"width": pxToVw(119), "height": pxToVw(119)}}/>
              </div>
              <div></div>
              <div className={`text-[#7B7B7B] text-21 text-center mb-10`}>{t("Simple Analysis In Progress")}</div>
              <div
                className={`text-14 text-[#C4C4C4] w-432 text-center leading-16`}>{t("Thank you for your patience. Our AI-bot is preparing a simple analytics report for you based on the data you provided.")}</div>
              <div
                className={`text-14 text-[#C4C4C4] w-432 text-center leading-16`}>{t("Please wait for a few minutes. Do not refresh the page.")}</div>
            </div>
          </div>
        </> : <>
          <div>
            <div style={{
              'width': pxToVw(682),
              'height': pxToVw(750),
              display: "flex",
              flexDirection: "column",
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon name={'pdf'} style={{'width': pxToVw(62), 'height': pxToVw(40)}}/>
              <div className='flex flex-row mt-14'
                   style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <p className="text-18 text-[#C4C4C4]"
                   style={{fontFamily: "PingFang SC Light"}}>{t("Your file is ready")}</p>
                <div style={{marginLeft: pxToVw(5)}}>
                  <Icon name={"checkmark"} style={{width: pxToVw(15), height: pxToVw(15), marginTop: pxToVw(2)}}/>
                </div>
              </div>
              <p className="text-12 text-[#C4C4C4] font-light mt-10" style={{
                fontFamily: "PingFang SC Light",
                textAlign: "center",
                width: pxToVw(573)
              }}>{t("Thank you for your patience. Our experts have prepared a deep analysis of your data based on the service you chose. Please download the report by clicking on the button below.")}</p>
              <div className={`mt-20`}>
                <Button
                  type="default"
                  loading={loading}
                  onClick={() => {

                  }}
                  className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 text-14 cursor-pointer select-none`}
                >
                  <div className='download-text' style={{fontFamily: "PingFang SC Regular"}}>{t('Download')}</div>
                </Button>
              </div>
            </div>
          </div>
        </>
        }


        <div className={`w-289 p-24 h-821`}>
          <div className={`text-12`} style={{fontFamily: "PingFang SC Bold"}}>{t('History')}</div>
          <div className={`mt-24 scrollable-content`}>
            {
              history.map(item => {
                return <div key={item.time} className={`mb-30`}>
                  <div className={`text-10 text-[#787878]`} style={{fontFamily: "PingFang SC Light"}}>{item.time}</div>
                  <div className={`cursor-pointer`}>
                    {
                      item.children.map(it => {
                        return <div key={it.id} className={`flex items-center mt-18`} onClick={() => {
                          handleHistory(it)
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
      </div>
    </div>

    {
      contentStatus && <div className={"fixed top-5000 left-0"} id={`PDF`}>
            <div className={`py-44`}>
                <div className={`px-69`}>
                    <Select defaultValue={options[0].value} options={options} onChange={handleChange}></Select>
                </div>
                <div className={`pl-30`}>
                    <div>
                        <Plot data={mainChartsData} layout={mainChartsLayout}/>
                    </div>
                    <div>
                        <Plot data={positiveChartsData} layout={positiveChartsLayout}/>
                    </div>
                    <div>
                        <Plot data={negativeChartsData} layout={negativeChartsLayout}/>
                    </div>
                </div>
                <div className={`px-69 text-14`}>
                    <div className={`mt-20 leading-28`}
                         dangerouslySetInnerHTML={{__html: generatedResult?.positive_report}}></div>
                    <div className={`mt-20 leading-28`}
                         dangerouslySetInnerHTML={{__html: generatedResult?.negative_report}}></div>
                </div>
            </div>
        </div>
    }
  </>
}

export default Deep