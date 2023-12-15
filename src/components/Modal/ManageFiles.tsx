import { Button, Input, Modal, Select } from 'antd'
import { pxToVw } from '@/utils'
import { useRef, useState } from 'react';
import Icon from '../Icon/Icon';

export const ManageFiles = ({t, manageFiles, toggleManageFiles, fileInput, handleFileInputChange, selectedFiles}: any) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileClick = (index: any) => {
      setSelectedFile(index);
    };

    return(
        <Modal
            className='files_modal'
            centered
            open={manageFiles}
            onCancel={toggleManageFiles}
            maskClosable={false}
            footer={() => {
                return(
                    <div />
                )
            }}
        >
            <div className={`flex justify-between`}>
                <div className={`flex p-24 flex-col`} style={{ width: pxToVw(500), justifyContent: "center" }}>
                    <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(22) }}>{t("Add More Files")}</div>
                    <div className={`mt-12`}>
                        <div className='flex rounded-8 mt-16 justify-center items-center' 
                        style={{"backgroundColor": "#F4F6FA", "display": "flex", "width": pxToVw(430), "height": pxToVw(293), border: "1px dashed #8B8B8B", flexDirection: "column" }}
                        onClick={() => fileInput.current.click()}>
                            <input
                                type="file"
                                id="fileInput"
                                accept=".pdf"
                                ref={fileInput}
                                onChange={handleFileInputChange}
                                style={{ display: "none" }}
                            />
                            <Icon name={'upload'} style={{ 'width': pxToVw(22), 'height': pxToVw(22), 'marginTop': pxToVw(5) }} />
                            <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Light" }}>{ t("Upload more files to knowledge base") }</div>
                            <div className={`mt-2`} style={{ color: "#000", opacity: 0.6, fontSize: pxToVw(10), fontFamily: "PingFang SC Light" }}>{ t("Drop files here") }</div>
                        </div> 
                    </div>
                    <div className='flex self-center'>
                        <Button
                            type="default"
                            style={{ borderRadius: pxToVw(20), marginTop: pxToVw(30), marginBottom: pxToVw(30) }}
                            onClick={() => {
                                toggleManageFiles();
                            }}
                            className={`w-120 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none`}
                        >
                            <div className='modal-text'>{t('Submit ✨')}</div>
                        </Button>
                    </div>
                </div>

                <div className="w-px bg-[#F3F3F3]"></div>

                <div className={`flex p-24 flex-col`} style={{ width: pxToVw(500) }}>

                    <div style={{ fontFamily: "PingFang SC Medium", fontSize: pxToVw(22) }}>{t("Existing Files")}</div>
                    <div className={`mt-12`}>
                        <div className='flex flex-row rounded-4 mt-16' 
                            style={{
                                "backgroundColor": "white",
                                "display": "flex",
                                "width": pxToVw(400),
                                "height": pxToVw(293),
                                border: "1px solid #DBDBDB",
                                flexDirection: "row", 
                                flexWrap: "wrap",
                                alignItems: "flex-start", 
                                alignContent: "flex-start"
                            }}
                        >
                            {selectedFiles.map((file: any, index: number) => {
                            return (
                                <>
                                <div className='flex flex-col items-center pdf-div' key={index} style={{ marginTop: pxToVw(10), alignSelf: "self-start", paddingLeft: pxToVw(10), position: 'relative' }}>
                                    <Icon name='pdf' style={{ width: pxToVw(45), height: pxToVw(45), alignSelf: "center" }} />
                                    <div style={{ 
                                        fontFamily: "PingFang SC Medium", 
                                        fontSize: pxToVw(6), color: "#818181", 
                                        marginTop: pxToVw(5), width: pxToVw(35), height: pxToVw(30), 
                                        textAlign: "center" }}
                                    >
                                        {file?.name}
                                    </div>
                                </div>
                                </>
                            );
                            })}
                        </div> 
                    </div>

                    <div className='flex self-center' style={{ marginTop: pxToVw(30), marginBottom: pxToVw(30), height: pxToVw(39)}} />
                </div>
            </div>
      </Modal>
    )
};
