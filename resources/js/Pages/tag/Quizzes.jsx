import {React, useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, Form, Input, Checkbox } from 'antd';
import { Inertia } from '@inertiajs/inertia'

const QuizzesTag = ({ auth, mustVerifyEmail, status, ...props }) => {
    const tagName = props.tag.tag_name;
    const flashcards = props.tag.flashcards;
    const numCards = flashcards.length;
    const numQuizze = props.numQuizze;
    const isTrueFalse = props.isTrueFalse;
    const isMulti = props.isMulti;
    const [quizzes, setQuizzes] = useState([]);
    let quizzesTrueFalse = Array.from({ length: numCards }, (_, index) => index);
    let wordsCard = flashcards.map((card) => card.word);
    let meaningsCard = flashcards.map((card) => card.meaning);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
    const [isChoice, setIsChoice] = useState(false);
    const [choiceIndex, setChoiceIndex] = useState(-1);
    const [isSwapped, setIsSwapped] = useState(false);
    const [renderKey, setRenderKey] = useState(0);
    const [index, setIndex] = useState(0);
    const [quizze, setQuizze] = useState(quizzes.length > 0 ? quizzes[index] : {});
    const [answerList , setAnswerList] = useState(quizzes.length > 0 ? quizzes[index].answer : []);

    const createQuizzes = () => {
        for(let i = 1;i<=numQuizze;i++){
            if(isTrueFalse=="true" && isMulti=="true"){
                const randomI = Math.floor(Math.random() * 2) // 0 or 1 
                if(randomI==0){
                    if(quizzesTrueFalse.length > 0){
                        let a = createQuizzesTrueFalse();
                        setQuizzes(quizzes => [...quizzes, a])
                    }else{
                        if((wordsCard.length > 0 || meaningsCard.length >0)){
                            let a = createQuizzesMulti();
                            setQuizzes(quizzes => [...quizzes, a])
                        }else break;
                    }
                };
                if(randomI==1){
                    if(wordsCard.length > 0 || meaningsCard.length >0){
                        let a = createQuizzesMulti();
                        setQuizzes(quizzes => [...quizzes, a])
                    }else{
                        if(quizzesTrueFalse.length > 0){
                            let a = createQuizzesTrueFalse();
                            setQuizzes(quizzes => [...quizzes, a])
                        }else break;
                    }
                };
            }else{
                if(isTrueFalse=="true"){
                    if(quizzesTrueFalse.length > 0){
                        let a = createQuizzesTrueFalse();
                        setQuizzes(quizzes => [...quizzes, a])
                    }else break;
                }else{
                    if(wordsCard.length > 0 || meaningsCard.length >0){
                        let a = createQuizzesMulti();
                        setQuizzes(quizzes => [...quizzes, a])
                    }else break;
                }
            }  
        }
    }
    const createQuizzesTrueFalse = () => {
        let word = "";
        let meaningCorrect = "";
        let meaning = "";
        let answerCorrect = true;
        
        const index = Math.floor(Math.random() * quizzesTrueFalse.length);
        const randomIndex = quizzesTrueFalse[index];
        word = flashcards[randomIndex].word;
        meaningCorrect = flashcards[randomIndex].meaning;
        const randomIndex2 = Math.floor(Math.random() * flashcards.length);
        meaning = flashcards[randomIndex2].meaning;
        if(randomIndex != randomIndex2) answerCorrect = false;
        quizzesTrueFalse.splice(index, 1);
        return {
            'type': 1,
            'word': word,
            'meaning': meaning,
            'meaningCorrect': meaningCorrect,
            'answerCorrect': answerCorrect==true?"True":"False",
            'answer': ["True", "False"],
        };
    }

    const createQuizzesMulti = () => {
        let words = [...wordsCard, ...meaningsCard];
        let word1 = "";
        let word2Correct = "";
        let answer = [];
        
        const randomIndex = Math.floor(Math.random() * words.length);
        word1 = words[randomIndex];
        const cardIndex = flashcards.findIndex((e) => (e.word === word1 || e.meaning === word1));
        if(cardIndex !=-1) {
            const isWord = (flashcards[cardIndex].word === word1);
            word2Correct = (isWord ? flashcards[cardIndex].meaning : flashcards[cardIndex].word);
            answer.push(word2Correct);
            if(isWord){
                let index = wordsCard.findIndex((e) => e===word1);
                if(index !=-1) wordsCard.splice(index,1);
                let means = flashcards.map((card) => card.meaning).filter((e) => e!=word2Correct);
                for(let i =1 ; i <=3; i++){
                    let randomIndexMeans = Math.floor(Math.random() * means.length);
                    answer.push(means[randomIndexMeans]);
                    means.splice(randomIndexMeans,1);
                }
            }else{ //word là meaning và word2Correct là word
                let index = meaningsCard.findIndex((e) => e===word1);
                if(index !=-1) meaningsCard.splice(index,1);
                let wordsList = flashcards.map((card) => card.word).filter((e) => e!=word2Correct);
                for(let i =1 ; i <=3; i++){
                    let randomIndexMeans = Math.floor(Math.random() * wordsList.length);
                    answer.push(wordsList[randomIndexMeans]);
                    wordsList.splice(randomIndexMeans,1);
                }
            }
            return {
                'type': 2,
                'word': word1,
                'answerCorrect': word2Correct,
                'answer': answer,
            };

        }else return null;
    }

    const clickCorrect = (index) => {
        // Xử lý logic khi click đúng
        setChoiceIndex(index);
        setTimeout(() => {nextQuizze();}, 1500);
    };

    const clickWrong = (index) => {
        // Xử lý logic khi click sai
        setChoiceIndex(index);
        setTimeout(() => {nextQuizze();}, 1500);
    };
    useEffect(() => {
        createQuizzes(); 
    }, []);
    useEffect(() => {
        setQuizze(quizzes[index]);
    }, [index]);
    useEffect(() => {
        setQuizze(quizzes[index]);
    }, [quizzes]);
    useEffect(() => {
        setAnswerList(quizzes[index] != null ? quizzes[index].answer: []);
    }, [quizze]);
    useEffect(() => {
        setRenderKey(renderKey + 1);
    }, [answerList]);

    const nextQuizze = () => {
        const nextIndex = index+1;
        if(nextIndex > numQuizze) finishTest();
        else{
            setChoiceIndex(-1);
            setIndex(nextIndex);
            setIsSwapped(false);
        }
    }

    const swapAnwser = () => {
        for (let i = answerList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if(i==0) setCorrectAnswerIndex(j);
            if(j==0) setCorrectAnswerIndex(i);
            [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
        }
        setIsSwapped(true);
    }
    console.log(quizzes);
    console.log(quizze);
    const divAnswers = answerList.map((element, index) => (
        <div key={index} className={`w-full h-full rounded-xl drop-shadow-lg flex justify-center items-center text-xl font-semibold ${choiceIndex == -1 ? 'bg-orange-100 hover:bg-orange-200 hover:cursor-pointer' : index==correctAnswerIndex ? 'bg-green-300' : 'bg-red-300'}`} onClick={() =>(element===quizze.answerCorrect ? clickCorrect(index) : clickWrong(index))}>
            {element}
        </div>
    ));
    useEffect(() => {
        if (!isSwapped) {
            swapAnwser();
            let divAnswers = answerList.map((element, index) => (
                <div key={index} className={`w-full h-full rounded-xl drop-shadow-lg flex justify-center items-center text-xl font-semibold ${choiceIndex == -1 ? 'bg-orange-100 hover:bg-orange-200 hover:cursor-pointer' : index==correctAnswerIndex ? 'bg-green-300' : 'bg-red-300'}`} onClick={() =>(element===quizze.answerCorrect ? clickCorrect(index) : clickWrong(index))}>
                    {element}
                </div>
            ));
        }
    }, [isSwapped]);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Quizzes</h2>}
        >
            <Head title="Quizzes" />
            <div className="py-1">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 py-3 px-4 bg-white overflow-hidden border-b-2 border-slate-300">
                        <h3 className="text-2xl leading-6 font-medium text-gray-900">
                            Quizzes of Tag: <div className='inline-block font-semibold text-blue-500 ml-4'>{tagName}</div>
                        </h3>
                    </div>


                        <div class='w-full flex items-center justify-center'>
                            <div class='w-3/4 rounded-xl drop-shadow-lg p-4 flex justify-center'>
                                <div class='w-5/6 h-32 bg-slate-100 rounded-sm flex justify-center items-center rounded-xl'>
                                    <div class='flex flex-col space-y-4 '>
                                        <div class='flex justify-center items-center text-5xl font-semibold'>
                                            {quizze != null ? quizze.word : ""}
                                        </div>
                                        {quizze != null && quizze.type==1 && <div class='flex justify-center items-center text-xl'>
                                            {quizze != null ? quizze.meaning : ""}
                                        </div>}
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <div class='w-full flex items-center justify-center'>
                            <div class='w-3/4 p-4 flex justify-center'>
                                <div key={renderKey} class='w-5/6 h-52 rounded-sm grid grid-cols-2 gap-4' >
                                    {divAnswers}
                                </div>
                            </div>    
                        </div>
                
                </div>
            </div>
        </AuthenticatedLayout>)
}
export default QuizzesTag;
