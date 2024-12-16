'use client';
import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Models, Query } from 'appwrite';
import { account, databases } from '@/app/lib/client/appwrite';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '@/app/(auth)/components/LogoutButton';

interface GroupDocument extends Models.Document {
    $id: string;
    name: string;
    budget: number;
    members: string[];
    created_by: string;
}

// Snow component with no SSR
const Snow = dynamic(() => Promise.resolve(() => (
    <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
            <div
                key={i}
                className="absolute animate-fall"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 3 + 5}s`,
                    opacity: Math.random(),
                    width: `${Math.random() * 5 + 3}px`,
                    height: `${Math.random() * 5 + 3}px`
                }}
            >
                <div className="h-full w-full bg-white rounded-full" />
            </div>
        ))}
    </div>
)), {
    ssr: false
});

export default function DashboardPage() {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [groups, setGroups] = useState<GroupDocument[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndGroups = async () => {
            try {
                const userData = await account.get();
                setUser(userData);

                const groupsData = await databases.listDocuments<GroupDocument>(
                    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
                    'groups',
                    [Query.search('members', userData.$id)]
                );

                setGroups(groupsData.documents);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndGroups();
    }, []);


    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-green-paper ">
            {/* Header */}
            <header className="bg-gradient-to-bl from-red-500 to-green-500 shadow">
                {/* Snow Effect */}
                <Suspense fallback={null}>
                    <Snow />
                </Suspense>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Secret Santa Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" asChild>
                                <Link href="/dashboard/groups/join">
                                    <Users className="mr-2 h-4 w-4" />
                                    Join Group
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/dashboard/groups/create">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create Group
                                </Link>
                            </Button>
                            <div className="relative group">
                                <Avatar className="h-10 w-10 cursor-pointer">
                                    <AvatarImage
                                        src={user?.prefs?.avatar || ''}
                                        alt={user?.name || 'User'}
                                    />
                                    <AvatarFallback>
                                        {user?.name ? getInitials(user.name) : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href="/dashboard/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Edit Profile
                                    </Link>
                                    <div className="my-1 border-t border-gray-200"></div>
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map((group) => (
                        <Link
                            key={group.$id}
                            href={`/dashboard/groups/${group.$id}`}
                            className="block"
                        >
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Budget: ${group.budget}</span>
                                    <span>{group.members.length} members</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {groups.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-present rounded-lg shadow">
                            <Users className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No Groups Yet</h3>
                            <p className="mt-2 text-gray-500">Get started by creating or joining a group!</p>
                            <div className="mt-6 flex gap-4 justify-center">
                                <Button asChild>
                                    <Link href="/dashboard/groups/create">Create Group</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/dashboard/groups/join">Join Group</Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}