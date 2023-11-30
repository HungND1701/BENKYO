import {React, useState} from 'react';
import { Col, Modal } from 'antd';
import { EyeOutlined, PlusOutlined, UnorderedListOutlined, DeleteOutlined } from '@ant-design/icons';
import { Inertia } from '@inertiajs/inertia'
import {Input, Button, message, Upload} from 'antd';

const style = {
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
};

function extractDateFromString(dateString) {
    // Create a Date object from the string
    const dateObject = new Date(dateString);

    // Format the date to get the desired format (YYYY-MM-DD)
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObject.getDate()).padStart(2, '0');

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    // Return the formatted date
    return formattedDate;
}

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Flashcard = ({tag, flashcard, ...props}) => {
    const [word, setWord] = useState(flashcard.word);
    const [meaning, setMeaning] = useState(flashcard.meaning);
    const [isWordEditing, setIsWordEditing] = useState(false);
    const [isMeaningEditing, setIsMeaningEditing] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
    ]);
        const handleWordDoubleClick = () => {
            setIsWordEditing(true);
        };

        const error = () => {
            message.error('Để tạo 1 flash card cần có đủ cả Thuật Ngữ và Định Nghĩa');
        };

        const success = () => {
            message.success('Thêm thành công thẻ mới');
        };

        const handleMeaningDoubleClick = () => {
            setIsMeaningEditing(true);
        };

        const handleWordChange = (e) => {
            setWord(e.target.value);
        }

        const handleMeaningChange = (e) => {
            setMeaning(e.target.value);
        }

        const deleteFlashCard = () => {
            // if (flashcard.order === 0) {
            //     props.cancelAdd();
            // } else {
            //     Inertia.delete(route('flashcards.destroy', { flashcard: flashcard.card_id}), {
            //         onSuccess: () => {
            //         },
            //         onError: () => {
            //         }
            //     })
            // }
            if (flashcard.order === 0) {
                props.cancelAdd();
            } else {
                warning();
            }
        }
    const confirmDeleteFlashcard = () => {
        if (flashcard.order === 0) {
                props.cancelAdd();
            } else {
                Inertia.delete(route('flashcards.destroy', { flashcard: flashcard.card_id}), {
                    onSuccess: () => {
                    },
                    onError: () => {
                    }
                })
            }
    }

    const cancelChange = () => {
        setWord(flashcard.word);
        setMeaning(flashcard.meaning);
        setIsMeaningEditing(false);
        setIsWordEditing(false);
    }

    const saveChange = () => {


        if (word.length === 0 || meaning.length === 0) {
            error();
            setWord(flashcard.word);
            setMeaning(flashcard.meaning);
        } else if (flashcard.order === 0){
        Inertia.post(route('flashcards.store'), {word: word, meaning: meaning, tag_id: flashcard.tag_id}, {
            onSuccess: () => {
            },
            onError: () => {
            }
        })
        } else {
            Inertia.put(route('flashcards.update', { flashcard: flashcard.card_id}), {word, meaning}, {
                onSuccess: () => {
                },
                onError: () => {
                }
            })
        }
    }

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
            if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
            }
            setPreviewImage(file.url || file.preview);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
        <PlusOutlined />
        <div
            style={{
            marginTop: 8,
            }}
        >
            Upload
        </div>
        </div>
    );

    const warning = () => {
        Modal.warning({
            title: `Are you sure to delete this flash card ?`,
            onOk() {},
            footer:[
            <div className='flex gap-2 justify-end pt-6'>
                <Button key="cancel" onClick={() => {Modal.destroyAll();}}>
                    Cancel
                </Button>
                <Button key="ok" type="primary" onClick={confirmDeleteFlashcard} style={{ background: '#1890ff', borderColor: '#1890ff' }}>
                    OK
                </Button>
            </div>
            ]
        });
    };

    return (
        <Col className="gutter-row mt-3 mb-2 pt-4">
            <div style={style} className={'h-min rounded-md bg-blue-300 pt-4'}>
                <div className='flex py-1 px-4 border-b border-black text-xl text-black font-semibold justify-between'>
                    <div>
                        <div className='text-xl'>
                            {flashcard.order}
                        </div>
                        <div>
    
                        </div>
                    </div>
                    <div className='flex gap-2'>
                    { isWordEditing || isMeaningEditing ?
                        <div className='flex gap-1'>
                            <Button style={{backgroundColor: "#fbbf24", border: "none", fontWeight: "bold"}} onClick={saveChange}>
                                Save
                            </Button>
                            <Button style={{backgroundColor: "#27272a", color:"#fff", border: "none", fontWeight: "bold"}} onClick={cancelChange}>
                                Cancel
                            </Button>
                        </div> : ""
                    }
                        <div className='flex gap-2 items-center'>
                            { showMore ? 
                            <div className='flex text-base gap-3 bg-yellow-500 px-3 rounded'>
                                <div>learn_points: {flashcard.learn_points}</div> |
                                <div>created_at: {extractDateFromString(flashcard.created_at)}</div> |
                                <div>updated_at: {extractDateFromString(flashcard.updated_at)}</div>
                            </div> : ""
                            }
                            <UnorderedListOutlined className='cursor-pointer' onClick={() => {setShowMore(prev => !prev)}}/>
                            <div className='bg-red-500 py-1 px-2 rounded' onClick={deleteFlashCard}>
                                <DeleteOutlined className='font-bold cursor-pointer'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex text-black font-bold text-base px-2.5 gap-4 flex-start pt-6'>
                    <div className='w-2/4'>
                        <div className={"text-lg" + (isWordEditing ? " border-b-4" : " border-b-2") + (isWordEditing ? " border-yellow-600" : " border-black") + " h-10"} onDoubleClick={handleWordDoubleClick} >
                            {
                                isWordEditing ? <Input bordered={false}  
                        style={{
                            backgroundColor: "#93c5fd",
                            height: "95%",
                            fontSize: "large",
                            outline: "none"
                        }}
                        value={word}
                        onChange={handleWordChange}
                        /> : <div className='pl-3 pt-1'>{word}</div>
                            }
                        </div>
                        <div className='pl-3 pt-2'>Thuật ngữ</div>
                    </div>
                    <div className='w-2/5'>
                        <div className={"text-lg" + (isMeaningEditing ? " border-b-4" : " border-b-2") + (isMeaningEditing ? " border-yellow-600" : " border-black") + " h-10"} onDoubleClick={handleMeaningDoubleClick} >
                        {
                            isMeaningEditing ? <Input bordered={false}  
                        style={{
                            backgroundColor: "#93c5fd",
                            height: "95%",
                            outline: "none"
                        }}
                        value={meaning}
                        onChange={handleMeaningChange}
                        /> : <div className='pl-3 pt-1'>{meaning}</div>
                        }
                        </div>
                        <div className='pl-3 pt-2'>Định nghĩa</div>
                    </div>
                    <div>

                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            style={{
                                width: 'max-content',
                            }}
                        >
                            {fileList.length > 0 ? "" : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                            />
                        </Modal>
                    </div>
                    {/* {isWordEditing || isMeaningEditing ? 
                    <div className='flex gap-1'>
                        <Button size={"large"} style={{backgroundColor: "#fbbf24", border: "none"}}>Save</Button> 
                        <Button size={"large"} style={{backgroundColor: "#27272a", border: "none", color: "#fff"}}>Cancel</Button> 
                    </div>
                    : ""} */}
                </div>
            </div>
        </Col>
    )
}
export default Flashcard;
