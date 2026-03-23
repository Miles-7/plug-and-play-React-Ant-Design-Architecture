import { Layout, Menu, Drawer, Button, Image } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './MainLayout.css';
import { MenuOutlined } from "@ant-design/icons";
import logo from "../assets/react.svg"; 
import logo2 from "../assets/hero.png"; 


const { Header, Content, Footer } = Layout; // imports from and design for the layout 
const HEADER_HEIGHT = 80;
const BREAKPOINT = 600;



export default function MainLayout(){

    const location = useLocation(); // tells you where the user currently is 
    const navigate = useNavigate(); // allows you to move between pages 


    const [current, setCurrent] = useState('nav1');
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const path = location.pathname;
    const routeMap = {
      '/home': 'nav1',
      '/about': 'nav2',
      '/contact': 'nav3'
    };
    setCurrent(routeMap[path] || 'nav1');
  }, [location]);

  const menuItems = [
    { key: 'nav1', label: 'Home' },
    { key: 'nav2', label: 'About' },
    { key: 'nav3', label: 'Contact Us' },
  ];

  const handleMenuClick = (e) => {
    const navigationMap = {
      nav1: '/home',
      nav2: '/about',
      nav3: '/contact'
    };
    
    setCurrent(e.key);
    setDrawerVisible(false);
    navigate(navigationMap[e.key] || '/home');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: '100%',
        height: `${HEADER_HEIGHT}px`,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#f3f3f3',
        padding: isMobile ? '0 20px' : '0 20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', flexShrink: 0 }}>
          <Image 
            src = {logo}
            width={80}
            height={90}
            preview={false}
            style={{ objectFit: 'contain', cursor: 'pointer' }}
            onClick={() => navigate("/home")}
          />
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Menu
              mode="horizontal"
              selectedKeys={[current]}
              items={menuItems}
              onClick={handleMenuClick}
              overflowedIndicator={null}
              style={{ 
                flex: 'none',
                border: 'none',
                background: 'transparent',
                fontSize: '17px',
                fontWeight: 500,
                minWidth: 'auto'
              }}
            />
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: '24px' }} />}
            onClick={() => setDrawerVisible(true)}
            style={{ padding: '8px' }}
          />
        )}
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <Menu
          mode="vertical"
          selectedKeys={[current]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none', fontSize: '16px' }}
        />
      </Drawer>

      {/* Main Content */}
      <Content style={{ 
        marginTop: `${HEADER_HEIGHT}px`,
        padding: 0,
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px - 80px)`
      }}>
        <Outlet />
      </Content>

      {/* Footer */}
      <Footer style={{ 
        textAlign: 'center',
        padding: '24px 50px',
        background: '#f5f5f5',
        borderTop: '1px solid #e8e8e8',
        fontSize: '14px',
        color: '#666'
      }}>
        All Rights Reserved ©2025 
      </Footer>
    </Layout>
  );
}




