import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { router } from '@inertiajs/react';
import { Select, Button, Badge } from 'antd';
import { Layout, Menu } from 'antd';
import {
    ShopOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    FileTextOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

export default function Authenticated({ user, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState(localStorage.getItem('selected'));

    const navbarItem = [
        {
            key: 'tags.index',
            icon: <FileTextOutlined />,
            label: 'Tags'
        }
    ];

    return (
        <Layout >
            {/* <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    paddingTop: 70
                }}
                theme="light"
                trigger={null} collapsible collapsed={collapsed}
            >
                <div className="demo-logo-vertical"></div>
                <Menu theme="light" mode="inline" items={navbarItem} onSelect={({ item, key }) => { router.get(route(key)); }} />
            </Sider> */}
            <Layout
                className="site-layout"
                style={{
                    // marginLeft: collapsed ? '80px' : '200px',
                    margin: '0',
                    transition: 'margin-left 0.3s',
                    height: '100vh',
                }}
            >   
                <Header
                    style={{
                        padding: '10px 30p 10px',
                        background: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        height: 70,
                    }}
                >   
                    <div style={{display: 'flex', justifyContent: 'start', gap: 50}}>
                        <Button
                            type="text"
                            onClick={() => {
                                router.get('/dashboard'); 
                                setSelected('dashboard')
                                localStorage.removeItem('selected');
                                localStorage.setItem('selected', 'dashboard');
                                }
                            }
                            style={{
                                height: 70,
                                color: '#1a1d28',
                                fontWeight: 700,
                                fontSize: 26,
                                letterSpacing: 0.5,
                            }}
                        >
                            BENKYO
                        </Button>
                        <Button
                            type="text"
                            onClick={() => {
                                router.get('tags'); setSelected('tags')
                                setSelected('tags')
                                localStorage.removeItem('selected');
                                localStorage.setItem('selected', 'tags');
                            }}
                            style={{
                                fontSize: '16px',
                                height: 70,
                                color: '#1a1d28',
                                fontWeight: 700,
                                fontSize: 21,
                                letterSpacing: 0.5,
                                borderRadius: 0,
                                borderBottomColor: selected === 'tags' ? '#1a1d28' : '#fff',
                                borderBottomWidth: 3
                            }}
                            icon= {<FileTextOutlined />}
                        >
                            Tags
                        </Button>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {/* {user.name} */} 

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                        
                    

                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">{}</div>
                                <div className="font-medium text-sm text-gray-500">{}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        paddingTop: 40,
                        minHeight: 280,
                        backgroundColor: '#f6f7fb',
                        overflow: 'scroll',
                        borderRadius: 5
                    }}
                >
                    <main>{children}</main>
                </Content>    
            </Layout>
        </Layout>
    );
}
