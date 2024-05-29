import { createReduxStore, register } from '@wordpress/data';

const initialState = {
    step: 1,
    prompt: '',
    response: {},
    formId: '',
    formName: ''
};

const actions = {
    setResponse( step, prompt, response, formId, formName ) {
        return {
            type: 'SET_RESPONSE',
            step,
            prompt,
            response,
            formId,
            formName
        };
    },
    setStep ( step ) {
        return {
            type: 'SET_STEP',
            step
        }
    },
    clearState () {
        return {
            type: "CLEAR_STATE"
        }
    }
};

const store = createReduxStore( 'aw-form', {
    reducer( state = initialState, action ) {
        switch ( action.type ) {
            case 'SET_RESPONSE':
                return {
                    ...state,
                    step: action.step,
                    prompt: action.prompt,
                    response: action.response,
                    formId: action.formId,
                    formName: action.formName,
                };

            case 'SET_STEP':
                return {
                    ...state,
                    step: action.step
                }

            case 'CLEAR_STATE': 
                return {
                    ...initialState
                }
        }

        return state;
    },

    actions,

    selectors: {
        getResponse( state ) {
            return state;
        },
    },
} );

register( store );

export default store;
