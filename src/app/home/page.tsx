import Link from 'next/link'
import { Button } from "@/components/ui/button";

export default function HomeScreen() {

    return (
        <div className='flex min-h-screen flex-col items-center justify-center pt-12 gap-10 relative '>
            <div className='font-bold text-4xl tracking-tight drop-shadow-md'>
                All subcription in one place
            </div>
            <div className='text-muted-foreground w-[60%] text-center tracking-tight leading-6'>
                Streamline your financial management and optimize your subscription usage with real-time insights and personalized analytics
                Sign up to get access to all our features
            </div>
            <div className='flex flex-row items-center justify-center gap-4'>
                <Link href="/login">
                    <Button className="w-20">
                        Login
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button className="w-20">
                        Register
                    </Button>
                </Link>
            </div>
            <a href="">
                <div className='text-[12px] m-2  py-1 px-4 rounded-full  text-muted-foreground hover:text-primary hover:bg-muted cursor-pointer transition-all'>
                    Explore our GitHub repository and contribute...!
                </div>
            </a>
            <div>
            </div>
        </div >
    )
}
