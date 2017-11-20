import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { black, white, green, red, gray } from '../utils/colors';

export default class QuizMode extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
            backgroundColor: black
        },
        title: `Quiz: ${navigation.state.params.deckId}`
    });

    state = {
        correct: 0,
        incorrect: 0,
        currentQuestion: 0
    };

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        });
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        });
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });
    }
    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

    render() {
        const { questions } = this.props.navigation.state.params;
        const frontAnimatedStyle = {
            transform: [{ rotateY: this.frontInterpolate }]
        };
        const backAnimatedStyle = {
            transform: [{ rotateY: this.backInterpolate }]
        };
        return (
            <View style={styles.container}>
                <Text style={styles.cardNumber}>
                    {this.state.currentQuestion} / {questions.length}
                </Text>

                <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <Text style={styles.content}>
                            Question: {questions[this.state.currentQuestion].question}
                        </Text>
                    </Animated.View>

                    <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                        <Text style={styles.content}>
                            Answer: {questions[this.state.currentQuestion].answer}
                        </Text>
                    </Animated.View>
                </View>
                <TouchableOpacity onPress={() => this.flipCard()}>
                    <Text style={styles.switchBtn}>Answer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.setState(prevState => ({
                            ...prevState,
                            correct: prevState.correct + 1,
                            currentQuestion: prevState.currentQuestion + 1
                        }))}
                >
                    <Text style={styles.correctBtn}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.setState(prevState => ({
                            ...prevState,
                            incorrect: prevState.incorrect + 1,
                            currentQuestion: prevState.currentQuestion + 1
                        }))}
                >
                    <Text style={styles.incorrectBtn}>In Correct</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white
    },
    cardNumber: {
        fontSize: 14,
        color: black,
        alignSelf: 'flex-start'
    },
    flipCard: {
        height: 200,
        width: 200,
        backgroundColor: gray,
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden'
    },
    content: {
        fontSize: 20,
        color: white,
        width: 90
    },
    flipCardBack: {
        backgroundColor: green,
        position: 'absolute',
        top: 0
    },
    switchBtn: {
        fontSize: 16,
        color: gray,
        fontWeight: 'bold',
        margin: 5
    },
    correctBtn: {
        backgroundColor: green,
        color: black,
        fontWeight: 'bold',
        padding: 20,
        borderWidth: 1,
        borderColor: black,
        margin: 10
    },
    incorrectBtn: {
        backgroundColor: red,
        color: white,
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: black,
        padding: 20,
        margin: 10
    }
});
