import React from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { Divider, Button } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Formik } from 'formik';
import * as Yup from "yup";
import LoginGoogle from '../OpenID/LoginGoogle';

import Colors from '../../helpers/colors';
import CustomizeInput from '../../helpers/CustomizeInput';
import CustomizePwdInput from '../../helpers/CustomizePwdInput';
import LoginFacebook from '../OpenID/LoginFacebook';

export default function SignIn({ navigation }) {

    var fields = {
        email: '',
        pwd: ''
    };

    const SigninSchema = Yup.object().shape({
        email: Yup.string().email("Not a valid email address!")
            .required("Required"),
        pwd: Yup.string()
            .min(8, "Too Short!")
            .max(20, "Too Long!")
            .required("Required"),
    });
    return (
        <>
        <TouchableWithoutFeedback
            onPress={() => { navigation.pop(); }}
        >
            <MaterialCommunityIcons name="arrow-left" size={27} color={Colors.lightBlue} style={{ marginHorizontal: 25, marginTop: 50}} />
        </TouchableWithoutFeedback>
        <View style={styles.mainContainer}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Formik
                    initialValues={fields}
                    validationSchema={SigninSchema}
                    onSubmit={(values) => console.log(values)}
                >
                    {
                        ({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                            <View style={styles.formConatiner}>
                                <Text style={{fontSize: 25, fontWeight: '700', color: Colors.lightBlue, marginBottom: 30}} >Events Share</Text>
                                <Text style={{ fontSize: 21, marginBottom: 25, color: Colors.mediumOrange }}>Sign In</Text>
                                <CustomizeInput 
                                    name="email"
                                    value={values.email}
                                    ph={'Email'} kT={'email-address'} aCT={'email'} tCT={'emailAddress'} iconName={'email'} 
                                    fctCT={handleChange}
                                    fctBl={handleBlur}
                                    err={(errors.email && touched.email) ? errors.email : null}
                                />
                                <View>
                                    <CustomizePwdInput 
                                        name="pwd"
                                        value={values.pwd}
                                        fctCT={handleChange}
                                        fctBl={handleBlur}
                                        err={(errors.pwd && touched.pwd) ? errors.pwd : null}
                                    />
                                    <Text style={{ position: 'absolute', right: 0, top: 65, color: "#888" }}>
                                        Forgot Password?
                                    </Text>
                                </View>
                                <Button onPress={handleSubmit} title="Sign In"
                                    buttonStyle={styles.signInStyle}
                                    containerStyle={{ marginTop: 25 }}
                                />
                                <View style={{
                                    justifyContent: 'center'
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
                                    Sign In using
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
        </View>
        </>
    )
}

function BottomSign({ navigation }){
    return (
        <>
            <View style={{
                flexGrow: 1,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5
            }}>
            <Text
            style={{
                color: Colors.mediumBlue,
                borderColor: "black"
            }}
            >
                Need an account? {' '}
            </Text>
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.push('signup')
                }}
            >
                <Text style={{
                    color: Colors.lightOrange
                }}>Sign Up</Text>                  
            </TouchableWithoutFeedback>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: "100%",
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
        width: '95%',
        maxWidth: 400, 
        padding: 20, 
        paddingVertical: 30, 
        borderRadius: 10 
    },
    signInStyle: {
        backgroundColor: Colors.mediumOrange,
        height: 48,
        borderRadius: 5
    }
})
