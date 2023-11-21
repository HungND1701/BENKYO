import {React, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Flashcard from '../../Components/FlashCard';
import { Button, Form, Input, Checkbox } from 'antd';
import { Inertia } from '@inertiajs/inertia'

const ShowTag = ({ auth, mustVerifyEmail, status, ...props }) => {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Show Tag" />
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 py-5 px-4 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h3 className="text-2xl leading-6 font-medium text-gray-900">
                            Tag Detail
                        </h3>
                    </div>
                    <div className='text-xl'>
                        <div className='tracking-wide font-semibold py-5'>Title: </div>
                        <div className='border-b border-slate-300 w-1/4'>{props.tag.tag_name}</div>
                    </div>
                    <div className='text-xl py-4'>
                        <div className='tracking-wide font-semibold py-5'>Description: </div>
                        <div className='border-b border-slate-300 w-1/4'>{props.tag.description}</div>
                    </div>
                    <div className='my-3'>
                        <Flashcard />
                        <Flashcard />
                        <Flashcard />
                    </div>         
                </div>
            </div>
        </AuthenticatedLayout>)
}
export default ShowTag;
