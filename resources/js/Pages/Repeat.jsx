import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Input } from 'antd';
import { Button } from 'antd';
const Repeat = ({auth}) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Repeat</h2>}
        >
        <Head title="Repeat" />
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ textAlign: 'center', fontSize: 30 }}>Repeat</p>
            <div id='div1' className='flex mt-10' style={{ justifyContent: 'space-between', width: '200px' }}>
                <p className='pt-3' style={{fontSize: 20}}>Level 1</p>
                <Input style={{ width: '50px', height: '50px' }} />
                <p className='pt-3' style={{fontSize: 20}}>Days</p>
            </div>
            <div id='div2' className='flex mt-10' style={{ justifyContent: 'space-between', width: '200px' }}>
                <p className='pt-3' style={{fontSize: 20}}>Level 2</p>
                <Input style={{ width: '50px', height: '50px' }} />
                <p className='pt-3' style={{fontSize: 20}}>Days</p>
            </div>
            <div id='div3' className='flex mt-10' style={{ justifyContent: 'space-between', width: '200px' }}>
                <p className='pt-3' style={{fontSize: 20}}>Level 3</p>
                <Input style={{ width: '50px', height: '50px' }} />
                <p className='pt-3' style={{fontSize: 20}}>Days</p>
            </div>
            <div id='div4' className='flex mt-10' style={{ justifyContent: 'space-between', width: '200px' }}>
                <p className='pt-3' style={{fontSize: 20}}>Level 4</p>
                <Input style={{ width: '50px', height: '50px' }} />
                <p className='pt-3' style={{fontSize: 20}}>Days</p>
            </div>
            <div id='div5' className='flex mt-10' style={{ justifyContent: 'space-between', width: '200px' }}>
                <p className='pt-3' style={{fontSize: 20}}>Level 5</p>
                <Input style={{ width: '50px', height: '50px' }} />
                <p className='pt-3' style={{fontSize: 20}}>Days</p>
            </div>
        </div>
        <Button className='me-20 mt-20' size="large" style={{ float: 'right', borderWidth: '2px' }}>Save</Button>
        </AuthenticatedLayout>);
}
export default Repeat;