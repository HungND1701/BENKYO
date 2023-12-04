import {React, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Flashcard from '../../Components/FlashCard';
import { Inertia } from '@inertiajs/inertia'
import { EditOutlined, PlusOutlined, SwitcherOutlined } from '@ant-design/icons';
import { Empty, Button, Tooltip } from 'antd';

const ShowTag = ({ auth, mustVerifyEmail, status, ...props }) => {
    const [isAdding, setIsAdding] = useState(false);

    const addNewCard = () => {
        setIsAdding(true);
    }
    const learnCard = (tag_id) => {
        Inertia.get(route('tags.learn', { tag: tag_id }))
    }
    const editTag = (tag_id) => {
        Inertia.get(route('tags.edit', { tag: tag_id }))
    }

    const cancelAdd = () => {
        setIsAdding(false);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Show Tag" />
            <div className="py-4">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8 py-3 px-4 bg-white overflow-hidden border-b-2 border-slate-300">
                        <h3 className="text-2xl leading-6 font-medium text-gray-900">
                            Tag Detail
                        </h3>
                        <div className='flex gap-2 bg-blue-300 px-3 py-1 rounded cursor-pointer' onClick={() => {editTag(props.tag.tag_id)}}>
                            <EditOutlined className="text-xl" />
                            <div className='text-lg'>Edit</div>
                        </div>
                    </div>
                    <div className='text-xl px-4'>
                        <div className='tracking-wide font-semibold py-5'>Title: </div>
                        <div className='border-b-2 border-slate-300 w-1/4'>{props.tag.tag_name}</div>
                    </div>
                    <div className='text-xl px-4'>
                        <div className='tracking-wide font-bold py-5'>Description: </div>
                        <div className='border-b-2 border-slate-300 w-1/4'>{props.tag.description}</div>
                    </div>
                    <div className='text-xl pt-6 flex justify-between'>
                        <div className='tracking-wide font-bold py-5'>Flashcards list: </div>
                        <div className='flex gap-4'> 
                            <div className='flex items-center gap-2'>
                                <Tooltip title="Learn Flashcards">
                                    <Button 
                                        type="default" 
                                        icon={<SwitcherOutlined style={{ fontSize: '24px',  color: "#0284c7"}}/>} 
                                        size={"large"}
                                        style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                                        onClick={() => {learnCard(props.tag.tag_id)}}
                                    >
                                    Learn
                                    </Button>
                                </Tooltip>
                                
                            </div>
                            <div className='flex items-center gap-2'>
                                <Tooltip title="Add Card">
                                    <Button 
                                        type="primary" 
                                        shape="circle" 
                                        icon={<PlusOutlined />} 
                                        style={{ background: "#0284c7"}} 
                                        size={"large"}
                                        onClick={addNewCard}
                                        />
                                </Tooltip>
                                <div className='text-base font-bold text-sky-600'>
                                    Add New Flashcard
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-2'>
                        {isAdding ? <Flashcard flashcard={{order: 0, word: "", meaning: "", tag_id: props.tag.tag_id}} cancelAdd={cancelAdd} /> : ""}
                        { props.flashcards.length > 0 ? (
                            props.flashcards.map((flashcard, id) => {
                                return <Flashcard key={id} flashcard={{order: id + 1 , ...flashcard}}/>
                            })) : <div className='mt-10'><Empty /></div>
                        }
                    </div>         
                </div>
            </div>
        </AuthenticatedLayout>)
}
export default ShowTag;
