import { useState, useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Select } from 'antd'
import { pxToVw } from '@/utils'
import { Option } from '@/types'
import { getAllPhoneCode } from '@/request'

type Props = {
  onConfirm: (phoneNumber: string) => void
}

const ChangeNumber: FC<Props> = (props) => {
  const { t } = useTranslation()

  const [codes, setCodes] = useState<Array<Option>>([])

  const [oldCode, setOldCode] = useState(0)
  const [oldNumber, setOldNumber] = useState('')
  const [newCode, setNewCode] = useState(0)
  const [newNumber, setNewNumber] = useState('')
  const [renewCode, setRenewCode] = useState(0)
  const [renewNumber, setRenewNumber] = useState('')

  const disabled = useMemo(() => {
    let status = false
    if (
      oldCode === 0 ||
      oldNumber === '' ||
      newCode === 0 ||
      newNumber === '' ||
      renewCode === 0 ||
      renewNumber === ''
    ) {
      status = true
    }

    if (newCode !== renewCode || newNumber !== renewNumber) {
      status = true
    }

    return status
  }, [oldCode, oldNumber, newCode, newNumber, renewCode, renewNumber])

  const change = () => {
    props.onConfirm(`${newCode}${newNumber}`)
  }

  const getPhoneCodes = async () => {
    try {
      const result = await getAllPhoneCode()
      const res: Array<string> = result.data
      let arr: Array<Option> = []
      res.forEach((item) => {
        arr.push({
          label: item,
          value: item,
        })
      })
      setCodes(arr)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    Promise.all([getPhoneCodes()]).then()
  }, [])

  return (
    <>
      <div className={`text-22 mt-20`}>{t('Change Number')}</div>
      <div className={`text-12 text-[#767676] mt-6`}>
        {t('Verify and change the existing number with easy steps.')}
      </div>
      <div className="flex flex-row" style={{ marginTop: pxToVw(24) }}>
        {/* add country code */}
        <Select
          value={oldCode}
          onChange={(value) => {
            setOldCode(value)
          }}
          options={codes}
          style={{ width: pxToVw(80), height: pxToVw(35) }}
        />
        <Input
          value={oldNumber}
          onChange={(e) => {
            setOldNumber(e.target.value)
          }}
          styles={{
            input: {
              width: pxToVw(422),
              height: pxToVw(35),
              fontSize: pxToVw(10),
              marginLeft: pxToVw(18),
            },
          }}
          placeholder={t('Old number')}
          onKeyDown={(e) => {
            const allowedKeys = [
              '0',
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
            ]
            if (
              e.key !== 'Delete' &&
              e.key !== 'Backspace' &&
              !allowedKeys.includes(e.key)
            ) {
              e.preventDefault()
            }
          }}
        />
      </div>
      <div className="flex flex-row" style={{ marginTop: pxToVw(20) }}>
        {/* add country code */}
        <Select
          value={newCode}
          onChange={(value) => {
            setNewCode(value)
          }}
          options={codes}
          bordered={false}
          style={{
            width: pxToVw(80),
            height: pxToVw(35),
            backgroundColor: '#F4F6FA',
            borderRadius: pxToVw(4),
          }}
        />
        <Input
          value={newNumber}
          onChange={(e) => {
            setNewNumber(e.target.value)
          }}
          styles={{
            input: {
              width: pxToVw(422),
              height: pxToVw(35),
              fontSize: pxToVw(10),
              marginLeft: pxToVw(18),
              backgroundColor: '#F4F6FA',
              borderWidth: 0,
            },
          }}
          placeholder={t('New number')}
          onKeyDown={(e) => {
            const allowedKeys = [
              '0',
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
            ]
            if (
              e.key !== 'Delete' &&
              e.key !== 'Backspace' &&
              !allowedKeys.includes(e.key)
            ) {
              e.preventDefault()
            }
          }}
        />
      </div>
      <div className="flex flex-row" style={{ marginTop: pxToVw(20) }}>
        {/* add country code */}
        <Select
          value={renewCode}
          onChange={(value) => {
            setRenewCode(value)
          }}
          options={codes}
          bordered={false}
          style={{
            width: pxToVw(80),
            height: pxToVw(35),
            backgroundColor: '#F4F6FA',
            borderRadius: pxToVw(4),
          }}
        />
        <Input
          value={renewNumber}
          onChange={(e) => {
            setRenewNumber(e.target.value)
          }}
          styles={{
            input: {
              width: pxToVw(422),
              height: pxToVw(35),
              fontSize: pxToVw(10),
              marginLeft: pxToVw(18),
              backgroundColor: '#F4F6FA',
              borderWidth: 0,
            },
          }}
          placeholder={t('Confirm number')}
          onKeyDown={(e) => {
            const allowedKeys = [
              '0',
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
            ]
            if (
              e.key !== 'Delete' &&
              e.key !== 'Backspace' &&
              !allowedKeys.includes(e.key)
            ) {
              e.preventDefault()
            }
          }}
        />
      </div>
      <div className="flex items-center justify-center">
        <Button
          type="default"
          disabled={disabled}
          onClick={change}
          className={`w-167 h-39 flex items-center justify-center bg-[#E6E6F4] rounded-20 cursor-pointer select-none mt-72 border-none`}
        >
          <div
            className={`text-13 text-transparent`}
            style={{
              backgroundImage:
                'linear-gradient(90deg, #9C34AB -0.02%, #4F6BE8 47.92%, #14B8BC 100.02%)',
              backgroundClip: 'text',
            }}
          >
            {t('Change number ✨')}
          </div>
        </Button>
      </div>
    </>
  )
}

export default ChangeNumber
