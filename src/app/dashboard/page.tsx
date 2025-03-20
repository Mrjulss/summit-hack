'use client'

import { useSearchParams } from 'next/navigation';

export default function Dashboard() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    return (
        <div className='flex justify-center items-center min-h-max'>
            {query}
        </div>
    );
}
