import {React, useState, useEffect} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, Card} from 'antd';
import { StarOutlined, PlayCircleOutlined, PauseCircleOutlined, ArrowRightOutlined, ArrowLeftOutlined ,SwapOutlined} from '@ant-design/icons';
import { Inertia } from '@inertiajs/inertia';
import axios from "axios";

const LearnTag = ({ auth, mustVerifyEmail, status, ...props }) => {
    const [index, setIndex] = useState(0);
    const tagName = props.tag.tag_name;
    const flashcards = props.tag.flashcards;
    const [card, setCard] = useState(flashcards[index]);
    const [wordCard, setWordCard] = useState(card.word);
    const [meaningCard, setMeaningCard] = useState(card.meaning);
    const [isClicked, setIsClicked] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [isPrev, setIsPrev] = useState(false);
    const [isAppearLeft, setIsAppearLeft] = useState(false);
    const [isAppearRight, setIsAppearRight] = useState(false);
    const [isReturn, setIsReturn] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavourite, setIsFavourite] = useState(card.is_favourite);

    const startPlaying = () => {
        setIsPlaying(true);
    };

    const stopPlaying = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        let interval;

        if (isPlaying) {
            setIsClicked(false);
            // Chạy logic cần thiết ở đây
            handleClick(); 
            interval = setInterval(() => {
                nextCard(); 
                setTimeout(() => {
                    handleClick(); 
                }, 1500);
            }, 3000);
        }
        return () => {
            // Dừng các tài nguyên hoặc vòng lặp khi component bị unmounted hoặc isPlaying thay đổi
            clearInterval(interval);
        };
    }, [isPlaying]);

    const handleClick = () => {
        if(!isClicked) setIsClicked(true);
        else setIsClicked(false);
    };

    useEffect(() => {
        setCard(flashcards[index]);
    }, [index]);

    useEffect(() => {
        setWordCard(card.word);
        setMeaningCard(card.meaning);
        setIsFavourite(card.is_favourite);
    }, [card]);

    useEffect(() => {
        if(isNext && !isReturn){
            setTimeout(() => {
                setIsAppearLeft(true);
                if(isClicked) setIsClicked(false);
                const lengthFlashcards = flashcards.length;
                if(index == lengthFlashcards-1){
                    setIndex(0);
                }else{
                    setIndex(index+1);
                }
            }, 300);
            setTimeout(() => {
                setIsAppearLeft(false);
                setIsReturn(true);
            }, 400);
            setTimeout(() => {
                setIsReturn(false);
                setIsNext(false);
            }, 750);
        }
    }, [isNext]);

    useEffect(() => {
        if(isPrev && !isReturn){
            setTimeout(() => {
                setIsAppearRight(true);
                if(isClicked) setIsClicked(false);
                const lengthFlashcards = flashcards.length;
                if(index == 0){
                    setIndex(lengthFlashcards-1);
                }else{
                    setIndex(index-1);
                }
            }, 300);
            setTimeout(() => {
                setIsAppearRight(false);
                setIsReturn(true);
            }, 400);
            setTimeout(() => {
                setIsReturn(false);
                setIsPrev(false);
            }, 750);
        }
    }, [isPrev]);
    
    const nextCard = () => {
        setIsNext(true);
    }
    const prevCard = () => {
        setIsPrev(true);
    }
    const like = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click từ việc lan ra các thẻ cha
        card.is_favourite = true;
        const data = {is_favourite: card.is_favourite};
        axios.put(route('flashcards.addFavourite', {flashcard: card.card_id}), data)
            .then((response) => {
                setIsFavourite(response.data.is_favourite);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const unlike = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click từ việc lan ra các thẻ cha
        card.is_favourite = false;
        const data = {is_favourite: card.is_favourite};
        axios.put(route('flashcards.addFavourite', {flashcard: card.card_id}), data)
            .then((response) => {
                setIsFavourite(response.data.is_favourite);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const swapCard = () => {
        // Áp dụng thuật toán Fisher-Yates
        for (let i = flashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
        }
        if(index != 0) setIndex(0);
        else{
            setIndex(0);
            setCard(flashcards[0]);
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Learn Flashcards</h2>}
        >
            <Head title="Learn Flashcards" />
            <div className="py-4">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 py-3 px-4 bg-white overflow-hidden border-b-2 border-slate-300">
                        <h3 className="text-2xl leading-6 font-medium text-gray-900">
                            Learn Tag: <div className='inline-block font-semibold text-blue-500 ml-4'>{tagName}</div>
                        </h3>
                    </div>
                    <div class='w-full flex items-center justify-center'>
                        <div class='container'>
                            <div class='card' className={((isClicked&&!isNext&&!isPrev) ? 'clicked' : 'card') + ((isNext&&!isReturn) ? ' slideRight' : '') + (isAppearLeft ? ' appearLeft' : '') + (isReturn ? ' returnDis' : '') + ((isPrev&&!isReturn) ? ' slideLeft' : '') + (isAppearRight ? ' appearRight' : '')} onClick={handleClick} >
                                <div class='rounded-lg frontCard' >
                                    <Button style={{position: 'absolute', top: '12px', right: '12px', borderColor: '#fff'}} onClick={isFavourite ? unlike : like}  icon={<StarOutlined style={{ fontSize: '24px', color: isFavourite ? 'yellow' : 'gray' }}/>}/>
                                    <div style={{ fontSize: '20px', position: 'absolute', top: '12px', left: '18px' }}>{index+1}</div>
                                    <p class='font-medium text-3xl my-auto'>{wordCard}</p>
                                    <div class='w-full rounded-b-lg pt-1' style={{position: 'absolute',height: 35, bottom: '0px', left: '0px', textAlign: 'center', backgroundColor: '#B2E3FA'}}>
                                        <p class='font-normal text-xl text-gray-500'>Click the card to flip it</p>
                                    </div>
                                </div>
                                <div class='rounded-lg backCard' >
                                <Button style={{position: 'absolute', top: '12px', right: '12px', borderColor: '#fff'}} onClick={isFavourite ? unlike : like}  icon={<StarOutlined style={{ fontSize: '24px', color: isFavourite ? 'yellow' : 'gray' }}/>}/>
                                    <div style={{ fontSize: '20px', position: 'absolute', top: '12px', left: '18px' }}>{index+1}</div>
                                    <p class='font-medium text-3xl my-auto'>{meaningCard}</p>
                                    <div class='w-full rounded-b-lg pt-1' style={{position: 'absolute',height: 35, bottom: '0px', left: '0px', textAlign: 'center', backgroundColor: '#B2E3FA'}}>
                                        <p class='font-normal text-xl text-gray-500'>Click the card to flip it</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='w-full flex items-center justify-center'>
                        <div className='pt-8 px-2 flex justify-between' style={{width: 500, fontSize: '24px'}}>
                            <Button onClick={isPlaying ? stopPlaying : startPlaying} icon={isPlaying ? <PauseCircleOutlined style={{fontSize: '24px'}}/> : <PlayCircleOutlined style={{fontSize: '24px'}}/>}/>
                            <div class='flex space-x-5'>
                                <Button onClick={() => {prevCard()}}  icon={<ArrowLeftOutlined style={{fontSize: '24px'}}/>}/>
                                <Button onClick={() => {nextCard()}} icon={<ArrowRightOutlined style={{fontSize: '24px'}}/>}/>
                            </div>
                            <Button onClick={() => {swapCard()}} icon={<SwapOutlined style={{fontSize: '24px'}}/>}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>)
}
export default LearnTag;
