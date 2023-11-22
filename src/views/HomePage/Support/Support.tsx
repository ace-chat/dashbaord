import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import { useState } from 'react';

const Support = () => {
  const { t } = useTranslation();

  const Card = ({height, title, subtitle, image, left, right}: any) => {
    var div_style: any = {
      "flexDirection": "column", 
      "width": pxToVw(338), 
      "height": height, 
      background: `linear-gradient(180deg, rgba(9, 15, 51, 0.00) 0%, #01061F 100%), url('../../../src/assets/${image}.svg') lightgray 50% / cover no-repeat`
    };

    left ? div_style["marginleft"] = pxToVw(20) : right? div_style["marginRight"] = pxToVw(20) : null;

    return(
      <div className={`flex rounded-12 items-start justify-end`} style={div_style}>
        <div style={{ color: "white", fontSize: pxToVw(15), marginLeft: pxToVw(20)}}>{ t("Explore") }</div>
        <div className='text-bold' style={{ color: "white", fontSize: pxToVw(22), marginLeft: pxToVw(20), marginBottom: pxToVw(8) }}>{ t(title) }</div>
        <div style={{ color: "white", fontSize: pxToVw(12), marginLeft: pxToVw(20), marginRight: pxToVw(20), marginBottom: pxToVw(30) }}>{ t(subtitle) }</div>
      </div>
    )
  };

  const [cards] = useState([
    {
      id: 'search_engine',
      title: t('Search Engine Ads'),
      content: t(`Uncover our AI content generation tool's power, optimize text and keywords, boost search ad performance.`),
      height: pxToVw(351),
      right: true,
      left: false,
      image: "support_se"
    },
    {
      id: 'deep_analytics',
      title: t('Deep Analytics'),
      content: t(`Uncover our AI content generation tool's power, optimize text and keywords, boost search ad performance.`),
      height: pxToVw(300),
      right: false,
      left: false,
      image: "support_da"
    },
    {
      id: 'chatbot',
      title: t('Chatnot'),
      content: t(`Learn to create a knowledge base and we’ll do the rest for customer engagement on popular messaging platforms.`),
      height: pxToVw(351),
      right: false,
      left: true,
      image: "support_cb"
    },
    {
      id: 'email_ads',
      title: t('Email Ads'),
      content: t(`Master our AI content generation tool to create creative, personalized, and effective email ads.`),
      height: pxToVw(387),
      right: true,
      left: false,
      image: "support_ea"
    },
    {
      id: 'simple_analytics',
      title: t('Simple Analytics'),
      content: t(`Learn to use our AI content generation tool for captivating social media posts and captions.`),
      height: pxToVw(387),
      right: false,
      left: false,
      image: "support_sa"
    },
    {
      id: 'socail_media',
      title: t('Social Media Ads'),
      content: t(`Learn to use our AI content generation tool for captivating social media posts and captions.`),
      height: pxToVw(387),
      right: false,
      left: true,
      image: "support_sm"
    },
  ]);

  return <>
   <div className={`bg-white items-center rounded-8 mt-40`} style={{"width": pxToVw(1250), "height": pxToVw(1090), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
      <div className={`flex flex-col`}>
        <div className={`mt-30`} style={{ alignSelf: "flex-start", marginLeft: pxToVw(36), color: "#002138", fontSize: pxToVw(20) }}>{ t("Tutorials") }</div>
        <div className={`mt-30`} style={{ alignSelf: "center", color: "#002138", fontSize: pxToVw(18) }}>{ t("Explore ACE AI") }</div>
        <div className={`custom-div`} style={{ alignSelf: "center", fontSize: pxToVw(25) }}>{ t("Just in 5 minutes") }</div>
        <div className={`mt-5`} style={{ "width": pxToVw(651), alignSelf: "center", textAlign: "center", color: "#404040", fontSize: pxToVw(12) }}>{ t("Your hub for mastering every facet of our website's diverse components. From harnessing AI analytics to crafting compelling content and setting up AI-powered chatbots, our tutorials empower you to unleash the full potential of our services.") }</div>
      </div>
      
      <div className={`flex flex-row items-start justify-center`} style={{ marginTop: pxToVw(40) }}>
        {cards.slice(0, 3).map(card => {
            var div_style: any = {
              "flexDirection": "column", 
              "width": pxToVw(338), 
              "height": card.height, 
              "background": `linear-gradient(180deg, rgba(9, 15, 51, 0.00) 0%, #01061F 100%), url('../../../src/assets/${card.image}.svg') lightgray 50% / cover no-repeat`,
            };

            if(card.left){
              div_style["marginLeft"] = pxToVw(20);
            }
            if(card.right){
              div_style["marginRight"] = pxToVw(20);
            }

            return (
              <div key={card.id} className={`flex rounded-12 items-start justify-end`} style={div_style}>
                <div style={{ color: "white", fontSize: pxToVw(15), marginLeft: pxToVw(20)}}>{ t("Explore") }</div>
                <div className='text-bold' style={{ color: "white", fontSize: pxToVw(22), marginLeft: pxToVw(20), marginBottom: pxToVw(8) }}>{ t(card.title) }</div>
                <div style={{ color: "white", fontSize: pxToVw(12), marginLeft: pxToVw(20), marginRight: pxToVw(20), marginBottom: pxToVw(30) }}>{ t(card.content) }</div>
              </div>
            )
          })
        }
      </div>

      <div className={`flex flex-row justify-center`} style={{ marginTop: pxToVw(30) }}>
        {cards.slice(3, 6).map(card => {
              var div_style: any = {
                "flexDirection": "column", 
                "width": pxToVw(338), 
                "height": card.height, 
                "background": `linear-gradient(180deg, rgba(9, 15, 51, 0.00) 0%, #01061F 100%), url('../../../src/assets/${card.image}.svg') lightgray 50% / cover no-repeat`,
              };

              if(card.left){
                div_style["marginLeft"] = pxToVw(20);
              }
              if(card.right){
                div_style["marginRight"] = pxToVw(20);
              }

              if(!card.left && !card.right){
                div_style["position"] = 'relative';
                div_style["top"] = `-${pxToVw(50)}`;
              }

              return (
                <div key={card.id} className={`flex rounded-12 items-start justify-end`} style={div_style}>
                  <div style={{ color: "white", fontSize: pxToVw(15), marginLeft: pxToVw(20)}}>{ t("Explore") }</div>
                  <div className='text-bold' style={{ color: "white", fontSize: pxToVw(22), marginLeft: pxToVw(20), marginBottom: pxToVw(8) }}>{ t(card.title) }</div>
                  <div style={{ color: "white", fontSize: pxToVw(12), marginLeft: pxToVw(20), marginRight: pxToVw(20), marginBottom: pxToVw(30) }}>{ t(card.content) }</div>
                </div>
              )
            })
          }
        </div>

        <div className={`flex items-center justify-center flex-row mt-20`}>
          <div style={{ alignSelf: "center", color: "#5249D6", fontSize: pxToVw(15) }}>{ t("More") }</div>
          <Icon name='more_ellipse' style={{ "width": pxToVw(18), "height": pxToVw(18), marginLeft: pxToVw(6) }} />
        </div>

    </div>
  </>
}

export default Support
