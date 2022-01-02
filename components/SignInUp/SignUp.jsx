import React, { useState } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions
} from 'react-native';
import { Divider, Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Formik } from 'formik';
import * as Yup from "yup";

import LoginGoogle from '../OpenID/LoginGoogle';
import LoginFacebook from '../OpenID/LoginFacebook';

import Colors from '../../helpers/colors';
import CustomizeInput from '../../helpers/CustomizeInput';
import CustomizePwdInput from '../../helpers/CustomizePwdInput';

import { Flow } from 'react-native-animated-spinkit';
import { signup } from '../../services/UserService';
import Toast from 'react-native-toast-message';

export default function SignUp({ navigation }) {

    const [ wait, setWait ] = useState(false);
    const [ emailerr, setemailerr ] = useState('');

    var fields = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const SigninSchema = Yup.object().shape({
        firstname: Yup.string()
            .min(2, "Too Short!")
            .max(20, "Too Long!")
            .required("Required"),
        lastname: Yup.string()
            .min(2, "Too Short!")
            .max(20, "Too Long!")
            .required("Required"),
        email: Yup.string()
            .email("Not a valid email address!")
            .required("Required"),
        password: Yup.string()
            .min(8, "Too Short!")
            .max(20, "Too Long!")
            .required("Required"),
        confirmPassword: Yup.string()
            .required("Passwords must match")
            .oneOf([Yup.ref("password"), null], "Passwords must match")
    });


    function handleSubmit(values){
        setWait(true);
        signup(values, (succ) => {
            Toast.show({
                text1: 'Welcome',
            });
            setWait(false);
        }, (err) => {
            if ( err.message === "Network request failed" ) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: err.message,
                });
            }
            for( let key in err.errors ){
                if(err.errors[key].kind === "unique"){
                    eval(`set${key}err('${ key.charAt(0).toUpperCase() + key.slice(1) } already exist')`);
                }
            }
            setWait(false);
        })
    }

    return (
        <ScrollView contentContainerStyle={{ width: Dimensions.get('screen').width, justifyContent: 'center', height: '100%' }}>

            <>
                <TouchableWithoutFeedback
                    onPress={() => { navigation.pop(); }}
                >
                    <MaterialCommunityIcons name="arrow-left" size={27} color={Colors.lightBlue} style={{ marginHorizontal: 25, marginTop: 50}} />
                </TouchableWithoutFeedback>
                <View style={styles.mainContainer}>
                    <Formik
                        initialValues={fields}
                        validationSchema={SigninSchema}
                        onSubmit={handleSubmit}
                    >
                        {
                            ({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                                <View style={styles.formConatiner}>
                                    <Text style={{fontSize: 25, fontWeight: '700', color: Colors.lightBlue, marginBottom: 30}} >Events Share</Text>
                                    <Text style={{ fontSize: 21, marginBottom: 25, color: Colors.mediumOrange }}>Sign Up</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }} >
                                        <CustomizeInput 
                                            name="firstname"
                                            value={values.firstname}
                                            ph={'First name'} kT={'default'} aCT={'username'} tCT={'username'} iconName={'account'}
                                            fctCT={handleChange}
                                            fctBl={handleBlur}
                                            err={(errors.firstname && touched.firstname) ? errors.firstname : null}
                                            half={true}
                                        />
                                        <CustomizeInput 
                                            name="lastname"
                                            value={values.lastname}
                                            ph={'Last name'} kT={'default'} aCT={'username'} tCT={'username'} iconName={'account'}
                                            fctCT={handleChange}
                                            fctBl={handleBlur}
                                            err={(errors.lastname && touched.lastname) ? errors.lastname : null}
                                            half={true}
                                        />
                                    </View>
                                    <CustomizeInput 
                                        name="email"
                                        value={values.email}
                                        ph={'Email'} kT={'email-address'} aCT={'email'} tCT={'emailAddress'} iconName={'email'} 
                                        fctCT={handleChange}
                                        fctBl={handleBlur}
                                        err={
                                            (emailerr !== "") ? (
                                                emailerr
                                            ) : (
                                                (errors.email && touched.email) ?  errors.email : null
                                            )
                                        }
                                    />
                                    <CustomizePwdInput 
                                        name="password"
                                        plho="Password"
                                        value={values.password}
                                        fctCT={handleChange}
                                        fctBl={handleBlur}
                                        err={(errors.password && touched.password) ? errors.password : null}
                                    />
                                    <CustomizePwdInput 
                                        name="confirmPassword"
                                        plho="Confirm Password"
                                        value={values.confirmPassword}
                                        fctCT={handleChange}
                                        fctBl={handleBlur}
                                        err={(errors.confirmPassword && touched.confirmPassword) ? errors.confirmPassword : null}
                                    />
                                    <Button onPress={handleSubmit} title="Sign Up"
                                        disabled={wait}
                                        disabledStyle={{ backgroundColor: Colors.mediumOrange }}
                                        icon={wait && <Flow size={30} color={"white"} />}
                                        titleStyle={ wait ? { display: 'none' } : null }
                                        buttonStyle={styles.signInStyle}
                                        containerStyle={{ marginTop: 10 }}
                                    />
                                    <View style={{
                                        justifyContent: 'center',
                                    }}>
                                        <Divider orientation={'horizontal'} width={2} color={"#ddd"} style={{ marginVertical: 40 }} />
                                        <Text style={{
                                            position: 'absolute',
                                            left: '42%',
                                            color: "#ddd",
                                            backgroundColor: 'white',
                                            fontSize: 18,
                                            fontWeight: '700',
                                            width: 50,
                                            textAlign: 'center'
                                        }}>OR</Text>
                                    </View>

                                    <Text style={{ alignSelf: 'center', fontWeight: '700', marginBottom: 5, color: "#999" }}>
                                        Sign Up using
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                        <LoginGoogle />
                                        <LoginFacebook />
                                    </View>
                                </View>
                            )
                        }

                    </Formik>
                    <BottomSign navigation={navigation} />
                    <Toast 
                        position={"bottom"}
                        bottomOffset={20}
                    />
                </View>
            </>
        </ScrollView>
    )
}

function BottomSign({ navigation }){
    return (
        <>
            <View style={{
                flexGrow: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 15
            }}>
            <Text
            style={{
                color: Colors.mediumBlue,
                borderColor: "black"
            }}
            >
                Already have an account? {' '}
            </Text>
            <TouchableWithoutFeedback
                onPress={() => { navigation.push("signin"); }}
            >
                <Text style={{
                    color: Colors.lightOrange
                }}>Sign In</Text>                  
            </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0
    },
    formConatiner: { 
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '95%',
        maxWidth: 400, 
        padding: 20, 
        paddingVertical: 20
    },
    signInStyle: {
        backgroundColor: Colors.mediumOrange,
        height: 48,
        borderRadius: 5
    }
})
