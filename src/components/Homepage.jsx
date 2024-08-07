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
        return <ResultForm />;
    } else if(dataState == 3) {
        return <MailConfiguration />
    } else {
        return <Prompt />
    }
}

export default Home;