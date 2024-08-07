import React, { useState, useEffect } from 'react';
import updateIntegrationSetting from '../functions/updateIntegrationSetting';
import getSingleData from '../functions/getSingleData';
import toast from '../functions/toast';
import { useNavigate } from 'react-router-dom';
import LongArrowAltLeft from './icons/LongArrowAltLeft';

const ReCaptchaSetup = () => {
    const [siteKey, setSiteKey] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1);
    };

    const updateData = () => {
        const dataToSend = {
            tableData: { 'id': 'recaptcha', 'username' : siteKey, 'password' : secretKey }
        }
        const response = updateIntegrationSetting(dataToSend);
        toast(response);
    };

    const clearFields = () => {
        setSiteKey('');
        setSecretKey('');
    };

    useEffect(() => {
        const fetchdata = async () => {
            const response = await getSingleData('awcf_integration', 'recaptcha');
            setSiteKey(response[0]['username']);
            setSecretKey(response[0]['password']);
        };
        fetchdata();
    }, []);

    return (
        <div className="reCaptcha-setup-component mt-5 mr-5">
            <button className='flex items-center gap-[10px] mb-[10px] text-base font-medium' onClick={handleGoBack}>
                <LongArrowAltLeft />Go Back
            </button>
            <h2 className='text-2xl font-semibold mb-4'>Integration</h2>

            <div className="grid grid-cols-2">
                <div className="reCaptcha-setup-wrapper form-wrapper flex flex-col bg-white p-5 rounded-xl">
                    <label htmlFor="recaptcha-type">reCaptcha type</label>
                    <select name="recaptcha-type" id="recaptcha-type" className='mb-5 max-w-full'>
                        <option value="v2">V2</option>
                        <option value="v3">V3</option>
                    </select>

                    <label htmlFor="recaptcha-site-key">reCaptcha site key</label>
                    <input type="text" name="recaptcha-site-key" id="recaptcha-site-key" className='mb-5' value={siteKey} onChange={(e) => setSiteKey(e.target.value)} />

                    <label htmlFor="recaptcha-secret-key">reCaptcha secret key</label>
                    <input type="password" name="recaptcha-secret-key" id="recaptcha-secret-key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                    <a href="" className='text-[13px] text-[#7232EF] underline mt-1'>How to get Google reCaptcha v2 API keys</a>

                    <div className='border-t mt-5 pt-5'>
                        <button className='bg-violet-600 text-white py-2 px-[50px] border border-violet-800 rounded-lg' onClick={updateData}>Save</button>
                        <button className='bg-white ml-5 py-2 px-[50px] border border-slate-700 rounded-lg' onClick={clearFields}>Clear</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReCaptchaSetup;