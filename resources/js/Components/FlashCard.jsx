import React from 'react';
import { Col } from 'antd';
import { EyeOutlined, EditOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { Inertia } from '@inertiajs/inertia'

const style = {
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
};

const Flashcard = ({tag, ...props}) => {

    return (
        <Col className="gutter-row mb-6">
            <div style={style} className='h-min rounded-md bg-purple-950 px-2'>
                <div className='flex p-2.5 border-b-2 border-white text-xl text-white font-semibold justify-between'>
                    <div>
                        Flash card name
                    </div>
                    <div className='flex gap-2'>
                        <UnorderedListOutlined className='cursor-pointer'/>
                        <DeleteOutlined className='font-bold cursor-pointer'/>
                    </div>
                </div>
                <div className='flex text-white font-bold text-base px-2.5 gap-4 flex-start py-4'>
                    <div className=' border-b-2 border-white w-2/5'>
                        Word
                    </div>
                    <div className=' border-b-2 border-white w-2/5'>
                        Meanings
                    </div>
                </div>
            </div>
        </Col>
    )
}
export default Flashcard;
