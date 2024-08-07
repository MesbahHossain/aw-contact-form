import Homepage from '../components/Homepage';
import FormsList from '../components/FormsList';
import FromSetup from '../components/FromSetup';
import MailConfiguration from '../components/MailConfiguration';
import ReCaptchaSetup from '../components/ReCaptchaSetup';
import SMTPSetup from '../components/SMTPSetup';

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
    },
    {
        path: '/aw-recaptcha-setup',
        exact: true,
        element: ReCaptchaSetup
    },
    {
        path: '/aw-smtp-setup',
        exact: true,
        element: SMTPSetup
    },
];

export default router;