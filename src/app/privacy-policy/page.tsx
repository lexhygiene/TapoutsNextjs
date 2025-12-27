
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Tapouts',
    description: 'Privacy Policy for Tapouts Ltd. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
                <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <div className="prose prose-lg text-gray-700">
                    <p>
                        <strong>TAPOUT LTD</strong> ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [tapouts.co], use our services, or communicate with us.
                    </p>

                    <h3>1. Company Information</h3>
                    <p>
                        <strong>Registered Company Name:</strong> TAPOUT LTD<br />
                        <strong>Company Number:</strong> 11205932<br />
                        <strong>Registered Address:</strong> 490 Broad Oak Court, Farnham Road, Slough, West Berkshire, United Kingdom, SL2 1HY<br />
                        <strong>Contact Email:</strong> info@tapouts.co
                    </p>

                    <h3>2. Information We Collect</h3>
                    <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
                    <ul>
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                    </ul>

                    <h3>3. Use of Your Information</h3>
                    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                    <ul>
                        <li>Create and manage your account.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                        <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
                        <li>Increase the efficiency and operation of the Site.</li>
                    </ul>

                    <h3>4. Disclosure of Your Information</h3>
                    <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                    <ul>
                        <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                        <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                    </ul>

                    <h3>5. Security of Your Information</h3>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                    <h3>6. Contact Us</h3>
                    <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
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
