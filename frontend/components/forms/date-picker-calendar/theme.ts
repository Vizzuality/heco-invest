import { ThemeOptions } from '@material-ui/core';

export const themeOptions: ThemeOptions = {
  overrides: {
    MuiPickersBasePicker: {
      pickerView: {
        width: '100%',
        // minWidth: '700px',
        maxWidth: '814px',
        backgroundColor: '#FFFDFA',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        justifyContent: 'center',
        marginBottom: '16px',
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
        width: '100%',
        margin: 0,
        borderRadius: '8px',
        padding: '8px',
        textAlign: 'left',
        fontSize: '16px',
        color: '#000',
      },
      iconButton: {
        width: '32px',
        height: '32px',
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
        padding: '8px',
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
        width: '100%',
        '& > div': {
          width: '100%',
        },
      },
      transitionContainer: {
        marginTop: '8px',
        width: '100%',
      },
    },
  },
};
