import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../../config';
import { NavLink } from 'react-router-dom';

function SelectQuizName() {
    const [quizNames, setQuizNames] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllQuizNames = async () => {
        try {
            const nameRef = collection(database, 'quizNames');
            const querySnapshot = await getDocs(nameRef);
            const names = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setQuizNames(names);
        } catch (error) {
            console.error("Error fetching quiz names: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllQuizNames();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#DEF9C4] py-10 px-5">
            <h2 className="text-2xl font-semibold text-violet-500 mb-6">Select the Quiz to be Played 🤩</h2>
            {loading ? (
                <p>Fetching Quiz Data...</p>
            ) : (
                <div className="flex gap-4 w-full justify-center" >
                    {quizNames.length > 0 ? (
                        quizNames.map((quiz) => (
                            <NavLink 
                                key={quiz.id} 
                                to="/playQuiz" 
                                state={{ quizName: quiz.name}}  // Pass the quiz name correctly using state
                            >
                                <button
                                    className="bg-[#50B498] text-white py-2 px-4 rounded-lg hover:bg-[#468585] focus:outline-none focus:ring-2 focus:ring-[#9CDBA6] focus:ring-opacity-50 transition-all duration-200"
                                >
                                    {quiz.name} {/* Assuming 'name' is the quiz name field */}
                                </button>
                            </NavLink>
                        ))
                    ) : (
                        <p>No quiz names found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SelectQuizName;
