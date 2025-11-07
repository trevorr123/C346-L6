import React, {useState} from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const questions = [
    {
        id: 1,
        question: 'Which car model is shown?',
        image: 'https://hips.hearstapps.com/hmg-prod/images/2025-tesla-model-s-1-672d42e172407.jpg?crop=0.378xw:0.335xh;0.327xw,0.429xh&resize=1200:*',
        options: ['Tesla','Toyota','Honda','Ferrari','Lamborghini','BMW'],
        answer: 'Tesla',
    },
    {
        id: 2,
        question: 'Which car model is shown?',
        image: 'https://s3-ap-southeast-1.amazonaws.com/motoristprod/editors%2Fimages%2F1712824864850-lamborghini-pays-tribute-to-its-naturally-aspirated-v10-engine-with-the-limited-edition-huracan-stj-featured.jpeg',
        options: ['Ferrari','Lamborghini','Jaguar','Toyota','Honda','Bentley'],
        answer: 'Lamborghini',
    },
    {
        id: 3,
        question: 'Which car model is shown?',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBJO4x8Refw6PB-5itLP_LA452iOftuREH1A&s',
        options: ['BMW','Mercedes','Rolls Royce','Toyota','Lamborghini','Jaguar'],
        answer: 'BMW',
    },
    {
        id: 4,
        question: 'Which car model is shown?',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsTaYanf7nQwikY2iWfYDnJP9F4aMFI94i6A&s',
        options: ['Mercedes','Bentley','Rolls Royce','BMW','Tesla'],
        answer: 'Bentley',
    },
    {
        id: 5,
        question: 'Which car model is shown?',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNb6KnH73qo99hvaAMs-OmbeqtqzkKgZH_xQ&s',
        options: ['Bugatti','Bentley','Ferrari','Toyota','Nissan'],
        answer: 'Bugatti',
    },
];

const QuizQuestion = ({question, index, selected, onChange}) => (
    <View style={{ marginTop: 14, marginBottom: 18, padding: 12, borderRadius: 8, backgroundColor: '#111827' }}>
        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#e5e7eb' }}>
            Q{index + 1}. {question.question}
        </Text>

        <Image
            source={{ uri: question.image }}
            style={{ width: '100%', height: 180, borderRadius: 8, marginBottom: 10 }}
            resizeMode="cover"
        />

        <View style={{ borderWidth: 1, borderColor: '#374151', borderRadius: 6,}}>
            <Picker
                selectedValue={selected ?? ''}
                onValueChange={(val) => onChange(val)}
                dropdownIconColor="white"
                style={{ color: '#e5e7eb', backgroundColor: '#1f2937' }}
            >
                <Picker.Item label="Select your answer" value="" />
                {question.options.map((opt) => (
                    <Picker.Item key={opt} label={opt} value={opt} />
                ))}
            </Picker>
        </View>
    </View>
);

const QuizApp = () => {
    const [answers, setAnswers] = useState({});

    const setSelection = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const scoreQuiz = () => {
        let correct = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.answer) correct += 1;
        });
        return correct;
    };

    const feedbackFor = (score) => {
        if (score === questions.length) return 'Excellent Car Knowledge!';
        if (score === questions.length - 1) return 'Decent Car Knowledge!';
        if (score >= 1) return 'Keep practicing your car knowledge!';
        return 'Nice try! Try again!';
    };

    const handleSubmit = () => {
        const score = scoreQuiz();
        Alert.alert(
            'Quiz Result!',
            `You got ${score} / ${questions.length} correct. ${feedbackFor(score)}`
        );
    };

    return (
        <ScrollView style={{ marginTop: 40, marginBottom: 50, paddingHorizontal: 16, backgroundColor: '#00008B' }}>
            <View style={{ alignItems: 'center', marginBottom: 12 }}>
                <Text style={{ fontSize: 24, fontWeight: '800', color: 'white' }}>Car Quiz</Text>
                <Text style={{ fontSize: 12, color: 'white', marginTop: 4 }}>
                    Pick the correct model for each photo
                </Text>
            </View>

            {questions.map((q, idx) => (
                <QuizQuestion
                    key={q.id}
                    index={idx}
                    question={q}
                    selected={answers[q.id] ?? ''}
                    onChange={(val) => setSelection(q.id, val)}
                />
            ))}

            <TouchableOpacity
                style={{
                    marginTop: 8,
                    backgroundColor: 'deepskyblue',
                    height: 56,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={handleSubmit}
            >
                <Text style={{ fontSize: 18, fontWeight: '800', color: '#111827' }}>SUBMIT ANSWERS</Text>
            </TouchableOpacity>

            <View style={{ height: 24 }} />
        </ScrollView>
    );
};

export default QuizApp;
