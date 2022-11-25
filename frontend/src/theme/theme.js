import { Button, extendTheme, Input, theme as base, withDefaultColorScheme, withDefaultVariant } from "@chakra-ui/react";
import {whiten} from '@chakra-ui/theme-tools'

const theme = extendTheme({
    colors:{
        brand: 
        {
          50: '#ffe2ec',
          100: '#ffb3c5',
          200: '#fc839f',
          300: '#f95278',
          400: '#f62252',
          500: '#dd0939',
          600: '#ad032c',
          700: '#7c001e',
          800: '#4d0012',
          900: '#200005',
        },
        brand1: 
        {
          50: '#fff1db',
          100: '#ffd8b0',
          200: '#fbc081',
          300: '#f9a652',
          400: '#f68d22',
          500: '#dd7309',
          600: '#ac5a04',
          700: '#7c3f02',
          800: '#4c2500',
          900: '#1f0b00',
        }
        
    },
    fonts: {
        heading: `Montserrat, ${base.fonts.heading}`,
        body: `Montserrat, ${base.fonts.heading}`,
    },
    }
)

export default theme