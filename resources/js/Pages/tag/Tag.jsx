import React from 'react';
import { Col } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Inertia } from '@inertiajs/inertia'

const style = {
    padding: '8px 0',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
};

const Tag = ({tag, ...props}) => {

    const editTag = () => {
        Inertia.get(route('tags.edit', { tag: tag.tag_id }))
    }

    const showTag = () => {
        Inertia.get(route('tags.show', { tag: tag.tag_id }))
    }

    return (
        <Col className="gutter-row  w-60 cursor-pointer" span={6}>
            <div style={style} className='h-min rounded-md bg-purple-950'>
                <div className='flex p-2.5'>
                    <div className='flex-initial w-60 text-white font-bold text-lg uppercase' onClick={showTag}>
                        {tag.tag_name}
                    </div>
                    <div className='flex text-white text-xl font-bold gap-3'>
                        <div className='px-1 border-2 border-white cursor-pointer rounded-md bg-blue-500'>
                            <EditOutlined onClick={editTag}/>
                        </div>
                        <div className='px-1 border-2 border-white cursor-pointer rounded-md bg-red-500'>
                            <DeleteOutlined onClick={() => {props.deleteWarning(tag.tag_name, tag.tag_id)}}/>
                        </div>
                        <div className='px-1 border-2 border-white cursor-pointer rounded-md bg-yellow-500'>
                            <EyeOutlined onClick={showTag}/>
                        </div>
                    </div>
                </div>
                <div className='text-white font-bold text-base p-2.5'>
                    {tag.description}
                </div>
            </div>
        </Col>
    )
}
export default Tag;
