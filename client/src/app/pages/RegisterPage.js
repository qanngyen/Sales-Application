import React from 'react';
import GeneralPage from './generalPage';

class ResigterPage extends GeneralPage {
    render() {
        return (
            <div>
                <h1>Welcome to Register Page</h1>
                <p>This is the registration page of the application.</p>
            </div>
        );
    }
}

export default new ResigterPage();
