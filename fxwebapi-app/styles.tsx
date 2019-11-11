import { StyleSheet } from 'react-native';

const colors = {
    btnPrimary: '#146AFF',
    btnDisabled: '#A7C6FD',
    btnHover: '#1260E6',
    btnSecondary: 'transparent',
    btnText: '#FFFFFF'
}

const buttons = StyleSheet.create({
    base: {
        flex: 0,
        width: 192,
        fontFamily: 'Roboto',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primary: {
        backgroundColor: colors.btnPrimary,
    },
    secondary: {
        borderWidth: 1,
        borderColor: colors.btnPrimary,
        borderStyle: 'solid',
        backgroundColor: colors.btnSecondary
    },
    hover: {
        backgroundColor: colors.btnHover
    },
    disabled: {
        backgroundColor: colors.btnDisabled
    },
    lg: {
        height: 48,
    },
    md: {
        height: 40,
    },
    sm: {
        height: 32,
    },
});

const buttonText = StyleSheet.create({
    primary: {
        color: colors.btnText,
    },
    secondary: {
        color: colors.btnPrimary,
    },
    lg: {
        fontSize: 16
    },
    md: {
        fontSize: 14
    },
    sm: {
        fontSize: 14
    },
})

export { buttons, buttonText, colors };