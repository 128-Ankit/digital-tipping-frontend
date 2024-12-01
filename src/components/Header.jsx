import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">
                    <Link to="/">Digital Tipping</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/register" className="hover:underline">
                                Hotel Registration
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:underline">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
