import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import Avatar from '../../../src/assets/profile.png'
import { useEffect, useState } from 'react'
import { Input, Button } from 'antd'
import { getUserInfo, updateUserInfo } from '@/request'

const Profile = () => {
  const { t } = useTranslation()

  //state variables
  const [displayName, setDisplayName]: any = useState('')

  const [editProfile, setEditProfile] = useState(false)

  const [email, setEmail]: any = useState('')

  const [password, setPassword]: any = useState('')
  const [editPassword, setEditPassword]: any = useState(false)

  const [phoneNumber, setPhoneNumber]: any = useState()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const resp = await getUserInfo()
      if (resp) {
        setDisplayName(resp.display_name)
        setEmail(resp.email)
        setPhoneNumber(resp.phone)
      }
    }
    fetchUserInfo()
  }, [])

  const handleEditProfile = async () => {
    if (editProfile) {
      const resp = await updateUserInfo({
        display_name: displayName,
        phone: phoneNumber,
      })

      if (resp) {
        setDisplayName(resp.display_name)
        setPhoneNumber(resp.phone)
      }
    }
    setEditProfile(!editProfile)
  }

  return (
    <>
      <div
        className={`bg-white items-center rounded-8 mt-40 ml-20`}
        style={{
          width: pxToVw(1110),
          height: pxToVw(727),
          boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)',
        }}
      >
        <div
          className={`items-center`}
          style={{
            width: pxToVw(1110),
            height: pxToVw(165),
            backgroundColor: '#CAD0DA',
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
            <img
              src={Avatar}
              alt="Profile Image"
              style={{ width: '90%', height: '90%', objectFit: 'cover' }}
            />
          </div>
          {/* Profile Name */}
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
          </div>
        </div>
        {/* Profile Info */}
        <div
          className={`flex items-center rounded-8 flex-col`}
          style={{
            border: '1px solid #DBDBDB',
            alignSelf: 'center',
            width: pxToVw(1062),
            height: pxToVw(445),
            marginTop: pxToVw(20),
            marginLeft: pxToVw(25),
          }}
        >
          {/* Display Name */}
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
                  marginLeft: pxToVw(30),
                  marginTop: pxToVw(20),
                  fontFamily: 'PingFang SC Medium',
                }}
              >
                {t('Display Name')}
              </div>
              <Input
                readOnly={!editProfile}
                styles={{
                  input: {
                    width: pxToVw(500),
                    fontSize: pxToVw(15),
                    color: '#626262',
                    border: 0,
                    marginLeft: pxToVw(25),
                    marginTop: pxToVw(12),
                    fontWeight: 'lighter',
                  },
                }}
                placeholder={t('Display Name')}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          </div>

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
                  marginLeft: pxToVw(30),
                  marginTop: pxToVw(20),
                  fontFamily: 'PingFang SC Medium',
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
                    marginLeft: pxToVw(25),
                    marginTop: pxToVw(12),
                    fontWeight: 'lighter',
                  },
                }}
                placeholder={t('Email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Phone Number */}
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
                  marginLeft: pxToVw(30),
                  marginTop: pxToVw(20),
                  fontFamily: 'PingFang SC Medium',
                }}
              >
                {t('Phone Number')}
              </div>
              <Input
                readOnly={!editProfile}
                styles={{
                  input: {
                    width: pxToVw(500),
                    fontSize: pxToVw(15),
                    color: '#626262',
                    border: 0,
                    marginLeft: pxToVw(25),
                    marginTop: pxToVw(12),
                    fontWeight: 'lighter',
                  },
                }}
                placeholder={t('Add your phone number for better security')}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

    {/* Edit button */}
          <div
            className="w-full flex justify-between flex-row"
            style={{ borderBottom: '1px solid #DBDBDB', height: pxToVw(89) }}
          >
            <Button
              type="default"
              onClick={handleEditProfile}
              className="bg-[#788CA7] rounded-4"
              style={{
                width: pxToVw(500),
                height: pxToVw(40),
                color: 'white',
                fontSize: pxToVw(16),
                marginLeft: pxToVw(225),
                marginTop: pxToVw(25),
              }}
            >
              <div style={{ fontFamily: 'PingFang SC Regular' }}>
                {editProfile ? t('Save') : t('Edit')}
              </div>
            </Button>
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
                  marginLeft: pxToVw(30),
                  marginTop: pxToVw(20),
                  fontFamily: 'PingFang SC Medium',
                }}
              >
                {t('Password')}
              </div>
              <Input
                type="password"
                readOnly={!editPassword}
                styles={{
                  input: {
                    width: pxToVw(500),
                    fontSize: pxToVw(15),
                    color: '#626262',
                    border: 0,
                    marginLeft: pxToVw(25),
                    marginTop: pxToVw(12),
                    fontWeight: 'lighter',
                  },
                }}
                placeholder={t('Password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="default"
              onClick={() => {}}
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
        </div>
      </div>

      <div
        className={`bg-white items-center rounded-8 mt-40 ml-20 flex justify-between flex-row`}
        style={{
          width: pxToVw(1110),
          height: pxToVw(193),
          marginTop: pxToVw(25),
          boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)',
        }}
      >
        <div className="flex-col">
          <div
            className="text-bold"
            style={{
              color: '#626262',
              fontSize: pxToVw(22),
              marginLeft: pxToVw(30),
              marginTop: pxToVw(20),
              fontFamily: 'PingFang SC Medium',
            }}
          >
            {t('Subscribed To')}
          </div>
          <div
            className="flex flex-row items-center"
            style={{ marginLeft: pxToVw(25) }}
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
      </div>

      <div className="flex" style={{ marginTop: pxToVw(20) }} />
    </>
  )
}

export default Profile
