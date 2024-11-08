import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import DutyForm from './components/DutyForm';
import DutyList from './components/DutyList';
import { Duty } from './interfaces/Duty';
import { fetchDuties } from './services/api';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [editingDuty, setEditingDuty] = useState<Duty | undefined>(undefined);

  const handleEdit = (duty: Duty) => {
    setEditingDuty(duty);
  };

  const handleSuccess = () => {
    setEditingDuty(undefined);
    loadDuties();
  };

  const handleRemove = () => {
    loadDuties();
  }

  const loadDuties = async () => {
    try {
      const data = await fetchDuties();
      setDuties(data);
    } catch (error) {
      console.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    loadDuties();
  }, []);

  return (
    <Layout style={{ padding: '20px' }}>
      <Header>
        <Title level={2} style={{ color: 'white' }}>To-Do List</Title>
      </Header>
      <Content style={{ marginTop: '20px' }}>
        <DutyForm duty={editingDuty} onSuccess={handleSuccess} />
        <DutyList duties={duties} onEdit={handleEdit} onRemove={handleRemove} />
      </Content>
    </Layout>
  );
};

export default App;
