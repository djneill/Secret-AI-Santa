import SignUpForm from "../components/SignUpForm"

export default async function Login() {

    return (
        <main className='flex w-full min-h-screen bg-wrapping-paper bg-cover bg-center bg-no-repeat'>
            <div className='flex w-full justify-center items-center'>
                <div className='m-auto'>
                    <SignUpForm />
                </div>
            </div>
        </main>
    )
}
