import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import { Duty } from '../interfaces/Duty';
import { createDuty, updateDuty } from '../services/api';

interface DutyFormProps {
    duty?: Duty;
    onSuccess: () => void;
}

const DutyForm: React.FC<DutyFormProps> = ({ duty, onSuccess }) => {
    const [name, setName] = useState(duty?.name || '');

    const handleSubmit = async () => {
        try {
            if (duty) {
                await updateDuty(duty.id, name);
                message.success('Task updated successfully');
            } else {
                await createDuty(name);
                message.success('Task created successfullyy');
            }
            setName('');
            onSuccess();
        } catch (error) {
            message.error('An error occurred');
        }
    };

    return (
        <Form layout="inline" onFinish={handleSubmit}>
            <Form.Item
                name="name"
                validateTrigger="onSubmit"
                rules={[
                    { required: true, message: 'Please enter a task name' },
                    { type: 'string', min: 3, message: 'Task name must be at least 3 characters' },
                    { type: 'string', max: 50, message: 'Task name cannot exceed 50 characters' },
                ]}
            >
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Task name"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {duty ? 'Update' : 'Create'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DutyForm;
