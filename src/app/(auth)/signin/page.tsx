import LoginForm from '../components/LoginForm'

export default async function Login() {

    return (
        <main className='flex w-full min-h-screen bg-wrapping-paper bg-cover bg-center bg-no-repeat'>
            <div className='flex w-full justify-center items-center'>
                <div className='m-auto'>
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}
