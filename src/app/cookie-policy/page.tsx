
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy | Tapouts',
    description: 'Cookie Policy for Tapouts Ltd. Understand how we use cookies to improve your experience.',
};

export default function CookiePolicyPage() {
    return (
        <main className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Cookie Policy</h1>
                <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg text-gray-700">
                    <h3>1. Introduction</h3>
                    <p>
                        <strong>TAPOUT LTD</strong> ("we", "us", or "our") uses cookies on [tapouts.co] (the "Site"). By using the Site, you consent to the use of cookies.
                    </p>
                    <p>
                        Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.
                    </p>

                    <h3>2. What are cookies</h3>
                    <p>
                        Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                    </p>

                    <h3>3. How We Use Cookies</h3>
                    <p>When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
                    <ul>
                        <li>To enable certain functions of the Service.</li>
                        <li>To provide analytics.</li>
                        <li>To store your preferences.</li>
                        <li>To enable advertisements delivery, including behavioral advertising.</li>
                    </ul>

                    <h3>4. Third-Party Cookies</h3>
                    <p>
                        In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
                    </p>

                    <h3>5. Your Choices Regarding Cookies</h3>
                    <p>
                        If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        If you have any questions about our Cookie Policy, please contact us:
                    </p>
                    <p>
                        Email: info@tapouts.co<br />
                        Address: 490 Broad Oak Court, Farnham Road, Slough, West Berkshire, SL2 1HY, United Kingdom
                    </p>
                </div>
            </div>
        </main>
    );
}
