import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="my-8 md:my-16 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[200px]">
            <div className="flex gap-3 sm:gap-5 items-center justify-center sm:justify-end">
                <Image 
                    src="/icons/fb.svg" 
                    alt="Facebook"
                    width={30} 
                    height={30}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px]"
                />
                <Image 
                    src="/icons/ig.svg" 
                    alt="Instagram"
                    width={30} 
                    height={30}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px]"
                />
                <Image 
                    src="/icons/linkedin.svg" 
                    alt="LinkedIn"
                    width={30} 
                    height={30}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px]"
                />
            </div>
            <hr className="border-black border-t my-6 md:my-10" />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 font-thin text-sm md:text-base">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 text-center sm:text-left">
                    <p className="hover:underline cursor-pointer">Terms & Conditions</p>
                    <p className="hover:underline cursor-pointer">Privacy Policy</p>
                </div>
                <p className="text-center sm:text-right">
                    © 2025 Spezi All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};