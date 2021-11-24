import React from 'react';
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

export default function SignUp({ navigation }) {

    var fields = {
        firstname: '',
        lastname: '',
        email: '',
        pwd: ''
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
        pwd: Yup.string()
            .min(8, "Too Short!")
            .max(20, "Too Long!")
            .required("Required"),
    });
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
                        onSubmit={(values) => console.log(values)}
                    >
                        {
                            ({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                                <View style={styles.formConatiner}>
                                    <Text style={{fontSize: 25, fontWeight: '700', color: Colors.lightBlue, marginBottom: 30}} >Events Share</Text>
                                    <Text style={{ fontSize: 21, marginBottom: 25, color: Colors.mediumOrange }}>Sign Up</Text>
                                    <CustomizeInput 
                                        name="firstname"
                                        value={values.firstname}
                                        ph={'First name'} kT={'default'} aCT={'username'} tCT={'username'} iconName={'account'}
                                        fctCT={handleChange}
                                        fctBl={handleBlur}
                                        err={(errors.firstname && touched.firstname) ? errors.firstname : null}
                                    />
                                    <CustomizeInput 
                                        name="lastname"
                                        value={values.lastname}
                                        ph={'Last name'} kT={'default'} aCT={'username'} tCT={'username'} iconName={'account'}
                                        fctCT={handleChange}
                                        fctBl={handleBlur}
                                        err={(errors.lastname && touched.lastname) ? errors.lastname : null}
                                    />
                                    <CustomizeInput 
                                        name="email"
                                        value={values.email}
                                        ph={'Email'} kT={'email-address'} aCT={'email'} tCT={'emailAddress'} iconName={'email'} 
                                        fctCT={handleChange}
                                        fctBl={handleBlur}
                                        err={(errors.email && touched.email) ? errors.email : null}
                                    />
                                    <CustomizePwdInput 
                                        name="pwd"
                                        value={values.pwd}
                                        fctCT={handleChange}
                                        fctBl={handleBlur}
                                        err={(errors.pwd && touched.pwd) ? errors.pwd : null}
                                    />
                                    <Button onPress={handleSubmit} title="Sign Up"
                                        buttonStyle={styles.signInStyle}
                                        containerStyle={{ marginTop: 10 }}
                                    />
                                    <View style={{
                                        justifyContent: 'center',
                                    }}>
                                        <Divider orientation={'horizontal'} width={2} color={"#ddd"} style={{ marginVertical: 50 }} />
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
