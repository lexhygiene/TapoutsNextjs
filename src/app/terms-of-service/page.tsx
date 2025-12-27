
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Tapouts',
    description: 'Terms of Service for Tapouts Ltd. Read our terms and conditions for using our website and services.',
};

export default function TermsOfServicePage() {
    return (
        <main className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
                <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg text-gray-700">
                    <h3>1. Agreement to Terms</h3>
                    <p>
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <strong>TAPOUT LTD</strong> ("we," "us" or "our"), concerning your access to and use of the [tapouts.co] website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                    </p>
                    <p>
                        You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                    </p>

                    <h3>2. Intellectual Property Rights</h3>
                    <p>
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                    </p>

                    <h3>3. User Representations</h3>
                    <p>By using the Site, you represent and warrant that:</p>
                    <ul>
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                        <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                        <li>You are not a minor in the jurisdiction in which you reside.</li>
                        <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                    </ul>

                    <h3>4. Prohibited Activities</h3>
                    <p>
                        You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>

                    <h3>5. Governing Law</h3>
                    <p>
                        These Terms shall be governed by and defined following the laws of the United Kingdom. TAPOUT LTD and yourself irrevocably consent that the courts of the United Kingdom shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                    </p>

                    <h3>6. Contact Us</h3>
                    <p>
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                    </p>
                    <p>
                        <strong>TAPOUT LTD</strong><br />
                        490 Broad Oak Court, Farnham Road<br />
                        Slough, West Berkshire, SL2 1HY<br />
                        United Kingdom<br />
                        Email: info@tapouts.co
                    </p>
                </div>
            </div>
        </main>
    );
}
