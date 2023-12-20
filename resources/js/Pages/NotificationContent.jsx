import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Popover, Button, Badge} from 'antd';
import { BellTwoTone } from '@ant-design/icons';
import moment from 'moment';
import { Tooltip } from 'antd';

const NotificationContent = () => {
    const [notification, setNotification] = useState(null);
    const unreadCount = notification ? notification.filter(notif => notif.is_read === 0).length : 0;

    const handleRead = (index) => {
        axios.post(route('notification.read'), { notification_id : notification[index].notification_id })
        .then(() => {
            setNotification(notification.map((notif, i) => i === index ? { ...notif, is_read: 1 } : notif));
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const content = (
        <div style={{ width: '250px', height: '150px', maxHeight: '150px', overflowY: 'auto' }}>
            {notification && notification.map((notif, index) => (
                <div className='flex justify-between'>
                <Tooltip title={notif.content}>
                    <p key={index} style={{ fontWeight: notif.is_read === 0 ? 'bold' : 'normal', cursor: 'pointer'}} onClick={() => handleRead(index)}>
                        {notif.content.length > 20 ? notif.content.substring(0, 20) + '...' : notif.content}
                    </p>
                </Tooltip>
                <p>{moment(notif.created_at).fromNow()}</p>
                </div>
            ))}
            
        </div>
      );

      useEffect(() => {
        axios.get(route('notification'))
        .then((response) => {
            console.log(response.data);
            setNotification(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const handleClick = () => {
        axios.get(route('notification'))
        .then((response) => {
            console.log(response.data);
            setNotification(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <Popover content={content} title="Notification" trigger="click">
            <Badge count={unreadCount}>
                <Button onClick={handleClick} icon={<BellTwoTone />}></Button>
            </Badge>
        </Popover>
    );
};

export default NotificationContent;