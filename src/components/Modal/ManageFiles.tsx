import { useMemo } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Upload } from 'antd'
import { pxToVw } from '@/utils'
import Icon from '@/components/Icon/Icon.tsx';

import { upload } from '@/request'

import type { RcFile } from "antd/es/upload/interface";
import type { File } from '@/types'

type Props = {
  files: Array<string>;
  onUpload: (file: File) => void;
  onRemove: (file: File) => void;
  onConfirm: () => void;
}

const ManageFiles: FC<Props> = (props) => {
  const {t} = useTranslation()

  const files = useMemo(() => {
    let f: Array<File> = [];
    props.files.forEach(item => {
      let it = item.split("/")
      f.push({
        name: it[it.length - 1],
        url: item
      });
    })
    return f;
  }, [props.files])

  const beforeUpload: (file: RcFile, FileList: RcFile[]) => Promise<boolean> = async (file) => {
    const data = new FormData();
    data.append("file", file)
    let res = await upload(data)
    props.onUpload({ name: file.name, url: res });
    return false;
  }

  const removeFile = (f: File) => {
    props.onRemove(f)
  }

  return <>
    <div className={`w-full h-full flex items-start justify-between`}>
      <div className={`w-1/2 flex flex-col justify-center p-24`}>
        <div className={`text-22`}>{t("Add More Files")}</div>
        <div className={`w-full h-full mt-10`}>
          <Upload.Dragger multiple={false} beforeUpload={beforeUpload} showUploadList={false} accept={'.pdf'}>
            <div className='h-294 flex justify-center items-center flex-col'>
              <Icon name={'upload'} style={{'width': pxToVw(22), 'height': pxToVw(22), 'marginTop': pxToVw(5)}}/>
              <div className={`mt-2 text-black opacity-60 text-10`}>{t("Upload more files to knowledge base")}</div>
              <div className={`mt-2 text-black opacity-60 text-10`}>{t("Drop files here")}</div>
            </div>
          </Upload.Dragger>
        </div>
      </div>
      <div className={`w-1/2 flex p-24 flex-col`}>
        <div className={`text-22`}>{t("Existing Files")}</div>
        <div className={`w-full mt-10`}>
          <div className='w-full h-336 bg-[#FFFFFF] flex flex-wrap items-start content-start rounded-4 border border-[#DBDBDB] border-solid py-12 px-10'>
            {
              files.map(f => {
                return <div key={f.url} className='flex flex-col items-center relative mr-4'>
                  <div onClick={() => { removeFile(f) }} className={`w-10 h-10 flex items-center justify-center bg-[#FA4848] rounded-full cursor-pointer absolute -top-3 right-1`}>
                    <Icon name={'remove'} style={{width: pxToVw(4), height: pxToVw(4)}}/>
                  </div>
                  <Icon name='pdf' style={{width: pxToVw(45), height: pxToVw(45)}}/>
                  <div className='text-6 text-[#818181] mt-5 w-30 text-center truncate'>{ f.name }</div>
                </div>
              })
            }
          </div>
        </div>
      </div>
    </div>
    <div className='w-full flex justify-center'>
      <Button
        type="default"
        onClick={props.onConfirm}
        className={`w-120 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 my-30 cursor-pointer select-none`}
      >
        <div className={`text-13 text-transparent`} style={{
          backgroundImage: "linear-gradient(90deg, #9C34AB -0.02%, #4F6BE8 47.92%, #14B8BC 100.02%)",
          backgroundClip: 'text'
        }}>{t('Submit ✨')}</div>
      </Button>
    </div>
  </>
};

export default ManageFiles
