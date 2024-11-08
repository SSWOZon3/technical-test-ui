import React from 'react';
import { List, Button, message } from 'antd';
import { Duty } from '../interfaces/Duty';
import { removeDuty } from '../services/api';

interface DutyListProps {
    duties: Duty[];
    onEdit: (duty: Duty) => void;
    onRemove: () => void;
}

const DutyList: React.FC<DutyListProps> = ({ duties, onEdit, onRemove }) => {
    const handleRemove = async (duty: Duty) => {
        try {
            const isRemoved: boolean = await removeDuty(duty.id);
            if (!isRemoved) {
                message.error('Task not removed successfully');
            } else {
                message.success('Task removed successfully');
                onRemove();
            }
        } catch (error) {
            message.error('An error occurred');
        }
    };

    return (
        <List
            bordered
            dataSource={duties}
            renderItem={(duty) => (
                <List.Item
                    actions={[
                        <Button type="link" onClick={() => onEdit(duty)}>
                            Edit
                        </Button>,
                        <Button type="link" onClick={() => handleRemove(duty)}>
                            Remove
                        </Button>,
                    ]}
                >
                    {duty.name}
                </List.Item>
            )}
        />
    );
};

export default DutyList;
