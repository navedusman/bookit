'use client' // Error boundaries must be Client Components
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: () => void
}) {
  
  return (
    <div>
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='text-center'>
                    <h2 className="display-4 fw-bold">{error?.message}</h2>
                    <p className="fs-3">
                        <span className="text-danger">
                            oops!
                        </span> Something went Wrong !
                    </p>
                    <p className="lead">Sorry for inconvience</p>

                  <button className="btn btn-primary" onClick={() => reset?.()}>Try again</button>

            </div>
        </div>
    </div>
  )
}