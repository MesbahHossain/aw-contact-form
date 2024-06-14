import React, { useState, useEffect } from 'react';
import illustration from '../assets/images/Illustration.png';
import deleteForm from '../functions/deleteForm';
import getFormSettings from '../functions/getFormSettings';
import store from '../store/store';
import saveFormSettings from '../functions/saveFormSettings';
import updateFormSettings from '../functions/updateFormSettings';
import { select } from '@wordpress/data';
import { useParams, useNavigate } from 'react-router-dom';

const MailConfiguration = () => {
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const [replyTo, setReplyTo] = useState('');
    const [cc, setCC] = useState('');
    const [bcc, setBCC] = useState('');
    const [body, setBody] = useState('');
    const [showUpdateBtn, setShowUpdateBtn] = useState(false);

    const navigate = useNavigate();
    
    let { formId } = useParams();
    if(!formId) {
        formId = select(store).getResponse().formId;
    } else {
        useEffect(() => {
            const fetchData = async () => {
                const data = await getFormSettings(formId);
                if (data.length > 0) {
                    setTo(data[0].to_email);
                    setFrom(data[0].from_email);
                    setReplyTo(data[0].reply_to);
                    setCC(data[0].cc);
                    setBCC(data[0].bcc);
                    setBody(data[0].body);
                }
            };
    
            fetchData();
            setShowUpdateBtn(true);
        }, []);
    }

    let dataToSend = {
        to: to, 
        from: from, 
        replyTo: replyTo, 
        cc: cc, 
        bcc: bcc,
        body: body,
        formId: formId
    };

    const saveSettings = async () => {
        const result = await saveFormSettings(dataToSend);
        result ? navigate('/aw-forms') : '';
    }
    
    const updateSettings = async () => {
        await updateFormSettings(dataToSend);
    };
    
    /* --------- Email validation --------- */
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('change', function(event) {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(event.target.value.match(mailformat) == null) {
                this.parentElement.classList.contains('invalid') ? '' : this.parentElement.classList.add('invalid');
            } else {
                this.parentElement.classList.contains('invalid') ? this.parentElement.classList.remove('invalid') : '';
            }
        });
    });

    return (
        <>
        <div className="header bg-white mt-6 mr-5 py-[10px] px-6 rounded-lg">
            <h1 className="text-2xl font-semibold">Contact Us</h1>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-6 mr-5">
            <div className="bg-white rounded-lg col-span-3">
                <div className='px-5 py-4 flex items-center gap-x-[10px]'>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7344 7.80859C17.4375 7.80859 18 8.33594 18 9.03906V16C18 17.2656 16.9805 18.25 15.75 18.25H2.25C0.984375 18.25 0 17.2656 0 16V9.03906C0 8.33594 0.527344 7.80859 1.23047 7.80859C1.51172 7.80859 1.79297 7.91406 2.00391 8.08984L7.52344 12.6953C8.33203 13.3633 9.63281 13.3633 10.4414 12.6953L15.9609 8.08984C16.1719 7.91406 16.4531 7.80859 16.7344 7.80859ZM16.3125 16V9.98828L11.4961 13.9961C10.793 14.5586 9.91406 14.9102 9 14.9102C8.05078 14.9102 7.17188 14.5586 6.46875 13.9961L1.6875 9.98828V16C1.6875 16.3164 1.93359 16.5625 2.25 16.5625H15.75C16.0312 16.5625 16.3125 16.3164 16.3125 16ZM3.9375 8.19531L2.74219 7.21094C2.56641 7.10547 2.42578 7 2.25 6.89453V2.21875C2.25 1.16406 3.12891 0.25 4.21875 0.25H13.7812C14.8359 0.25 15.75 1.16406 15.75 2.21875V6.89453C15.5391 7 15.3984 7.10547 15.2227 7.21094L14.0625 8.19531V2.21875C14.0625 2.07812 13.9219 1.9375 13.7812 1.9375H4.21875C4.04297 1.9375 3.9375 2.07812 3.9375 2.21875V8.19531ZM11.5312 3.625C11.9883 3.625 12.375 4.01172 12.375 4.46875C12.375 4.96094 11.9883 5.3125 11.5312 5.3125H6.46875C5.97656 5.3125 5.625 4.96094 5.625 4.46875C5.625 4.01172 5.97656 3.625 6.46875 3.625H11.5312ZM11.5312 6.4375C11.9883 6.4375 12.375 6.82422 12.375 7.28125C12.375 7.77344 11.9883 8.125 11.5312 8.125H6.46875C5.97656 8.125 5.625 7.77344 5.625 7.28125C5.625 6.82422 5.97656 6.4375 6.46875 6.4375H11.5312Z" fill="#7232EF"/>
                    </svg>
                    <h3 className="font-semibold">Mail Configuration</h3>
                </div>
                <hr />
                <div className="form-wrapper p-5 flex flex-col gap-5">
                    <div>
                        <label htmlFor="to">To</label>
                        <input type="email" name="to" id="to" placeholder="email@domain.com" value={to} onChange={(e) => setTo(e.target.value)} />
                        <span className='text-sm text-red-600 pt-2 pl-1 hidden'>Invalid email address</span>
                    </div>
                    <div>
                        <label htmlFor="from">From</label>
                        <input type="email" name="from" id="from" placeholder="email@domain.com" value={from} onChange={(e) => setFrom(e.target.value)} />
                        <span className='text-sm text-red-600 pt-2 pl-1 hidden'>Invalid email address</span>
                    </div>
                    <div>
                        <label htmlFor="reply-to">Reply To</label>
                        <input type="email" name="reply-to" id="reply-to" placeholder="email@domain.com" value={replyTo} onChange={(e) => setReplyTo(e.target.value)} />
                        <span className='text-sm text-red-600 pt-2 pl-1 hidden'>Invalid email address</span>
                    </div>
                    <div>
                        <label htmlFor="cc">CC</label>
                        <input type="email" name="cc" id="cc" placeholder="email@domain.com" value={cc} onChange={(e) => setCC(e.target.value)} />
                        <span className='text-sm text-red-600 pt-2 pl-1 hidden'>Invalid email address</span>
                    </div>
                    <div>
                        <label htmlFor="bcc">BCC</label>
                        <input type="text" name="bcc" id="bcc" placeholder="email@domain.com" value={bcc} onChange={(e) => setBCC(e.target.value)} />
                        <div className='flex items-center gap-1 pt-1'>
                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 0.5C9.30469 0.5 12 3.19531 12 6.5C12 9.82812 9.30469 12.5 6 12.5C2.67188 12.5 0 9.82812 0 6.5C0 3.19531 2.67188 0.5 6 0.5ZM6 11.375C8.67188 11.375 10.875 9.19531 10.875 6.5C10.875 3.82812 8.67188 1.625 6 1.625C3.30469 1.625 1.125 3.82812 1.125 6.5C1.125 9.19531 3.30469 11.375 6 11.375ZM6.9375 8.375C7.24219 8.375 7.5 8.63281 7.5 8.9375C7.5 9.26562 7.24219 9.5 6.9375 9.5H5.0625C4.73438 9.5 4.5 9.26562 4.5 8.9375C4.5 8.63281 4.73438 8.375 5.0625 8.375H5.4375V6.875H5.25C4.92188 6.875 4.6875 6.64062 4.6875 6.3125C4.6875 6.00781 4.92188 5.75 5.25 5.75H6C6.30469 5.75 6.5625 6.00781 6.5625 6.3125V8.375H6.9375ZM6 5C5.57812 5 5.25 4.67188 5.25 4.25C5.25 3.85156 5.57812 3.5 6 3.5C6.39844 3.5 6.75 3.85156 6.75 4.25C6.75 4.67188 6.39844 5 6 5Z" fill="#00832C"/>
                            </svg>
                            <span className='text-xs text-[#00832C]'>Use comma for multiple email address</span>
                        </div>
                        {/* <span className='text-sm text-red-600 pt-2 pl-1 hidden'>Invalid email address</span> */}
                    </div>
                    <div>
                        <label htmlFor="body">Message Body</label>
                        <textarea name="body" id="body" rows="3" placeholder="Message Body" onChange={(e) => setBody(e.target.value)} >{body}</textarea>
                    </div>
                </div>
                {showUpdateBtn ? (
                    <button className='bg-violet-600 text-white ml-5 mb-5 py-1 px-7 border border-violet-800 rounded-lg' onClick={updateSettings}>Update</button>
                ) : (
                    <div className='mb-5'>
                        <button className='bg-violet-600 text-white ml-5 py-1 px-7 border border-violet-800 rounded-lg' onClick={saveSettings}>Save</button>
                        <button className='bg-white ml-4 py-1 px-5 border border-slate-700 rounded-lg' onClick={() => deleteForm(formId)}>Delete</button>
                    </div>
                )}                
            </div>
            <div className="bg-white rounded-lg col-span-2 h-fit">
                <div className='px-5 py-4 flex items-center gap-x-[10px]'>
                    <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.28125 8.125C9.73828 8.125 10.125 8.51172 10.125 8.96875C10.125 9.46094 9.73828 9.8125 9.28125 9.8125H4.21875C3.72656 9.8125 3.375 9.46094 3.375 8.96875C3.375 8.51172 3.72656 8.125 4.21875 8.125H9.28125ZM5.90625 11.5C6.36328 11.5 6.75 11.8867 6.75 12.3438C6.75 12.8359 6.36328 13.1875 5.90625 13.1875H4.21875C3.72656 13.1875 3.375 12.8359 3.375 12.3438C3.375 11.8867 3.72656 11.5 4.21875 11.5H5.90625ZM9.28125 4.75C9.73828 4.75 10.125 5.13672 10.125 5.59375C10.125 6.08594 9.73828 6.4375 9.28125 6.4375H4.21875C3.72656 6.4375 3.375 6.08594 3.375 5.59375C3.375 5.13672 3.72656 4.75 4.21875 4.75H9.28125ZM11.25 0.25C12.4805 0.25 13.5 1.26953 13.5 2.5V16C13.5 17.2656 12.4805 18.25 11.25 18.25H2.25C0.984375 18.25 0 17.2656 0 16V2.5C0 1.26953 0.984375 0.25 2.25 0.25H11.25ZM11.8125 16V2.5C11.8125 2.21875 11.5312 1.9375 11.25 1.9375H2.25C1.93359 1.9375 1.6875 2.21875 1.6875 2.5V16C1.6875 16.3164 1.93359 16.5625 2.25 16.5625H11.25C11.5312 16.5625 11.8125 16.3164 11.8125 16Z" fill="#7232EF"/>
                    </svg>
                    <h3 className="font-semibold">Notes!</h3>
                </div>
                <hr />
                <p className="p-5">
                    To get email notifications for your leads, please configure this step. 
                    If you don't want email notifications, you can skip this step and publish the form now.<br/><br/>
                    You can configure email notifications later from “Form List” any time later.
                </p>
                <img src={illustration} alt="Illustration" />
            </div>
        </div>
        </>
    )
}

export default MailConfiguration;