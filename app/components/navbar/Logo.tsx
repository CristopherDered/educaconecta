'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/dashboard')
    }
    return (
        <Image
            onClick={() => handleClick()}
            alt="Logo"
            className="hidden md:block cursor-pointer"
            height={300}
            width={300}
            src={"/images/logoWith.png"}
        />
    )
}

export default Logo