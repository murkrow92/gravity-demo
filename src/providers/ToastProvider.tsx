import React, {
    createContext,
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
    PropsWithChildren,
    useRef,
    useContext,
} from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Font } from '@theme/font.ts';
import Theme from '@theme';

export interface ToastOpenParams {
    title: string;
    message: string;
    Icon: React.ReactNode;
}

export interface ToastRef {
    open: (params: ToastOpenParams) => void;
    close: () => void;
}

const defaultModalRef = {
    open: () => null,
    close: () => null,
};

const ToastContext = createContext<ToastRef>(defaultModalRef);

const Toast = forwardRef((props, ref) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [icon, setIcon] = useState<React.ReactNode | undefined>(undefined);

    const [visible, setVisible] = useState(false);

    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start(() => {
                    setVisible(false);
                });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [visible, fadeAnim]);

    useImperativeHandle(ref, () => {
        return {
            open: (params: ToastOpenParams) => {
                setTitle(params.title);
                setMessage(params.message);
                setIcon(params.Icon);
                setVisible(true);
            },
            close: () => {
                setVisible(false);
            },
        };
    });

    if (!visible) {
        return null;
    }

    return (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
            {icon ? <View style={styles.toastIconContainer}>{icon}</View> : null}
            <View style={{ flex: 1 }}>
                <Text style={styles.toastTitle}>{title}</Text>
                <Text style={styles.toastMessage}>{message}</Text>
            </View>
        </Animated.View>
    );
});

const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const toastRef = useRef<ToastRef>(defaultModalRef);

    const [value, setValue] = useState(toastRef.current);

    useEffect(() => {
        setValue(toastRef.current);
    }, []);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <Toast ref={toastRef} />
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);

export default ToastProvider;

const styles = StyleSheet.create({
    toast: {
        paddingHorizontal: 12,
        marginHorizontal: 16,
        backgroundColor: Theme.POPUP_BACKGROUND_COLOR,
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        zIndex: 1000,
        flexDirection: 'row',
        shadowColor: '#000',
    },
    toastIconContainer: {
        marginRight: 12,
    },
    toastTitle: {
        fontFamily: Font.IBM.bold,
        fontSize: 14,
        color: Theme.TEXT_COLOR_LIGHT,
    },
    toastMessage: {
        marginTop: 8,
        fontFamily: Font.IBM.regular,
        fontSize: 14,
        color: Theme.TEXT_COLOR_LIGHT,
    },
});
