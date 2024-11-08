import axios from 'axios';
import { Duty } from '../interfaces/Duty';

const API_URL = 'http://localhost:3001/duties';
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
}

export const fetchDuties = async (): Promise<Duty[]> => {
    const response = await axios.get(API_URL, { headers });
    return response.data;
};

export const createDuty = async (name: string): Promise<Duty> => {
    const response = await axios.post(API_URL, { name }, { headers });
    return response.data;
};

export const updateDuty = async (id: string, name: string): Promise<Duty> => {
    const response = await axios.put(`${API_URL}/${id}`, { name }, { headers });
    return response.data;
};

export const removeDuty = async (id: string): Promise<boolean> => {
    const response = await axios.delete(`${API_URL}/${id}`, { headers });
    return response.data;
};
