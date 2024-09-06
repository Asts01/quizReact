import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { database } from '../config';
import {collection, addDoc , getDocs, doc, getDoc } from 'firebase/firestore';

function ShowAllQuestions() {
    // Get quiz name from the location state (passed from previous page)
    const location = useLocation();
    const quizNameFromProps = location.state?.quizName;
    const from=location.state?.from;

    // State to hold the fetched questions
    const [questions, setQuestions] = useState([]);

    // Fetch questions from Firestore
    const getQuizQuestions = async () => {
        if (quizNameFromProps) {
            try {
                const quizRef = collection(database, `quizzes/${quizNameFromProps}/questions`);
                const querySnapshot = await getDocs(quizRef);
                
                // Map through the documents and extract the data
                const fetchedQuestions = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                // Update state with the fetched questions
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error("Error fetching questions: ", error);
            }
        }
    };

    // Fetch quiz questions on component mount
    useEffect(() => {
        if (quizNameFromProps) {
            console.log(`current quiz name ${quizNameFromProps}`);
            getQuizQuestions();
        }
    }, [quizNameFromProps],[]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 px-5">
            <h1 className="text-2xl font-semibold text-blue-600 mb-6">
                Quiz Name: {quizNameFromProps}
            </h1>

            {/* Display the list of questions */}
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={question.id} className="mb-4">
                            <h2 className="text-lg font-bold">Q{index + 1}: {question.question}</h2>
                            <ul className="list-disc pl-5">
                                <li>Option 1: {question.options.o1}</li>
                                <li>Option 2: {question.options.o2}</li>
                                <li>Option 3: {question.options.o3}</li>
                                <li className="font-semibold">Correct: {question.options.correct}</li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No questions available or quiz not found.</p>
                )}
                {
                    
                }
            </div>
        </div>
    );
}

export default ShowAllQuestions;
