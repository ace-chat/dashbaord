import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { Button, message } from 'antd'
import { pxToVw } from '@/utils'
import React from 'react';
import Plot from 'react-plotly.js';

import axios from 'axios'
import { base_url } from '@/utils/constants';
import { RootState } from '@/store';

type Prop = {
  title: string;
  flow?: string;
  subTitle: string;
  tag: string;
}

const Simple = (props: Prop) => {
  const { t } = useTranslation()
  const { token } = useSelector((state: RootState) => state.token)
  const [loading, setLoading] = useState(false);

  const [generatedResult, setGeneratedResult] = useState();
  const [generatedContent, setGeneratedContent] = useState();

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

  const fileInput: any = useRef();
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e: any) => {
    const chosenFile = e.target.files[0];
    if (chosenFile) {
      setSelectedFile(chosenFile);
      console.log('Selected File:', chosenFile);
      const { name, size, type } = chosenFile;
      console.log('File Details:', { name, size, type });

      // Handle the file as needed (e.g., upload to server)
    }
  };

  const generate = async() => {
    const formData: any = new FormData();
    formData.append('file', selectedFile);

    try {
      setLoading(true);
      const fileResponse = await axios.post(`${base_url}/common/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if(fileResponse.data.code == 200){
        getReport(fileResponse.data.data);
      } 
      else{
        setLoading(false);
        message.error(JSON.stringify(fileResponse.data));
      }
    } catch (error: any) {
      setLoading(false);
      message.error(error.message)
    } 
  };

  const getReport = async (file_name: any) => {
    const formData: any = new FormData();
    formData.append('filename', file_name);

    try {
      const response = await axios.post(`${base_url}/analytics/simple/generator`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      if(response.data.code == 200){ 
        setLoading(false);
        setGeneratedResult(JSON.parse(response.data.data));
        setGeneratedContent(JSON.parse(response.data.data.content))
      }
      else{
        setLoading(false);
        message.error(JSON.stringify(response.data));
      } 
    } catch (error: any) {
      setLoading(false);
      message.error(error.message)
    }
  };

  return <>
    <div className={`flex flex-col`}>
      <div className='flex flex-row mt-14' style={{ marginLeft: pxToVw(29) }}>
        {props?.flow &&
          <div className={`text-[#545B65]`} style={{ fontFamily: "PingFang SC Regular", fontSize: pxToVw(18)}}>{t(props.flow)}&nbsp;&gt;&nbsp;</div>
        }
        <div className={`text-black`} style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(18)}}>{ t("Simple Analytics Tool") }</div>
      </div>
      <div className={`text-[#545B65] mt-4`} style={{ marginLeft: pxToVw(29), fontFamily: "PingFang SC Light", fontSize: pxToVw(14) }}>{ t("Get your data all set with our simple analytics tool. Just a click away.") }</div>
    </div>
    <div className={`bg-white rounded-8 mt-14`} style={{ width: pxToVw(1389), marginLeft: pxToVw(29), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
      {generatedResult ? 
        null
      :
      <div className={`flex justify-around`}>
        <div className={`w-300 p-24`} style={{ fontFamily: "PingFang SC Regular" }}>

          <div>
            <div className={`flex items-center`}>
                <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
                <span className={`ml-8 text-12`} style={{ fontFamily: "PingFang SC Bold" }}>{ t('Browse') }</span>
                <Icon name={'require'} style={{ 'width': pxToVw(8), 'height': pxToVw(8), marginLeft: "3px", marginBottom: "5px" }} />
            </div>
            <div className={`mt-12`}>
              <div className='flex rounded-8 mt-16 justify-center items-center' 
                style={{"backgroundColor": "#F4F6FA", "display": "flex", "width": pxToVw(252), "height": pxToVw(144), border: "1px dashed #8B8B8B", flexDirection: "column" }}
                onClick={() => fileInput.current.click()}>
                <input
                    type="file"
                    id="fileInput"
                    accept=".csv"
                    ref={fileInput}
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                />
                <Icon name={'upload'} style={{ 'width': pxToVw(22), 'height': pxToVw(22), 'marginTop': pxToVw(5) }} />
              <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Bold" }}>{ t("Upload a CSV file here") }</div>
            </div> 
            </div>
          </div>
            

          <div className={`mt-24`}>
            <Button
              type="default"
              loading={loading}
              disabled={selectedFile ? false : true}
              onClick={() => {
                generate()
              }}
              className={`w-251 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}
            >
              <div style={{ fontFamily: "PingFang SC Regular" }}>{t('Generate')}</div>
            </Button>
          </div>

        </div>

        <div>
          <div style={{ 'width': pxToVw(682), 'height': pxToVw(750), display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', }}>
            <Icon name={'generate'} style={{ 'width': pxToVw(62), 'height': pxToVw(40) }} />
            <p className="text-18 text-[#C4C4C4] mt-14" style={{ fontFamily: "PingFang SC Light" }}>{t("Let's Get Started!")}</p>
            <p className="text-12 text-[#C4C4C4] font-light mt-10" style={{ fontFamily: "PingFang SC Light", textAlign: "center", width: pxToVw(573) }}>{t("Upload your sales or user data (preferably a .csv file) of your business and generate aggregation charts, correlation analysis charts and interpretations.")}</p>
          </div>
        </div>

        <div className={`w-289 p-24 h-821`}>
          <div className={`text-12`} style={{ fontFamily: "PingFang SC Bold" }} >{ t('History') }</div>
          <div className={`mt-24 scrollable-content`}>
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
    }
    </div>
  </>
}

export default Simple