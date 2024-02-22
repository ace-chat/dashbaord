import { pxToVw } from '@/utils'
import { Box, css, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export const floatingLabelStyle = css({
  '& + label': {
    top: -12,
    left: 8,
    zIndex: 2,
    position: 'absolute',
    backgroundColor: 'white',
    pointerEvents: 'none',
    mx: 3,
    px: 1,
    my: 1,
    borderRadius: '1.17px',
  },
})

export default function CustomInput({
  id = '1',
  label = 'label',
  type = 'text',
  placeholder = '',
  ...props
}) {
  const { t } = useTranslation()
  return (
    <Box p={3}>
      <FormControl variant="floating" id={id}>
        <Input
          id={id}
          placeholder={t(placeholder)}
          type={type}
          css={floatingLabelStyle}
          {...props}
          style={{
            width: pxToVw(380),
            height: pxToVw(50),
            fontSize: pxToVw(13),
            fontWeight: '500px',
            fontFamily: 'Poppins',
          }}
        />
        <FormLabel
          htmlFor={id}
          style={{
            width: 'auto',
            height: 'auto',
            fontSize: pxToVw(13),
            fontWeight: '500px',
            fontFamily: 'Poppins',
          }}
        >
          {t(label)}
        </FormLabel>
      </FormControl>
    </Box>
  )
}
