import React, { useState, useEffect } from 'react';
import updateIntegrationSetting from '../functions/updateIntegrationSetting';
import getSingleData from '../functions/getSingleData';
import toast from '../functions/toast';
import { Link } from 'react-router-dom';

import recaptcha from '../assets/images/recaptcha.png';
import gmail from '../assets/images/gmail.png';
import Edit from './icons/Edit';

const FromSetup = () => {
    const [isReCaptchaActive, setIsReCaptchaActive] = useState(false);
    const [isSMTPActive, setIsSMTPActive] = useState(false);
    
    const updateStatus = async (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        const dataToSend = {
            tableData: { 'id' : value, 'is_active' : isChecked ? true : false }
        }
        const responseData = updateIntegrationSetting(dataToSend);
        if(value == 'recaptcha') {
            setIsReCaptchaActive(isChecked);
            toast(responseData, isChecked ? 'Google reCaptcha turned on' : 'Google reCaptcha turned off');            
        } else {
            setIsSMTPActive(isChecked);
            toast(responseData, isChecked ? 'Google SMTP turned on' : 'Google SMTP turned off');
        }
    };

    useEffect(() => {
        const fetchdata = async () => {
            const response1 = await getSingleData('awcf_integration', 'recaptcha');
            response1 && setIsReCaptchaActive(response1[0]['is_active'] == '1' ? true : false);
            const response2 = await getSingleData('awcf_integration', 'smtp');
            response2 && setIsSMTPActive(response2[0]['is_active'] == '1' ? true : false);
        };
        fetchdata();
    }, []);

    return (
        <div className="form-setup-component mt-5 mr-5">
            <h2 className='text-2xl font-semibold mb-4'>Integration</h2>
            <div className="form-setup-wrapper grid grid-cols-3 gap-5 bg-white p-5 rounded-xl">
                <div className="form-setup-box default-border rounded-lg p-5">
                    <div className='flex gap-3 pb-4 border-b border-b-[#d8d8d8]'>
                        <div><img src={recaptcha} alt="Illustration" /></div>
                        <div>
                            <h3 className="font-semibold mb-3">Google reCaptcha</h3>
                            <p>Add google recaptcha for more security.</p>
                        </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <Link className='flex items-center gap-[5px] default-border rounded-lg py-[5px] px-[10px]' to='/aw-recaptcha-setup'>
                            <Edit />Edit
                        </Link>
                        
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="recaptcha" class="sr-only peer" onChange={updateStatus} checked={isReCaptchaActive} />
                            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-[#7232EF] dark:bg-gray-700 peer-focus:ring-[#7232EF] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                        </label>
                    </div>
                </div>
                <div className="form-setup-box default-border rounded-lg p-5">
                    <div className='flex gap-3 pb-4 border-b border-b-[#d8d8d8]'>
                        <div><img src={gmail} alt="Illustration" /></div>
                        <div>
                            <h3 className="font-semibold mb-3">Google Mail</h3>
                            <p>Link your Google mail to get email in your gmail account</p>
                        </div>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <Link className='flex items-center gap-[5px] default-border rounded-lg py-[5px] px-[10px]' to='/aw-smtp-setup'>
                            <Edit />Edit
                        </Link>
                        
                        <label class="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="smtp" className="sr-only peer" onChange={updateStatus} checked={isSMTPActive} />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:peer-focus:ring-[#7232EF] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#7232EF]"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FromSetup;