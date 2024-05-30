import React, { useEffect, useState } from 'react';
import selectAll from '../functions/selectAll';
import getFormData from '../functions/getFormData';
import copyFormID from '../functions/copyFormID';
import formatDateTime from '../functions/formatDateTime';
import FormModal from './FormModal';
import updateFormData from '../functions/updateFormData';
import { NavLink, useNavigate } from 'react-router-dom';

// Icons
import { FaRegEye } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { GoTrash } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosUndo } from "react-icons/io";

const FormsList = () => {
    document.body.classList.remove('bgDark');
    const [doneFetching, setDoneFetching] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [tooltipText, setTooltipText] = useState('Click to copy');
    const [showModal, setShowModal] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);
    const [filter, setFilter] = useState('0');
    const navigate = useNavigate();

    const handleView = (form) => {
        setSelectedForm(form);
        setShowModal(true);
    };
  
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedForm(null);
    };

    const handleConfiguration = (formId) => {
        navigate(`/mailconfigure/${formId}`);
    };
    
    const handleTrash = async (formId, action) => {
        const success = await updateFormData(formId, action);
        success ? setTableData(prevTableData => prevTableData.filter(form => form.form_id !== formId)) : '';
    };      

    useEffect(() => {
        const fetchData = async () => {
            const data = await getFormData();
            setTableData(data);
            setDoneFetching(true);
        };

        fetchData();
    }, []);
    
    useEffect(() => {
        selectAll();
    }, [doneFetching]);

    // Filter forms based on the selected filter
    const filteredForms = tableData.filter(form => form.is_trashed === filter);

    return (
        <>
        <div className="forms-list-wrapper mt-5 mr-5">
            <h2 className='text-2xl font-semibold mb-4'>Forms</h2>
            <div className="forms-table-wrapper bg-white p-5 rounded-xl">
                <div>
                    <button className={`border rounded-lg py-[7px] px-4 font-medium mr-[10px] ${filter === '0' ? 'bg-purple-100 border-purple-700' : 'default-border'}`} onClick={() => setFilter('0')}>All Forms</button>
                    <button className={`border rounded-lg py-[7px] px-4 font-medium ${filter === '1' ? 'bg-purple-100 border-purple-700' : 'default-border'}`} onClick={() => setFilter('1')}>Trash</button>
                </div>
                <div className='flex justify-between default-border rounded-lg py-[15px] px-[25px] mt-[20px] mb-[10px]'>
                    <form className='default-border flex items-center rounded-lg py-[2px] px-[15px]'>
                        <button className='text-[#565865]'><LuSearch /></button>
                        <input className='b-none' type="text" placeholder='Search' required />
                    </form>
                    <NavLink className='flex items-center gap-[10px] bg-[#7232EF] py-1 px-5 rounded-md text-white font-medium hover:text-white' to={'/'}>
                        <AiOutlinePlus />
                        Generate New Form
                    </NavLink>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="selectAll" />Title</th>
                            <th>Form ID</th>
                            <th>Created Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-[#565865]'>
                    {doneFetching === true ?
                    typeof filteredForms === 'object' && filteredForms.length > 0 ? 
                        filteredForms.map((form, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" class="rowCheckbox" />{form.name}</td>
                                <td><div className='copy-form-id' onClick={() => copyFormID(form.form_id, setTooltipText)}>
                                    {form.form_id}
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.80078 15H9.80078C10.0508 15 10.3008 14.7812 10.3008 14.5V12.5H11.8008V14.5C11.8008 15.625 10.8945 16.5 9.80078 16.5H2.80078C1.67578 16.5 0.800781 15.625 0.800781 14.5V7.5C0.800781 6.40625 1.67578 5.5 2.80078 5.5H4.80078V7H2.80078C2.51953 7 2.30078 7.25 2.30078 7.5V14.5C2.30078 14.7812 2.51953 15 2.80078 15ZM5.80078 2.5C5.80078 1.40625 6.67578 0.5 7.80078 0.5H14.8008C15.8945 0.5 16.8008 1.40625 16.8008 2.5V9.5C16.8008 10.625 15.8945 11.5 14.8008 11.5H7.80078C6.67578 11.5 5.80078 10.625 5.80078 9.5V2.5ZM7.80078 10H14.8008C15.0508 10 15.3008 9.78125 15.3008 9.5V2.5C15.3008 2.25 15.0508 2 14.8008 2H7.80078C7.51953 2 7.30078 2.25 7.30078 2.5V9.5C7.30078 9.78125 7.51953 10 7.80078 10Z" fill="#565865"/>
                                    </svg>
                                    <span class="tooltip">{tooltipText}</span>
                                </div></td>
                                <td>{formatDateTime(form.created_at)}</td>
                                <td>{form.status}</td>
                                <td>
                                    {form.is_trashed === '0' ? (
                                        <div className='flex justify-end gap-2'>
                                            <button className='flex items-center gap-[5px] default-border rounded-lg py-[5px] px-[10px]' title='View' onClick={() => handleView(form)}>
                                                <FaRegEye />
                                                {/* View */}
                                            </button>
                                            <button className='flex items-center gap-[5px] default-border rounded-lg py-[5px] px-[10px]' title='Edit'>
                                                <BiSolidEdit />
                                                {/* Edit */}
                                            </button>
                                            <button className='flex items-center gap-[5px] default-border rounded-lg py-[5px] px-[10px]' title='Configuration' onClick={() => handleConfiguration(form.form_id)}>
                                                <LuSettings />
                                                {/* Configure */}
                                            </button>
                                            <button className='flex items-center gap-[5px] delete-btn border border-[#fd5252] text-[#fd5252] py-[5px] px-2 rounded-lg' title='Trash' onClick={() => handleTrash(form.form_id, 'trash')}>
                                                <GoTrash className='fill-[#fd5252]' />
                                                {/* Delete */}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='flex justify-end gap-2'>
                                            <button className='flex items-center gap-[5px] default-border rounded-lg py-[5px] px-[10px]' title='Restore' onClick={() => handleTrash(form.form_id, 'restore')}>
                                                <IoIosUndo />
                                                {/* Configure */}
                                            </button>
                                            <button className='flex items-center gap-[5px] delete-btn border border-[#fd5252] text-[#fd5252] py-[5px] px-2 rounded-lg' title='Delete Permanently' onClick={() => handleDelete(form.form_id)}>
                                                <GoTrash className='fill-[#fd5252]' />
                                                {/* Delete */}
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="5"><p className='text-center text-base'>No data available</p></td></tr>
                    ) : (
                        <tr><td colSpan="5"><div colSpan="5" className="loader"></div></td></tr>
                    )}
                    </tbody>
                </table>

                {showModal && ( <FormModal form={selectedForm} onClose={handleCloseModal} /> )}
            </div>
        </div>
        </>
    )
}

export default FormsList;