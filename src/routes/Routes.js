import Homepage from '../components/Homepage';
import FormsList from '../components/FormsList';
import FromSetup from '../components/FromSetup';
import MailConfiguration from '../components/MailConfiguration';

const router = [
    {
        path: '/',
        exact: true,
        element: Homepage
    },
    {
        path: '/aw-forms',
        exact: true,
        element: FormsList
    },
    {
        path: '/aw-form-setup',
        exact: true,
        element: FromSetup
    },
    {
        path: '/mailconfigure/:formId',
        exact: true,
        element: MailConfiguration
    }
];

export default router;