import { ThemeOptions } from '@material-ui/core';

export const themeOptions: ThemeOptions = {
  overrides: {
    MuiPickersBasePicker: {
      pickerView: {
        width: '100%',
        minWidth: '700px',
        maxWidth: '814px',
        minHeight: '700px',
        backgroundColor: '#FFFDFA',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        justifyContent: 'center',
      },
      transitionContainer: {
        width: '100%',
        maxWidth: '814px',
      },
      daysHeader: {
        display: 'flex',
        gap: '8px',
        maxHeight: 'fit-content',
      },
      dayLabel: {
        backgroundColor: '#EFEDE9',
        width: '100px',
        margin: 0,
        borderRadius: '8px',
        padding: '8px',
        textAlign: 'left',
        fontSize: '16px',
        color: '#000',
      },
    },
    MuiTypography: {
      body1: {
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    MuiButtonBase: {
      root: {
        backgroundColor: '#FFF',
        border: '1px solid #E3DED6',
        color: '#000',
      },
    },
    MuiIconButton: {
      root: {
        boxShadow: '0px 4px 15px 0px rgba(220, 220, 220, 0.49)',
        color: '#000',
        '&:hover': {
          backgroundColor: '#FFF',
          color: '#E3DED6',
        },
      },
    },
    MuiPickersSlideTransition: {
      transitionContainer: {
        maxWidth: '814px',
        margin: '0 auto',
        '& > div': {
          position: 'relative',
        },
      },
    },
    MuiPickersCalendar: {
      week: {
        display: 'flex',
        gap: '8px',
        marginBottom: '8px',
      },
      transitionContainer: {
        marginTop: '8px',
      },
    },
  },
};
