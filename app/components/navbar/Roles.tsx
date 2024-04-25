'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
const Roles = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/dashboard/roles')
    }
    return (
        <div className=""
            onClick={() => handleClick()}>
            <div className=" w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
                <div className="flex flex-row items-center justify-between">
                    <div className="text-sm font-semibold px-6"
                    onClick={() => handleClick()}>
                        ROLES
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Roles