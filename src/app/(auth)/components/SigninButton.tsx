'use client'
import React from 'react'
import Link from 'next/link'
import LogoutButton from './LogoutButton'

interface Props {
    user: UserDetails | null
}
export default function SigninButton({ user }: Props) {
    return (
        <div>
            <div>
                {!user ? (
                    <Link href={'/signin'}>
                        <div className='bg-green text-white text-preset-3 py-2 px-4 rounded-lg shadow-black shadow-lg'>
                            Login
                        </div>
                    </Link>
                ) : (
                    <>
                        <div className='flex items-center gap-x-4 text-black text-preset-1 font-sans '>
                            <div className="hidden sm:flex">Welcome {user?.username}</div>
                            <LogoutButton />
                        </div>

                    </>
                )}
            </div>
        </div>
    )
}