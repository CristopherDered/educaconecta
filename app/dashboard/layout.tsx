import Navbar from "../components/navbar/Navbar";

export default function dashboardLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div
            className="">
            <Navbar />
            <div
                className="mx-10 mt-5">
                {children}
            </div>
        </div>
    )

}