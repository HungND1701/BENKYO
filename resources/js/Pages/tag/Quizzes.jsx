import {React, useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia'
import {Button} from 'antd'
import {
    PauseOutlined,
    PlayCircleFilled
} from '@ant-design/icons';

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
    const [running, setRunning] = useState(false);
    const [pause, setPause] = useState(false);
    const [quizze, setQuizze] = useState(quizzes.length > 0 ? quizzes[index] : {});
    const [answerList , setAnswerList] = useState(quizzes.length > 0 ? quizzes[index].answer : []);
    const [timeoutId, setTimeoutId] = useState(null);
    const [finish, setFinish] = useState(false);
    const [trueAnswer, setTrueAnswer] = useState(0);

    const finishTest = () => {
        setFinish(true)
        setRunning(false)
        setPause(false)
    }

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
        setRunning(true);
        setTrueAnswer(prev => prev + 1)
        const newTimeoutId = setTimeout(() => {
            nextQuizze();
        }, 1500);
        setTimeoutId(newTimeoutId);

    };

    const clickWrong = (index) => {
        // Xử lý logic khi click sai
        setChoiceIndex(index);
        setRunning(true);
        const newTimeoutId = setTimeout(() => {
            nextQuizze();
        }, 1500);
        setTimeoutId(newTimeoutId);
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
        if(nextIndex >= numQuizze) finishTest();
        else{
            setChoiceIndex(-1);
            setIndex(nextIndex);
            setIsSwapped(false);
        }
    }

    const pauseTimeout = () => {
        clearTimeout(timeoutId);
        setPause(true);
        setRunning(false);
    };

    const resumeTimeout = () => {
        setPause(false);
        setRunning(true);

        // Set a new timeout and store its ID
        const newTimeoutId = setTimeout(() => {
            nextQuizze();
        }, 1500);
        setTimeoutId(newTimeoutId);
    };

    const swapAnwser = () => {
        for (let i = answerList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if(i==0) setCorrectAnswerIndex(j);
            if(j==0) setCorrectAnswerIndex(i);
            [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
        }
        setIsSwapped(true);
    }

    const divAnswers = answerList.map((element, index) => (
        <div key={index} className={`w-full h-full rounded-xl drop-shadow-lg flex justify-center items-center text-xl font-semibold ${choiceIndex == -1 ? 'bg-orange-100 hover:bg-orange-200 hover:cursor-pointer' : element===quizze.answerCorrect  ? 'bg-green-300' : 'bg-red-300'}`} onClick={() =>(element===quizze.answerCorrect ? clickCorrect(index) : clickWrong(index))}>
            {element}
        </div>
    ));
    useEffect(() => {
        setRunning(false);
        if (!isSwapped) {
            swapAnwser();
            let divAnswers = answerList.map((element, index) => (
                <div key={index} className={`w-full h-full rounded-xl drop-shadow-lg flex justify-center items-center text-xl font-semibold ${choiceIndex == -1 ? 'bg-orange-100 hover:bg-orange-200 hover:cursor-pointer' : element===quizze.answerCorrect  ? 'bg-green-300' : 'bg-red-300'}`} onClick={
                () =>{ if (element===quizze.answerCorrect) { clickCorrect(index)} else { clickWrong(index)}
                    setRunning(true);
                }
                }>
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
                    <div className="mb-8 py-3 px-4 overflow-hidden flex justify-between" style={{paddingLeft: 100, paddingRight: 200}}>
                        <h3 className="text-2xl leading-6 font-bold text-gray-900" style={{fontSize: 30}}>
                            Quizzes of Tag: <div className='inline-block font-bold ml-4' style={{fontSize: 30}}>{tagName}</div>
                        </h3>
                        {!finish ? <div className='text-2xl leading-6 font-bold text-gray-900'>
                            Right answer: { trueAnswer } / {numQuizze}
                        </div> : ""}
                    </div>
                    {!finish ? <div>
                        <div class='w-full flex items-center justify-center mt-8'>
                            <div class='w-3/4 rounded-xl drop-shadow-lg p-4 flex justify-center'>
                                <div class='w-5/6 h-32 bg-slate-100 rounded-sm flex justify-center items-center rounded-xl' style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
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
                    </div> : <div className='flex flex-col justify-center items-center mt-8'>
                        <div className="w-full" style={{fontSize: 30, fontWeight: 700, textAlign: 'center', marginBottom: 30}}>
                            Your Result
                        </div>
                        <div className="flex flex-col justify-center" style={{backgroundColor: "#fff", boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', width: 700, height: 300}}>
                            <div className='flex justify-center gap-3'>
                                <div style={{fontSize: 25, fontWeight: 600}}>Right Answers: </div>
                                <div style={{fontSize: 25, fontWeight: 600}}>{trueAnswer}</div>
                            </div>
                            <div className='flex justify-center gap-3'>
                                <div style={{fontSize: 25, fontWeight: 600}}>Total Questions: </div>
                                <div style={{fontSize: 25, fontWeight: 600}}>{numQuizze}</div>
                            </div>
                        </div>
                    </div>}
                </div> 
                {running ? <div className='flex justify-center mt-5'>
                    <Button icon={<PauseOutlined style={{ fontSize: '20px', color: '#fff'}}/>} style={{backgroundColor: '#3d5c98', padding: 10, width: 40, height: 40}} onClick={() => {pauseTimeout()}}/>
                </div> : (pause ? <div className='flex justify-center mt-5'>
                    <Button icon={<PlayCircleFilled style={{ fontSize: '20px', color: '#fff'}}/>} style={{backgroundColor: '#3d5c98', padding: 10, width: 40, height: 40}} onClick={() => {resumeTimeout()}}/>
                </div> : "")}
            </div>
        </AuthenticatedLayout>)
}
export default QuizzesTag;
