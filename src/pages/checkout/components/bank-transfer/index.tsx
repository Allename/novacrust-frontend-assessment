import BackButton from '@/components/back-button/back-button'

const BankTransfer = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-[640px] w-full space-y-8 rounded-[30px] border py-8 px-14">
        <div className="max-w-[521px] space-y-8">
          <div className='flex justify-between'>
            <BackButton />
          </div>
        </div>
      </div>
    </main>
  )
}

export default BankTransfer