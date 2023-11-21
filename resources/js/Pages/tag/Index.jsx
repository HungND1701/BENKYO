import {React, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Tag from './Tag.jsx';
import { Row, Button, Tooltip, Modal, Form, Input, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Inertia } from '@inertiajs/inertia'

const Tags = ({ auth, mustVerifyEmail, status, ...props }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const showAddModal = () => {
        setIsAddModalOpen(true);
    };
    const handleAddOk = () => {
        setIsAddModalOpen(false);
    };
    const handleAddCancel = () => {
        setIsAddModalOpen(false);
    };

    const onAddFinish = (values) => {
        Inertia.post(route('tags.store', { tag: values}), values, {
            onSuccess: () => {
            },
            onError: () => {
            }
        })
    };
    const onAddFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCancel = () => {}
    const handleOk = (tag_id) => {
        Inertia.delete(route('tags.destroy', { tag: tag_id}), {
            onSuccess: () => {
            },
            onError: () => {
            }
        })
    }

    const warning = (tagname, tag_id) => {
        Modal.warning({
            title: `Are you sure to delete ${tagname}?`,
            onOk() {},
            footer:[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="ok" type="primary" onClick={() => {handleOk(tag_id)}} style={{ background: '#1890ff', borderColor: '#1890ff' }}>
                    OK
                </Button>,
            ]
        });
    };

    const tagRows = [];
    for (let i = 0; i < props.tags.length; i += 4) {
        const tagsInRow = props.tags.slice(i, i + 4);
        const tagElements = tagsInRow.map(tag => (
            <Tag key={tag.tag_id} tag={tag} deleteWarning={warning}/>
        ));

        tagRows.push(
        <Row gutter={16} key={i}>
            {tagElements}
        </Row>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />
            <Modal title="New Tag" open={isAddModalOpen} onOk={handleAddOk} onCancel={handleAddCancel} footer={[]}>
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
                        marginTop: '10px',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onAddFinish}
                    onFinishFailed={onAddFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    label="Title:    "
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
                    label="Description:   "
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

                    <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit" style={{ background: "#2e1065"}}>
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className='flex justify-end items-center gap-2'>
                <Tooltip title="Add Card">
                    <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<PlusOutlined />} 
                        style={{ background: "#2e1065"}} 
                        size={"large"}
                        onClick={showAddModal}
                    />
                </Tooltip>
                <div className='text-base font-bold text-purple-950'>
                    Add New Card
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {tagRows}
                </div>
            </div>
        </AuthenticatedLayout>)
}
export default Tags;
