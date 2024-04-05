import React from 'react';
import Form from './components/Form';

const App = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen mt-[-50px]'>
            <div className='w-[660px] mx-auto text-center'>
                <h1 className='text-4xl font-bold text-white mb-5'>Welcome To <span className='gradient-text'>FormGPT</span></h1>
                <p className='text-white text-base'>Just type a description of what form you need and our formGPT will help you refine your idea until you have the perfect form for your project.</p>
            </div>
            <Form />
        </div>
     );
}

export default App;