import React from 'react';
import GeneralPage from './GeneralPage';

class PurchasePage extends GeneralPage {
    render() {
        return (
            <div>
                <h1>Welcome to Purchase Page</h1>
                <p>This is the purchase page of the application.</p>
            </div>
        );
    }
}

export default new PurchasePage();
