import LoginForm from '../components/Forms/LoginForm';

const Login = () => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                ></img>
                <h1 className="mt-10 text-center text-2xl text-gray-900">
                    Login in to your account
                </h1>
                <div className="text-right text-gray-500">
                    <>New here? come </>
                    <a href="/signup" className="hover:text-blue-500">
                        join us
                    </a>
                </div>
            </div>
            <LoginForm />
        </div>
    );
};

export default Login;
