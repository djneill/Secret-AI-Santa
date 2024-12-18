import PasswordRecovery from '../components/PassRecovery';


export default function passwordRecoveryPage() {

    return (
        <main className='flex w-full min-h-screen bg-village bg-cover bg-center bg-no-repeat'>
            <div className='flex w-full justify-center items-center'>
                <div className='m-auto'>
                    <PasswordRecovery />
                </div>
            </div>
        </main>
    )
}
