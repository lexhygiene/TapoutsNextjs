import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="/"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                Back to Website
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-gray-600 hover:text-gray-900"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link
                            to="/create-blog"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition duration-200 flex items-center justify-between group"
                        >
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Create New Blog</h3>
                                <p className="text-sm text-gray-500 mt-1">Write and publish a new article</p>
                            </div>
                            <PlusCircle className="w-8 h-8 text-blue-500 group-hover:text-blue-600" />
                        </Link>

                        <Link
                            to="/manage-blogs"
                            className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md transition duration-200 flex items-center justify-between group"
                        >
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">Manage Blogs</h3>
                                <p className="text-sm text-gray-500 mt-1">View, edit, or delete existing articles</p>
                            </div>
                            <FileText className="w-8 h-8 text-blue-500 group-hover:text-blue-600" />
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
