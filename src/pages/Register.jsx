import SignUpForm from "../components/Forms/SignupForm";

const Register = () => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                ></img>
                <h2 className="mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
                    Come join us
                </h2>
                <div className="text-left text-gray-500">
                    <>We know you already!! </>
                    <a href="/signup" className="hover:text-blue-500">
                        then why here.
                    </a>
                </div>
            </div>
            <SignUpForm />
        </div>
    );
};

export default Register;
