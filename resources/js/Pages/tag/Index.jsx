import {React, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Tag from './Tag.jsx';
import { Row, Button, Tooltip, Modal, Form, Input, notification, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Inertia } from '@inertiajs/inertia'
const { Search } = Input;

const Tags = ({ auth, mustVerifyEmail, status, ...props }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [tags, setTags] = useState(props.tags);

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
                console.log('Post success!');
            },
            onError: (error) => {
                console.log(error);
            }
        })
    };
    const onAddFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleDeleteCancel = () => {
        Modal.destroyAll();
    }
    const handleOk = (tag_id) => {
        Inertia.delete(route('tags.destroy', { tag: tag_id}), {
            onSuccess: () => {
                openSuccessNotification('Successfully deleted', 'You have successfully deleted a tag !')
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
            <div className='flex gap-2 justify-end pt-6'>
                <Button key="cancel" onClick={handleDeleteCancel}>
                    Cancel
                </Button>
                <Button key="ok" type="primary" onClick={() => {handleOk(tag_id)}} style={{ background: '#1890ff', borderColor: '#1890ff' }}>
                    OK
                </Button>
            </div>
            ]
        });
    };

    const tagRows = [];
    for (let i = 0; i < tags.length; i += 4) {
        const tagsInRow = tags.slice(i, i + 4);
        const tagElements = tagsInRow.map(tag => (
            <Tag key={tag.tag_id} tag={tag} deleteWarning={warning}/>
        ));

        tagRows.push(
        <Row gutter={16} key={i}>
            {tagElements}
        </Row>
        );
    }

    const onSearch = (value) => {
        if (value.length === 0 ) {
            setTags(props.tags);
        } else {
            setTags(props.tags.filter(tag => tag.tag_name.toUpperCase().includes(value.toUpperCase())));
        }
    }

    const openSuccessNotification = (message, description) => {
    notification.open({
        message: message,
        description: description,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
    };

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
                    <Button type="primary" htmlType="submit" style={{ background: "#2e1065"}}>
                        Create
                    </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className="flex justify-between mb-8 py-3 px-8 bg-white overflow-hidden border-b-2 border-slate-300 items-center">
                <h3 className="text-2xl leading-6 font-medium text-gray-900" style={{color: '#1a1d28', fontWeight: 700}}>
                    Tags List
                </h3>
                <div className='flex justify-end items-center gap-2'>
                <Tooltip title="Add Card">
                    <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<PlusOutlined />} 
                        style={{ background: "#3d5c98"}} 
                        size={"large"}
                        onClick={showAddModal}
                    />
                </Tooltip>
                <div className='text-base font-bold' style={{color: '#3d5c98'}}>
                    Add New Tag
                </div>
            </div>
            </div>
            <div className='px-8'>
                <Search
                    placeholder="Input tag name"
                    onSearch={onSearch}
                    style={{
                        width: 300,
                    }}
                />
            </div>
            <div className="py-12">
                <div className="max-w-8xl sm:px-6 lg:px-8 space-y-6">
                    {tagRows.length > 0 ? tagRows : <div className='mt-48'><Empty /></div>}
                </div>
            </div>
        </AuthenticatedLayout>)
}
export default Tags;
