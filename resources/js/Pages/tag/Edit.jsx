import {React, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button, Form, Input, Checkbox } from 'antd';
import { Inertia } from '@inertiajs/inertia'

const EditTag = ({ auth, mustVerifyEmail, status, ...props }) => {

    const onAddFinish = (values) => {
        Inertia.put(route('tags.update', { tag: props.tag.tag_id}), values, {
            onSuccess: () => {
            },
            onError: () => {
            }
        })
    };
    const onAddFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Edit Tag" />
            <div className="py-12">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 py-8 px-4 overflow-hidden">
                        <h3 className="text-3xl leading-6 font-medium text-gray-900" style={{fontWeight: 700}}>
                            Edit Tag: <div className='inline-block font-semibold text-blue-500 ml-4'>{props.tag.tag_name}</div>
                        </h3>
                    </div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                            marginTop: '60px',
                        }}
                        initialValues={{
                            remember: true,
                            title: props.tag.tag_name,
                            description: props.tag.description
                        }}
                        onFinish={onAddFinish}
                        onFinishFailed={onAddFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                        label={<div className='text-lg font-semibold'>Title</div>}
                        name="title"
                        rules={[
                            {
                            required: true,
                            message: 'Please input tag title!',
                            },
                        ]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item
                        label={<div className='text-lg font-semibold'>Description</div>}
                        name="description"
                        rules={[
                            {
                            required: true,
                            message: 'Please input tag description!',
                            },
                        ]}
                        >
                        <Input />
                        </Form.Item>

                        {/* <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        >
                        <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

                        <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        >
                        <Button type="primary" htmlType="submit" style={{ background: "#2e1065", marginTop: "20px"}} className='hover:bg-white hover:text-purple-900'>
                            Change
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AuthenticatedLayout>)
}
export default EditTag;
