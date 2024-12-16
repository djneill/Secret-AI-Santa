'use client';
import React, { useState } from 'react';
import { signOut } from '@/app/lib/server/auth';

interface LogoutButtonProps {
    className?: string;
}

export default function LogoutButton({ }: LogoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleLogout = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        await signOut();
        setLoading(false);
    };

    return (
        <form onSubmit={handleLogout}>
            <button
                type='submit'
                disabled={loading}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
            >
                {loading ? 'Signing out...' : 'Sign Out'}
            </button>
        </form>
    );
};