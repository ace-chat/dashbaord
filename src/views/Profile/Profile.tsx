import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import { useEffect, useState } from 'react'
// import { useEffect, useRef, useState } from 'react'
import { Input, Button, Upload, message } from 'antd'
import {
  getUserInfo,
  updateUserAvatar,
  updateUserInfo,
} from '@/request'
import { ChangePassword } from '@/components/Modal/ChangePassword'
import Camera from '../../../src/assets/camera2.svg'
import Pen from '../../../src/assets/pen.svg'
import Tick from '../../../src/assets/save.svg'
import { useDispatch } from 'react-redux'
import { setToken } from '@/reducers/token.ts'
import { useNavigate } from 'react-router-dom'
import ProfileTop from '../../../src/assets/profile_top.svg'
import type { RcFile } from 'antd/es/upload/interface'

const Profile = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //state variables
  const [displayName, setDisplayName] = useState('')
  const [editProfile, setEditProfile] = useState(false)
  const [email, setEmail] = useState('')
  const [editPassword, setEditPassword] = useState(false)
  const [editName, setEditName] = useState(true)
  const [editPhoneNumber, setEditPhoneNumber] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState('')

  // const fileInput: any = useRef()
  // const [selectedFile, setSelectedFile] = useState<File | null>()
  const [profileImg, setProfileImg] = useState<string>('')

  const fetchUserInfo = async () => {
    try {
      const resp = await getUserInfo()
      if (resp.code === 20000) {
        setDisplayName(resp.data.display_name)
        setEmail(resp.data.email)
        setPhoneNumber(resp.data.phone)
        setProfileImg(resp.data.avatar)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const handleEditProfile = async () => {
    try {
      if (editProfile || !editName || !editPhoneNumber) {
        const result = await updateUserInfo({
          display_name: displayName,
          phone: phoneNumber,
        })

        const resp = result.data

        if (resp) {
          setDisplayName(resp.display_name)
          setPhoneNumber(resp.phone)

          alert('update completed')
        }
      }
      setEditProfile(!editProfile)
      setEditName(true)
      setEditPhoneNumber(true)
    } catch (e) {
      console.error(e)
    }
  }

  const toggleChangePassword = () => {
    setEditPassword(!editPassword)
  }

  const onClickLogout = async () => {
    dispatch(setToken(''))
    navigate('/login')
  }

  const beforeUpload: (
    file: RcFile,
    FileList: RcFile[]
  ) => Promise<boolean> = async (file) => {
    const validExtensions = ['png', 'gif', 'jpg', 'jpeg', 'svg'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !validExtensions.includes(fileExtension)) {
      message.error(t("Only png, gif, jpg and jpeg files are allowed!"));
      return false;
    }

    const data = new FormData()
    data.append('file', file)
    try {
      const result = await updateUserAvatar(data)
      if (result.code === 20000) {
        message.success(t('Update completed'))
        await fetchUserInfo()
      }
    } catch (e) {
      console.error(e)
    }

    return false
  }

  return (
    <>
      <div
        className={`bg-white items-center rounded-8 mt-40 ml-20`}
        style={{
          width: pxToVw(1110),
          boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)',
        }}
      >
        <img
          className={`items-center rounded-t-8`}
          src={ProfileTop}
          alt="ProfileTop"
          style={{
            width: pxToVw(1110),
            height: pxToVw(165),
            backgroundColor: '#CAD0DA',
            backgroundSize: 'cover',
          }}
        />

        <div className="flex flex-row" style={{ height: pxToVw(73) }}>
          {/* Profile Photo */}
          <div
            className="flex justify-center items-center"
            style={{
              transform: 'translate(30%, -50%)',
              width: pxToVw(145),
              height: pxToVw(145),
              borderRadius: '50%',
              backgroundColor: 'white',
            }}
          >
            {profileImg ? (
              <img
                src={profileImg}
                alt="Profile Image"
                style={{ width: '90%', height: '90%', objectFit: 'cover' }}
              />
            ) : (
              <></>
            )}
            <div
              style={{
                position: 'absolute',
                height: pxToVw(45),
                width: pxToVw(60),
                // bottom: 0,
                cursor: 'pointer',
              }}
            >
              <Upload.Dragger
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                multiple={false}
                beforeUpload={beforeUpload}
                showUploadList={false}
                accept=".png,.gif,.jpg,.jpeg,.svg"
              >
                <img
                  src={Camera}
                  alt="Camera"
                  style={{
                    width: pxToVw(22),
                    height: pxToVw(22),
                  }}
                />
              </Upload.Dragger>
            </div>
          </div>
          {/* Profile Name */}
          {editName ? (
            <div
              style={{
                color: 'black',
                fontSize: pxToVw(22),
                marginLeft: pxToVw(60),
                marginTop: pxToVw(25),
                fontFamily: 'PingFang SC Medium',
              }}
            >
              {t(displayName)}
              <img
                src={Pen}
                alt="Pen"
                style={{
                  width: pxToVw(12),
                  height: pxToVw(12),
                  marginLeft: pxToVw(8),
                  cursor: 'pointer',
                }}
                onClick={() => setEditName(!editName)}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input
                style={{
                  color: 'black',
                  fontSize: pxToVw(15),
                  marginLeft: pxToVw(50),
                  marginTop: pxToVw(25),
                  fontFamily: 'PingFang SC Medium',
                }}
                placeholder={t('Display Name')}
                value={displayName}
                onChange={(e: any) => setDisplayName(e.target.value)}
              />
              <img
                src={Tick}
                alt="Pen"
                style={{
                  width: pxToVw(14),
                  height: pxToVw(14),
                  marginLeft: pxToVw(8),
                  marginTop: pxToVw(25),
                  cursor: 'pointer',
                }}
                onClick={handleEditProfile}
              />
            </div>
          )}
        </div>
        {/* Profile Info */}
        <div
          className={`flex items-center rounded-8 flex-col`}
          style={{
            alignSelf: 'center',
            width: pxToVw(1062),
            marginTop: pxToVw(20),
            marginLeft: pxToVw(48),
            paddingBottom: 30,
          }}
        >
          {/* Email */}
          <div
            className="w-full flex justify-between flex-row"
            style={{ borderBottom: '1px solid #DBDBDB', height: pxToVw(89) }}
          >
            <div className="flex-col">
              <div
                className="text-bold"
                style={{
                  color: '#626262',
                  fontSize: pxToVw(16),
                  marginLeft: pxToVw(0),
                  marginTop: pxToVw(20),
                  fontFamily: 'PingFang SC Medium',
                  fontWeight: 'bold',
                }}
              >
                {t('Email')}
              </div>
              <Input
                readOnly={true}
                styles={{
                  input: {
                    width: pxToVw(500),
                    fontSize: pxToVw(15),
                    color: '#626262',
                    border: 0,
                    marginTop: pxToVw(12),
                    fontWeight: 'lighter',
                    paddingLeft: 0,
                  },
                }}
                placeholder={t('Email')}
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div
            className="w-full flex justify-between flex-row"
            style={{ borderBottom: '1px solid #DBDBDB', height: pxToVw(89) }}
          >
            <div className="flex-col">
              <div
                className="text-bold"
                style={{
                  color: '#626262',
                  fontSize: pxToVw(16),
                  marginLeft: pxToVw(0),
                  marginTop: pxToVw(20),
                  fontFamily: 'PingFang SC Medium',
                  fontWeight: 'bold',
                }}
              >
                {t('Password')}
              </div>
              <div
                style={{
                  width: pxToVw(500),
                  fontSize: pxToVw(15),
                  color: '#626262',
                  border: 0,
                  marginTop: pxToVw(12),
                  fontWeight: 'lighter',
                }}
              >
                **********************
              </div>
            </div>

            <Button
              type="default"
              onClick={toggleChangePassword}
              className="bg-[#788CA7] rounded-4"
              style={{
                width: pxToVw(100),
                height: pxToVw(40),
                color: 'white',
                fontSize: pxToVw(16),
                marginRight: pxToVw(25),
                marginTop: pxToVw(25),
              }}
            >
              <div style={{ fontFamily: 'PingFang SC Regular' }}>
                {editPassword ? t('Save') : t('Change')}
              </div>
            </Button>
          </div>

          {/* Phone Number */}
          <div
            className="w-full flex justify-between flex-row"
            style={{ height: pxToVw(89) }}
          >
            <div className="flex-col">
              <div
                className="text-bold"
                style={{
                  color: '#626262',
                  fontSize: pxToVw(16),
                  marginLeft: pxToVw(0),
                  marginTop: pxToVw(20),
                  fontFamily: 'PingFang SC Medium',
                  fontWeight: 'bold',
                }}
              >
                {t('Phone Number')}
              </div>
              <Input
                readOnly={editPhoneNumber}
                styles={{
                  input: {
                    width: pxToVw(500),
                    fontSize: pxToVw(15),
                    color: '#626262',
                    border: 0,
                    marginTop: pxToVw(12),
                    fontWeight: 'lighter',
                    paddingLeft: 0,
                  },
                }}
                placeholder={t('Add your phone number for better security')}
                value={phoneNumber}
                onChange={(e: any) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button
              type="default"
              onClick={async () =>
                editPhoneNumber
                  ? setEditPhoneNumber(!editPhoneNumber)
                  : await handleEditProfile()
              }
              className="bg-[#788CA7] rounded-4"
              style={{
                width: pxToVw(100),
                height: pxToVw(40),
                color: 'white',
                fontSize: pxToVw(16),
                marginRight: pxToVw(25),
                marginTop: pxToVw(25),
              }}
            >
              <div style={{ fontFamily: 'PingFang SC Regular' }}>
                {editPhoneNumber ? t('Edit') : t('Save')}
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`bg-white items-center rounded-8 mt-40 ml-20 flex justify-between flex-row`}
        style={{
          width: pxToVw(1110),
          marginTop: pxToVw(25),
          paddingBlock: 20,
          boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)',
        }}
      >
        <div className="flex-col">
          <div
            className="text-bold"
            style={{
              color: '#626262',
              fontSize: pxToVw(22),
              marginLeft: pxToVw(48),
              marginTop: pxToVw(20),
              fontFamily: 'PingFang SC Medium',
            }}
          >
            {t('Subscribed To')}
          </div>
          <div
            className="flex flex-row items-center"
            style={{ marginLeft: pxToVw(48) }}
          >
            <div
              style={{
                color: '#C6C6CA',
                fontSize: pxToVw(76),
                fontFamily: 'PingFang SC Medium',
              }}
            >
              $0
            </div>
            <div
              className="flex justify-center items-start flex-col"
              style={{
                width: pxToVw(92),
                height: pxToVw(68),
                marginLeft: pxToVw(10),
                borderLeft: '1px solid #C6C6CA',
                paddingLeft: pxToVw(14),
              }}
            >
              <div
                style={{
                  color: '#C6C6CA',
                  fontSize: pxToVw(16),
                  fontFamily: 'PingFang SC Medium',
                }}
              >
                Premium
              </div>
              <div
                style={{
                  color: '#C6C6CA',
                  fontSize: pxToVw(16),
                  marginTop: pxToVw(7),
                  fontFamily: 'PingFang SC Light',
                }}
              >
                Annually
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col"
          style={{ marginRight: pxToVw(25), paddingTop: pxToVw(20) }}
        >
          <Button
            type="default"
            className="bg-[#4F6BE8] rounded-4"
            style={{
              width: pxToVw(167),
              height: pxToVw(39),
              color: 'white',
              fontSize: pxToVw(16),
            }}
          >
            <div style={{ fontFamily: 'PingFang SC Regular' }}>
              {t('Make Your Plan')}
            </div>
          </Button>
          <Button
            type="default"
            className="bg-[#E6E6F4] rounded-4"
            style={{
              width: pxToVw(167),
              height: pxToVw(39),
              fontSize: pxToVw(16),
              marginTop: pxToVw(20),
            }}
          >
            <div
              className={`custom-div-text`}
              style={{
                alignSelf: 'center',
                fontSize: pxToVw(16),
                fontFamily: 'PingFang SC Regular',
              }}
            >
              {t('Upgrade Plan')}
            </div>
          </Button>
        </div>
        <ChangePassword
          changePassword={editPassword}
          toggleChangePassword={toggleChangePassword}
        />
      </div>

      <div
        className={`bg-white items-center rounded-8 mt-40 ml-20 flex justify-between flex-row`}
        style={{
          width: pxToVw(1110),
          marginTop: pxToVw(25),
          boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)',
          padding: 20,
          justifyContent: 'right',
        }}
      >
        <Button
          type="default"
          className="bg-[#4F6BE8] rounded-4"
          style={{
            width: pxToVw(167),
            height: pxToVw(39),
            color: 'white',
            fontSize: pxToVw(16),
          }}
          onClick={onClickLogout}
        >
          <div style={{ fontFamily: 'PingFang SC Regular' }}>
            {t('Log out')}
          </div>
        </Button>
      </div>

      <div className="flex" style={{ marginTop: pxToVw(20) }} />
    </>
  )
}

export default Profile
