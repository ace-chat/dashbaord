import { useState } from 'react'
import Icon from '@/components/Icon/Icon.tsx'
import { useTranslation } from 'react-i18next'
import { Select, Input } from 'antd'
import { pxToVw } from '@/utils'

type Prop = {
  title: string;
  subTitle: string;
}

const Content = (props: Prop) => {
  const { t } = useTranslation()

  const [platform] = useState([
    { value: 'instagram', label: t('Instagram') },
    { value: 'telegram', label: t('Telegram') },
    { value: 'whatsapp', label: t('Whatsapp') },
    { value: 'tiktok', label: t('Tiktok') }
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

  return <>
    <div>
      <div className={`flex items-center flex-col`}>
        <div className={`text-24 text-black`}>{ props.title }</div>
        <div className={`text-14 text-[#545B65] mt-12`}>{ props.subTitle }</div>
      </div>
      <div className={`mt-34 flex justify-between bg-white rounded-8`} style={{ boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)' }}>
        <div className={`w-300 p-24`} style={{ borderRight: '1px solid #F3F3F3' }}>
          <div>
            <div className={`flex items-center`}>
              <Icon name={'first'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-14`}>{ t('Platform') }</span>
            </div>
            <div className={`mt-12`}>
              <Select mode="multiple" style={{ width: pxToVw(252), height: pxToVw(36) }} options={platform} />
            </div>
          </div>
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'second'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-14`}>{ t('Details') }</span>
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
              <span className={`ml-8 text-14`}>{ t('Style') }</span>
            </div>
            <div className={`mt-12`}>
              <div>
                <Select placeholder={t('Tones')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={platform} />
              </div>
              <div className={`mt-12`}>
                <Select placeholder={t('Brand Voice (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36), fontSize: pxToVw(10) }} options={platform} />
              </div>
            </div>
          </div>
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'fourth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-14`}>{ t('Audience') }</span>
            </div>
            <div className={`mt-12`}>
              <div>
                <Select placeholder={t('Region (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={platform} />
              </div>
              <div className={`my-12`}>
                <Select placeholder={t('Gender (Optional)')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={platform} />
              </div>
              <div className={`flex items-center justify-between`}>
                <Select placeholder={t('Min Age (Optional)')} style={{ width: pxToVw(120), height: pxToVw(36) }} options={platform} />
                <Select placeholder={t('Max Age (Optional)')} style={{ width: pxToVw(120), height: pxToVw(36) }} options={platform} />
              </div>
            </div>
          </div>
          <div className={`mt-24`}>
            <div className={`flex items-center`}>
              <Icon name={'fifth'} style={{ 'width': pxToVw(22), 'height': pxToVw(22) }} />
              <span className={`ml-8 text-14`}>{ t('Language ') }</span>
            </div>
            <div className={`mt-12`}>
              <Select placeholder={t('Select the language')} style={{ width: pxToVw(252), height: pxToVw(36) }} options={platform} />
            </div>
          </div>
          <div className={`mt-24`}>
            <div className={`w-251 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 text-14 text-[#555555] cursor-pointer select-none`}>{ t('Generate') }</div>
          </div>
        </div>
        <div className={`flex-1 pl-40 pr-76 pt-55 pb-24`}>
          <div className={`w-full h-full flex items-start justify-between`}>
            <div className={`flex items-center select-none`}>
              <Icon name={'left'} style={{ 'width': pxToVw(3), 'height': pxToVw(6), 'cursor': 'pointer' }} />
              <span className={`mx-9 text-10 text-[#9C9C9C]`}>2/2</span>
              <Icon name={'right'} style={{ 'width': pxToVw(3), 'height': pxToVw(6), 'cursor': 'pointer' }} />
            </div>
            <div className={`w-606`}>
              <div className={`w-full h-682 overflow-y-auto shadow-white shadow-inner`}>
                <p className={`leading-normal text-14`}>Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpismolsa estie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.</p>
                <p className={`indent-30 mt-30 leading-normal text-14`}>Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.</p>
                <p className={`indent-30 mt-30 leading-normal text-14`}>Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales m ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, vestibulum </p>
                <p className={`indent-30 mt-30 leading-normal text-14`}>Nam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet. Vestibulum dictum ultrices elit a luctus. Sed in ante ut leo congue posuere at sit amet ligula. Pellentesque eget augue nec nisl sodales m ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, vestibulum </p>
              </div>
              <div className={`w-full mt-24 flex items-center justify-between`}>
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
                <div>
                  <div className={`w-147 h-36 flex items-center justify-center bg-[#E9E9E9] rounded-8 cursor-pointer select-none`}>
                    <Icon name={'reset'} style={{ 'width': pxToVw(12), 'height': pxToVw(12) }} />
                    <span className={`text-14 text-[#555555] ml-10`}>Regenerate</span>
                  </div>
                </div>
                <div className={`w-78`}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-289 p-24 h-821`} style={{ borderLeft: '1px solid #F3F3F3' }}>
          <div className={`text-14`}>{ t('History') }</div>
          <div className={`mt-24 overflow-y-auto`}>
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