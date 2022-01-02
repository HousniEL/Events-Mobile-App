import React, {useState, useRef} from 'react';

import { 
    StyleSheet, 
    Text, 
    View, 
    Image,
    ScrollView,
    Dimensions
} from 'react-native';

import { Button } from "react-native-elements";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import event1 from "../../assets/imgs/events1.jpg";
import event2 from "../../assets/imgs/events2.png";
import event3 from "../../assets/imgs/events3.jpg";

import colors from "../../helpers/colors";

var width = Dimensions.get('screen').width;
var height = width * 100 / 150;


const images = [
    { img: event3, title1: "Simple to use", title2: "Organizing an event and sharing it becomes much easier just by using your phone." }, 
    { img: event2, title1: "Reserve your place at the event you like", title2: "Subscribe to the events you like and share it with your friends." },
    { img: event1, title1: "Track your events", title2: "Keep on track with all your events, so you won’t miss one." },
];

export default function FirstUse({ navigation }) {

    let scroll = useRef(null);

    const [activeDot, setActiveDot] = useState(0);

    function handleImageSliding({ nativeEvent }){
        const currentDot = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        setActiveDot(currentDot);
    }

    const Next = () => {
        if( (activeDot + 1) <= 2 ){
            scroll.current.scrollTo({x: width*(activeDot + 1), y: 0, animated: true});
        } else {
            navigation.push('sign')
        }
    }

    const Previous = () => {
        if( (activeDot - 1) >= 0 ){
            scroll.current.scrollTo({x: width*(activeDot - 1), y: 0, animated: true});
        }
    }

    return (
        <View style={{ height: '100%', backgroundColor: 'white', justifyContent: 'center' }}>
            <View style={styles.container} >
                <ScrollView
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.paginationContainer}
                    onScroll={handleImageSliding}
                    ref={ref => (scroll.current = ref)}
                >
                    {
                        images.map( (image, idx) => (
                            <View style={{ flexDirection: "column", width: width }} key={idx}>
                                <Image 
                                    key={idx}
                                    source={image.img}
                                    style={styles.Images}
                                />
                                <Text style={ styles.title1 }>
                                    { image.title1 }
                                </Text>
                                <Text style={ styles.title2 }>
                                    { image.title2 }
                                </Text>
                            </View>
                        ) )
                    }
                </ScrollView>
            </View>
            <View style={{
                width: "100%", 
                maxWidth: 400,
                position: 'absolute',
                bottom: 50
            }}>

                <View style={styles.dotsContainer}>
                        {
                            images.map( (image, idx) => (
                                <Text key={idx} style={ idx === activeDot ? styles.paginationActiveDot : styles.paginationDot }>
                                    ⬤
                                </Text>
                            ) )
                        }
                    </View>
                <View style={styles.bottomContainer}>
                    <Button 
                        title={"Previous"}
                        onPress={Previous}
                        disabled={activeDot === 0}
                        buttonStyle={[styles.buttonStyle, activeDot === 0 && { display: "none" }]}
                        titleStyle={{ color: colors.lightBlue }}
                        TouchableComponent={TouchableWithoutFeedback}
                    />
                    <Button 
                        title={activeDot !== 2 ? "Next" : "Get Started"}
                        onPress={Next}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={{ color: colors.lightBlue }}
                        TouchableComponent={TouchableWithoutFeedback}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        maxWidth: 400,
    },
    paginationContainer: { 
        width,
    },
    Images: { width, height, resizeMode: 'cover' },
    dotsContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        alignSelf: 'center'
    },
    title1: {
        textAlign: 'center',
        paddingTop: 5,
        color: colors.lightBlue,
        fontSize: 18,
        fontWeight: 'bold'
    },
    title2: {
        textAlign: 'center',
        paddingHorizontal: 50,
        paddingVertical: 10,
        marginTop: width/25,
        color: "#112d52aa",
        fontSize: 16
    },
    paginationDot: { 
        fontSize: width / 40,
        color: '#112d5255', 
        marginHorizontal: 2 
    },
    paginationActiveDot: { 
        fontSize: width / 31,
        color: colors.mediumBlue, 
        marginHorizontal: 2 
    },
    bottomContainer: {
        position: 'relative',
        flexDirection: 'row', 
        width: "100%", 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: 'transparent',
        height: 48,
        paddingHorizontal: 20,
        borderRadius: 5
    }
})