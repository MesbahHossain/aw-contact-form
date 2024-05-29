import React from 'react';
import { useSelect } from '@wordpress/data';
import Prompt from './Prompt';
import ResultForm from './ResultFrom';
import MailConfiguration from './MailConfiguration';
import store from '../store/store';

const Home = () => {
    const dataState = useSelect((select) => {
        return select(store).getResponse().step;
    });

    if(dataState == 2) {
        document.body.classList.remove('bgDark');
        return <ResultForm />;
    } else if(dataState == 3) {
        return <MailConfiguration />
    } else {
        document.body.classList.add('bgDark');
        return <Prompt />
    }
}

export default Home;