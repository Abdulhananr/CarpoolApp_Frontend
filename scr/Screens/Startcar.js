import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { Icon } from 'react-native-elements';

function Startcar(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const back1 = require("../assets/Mainicon.png");

    const items = [
        {
            title: 'Picture 1',
            image: 'https://live.staticflickr.com/843/28326059507_2b8f2f6ba4_b.jpg',
        },
        {
            title: 'Picture 2',
            image: 'https://live.staticflickr.com/4831/46665486844_d2a7896cc1_b.jpg',
        },
        {
            title: 'Picture 3',
            image: 'https://i.pinimg.com/236x/c9/80/b8/c980b860b182e9996efd457ea0357a2d--baby-blue-bats.jpg',
        },
    ];
    return (
        <View style={styles.container}>

            <View style={styles.carouselContainer}>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event) => {
                        const x = event.nativeEvent.contentOffset.x;
                        const index = Math.floor(x / (width - 60));
                        if (index !== activeIndex) {
                            setActiveIndex(index);
                        }
                    }}
                    scrollEventThrottle={16}
                >
                    {items.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.dotContainer}>
                    {items.map((_, index) => (
                        <TouchableOpacity key={index} onPress={() => setActiveIndex(index)}>
                            <View
                                style={[
                                    styles.dot,
                                    { backgroundColor: index === activeIndex ? 'white' : 'gray' },
                                ]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.CircleShape} />
            <Image
                style={styles.Iconstyle}
                source={back1}
            />
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Startcar")}>
                <Text style={styles.loginButtonText}>Select Driver </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    Iconstyle: {
        width: 200,
        height: 200,
        marginLeft: 90,
        alignItems: 'center',
        position: 'absolute',

        height: 250,
        marginTop: 60,
        resizeMode: 'contain'
    },
    loginButton: {
        backgroundColor: '#000000',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft:40,
        marginRight:40
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    CircleShape: {
        width: 500,
        height: 500,
        marginLeft: -60,
        marginTop: -170,
        borderRadius: 500 / 2,
        position: 'absolute',
        backgroundColor: '#2596be',
    },
    carouselContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        marginTop: 300
    },
    itemContainer: {
        width: width - 60,
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    image: {
        width: '100%',
        height: '60%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    textContainer: {
        width: '90%',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 10,
        position: 'absolute',
        bottom: 100,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        textAlign: 'center',
    },
    dotContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1
    },
});

export default Startcar;
