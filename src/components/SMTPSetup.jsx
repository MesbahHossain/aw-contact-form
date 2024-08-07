import React, { useState, useEffect } from 'react';
import updateIntegrationSetting from '../functions/updateIntegrationSetting';
import getSingleData from '../functions/getSingleData';
import toast from '../functions/toast';
import { useNavigate } from 'react-router-dom';
import LongArrowAltLeft from './icons/LongArrowAltLeft';

const SMTPSetup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

    const updateData = () => {
        const dataToSend = {
            tableData: { 'id': 'smtp', 'username' : username, 'password' : password }
        }
        const response = updateIntegrationSetting(dataToSend);
        toast(response);
    };

    const clearFields = () => {
        setUsername('');
        setPassword('');
    };

    useEffect(() => {
        const fetchdata = async () => {
            const response = await getSingleData('awcf_integration', 'smtp');
            setUsername(response?.[0]?.username ?? '');
            setPassword(response?.[0]?.password ?? '');
        };
        fetchdata();
    }, []);

    return (
        <div className="smtp-setup-component mt-5 mr-5">
            <button className='flex items-center gap-[10px] mb-[10px] text-base font-medium' onClick={handleGoBack}>
                <LongArrowAltLeft />Go Back
            </button>
            <h2 className='text-2xl font-semibold mb-4'>Integration</h2>

            <div className="grid grid-cols-2">
                <div className="smtp-setup-wrapper form-wrapper flex flex-col bg-white p-5 rounded-xl">
                    <label htmlFor="smtp-site-key">SMTP Username</label>
                    <input type="text" name="smtp-site-key" id="smtp-site-key" className='mb-5' value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="smtp-secret-key">SMTP Password</label>
                    <input type="password" name="smtp-secret-key" id="smtp-secret-key" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div className='border-t mt-5 pt-5'>
                        <button className='bg-violet-600 text-white py-2 px-[50px] border border-violet-800 rounded-lg' onClick={updateData}>Save</button>
                        <button className='bg-white ml-5 py-2 px-[50px] border border-slate-700 rounded-lg' onClick={clearFields}>Clear</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SMTPSetup;