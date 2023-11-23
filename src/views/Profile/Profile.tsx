import { useTranslation } from 'react-i18next'
import { pxToVw } from '@/utils'
import Avatar from "../../../src/assets/profile.png";
import { useState } from 'react';
import { Input, Button } from 'antd';

const Profile = () => {
  const { t } = useTranslation();

  //state variables
  const [displayName, setDisplayName]: any = useState("Ace Support");
  const [editName, setEditName]: any = useState(false);

  const [userName, setUsername]: any = useState("ACESupport@ace.com");
  const [editUsername, setEditUsername]: any = useState(false);

  const [email, setEmail]: any = useState("acesupport@email.com");
  const [editEmail, setEditEmail]: any = useState(false);

  const [password, setPassword]: any = useState("Ace1234");
  const [editPassword, setEditPassword]: any = useState(false);

  const [phoneNumber, setPhoneNumber]: any = useState();
  const [editNumber, setEditNumber]: any = useState(false);

  return <>
    <div className={`bg-white items-center rounded-8 mt-40 ml-20`} style={{"width": pxToVw(1110), "height": pxToVw(727), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
        <div className={`items-center`} style={{ "width": pxToVw(1110), "height": pxToVw(165), "backgroundColor": "#CAD0DA" }} />
        <div className='flex flex-row' style={{ height: pxToVw(73) }}>
            {/* Profile Photo */}
            <div className='flex justify-center items-center' style={{ transform: 'translate(30%, -50%)',  width: pxToVw(145), height: pxToVw(145), borderRadius: '50%', backgroundColor: 'white' }}>
                <img src={Avatar} alt="Profile Image" style={{ width: '90%', height: '90%', objectFit: 'cover' }} />
            </div>
            {/* Profile Name */}
            <div style={{ color: "black", fontSize: pxToVw(22), marginLeft: pxToVw(60), marginTop: pxToVw(25)}}>{ t(displayName) }</div>
        </div>
        {/* Profile Info */}
        <div className={`flex items-center rounded-8 flex-col`} style={{ "border": "1px solid #DBDBDB", "alignSelf": "center", "width": pxToVw(1062), "height": pxToVw(445), marginTop: pxToVw(20), marginLeft: pxToVw(25)}}>
            
            {/* Display Name */}
            <div className='w-full flex justify-between flex-row' style={{ "borderBottom": "1px solid #DBDBDB", height: pxToVw(89) }}>
                <div className='flex-col'>
                    <div className='text-bold' style={{ color: "#626262", fontSize: pxToVw(16), marginLeft: pxToVw(30), marginTop: pxToVw(20)  }}>{ t("Display Name") }</div>
                    <Input readOnly={!editName} styles={{ input: { width: pxToVw(500), fontSize: pxToVw(15), color: "#626262", border: 0, marginLeft: pxToVw(25), marginTop: pxToVw(12), fontWeight: "lighter" } }} 
                        placeholder={t('Display Name')} value={displayName} onChange={(e) => setDisplayName(e.target.value)} 
                    />
                </div>
                <Button
                    type="default"
                    onClick={() => setEditName(!editName)}
                    className='bg-[#788CA7] rounded-4'
                    style={{ width: pxToVw(100), height: pxToVw(40), color: "white", fontSize: pxToVw(16), marginRight: pxToVw(25), marginTop: pxToVw(25) }}
                >
                    {editName ? t('Save') : t('Edit')}
                </Button>
            </div>
            
            {/* Username */}
            <div className='w-full flex justify-between flex-row' style={{ "borderBottom": "1px solid #DBDBDB", height: pxToVw(89) }}>
                <div className='flex-col'>
                    <div className='text-bold' style={{ color: "#626262", fontSize: pxToVw(16), marginLeft: pxToVw(30), marginTop: pxToVw(20)  }}>{ t("Username") }</div>
                    <Input readOnly={!editUsername} styles={{ input: { width: pxToVw(500), fontSize: pxToVw(15), color: "#626262", border: 0, marginLeft: pxToVw(25), marginTop: pxToVw(12), fontWeight: "lighter" } }} 
                        placeholder={t('Username')} value={userName} onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <Button
                    type="default"
                    onClick={() => setEditUsername(!editUsername)}
                    className='bg-[#788CA7] rounded-4'
                    style={{ width: pxToVw(100), height: pxToVw(40), color: "white", fontSize: pxToVw(16), marginRight: pxToVw(25), marginTop: pxToVw(25) }}
                >
                    {editUsername ? t('Save') : t('Edit')}
                </Button>
            </div>

            {/* Email */}
            <div className='w-full flex justify-between flex-row' style={{ "borderBottom": "1px solid #DBDBDB", height: pxToVw(89) }}>
                <div className='flex-col'>
                    <div className='text-bold' style={{ color: "#626262", fontSize: pxToVw(16), marginLeft: pxToVw(30), marginTop: pxToVw(20)  }}>{ t("Email") }</div>
                    <Input readOnly={!editEmail} styles={{ input: { width: pxToVw(500), fontSize: pxToVw(15), color: "#626262", border: 0, marginLeft: pxToVw(25), marginTop: pxToVw(12), fontWeight: "lighter" } }} 
                        placeholder={t('Email')} value={email} onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <Button
                    type="default"
                    onClick={() => setEditEmail(!editEmail)}
                    className='bg-[#788CA7] rounded-4'
                    style={{ width: pxToVw(100), height: pxToVw(40), color: "white", fontSize: pxToVw(16), marginRight: pxToVw(25), marginTop: pxToVw(25) }}
                >
                    {editEmail ? t('Save') : t('Edit')}
                </Button>
            </div>

            {/* Password */}
            <div className='w-full flex justify-between flex-row' style={{ "borderBottom": "1px solid #DBDBDB", height: pxToVw(89) }}>
                <div className='flex-col'>
                    <div className='text-bold' style={{ color: "#626262", fontSize: pxToVw(16), marginLeft: pxToVw(30), marginTop: pxToVw(20)  }}>{ t("Password") }</div>
                    <Input type='password' readOnly={!editPassword} styles={{ input: { width: pxToVw(500), fontSize: pxToVw(15), color: "#626262", border: 0, marginLeft: pxToVw(25), marginTop: pxToVw(12), fontWeight: "lighter" } }} 
                        placeholder={t('Password')} value={password} onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <Button
                    type="default"
                    onClick={() => setEditPassword(!editPassword)}
                    className='bg-[#788CA7] rounded-4'
                    style={{ width: pxToVw(100), height: pxToVw(40), color: "white", fontSize: pxToVw(16), marginRight: pxToVw(25), marginTop: pxToVw(25) }}
                >
                    {editPassword ? t('Save') : t('Change')}
                </Button>
            </div>

           {/* Phone Number */}
            <div className='w-full flex justify-between flex-row' style={{ "borderBottom": "1px solid #DBDBDB", height: pxToVw(89) }}>
                <div className='flex-col'>
                    <div className='text-bold' style={{ color: "#626262", fontSize: pxToVw(16), marginLeft: pxToVw(30), marginTop: pxToVw(20)  }}>{ t("Phone Number") }</div>
                    <Input readOnly={!editName} styles={{ input: { width: pxToVw(500), fontSize: pxToVw(15), color: "#626262", border: 0, marginLeft: pxToVw(25), marginTop: pxToVw(12), fontWeight: "lighter" } }} 
                        placeholder={t('Add your phone number for better security')} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                </div>
                <Button
                    type="default"
                    onClick={() => setEditNumber(!editNumber)}
                    className='bg-[#788CA7] rounded-4'
                    style={{ width: pxToVw(100), height: pxToVw(40), color: "white", fontSize: pxToVw(16), marginRight: pxToVw(25), marginTop: pxToVw(25) }}
                >
                    {editNumber ? t('Save') : t('Add')}
                </Button>
            </div>

        </div>
    </div>

    <div className={`bg-white items-center rounded-8 mt-40 ml-20 flex justify-between flex-row`} style={{"width": pxToVw(1110), "height": pxToVw(193), marginTop: pxToVw(25), boxShadow: '0px 2px 10px rgba(11.79, 0.59, 140.60, 0.04)'}}>
        <div className='flex-col'>
            <div className='text-bold' style={{ color: "#626262", fontSize: pxToVw(22), marginLeft: pxToVw(30), marginTop: pxToVw(20) }}>{ t("Subscribed To") }</div>
            <div className='flex flex-row items-center' style={{ marginLeft: pxToVw(25) }}>
                <div className='text-bold' style={{ color: "#C6C6CA", fontSize: pxToVw(76) }}>$0</div>
                <div className='flex justify-center items-start flex-col' style={{ width: pxToVw(92), height: pxToVw(68), marginLeft: pxToVw(10), "borderLeft": "1px solid #C6C6CA", paddingLeft: pxToVw(14) }}>
                    <div className='text-bold' style={{ color: "#C6C6CA", fontSize: pxToVw(16) }}>Premium</div>
                    <div style={{ color: "#C6C6CA", fontSize: pxToVw(16), fontWeight: "lighter", marginTop: pxToVw(7) }}>Annually</div>
                </div>
            </div>
        </div>
        <div className='flex flex-col' style={{ marginRight: pxToVw(25), paddingTop: pxToVw(20) }}>
            <Button
                type="default"
                className='bg-[#4F6BE8] rounded-4'
                style={{ width: pxToVw(167), height: pxToVw(39), color: "white", fontSize: pxToVw(16)}}
            >
                {t('Make Your Plan')}
            </Button>
            <Button
                type="default"
                className='bg-[#E6E6F4] rounded-4'
                style={{ width: pxToVw(167), height: pxToVw(39), fontSize: pxToVw(16), marginTop: pxToVw(20) }}
            >
                <div className={`custom-div-text`} style={{ alignSelf: "center", fontSize: pxToVw(16) }}>{ t("Upgrade Plan") }</div>
            </Button>
        </div>
    </div>

    <div className='flex' style={{ marginTop: pxToVw(20) }} />
  </>
}

export default Profile
