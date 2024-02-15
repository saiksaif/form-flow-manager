import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd';

const TagsManager = ({ tags, tagUpdate }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [tagValue, setTagValue] = useState('');

    const addHashtag = (newtag) => {
        tagUpdate([...tags, newtag]);
        setTagValue('');
    }

    const deleteHashtag = (index) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        tagUpdate(updatedTags);

    }

    return (
        <div className='w-full'>
            <Button onClick={() => { setShowPopup(true) }} className='w-full border rounded shadow p-1 mb-1'>Manage Tags</Button>

            <Modal
                title="Manage Tags"
                open={showPopup}
                onOk={() => { alert("TAGS") }}
                onCancel={() => setShowPopup(false)}
                okText={'Done'}
                okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
            >
                <div className='my-2'>
                    <p>Add Tags</p>
                    <div className='flex justify-between gap-2'>
                        <Input
                            placeholder="Enter Hashtag Name..."
                            value={tagValue}
                            onChange={(e) => setTagValue(e.target.value)}
                        />
                        <Button onClick={() => { addHashtag(tagValue) }}>Add</Button>
                    </div>
                </div>
                <br />
                <hr />
                <br />
                <div className='my-2'>
                    <p>Your Tags</p>
                    <div className='flex flex-col gap-2'>
                        {tags?.map((tag, index) => {
                            return (
                                <div className='flex justify-between gap-2'>
                                    <li key={index} className='border rounded-lg p-1 px-3 w-full'>
                                        #{tag}
                                    </li>
                                    <Button onClick={() => { deleteHashtag(index) }}>
                                        ❌
                                    </Button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TagsManager